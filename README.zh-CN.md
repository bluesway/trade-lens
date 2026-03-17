<p align="center">
  <img src="screenshots/logo.svg" width="112" height="112" alt="Trade Lens Logo">
</p>

# Trade Lens

<p align="center">
  面向全球股票投资者的隐私优先交易面板，把券商 CSV 变成一眼能看懂的持仓全貌。
</p>

[繁體中文（台灣）](README.md) · **简体中文（中国）** · [日本語](README.ja-JP.md) · [English (US)](README.en-US.md)

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
  <img src="screenshots/readme/trade-lens-cn.png" alt="Trade Lens 简体中文界面预览" width="100%">
</p>

---

## 产品介绍

**Trade Lens** 是一款以隐私为优先的全球股票交易仪表盘，可以把券商 CSV 转成持仓总览、成本曲线、盈亏分布，连“如果今天卖出”这种复盘视角也能一起算出来。所有数据都只保留在浏览器本地，不需要注册，也不会把交易记录上传到服务器。

### 特性

- 支持美股、港股、台股、中国 A 股和日股，在同一套面板里统一查看。
- 可导入券商 CSV，也支持手动补单、修改股票名称和覆盖最新价格。
- 接入 `yfapi.net` 获取实时股价与汇率换算。
- 内建多语言界面、深色模式与移动端适配。
- 通过“如果今天卖出”对照实际已实现盈亏，快速判断是卖飞了，还是风控做对了。

### 适合拿来做什么

- 把散落在不同券商、不同市场的交易记录收回到同一套面板里。
- 快速查看当前持仓、持仓成本、浮动盈亏和已实现盈亏。
- 从“如果今天卖出”的角度复盘自己的离场时机，到底是卖早了还是卖得漂亮。
- 在不想上传敏感交易数据的前提下，依然完成一套像样的投资分析。

### 快速开始

1. 克隆仓库
   ```bash
   git clone https://github.com/bluesway/trade-lens.git
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
4. 在管理面板填入 `yfapi.net` API Key，然后导入券商 CSV。

## 技术栈

- React 18
- Vite
- Tailwind CSS
- Recharts
- i18next / react-i18next
- IndexedDB

## 许可协议

本项目基于 **MIT License** 发布，详见 [`LICENSE`](LICENSE)。
