# CSV Import UX Flow

[繁體中文（台灣）](csv-import-ux.md) · [简体中文（中国）](csv-import-ux.zh-CN.md) · [日本語](csv-import-ux.ja-JP.md) · **English (US)**

Engineering doc: [`csv-import-engineering.en-US.md`](csv-import-engineering.en-US.md)

This document describes the current end-to-end UX that happens after a user clicks `Import CSV` in Trade Lens.

## Flowchart

```text
Choose CSV parser
    |
Click Import CSV
    |
Pick a .csv file
    |
Frontend pre-parse
    |
    +-- Parse failed ----------------> Show error toast -> stop
    |
    +-- Parse succeeded, demo only -> apply import directly
    |                                 |
    |                                 +-> success toast + top-right diagnostics
    |
    +-- Parse succeeded, user data exists
                                      |
                                      +-> open Import review dialog
                                             |
                                             +-> optional backup export
                                             |
                                             +-> Append unique rows
                                             |      |
                                             |      +-> skip exact duplicates
                                             |
                                             +-> or Replace current data
                                                    |
                                                    +-> success toast + diagnostics
```

## What the user sees first

- The header contains a `CSV parser` selector.
- The selector is grouped into:
  - `Recommended`
  - `Broker presets`
  - `Generic templates`
- The default is `Auto detect`.
- If the user already knows which broker generated the file, they can switch to that preset before importing.

## After the user clicks Import CSV

### 1. File selection

- The button opens the system file picker.
- The UI currently accepts `.csv` only.

### 2. Pre-parse

The frontend parses the file first, but **does not overwrite existing data yet**. It will:

- detect the delimiter
  - `,`
  - `;`
  - `tab`
- detect the most likely parser profile
- map headers into standard fields
- decide whether the import looks like:
  - `Trades`
  - `Positions snapshot`
- normalize row data such as:
  - buy/sell direction
  - number formats
  - broker-specific columns
  - zero-padding for some market symbols

### 3. When pre-parse fails

If any of the following happens, the app shows an error toast and **does not touch existing data**:

- the file is empty
- required headers are missing
- row width is obviously broken, for example by unquoted comma-style numbers
- no importable trade rows were found

## Demo data vs real user data

### When the app still has demo data only

- If the browser only contains demo data, a successful import is applied immediately.
- No review dialog is shown.

### When the browser already has user data

- The app does not overwrite that data immediately.
- It opens the `Import review` dialog first.

## Import Review Dialog

This dialog is the final checkpoint before the app writes anything.

### The dialog shows

- file name
- detected parser
- parser mode
  - `Auto-detected`
  - `Manual preset`
- import kind
  - `Trades`
  - `Positions snapshot`
- delimiter
- current row count
- incoming row count
- how many rows were skipped during pre-parse

### Backup option inside the dialog

- There is a checkbox: `Export current data as a CSV backup first`
- It is enabled by default
- If left enabled, the app exports the current dataset before applying the new CSV

## The two apply modes

### Append unique rows

- Adds new rows after the current dataset
- Exact duplicates are skipped instead of being imported twice

Duplicate detection compares a canonical row signature built from:

- `日期`
- `類型`
- `代號`
- `市場`
- `數量`
- `單價`
- `總金額`
- `損益`

Numeric fields are normalized first, so `10` and `10.0000` count as the same value.

### Replace current data

- Replaces the active in-browser dataset with only the rows from this CSV
- Useful when the new export should become the new source of truth

## What happens after a successful import

### Toast

The success toast reports:

- how many rows were imported
- whether the action was append or replace
- which parser was used
- which delimiter was used
- whether any rows were skipped

If the import is a positions snapshot, the toast also says that the rows were converted into synthetic buy rows.

### Top-right diagnostics badge

The header keeps a summary badge for the most recent import.

The badge shows:

- parser name
- imported row count
- skipped row count, if any

Hovering the badge reveals more detail:

- Profile
- Mode
- Apply mode
- Import kind
- Delimiter
- Imported rows
- Parser skipped
- Exact duplicates skipped

## What this UX already solves

- prevents silent overwrite-on-click behavior
- blocks obviously broken CSV imports before they mutate data
- avoids re-importing exact duplicate rows during append
- tells the user which parser layout was actually used
- makes broker presets affect real parsing logic instead of being just labels

## What this UX does not try to do yet

- repair broken broker exports automatically
- merge near-duplicate trades into one row
- overwrite old rows based on fuzzy matching
- fully cover every Hong Kong broker with an official-schema-grade preset

## One-line version

The current import UX is no longer “click and pray.” It is:

`parse first -> explain first -> let the user choose append or replace -> write data -> keep diagnostics visible`
