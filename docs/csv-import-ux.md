# CSV 匯入 UX 流程

**繁體中文（台灣）** · [简体中文（中国）](csv-import-ux.zh-CN.md) · [日本語](csv-import-ux.ja-JP.md) · [English (US)](csv-import-ux.en-US.md)

工程導向文件：[`csv-import-engineering.md`](csv-import-engineering.md)

這份文件描述的是目前 Trade Lens 在使用者按下 `Import CSV` 之後，實際會發生的 UX 流程。

## 流程圖

```text
選擇 CSV parser
    |
按下 Import CSV
    |
挑選 .csv 檔案
    |
前端預解析
    |
    +-- 解析失敗 -----------------> 顯示錯誤 toast -> 結束
    |
    +-- 解析成功，且目前只有 demo -> 直接套用匯入
    |                                 |
    |                                 +-> 成功 toast + 右上 diagnostics
    |
    +-- 解析成功，且已有正式資料 -> 開啟 Import review dialog
                                      |
                                      +-> 可先匯出目前資料備份
                                      |
                                      +-> 選 Append unique rows
                                      |      |
                                      |      +-> 略過完全重複列
                                      |
                                      +-> 或選 Replace current data
                                             |
                                             +-> 成功 toast + 右上 diagnostics
```

## 使用者會先看到什麼

- 頁首有一個 `CSV parser` 下拉選單。
- 選單分成三組：
  - `Recommended`
  - `Broker presets`
  - `Generic templates`
- 預設值是 `Auto detect`。
- 如果使用者知道 CSV 來自哪家券商，可以先手動切到對應 preset。

## 按下 Import CSV 之後

### 1. 檔案選擇

- 按鈕會打開系統檔案選擇器。
- 目前只接受 `.csv`。

### 2. 預解析

前端會先解析檔案，但這一步**不會立刻覆蓋資料**。系統會先做：

- 判斷 delimiter：
  - `,`
  - `;`
  - `tab`
- 嘗試偵測最像的 parser profile
- 建立標準欄位映射
- 判斷匯入內容是：
  - `Trades`
  - `Positions snapshot`
- 正規化資料：
  - 買賣方向
  - 數字格式
  - 券商特定欄位
  - 某些市場的代號補零

### 3. 預解析失敗時

如果發生以下狀況，系統會直接顯示錯誤 toast，並且**不動既有資料**：

- 檔案是空的
- 缺少必要欄位
- 某些列寬度明顯錯誤，例如未加引號的逗號型金額把欄位切爛
- 全檔沒有任何可匯入的交易列

## Demo 資料與正式資料的差別

### 只有 demo 資料時

- 若目前瀏覽器裡只有 demo 資料，匯入成功後會直接套用。
- 這時不會跳 review dialog。

### 已有正式資料時

- 若瀏覽器裡已經有使用者自己的資料，系統不會直接覆蓋。
- 會先打開 `Import review` 對話框。

## Import Review Dialog

這個對話框是匯入前的最後一道確認。

### 對話框會顯示

- 檔名
- 偵測到的 parser
- parser mode
  - `Auto-detected`
  - `Manual preset`
- import kind
  - `Trades`
  - `Positions snapshot`
- delimiter
- 目前已有幾筆資料
- 這次會帶進來幾筆資料
- parser 在預解析階段略過了幾筆

### 對話框中的備份選項

- 有一個 checkbox：`Export current data as a CSV backup first`
- 預設為勾選
- 如果勾著，正式套用前會先匯出目前資料

## 兩種套用模式

### Append unique rows

- 把新資料加到目前資料後面
- 完全相同的交易列會被略過，不會重複匯入

目前 duplicate 判斷會比對完整 canonical row signature：

- `日期`
- `類型`
- `代號`
- `市場`
- `數量`
- `單價`
- `總金額`
- `損益`

數字欄位會先正規化，所以 `10` 與 `10.0000` 會被當成同一個值。

### Replace current data

- 用這份 CSV 直接取代目前瀏覽器裡的 active dataset
- 適合把新匯出的 CSV 當成新的 source of truth

## 匯入成功後會怎麼回饋

### Toast

成功 toast 會說明：

- 匯入幾筆
- 這次是 append 還是 replace
- 使用哪個 parser
- 使用哪種 delimiter
- 是否有 skipped rows

如果匯入的是持倉快照，toast 也會明講它被轉成 synthetic buy rows。

### 右上角 diagnostics badge

頁首右上角會保留上一次匯入摘要。badge 會顯示：

- parser 名稱
- 成功寫入幾筆
- 若有，略過幾筆

滑上去後可看到更完整的診斷資訊：

- Profile
- Mode
- Apply mode
- Import kind
- Delimiter
- Imported rows
- Parser skipped
- Exact duplicates skipped

## 這套 UX 目前解決了什麼

- 避免一按匯入就直接洗掉既有資料
- 避免 CSV 格式錯誤時靜悄悄寫入爛資料
- 避免 append 時重複匯入完全相同的列
- 讓使用者知道 parser 到底吃到哪種版型
- 讓 broker preset 不只是名稱，而是真的影響解析行為

## 這套 UX 目前沒有做什麼

- 不會自動修復券商匯出本身就有問題的內容
- 不會把近似交易自動合併成同一筆
- 不會用模糊條件替使用者自動覆寫舊資料
- 香港部分仍有一些券商只屬於 first-pass 支援

## 一句話版本

現在的匯入 UX 不是「按下去賭運氣」，而是：

`先解析 -> 先告知 -> 先讓使用者選 append 或 replace -> 再寫入 -> 最後把診斷結果留在畫面上`
