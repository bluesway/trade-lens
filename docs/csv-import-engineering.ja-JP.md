# CSV インポート実装メモ

[繁體中文（台灣）](csv-import-engineering.md) · [简体中文（中国）](csv-import-engineering.zh-CN.md) · **日本語** · [English (US)](csv-import-engineering.en-US.md)

ユーザー向け資料：[`csv-import-ux.ja-JP.md`](csv-import-ux.ja-JP.md)

この文書は保守・実装向けです。現在の CSV インポート機能の主要モジュール、データフロー、拡張ポイントをまとめます。

## 役割分担

- [App.jsx](/Users/howard.cheng/workspace/trade-lens/src/App.jsx)
  - ファイルアップロードの入口
  - 直接適用するか review dialog を出すかの分岐
  - 適用前バックアップの実行
- [Header.jsx](/Users/howard.cheng/workspace/trade-lens/src/components/Header.jsx)
  - parser selector
  - インポート説明と last import diagnostics の表示
- [ImportReviewDialog.jsx](/Users/howard.cheng/workspace/trade-lens/src/components/ImportReviewDialog.jsx)
  - review UI
  - append / replace の選択
- [useTradeData.js](/Users/howard.cheng/workspace/trade-lens/src/hooks/useTradeData.js)
  - prepare / apply フェーズ
  - dedupe、toast、lastImportMeta
- [csvImport.js](/Users/howard.cheng/workspace/trade-lens/src/utils/csvImport.js)
  - parser の中心
  - delimiter 判定、header mapping、profile 判定、row normalization

## データフロー

```text
Header file input
    |
App.handleFileUpload
    |
useTradeData.prepareCsvImport
    |
parseCSVWithMeta
    |
    +-- detectLayout
    +-- inspectHeaderRow
    +-- detectProfile
    +-- normalizeRowForProfile
    +-- build import meta
    |
    +-- fail -> toast + abort
    |
    +-- success
          |
          +-- demo only -> applyPreparedCsvImport(replace)
          |
          +-- existing user data -> ImportReviewDialog
                                      |
                                      +-- append / replace
                                             |
                                             +-- dedupe if append
                                             +-- persistRawData
                                             +-- setLastImportMeta
                                             +-- show success toast
```

## インポートは 2 段階

### prepare フェーズ

`prepareCsvImport(text)` は解析と検証だけを行い、まだ書き込みません。

出力：

- `rows`
- `meta`

失敗時：

- `null` を返す
- エラー toast を出す
- `lastImportMeta` をクリアする

### apply フェーズ

`applyPreparedCsvImport(preparedImport, options)` が実際にデータを書き換えます。

対応オプション：

- `mode: append | replace`
- `announceMode`

ここで行うこと：

- append 時の exact duplicate dedupe
- `appliedRowCount` 計算
- `duplicateRowCount` 計算
- IndexedDB / local state への保存
- `lastImportMeta` 更新
- 成功 toast 表示

## Parser のコア

`parseCSVWithMeta` は大まかに次の流れです。

1. 改行を正規化
2. 複数 delimiter を試す
3. 先頭数行で header inspection
4. 最良 layout を決定
5. `headerMap` 作成
6. profile 決定
7. 各行を `rawRow` に変換
8. profile ごとに `normalizeRowForProfile`
9. インポート可能行か検証
10. `rows + meta` を返す

## Profile 設計

各 profile は少なくとも次を持ちます。

- `id`
- `label`
- `translationKey`
- `importKind`
- `requiredFields`
- `preferredDecimalSeparator`
- `signatureHeaders`

`signatureHeaders` の役割は 2 つあります。

- auto detect のスコアリング
- 手動 preset 時に required fields 検証前の列対応を取ること

## Broker-specific normalization

`normalizeRowForProfile` は broker ごとに別 normalizer を通せます。

よくある追加処理：

- market fallback
- コードのゼロ埋め
- fee を買付コストへ加算
- 保有スナップショットを synthetic buy rows に変換
- 通貨や suffix から market を推定

## Append dedupe ルール

append はあいまい統合ではなく、exact duplicate skip です。

signature に使う項目：

- `日期`
- `類型`
- `代號`
- `市場`
- `數量`
- `單價`
- `總金額`
- `損益`

注意点：

- 数値は正規化して比較
- `代號` は大文字化
- 実取引を誤って潰さないため、かなり保守的です

## lastImportMeta が担うもの

右上 diagnostics と成功 toast は、主に次の値に依存します。

- `profileId`
- `profileLabel`
- `profileLabelKey`
- `selectionMode`
- `applyMode`
- `importKind`
- `delimiterLabel`
- `importedRowCount`
- `appliedRowCount`
- `skippedRowCount`
- `duplicateRowCount`

## 新しい broker preset を足す手順

1. 公開されている export 形式や公式説明を確認
2. `trades` か `positions` かを決める
3. `csvImport.js` に profile 追加
4. `signatureHeaders` を追加
5. 必要なら専用 normalizer を追加
6. `resources.js` に label を追加
7. sample CSV で smoke test
8. 既存 preset の regression を最低 1 回回す

## 現在の制限

- 香港系はまだ first-pass 支援の broker がある
- parser は schema registry ではなく、基本は header-driven
- auto detect は似た語彙同士で競合することがある
- まだ正式な test harness はなく、主に node smoke script と build で検証している

## 一言で言うと

今のインポート実装は、

`Header/App が UX と制御、useTradeData が prepare/apply、csvImport.js が parser コアと broker ルールを担当する構成です。`
