# CSV 匯入 UX 流程

這份文件描述的是目前 Trade Lens 前端在使用者按下 `Import CSV` 之後，實際會發生的 UX 流程與系統行為。

## 流程總覽

1. 使用者先在頁首選擇 `CSV parser`。
2. 使用者按下 `Import CSV` 並挑選檔案。
3. 前端先做預解析，不會立刻覆蓋既有資料。
4. 如果 CSV 有問題，直接顯示錯誤 toast，流程中止。
5. 如果目前只有 demo 資料，直接套用匯入結果。
6. 如果瀏覽器裡已經有正式資料，先跳出匯入檢查對話框。
7. 使用者決定是否先備份目前資料。
8. 使用者選擇 `Append unique rows` 或 `Replace current data`。
9. 匯入完成後，右上角保留本次匯入診斷資訊，toast 也會說明結果。

## 入口與預設

- 頁首有一個 `CSV parser` 下拉選單。
- 選單分成三組：
  - `Recommended`
  - `Broker presets`
  - `Generic templates`
- 預設值是 `Auto detect`。
- 如果使用者知道檔案來自特定券商，可以先手動切到對應 preset。
- 如果使用者不確定，先用 `Auto detect` 是目前最穩的路徑。

## 使用者按下 Import CSV 後

### 1. 檔案選擇

- `Import CSV` 按鈕會打開系統檔案選擇器。
- 目前只接受 `.csv`。

### 2. 預解析

讀到檔案後，前端會先跑一次預解析。這一步會做：

- 判斷分隔符號：
  - `,`
  - `;`
  - `tab`
- 嘗試偵測最像的 parser profile
- 建立標準欄位對應
- 判斷匯入內容是：
  - `Trades`
  - `Positions snapshot`
- 正規化欄位內容，例如：
  - 買賣方向
  - 數字格式
  - 券商特定欄位
  - 某些市場的代號補零

### 3. 預解析失敗時

如果發生以下狀況，系統不會動到既有資料，會直接顯示錯誤 toast：

- 檔案是空的
- 缺少必要欄位
- 某些資料列寬度明顯錯誤，像是逗號型數字把欄位切爛
- 全檔找不到任何可匯入的交易列

## Demo 資料與正式資料的分歧

### 只有 demo 資料時

- 如果目前畫面上的資料還是 demo 狀態，匯入成功後會直接套用。
- 這時不會跳 review dialog。

### 已經有正式資料時

- 如果瀏覽器裡已經有使用者自己的資料，系統不會直接覆蓋。
- 會先打開 `Import review` 對話框。

## Import Review Dialog

這個對話框的目的是讓使用者在真正動資料前，先知道系統準備怎麼吃這份 CSV。

### 對話框會顯示的資訊

- 檔名
- 偵測到的 parser
- parser mode
  - `Auto-detected`
  - `Manual preset`
- import kind
  - `Trades`
  - `Positions snapshot`
- delimiter
- 目前瀏覽器裡已有幾筆資料
- 這次 CSV 會帶進來幾筆資料
- parser 在預解析階段略過了幾筆

### 對話框中的備份選項

- 有一個 checkbox: `Export current data as a CSV backup first`
- 預設是勾選
- 如果勾著，正式套用前會先匯出目前資料
- 這樣匯入結果不對勁時，可以把備份再匯回來

## 使用者可選的兩種套用模式

### 1. Append unique rows

- 把這次 CSV 的資料追加到現有資料後面
- 但不會盲目重複匯入完全相同的列
- 系統會做 exact duplicate dedupe

目前 duplicate 判斷是看完整 canonical row signature，包含：

- `日期`
- `類型`
- `代號`
- `市場`
- `數量`
- `單價`
- `總金額`
- `損益`

另外，數字欄位會先正規化再比對，所以：

- `10`
- `10.0000`

會被當成同一個值。

只有完全相同的交易列才會被略過，不會做危險的半套合併或 row overwrite。

### 2. Replace current data

- 用這份 CSV 直接取代目前瀏覽器裡的 active dataset
- 適合把新匯出的檔案當成新的 source of truth

## 匯入成功後的回饋

### Toast

匯入成功後的 toast 不是單純顯示「成功」而已，會帶這些資訊：

- 匯入幾筆
- 這次是 append 還是 replace
- 用的是哪個 parser
- 使用哪種 delimiter
- 是否有略過列

如果匯入的是持倉快照，toast 也會明講它被轉成 synthetic buy rows。

### 右上角 Import Diagnostics Badge

頁首右上角會保留上一次匯入的摘要 badge。

badge 會顯示：

- parser 名稱
- 成功寫入幾筆
- 如果有，略過幾筆

滑上去後可以看到更完整的 diagnostics：

- Profile
- Mode
  - auto-detected / manual preset
- Apply mode
  - append / replace
- Import kind
  - trades / positions
- Delimiter
- Imported rows
- Parser skipped
- Exact duplicates skipped

## Positions Snapshot 的特例

- 某些券商 preset 會把持倉快照匯入成 synthetic buy rows
- 這樣做的目的是讓 Trade Lens 可以直接建立持股與成本基礎
- 這類匯入在 UI 上會標示成 `Positions snapshot`

## 目前這套 UX 解決了什麼問題

- 避免一按匯入就直接洗掉既有資料
- 避免 CSV 格式錯誤時靜悄悄寫入爛資料
- 避免 append 時重複匯入完全相同的列
- 讓使用者知道 parser 到底吃到了哪一種版型
- 讓 broker-specific preset 不只是下拉選單名稱，而是真的影響解析行為

## 目前仍然不是這套 UX 要解決的事

- 它不會幫使用者修正錯誤的券商匯出內容
- 它不會把近似交易自動合併成同一筆
- 它不會判斷「看起來像同一筆，但欄位少一點」就替你覆寫
- 香港部分有些券商仍然只有 first-pass 支援，不是官方完整 CSV schema 等級

## 一句話版本

現在的匯入 UX 不是「按下去賭運氣」，而是：

`先解析 -> 先告知 -> 先讓使用者選 append 或 replace -> 再寫入 -> 最後把診斷結果留在畫面上`
