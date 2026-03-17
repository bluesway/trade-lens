# CSV 导入工程笔记

[繁體中文（台灣）](csv-import-engineering.md) · **简体中文（中国）** · [日本語](csv-import-engineering.ja-JP.md) · [English (US)](csv-import-engineering.en-US.md)

用户导向文档：[`csv-import-ux.zh-CN.md`](csv-import-ux.zh-CN.md)

这份文档面向工程维护，描述当前 CSV 导入功能的主要模块、数据流和扩展方式。

## 组件分工

- [App.jsx](/Users/howard.cheng/workspace/trade-lens/src/App.jsx)
  - 接住文件上传事件
  - 决定直接套用还是先打开 review dialog
  - 在正式套用前处理备份导出
- [Header.jsx](/Users/howard.cheng/workspace/trade-lens/src/components/Header.jsx)
  - 提供 parser selector
  - 显示导入提示与 last import diagnostics
- [ImportReviewDialog.jsx](/Users/howard.cheng/workspace/trade-lens/src/components/ImportReviewDialog.jsx)
  - 呈现 review UI
  - 让用户选择 append / replace
- [useTradeData.js](/Users/howard.cheng/workspace/trade-lens/src/hooks/useTradeData.js)
  - 负责 prepare / apply 阶段
  - 负责 dedupe、toast、lastImportMeta
- [csvImport.js](/Users/howard.cheng/workspace/trade-lens/src/utils/csvImport.js)
  - 真正的 parser 核心
  - delimiter 检测、header mapping、profile 检测、row normalization

## 数据流

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

## 导入分成两阶段

### prepare 阶段

`prepareCsvImport(text)` 只做解析和校验，不直接写数据。

输出：

- `rows`
- `meta`

如果失败：

- 返回 `null`
- 设置错误 toast
- 清空 `lastImportMeta`

### apply 阶段

`applyPreparedCsvImport(preparedImport, options)` 才会真正改动数据。

支持：

- `mode: append | replace`
- `announceMode`

会做的事：

- append 时先做 exact duplicate dedupe
- 计算 `appliedRowCount`
- 计算 `duplicateRowCount`
- 写入 IndexedDB / local state
- 更新 `lastImportMeta`
- 发成功 toast

## Parser 核心

`parseCSVWithMeta` 当前大致分成这些阶段：

1. 规范化文本换行
2. 尝试多种 delimiter
3. 对前几行做 header inspection
4. 选出最佳 layout
5. 建立 `headerMap`
6. 决定 profile
7. 逐行转成 `rawRow`
8. 按 profile 进入 `normalizeRowForProfile`
9. 验证是否为可导入交易行
10. 输出 `rows + meta`

## Profile 设计

每个 profile 至少包含：

- `id`
- `label`
- `translationKey`
- `importKind`
- `requiredFields`
- `preferredDecimalSeparator`
- `signatureHeaders`

`signatureHeaders` 的用途有两个：

- 给 auto detect 打分
- 让手动 preset 在 required fields 校验前找到对应字段

## Broker-specific normalization

`normalizeRowForProfile` 会根据不同券商走不同的 normalizer。

常见额外处理：

- 市场 fallback
- 代码补零
- fee 并入买入成本
- 持仓快照转 synthetic buy rows
- 根据币别或 suffix 反推 market

## Append dedupe 规则

append 不是模糊合并，而是 exact duplicate skip。

signature 目前使用这些字段：

- `日期`
- `類型`
- `代號`
- `市場`
- `數量`
- `單價`
- `總金額`
- `損益`

注意：

- 数字字段会先做正规化
- `代號` 会转成大写
- 这是刻意保守的设计，避免误伤真实交易

## lastImportMeta 目前负责什么

UI 右上 diagnostics 与成功 toast 依赖的关键字段包括：

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

## 新增券商 preset 的建议流程

1. 先确认公开可查的导出格式或官方说明
2. 决定它属于 `trades` 还是 `positions`
3. 在 `csvImport.js` 里新增 profile
4. 补 `signatureHeaders`
5. 如有需要，新增专属 normalizer
6. 补 `resources.js` 的 label
7. 用 sample CSV 跑 smoke test
8. 至少跑一轮已有 preset regression

## 当前已知限制

- 某些香港券商仍只有 first-pass 支持
- parser 主要还是 header-driven，不是 schema registry
- auto detect 仍可能被过度相似的字段词汇干扰
- 工程上还没有正式 test harness，目前主要靠 node smoke script 和 build 验证

## 一句话版本

当前这套导入系统是：

`Header/App 负责 UX 与流程控制，useTradeData 负责 prepare/apply，csvImport.js 负责 parser 核心和券商规则。`
