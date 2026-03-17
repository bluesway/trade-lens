# CSV インポート UX フロー

[繁體中文（台灣）](csv-import-ux.md) · [简体中文（中国）](csv-import-ux.zh-CN.md) · **日本語** · [English (US)](csv-import-ux.en-US.md)

エンジニア向け資料：[`csv-import-engineering.ja-JP.md`](csv-import-engineering.ja-JP.md)

この文書では、Trade Lens でユーザーが `Import CSV` を押したあとに、実際にどういう UX とシステム挙動になるかをまとめます。

## フローチャート

```text
CSV parser を選ぶ
    |
Import CSV を押す
    |
.csv ファイルを選ぶ
    |
フロントエンドで事前解析
    |
    +-- 解析失敗 -----------------> エラー toast を表示 -> 終了
    |
    +-- 成功、かつ demo データのみ -> そのまま適用
    |                                 |
    |                                 +-> 成功 toast + 右上 diagnostics
    |
    +-- 成功、かつ既存データあり -> Import review dialog を開く
                                      |
                                      +-> 必要なら現在データを先にバックアップ
                                      |
                                      +-> Append unique rows を選ぶ
                                      |      |
                                      |      +-> 完全一致行はスキップ
                                      |
                                      +-> または Replace current data
                                             |
                                             +-> 成功 toast + 右上 diagnostics
```

## 最初に見えるもの

- ヘッダーに `CSV parser` のセレクトがあります。
- グループは 3 つです。
  - `Recommended`
  - `Broker presets`
  - `Generic templates`
- 既定値は `Auto detect` です。
- CSV の出どころが分かっている場合は、先に対応 preset を選べます。

## Import CSV を押したあと

### 1. ファイル選択

- システムのファイル選択ダイアログを開きます。
- 現在は `.csv` のみ受け付けます。

### 2. 事前解析

ここでは**まだ既存データを書き換えません**。まず次を行います。

- delimiter 判定
  - `,`
  - `;`
  - `tab`
- もっとも近い parser profile の推定
- 標準フィールドへのマッピング
- インポート種別の判定
  - `Trades`
  - `Positions snapshot`
- データ正規化
  - 売買方向
  - 数値形式
  - 証券会社固有カラム
  - 一部市場コードのゼロ埋め

### 3. 事前解析に失敗した場合

次のようなケースでは、既存データには触れず、エラー toast を出して終了します。

- 空ファイル
- 必須カラム不足
- 引用符なしのカンマ区切り金額などで行幅が壊れている
- インポート可能な取引行が 1 件もない

## demo データか、実データか

### demo データしかない場合

- ブラウザ内が demo データだけなら、そのままインポートを適用します。
- review dialog は出ません。

### すでに実データがある場合

- 既存データをいきなり上書きしません。
- 先に `Import review` ダイアログを開きます。

## Import Review Dialog

これは実際に書き込む前の最終確認です。

### 表示内容

- ファイル名
- 検出した parser
- parser mode
  - `Auto-detected`
  - `Manual preset`
- import kind
  - `Trades`
  - `Positions snapshot`
- delimiter
- 現在の行数
- 今回入ってくる行数
- 事前解析で parser がスキップした行数

### バックアップオプション

- `Export current data as a CSV backup first` という checkbox があります。
- デフォルトではオンです。
- オンなら適用前に現在データを CSV として書き出します。

## 適用モードは 2 つ

### Append unique rows

- 新しいデータを現在のデータの後ろに追加します。
- 完全一致の取引行は重複インポートしません。

duplicate 判定では、以下をまとめた canonical row signature を見ます。

- `日期`
- `類型`
- `代號`
- `市場`
- `數量`
- `單價`
- `總金額`
- `損益`

数値は正規化して比較するため、`10` と `10.0000` は同じ値として扱います。

### Replace current data

- 現在ブラウザ内で使っている active dataset を、この CSV だけに置き換えます。
- 新しい CSV を source of truth にしたい場合向けです。

## インポート成功後のフィードバック

### Toast

成功 toast では次を伝えます。

- 何件入ったか
- append か replace か
- どの parser を使ったか
- どの delimiter だったか
- skipped rows があったか

持ち株スナップショットなら、synthetic buy rows に変換したことも明示します。

### 右上の diagnostics badge

ヘッダー右上に、直前インポートの概要 badge を残します。

- parser 名
- 実際に書き込んだ行数
- あれば skipped 行数

ホバーすると詳細を見られます。

- Profile
- Mode
- Apply mode
- Import kind
- Delimiter
- Imported rows
- Parser skipped
- Exact duplicates skipped

## この UX が解決していること

- いきなり既存データを消してしまう事故の回避
- 壊れた CSV を静かに取り込む事故の回避
- append 時の完全重複行の再取り込み防止
- parser がどのレイアウトを食べたかの可視化
- broker preset を名前だけでなく実際の解析ロジックに反映

## この UX がまだやらないこと

- 壊れた broker export 自体を自動修復すること
- 近い取引を自動で 1 件にまとめること
- あいまい判定で旧データを自動上書きすること
- 香港系の一部 broker を official schema レベルで網羅すること

## 一言で言うと

今のインポート UX は「押して祈る」ではなく、

`先に解析 -> 先に知らせる -> append / replace を選ばせる -> 書き込む -> 診断結果を残す`
