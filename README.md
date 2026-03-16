<p align="center">
  <img src="screenshots/logo.svg" width="112" height="112" alt="Trade Lens Logo">
</p>

# Trade Lens

<p align="center">
  Privacy-first portfolio analytics for global stock investors.
</p>

<p align="center">
  <a href="#readme-tw">繁體中文（台灣）</a>
  ·
  <a href="#readme-cn">简体中文（中国）</a>
  ·
  <a href="#readme-jp">日本語</a>
  ·
  <a href="#readme-en-us">English (US)</a>
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

## Preview

<table>
  <tr>
    <td align="center" width="50%">
      <strong>繁體中文（台灣）</strong><br>
      <img src="screenshots/readme/trade-lens-tw.png" alt="Trade Lens screenshot in Traditional Chinese (Taiwan)" width="100%">
    </td>
    <td align="center" width="50%">
      <strong>简体中文（中国）</strong><br>
      <img src="screenshots/readme/trade-lens-cn.png" alt="Trade Lens screenshot in Simplified Chinese (China)" width="100%">
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <strong>日本語</strong><br>
      <img src="screenshots/readme/trade-lens-jp.png" alt="Trade Lens screenshot in Japanese" width="100%">
    </td>
    <td align="center" width="50%">
      <strong>English (US)</strong><br>
      <img src="screenshots/readme/trade-lens-en-us.png" alt="Trade Lens screenshot in English (US)" width="100%">
    </td>
  </tr>
</table>

---

<a id="readme-tw"></a>
## 繁體中文（台灣）

**Trade Lens** 是一套隱私優先的全球股票交易儀表板，能把券商 CSV 轉成持股總覽、成本走勢、損益分布，以及「若今日賣出」這種很有感的後悔藥分析。資料全程只留在你的瀏覽器，不需要註冊，也不用把交易紀錄送去別人的伺服器。

### 特色

- 支援美股、港股、台股、陸股與日股。
- 可匯入券商 CSV，也能手動補單、調整股名與現價。
- 串接 `yfapi.net` 取得即時股價與匯率換算。
- 內建多語系介面、深色模式與行動裝置版排版。
- 用「若今日賣出」對照實際已實現損益，快速看出賣飛還是避險成功。

### 快速開始

1. Clone repo
   ```bash
   git clone https://git.bluesway.org/bluesway/trade-lens.git
   cd trade-lens
   ```
2. 安裝依賴
   ```bash
   npm install
   ```
3. 啟動開發環境
   ```bash
   npm run dev
   ```
4. 在管理面板貼上 `yfapi.net` API Key，然後匯入你的 CSV。

---

<a id="readme-cn"></a>
## 简体中文（中国）

**Trade Lens** 是一款以隐私为优先的全球股票交易仪表盘，可以把券商 CSV 转成持仓总览、成本走势、盈亏分布，以及“如果今天卖出”的复盘视角。所有数据都只保留在浏览器本地，不需要注册，也不会把交易记录上传到服务器。

### 特性

- 支持美股、港股、台股、中国 A 股和日股。
- 可导入券商 CSV，也支持手动补录、修改股名和现价。
- 接入 `yfapi.net` 获取实时股价与汇率换算。
- 内建多语言界面、深色模式与移动端适配。
- 通过“如果今天卖出”对照实际已实现盈亏，快速看出是卖飞还是成功对冲。

### 快速开始

1. 克隆仓库
   ```bash
   git clone https://git.bluesway.org/bluesway/trade-lens.git
   cd trade-lens
   ```
2. 安装依赖
   ```bash
   npm install
   ```
3. 启动开发环境
   ```bash
   npm run dev
   ```
4. 在管理面板填入 `yfapi.net` API Key，然后导入你的 CSV。

---

<a id="readme-jp"></a>
## 日本語

**Trade Lens** は、プライバシー重視で設計されたグローバル株式向けの取引ダッシュボードです。証券会社の CSV を、保有状況、取得原価の推移、損益分布、さらに「今日売却した場合」の比較分析までまとめて可視化できます。データはブラウザ内だけに保存され、サーバーへ送信されません。

### 特長

- 米国株、香港株、台湾株、中国 A 株、日本株に対応。
- 証券会社 CSV の読み込みに加え、手入力での取引追加や銘柄名の補正も可能。
- `yfapi.net` を使って株価と為替を更新。
- 多言語 UI、ダークモード、モバイル表示に対応。
- 「今日売却した場合」と実際の実現損益を比べて、利確が上手かったか早売りだったかを見やすく表示。

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

---

<a id="readme-en-us"></a>
## English (US)

**Trade Lens** is a privacy-first trading dashboard for global stock investors. It turns brokerage CSV exports into holdings views, cost-basis trends, P&L breakdowns, and a highly practical “If Sold Today” lens for reviewing exits. Your data stays in the browser, so there is no account system and no server-side trade storage.

### Highlights

- Supports U.S., Hong Kong, Taiwan, China A-share, and Japan equity markets.
- Imports brokerage CSV files and also supports manual trade entry and name overrides.
- Uses `yfapi.net` for live quotes and FX conversion.
- Includes multilingual UI support, dark mode, and responsive layouts.
- Compares realized P&L with “If Sold Today” outcomes so you can spot timely exits vs. missed upside.

### Quick Start

1. Clone the repository
   ```bash
   git clone https://git.bluesway.org/bluesway/trade-lens.git
   cd trade-lens
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```
4. Add your `yfapi.net` API key in the manager panel, then import your CSV.

---

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Recharts
- i18next / react-i18next
- IndexedDB

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.
