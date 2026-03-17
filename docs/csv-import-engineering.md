# CSV 匯入工程筆記

**繁體中文（台灣）** · [简体中文（中国）](csv-import-engineering.zh-CN.md) · [日本語](csv-import-engineering.ja-JP.md) · [English (US)](csv-import-engineering.en-US.md)

使用者導向文件：[`csv-import-ux.md`](csv-import-ux.md)

這份文件是給工程維護用的，描述目前 CSV 匯入功能的主要模組、資料流與擴充方式。

## 元件分工

- [App.jsx](/Users/howard.cheng/workspace/trade-lens/src/App.jsx)
  - 接住檔案上傳事件
  - 決定要直接套用，還是先開 review dialog
  - 在套用前處理備份匯出
- [Header.jsx](/Users/howard.cheng/workspace/trade-lens/src/components/Header.jsx)
  - 提供 parser selector
  - 顯示匯入提示與 last import diagnostics
- [ImportReviewDialog.jsx](/Users/howard.cheng/workspace/trade-lens/src/components/ImportReviewDialog.jsx)
  - 呈現 review UI
  - 讓使用者選 append / replace
- [useTradeData.js](/Users/howard.cheng/workspace/trade-lens/src/hooks/useTradeData.js)
  - 負責 prepare / apply 階段
  - 負責 dedupe、toast、lastImportMeta
- [csvImport.js](/Users/howard.cheng/workspace/trade-lens/src/utils/csvImport.js)
  - 真正的 parser 核心
  - delimiter 偵測、header mapping、profile 偵測、row normalization

## 資料流

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

## 匯入分成兩階段

### prepare 階段

`prepareCsvImport(text)` 只做解析與驗證，不直接寫入資料。

輸出：

- `rows`
- `meta`

如果失敗：

- 回傳 `null`
- 設定錯誤 toast
- 清掉 `lastImportMeta`

### apply 階段

`applyPreparedCsvImport(preparedImport, options)` 才會真正改動資料。

支援：

- `mode: append | replace`
- `announceMode`

會做的事：

- append 時先跑 exact duplicate dedupe
- 計算 `appliedRowCount`
- 計算 `duplicateRowCount`
- 寫入 IndexedDB / local state
- 更新 `lastImportMeta`
- 發成功 toast

## Parser 核心

`parseCSVWithMeta` 目前大致分成這幾段：

1. 正規化文本換行
2. 嘗試多種 delimiter
3. 對前幾列做 header inspection
4. 選出最佳 layout
5. 建立 `headerMap`
6. 決定 profile
7. 逐列轉成 `rawRow`
8. 依 profile 進入 `normalizeRowForProfile`
9. 驗證是否為可匯入交易列
10. 輸出 `rows + meta`

## Profile 設計

每個 profile 至少包含：

- `id`
- `label`
- `translationKey`
- `importKind`
- `requiredFields`
- `preferredDecimalSeparator`
- `signatureHeaders`

`signatureHeaders` 有兩個用途：

- 幫 auto detect 打分
- 幫手動 preset 在 required fields 驗證前找到對應欄位

## Broker-specific normalization

`normalizeRowForProfile` 會針對不同券商走不同的 normalizer。

常見額外處理：

- 市場 fallback
- 代號補零
- fee 併入買入成本
- 持倉快照轉 synthetic buy rows
- 用幣別或 suffix 反推 market

## Append dedupe 規則

append 不是模糊合併，而是 exact duplicate skip。

signature 目前使用這些欄位：

- `日期`
- `類型`
- `代號`
- `市場`
- `數量`
- `單價`
- `總金額`
- `損益`

注意：

- 數字欄位會先正規化
- `代號` 會轉大寫
- 這是刻意保守設計，避免誤傷真實交易

## lastImportMeta 目前承擔什麼

UI 右上 diagnostics 與成功 toast 依賴的重點欄位包括：

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

## 新增券商 preset 的建議流程

1. 先確認公開可查的匯出格式或官方說明
2. 決定它應該是 `trades` 還是 `positions`
3. 在 `csvImport.js` 新增 profile
4. 補 `signatureHeaders`
5. 如有需要，新增專屬 normalizer
6. 補 `resources.js` 的 label
7. 用 sample CSV 跑 smoke test
8. 跑至少一輪既有 preset regression

## 目前已知限制

- 某些香港券商仍只有 first-pass 支援
- parser 主要是 header-driven，不是 schema registry
- auto detect 仍可能被過度相似的欄位語彙干擾
- engineering 上還沒有正式 test harness，現在主要靠 node smoke script 與 build 驗證

## 一句話版本

目前這套匯入系統是：

`Header/App 負責 UX 與流程控制，useTradeData 負責 prepare/apply，csvImport.js 負責 parser 核心與券商規則。`
