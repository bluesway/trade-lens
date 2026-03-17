# CSV 导入 UX 流程

[繁體中文（台灣）](csv-import-ux.md) · **简体中文（中国）** · [日本語](csv-import-ux.ja-JP.md) · [English (US)](csv-import-ux.en-US.md)

工程导向文档：[`csv-import-engineering.zh-CN.md`](csv-import-engineering.zh-CN.md)

这份文档描述的是目前 Trade Lens 在用户按下 `Import CSV` 之后，实际会发生的 UX 流程。

## 流程图

```text
选择 CSV parser
    |
按下 Import CSV
    |
选择 .csv 文件
    |
前端预解析
    |
    +-- 解析失败 -----------------> 显示错误 toast -> 结束
    |
    +-- 解析成功，且目前只有 demo -> 直接套用导入
    |                                 |
    |                                 +-> 成功 toast + 右上 diagnostics
    |
    +-- 解析成功，且已有正式数据 -> 打开 Import review dialog
                                      |
                                      +-> 可先导出当前数据备份
                                      |
                                      +-> 选 Append unique rows
                                      |      |
                                      |      +-> 跳过完全重复记录
                                      |
                                      +-> 或选 Replace current data
                                             |
                                             +-> 成功 toast + 右上 diagnostics
```

## 用户会先看到什么

- 页首有一个 `CSV parser` 下拉选择框。
- 选项分成三组：
  - `Recommended`
  - `Broker presets`
  - `Generic templates`
- 默认值是 `Auto detect`。
- 如果用户知道 CSV 来自哪家券商，可以先手动切到对应 preset。

## 按下 Import CSV 之后

### 1. 文件选择

- 按钮会打开系统文件选择器。
- 目前只接受 `.csv`。

### 2. 预解析

前端会先解析文件，但这一步**不会立刻覆盖数据**。系统会先做：

- 判断 delimiter：
  - `,`
  - `;`
  - `tab`
- 尝试识别最像的 parser profile
- 建立标准字段映射
- 判断导入内容是：
  - `Trades`
  - `Positions snapshot`
- 正规化数据：
  - 买卖方向
  - 数字格式
  - 券商特定字段
  - 某些市场的代码补零

### 3. 预解析失败时

如果发生以下情况，系统会直接显示错误 toast，并且**不动已有数据**：

- 文件为空
- 缺少必要字段
- 某些行宽明显错误，例如未加引号的逗号金额把字段切烂
- 全文件没有任何可导入的交易行

## Demo 数据与正式数据的区别

### 只有 demo 数据时

- 如果当前浏览器里只有 demo 数据，导入成功后会直接套用。
- 这时不会弹出 review dialog。

### 已有正式数据时

- 如果浏览器里已经有用户自己的数据，系统不会直接覆盖。
- 会先打开 `Import review` 对话框。

## Import Review Dialog

这个对话框是导入前的最后一道确认。

### 对话框会显示

- 文件名
- 检测到的 parser
- parser mode
  - `Auto-detected`
  - `Manual preset`
- import kind
  - `Trades`
  - `Positions snapshot`
- delimiter
- 当前已有多少笔数据
- 这次会导入多少笔
- parser 在预解析阶段跳过了多少笔

### 对话框中的备份选项

- 有一个 checkbox：`Export current data as a CSV backup first`
- 默认勾选
- 如果勾着，正式套用前会先导出当前数据

## 两种套用模式

### Append unique rows

- 把新数据追加到当前数据后面
- 完全相同的交易记录会被跳过，不会重复导入

目前 duplicate 判断会比对完整 canonical row signature：

- `日期`
- `類型`
- `代號`
- `市場`
- `數量`
- `單價`
- `總金額`
- `損益`

数字字段会先做正规化，所以 `10` 与 `10.0000` 会被视为同一个值。

### Replace current data

- 用这份 CSV 直接替换当前浏览器里的 active dataset
- 适合把新导出的 CSV 当成新的 source of truth

## 导入成功后的反馈

### Toast

成功 toast 会说明：

- 导入了多少笔
- 这次是 append 还是 replace
- 使用了哪个 parser
- 使用了哪种 delimiter
- 是否有 skipped rows

如果导入的是持仓快照，toast 也会明确说明它被转成 synthetic buy rows。

### 右上角 diagnostics badge

页首右上角会保留上一次导入摘要。badge 会显示：

- parser 名称
- 成功写入多少笔
- 如果有，跳过了多少笔

鼠标移上去后可以看到更完整的诊断信息：

- Profile
- Mode
- Apply mode
- Import kind
- Delimiter
- Imported rows
- Parser skipped
- Exact duplicates skipped

## 这套 UX 目前解决了什么

- 避免一按导入就直接洗掉已有数据
- 避免 CSV 格式错误时悄悄写入脏数据
- 避免 append 时重复导入完全相同的记录
- 让用户知道 parser 到底吃到了哪种版型
- 让 broker preset 不只是名称，而是真的影响解析行为

## 这套 UX 目前没有做什么

- 不会自动修复券商导出本身就有问题的内容
- 不会把近似交易自动合并成同一笔
- 不会用模糊条件替用户自动覆写旧数据
- 香港部分仍有一些券商只属于 first-pass 支持

## 一句话版本

现在的导入 UX 不是“按下去赌运气”，而是：

`先解析 -> 先告知 -> 先让用户选 append 或 replace -> 再写入 -> 最后把诊断结果留在画面上`
