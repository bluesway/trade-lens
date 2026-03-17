# CSV Import Engineering Notes

[繁體中文（台灣）](csv-import-engineering.md) · [简体中文（中国）](csv-import-engineering.zh-CN.md) · [日本語](csv-import-engineering.ja-JP.md) · **English (US)**

User-facing doc: [`csv-import-ux.en-US.md`](csv-import-ux.en-US.md)

This document is for maintainers. It describes the main modules, data flow, and extension points behind the current CSV import system.

## Responsibility split

- [App.jsx](/Users/howard.cheng/workspace/trade-lens/src/App.jsx)
  - receives the file upload event
  - decides between direct apply and review dialog
  - handles backup export before apply
- [Header.jsx](/Users/howard.cheng/workspace/trade-lens/src/components/Header.jsx)
  - owns the parser selector
  - shows import help and last import diagnostics
- [ImportReviewDialog.jsx](/Users/howard.cheng/workspace/trade-lens/src/components/ImportReviewDialog.jsx)
  - renders the review UI
  - lets the user choose append or replace
- [useTradeData.js](/Users/howard.cheng/workspace/trade-lens/src/hooks/useTradeData.js)
  - owns the prepare / apply stages
  - owns dedupe, toast copy, and `lastImportMeta`
- [csvImport.js](/Users/howard.cheng/workspace/trade-lens/src/utils/csvImport.js)
  - parser core
  - delimiter detection, header mapping, profile detection, row normalization

## Data flow

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

## Import happens in two stages

### Prepare stage

`prepareCsvImport(text)` parses and validates the file, but does not write data yet.

Outputs:

- `rows`
- `meta`

On failure it:

- returns `null`
- shows an error toast
- clears `lastImportMeta`

### Apply stage

`applyPreparedCsvImport(preparedImport, options)` is the point where data is actually mutated.

Supported options:

- `mode: append | replace`
- `announceMode`

What it does:

- exact duplicate dedupe during append
- calculates `appliedRowCount`
- calculates `duplicateRowCount`
- persists into IndexedDB / local state
- updates `lastImportMeta`
- shows the success toast

## Parser core

`parseCSVWithMeta` currently works roughly like this:

1. normalize line endings
2. try multiple delimiters
3. inspect candidate header rows
4. select the best layout
5. build `headerMap`
6. decide the profile
7. turn each line into `rawRow`
8. pass rows through `normalizeRowForProfile`
9. validate whether each row is importable
10. return `rows + meta`

## Profile design

Each profile has at least:

- `id`
- `label`
- `translationKey`
- `importKind`
- `requiredFields`
- `preferredDecimalSeparator`
- `signatureHeaders`

`signatureHeaders` serves two purposes:

- scoring for auto-detect
- finding mapped fields before required-field validation when a manual preset is selected

## Broker-specific normalization

`normalizeRowForProfile` can route specific brokers through custom normalizers.

Common extra behavior:

- market fallback
- zero-padding local numeric symbols
- folding fees into buy cost
- turning position snapshots into synthetic buy rows
- inferring market from currency or symbol suffix

## Append dedupe rules

Append does not do fuzzy merging. It does exact-duplicate skipping.

The current signature uses:

- `日期`
- `類型`
- `代號`
- `市場`
- `數量`
- `單價`
- `總金額`
- `損益`

Notes:

- numeric fields are normalized before comparison
- `代號` is uppercased
- the design is intentionally conservative to avoid collapsing real trades

## What `lastImportMeta` currently carries

The top-right diagnostics UI and success toasts depend on fields such as:

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

## Recommended workflow for a new broker preset

1. confirm a public export format or official broker documentation
2. decide whether it is `trades` or `positions`
3. add the profile in `csvImport.js`
4. add `signatureHeaders`
5. add a custom normalizer if needed
6. add labels in `resources.js`
7. run a sample CSV smoke test
8. run at least one regression pass across existing presets

## Current limitations

- some Hong Kong brokers are still only first-pass coverage
- the parser is header-driven, not a full schema registry
- auto-detect can still be confused by highly similar header vocabularies
- there is no formal test harness yet; verification is still mostly node smoke scripts plus build

## One-line version

The current import stack is:

`Header/App for UX and flow control, useTradeData for prepare/apply, and csvImport.js for parser core plus broker rules.`
