<p align="center">
  <img src="screenshots/logo.svg" width="112" height="112" alt="Trade Lens Logo">
</p>

# Trade Lens

<p align="center">
  グローバル株投資家のための、プライバシー重視トレードダッシュボード。
</p>

<p align="center">
  <a href="README.md">繁體中文（台灣）</a>
  ·
  <a href="README.zh-CN.md">简体中文（中国）</a>
  ·
  <strong>日本語</strong>
  ·
  <a href="README.en-US.md">English (US)</a>
</p>

<p align="center">
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License">
  </a>
</p>

<p align="center">
  <img src="screenshots/readme/trade-lens-jp.png" alt="Trade Lens 日本語 UI プレビュー" width="100%">
</p>

---

## 概要

**Trade Lens** は、プライバシー重視で設計されたグローバル株式向けの取引ダッシュボードです。証券会社の CSV を、保有状況、取得原価の推移、損益分布、さらに「今日売却した場合」の比較分析までまとめて可視化できます。データはブラウザ内だけに保存され、サーバーへ送信されません。

### 特長

- 米国株、香港株、台湾株、中国 A 株、日本株に対応。
- 証券会社 CSV の読み込みに加え、手入力での取引追加や銘柄名、現在値の補正も可能。
- `yfapi.net` を使って株価と為替を更新。
- 多言語 UI、ダークモード、モバイル表示に対応。
- 「今日売却した場合」と実際の実現損益を比べて、利確が上手かったか早売りだったかを見やすく表示。

### こんな用途に向いています

- 複数の証券会社や市場に散らばった取引履歴を一つの画面にまとめたい。
- 現在の保有、取得コスト、含み損益、実現損益を素早く把握したい。
- 「今日売っていたら」を基準に、自分の出口判断を振り返りたい。
- 取引データをクラウドへ預けずに、手元でしっかり分析したい。

### クイックスタート

1. リポジトリを取得
   ```bash
   git clone https://git.bluesway.org/bluesway/trade-lens.git
   cd trade-lens
   ```
2. 依存関係をインストール
   ```bash
   npm install
   ```
3. 開発サーバーを起動
   ```bash
   npm run dev
   ```
4. 管理パネルで `yfapi.net` の API キーを設定し、CSV を読み込んでください。

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Recharts
- i18next / react-i18next
- IndexedDB

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.
