const zhTW = {
  common: {
    language: '語言',
    close: '關閉',
    cancel: '取消',
    save: '儲存',
    edit: '編輯',
    delete: '刪除',
    importCsv: '匯入 CSV',
    exportCsv: '匯出 CSV'
  },
  currencies: {
    TWD: '新台幣 (TWD)',
    CNY: '人民幣 (CNY)',
    HKD: '港元 (HKD)',
    USD: '美元 (USD)',
    JPY: '日圓 (JPY)'
  },
  markets: {
    all: '全部',
    chinaA: '陸股',
    hongKong: '港股',
    taiwan: '台股',
    japan: '日股',
    us: '美股',
    other: '其他',
    unknown: '未知'
  },
  tradeTypes: {
    buy: '買進',
    sell: '賣出'
  },
  timeRanges: {
    oneWeek: '1週',
    oneMonth: '1月',
    threeMonths: '3月',
    halfYear: '半年',
    ytd: 'YTD',
    oneYear: '1年',
    fiveYears: '5年',
    all: '全部'
  },
  app: {
    loadingLocalData: '載入本機 IndexedDB 資料中...',
    generatingImage: '正在產生圖片...',
    imageExportSuccess: '圖片匯出成功！',
    imageExportFail: '圖片匯出失敗',
    noDataToExport: '目前沒有資料可匯出！',
    exportFilenamePrefix: 'trade_records',
    importReviewBadge: '匯入前確認',
    importReviewTitle: '這份 CSV 要怎麼套用？',
    importReviewIntro: '瀏覽器裡已經有正式資料，先決定這次要覆蓋，還是只把新紀錄追加進去。',
    importReviewFile: '檔案',
    importReviewProfile: '偵測版型',
    importReviewMode: '解析模式',
    importReviewKind: '匯入類型',
    importReviewDelimiter: '分隔符',
    importReviewExistingRows: '既有資料',
    importReviewIncomingRows: '待匯入',
    importReviewSkippedRows: '解析略過',
    importReviewBackupLabel: '套用前先匯出目前資料備份',
    importReviewBackupHelp: '如果這包匯入怪怪的，直接把備份再匯回來，比翻瀏覽器資料庫輕鬆多了。',
    importReviewAppendTitle: '追加唯一紀錄',
    importReviewAppendHelp: '把新資料接到目前資料後面。若整列欄位都完全相同，會當成重複紀錄直接略過。',
    importReviewReplaceTitle: '覆蓋目前資料',
    importReviewReplaceHelp: '用這份 CSV 直接取代目前的主資料集。適合這份檔案本身就是新的唯一真相。',
    importReviewAppendAction: '追加唯一紀錄',
    importReviewReplaceAction: '覆蓋目前資料',
    importReviewCancel: '先取消'
  },
  header: {
    title: '全球投資組合儀表板',
    demoDescription: '目前顯示的是精簡版範例資料，匯入完整 CSV 才能看到完整全貌。',
    recordsLoaded: '已成功載入並分析 {{count}} 筆交易紀錄',
    lastUpdated: '資料最後更新：{{value}}',
    switchToLight: '切換到淺色模式',
    switchToDark: '切換到深色模式',
    settingsRecords: '設定與交易',
    updatePrices: '更新行情',
    apiKeyRequired: '需先設定金鑰',
    updateWithCache: '手動更新即時行情（使用快取）',
    setApiKeyFirst: '請先設定 API Key',
    importProfileLabel: 'CSV 版型',
    importModeAutoDetected: '自動偵測',
    importModeManualOverride: '手動指定',
    importKindTrades: '交易紀錄',
    importKindPositions: '持倉快照',
    importApplyModeAppend: '追加到現有資料',
    importApplyModeReplace: '覆蓋目前資料',
    importSummaryTitle: '上次匯入',
    importSummaryProfile: '版型',
    importSummaryMode: '模式',
    importSummaryApply: '套用方式',
    importSummaryKind: '匯入類型',
    importSummaryDelimiter: '分隔符',
    importSummaryImported: '匯入筆數',
    importSummarySkipped: '解析略過',
    importSummaryDuplicates: '重複略過',
    importBadgeImported: '{{count}} 筆',
    importBadgeSkipped: '略過 {{count}} 筆',
    importPresetGroups: {
      recommended: '建議',
      brokerPresets: '券商預設',
      genericTemplates: '泛用模板'
    },
    importProfileHelpAuto: '不確定就先留在自動偵測。只有當特定券商匯出一直被猜錯時，再手動切 preset。',
    importProfileHelpBroker: '券商預設適合已知來源的匯出檔，像 Schwab、IBKR、Firstrade、Robinhood。它會鎖定那家券商常見的欄位語意。',
    importProfileHelpGeneric: '泛用模板適合欄位名稱長得像語言慣例，但不是目前支援的特定券商匯出檔。',
    importProfileAuto: '自動偵測',
    forceRefresh: '強制刷新',
    forceRefreshTitle: '強制更新並消耗額度',
    languageLabel: '切換語言',
    csvTitle: 'CSV 欄位說明',
    csvIntro: '請確認 CSV 至少包含以下標題列，順序不限：',
    csvRows: {
      date: '日期（例如：2025/01/01）',
      type: '類型（買進 / 賣出）',
      symbol: '代號（例如：2330.TW、AAPL）',
      market: '市場（選填，手動新增時可參考）',
      quantity: '數量',
      price: '單價（原幣別）',
      amount: '總金額（原幣別）',
      pnl: '損益（賣出必填，原幣別）'
    },
    csvProfiles: {
      tradeLens: 'Trade Lens 原生',
      brokerZh: '中文券商 CSV',
      brokerEn: '英文券商 CSV',
      brokerJa: '日文券商 CSV',
      brokerKo: '韓文券商 CSV',
      brokerTh: '泰文券商 CSV',
      brokerAr: '阿文券商 CSV',
      brokerEuro: '歐系券商 CSV',
      schwabTransactions: '嘉信交易紀錄 CSV',
      schwabPositions: '嘉信持倉快照 CSV',
      ibkrTransactions: 'IBKR 交易紀錄 CSV',
      ibkrPositions: 'IBKR 持倉快照 CSV',
      firstradeTransactions: 'Firstrade 交易紀錄 CSV',
      robinhoodTransactions: 'Robinhood 交易紀錄 CSV'
    },
    csvDelimiters: {
      tab: 'tab'
    },
    csvNote1: '* 註 1：6 位數且以 6 或 0 開頭的代號，系統會自動判定為陸股（.SS / .SZ）。',
    csvNote2: '* 註 2：其他市場請直接在代號後補上後綴（例如：.TW、.HK）。',
    csvNote3: '* 註 3：系統會自動偵測常見券商 CSV、分號與 tab 分隔格式，匯入後右上角會顯示吃到哪種版型。',
    forceRefreshConfirm: '確定要強制刷新嗎？這會忽略 24 小時快取並實際消耗 API 額度。'
  },
  summary: {
    totalRealized: '總已實現損益（換算）',
    totalUnrealized: '總未實現損益（換算）',
    totalValue: '目前持股市值（換算）',
    holdingCount: '持股檔數',
    holdingUnit: '檔'
  },
  charts: {
    trendTitle: '累積投入走勢',
    saveImage: '將圖表存為圖片',
    noTrend: '目前交易紀錄還不夠，暫時畫不出走勢。',
    realizedTitle: '各股已實現損益（賣飛 / 漂亮出場榜）',
    distributionTitle: '持股市值分布（前 10 檔）',
    convertedNote: '統一換算為 {{currency}}',
    noPnlData: '目前無損益資料',
    noHoldings: '目前空手無持股',
    legendConverted: '{{label}}（換算後）',
    costSeries: '累積投入成本',
    realizedSeries: '累積已實現損益',
    ifSoldSeries: '若今日賣出',
    actualSeries: '實際已實現損益',
    others: '其他'
  },
  table: {
    title: '各股交易紀錄',
    subtitle: '點選列可查看買進與賣出明細，金額皆以該市場原幣顯示',
    columns: {
      symbol: '代號 / 股名（市場 · 幣別）',
      holdingQty: '當前持股數',
      currentValue: '現價 / 市值（原幣）',
      unrealized: '未實現損益（原幣）',
      realized: '實際已實現（原幣）',
      ifSoldToday: '若今日賣出（原幣）',
      date: '日期',
      type: '類型',
      quantity: '數量',
      price: '單價',
      amount: '總金額',
      pnl: '損益',
      actions: '操作'
    },
    manualBadge: '手動',
    manualUpdatedAt: '手動更新於：{{value}}',
    apiUpdatedAt: 'API 最後更新：{{value}}',
    notUpdatedYet: '尚未更新',
    manualNamePlaceholder: '手動股名',
    currentPricePlaceholder: '現價',
    hedgeSuccess: '這筆提早賣反而比較划算（{{value}}）',
    soldTooEarly: '賣早了，少賺 {{value}}',
    tradeDetails: '交易明細',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 股 @ {{price}}',
    mobileHoldingQty: '持股數',
    mobileUnrealized: '未實現損益',
    mobileRealized: '已實現損益'
  },
  manager: {
    title: '設定與交易紀錄',
    clearAndLoadDemo: '清除並載入範例資料',
    apiKeyTitle: 'yfapi.net API 金鑰設定',
    getFreeApiKey: '免費註冊取得',
    apiKeyPlaceholder: '請貼上您的 x-api-key（例如：A2sD8...）',
    saveApiKey: '儲存金鑰',
    baseCurrencyTitle: '總覽卡片基礎幣別',
    baseCurrencyHelp: '* 所有外幣資產都會透過即時匯率換算為此幣別，方便在上方總覽卡片統一加總。',
    hideZeroHolding: '隱藏已無持股的交易紀錄',
    manualRecordTitle: '手動新增交易',
    fields: {
      date: '日期',
      type: '類型',
      market: '市場',
      symbol: '代號',
      quantity: '數量',
      price: '單價（原幣）',
      amount: '總金額（原幣）',
      pnl: '損益（賣出填，原幣）'
    },
    placeholders: {
      symbol: '例如：2330.TW',
      quantity: '股數',
      price: '單股價格',
      amount: '依該市場幣別',
      pnl: '選填'
    },
    saveChanges: '儲存變更',
    addRecord: '加入',
    noRecords: '目前沒有任何紀錄'
  },
  notice: {
    title: '歡迎使用 Trade Lens',
    body: '這是一套為投資人打造的開源工具，可把券商 CSV 轉成成本走勢、損益分布與持股配置圖，讓您更快掌握整體投資節奏。',
    privacy: '隱私安全：所有資料只存在瀏覽器本地（IndexedDB），不會送去伺服器。',
    apiKey: 'API 金鑰：只用來向 yfapi.net 抓股價，而且同樣只存在本地。',
    sourceCode: '開放原始碼：查看專案並參與貢獻',
    dismiss: '不再顯示'
  },
  messages: {
    apiKeySaved: 'API 金鑰已更新並儲存！',
    manualStockSaved: '已手動更新 {{symbol}} 資訊',
    needApiKey: '請先在管理面板輸入 yfapi.net 金鑰，才能更新行情',
    cacheFresh: '所有股價與匯率都在 24 小時內更新過，已直接使用本機快取節省額度。',
    updateSuccess: '成功更新 {{count}} 檔股票與匯率資訊！',
    fetchFailed: '抓取失敗：{{message}}',
    baseCurrencyChanged: '基礎計價幣別已切換為 {{currency}}，正在更新匯率...',
    csvImportApplyAppend: '已追加到現有資料',
    csvImportApplyReplace: '已覆蓋目前資料',
    csvImportSuccess: '已匯入 {{count}} 筆交易（{{profile}} · {{delimiter}}）',
    csvImportSuccessSkipped: '已匯入 {{count}} 筆交易，略過 {{skipped}} 筆不支援列（{{profile}} · {{delimiter}}）',
    csvImportSuccessApplied: '已匯入 {{count}} 筆交易，{{action}}（{{profile}} · {{delimiter}}）',
    csvImportSuccessAppliedSkipped: '已匯入 {{count}} 筆交易，{{action}}，並略過 {{skipped}} 筆紀錄（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositions: '已匯入 {{count}} 筆持倉，並轉成合成買入紀錄（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositionsSkipped: '已匯入 {{count}} 筆持倉並轉成合成買入紀錄，略過 {{skipped}} 筆不支援列（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositionsApplied: '已匯入 {{count}} 筆持倉並轉成合成買入紀錄，{{action}}（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositionsAppliedSkipped: '已匯入 {{count}} 筆持倉並轉成合成買入紀錄，{{action}}，並略過 {{skipped}} 筆紀錄（{{profile}} · {{delimiter}}）',
    csvImportFailedNoData: 'CSV 匯入失敗：找不到可用的交易資料。',
    csvImportFailedHeaders: 'CSV 匯入失敗：缺少必要欄位 {{fields}}。',
    csvImportFailedRowWidth: 'CSV 匯入失敗：第 {{row}} 列欄位數爆掉了，通常是 {{delimiter}} 分隔檔裡的數字千分位沒被正確包住。',
    recordUpdated: '交易紀錄已更新！',
    dataCleared: '已清除資料並載入範例資料',
    clearConfirm: '確定要清除所有資料並載入範例資料嗎？此動作無法復原！',
    backupConfirm: '清除之前，要不要先把目前資料匯出成 CSV 備份？'
  },
  data: {
    unknownSymbol: '未知代號（{{symbol}}）',
    unknown: '未知'
  }
};

const yueHantHK = {
  common: {
    language: '語言',
    close: '關閉',
    cancel: '取消',
    save: '儲存',
    edit: '編輯',
    delete: '刪除',
    importCsv: '匯入 CSV',
    exportCsv: '匯出 CSV'
  },
  currencies: {
    TWD: '新台幣 (TWD)',
    CNY: '人民幣 (CNY)',
    HKD: '港元 (HKD)',
    USD: '美元 (USD)',
    JPY: '日圓 (JPY)'
  },
  markets: {
    all: '全部',
    chinaA: 'A 股',
    hongKong: '港股',
    taiwan: '台股',
    japan: '日股',
    us: '美股',
    other: '其他',
    unknown: '未知'
  },
  tradeTypes: {
    buy: '買入',
    sell: '沽出'
  },
  timeRanges: {
    oneWeek: '1週',
    oneMonth: '1個月',
    threeMonths: '3個月',
    halfYear: '半年',
    ytd: 'YTD',
    oneYear: '1年',
    fiveYears: '5年',
    all: '全部'
  },
  app: {
    loadingLocalData: '載入本機 IndexedDB 資料中...',
    generatingImage: '生成圖片中...',
    imageExportSuccess: '圖片匯出成功！',
    imageExportFail: '圖片匯出失敗',
    noDataToExport: '而家冇資料可以匯出！',
    exportFilenamePrefix: 'trade_records',
    importReviewBadge: '匯入前確認',
    importReviewTitle: '呢份 CSV 要點樣套用？',
    importReviewIntro: '瀏覽器入面已經有正式資料，先揀今次係覆蓋，定係只將新紀錄追加落去。',
    importReviewFile: '檔案',
    importReviewProfile: '偵測版型',
    importReviewMode: '解析模式',
    importReviewKind: '匯入類型',
    importReviewDelimiter: '分隔符',
    importReviewExistingRows: '現有資料',
    importReviewIncomingRows: '待匯入',
    importReviewSkippedRows: '解析略過',
    importReviewBackupLabel: '套用前先匯出而家資料做備份',
    importReviewBackupHelp: '如果今次匯入有古怪，直接將備份再匯返入嚟，會比翻瀏覽器資料庫輕鬆得多。',
    importReviewAppendTitle: '追加唯一紀錄',
    importReviewAppendHelp: '將新資料接喺而家資料後面。若果成列欄位完全一樣，會當成重複紀錄直接略過。',
    importReviewReplaceTitle: '覆蓋而家資料',
    importReviewReplaceHelp: '用呢份 CSV 直接取代而家主資料集。適合呢份檔本身就係最新唯一真相。',
    importReviewAppendAction: '追加唯一紀錄',
    importReviewReplaceAction: '覆蓋而家資料',
    importReviewCancel: '先取消'
  },
  header: {
    title: '全球投資組合儀表板',
    demoDescription: '而家顯示緊精簡版示範資料，匯入完整 CSV 先睇到全貌。',
    recordsLoaded: '已成功載入並分析 {{count}} 筆交易紀錄',
    lastUpdated: '資料最後更新：{{value}}',
    switchToLight: '切換到淺色模式',
    switchToDark: '切換到深色模式',
    settingsRecords: '設定與交易',
    updatePrices: '更新報價',
    apiKeyRequired: '要先設金鑰',
    updateWithCache: '手動更新即時報價（用快取）',
    setApiKeyFirst: '請先設定 API Key',
    importProfileLabel: 'CSV 版型',
    importModeAutoDetected: '自動偵測',
    importModeManualOverride: '手動指定',
    importKindTrades: '交易紀錄',
    importKindPositions: '持倉快照',
    importApplyModeAppend: '追加到現有資料',
    importApplyModeReplace: '覆蓋而家資料',
    importSummaryTitle: '上次匯入',
    importSummaryProfile: '版型',
    importSummaryMode: '模式',
    importSummaryApply: '套用方式',
    importSummaryKind: '匯入類型',
    importSummaryDelimiter: '分隔符',
    importSummaryImported: '匯入筆數',
    importSummarySkipped: '解析略過',
    importSummaryDuplicates: '重複略過',
    importBadgeImported: '{{count}} 筆',
    importBadgeSkipped: '略過 {{count}} 筆',
    importPresetGroups: {
      recommended: '建議',
      brokerPresets: '券商預設',
      genericTemplates: '泛用模板'
    },
    importProfileHelpAuto: '唔肯定就先留喺自動偵測。只有當某份券商匯出成日估錯，先再手動揀 preset。',
    importProfileHelpBroker: '券商預設適合已知來源嘅匯出檔，例如 Schwab、IBKR、Firstrade、Robinhood。佢會鎖定嗰間券商常見欄位語意。',
    importProfileHelpGeneric: '泛用模板適合欄位名睇落似語言慣例，但唔係目前支援嘅指定券商匯出檔。',
    importProfileAuto: '自動偵測',
    forceRefresh: '強制刷新',
    forceRefreshTitle: '強制更新並消耗額度',
    languageLabel: '切換語言',
    csvTitle: 'CSV 欄位說明',
    csvIntro: '請確認 CSV 至少有以下標題列（次序不限）：',
    csvRows: {
      date: '日期（例如：2025/01/01）',
      type: '類型（買入 / 沽出）',
      symbol: '代號（例如：0700.HK、AAPL）',
      market: '市場（選填，方便手動新增）',
      quantity: '數量',
      price: '單價（原幣）',
      amount: '總金額（原幣）',
      pnl: '損益（沽出必填，原幣）'
    },
    csvProfiles: {
      tradeLens: 'Trade Lens 原生',
      brokerZh: '中文券商 CSV',
      brokerEn: '英文券商 CSV',
      brokerJa: '日文券商 CSV',
      brokerKo: '韓文券商 CSV',
      brokerTh: '泰文券商 CSV',
      brokerAr: '阿文券商 CSV',
      brokerEuro: '歐系券商 CSV',
      schwabTransactions: '嘉信交易紀錄 CSV',
      schwabPositions: '嘉信持倉快照 CSV',
      ibkrTransactions: 'IBKR 交易紀錄 CSV',
      ibkrPositions: 'IBKR 持倉快照 CSV',
      firstradeTransactions: 'Firstrade 交易紀錄 CSV',
      robinhoodTransactions: 'Robinhood 交易紀錄 CSV'
    },
    csvDelimiters: {
      tab: 'tab'
    },
    csvNote1: '* 註 1：6 位數且以 6 或 0 開頭的代號，系統會自動判做 A 股（.SS / .SZ）。',
    csvNote2: '* 註 2：其他市場請直接喺代號後面加後綴（例如：.TW、.HK）。',
    csvNote3: '* 註 3：系統會自動偵測常見券商 CSV、分號同 tab 分隔格式，匯入後右上角會見到食咗邊種版型。',
    forceRefreshConfirm: '確定要強制刷新？呢個動作會無視 24 小時快取，仲會真係扣 API 額度。'
  },
  summary: {
    totalRealized: '總已實現損益（換算）',
    totalUnrealized: '總未實現損益（換算）',
    totalValue: '現時持倉市值（換算）',
    holdingCount: '持倉數目',
    holdingUnit: '隻'
  },
  charts: {
    trendTitle: '累積投入走勢',
    saveImage: '將圖表存成圖片',
    noTrend: '而家交易紀錄唔夠，未畫到走勢。',
    realizedTitle: '各股已實現損益（賣飛 / 靚位離場榜）',
    distributionTitle: '持股市值分佈（Top 10）',
    convertedNote: '統一換算成 {{currency}} 顯示',
    noPnlData: '而家冇損益資料',
    noHoldings: '而家未有持股',
    legendConverted: '{{label}}（換算後）',
    costSeries: '累積投入成本',
    realizedSeries: '累積已實現損益',
    ifSoldSeries: '如果今日先沽',
    actualSeries: '實際已實現損益',
    others: '其他'
  },
  table: {
    title: '各股交易紀錄',
    subtitle: '撳開一行可睇買入同沽出明細，金額都會以該市場原幣顯示',
    columns: {
      symbol: '代號 / 股名（市場 · 幣別）',
      holdingQty: '現時持股數',
      currentValue: '現價 / 市值（原幣）',
      unrealized: '未實現損益（原幣）',
      realized: '實際已實現（原幣）',
      ifSoldToday: '如果今日先沽（原幣）',
      date: '日期',
      type: '類型',
      quantity: '數量',
      price: '單價',
      amount: '總金額',
      pnl: '損益',
      actions: '操作'
    },
    manualBadge: '手動',
    manualUpdatedAt: '手動更新於：{{value}}',
    apiUpdatedAt: 'API 最後更新：{{value}}',
    notUpdatedYet: '未更新',
    manualNamePlaceholder: '手動股名',
    currentPricePlaceholder: '現價',
    hedgeSuccess: '呢筆早啲沽反而着數（{{value}}）',
    soldTooEarly: '沽早咗，少賺 {{value}}',
    tradeDetails: '交易明細',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 股 @ {{price}}',
    mobileHoldingQty: '持股數',
    mobileUnrealized: '未實現損益',
    mobileRealized: '已實現損益'
  },
  manager: {
    title: '設定與交易紀錄',
    clearAndLoadDemo: '清除並載入示範資料',
    apiKeyTitle: 'yfapi.net API 金鑰設定',
    getFreeApiKey: '免費註冊取得',
    apiKeyPlaceholder: '請貼上您的 x-api-key（例如：A2sD8...）',
    saveApiKey: '儲存金鑰',
    baseCurrencyTitle: '總覽卡片基礎幣別',
    baseCurrencyHelp: '* 所有外幣資產都會經即時匯率換算成呢個幣別，方便喺上面總覽卡片一齊計。',
    hideZeroHolding: '隱藏已經冇持股嘅交易紀錄',
    manualRecordTitle: '手動新增交易',
    fields: {
      date: '日期',
      type: '類型',
      market: '市場',
      symbol: '代號',
      quantity: '數量',
      price: '單價（原幣）',
      amount: '總金額（原幣）',
      pnl: '損益（沽出填，原幣）'
    },
    placeholders: {
      symbol: '例如：0700.HK',
      quantity: '股數',
      price: '單股價格',
      amount: '按市場幣別',
      pnl: '選填'
    },
    saveChanges: '儲存變更',
    addRecord: '加入',
    noRecords: '而家冇任何紀錄'
  },
  notice: {
    title: '歡迎使用 Trade Lens',
    body: '呢個係專為投資者設計嘅開源工具，可以將券商 CSV 轉成成本走勢、損益分佈同持倉配置圖。',
    privacy: '私隱安全：所有資料都只會留喺瀏覽器本地（IndexedDB），唔會經過伺服器。',
    apiKey: 'API 金鑰：只用嚟向 yfapi.net 讀股價，而且一樣只會留喺本地。',
    sourceCode: '開放原始碼：查看專案並參與貢獻',
    dismiss: '唔再顯示'
  },
  messages: {
    apiKeySaved: 'API 金鑰已更新並儲存！',
    manualStockSaved: '已手動更新 {{symbol}} 嘅資訊',
    needApiKey: '請先喺管理面板輸入 yfapi.net 金鑰，先可以更新報價',
    cacheFresh: '所有股價同匯率都喺 24 小時內更新過，直接用本機快取幫你慳額度。',
    updateSuccess: '成功更新 {{count}} 隻股票同匯率資訊！',
    fetchFailed: '抓取失敗：{{message}}',
    baseCurrencyChanged: '基礎計價幣別已切換成 {{currency}}，而家更新匯率...',
    csvImportApplyAppend: '已追加到現有資料',
    csvImportApplyReplace: '已覆蓋而家資料',
    csvImportSuccess: '已匯入 {{count}} 筆交易（{{profile}} · {{delimiter}}）',
    csvImportSuccessSkipped: '已匯入 {{count}} 筆交易，略過 {{skipped}} 筆唔支援列（{{profile}} · {{delimiter}}）',
    csvImportSuccessApplied: '已匯入 {{count}} 筆交易，{{action}}（{{profile}} · {{delimiter}}）',
    csvImportSuccessAppliedSkipped: '已匯入 {{count}} 筆交易，{{action}}，並略過 {{skipped}} 筆紀錄（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositions: '已匯入 {{count}} 筆持倉，並轉成合成買入紀錄（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositionsSkipped: '已匯入 {{count}} 筆持倉並轉成合成買入紀錄，略過 {{skipped}} 筆唔支援列（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositionsApplied: '已匯入 {{count}} 筆持倉並轉成合成買入紀錄，{{action}}（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositionsAppliedSkipped: '已匯入 {{count}} 筆持倉並轉成合成買入紀錄，{{action}}，並略過 {{skipped}} 筆紀錄（{{profile}} · {{delimiter}}）',
    csvImportFailedNoData: 'CSV 匯入失敗：搵唔到可用嘅交易資料。',
    csvImportFailedHeaders: 'CSV 匯入失敗：缺少必要欄位 {{fields}}。',
    csvImportFailedRowWidth: 'CSV 匯入失敗：第 {{row}} 列欄位數爆咗，通常係 {{delimiter}} 分隔檔入面嘅數字千分位冇包好。',
    recordUpdated: '交易紀錄已更新！',
    dataCleared: '已清除資料並載入示範資料',
    clearConfirm: '確定要清除所有資料並載入示範資料？呢個動作冇得還原！',
    backupConfirm: '清除之前，要唔要先將而家資料匯出做 CSV 備份？'
  },
  data: {
    unknownSymbol: '未知代號（{{symbol}}）',
    unknown: '未知'
  }
};

const zhCN = {
  common: {
    language: '语言',
    close: '关闭',
    cancel: '取消',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    importCsv: '导入 CSV',
    exportCsv: '导出 CSV'
  },
  currencies: {
    TWD: '新台币 (TWD)',
    CNY: '人民币 (CNY)',
    HKD: '港元 (HKD)',
    USD: '美元 (USD)',
    JPY: '日元 (JPY)'
  },
  markets: {
    all: '全部',
    chinaA: 'A 股',
    hongKong: '港股',
    taiwan: '台股',
    japan: '日股',
    us: '美股',
    other: '其他',
    unknown: '未知'
  },
  tradeTypes: {
    buy: '买入',
    sell: '卖出'
  },
  timeRanges: {
    oneWeek: '1周',
    oneMonth: '1个月',
    threeMonths: '3个月',
    halfYear: '半年',
    ytd: 'YTD',
    oneYear: '1年',
    fiveYears: '5年',
    all: '全部'
  },
  app: {
    loadingLocalData: '正在加载本地 IndexedDB 数据...',
    generatingImage: '正在生成图片...',
    imageExportSuccess: '图片导出成功！',
    imageExportFail: '图片导出失败',
    noDataToExport: '当前没有可导出的数据！',
    exportFilenamePrefix: 'trade_records',
    importReviewBadge: '导入前确认',
    importReviewTitle: '这份 CSV 要怎么套用？',
    importReviewIntro: '浏览器里已经有正式数据，先决定这次是覆盖，还是只把新记录追加进去。',
    importReviewFile: '文件',
    importReviewProfile: '识别版型',
    importReviewMode: '解析模式',
    importReviewKind: '导入类型',
    importReviewDelimiter: '分隔符',
    importReviewExistingRows: '现有数据',
    importReviewIncomingRows: '待导入',
    importReviewSkippedRows: '解析跳过',
    importReviewBackupLabel: '套用前先导出当前数据备份',
    importReviewBackupHelp: '如果这次导入结果怪怪的，直接把备份再导回去，会比翻浏览器存储轻松得多。',
    importReviewAppendTitle: '追加唯一记录',
    importReviewAppendHelp: '把新数据接到当前数据后面。如果整行字段都完全相同，会当作重复记录直接跳过。',
    importReviewReplaceTitle: '覆盖当前数据',
    importReviewReplaceHelp: '用这份 CSV 直接替换当前主数据集。适合这份文件本身就是新的唯一真相。',
    importReviewAppendAction: '追加唯一记录',
    importReviewReplaceAction: '覆盖当前数据',
    importReviewCancel: '先取消'
  },
  header: {
    title: '全球投资组合仪表盘',
    demoDescription: '当前显示的是部分示例数据，导入完整 CSV 后才能看到全貌。',
    recordsLoaded: '已成功加载并分析 {{count}} 条交易记录',
    lastUpdated: '数据最后更新：{{value}}',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    settingsRecords: '设置与交易',
    updatePrices: '更新行情',
    apiKeyRequired: '需先设密钥',
    updateWithCache: '手动更新实时行情（使用缓存）',
    setApiKeyFirst: '请先设置 API Key',
    importProfileLabel: 'CSV 版型',
    importModeAutoDetected: '自动识别',
    importModeManualOverride: '手动指定',
    importKindTrades: '交易记录',
    importKindPositions: '持仓快照',
    importApplyModeAppend: '追加到现有数据',
    importApplyModeReplace: '覆盖当前数据',
    importSummaryTitle: '上次导入',
    importSummaryProfile: '版型',
    importSummaryMode: '模式',
    importSummaryApply: '套用方式',
    importSummaryKind: '导入类型',
    importSummaryDelimiter: '分隔符',
    importSummaryImported: '导入笔数',
    importSummarySkipped: '解析跳过',
    importSummaryDuplicates: '重复跳过',
    importBadgeImported: '{{count}} 笔',
    importBadgeSkipped: '跳过 {{count}} 笔',
    importPresetGroups: {
      recommended: '推荐',
      brokerPresets: '券商预设',
      genericTemplates: '通用模板'
    },
    importProfileHelpAuto: '拿不准时先保留自动识别。只有某家券商导出的 CSV 一直猜错，才需要手动切 preset。',
    importProfileHelpBroker: '券商预设适合已知来源的导出文件，比如 Schwab、IBKR、Firstrade、Robinhood。它会锁定该券商常见的字段语义。',
    importProfileHelpGeneric: '通用模板适合字段名看起来像语言惯例，但并非当前已支持的特定券商导出文件。',
    importProfileAuto: '自动识别',
    forceRefresh: '强制刷新',
    forceRefreshTitle: '强制更新并消耗额度',
    languageLabel: '切换语言',
    csvTitle: 'CSV 字段说明',
    csvIntro: '请确保 CSV 至少包含以下标题列（顺序不限）：',
    csvRows: {
      date: '日期（例如：2025/01/01）',
      type: '类型（买入 / 卖出）',
      symbol: '代码（例如：600519.SS、AAPL）',
      market: '市场（选填，手动新增时可参考）',
      quantity: '数量',
      price: '单价（原币）',
      amount: '总金额（原币）',
      pnl: '损益（卖出必填，原币）'
    },
    csvProfiles: {
      tradeLens: 'Trade Lens 原生',
      brokerZh: '中文券商 CSV',
      brokerEn: '英文券商 CSV',
      brokerJa: '日文券商 CSV',
      brokerKo: '韩文券商 CSV',
      brokerTh: '泰文券商 CSV',
      brokerAr: '阿拉伯文券商 CSV',
      brokerEuro: '欧系券商 CSV',
      schwabTransactions: '嘉信交易记录 CSV',
      schwabPositions: '嘉信持仓快照 CSV',
      ibkrTransactions: 'IBKR 交易记录 CSV',
      ibkrPositions: 'IBKR 持仓快照 CSV',
      firstradeTransactions: 'Firstrade 交易记录 CSV',
      robinhoodTransactions: 'Robinhood 交易记录 CSV'
    },
    csvDelimiters: {
      tab: 'tab'
    },
    csvNote1: '* 注 1：6 位数字且以 6 或 0 开头的代码，系统会自动识别为 A 股（.SS / .SZ）。',
    csvNote2: '* 注 2：其他市场请直接在代码后补后缀（例如：.TW、.HK）。',
    csvNote3: '* 注 3：系统会自动识别常见券商 CSV、分号和 tab 分隔格式，导入后右上角会显示吃到哪种版型。',
    forceRefreshConfirm: '确定要强制刷新吗？这会忽略 24 小时缓存，并实际消耗 API 配额。'
  },
  summary: {
    totalRealized: '总已实现盈亏（换算）',
    totalUnrealized: '总未实现盈亏（换算）',
    totalValue: '当前持仓市值（换算）',
    holdingCount: '持仓数量',
    holdingUnit: '只股票'
  },
  charts: {
    trendTitle: '累计投入走势',
    saveImage: '将图表保存为图片',
    noTrend: '当前交易记录还不够，暂时画不出走势。',
    realizedTitle: '个股已实现盈亏（卖飞 / 对冲榜）',
    distributionTitle: '持仓市值分布（前 10）',
    convertedNote: '统一换算为 {{currency}}',
    noPnlData: '当前没有盈亏数据',
    noHoldings: '当前空仓无持股',
    legendConverted: '{{label}}（换算后）',
    costSeries: '累计投入成本',
    realizedSeries: '累计已实现盈亏',
    ifSoldSeries: '若今日卖出',
    actualSeries: '实际已实现盈亏',
    others: '其他'
  },
  table: {
    title: '个股交易记录',
    subtitle: '点击行即可查看买入和卖出明细，金额均按该市场原币显示',
    columns: {
      symbol: '代码 / 股名（市场 · 币别）',
      holdingQty: '当前持股数',
      currentValue: '现价 / 市值（原币）',
      unrealized: '未实现盈亏（原币）',
      realized: '实际已实现（原币）',
      ifSoldToday: '若今日卖出（原币）',
      date: '日期',
      type: '类型',
      quantity: '数量',
      price: '单价',
      amount: '总金额',
      pnl: '损益',
      actions: '操作'
    },
    manualBadge: '手动',
    manualUpdatedAt: '手动更新于：{{value}}',
    apiUpdatedAt: 'API 最后更新：{{value}}',
    notUpdatedYet: '尚未更新',
    manualNamePlaceholder: '手动股名',
    currentPricePlaceholder: '现价',
    hedgeSuccess: '提前卖出更划算（{{value}}）',
    soldTooEarly: '卖早了，少赚 {{value}}',
    tradeDetails: '成交明细',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 股 @ {{price}}',
    mobileHoldingQty: '持股数',
    mobileUnrealized: '未实现盈亏',
    mobileRealized: '已实现盈亏'
  },
  manager: {
    title: '设置与交易记录',
    clearAndLoadDemo: '清除并载入示例数据',
    apiKeyTitle: 'yfapi.net API 密钥设置',
    getFreeApiKey: '免费注册获取',
    apiKeyPlaceholder: '请贴上您的 x-api-key（例如：A2sD8...）',
    saveApiKey: '保存密钥',
    baseCurrencyTitle: '汇总卡片基础币种',
    baseCurrencyHelp: '* 所有外币资产都会通过实时汇率换算为该币种，方便在上方汇总卡片统一加总。',
    hideZeroHolding: '隐藏已无持仓的交易记录',
    manualRecordTitle: '手动新增交易',
    fields: {
      date: '日期',
      type: '类型',
      market: '市场',
      symbol: '代码',
      quantity: '数量',
      price: '单价（原币）',
      amount: '总金额（原币）',
      pnl: '损益（卖出填，原币）'
    },
    placeholders: {
      symbol: '例如：600519.SS',
      quantity: '股数',
      price: '单股价格',
      amount: '按该市场币别',
      pnl: '选填'
    },
    saveChanges: '保存变更',
    addRecord: '加入',
    noRecords: '当前没有任何记录'
  },
  notice: {
    title: '欢迎使用 Trade Lens',
    body: '这是一个为投资者设计的开源工具，可以把券商 CSV 转成成本走势、盈亏分布和持仓占比图。',
    privacy: '隐私安全：所有数据仅保存在浏览器本地（IndexedDB），不会经过服务器。',
    apiKey: 'API 密钥：仅用于向 yfapi.net 获取股价，同样只保存在本地。',
    sourceCode: '开源项目：查看源码并参与贡献',
    dismiss: '不再显示'
  },
  messages: {
    apiKeySaved: 'API 密钥已更新并保存！',
    manualStockSaved: '已手动更新 {{symbol}} 的信息',
    needApiKey: '请先在管理面板输入 yfapi.net 密钥，才能更新行情',
    cacheFresh: '所有股价和汇率都在 24 小时内更新过，已直接使用本地缓存节省配额。',
    updateSuccess: '成功更新 {{count}} 只股票与汇率信息！',
    fetchFailed: '抓取失败：{{message}}',
    baseCurrencyChanged: '基础计价币种已切换为 {{currency}}，正在更新汇率...',
    csvImportApplyAppend: '已追加到现有数据',
    csvImportApplyReplace: '已覆盖当前数据',
    csvImportSuccess: '已导入 {{count}} 笔交易（{{profile}} · {{delimiter}}）',
    csvImportSuccessSkipped: '已导入 {{count}} 笔交易，跳过 {{skipped}} 笔不支持的记录（{{profile}} · {{delimiter}}）',
    csvImportSuccessApplied: '已导入 {{count}} 笔交易，{{action}}（{{profile}} · {{delimiter}}）',
    csvImportSuccessAppliedSkipped: '已导入 {{count}} 笔交易，{{action}}，并跳过 {{skipped}} 笔记录（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositions: '已导入 {{count}} 笔持仓，并转成合成买入记录（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositionsSkipped: '已导入 {{count}} 笔持仓并转成合成买入记录，跳过 {{skipped}} 笔不支持的记录（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositionsApplied: '已导入 {{count}} 笔持仓并转成合成买入记录，{{action}}（{{profile}} · {{delimiter}}）',
    csvImportSuccessPositionsAppliedSkipped: '已导入 {{count}} 笔持仓并转成合成买入记录，{{action}}，并跳过 {{skipped}} 笔记录（{{profile}} · {{delimiter}}）',
    csvImportFailedNoData: 'CSV 导入失败：找不到可用的交易数据。',
    csvImportFailedHeaders: 'CSV 导入失败：缺少必要字段 {{fields}}。',
    csvImportFailedRowWidth: 'CSV 导入失败：第 {{row}} 行字段数爆了，通常是 {{delimiter}} 分隔文件里的数字千分位没有正确包起来。',
    recordUpdated: '交易记录已更新！',
    dataCleared: '已清除数据并载入示例数据',
    clearConfirm: '确定要清除所有数据并载入示例数据吗？此操作无法恢复！',
    backupConfirm: '清除之前，是否需要先导出当前数据为 CSV 备份？'
  },
  data: {
    unknownSymbol: '未知代码（{{symbol}}）',
    unknown: '未知'
  }
};

const zhSG = {
  common: {
    language: '语言',
    close: '关闭',
    cancel: '取消',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    importCsv: '导入 CSV',
    exportCsv: '导出 CSV'
  },
  currencies: {
    TWD: '新台币 (TWD)',
    CNY: '人民币 (CNY)',
    HKD: '港元 (HKD)',
    USD: '美元 (USD)',
    JPY: '日元 (JPY)'
  },
  markets: {
    all: '全部',
    chinaA: 'A 股',
    hongKong: '港股',
    taiwan: '台股',
    japan: '日股',
    us: '美股',
    other: '其他',
    unknown: '未知'
  },
  tradeTypes: {
    buy: '买入',
    sell: '卖出'
  },
  timeRanges: {
    oneWeek: '1周',
    oneMonth: '1个月',
    threeMonths: '3个月',
    halfYear: '半年',
    ytd: 'YTD',
    oneYear: '1年',
    fiveYears: '5年',
    all: '全部'
  },
  app: {
    loadingLocalData: '正在载入本地 IndexedDB 资料...',
    generatingImage: '正在生成图片...',
    imageExportSuccess: '图片导出成功！',
    imageExportFail: '图片导出失败',
    noDataToExport: '目前没有资料可以导出！',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: '全球投资组合仪表板',
    demoDescription: '目前显示的是部分示范资料，导入完整 CSV 后才能看到全貌。',
    recordsLoaded: '已经成功载入并分析 {{count}} 笔交易记录',
    lastUpdated: '资料最后更新：{{value}}',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    settingsRecords: '设置与交易',
    updatePrices: '更新行情',
    apiKeyRequired: '需要 API Key',
    updateWithCache: '手动更新实时行情（使用缓存）',
    setApiKeyFirst: '请先设置 API Key',
    forceRefresh: '强制刷新',
    forceRefreshTitle: '强制更新并消耗额度',
    languageLabel: '切换语言',
    csvTitle: 'CSV 字段说明',
    csvIntro: '请确认 CSV 至少包含以下标题列，顺序不限：',
    csvRows: {
      date: '日期（例如：2025/01/01）',
      type: '类型（买入 / 卖出）',
      symbol: '代码（例如：0700.HK、AAPL）',
      market: '市场（选填，方便手动新增）',
      quantity: '数量',
      price: '单价（原币）',
      amount: '总金额（原币）',
      pnl: '损益（卖出必填，原币）'
    },
    csvNote1: '* 注 1：6 位数字且以 6 或 0 开头的代码，系统会自动认成 A 股（.SS / .SZ）。',
    csvNote2: '* 注 2：其他市场请直接在代码后面加后缀（例如：.TW、.HK）。',
    forceRefreshConfirm: '确定要强制刷新吗？这会跳过 24 小时缓存，并实际消耗 API 额度。'
  },
  summary: {
    totalRealized: '总已实现盈亏（换算）',
    totalUnrealized: '总未实现盈亏（换算）',
    totalValue: '当前持仓市值（换算）',
    holdingCount: '持仓数量',
    holdingUnit: '只股票'
  },
  charts: {
    trendTitle: '累计投入走势',
    saveImage: '把图表存成图片',
    noTrend: '目前交易记录还不够，暂时画不出走势。',
    realizedTitle: '个股已实现盈亏（卖飞 / 对冲榜）',
    distributionTitle: '持股市值分布（Top 10）',
    convertedNote: '统一换算为 {{currency}}',
    noPnlData: '目前没有盈亏资料',
    noHoldings: '目前没有持股',
    legendConverted: '{{label}}（换算后）',
    costSeries: '累计投入成本',
    realizedSeries: '累计已实现盈亏',
    ifSoldSeries: '如果今天卖出',
    actualSeries: '实际已实现盈亏',
    others: '其他'
  },
  table: {
    title: '个股交易记录',
    subtitle: '点开行即可查看买入和卖出明细，金额都会以该市场原币显示',
    columns: {
      symbol: '代码 / 股名（市场 · 币别）',
      holdingQty: '当前持股数',
      currentValue: '现价 / 市值（原币）',
      unrealized: '未实现盈亏（原币）',
      realized: '实际已实现（原币）',
      ifSoldToday: '如果今天卖出（原币）',
      date: '日期',
      type: '类型',
      quantity: '数量',
      price: '单价',
      amount: '总金额',
      pnl: '损益',
      actions: '操作'
    },
    manualBadge: '手动',
    manualUpdatedAt: '手动更新于：{{value}}',
    apiUpdatedAt: 'API 最后更新：{{value}}',
    notUpdatedYet: '尚未更新',
    manualNamePlaceholder: '手动股名',
    currentPricePlaceholder: '现价',
    hedgeSuccess: '提早卖出更划算（{{value}}）',
    soldTooEarly: '卖太早了，少赚 {{value}}',
    tradeDetails: '交易明细',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 股 @ {{price}}',
    mobileHoldingQty: '持股数',
    mobileUnrealized: '未实现盈亏',
    mobileRealized: '已实现盈亏'
  },
  manager: {
    title: '设置与交易记录',
    clearAndLoadDemo: '清除并载入示范资料',
    apiKeyTitle: 'yfapi.net API Key 设置',
    getFreeApiKey: '免费注册获取',
    apiKeyPlaceholder: '请贴上你的 x-api-key（例如：A2sD8...）',
    saveApiKey: '保存 API Key',
    baseCurrencyTitle: '总览卡片基础币种',
    baseCurrencyHelp: '* 所有外币资产都会通过实时汇率换算为这个币种，方便在上方总览卡片统一加总。',
    hideZeroHolding: '隐藏已没有持股的交易记录',
    manualRecordTitle: '手动新增交易',
    fields: {
      date: '日期',
      type: '类型',
      market: '市场',
      symbol: '代码',
      quantity: '数量',
      price: '单价（原币）',
      amount: '总金额（原币）',
      pnl: '损益（卖出填，原币）'
    },
    placeholders: {
      symbol: '例如：0700.HK',
      quantity: '股数',
      price: '单股价格',
      amount: '按该市场币别',
      pnl: '选填'
    },
    saveChanges: '保存更改',
    addRecord: '加入',
    noRecords: '目前没有任何记录'
  },
  notice: {
    title: '欢迎使用 Trade Lens',
    body: '这是给投资者使用的开源工具，可以把券商 CSV 转成成本走势、盈亏分布和持仓配置图。',
    privacy: '隐私安全：所有资料都只会存在浏览器本地（IndexedDB），不会经过服务器。',
    apiKey: 'API Key：只用来向 yfapi.net 抓股价，而且一样只保存在本地。',
    sourceCode: '开源项目：查看源码并参与贡献',
    dismiss: '不再显示'
  },
  messages: {
    apiKeySaved: 'API Key 已更新并保存！',
    manualStockSaved: '已手动更新 {{symbol}} 的资料',
    needApiKey: '请先在管理面板输入 yfapi.net API Key，才能更新行情',
    cacheFresh: '所有股价和汇率都在 24 小时内更新过，已直接使用本机缓存节省额度。',
    updateSuccess: '成功更新 {{count}} 只股票与汇率资料！',
    fetchFailed: '抓取失败：{{message}}',
    baseCurrencyChanged: '基础计价币种已切换为 {{currency}}，正在更新汇率...',
    recordUpdated: '交易记录已更新！',
    dataCleared: '已清除资料并载入示范资料',
    clearConfirm: '确定要清除所有资料并载入示范资料吗？这个动作无法复原。',
    backupConfirm: '清除之前，要不要先把目前资料导出成 CSV 备份？'
  },
  data: {
    unknownSymbol: '未知代码（{{symbol}}）',
    unknown: '未知'
  }
};

const enUS = {
  common: {
    language: 'Language',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    importCsv: 'Import CSV',
    exportCsv: 'Export CSV'
  },
  currencies: {
    TWD: 'New Taiwan Dollar (TWD)',
    CNY: 'Chinese Yuan (CNY)',
    HKD: 'Hong Kong Dollar (HKD)',
    USD: 'US Dollar (USD)',
    JPY: 'Japanese Yen (JPY)'
  },
  markets: {
    all: 'All',
    chinaA: 'China A-Shares',
    hongKong: 'Hong Kong Stocks',
    taiwan: 'Taiwan Stocks',
    japan: 'Japan Stocks',
    us: 'U.S. Stocks',
    other: 'Other',
    unknown: 'Unknown'
  },
  tradeTypes: {
    buy: 'Buy',
    sell: 'Sell'
  },
  timeRanges: {
    oneWeek: '1W',
    oneMonth: '1M',
    threeMonths: '3M',
    halfYear: '6M',
    ytd: 'YTD',
    oneYear: '1Y',
    fiveYears: '5Y',
    all: 'All'
  },
  app: {
    loadingLocalData: 'Loading local IndexedDB data...',
    generatingImage: 'Rendering image...',
    imageExportSuccess: 'Image exported successfully.',
    imageExportFail: 'Image export failed.',
    noDataToExport: 'There is no data to export right now.',
    exportFilenamePrefix: 'trade_records',
    importReviewBadge: 'Import review',
    importReviewTitle: 'How should this CSV be applied?',
    importReviewIntro: 'There is already portfolio data stored in this browser. Decide whether this import should replace it or only append new rows.',
    importReviewFile: 'File',
    importReviewProfile: 'Detected parser',
    importReviewMode: 'Parser mode',
    importReviewKind: 'Import kind',
    importReviewDelimiter: 'Delimiter',
    importReviewExistingRows: 'Current rows',
    importReviewIncomingRows: 'Incoming rows',
    importReviewSkippedRows: 'Parser skipped',
    importReviewBackupLabel: 'Export the current dataset as a CSV backup first',
    importReviewBackupHelp: 'If this import turns weird, you can re-import the backup instead of digging through browser storage.',
    importReviewAppendTitle: 'Append unique rows',
    importReviewAppendHelp: 'Adds new rows after your current dataset. If every canonical field matches, the row is treated as an exact duplicate and skipped.',
    importReviewReplaceTitle: 'Replace current data',
    importReviewReplaceHelp: 'Replaces the active dataset with only the rows from this CSV. Use this when the file is meant to become the new source of truth.',
    importReviewAppendAction: 'Append unique rows',
    importReviewReplaceAction: 'Replace current data',
    importReviewCancel: 'Cancel'
  },
  header: {
    title: 'Global Portfolio Dashboard',
    demoDescription: 'You are looking at a trimmed demo set right now. Import the full CSV to see the complete picture.',
    recordsLoaded: 'Loaded and analyzed {{count}} trade records.',
    lastUpdated: 'Last updated: {{value}}',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    settingsRecords: 'Settings & Trades',
    updatePrices: 'Refresh Quotes',
    apiKeyRequired: 'API key needed',
    updateWithCache: 'Refresh live quotes with cache',
    setApiKeyFirst: 'Set your API key first',
    importProfileLabel: 'CSV parser',
    importModeAutoDetected: 'Auto-detected',
    importModeManualOverride: 'Manual preset',
    importKindTrades: 'Trades',
    importKindPositions: 'Positions snapshot',
    importApplyModeAppend: 'Append to current data',
    importApplyModeReplace: 'Replace current data',
    importSummaryTitle: 'Last import',
    importSummaryProfile: 'Profile',
    importSummaryMode: 'Mode',
    importSummaryApply: 'Apply mode',
    importSummaryKind: 'Import kind',
    importSummaryDelimiter: 'Delimiter',
    importSummaryImported: 'Imported rows',
    importSummarySkipped: 'Parser skipped',
    importSummaryDuplicates: 'Exact duplicates skipped',
    importBadgeImported: '{{count}} imported',
    importBadgeSkipped: '{{count}} skipped',
    importPresetGroups: {
      recommended: 'Recommended',
      brokerPresets: 'Broker presets',
      genericTemplates: 'Generic templates'
    },
    importProfileHelpAuto: 'Leave this on auto detect unless a specific broker export keeps getting guessed wrong. For most files, auto is the safest first shot.',
    importProfileHelpBroker: 'Use a broker preset for known exports from brokers like Schwab, IBKR, Firstrade, or Robinhood. It locks the parser to that broker’s usual column meanings.',
    importProfileHelpGeneric: 'Use a generic template when the CSV looks familiar by language, but it does not come from one of the supported broker presets.',
    importProfileAuto: 'Auto detect',
    forceRefresh: 'Force Refresh',
    forceRefreshTitle: 'Force a refresh and spend API quota',
    languageLabel: 'Change language',
    csvTitle: 'CSV Field Guide',
    csvIntro: 'Make sure your CSV includes at least these headers. Order does not matter:',
    csvRows: {
      date: 'Date (for example: 2025/01/01)',
      type: 'Type (Buy / Sell)',
      symbol: 'Symbol (for example: AAPL, NVDA)',
      market: 'Market (optional, helpful for manual entries)',
      quantity: 'Quantity',
      price: 'Unit price (original currency)',
      amount: 'Total amount (original currency)',
      pnl: 'P&L (required for sells, original currency)'
    },
    csvProfiles: {
      tradeLens: 'Trade Lens native',
      brokerZh: 'Chinese broker CSV',
      brokerEn: 'English broker CSV',
      brokerJa: 'Japanese broker CSV',
      brokerKo: 'Korean broker CSV',
      brokerTh: 'Thai broker CSV',
      brokerAr: 'Arabic broker CSV',
      brokerEuro: 'Euro-style broker CSV',
      schwabTransactions: 'Schwab transactions CSV',
      schwabPositions: 'Schwab positions CSV',
      ibkrTransactions: 'IBKR trades CSV',
      ibkrPositions: 'IBKR positions CSV',
      firstradeTransactions: 'Firstrade activity CSV',
      robinhoodTransactions: 'Robinhood activity CSV'
    },
    csvDelimiters: {
      tab: 'tab'
    },
    csvNote1: '* Note 1: Six-digit symbols starting with 6 or 0 are auto-detected as China A-shares (.SS / .SZ).',
    csvNote2: '* Note 2: For other markets, append the suffix directly to the symbol (for example: .TW, .HK).',
    csvNote3: '* Note 3: The app auto-detects common broker CSV layouts plus semicolon and tab-delimited files. After import, the detected layout shows up on the top right.',
    forceRefreshConfirm: 'Force a refresh? This will ignore the 24-hour cache and consume real API quota.'
  },
  summary: {
    totalRealized: 'Total Realized P&L (Converted)',
    totalUnrealized: 'Total Unrealized P&L (Converted)',
    totalValue: 'Current Holdings Value (Converted)',
    holdingCount: 'Open Positions',
    holdingUnit: 'positions'
  },
  charts: {
    trendTitle: 'Cumulative Cost Trend',
    saveImage: 'Save chart as image',
    noTrend: 'There is not enough trade history yet to draw the trend.',
    realizedTitle: 'Realized P&L by Symbol (Left Money on the Table / Clean Exit)',
    distributionTitle: 'Holding Value Mix (Top 10)',
    convertedNote: 'Shown in {{currency}} after conversion',
    noPnlData: 'No P&L data yet.',
    noHoldings: 'No holdings right now.',
    legendConverted: '{{label}} (converted)',
    costSeries: 'Cumulative Cost Basis',
    realizedSeries: 'Cumulative Realized P&L',
    ifSoldSeries: 'If Sold Today',
    actualSeries: 'Actual Realized',
    others: 'Others'
  },
  table: {
    title: 'Trade History by Symbol',
    subtitle: 'Open a row to review buy and sell lots. Values remain in the listing currency.',
    columns: {
      symbol: 'Symbol / Name (Market · Currency)',
      holdingQty: 'Current Shares',
      currentValue: 'Last Price / Market Value',
      unrealized: 'Unrealized P&L',
      realized: 'Realized P&L',
      ifSoldToday: 'If Sold Today',
      date: 'Date',
      type: 'Type',
      quantity: 'Quantity',
      price: 'Price',
      amount: 'Amount',
      pnl: 'P&L',
      actions: 'Actions'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Manual override: {{value}}',
    apiUpdatedAt: 'API refreshed: {{value}}',
    notUpdatedYet: 'Not refreshed yet',
    manualNamePlaceholder: 'Manual name',
    currentPricePlaceholder: 'Price',
    hedgeSuccess: 'Getting out earlier turned out to be the better move ({{value}})',
    soldTooEarly: 'Sold too early and left {{value}} on the table',
    tradeDetails: 'Execution Details',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} shares @ {{price}}',
    mobileHoldingQty: 'Shares',
    mobileUnrealized: 'Unrealized',
    mobileRealized: 'Realized'
  },
  manager: {
    title: 'Settings & Trade Log',
    clearAndLoadDemo: 'Clear and Load Demo Data',
    apiKeyTitle: 'yfapi.net API Key',
    getFreeApiKey: 'Get one for free',
    apiKeyPlaceholder: 'Paste your x-api-key here (for example: A2sD8...)',
    saveApiKey: 'Save API Key',
    baseCurrencyTitle: 'Summary Base Currency',
    baseCurrencyHelp: '* Every foreign asset is converted into this base currency through live FX so the summary cards can add everything up cleanly.',
    hideZeroHolding: 'Hide fully exited positions',
    manualRecordTitle: 'Add Manual Trade',
    fields: {
      date: 'Date',
      type: 'Type',
      market: 'Market',
      symbol: 'Symbol',
      quantity: 'Quantity',
      price: 'Unit Price',
      amount: 'Total Amount',
      pnl: 'Realized P&L (sell only)'
    },
    placeholders: {
      symbol: 'For example: AAPL',
      quantity: 'Shares',
      price: 'Price per share',
      amount: 'In that market currency',
      pnl: 'Optional'
    },
    saveChanges: 'Save Changes',
    addRecord: 'Add',
    noRecords: 'No trade records yet.'
  },
  notice: {
    title: 'Welcome to Trade Lens',
    body: 'Trade Lens is an open-source tool for turning broker CSV exports into cost-basis trends, P&L views, and allocation charts.',
    privacy: 'Privacy first: everything stays in your browser only (IndexedDB). Nothing is sent through our server.',
    apiKey: 'API key: it is only used for yfapi.net price lookups, and it stays local too.',
    sourceCode: 'Open source: browse the code and contribute',
    dismiss: 'Do not show again'
  },
  messages: {
    apiKeySaved: 'API key saved.',
    manualStockSaved: 'Updated {{symbol}} manually.',
    needApiKey: 'Enter your yfapi.net API key in the settings panel before refreshing quotes.',
    cacheFresh: 'Prices and FX rates were refreshed within the last 24 hours, so the app reused the local cache to save quota.',
    updateSuccess: 'Updated {{count}} stock quotes and FX rates.',
    fetchFailed: 'Fetch failed: {{message}}',
    baseCurrencyChanged: 'Base currency switched to {{currency}}. Refreshing FX rates...',
    csvImportApplyAppend: 'appended them to your existing data',
    csvImportApplyReplace: 'replaced your current dataset',
    csvImportSuccess: 'Imported {{count}} trades ({{profile}} · {{delimiter}}).',
    csvImportSuccessSkipped: 'Imported {{count}} trades and skipped {{skipped}} unsupported rows ({{profile}} · {{delimiter}}).',
    csvImportSuccessApplied: 'Imported {{count}} trades and {{action}} ({{profile}} · {{delimiter}}).',
    csvImportSuccessAppliedSkipped: 'Imported {{count}} trades, {{action}}, and skipped {{skipped}} rows ({{profile}} · {{delimiter}}).',
    csvImportSuccessPositions: 'Imported {{count}} positions as synthetic buy rows ({{profile}} · {{delimiter}}).',
    csvImportSuccessPositionsSkipped: 'Imported {{count}} positions as synthetic buy rows and skipped {{skipped}} unsupported rows ({{profile}} · {{delimiter}}).',
    csvImportSuccessPositionsApplied: 'Imported {{count}} positions as synthetic buy rows and {{action}} ({{profile}} · {{delimiter}}).',
    csvImportSuccessPositionsAppliedSkipped: 'Imported {{count}} positions as synthetic buy rows, {{action}}, and skipped {{skipped}} rows ({{profile}} · {{delimiter}}).',
    csvImportFailedNoData: 'CSV import failed: no usable trade rows were found.',
    csvImportFailedHeaders: 'CSV import failed: missing required fields {{fields}}.',
    csvImportFailedRowWidth: 'CSV import failed: row {{row}} has more columns than the header, usually because a thousands-separated number in a {{delimiter}} file was not quoted properly.',
    recordUpdated: 'Trade record updated.',
    dataCleared: 'Data cleared and demo records loaded.',
    clearConfirm: 'Clear all data and reload the demo set? This cannot be undone.',
    backupConfirm: 'Do you want to export the current data as a CSV backup before clearing it?'
  },
  data: {
    unknownSymbol: 'Unknown symbol ({{symbol}})',
    unknown: 'Unknown'
  }
};

const enGB = {
  common: {
    language: 'Language',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    importCsv: 'Import CSV',
    exportCsv: 'Export CSV'
  },
  currencies: {
    TWD: 'New Taiwan Dollar (TWD)',
    CNY: 'Chinese Yuan (CNY)',
    HKD: 'Hong Kong Dollar (HKD)',
    USD: 'US Dollar (USD)',
    JPY: 'Japanese Yen (JPY)'
  },
  markets: {
    all: 'All',
    chinaA: 'China A Shares',
    hongKong: 'Hong Kong Stocks',
    taiwan: 'Taiwan Stocks',
    japan: 'Japan Stocks',
    us: 'US Stocks',
    other: 'Other',
    unknown: 'Unknown'
  },
  tradeTypes: {
    buy: 'Buy',
    sell: 'Sell'
  },
  timeRanges: {
    oneWeek: '1W',
    oneMonth: '1M',
    threeMonths: '3M',
    halfYear: '6M',
    ytd: 'YTD',
    oneYear: '1Y',
    fiveYears: '5Y',
    all: 'All'
  },
  app: {
    loadingLocalData: 'Loading local IndexedDB data...',
    generatingImage: 'Rendering image...',
    imageExportSuccess: 'Image exported successfully.',
    imageExportFail: 'Image export failed.',
    noDataToExport: 'There is no data to export at the moment.',
    exportFilenamePrefix: 'trade_records',
    importReviewBadge: 'Import review',
    importReviewTitle: 'How should this CSV be applied?',
    importReviewIntro: 'There is already portfolio data stored in this browser. Decide whether this import should replace it or only append new rows.',
    importReviewFile: 'File',
    importReviewProfile: 'Detected parser',
    importReviewMode: 'Parser mode',
    importReviewKind: 'Import kind',
    importReviewDelimiter: 'Delimiter',
    importReviewExistingRows: 'Current rows',
    importReviewIncomingRows: 'Incoming rows',
    importReviewSkippedRows: 'Parser skipped',
    importReviewBackupLabel: 'Export the current dataset as a CSV backup first',
    importReviewBackupHelp: 'If this import turns weird, you can re-import the backup instead of digging through browser storage.',
    importReviewAppendTitle: 'Append unique rows',
    importReviewAppendHelp: 'Adds new rows after your current dataset. If every canonical field matches, the row is treated as an exact duplicate and skipped.',
    importReviewReplaceTitle: 'Replace current data',
    importReviewReplaceHelp: 'Replaces the active dataset with only the rows from this CSV. Use this when the file is meant to become the new source of truth.',
    importReviewAppendAction: 'Append unique rows',
    importReviewReplaceAction: 'Replace current data',
    importReviewCancel: 'Cancel'
  },
  header: {
    title: 'Global Portfolio Dashboard',
    demoDescription: 'You are looking at a trimmed demo set right now. Import the full CSV to see the whole picture.',
    recordsLoaded: 'Loaded and analysed {{count}} trade records.',
    lastUpdated: 'Last updated: {{value}}',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    settingsRecords: 'Settings & Trades',
    updatePrices: 'Refresh Quotes',
    apiKeyRequired: 'API key needed',
    updateWithCache: 'Refresh live quotes with cache',
    setApiKeyFirst: 'Set your API key first',
    importProfileLabel: 'CSV parser',
    importModeAutoDetected: 'Auto-detected',
    importModeManualOverride: 'Manual preset',
    importKindTrades: 'Trades',
    importKindPositions: 'Positions snapshot',
    importApplyModeAppend: 'Append to current data',
    importApplyModeReplace: 'Replace current data',
    importSummaryTitle: 'Last import',
    importSummaryProfile: 'Profile',
    importSummaryMode: 'Mode',
    importSummaryApply: 'Apply mode',
    importSummaryKind: 'Import kind',
    importSummaryDelimiter: 'Delimiter',
    importSummaryImported: 'Imported rows',
    importSummarySkipped: 'Parser skipped',
    importSummaryDuplicates: 'Exact duplicates skipped',
    importBadgeImported: '{{count}} imported',
    importBadgeSkipped: '{{count}} skipped',
    importPresetGroups: {
      recommended: 'Recommended',
      brokerPresets: 'Broker presets',
      genericTemplates: 'Generic templates'
    },
    importProfileHelpAuto: 'Leave this on auto detect unless a specific broker export keeps getting guessed wrong. For most files, auto is the safest first shot.',
    importProfileHelpBroker: 'Use a broker preset for known exports from brokers like Schwab, IBKR, Firstrade, or Robinhood. It locks the parser to that broker’s usual column meanings.',
    importProfileHelpGeneric: 'Use a generic template when the CSV looks familiar by language, but it does not come from one of the supported broker presets.',
    importProfileAuto: 'Auto detect',
    forceRefresh: 'Force Refresh',
    forceRefreshTitle: 'Force a refresh and consume API quota',
    languageLabel: 'Change language',
    csvTitle: 'CSV Field Guide',
    csvIntro: 'Make sure your CSV contains at least these headers. Their order does not matter:',
    csvRows: {
      date: 'Date (for example: 2025/01/01)',
      type: 'Type (Buy / Sell)',
      symbol: 'Symbol (for example: SHEL, AAPL)',
      market: 'Market (optional, useful for manual entries)',
      quantity: 'Quantity',
      price: 'Unit price (original currency)',
      amount: 'Total amount (original currency)',
      pnl: 'P&L (required for sells, original currency)'
    },
    csvProfiles: {
      tradeLens: 'Trade Lens native',
      brokerZh: 'Chinese broker CSV',
      brokerEn: 'English broker CSV',
      brokerJa: 'Japanese broker CSV',
      brokerKo: 'Korean broker CSV',
      brokerTh: 'Thai broker CSV',
      brokerAr: 'Arabic broker CSV',
      brokerEuro: 'Euro-style broker CSV',
      schwabTransactions: 'Schwab transactions CSV',
      schwabPositions: 'Schwab positions CSV',
      ibkrTransactions: 'IBKR trades CSV',
      ibkrPositions: 'IBKR positions CSV',
      firstradeTransactions: 'Firstrade activity CSV',
      robinhoodTransactions: 'Robinhood activity CSV'
    },
    csvDelimiters: {
      tab: 'tab'
    },
    csvNote1: '* Note 1: Six-digit symbols beginning with 6 or 0 are auto-detected as China A shares (.SS / .SZ).',
    csvNote2: '* Note 2: For other markets, append the suffix directly to the symbol (for example: .TW, .HK).',
    csvNote3: '* Note 3: The app auto-detects common broker CSV layouts plus semicolon and tab-delimited files. After import, the detected layout shows up on the top right.',
    forceRefreshConfirm: 'Force a refresh? This will ignore the 24-hour cache and use real API allowance.'
  },
  summary: {
    totalRealized: 'Total Realised P&L (Converted)',
    totalUnrealized: 'Total Unrealised P&L (Converted)',
    totalValue: 'Current Holdings Value (Converted)',
    holdingCount: 'Open Positions',
    holdingUnit: 'positions'
  },
  charts: {
    trendTitle: 'Cumulative Cost Trend',
    saveImage: 'Save chart as image',
    noTrend: 'There is not enough trade history yet to draw the trend.',
    realizedTitle: 'Realised P&L by Symbol (Left Money on the Table / Clean Exit)',
    distributionTitle: 'Holding Value Mix (Top 10)',
    convertedNote: 'Shown in {{currency}} after conversion',
    noPnlData: 'No P&L data yet.',
    noHoldings: 'No holdings at the moment.',
    legendConverted: '{{label}} (converted)',
    costSeries: 'Cumulative Cost Basis',
    realizedSeries: 'Cumulative Realised P&L',
    ifSoldSeries: 'If Sold Today',
    actualSeries: 'Actual Realised',
    others: 'Others'
  },
  table: {
    title: 'Trade History by Symbol',
    subtitle: 'Open a row to review buy and sell lots. Values remain in the listing currency.',
    columns: {
      symbol: 'Symbol / Name (Market · Currency)',
      holdingQty: 'Current Shares',
      currentValue: 'Last Price / Market Value',
      unrealized: 'Unrealised P&L',
      realized: 'Realised P&L',
      ifSoldToday: 'If Sold Today',
      date: 'Date',
      type: 'Type',
      quantity: 'Quantity',
      price: 'Price',
      amount: 'Amount',
      pnl: 'P&L',
      actions: 'Actions'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Manual override: {{value}}',
    apiUpdatedAt: 'API refreshed: {{value}}',
    notUpdatedYet: 'Not refreshed yet',
    manualNamePlaceholder: 'Manual name',
    currentPricePlaceholder: 'Price',
    hedgeSuccess: 'Selling earlier turned out to be the better call ({{value}})',
    soldTooEarly: 'Sold too early and left {{value}} behind',
    tradeDetails: 'Execution Details',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} shares @ {{price}}',
    mobileHoldingQty: 'Shares',
    mobileUnrealized: 'Unrealised',
    mobileRealized: 'Realised'
  },
  manager: {
    title: 'Settings & Trade Log',
    clearAndLoadDemo: 'Clear and Load Demo Data',
    apiKeyTitle: 'yfapi.net API Key',
    getFreeApiKey: 'Get one for free',
    apiKeyPlaceholder: 'Paste your x-api-key here (for example: A2sD8...)',
    saveApiKey: 'Save API Key',
    baseCurrencyTitle: 'Summary Base Currency',
    baseCurrencyHelp: '* Every foreign asset is converted into this base currency using live FX so the summary cards can total everything cleanly.',
    hideZeroHolding: 'Hide fully exited positions',
    manualRecordTitle: 'Add Manual Trade',
    fields: {
      date: 'Date',
      type: 'Type',
      market: 'Market',
      symbol: 'Symbol',
      quantity: 'Quantity',
      price: 'Unit Price',
      amount: 'Total Amount',
      pnl: 'Realised P&L (sell only)'
    },
    placeholders: {
      symbol: 'For example: SHEL',
      quantity: 'Shares',
      price: 'Price per share',
      amount: 'In that market currency',
      pnl: 'Optional'
    },
    saveChanges: 'Save Changes',
    addRecord: 'Add',
    noRecords: 'No trade records yet.'
  },
  notice: {
    title: 'Welcome to Trade Lens',
    body: 'Trade Lens is an open-source tool for turning broker CSV exports into cost-basis trends, P&L views and allocation charts.',
    privacy: 'Privacy first: everything stays in your browser only (IndexedDB). Nothing is sent through our server.',
    apiKey: 'API key: it is only used for yfapi.net price look-ups, and it stays local too.',
    sourceCode: 'Open source: browse the code and contribute',
    dismiss: 'Do not show again'
  },
  messages: {
    apiKeySaved: 'API key saved.',
    manualStockSaved: 'Updated {{symbol}} manually.',
    needApiKey: 'Enter your yfapi.net API key in the settings panel before refreshing quotes.',
    cacheFresh: 'Prices and FX rates were refreshed within the last 24 hours, so the app reused the local cache to save allowance.',
    updateSuccess: 'Updated {{count}} stock quotes and FX rates.',
    fetchFailed: 'Fetch failed: {{message}}',
    baseCurrencyChanged: 'Base currency switched to {{currency}}. Refreshing FX rates...',
    csvImportApplyAppend: 'appended them to your existing data',
    csvImportApplyReplace: 'replaced your current dataset',
    csvImportSuccess: 'Imported {{count}} trades ({{profile}} · {{delimiter}}).',
    csvImportSuccessSkipped: 'Imported {{count}} trades and skipped {{skipped}} unsupported rows ({{profile}} · {{delimiter}}).',
    csvImportSuccessApplied: 'Imported {{count}} trades and {{action}} ({{profile}} · {{delimiter}}).',
    csvImportSuccessAppliedSkipped: 'Imported {{count}} trades, {{action}}, and skipped {{skipped}} rows ({{profile}} · {{delimiter}}).',
    csvImportSuccessPositions: 'Imported {{count}} positions as synthetic buy rows ({{profile}} · {{delimiter}}).',
    csvImportSuccessPositionsSkipped: 'Imported {{count}} positions as synthetic buy rows and skipped {{skipped}} unsupported rows ({{profile}} · {{delimiter}}).',
    csvImportSuccessPositionsApplied: 'Imported {{count}} positions as synthetic buy rows and {{action}} ({{profile}} · {{delimiter}}).',
    csvImportSuccessPositionsAppliedSkipped: 'Imported {{count}} positions as synthetic buy rows, {{action}}, and skipped {{skipped}} rows ({{profile}} · {{delimiter}}).',
    csvImportFailedNoData: 'CSV import failed: no usable trade rows were found.',
    csvImportFailedHeaders: 'CSV import failed: missing required fields {{fields}}.',
    csvImportFailedRowWidth: 'CSV import failed: row {{row}} has more columns than the header, usually because a thousands-separated number in a {{delimiter}} file was not quoted properly.',
    recordUpdated: 'Trade record updated.',
    dataCleared: 'Data cleared and demo records loaded.',
    clearConfirm: 'Clear all data and reload the demo set? This cannot be undone.',
    backupConfirm: 'Would you like to export the current data as a CSV backup before clearing it?'
  },
  data: {
    unknownSymbol: 'Unknown symbol ({{symbol}})',
    unknown: 'Unknown'
  }
};

const enSG = {
  ...enGB,
  markets: {
    ...enGB.markets,
    hongKong: 'Hong Kong Equities',
    us: 'U.S. Equities'
  },
  header: {
    ...enGB.header,
    title: 'Global Portfolio Dashboard',
    demoDescription: 'A trimmed demo dataset is showing for now. Import the full CSV to see the full book.',
    csvRows: {
      ...enGB.header.csvRows,
      symbol: 'Symbol (for example: AAPL, 0700.HK)'
    }
  },
  charts: {
    ...enGB.charts,
    realizedTitle: 'Realised P&L by Counter (Sold Too Fast / Clean Exit)'
  },
  table: {
    ...enGB.table,
    title: 'Trade History by Counter',
    columns: {
      ...enGB.table.columns,
      symbol: 'Counter / Name (Market · Currency)'
    },
    hedgeSuccess: 'Selling earlier turned out better ({{value}})',
    soldTooEarly: 'Sold too fast and left {{value}} behind'
  },
  manager: {
    ...enGB.manager,
    placeholders: {
      ...enGB.manager.placeholders,
      symbol: 'For example: 0700.HK'
    }
  },
  messages: {
    ...enGB.messages,
    updateSuccess: 'Updated {{count}} counter prices and FX rates.'
  }
};

const jaJP = {
  common: {
    language: '言語',
    close: '閉じる',
    cancel: 'キャンセル',
    save: '保存',
    edit: '編集',
    delete: '削除',
    importCsv: 'CSV を読み込む',
    exportCsv: 'CSV を書き出す'
  },
  currencies: {
    TWD: '台湾ドル (TWD)',
    CNY: '人民元 (CNY)',
    HKD: '香港ドル (HKD)',
    USD: '米ドル (USD)',
    JPY: '日本円 (JPY)'
  },
  markets: {
    all: 'すべて',
    chinaA: '中国A株',
    hongKong: '香港株',
    taiwan: '台湾株',
    japan: '日本株',
    us: '米国株',
    other: 'その他',
    unknown: '不明'
  },
  tradeTypes: {
    buy: '買付',
    sell: '売却'
  },
  timeRanges: {
    oneWeek: '1週',
    oneMonth: '1か月',
    threeMonths: '3か月',
    halfYear: '半年',
    ytd: '年初来',
    oneYear: '1年',
    fiveYears: '5年',
    all: '全期間'
  },
  app: {
    loadingLocalData: 'ローカルの IndexedDB データを読み込み中...',
    generatingImage: '画像を生成中...',
    imageExportSuccess: '画像を書き出しました。',
    imageExportFail: '画像の書き出しに失敗しました。',
    noDataToExport: 'いまは書き出せるデータがありません。',
    exportFilenamePrefix: 'trade_records',
    importReviewBadge: '読み込み前の確認',
    importReviewTitle: 'この CSV をどう反映しますか？',
    importReviewIntro: 'このブラウザにはすでに正式なデータがあります。今回の CSV で置き換えるか、新しい行だけ追加するかを選んでください。',
    importReviewFile: 'ファイル',
    importReviewProfile: '検出パーサー',
    importReviewMode: '解析モード',
    importReviewKind: '読み込み種別',
    importReviewDelimiter: '区切り文字',
    importReviewExistingRows: '既存データ',
    importReviewIncomingRows: '取り込み対象',
    importReviewSkippedRows: '解析で除外',
    importReviewBackupLabel: '反映前に現在のデータを CSV としてバックアップする',
    importReviewBackupHelp: '今回の取り込み結果が変でも、バックアップをそのまま再読み込みすれば戻せます。',
    importReviewAppendTitle: '一意な行だけ追加',
    importReviewAppendHelp: '新しいデータを現在のデータセットの後ろに追加します。列の内容が完全一致する行は重複としてスキップします。',
    importReviewReplaceTitle: '現在のデータを置き換える',
    importReviewReplaceHelp: 'この CSV の行だけで現在のデータセットを置き換えます。このファイル自体を新しい正本にしたいとき向けです。',
    importReviewAppendAction: '一意な行だけ追加',
    importReviewReplaceAction: '現在のデータを置き換える',
    importReviewCancel: 'キャンセル'
  },
  header: {
    title: 'グローバル取引ポートフォリオダッシュボード',
    demoDescription: '現在は一部のサンプルデータを表示しています。フル CSV を読み込むと全体像を確認できます。',
    recordsLoaded: '{{count}} 件の取引履歴を読み込んで分析しました。',
    lastUpdated: '最終更新: {{value}}',
    switchToLight: 'ライトモードに切り替え',
    switchToDark: 'ダークモードに切り替え',
    settingsRecords: '設定と取引',
    updatePrices: '株価を更新',
    apiKeyRequired: 'API キーが必要',
    updateWithCache: 'キャッシュを使って株価を更新',
    setApiKeyFirst: '先に API キーを設定してください',
    importProfileLabel: 'CSV パーサー',
    importModeAutoDetected: '自動判定',
    importModeManualOverride: '手動プリセット',
    importKindTrades: '取引履歴',
    importKindPositions: '保有残高スナップショット',
    importApplyModeAppend: '既存データへ追加',
    importApplyModeReplace: '現在のデータを置き換え',
    importSummaryTitle: '前回の読み込み',
    importSummaryProfile: '形式',
    importSummaryMode: 'モード',
    importSummaryApply: '反映方法',
    importSummaryKind: '読み込み種別',
    importSummaryDelimiter: '区切り文字',
    importSummaryImported: '読み込み件数',
    importSummarySkipped: '解析で除外',
    importSummaryDuplicates: '重複で除外',
    importBadgeImported: '{{count}} 件',
    importBadgeSkipped: '{{count}} 件スキップ',
    importPresetGroups: {
      recommended: 'おすすめ',
      brokerPresets: '証券会社プリセット',
      genericTemplates: '汎用テンプレート'
    },
    importProfileHelpAuto: '迷ったらまずは自動判定のままで大丈夫です。特定の証券会社 CSV だけ判定がズレるときに、手動でプリセットを切り替えてください。',
    importProfileHelpBroker: '証券会社プリセットは、Schwab、IBKR、Firstrade、Robinhood など既知の書き出し形式向けです。その証券会社でよく使われる列の意味に合わせて固定します。',
    importProfileHelpGeneric: '汎用テンプレートは、列名が言語の定番パターンに近いけれど、対応済みの証券会社 CSV そのものではないファイル向けです。',
    importProfileAuto: '自動判定',
    forceRefresh: '強制更新',
    forceRefreshTitle: 'キャッシュを無視して API 枠を使う',
    languageLabel: '言語を切り替え',
    csvTitle: 'CSV 形式ガイド',
    csvIntro: 'CSV には少なくとも次のヘッダーを含めてください。順番は自由です。',
    csvRows: {
      date: '日付（例: 2025/01/01）',
      type: '区分（買付 / 売却）',
      symbol: '銘柄コード（例: 7203.T、AAPL）',
      market: '市場（任意。手動追加時の参考用）',
      quantity: '数量',
      price: '単価（現地通貨）',
      amount: '合計金額（現地通貨）',
      pnl: '損益（売却時は必須、現地通貨）'
    },
    csvProfiles: {
      tradeLens: 'Trade Lens 標準',
      brokerZh: '中国語ブローカー CSV',
      brokerEn: '英語ブローカー CSV',
      brokerJa: '日本語ブローカー CSV',
      brokerKo: '韓国語ブローカー CSV',
      brokerTh: 'タイ語ブローカー CSV',
      brokerAr: 'アラビア語ブローカー CSV',
      brokerEuro: '欧州系ブローカー CSV',
      schwabTransactions: 'Schwab 取引履歴 CSV',
      schwabPositions: 'Schwab 保有残高 CSV',
      ibkrTransactions: 'IBKR 取引履歴 CSV',
      ibkrPositions: 'IBKR 保有残高 CSV',
      firstradeTransactions: 'Firstrade 取引履歴 CSV',
      robinhoodTransactions: 'Robinhood 取引履歴 CSV'
    },
    csvDelimiters: {
      tab: 'tab'
    },
    csvNote1: '* 注 1: 6 桁で 6 または 0 から始まるコードは、中国 A 株（.SS / .SZ）として自動判定します。',
    csvNote2: '* 注 2: そのほかの市場は、コードの末尾に接尾辞を付けてください（例: .TW、.HK）。',
    csvNote3: '* 注 3: よくある証券会社 CSV に加えて、セミコロン区切りと tab 区切りも自動判定します。読み込み後は右上に判定結果が出ます。',
    forceRefreshConfirm: '強制更新しますか？ 24 時間キャッシュを無視して API 枠を消費します。'
  },
  summary: {
    totalRealized: '実現損益 合計（換算後）',
    totalUnrealized: '含み損益 合計（換算後）',
    totalValue: '保有資産評価額（換算後）',
    holdingCount: '保有銘柄数',
    holdingUnit: '銘柄'
  },
  charts: {
    trendTitle: '累積投資推移',
    saveImage: '画像として保存',
    noTrend: '取引履歴がまだ足りないので、トレンドを描けません。',
    realizedTitle: '銘柄別の実現損益（売り急ぎ / 上手な利確）',
    distributionTitle: '保有評価額の構成（上位 10 銘柄）',
    convertedNote: '{{currency}} 建てで表示',
    noPnlData: '損益データがまだありません。',
    noHoldings: 'いまは保有銘柄がありません。',
    legendConverted: '{{label}}（換算後）',
    costSeries: '累積取得原価',
    realizedSeries: '累積実現損益',
    ifSoldSeries: '今日売却した場合',
    actualSeries: '実際の実現損益',
    others: 'その他'
  },
  table: {
    title: '銘柄別取引履歴',
    subtitle: '行を開くと約定明細を確認できます。金額は各市場の現地通貨で表示します。',
    columns: {
      symbol: '銘柄コード / 銘柄名（市場 · 通貨）',
      holdingQty: '現在の保有数',
      currentValue: '現在価格 / 評価額',
      unrealized: '含み損益',
      realized: '実現損益',
      ifSoldToday: '今日売却した場合',
      date: '日付',
      type: '区分',
      quantity: '数量',
      price: '単価',
      amount: '金額',
      pnl: '損益',
      actions: '操作'
    },
    manualBadge: '手入力',
    manualUpdatedAt: '手動更新: {{value}}',
    apiUpdatedAt: 'API 更新: {{value}}',
    notUpdatedYet: '未更新',
    manualNamePlaceholder: '手動の銘柄名',
    currentPricePlaceholder: '現在値',
    hedgeSuccess: '早めに売って正解（{{value}}）',
    soldTooEarly: '売るのが早かった（{{value}}）',
    tradeDetails: '約定明細',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 株 @ {{price}}',
    mobileHoldingQty: '保有数',
    mobileUnrealized: '含み損益',
    mobileRealized: '実現損益'
  },
  manager: {
    title: '設定と取引履歴',
    clearAndLoadDemo: 'クリアしてサンプルを読み込む',
    apiKeyTitle: 'yfapi.net API キー設定',
    getFreeApiKey: '無料登録はこちら',
    apiKeyPlaceholder: 'x-api-key を貼り付けてください（例: A2sD8...）',
    saveApiKey: 'キーを保存',
    baseCurrencyTitle: 'サマリーカードの基準通貨',
    baseCurrencyHelp: '* すべての外貨資産はリアルタイム為替でこの通貨へ換算され、上部サマリーでまとめて集計されます。',
    hideZeroHolding: '保有残高が 0 の銘柄を隠す',
    manualRecordTitle: '取引を手動で追加',
    fields: {
      date: '日付',
      type: '区分',
      market: '市場',
      symbol: '銘柄コード',
      quantity: '数量',
      price: '単価',
      amount: '合計金額',
      pnl: '損益（売却のみ）'
    },
    placeholders: {
      symbol: '例: 7203.T',
      quantity: '株数',
      price: '1 株あたりの価格',
      amount: 'その市場の通貨',
      pnl: '任意'
    },
    saveChanges: '変更を保存',
    addRecord: '追加',
    noRecords: '取引履歴はまだありません。'
  },
  notice: {
    title: 'Trade Lens へようこそ',
    body: '証券会社の CSV を、取得原価の推移・損益分布・保有比率チャートへ変換できる、投資家向けのオープンソースツールです。',
    privacy: 'プライバシー重視: すべてのデータはブラウザ内（IndexedDB）のみ保存され、サーバーには送られません。',
    apiKey: 'API キー: yfapi.net から価格を取得するためだけに使われ、これもローカル保存です。',
    sourceCode: 'オープンソース: コードを見てコントリビュート',
    dismiss: '今後は表示しない'
  },
  messages: {
    apiKeySaved: 'API キーを保存しました。',
    manualStockSaved: '{{symbol}} を手動更新しました。',
    needApiKey: '株価を更新する前に、管理パネルで yfapi.net の API キーを入力してください。',
    cacheFresh: '株価と為替は過去 24 時間以内に更新済みのため、API 枠を節約するためローカルキャッシュを使いました。',
    updateSuccess: '{{count}} 銘柄の株価と為替を更新しました。',
    fetchFailed: '取得に失敗しました: {{message}}',
    baseCurrencyChanged: '基準通貨を {{currency}} に切り替えました。為替を更新しています...',
    csvImportApplyAppend: '既存データに追加しました',
    csvImportApplyReplace: '現在のデータを置き換えました',
    csvImportSuccess: '{{count}} 件の取引を読み込みました（{{profile}} · {{delimiter}}）。',
    csvImportSuccessSkipped: '{{count}} 件の取引を読み込み、{{skipped}} 件の未対応行をスキップしました（{{profile}} · {{delimiter}}）。',
    csvImportSuccessApplied: '{{count}} 件の取引を読み込み、{{action}}（{{profile}} · {{delimiter}}）。',
    csvImportSuccessAppliedSkipped: '{{count}} 件の取引を読み込み、{{action}}、{{skipped}} 件の行をスキップしました（{{profile}} · {{delimiter}}）。',
    csvImportSuccessPositions: '{{count}} 件の保有残高を合成買い付け履歴として読み込みました（{{profile}} · {{delimiter}}）。',
    csvImportSuccessPositionsSkipped: '{{count}} 件の保有残高を合成買い付け履歴として読み込み、{{skipped}} 件の未対応行をスキップしました（{{profile}} · {{delimiter}}）。',
    csvImportSuccessPositionsApplied: '{{count}} 件の保有残高を合成買い付け履歴として読み込み、{{action}}（{{profile}} · {{delimiter}}）。',
    csvImportSuccessPositionsAppliedSkipped: '{{count}} 件の保有残高を合成買い付け履歴として読み込み、{{action}}、{{skipped}} 件の行をスキップしました（{{profile}} · {{delimiter}}）。',
    csvImportFailedNoData: 'CSV の読み込みに失敗しました。使える取引データが見つかりません。',
    csvImportFailedHeaders: 'CSV の読み込みに失敗しました。必須項目 {{fields}} が足りません。',
    csvImportFailedRowWidth: 'CSV の読み込みに失敗しました。第 {{row}} 行の列数がヘッダーより多く、{{delimiter}} 区切りの数値が正しく引用されていない可能性があります。',
    recordUpdated: '取引履歴を更新しました。',
    dataCleared: 'データを削除し、サンプル履歴を読み込みました。',
    clearConfirm: 'すべてのデータを削除してサンプルを読み込みますか？ この操作は元に戻せません。',
    backupConfirm: '削除する前に、現在のデータを CSV としてバックアップしますか？'
  },
  data: {
    unknownSymbol: '未登録の銘柄コード（{{symbol}}）',
    unknown: '不明'
  }
};

const koKR = {
  common: {
    language: '언어',
    close: '닫기',
    cancel: '취소',
    save: '저장',
    edit: '수정',
    delete: '삭제',
    importCsv: 'CSV 가져오기',
    exportCsv: 'CSV 내보내기'
  },
  currencies: {
    TWD: '대만 달러 (TWD)',
    CNY: '중국 위안 (CNY)',
    HKD: '홍콩 달러 (HKD)',
    USD: '미국 달러 (USD)',
    JPY: '일본 엔 (JPY)'
  },
  markets: {
    all: '전체',
    chinaA: '중국 A주',
    hongKong: '홍콩주',
    taiwan: '대만주',
    japan: '일본주',
    us: '미국주',
    other: '기타',
    unknown: '알 수 없음'
  },
  tradeTypes: {
    buy: '매수',
    sell: '매도'
  },
  timeRanges: {
    oneWeek: '1주',
    oneMonth: '1개월',
    threeMonths: '3개월',
    halfYear: '6개월',
    ytd: 'YTD',
    oneYear: '1년',
    fiveYears: '5년',
    all: '전체'
  },
  app: {
    loadingLocalData: '로컬 IndexedDB 데이터를 불러오는 중...',
    generatingImage: '이미지 생성 중...',
    imageExportSuccess: '이미지 내보내기에 성공했습니다.',
    imageExportFail: '이미지 내보내기에 실패했습니다.',
    noDataToExport: '지금은 내보낼 데이터가 없습니다.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: '글로벌 투자 포트폴리오 대시보드',
    demoDescription: '지금은 예시 데이터 일부만 보여주고 있습니다. 전체 CSV를 가져오면 판이 제대로 보입니다.',
    recordsLoaded: '거래 기록 {{count}}건을 불러와 분석했습니다.',
    lastUpdated: '마지막 업데이트: {{value}}',
    switchToLight: '라이트 모드로 전환',
    switchToDark: '다크 모드로 전환',
    settingsRecords: '설정 및 거래',
    updatePrices: '시세 업데이트',
    apiKeyRequired: 'API 키 필요',
    updateWithCache: '실시간 시세 업데이트 (캐시 사용)',
    setApiKeyFirst: '먼저 API 키를 설정하세요',
    forceRefresh: '강제 새로고침',
    forceRefreshTitle: '캐시를 무시하고 API 한도를 사용',
    languageLabel: '언어 변경',
    csvTitle: 'CSV 필드 안내',
    csvIntro: 'CSV에는 최소한 아래 헤더가 들어 있어야 합니다. 순서는 상관없습니다.',
    csvRows: {
      date: '날짜 (예: 2025/01/01)',
      type: '구분 (매수 / 매도)',
      symbol: '종목 코드 (예: AAPL, TSLA)',
      market: '시장 (선택 입력, 수동 추가 시 참고용)',
      quantity: '수량',
      price: '단가 (원통화)',
      amount: '총금액 (원통화)',
      pnl: '손익 (매도 시 필수, 원통화)'
    },
    csvNote1: '* 참고 1: 6자리 숫자이면서 6 또는 0으로 시작하는 코드는 중국 A주(.SS / .SZ)로 자동 인식합니다.',
    csvNote2: '* 참고 2: 그 밖의 시장은 종목 코드 뒤에 .TW, .HK 같은 접미사를 직접 붙여 주세요.',
    forceRefreshConfirm: '강제로 새로고침할까요? 24시간 캐시를 무시하고 실제 API 한도를 사용합니다.'
  },
  summary: {
    totalRealized: '총 실현손익 (환산)',
    totalUnrealized: '총 평가손익 (환산)',
    totalValue: '현재 보유 평가금액 (환산)',
    holdingCount: '보유 종목 수',
    holdingUnit: '종목'
  },
  charts: {
    trendTitle: '누적 투자 추이',
    saveImage: '차트를 이미지로 저장',
    noTrend: '아직 거래 기록이 부족해서 추이를 그릴 수 없습니다.',
    realizedTitle: '종목별 실현손익 (익절 / 너무 일찍 턴 종목)',
    distributionTitle: '보유 평가금액 분포 (상위 10종목)',
    convertedNote: '{{currency}} 기준으로 환산해 표시',
    noPnlData: '손익 데이터가 아직 없습니다.',
    noHoldings: '지금은 보유 종목이 없습니다.',
    legendConverted: '{{label}} (환산 후)',
    costSeries: '누적 매입원가',
    realizedSeries: '누적 실현손익',
    ifSoldSeries: '오늘 판다고 가정하면',
    actualSeries: '실제 실현손익',
    others: '기타'
  },
  table: {
    title: '종목별 거래 내역',
    subtitle: '행을 열면 매수/매도 내역을 볼 수 있습니다. 금액은 각 시장의 원통화로 표시됩니다.',
    columns: {
      symbol: '종목 코드 / 이름 (시장 · 통화)',
      holdingQty: '현재 보유 수량',
      currentValue: '현재가 / 평가금액',
      unrealized: '평가손익',
      realized: '실현손익',
      ifSoldToday: '오늘 판다고 가정',
      date: '날짜',
      type: '구분',
      quantity: '수량',
      price: '단가',
      amount: '금액',
      pnl: '손익',
      actions: '작업'
    },
    manualBadge: '수동',
    manualUpdatedAt: '수동 수정: {{value}}',
    apiUpdatedAt: 'API 마지막 업데이트: {{value}}',
    notUpdatedYet: '아직 업데이트되지 않음',
    manualNamePlaceholder: '직접 입력한 종목명',
    currentPricePlaceholder: '현재가',
    hedgeSuccess: '먼저 판 게 신의 한 수 ({{value}})',
    soldTooEarly: '너무 일찍 털었다 ({{value}})',
    tradeDetails: '체결 내역',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}}주 @ {{price}}',
    mobileHoldingQty: '보유 수량',
    mobileUnrealized: '평가손익',
    mobileRealized: '실현손익'
  },
  manager: {
    title: '설정 및 거래 기록',
    clearAndLoadDemo: '초기화 후 예시 데이터 불러오기',
    apiKeyTitle: 'yfapi.net API 키 설정',
    getFreeApiKey: '무료 발급받기',
    apiKeyPlaceholder: 'x-api-key를 붙여 넣으세요 (예: A2sD8...)',
    saveApiKey: '키 저장',
    baseCurrencyTitle: '요약 카드 기준 통화',
    baseCurrencyHelp: '* 모든 외화 자산은 실시간 환율로 이 통화에 맞춰 환산되어 상단 요약 카드에서 한 번에 합산됩니다.',
    hideZeroHolding: '청산된 종목 숨기기',
    manualRecordTitle: '거래 직접 추가',
    fields: {
      date: '날짜',
      type: '구분',
      market: '시장',
      symbol: '종목 코드',
      quantity: '수량',
      price: '단가',
      amount: '총금액',
      pnl: '손익 (매도만)'
    },
    placeholders: {
      symbol: '예: AAPL',
      quantity: '주 수',
      price: '주당 가격',
      amount: '해당 시장 통화 기준',
      pnl: '선택'
    },
    saveChanges: '변경 저장',
    addRecord: '추가',
    noRecords: '아직 거래 기록이 없습니다.'
  },
  notice: {
    title: 'Trade Lens에 오신 것을 환영합니다',
    body: '브로커 CSV를 매입 추이, 손익 분포, 보유 비중 차트로 바꿔주는 투자자용 오픈소스 도구입니다.',
    privacy: '개인정보 우선: 모든 데이터는 브라우저(IndexedDB) 안에만 저장되며 서버로 전송되지 않습니다.',
    apiKey: 'API 키는 yfapi.net에서 시세를 가져올 때만 쓰이며, 이것도 로컬에만 저장됩니다.',
    sourceCode: '오픈소스: 코드 보기 및 기여하기',
    dismiss: '다시 보지 않기'
  },
  messages: {
    apiKeySaved: 'API 키를 저장했습니다.',
    manualStockSaved: '{{symbol}} 정보를 수동으로 업데이트했습니다.',
    needApiKey: '시세를 업데이트하려면 먼저 설정 패널에 yfapi.net API 키를 입력하세요.',
    cacheFresh: '주가와 환율이 최근 24시간 안에 이미 갱신되어 로컬 캐시를 써서 한도를 아꼈습니다.',
    updateSuccess: '{{count}}개 종목의 시세와 환율 정보를 업데이트했습니다.',
    fetchFailed: '가져오기에 실패했습니다: {{message}}',
    baseCurrencyChanged: '기준 통화를 {{currency}}(으)로 바꾸는 중입니다. 환율도 같이 갱신합니다...',
    recordUpdated: '거래 기록을 업데이트했습니다.',
    dataCleared: '데이터를 지우고 예시 기록을 불러왔습니다.',
    clearConfirm: '모든 데이터를 지우고 예시 데이터를 다시 불러올까요? 이 작업은 되돌릴 수 없습니다.',
    backupConfirm: '지우기 전에 현재 데이터를 CSV로 백업할까요?'
  },
  data: {
    unknownSymbol: '알 수 없는 종목 코드 ({{symbol}})',
    unknown: '알 수 없음'
  }
};

const idID = {
  common: {
    language: 'Bahasa',
    close: 'Tutup',
    cancel: 'Batal',
    save: 'Simpan',
    edit: 'Edit',
    delete: 'Hapus',
    importCsv: 'Impor CSV',
    exportCsv: 'Ekspor CSV'
  },
  currencies: {
    TWD: 'Dolar Taiwan Baru (TWD)',
    CNY: 'Yuan Tiongkok (CNY)',
    HKD: 'Dolar Hong Kong (HKD)',
    USD: 'Dolar AS (USD)',
    JPY: 'Yen Jepang (JPY)'
  },
  markets: {
    all: 'Semua',
    chinaA: 'Saham A Tiongkok',
    hongKong: 'Saham Hong Kong',
    taiwan: 'Saham Taiwan',
    japan: 'Saham Jepang',
    us: 'Saham AS',
    other: 'Lainnya',
    unknown: 'Tidak diketahui'
  },
  tradeTypes: {
    buy: 'Beli',
    sell: 'Jual'
  },
  timeRanges: {
    oneWeek: '1 minggu',
    oneMonth: '1 bulan',
    threeMonths: '3 bulan',
    halfYear: '6 bulan',
    ytd: 'YTD',
    oneYear: '1 tahun',
    fiveYears: '5 tahun',
    all: 'Semua'
  },
  app: {
    loadingLocalData: 'Sedang memuat data IndexedDB lokal...',
    generatingImage: 'Sedang membuat gambar...',
    imageExportSuccess: 'Ekspor gambar berhasil.',
    imageExportFail: 'Ekspor gambar gagal.',
    noDataToExport: 'Saat ini belum ada data untuk diekspor.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Dashboard portofolio saham global',
    demoDescription: 'Saat ini hanya sebagian data contoh yang ditampilkan. Impor CSV lengkap untuk melihat gambaran penuh portofolio.',
    recordsLoaded: 'Berhasil memuat dan menganalisis {{count}} transaksi',
    lastUpdated: 'Pembaruan terakhir: {{value}}',
    switchToLight: 'Ganti ke mode terang',
    switchToDark: 'Ganti ke mode gelap',
    settingsRecords: 'Pengaturan & transaksi',
    updatePrices: 'Perbarui harga',
    apiKeyRequired: 'API Key harus diatur dulu',
    updateWithCache: 'Perbarui harga real-time (pakai cache)',
    setApiKeyFirst: 'Silakan atur API Key terlebih dahulu',
    forceRefresh: 'Refresh paksa',
    forceRefreshTitle: 'Lewati cache dan gunakan kuota API asli',
    languageLabel: 'Ganti bahasa',
    csvTitle: 'Panduan kolom CSV',
    csvIntro: 'Pastikan CSV Anda minimal memiliki header berikut. Urutannya tidak masalah:',
    csvRows: {
      date: 'Tanggal (contoh: 2025/01/01)',
      type: 'Jenis (Beli / Jual)',
      symbol: 'Simbol (contoh: AAPL, TSLA)',
      market: 'Pasar (opsional, berguna saat tambah manual)',
      quantity: 'Kuantitas',
      price: 'Harga per unit (mata uang asal)',
      amount: 'Nilai total (mata uang asal)',
      pnl: 'Laba/Rugi (wajib saat jual, mata uang asal)'
    },
    csvNote1: '* Catatan 1: Kode 6 digit yang diawali 6 atau 0 akan otomatis dikenali sebagai saham A Tiongkok (.SS / .SZ).',
    csvNote2: '* Catatan 2: Untuk pasar lain, tambahkan suffix langsung pada simbol seperti .TW atau .HK.',
    forceRefreshConfirm: 'Yakin ingin refresh paksa? Cache 24 jam akan diabaikan dan kuota API asli akan terpakai.'
  },
  summary: {
    totalRealized: 'Total laba/rugi terealisasi (setelah konversi)',
    totalUnrealized: 'Total laba/rugi belum terealisasi (setelah konversi)',
    totalValue: 'Nilai pasar saat ini (setelah konversi)',
    holdingCount: 'Jumlah posisi terbuka',
    holdingUnit: 'saham'
  },
  charts: {
    trendTitle: 'Tren modal terkumpul',
    saveImage: 'Simpan grafik sebagai gambar',
    noTrend: 'Data transaksi masih belum cukup untuk menggambar tren.',
    realizedTitle: 'Laba/rugi terealisasi per saham (jual kecepetan / keluar cantik)',
    distributionTitle: 'Distribusi nilai portofolio (10 teratas)',
    convertedNote: 'Ditampilkan setelah dikonversi ke {{currency}}',
    noPnlData: 'Belum ada data laba/rugi saat ini.',
    noHoldings: 'Saat ini belum ada posisi terbuka.',
    legendConverted: '{{label}} (setelah konversi)',
    costSeries: 'Modal terkumpul',
    realizedSeries: 'Laba/rugi terealisasi terkumpul',
    ifSoldSeries: 'Kalau jual hari ini',
    actualSeries: 'Laba/rugi aktual',
    others: 'Lainnya'
  },
  table: {
    title: 'Riwayat transaksi per saham',
    subtitle: 'Klik baris untuk melihat detail beli dan jual. Semua nominal tetap ditampilkan dalam mata uang asli pasar tersebut.',
    columns: {
      symbol: 'Simbol / nama saham (pasar · mata uang)',
      holdingQty: 'Kuantitas saat ini',
      currentValue: 'Harga saat ini / nilai pasar',
      unrealized: 'Laba/rugi belum terealisasi',
      realized: 'Laba/rugi terealisasi',
      ifSoldToday: 'Kalau jual hari ini',
      date: 'Tanggal',
      type: 'Jenis',
      quantity: 'Kuantitas',
      price: 'Harga',
      amount: 'Nilai',
      pnl: 'Laba/Rugi',
      actions: 'Aksi'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Diubah manual pada: {{value}}',
    apiUpdatedAt: 'Pembaruan API terakhir: {{value}}',
    notUpdatedYet: 'Belum diperbarui',
    manualNamePlaceholder: 'Nama saham manual',
    currentPricePlaceholder: 'Harga saat ini',
    hedgeSuccess: 'Keluar lebih awal ternyata lebih oke ({{value}})',
    soldTooEarly: 'Jual terlalu cepat, kehilangan {{value}}',
    tradeDetails: 'Detail transaksi',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} saham @ {{price}}',
    mobileHoldingQty: 'Pegangan',
    mobileUnrealized: 'Belum realisasi',
    mobileRealized: 'Terealisasi'
  },
  manager: {
    title: 'Pengaturan & catatan transaksi',
    clearAndLoadDemo: 'Hapus lalu muat data contoh',
    apiKeyTitle: 'Pengaturan API Key yfapi.net',
    getFreeApiKey: 'Daftar gratis untuk dapat key',
    apiKeyPlaceholder: 'Tempel x-api-key Anda di sini (contoh: A2sD8...)',
    saveApiKey: 'Simpan key',
    baseCurrencyTitle: 'Mata uang dasar kartu ringkasan',
    baseCurrencyHelp: '* Semua aset mata uang asing akan dikonversi ke mata uang ini memakai kurs terbaru agar bisa dijumlahkan di kartu ringkasan bagian atas.',
    hideZeroHolding: 'Sembunyikan transaksi yang sudah tidak punya posisi',
    manualRecordTitle: 'Tambah transaksi manual',
    fields: {
      date: 'Tanggal',
      type: 'Jenis',
      market: 'Pasar',
      symbol: 'Simbol',
      quantity: 'Kuantitas',
      price: 'Harga per unit',
      amount: 'Nilai total',
      pnl: 'Laba/Rugi (khusus jual)'
    },
    placeholders: {
      symbol: 'Contoh: AAPL',
      quantity: 'Jumlah saham',
      price: 'Harga per saham',
      amount: 'Ikuti mata uang pasar tersebut',
      pnl: 'Opsional'
    },
    saveChanges: 'Simpan perubahan',
    addRecord: 'Tambah',
    noRecords: 'Saat ini belum ada transaksi.'
  },
  notice: {
    title: 'Selamat datang di Trade Lens',
    body: 'Ini adalah alat open source untuk investor yang mengubah CSV broker menjadi grafik modal, distribusi laba/rugi, dan gambaran portofolio yang lebih gampang dibaca.',
    privacy: 'Privasi didahulukan: semua data hanya disimpan di browser Anda (IndexedDB) dan tidak dikirim ke server.',
    apiKey: 'API Key hanya dipakai untuk mengambil harga dari yfapi.net dan juga disimpan secara lokal.',
    sourceCode: 'Open source: lihat kode dan ikut berkontribusi',
    dismiss: 'Jangan tampilkan lagi'
  },
  messages: {
    apiKeySaved: 'API Key berhasil disimpan.',
    manualStockSaved: 'Informasi {{symbol}} berhasil diperbarui secara manual.',
    needApiKey: 'Masukkan API Key yfapi.net di panel pengaturan sebelum memperbarui harga.',
    cacheFresh: 'Harga saham dan kurs sudah diperbarui dalam 24 jam terakhir, jadi sistem memakai cache lokal untuk menghemat kuota.',
    updateSuccess: 'Berhasil memperbarui harga saham dan kurs untuk {{count}} item.',
    fetchFailed: 'Gagal mengambil data: {{message}}',
    baseCurrencyChanged: 'Mata uang dasar telah diubah ke {{currency}}. Sedang memperbarui kurs...',
    recordUpdated: 'Catatan transaksi berhasil diperbarui.',
    dataCleared: 'Data berhasil dihapus dan data contoh dimuat ulang.',
    clearConfirm: 'Yakin ingin menghapus semua data dan memuat ulang data contoh? Tindakan ini tidak bisa dibatalkan.',
    backupConfirm: 'Sebelum dihapus, mau ekspor data saat ini sebagai cadangan CSV dulu?'
  },
  data: {
    unknownSymbol: 'Simbol tidak dikenal ({{symbol}})',
    unknown: 'Tidak diketahui'
  }
};

const frFR = {
  common: {
    language: 'Langue',
    close: 'Fermer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
    importCsv: 'Importer CSV',
    exportCsv: 'Exporter CSV'
  },
  currencies: {
    TWD: 'Dollar taïwanais (TWD)',
    CNY: 'Yuan chinois (CNY)',
    HKD: 'Dollar de Hong Kong (HKD)',
    USD: 'Dollar américain (USD)',
    JPY: 'Yen japonais (JPY)'
  },
  markets: {
    all: 'Tous',
    chinaA: 'Actions A chinoises',
    hongKong: 'Actions Hong Kong',
    taiwan: 'Actions Taïwan',
    japan: 'Actions japonaises',
    us: 'Actions US',
    other: 'Autres',
    unknown: 'Inconnu'
  },
  tradeTypes: {
    buy: 'Achat',
    sell: 'Vente'
  },
  timeRanges: {
    oneWeek: '1 sem.',
    oneMonth: '1 mois',
    threeMonths: '3 mois',
    halfYear: '6 mois',
    ytd: 'YTD',
    oneYear: '1 an',
    fiveYears: '5 ans',
    all: 'Tout'
  },
  app: {
    loadingLocalData: 'Chargement des données IndexedDB locales...',
    generatingImage: 'Génération de l’image...',
    imageExportSuccess: 'Export de l’image réussi.',
    imageExportFail: 'Échec de l’export de l’image.',
    noDataToExport: 'Aucune donnée à exporter pour le moment.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Tableau de bord du portefeuille actions mondial',
    demoDescription: 'Pour l’instant, vous voyez une version allégée des données de démonstration. Importez le CSV complet pour retrouver toute la vue portefeuille.',
    recordsLoaded: '{{count}} transactions chargées et analysées',
    lastUpdated: 'Dernière mise à jour : {{value}}',
    switchToLight: 'Passer en mode clair',
    switchToDark: 'Passer en mode sombre',
    settingsRecords: 'Paramètres & transactions',
    updatePrices: 'Mettre à jour les prix',
    apiKeyRequired: 'API Key requise',
    updateWithCache: 'Mettre à jour les prix en temps réel (avec cache)',
    setApiKeyFirst: 'Veuillez d’abord configurer l’API Key',
    forceRefresh: 'Forcer l’actualisation',
    forceRefreshTitle: 'Ignorer le cache et consommer le quota API',
    languageLabel: 'Changer de langue',
    csvTitle: 'Guide des colonnes CSV',
    csvIntro: 'Votre CSV doit contenir au minimum les en-têtes suivants, dans n’importe quel ordre :',
    csvRows: {
      date: 'Date (ex. : 2025/01/01)',
      type: 'Type (Achat / Vente)',
      symbol: 'Symbole (ex. : AAPL, NVDA)',
      market: 'Marché (facultatif, utile en saisie manuelle)',
      quantity: 'Quantité',
      price: 'Prix unitaire (devise d’origine)',
      amount: 'Montant total (devise d’origine)',
      pnl: 'Plus/moins-value (obligatoire à la vente, devise d’origine)'
    },
    csvNote1: '* Note 1 : un code à 6 chiffres commençant par 6 ou 0 sera reconnu automatiquement comme une action A chinoise (.SS / .SZ).',
    csvNote2: '* Note 2 : pour les autres marchés, ajoutez directement le suffixe au symbole comme .TW ou .HK.',
    forceRefreshConfirm: 'Confirmer l’actualisation forcée ? Le cache de 24 heures sera ignoré et le quota API sera réellement consommé.'
  },
  summary: {
    totalRealized: 'Total des plus/moins-values réalisées (converti)',
    totalUnrealized: 'Total des plus/moins-values latentes (converti)',
    totalValue: 'Valeur de marché actuelle (convertie)',
    holdingCount: 'Nombre de lignes en portefeuille',
    holdingUnit: 'lignes'
  },
  charts: {
    trendTitle: 'Évolution du capital investi',
    saveImage: 'Enregistrer le graphique en image',
    noTrend: 'Il n’y a pas encore assez de transactions pour tracer une tendance.',
    realizedTitle: 'Plus/moins-values réalisées par titre (vente trop tôt / sortie propre)',
    distributionTitle: 'Répartition de la valeur du portefeuille (top 10)',
    convertedNote: 'Affiché après conversion en {{currency}}',
    noPnlData: 'Aucune donnée de plus/moins-value pour le moment.',
    noHoldings: 'Aucune position ouverte actuellement.',
    legendConverted: '{{label}} (après conversion)',
    costSeries: 'Capital investi cumulé',
    realizedSeries: 'Plus/moins-values réalisées cumulées',
    ifSoldSeries: 'Si vendu aujourd’hui',
    actualSeries: 'Réalisé réellement',
    others: 'Autres'
  },
  table: {
    title: 'Historique par titre',
    subtitle: 'Cliquez sur une ligne pour voir le détail des achats et ventes. Les montants restent affichés dans la devise d’origine du marché concerné.',
    columns: {
      symbol: 'Symbole / nom du titre (marché · devise)',
      holdingQty: 'Quantité en portefeuille',
      currentValue: 'Cours actuel / valeur de marché',
      unrealized: 'Plus/moins-value latente',
      realized: 'Plus/moins-value réalisée',
      ifSoldToday: 'Si vendu aujourd’hui',
      date: 'Date',
      type: 'Type',
      quantity: 'Quantité',
      price: 'Prix',
      amount: 'Montant',
      pnl: 'P/L',
      actions: 'Actions'
    },
    manualBadge: 'Manuel',
    manualUpdatedAt: 'Mis à jour manuellement : {{value}}',
    apiUpdatedAt: 'Dernière mise à jour API : {{value}}',
    notUpdatedYet: 'Pas encore mis à jour',
    manualNamePlaceholder: 'Nom saisi manuellement',
    currentPricePlaceholder: 'Cours actuel',
    hedgeSuccess: 'Sortir plus tôt s’est finalement révélé plus payant ({{value}})',
    soldTooEarly: 'Vendu trop tôt, vous avez laissé {{value}} sur la table',
    tradeDetails: 'Détail des transactions',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} actions @ {{price}}',
    mobileHoldingQty: 'Position',
    mobileUnrealized: 'Latent',
    mobileRealized: 'Réalisé'
  },
  manager: {
    title: 'Paramètres & historique',
    clearAndLoadDemo: 'Effacer et charger les données de démonstration',
    apiKeyTitle: 'Configuration de l’API Key yfapi.net',
    getFreeApiKey: 'Créer une clé gratuite',
    apiKeyPlaceholder: 'Collez votre x-api-key ici (ex. : A2sD8...)',
    saveApiKey: 'Enregistrer la clé',
    baseCurrencyTitle: 'Devise de base des cartes récapitulatives',
    baseCurrencyHelp: '* Tous les actifs en devise étrangère sont convertis dans cette devise avec le taux de change le plus récent afin de pouvoir être additionnés dans les cartes récapitulatives.',
    hideZeroHolding: 'Masquer les titres soldés',
    manualRecordTitle: 'Ajouter une transaction manuellement',
    fields: {
      date: 'Date',
      type: 'Type',
      market: 'Marché',
      symbol: 'Symbole',
      quantity: 'Quantité',
      price: 'Prix unitaire',
      amount: 'Montant total',
      pnl: 'Plus/moins-value (vente uniquement)'
    },
    placeholders: {
      symbol: 'Ex. : AAPL',
      quantity: 'Nombre d’actions',
      price: 'Prix par action',
      amount: 'Dans la devise du marché concerné',
      pnl: 'Facultatif'
    },
    saveChanges: 'Enregistrer les modifications',
    addRecord: 'Ajouter',
    noRecords: 'Aucune transaction pour le moment.'
  },
  notice: {
    title: 'Bienvenue sur Trade Lens',
    body: 'Cet outil open source pour investisseurs transforme les CSV de courtier en courbes de coût, vues P/L et répartitions de portefeuille nettement plus lisibles.',
    privacy: 'Priorité à la confidentialité : toutes les données restent uniquement dans votre navigateur (IndexedDB) et ne sont pas envoyées au serveur.',
    apiKey: 'L’API Key sert uniquement à récupérer les cours via yfapi.net et reste elle aussi stockée localement.',
    sourceCode: 'Open source : consultez le code et contribuez',
    dismiss: 'Ne plus afficher'
  },
  messages: {
    apiKeySaved: 'API Key enregistrée.',
    manualStockSaved: 'Les informations de {{symbol}} ont été mises à jour manuellement.',
    needApiKey: 'Veuillez saisir l’API Key yfapi.net dans le panneau de configuration avant de mettre les prix à jour.',
    cacheFresh: 'Les cours et taux de change ont déjà été mis à jour dans les dernières 24 heures ; le cache local a donc été utilisé pour économiser le quota.',
    updateSuccess: 'Cours et taux de change mis à jour pour {{count}} éléments.',
    fetchFailed: 'Échec de récupération : {{message}}',
    baseCurrencyChanged: 'La devise de base a été changée en {{currency}}. Mise à jour des taux de change en cours...',
    recordUpdated: 'Historique de transactions mis à jour.',
    dataCleared: 'Les données ont été effacées et les données de démonstration rechargées.',
    clearConfirm: 'Confirmer la suppression de toutes les données et le rechargement des données de démonstration ? Cette action est irréversible.',
    backupConfirm: 'Avant d’effacer, voulez-vous exporter les données actuelles en CSV de sauvegarde ?'
  },
  data: {
    unknownSymbol: 'Symbole inconnu ({{symbol}})',
    unknown: 'Inconnu'
  }
};

const deDE = {
  common: {
    language: 'Sprache',
    close: 'Schließen',
    cancel: 'Abbrechen',
    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    importCsv: 'CSV importieren',
    exportCsv: 'CSV exportieren'
  },
  currencies: {
    TWD: 'Neuer Taiwan-Dollar (TWD)',
    CNY: 'Chinesischer Yuan (CNY)',
    HKD: 'Hongkong-Dollar (HKD)',
    USD: 'US-Dollar (USD)',
    JPY: 'Japanischer Yen (JPY)'
  },
  markets: {
    all: 'Alle',
    chinaA: 'China-A-Aktien',
    hongKong: 'Hongkong-Aktien',
    taiwan: 'Taiwan-Aktien',
    japan: 'Japan-Aktien',
    us: 'US-Aktien',
    other: 'Sonstige',
    unknown: 'Unbekannt'
  },
  tradeTypes: {
    buy: 'Kauf',
    sell: 'Verkauf'
  },
  timeRanges: {
    oneWeek: '1W',
    oneMonth: '1M',
    threeMonths: '3M',
    halfYear: '6M',
    ytd: 'YTD',
    oneYear: '1J',
    fiveYears: '5J',
    all: 'Alle'
  },
  app: {
    loadingLocalData: 'Lokale IndexedDB-Daten werden geladen...',
    generatingImage: 'Bild wird erstellt...',
    imageExportSuccess: 'Bild erfolgreich exportiert.',
    imageExportFail: 'Bildexport fehlgeschlagen.',
    noDataToExport: 'Zurzeit gibt es keine Daten zum Exportieren.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Globales Depot-Dashboard',
    demoDescription: 'Aktuell wird nur ein gekürzter Demo-Datensatz angezeigt. Importieren Sie das komplette CSV, um das ganze Bild zu sehen.',
    recordsLoaded: '{{count}} Transaktionen geladen und analysiert',
    lastUpdated: 'Zuletzt aktualisiert: {{value}}',
    switchToLight: 'Zum hellen Modus wechseln',
    switchToDark: 'Zum dunklen Modus wechseln',
    settingsRecords: 'Einstellungen & Trades',
    updatePrices: 'Kurse aktualisieren',
    apiKeyRequired: 'API-Key erforderlich',
    updateWithCache: 'Live-Kurse mit Cache aktualisieren',
    setApiKeyFirst: 'Bitte zuerst den API-Key hinterlegen',
    forceRefresh: 'Hart aktualisieren',
    forceRefreshTitle: 'Cache ignorieren und API-Kontingent verbrauchen',
    languageLabel: 'Sprache wechseln',
    csvTitle: 'CSV-Feldhilfe',
    csvIntro: 'Das CSV sollte mindestens diese Spaltenüberschriften enthalten. Die Reihenfolge ist egal:',
    csvRows: {
      date: 'Datum (z. B. 2025/01/01)',
      type: 'Typ (Kauf / Verkauf)',
      symbol: 'Symbol (z. B. AAPL, NVDA)',
      market: 'Markt (optional, hilfreich bei manuellen Einträgen)',
      quantity: 'Stückzahl',
      price: 'Kurs je Stück (Originalwährung)',
      amount: 'Gesamtbetrag (Originalwährung)',
      pnl: 'Gewinn/Verlust (bei Verkäufen Pflicht, Originalwährung)'
    },
    csvNote1: '* Hinweis 1: Sechsstellige Codes, die mit 6 oder 0 beginnen, werden automatisch als China-A-Aktien (.SS / .SZ) erkannt.',
    csvNote2: '* Hinweis 2: Bei anderen Märkten den Suffix direkt an das Symbol hängen, z. B. .TW oder .HK.',
    forceRefreshConfirm: 'Wirklich hart aktualisieren? Der 24-Stunden-Cache wird ignoriert und echtes API-Kontingent verbraucht.'
  },
  summary: {
    totalRealized: 'Realisierter Gewinn/Verlust gesamt (umgerechnet)',
    totalUnrealized: 'Unrealisierter Gewinn/Verlust gesamt (umgerechnet)',
    totalValue: 'Aktueller Depotwert (umgerechnet)',
    holdingCount: 'Offene Positionen',
    holdingUnit: 'Positionen'
  },
  charts: {
    trendTitle: 'Kumulierte Kostenbasis',
    saveImage: 'Diagramm als Bild speichern',
    noTrend: 'Noch nicht genug Transaktionen, um einen Verlauf zu zeichnen.',
    realizedTitle: 'Realisierter G/V nach Wertpapier (zu früh Kasse gemacht / sauberer Exit)',
    distributionTitle: 'Depotverteilung nach Marktwert (Top 10)',
    convertedNote: 'Nach Umrechnung in {{currency}} dargestellt',
    noPnlData: 'Noch keine G/V-Daten vorhanden.',
    noHoldings: 'Aktuell keine offenen Positionen.',
    legendConverted: '{{label}} (umgerechnet)',
    costSeries: 'Kumulierte Kostenbasis',
    realizedSeries: 'Kumulierter realisierter G/V',
    ifSoldSeries: 'Wenn heute verkauft',
    actualSeries: 'Tatsächlich realisiert',
    others: 'Sonstige'
  },
  table: {
    title: 'Historie nach Wertpapier',
    subtitle: 'Öffnen Sie eine Zeile, um Kauf- und Verkaufslots zu prüfen. Die Werte bleiben in der jeweiligen Handelswährung.',
    columns: {
      symbol: 'Symbol / Name (Markt · Währung)',
      holdingQty: 'Aktuelle Stückzahl',
      currentValue: 'Letzter Kurs / Marktwert',
      unrealized: 'Unrealisierter G/V',
      realized: 'Realisierter G/V',
      ifSoldToday: 'Wenn heute verkauft',
      date: 'Datum',
      type: 'Typ',
      quantity: 'Stückzahl',
      price: 'Kurs',
      amount: 'Betrag',
      pnl: 'G/V',
      actions: 'Aktionen'
    },
    manualBadge: 'Manuell',
    manualUpdatedAt: 'Manuell überschrieben: {{value}}',
    apiUpdatedAt: 'API-Aktualisierung: {{value}}',
    notUpdatedYet: 'Noch nicht aktualisiert',
    manualNamePlaceholder: 'Manueller Name',
    currentPricePlaceholder: 'Kurs',
    hedgeSuccess: 'Früher rauszugehen war am Ende besser ({{value}})',
    soldTooEarly: 'Zu früh verkauft, {{value}} liegen gelassen',
    tradeDetails: 'Ausführungsdetails',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} Stück @ {{price}}',
    mobileHoldingQty: 'Bestand',
    mobileUnrealized: 'Unrealisiert',
    mobileRealized: 'Realisiert'
  },
  manager: {
    title: 'Einstellungen & Transaktionen',
    clearAndLoadDemo: 'Leeren und Demo laden',
    apiKeyTitle: 'yfapi.net API-Key',
    getFreeApiKey: 'Kostenlos besorgen',
    apiKeyPlaceholder: 'Hier den x-api-key einfügen (z. B. A2sD8...)',
    saveApiKey: 'API-Key speichern',
    baseCurrencyTitle: 'Basiswährung der Übersicht',
    baseCurrencyHelp: '* Alle Fremdwährungswerte werden per aktuellem FX in diese Basiswährung umgerechnet, damit die Kennzahlen oben sauber summiert werden können.',
    hideZeroHolding: 'Komplett verkaufte Positionen ausblenden',
    manualRecordTitle: 'Trade manuell hinzufügen',
    fields: {
      date: 'Datum',
      type: 'Typ',
      market: 'Markt',
      symbol: 'Symbol',
      quantity: 'Stückzahl',
      price: 'Kurs je Stück',
      amount: 'Gesamtbetrag',
      pnl: 'Realisierter G/V (nur Verkauf)'
    },
    placeholders: {
      symbol: 'Z. B. AAPL',
      quantity: 'Stückzahl',
      price: 'Preis pro Stück',
      amount: 'In der Marktwährung',
      pnl: 'Optional'
    },
    saveChanges: 'Änderungen speichern',
    addRecord: 'Hinzufügen',
    noRecords: 'Noch keine Transaktionen vorhanden.'
  },
  notice: {
    title: 'Willkommen bei Trade Lens',
    body: 'Trade Lens ist ein Open-Source-Tool für Anleger, das Broker-CSV-Dateien in Kostenbasis-Verläufe, G/V-Ansichten und Depotaufteilungen verwandelt.',
    privacy: 'Privatsphäre zuerst: Alle Daten bleiben nur in Ihrem Browser (IndexedDB). Es wird nichts an unseren Server gesendet.',
    apiKey: 'Der API-Key wird nur für Kursabfragen bei yfapi.net verwendet und ebenfalls lokal gespeichert.',
    sourceCode: 'Open Source: Code ansehen und mitwirken',
    dismiss: 'Nicht mehr anzeigen'
  },
  messages: {
    apiKeySaved: 'API-Key gespeichert.',
    manualStockSaved: '{{symbol}} manuell aktualisiert.',
    needApiKey: 'Vor dem Aktualisieren der Kurse bitte zuerst den yfapi.net API-Key hinterlegen.',
    cacheFresh: 'Kurse und FX-Raten wurden in den letzten 24 Stunden bereits aktualisiert. Daher wurde der lokale Cache genutzt, um Kontingent zu sparen.',
    updateSuccess: '{{count}} Kurse und FX-Raten aktualisiert.',
    fetchFailed: 'Abruf fehlgeschlagen: {{message}}',
    baseCurrencyChanged: 'Basiswährung auf {{currency}} umgestellt. FX-Raten werden aktualisiert...',
    recordUpdated: 'Transaktion aktualisiert.',
    dataCleared: 'Daten gelöscht und Demo-Datensätze geladen.',
    clearConfirm: 'Alle Daten löschen und den Demo-Satz neu laden? Das kann nicht rückgängig gemacht werden.',
    backupConfirm: 'Möchten Sie die aktuellen Daten vor dem Löschen als CSV-Backup exportieren?'
  },
  data: {
    unknownSymbol: 'Unbekanntes Symbol ({{symbol}})',
    unknown: 'Unbekannt'
  }
};

const es419 = {
  common: {
    language: 'Idioma',
    close: 'Cerrar',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    importCsv: 'Importar CSV',
    exportCsv: 'Exportar CSV'
  },
  currencies: {
    TWD: 'Nuevo dólar taiwanés (TWD)',
    CNY: 'Yuan chino (CNY)',
    HKD: 'Dólar de Hong Kong (HKD)',
    USD: 'Dólar estadounidense (USD)',
    JPY: 'Yen japonés (JPY)'
  },
  markets: {
    all: 'Todo',
    chinaA: 'Acciones A de China',
    hongKong: 'Acciones de Hong Kong',
    taiwan: 'Acciones de Taiwán',
    japan: 'Acciones de Japón',
    us: 'Acciones de EE. UU.',
    other: 'Otros',
    unknown: 'Desconocido'
  },
  tradeTypes: {
    buy: 'Compra',
    sell: 'Venta'
  },
  timeRanges: {
    oneWeek: '1 sem.',
    oneMonth: '1 mes',
    threeMonths: '3 meses',
    halfYear: '6 meses',
    ytd: 'YTD',
    oneYear: '1 año',
    fiveYears: '5 años',
    all: 'Todo'
  },
  app: {
    loadingLocalData: 'Cargando datos locales de IndexedDB...',
    generatingImage: 'Generando imagen...',
    imageExportSuccess: 'Imagen exportada con éxito.',
    imageExportFail: 'Falló la exportación de la imagen.',
    noDataToExport: 'No hay datos para exportar en este momento.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Panel global del portafolio',
    demoDescription: 'Ahorita estás viendo una versión recortada del demo. Importa el CSV completo para ver toda la película.',
    recordsLoaded: '{{count}} operaciones cargadas y analizadas',
    lastUpdated: 'Última actualización: {{value}}',
    switchToLight: 'Cambiar a modo claro',
    switchToDark: 'Cambiar a modo oscuro',
    settingsRecords: 'Configuración y operaciones',
    updatePrices: 'Actualizar cotizaciones',
    apiKeyRequired: 'Se necesita clave API',
    updateWithCache: 'Actualizar cotizaciones en vivo con caché',
    setApiKeyFirst: 'Configura primero tu clave API',
    forceRefresh: 'Forzar actualización',
    forceRefreshTitle: 'Ignorar caché y consumir cuota real de la API',
    languageLabel: 'Cambiar idioma',
    csvTitle: 'Guía de columnas CSV',
    csvIntro: 'Asegúrate de que tu CSV tenga al menos estos encabezados. El orden no importa:',
    csvRows: {
      date: 'Fecha (por ejemplo: 2025/01/01)',
      type: 'Tipo (Compra / Venta)',
      symbol: 'Símbolo (por ejemplo: AAPL, NVDA)',
      market: 'Mercado (opcional, útil para cargas manuales)',
      quantity: 'Cantidad',
      price: 'Precio unitario (moneda original)',
      amount: 'Monto total (moneda original)',
      pnl: 'Ganancia/Pérdida (obligatorio en ventas, moneda original)'
    },
    csvNote1: '* Nota 1: Los códigos de 6 dígitos que empiezan con 6 o 0 se detectan automáticamente como acciones A de China (.SS / .SZ).',
    csvNote2: '* Nota 2: Para otros mercados, agrega el sufijo directo al símbolo, por ejemplo .TW o .HK.',
    forceRefreshConfirm: '¿Forzar actualización? Esto ignorará la caché de 24 horas y gastará cuota real de la API.'
  },
  summary: {
    totalRealized: 'Ganancia/pérdida realizada total (convertida)',
    totalUnrealized: 'Ganancia/pérdida no realizada total (convertida)',
    totalValue: 'Valor actual de la cartera (convertido)',
    holdingCount: 'Posiciones abiertas',
    holdingUnit: 'posiciones'
  },
  charts: {
    trendTitle: 'Tendencia del costo acumulado',
    saveImage: 'Guardar gráfico como imagen',
    noTrend: 'Todavía no hay suficiente historial para dibujar la tendencia.',
    realizedTitle: 'Ganancia/pérdida realizada por ticker (venta apresurada / salida limpia)',
    distributionTitle: 'Distribución del valor en cartera (top 10)',
    convertedNote: 'Mostrado en {{currency}} después de la conversión',
    noPnlData: 'Todavía no hay datos de P/L.',
    noHoldings: 'No hay posiciones abiertas en este momento.',
    legendConverted: '{{label}} (convertido)',
    costSeries: 'Costo acumulado',
    realizedSeries: 'Ganancia/pérdida realizada acumulada',
    ifSoldSeries: 'Si vendieras hoy',
    actualSeries: 'Realizado real',
    others: 'Otros'
  },
  table: {
    title: 'Historial por símbolo',
    subtitle: 'Abre una fila para revisar compras y ventas. Los valores se mantienen en la moneda original de cotización.',
    columns: {
      symbol: 'Símbolo / nombre (mercado · moneda)',
      holdingQty: 'Cantidad actual',
      currentValue: 'Último precio / valor de mercado',
      unrealized: 'Ganancia/pérdida no realizada',
      realized: 'Ganancia/pérdida realizada',
      ifSoldToday: 'Si vendieras hoy',
      date: 'Fecha',
      type: 'Tipo',
      quantity: 'Cantidad',
      price: 'Precio',
      amount: 'Monto',
      pnl: 'P/L',
      actions: 'Acciones'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Ajuste manual: {{value}}',
    apiUpdatedAt: 'Actualización API: {{value}}',
    notUpdatedYet: 'Aún sin actualizar',
    manualNamePlaceholder: 'Nombre manual',
    currentPricePlaceholder: 'Precio',
    hedgeSuccess: 'Salir antes terminó siendo la mejor jugada ({{value}})',
    soldTooEarly: 'Vendiste antes de tiempo y dejaste {{value}} sobre la mesa',
    tradeDetails: 'Detalle de ejecuciones',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} acciones @ {{price}}',
    mobileHoldingQty: 'Posición',
    mobileUnrealized: 'No realizado',
    mobileRealized: 'Realizado'
  },
  manager: {
    title: 'Configuración y registro de operaciones',
    clearAndLoadDemo: 'Borrar y cargar datos demo',
    apiKeyTitle: 'Clave API de yfapi.net',
    getFreeApiKey: 'Consigue una gratis',
    apiKeyPlaceholder: 'Pega aquí tu x-api-key (por ejemplo: A2sD8...)',
    saveApiKey: 'Guardar clave API',
    baseCurrencyTitle: 'Moneda base del resumen',
    baseCurrencyHelp: '* Todos los activos en moneda extranjera se convierten a esta moneda usando FX en vivo para que las tarjetas del resumen arriba puedan sumar todo sin enredos.',
    hideZeroHolding: 'Ocultar posiciones ya cerradas',
    manualRecordTitle: 'Agregar operación manual',
    fields: {
      date: 'Fecha',
      type: 'Tipo',
      market: 'Mercado',
      symbol: 'Símbolo',
      quantity: 'Cantidad',
      price: 'Precio unitario',
      amount: 'Monto total',
      pnl: 'Ganancia/Pérdida realizada (solo venta)'
    },
    placeholders: {
      symbol: 'Por ejemplo: AAPL',
      quantity: 'Acciones',
      price: 'Precio por acción',
      amount: 'En la moneda de ese mercado',
      pnl: 'Opcional'
    },
    saveChanges: 'Guardar cambios',
    addRecord: 'Agregar',
    noRecords: 'Todavía no hay operaciones.'
  },
  notice: {
    title: 'Bienvenido a Trade Lens',
    body: 'Trade Lens es una herramienta de código abierto que convierte los CSV de tu bróker en tendencias de costo, vistas de P/L y una foto mucho más clara de tu portafolio.',
    privacy: 'Privacidad primero: todo se queda solo en tu navegador (IndexedDB). No se envía nada a nuestro servidor.',
    apiKey: 'La clave API solo se usa para consultar precios en yfapi.net y también se guarda de forma local.',
    sourceCode: 'Código abierto: revisa el código y contribuye',
    dismiss: 'No volver a mostrar'
  },
  messages: {
    apiKeySaved: 'Clave API guardada.',
    manualStockSaved: '{{symbol}} actualizado manualmente.',
    needApiKey: 'Ingresa tu clave API de yfapi.net en el panel de configuración antes de actualizar cotizaciones.',
    cacheFresh: 'Los precios y tipos de cambio ya se actualizaron en las últimas 24 horas, así que la app reutilizó la caché local para ahorrar cuota.',
    updateSuccess: 'Se actualizaron {{count}} cotizaciones y tipos de cambio.',
    fetchFailed: 'Error al consultar: {{message}}',
    baseCurrencyChanged: 'La moneda base cambió a {{currency}}. Actualizando tipos de cambio...',
    recordUpdated: 'Operación actualizada.',
    dataCleared: 'Datos borrados y demo recargada.',
    clearConfirm: '¿Borrar todos los datos y recargar el set demo? Esta acción no se puede deshacer.',
    backupConfirm: '¿Quieres exportar los datos actuales como respaldo CSV antes de borrarlos?'
  },
  data: {
    unknownSymbol: 'Símbolo desconocido ({{symbol}})',
    unknown: 'Desconocido'
  }
};

const esES = {
  ...es419,
  header: {
    ...es419.header,
    title: 'Panel global de cartera',
    demoDescription: 'Ahora mismo solo se muestra una parte del conjunto de demostración. Importa el CSV completo para ver la foto entera.',
    csvRows: {
      ...es419.header.csvRows,
      symbol: 'Símbolo (por ejemplo: SHEL, AAPL)'
    }
  },
  summary: {
    ...es419.summary,
    totalRealized: 'Plusvalía/pérdida realizada total (convertida)',
    totalUnrealized: 'Plusvalía/pérdida latente total (convertida)'
  },
  charts: {
    ...es419.charts,
    realizedTitle: 'Plusvalía/pérdida realizada por valor (venta precipitada / salida fina)'
  },
  table: {
    ...es419.table,
    title: 'Histórico por valor',
    subtitle: 'Abre una fila para revisar compras y ventas. Los importes se mantienen en la divisa de cotización.',
    hedgeSuccess: 'Salir antes salió mejor ({{value}})',
    soldTooEarly: 'Vendiste demasiado pronto y te dejaste {{value}}'
  },
  manager: {
    ...es419.manager,
    placeholders: {
      ...es419.manager.placeholders,
      symbol: 'Por ejemplo: SHEL'
    }
  },
  messages: {
    ...es419.messages,
    updateSuccess: 'Se actualizaron {{count}} cotizaciones y tipos de cambio.',
    backupConfirm: '¿Quieres exportar los datos actuales como copia CSV antes de borrarlos?'
  }
};

const itIT = {
  common: {
    language: 'Lingua',
    close: 'Chiudi',
    cancel: 'Annulla',
    save: 'Salva',
    edit: 'Modifica',
    delete: 'Elimina',
    importCsv: 'Importa CSV',
    exportCsv: 'Esporta CSV'
  },
  currencies: {
    TWD: 'Nuovo dollaro taiwanese (TWD)',
    CNY: 'Yuan cinese (CNY)',
    HKD: 'Dollaro di Hong Kong (HKD)',
    USD: 'Dollaro statunitense (USD)',
    JPY: 'Yen giapponese (JPY)'
  },
  markets: {
    all: 'Tutto',
    chinaA: 'Azioni A cinesi',
    hongKong: 'Azioni di Hong Kong',
    taiwan: 'Azioni di Taiwan',
    japan: 'Azioni giapponesi',
    us: 'Azioni USA',
    other: 'Altro',
    unknown: 'Sconosciuto'
  },
  tradeTypes: {
    buy: 'Acquisto',
    sell: 'Vendita'
  },
  timeRanges: {
    oneWeek: '1 set.',
    oneMonth: '1 mese',
    threeMonths: '3 mesi',
    halfYear: '6 mesi',
    ytd: 'YTD',
    oneYear: '1 anno',
    fiveYears: '5 anni',
    all: 'Tutto'
  },
  app: {
    loadingLocalData: 'Caricamento dei dati locali IndexedDB...',
    generatingImage: 'Generazione immagine...',
    imageExportSuccess: 'Immagine esportata con successo.',
    imageExportFail: 'Esportazione immagine non riuscita.',
    noDataToExport: 'Al momento non ci sono dati da esportare.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Dashboard globale del portafoglio',
    demoDescription: 'Per ora viene mostrata solo una parte dei dati demo. Importa il CSV completo per vedere il quadro intero.',
    recordsLoaded: '{{count}} operazioni caricate e analizzate',
    lastUpdated: 'Ultimo aggiornamento: {{value}}',
    switchToLight: 'Passa al tema chiaro',
    switchToDark: 'Passa al tema scuro',
    settingsRecords: 'Impostazioni e operazioni',
    updatePrices: 'Aggiorna quotazioni',
    apiKeyRequired: 'Serve una chiave API',
    updateWithCache: 'Aggiorna le quotazioni live con cache',
    setApiKeyFirst: 'Imposta prima la chiave API',
    forceRefresh: 'Aggiornamento forzato',
    forceRefreshTitle: 'Ignora la cache e consuma quota API reale',
    languageLabel: 'Cambia lingua',
    csvTitle: 'Guida ai campi CSV',
    csvIntro: 'Assicurati che il CSV contenga almeno queste intestazioni. L’ordine non conta:',
    csvRows: {
      date: 'Data (esempio: 2025/01/01)',
      type: 'Tipo (Acquisto / Vendita)',
      symbol: 'Simbolo (esempio: AAPL, NVDA)',
      market: 'Mercato (facoltativo, utile per inserimenti manuali)',
      quantity: 'Quantità',
      price: 'Prezzo unitario (valuta originale)',
      amount: 'Importo totale (valuta originale)',
      pnl: 'Profitto/Perdita (obbligatorio in vendita, valuta originale)'
    },
    csvNote1: '* Nota 1: I codici a 6 cifre che iniziano con 6 o 0 vengono riconosciuti automaticamente come azioni A cinesi (.SS / .SZ).',
    csvNote2: '* Nota 2: Per gli altri mercati aggiungi direttamente il suffisso al simbolo, ad esempio .TW o .HK.',
    forceRefreshConfirm: 'Vuoi forzare l’aggiornamento? La cache di 24 ore verrà ignorata e consumerai quota API reale.'
  },
  summary: {
    totalRealized: 'Profitto/perdita realizzato totale (convertito)',
    totalUnrealized: 'Profitto/perdita non realizzato totale (convertito)',
    totalValue: 'Valore attuale del portafoglio (convertito)',
    holdingCount: 'Posizioni aperte',
    holdingUnit: 'posizioni'
  },
  charts: {
    trendTitle: 'Trend del costo cumulato',
    saveImage: 'Salva grafico come immagine',
    noTrend: 'Non ci sono ancora abbastanza operazioni per disegnare il trend.',
    realizedTitle: 'Profitto/perdita realizzato per titolo (venduta troppo presto / uscita fatta bene)',
    distributionTitle: 'Distribuzione del valore in portafoglio (top 10)',
    convertedNote: 'Mostrato in {{currency}} dopo la conversione',
    noPnlData: 'Non ci sono ancora dati P/L.',
    noHoldings: 'Al momento non ci sono posizioni aperte.',
    legendConverted: '{{label}} (convertito)',
    costSeries: 'Costo cumulato',
    realizedSeries: 'Profitto/perdita realizzato cumulato',
    ifSoldSeries: 'Se vendessi oggi',
    actualSeries: 'Realizzato effettivo',
    others: 'Altro'
  },
  table: {
    title: 'Storico per titolo',
    subtitle: 'Apri una riga per rivedere acquisti e vendite. Gli importi restano nella valuta di quotazione.',
    columns: {
      symbol: 'Simbolo / nome (mercato · valuta)',
      holdingQty: 'Quantità attuale',
      currentValue: 'Ultimo prezzo / valore di mercato',
      unrealized: 'Profitto/perdita non realizzato',
      realized: 'Profitto/perdita realizzato',
      ifSoldToday: 'Se vendessi oggi',
      date: 'Data',
      type: 'Tipo',
      quantity: 'Quantità',
      price: 'Prezzo',
      amount: 'Importo',
      pnl: 'P/L',
      actions: 'Azioni'
    },
    manualBadge: 'Manuale',
    manualUpdatedAt: 'Aggiornamento manuale: {{value}}',
    apiUpdatedAt: 'Aggiornamento API: {{value}}',
    notUpdatedYet: 'Non ancora aggiornato',
    manualNamePlaceholder: 'Nome manuale',
    currentPricePlaceholder: 'Prezzo',
    hedgeSuccess: 'Uscire prima alla fine ha pagato ({{value}})',
    soldTooEarly: 'Hai mollato troppo presto e hai lasciato {{value}} sul tavolo',
    tradeDetails: 'Dettaglio eseguiti',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} azioni @ {{price}}',
    mobileHoldingQty: 'Posizione',
    mobileUnrealized: 'Non realizzato',
    mobileRealized: 'Realizzato'
  },
  manager: {
    title: 'Impostazioni e registro operazioni',
    clearAndLoadDemo: 'Pulisci e carica i dati demo',
    apiKeyTitle: 'Chiave API yfapi.net',
    getFreeApiKey: 'Ottienine una gratis',
    apiKeyPlaceholder: 'Incolla qui la tua x-api-key (esempio: A2sD8...)',
    saveApiKey: 'Salva chiave API',
    baseCurrencyTitle: 'Valuta base del riepilogo',
    baseCurrencyHelp: '* Tutte le attività in valuta estera vengono convertite in questa valuta base usando FX live, così le card di riepilogo in alto sommano tutto in modo pulito.',
    hideZeroHolding: 'Nascondi le posizioni già chiuse',
    manualRecordTitle: 'Aggiungi operazione manuale',
    fields: {
      date: 'Data',
      type: 'Tipo',
      market: 'Mercato',
      symbol: 'Simbolo',
      quantity: 'Quantità',
      price: 'Prezzo unitario',
      amount: 'Importo totale',
      pnl: 'Profitto/Perdita realizzato (solo vendita)'
    },
    placeholders: {
      symbol: 'Esempio: AAPL',
      quantity: 'Azioni',
      price: 'Prezzo per azione',
      amount: 'Nella valuta di quel mercato',
      pnl: 'Facoltativo'
    },
    saveChanges: 'Salva modifiche',
    addRecord: 'Aggiungi',
    noRecords: 'Non ci sono ancora operazioni.'
  },
  notice: {
    title: 'Benvenuto in Trade Lens',
    body: 'Trade Lens è uno strumento open source che trasforma i CSV del broker in trend del costo, viste P/L e grafici di allocazione.',
    privacy: 'Privacy prima di tutto: tutto resta solo nel browser (IndexedDB). Non viene inviato nulla ai nostri server.',
    apiKey: 'La chiave API serve solo per leggere i prezzi da yfapi.net e resta anch’essa locale.',
    sourceCode: 'Open source: guarda il codice e contribuisci',
    dismiss: 'Non mostrare più'
  },
  messages: {
    apiKeySaved: 'Chiave API salvata.',
    manualStockSaved: '{{symbol}} aggiornato manualmente.',
    needApiKey: 'Inserisci la chiave API di yfapi.net nel pannello impostazioni prima di aggiornare le quotazioni.',
    cacheFresh: 'Prezzi e cambi sono già stati aggiornati nelle ultime 24 ore, quindi l’app ha riusato la cache locale per risparmiare quota.',
    updateSuccess: 'Aggiornate {{count}} quotazioni e tassi FX.',
    fetchFailed: 'Recupero fallito: {{message}}',
    baseCurrencyChanged: 'Valuta base cambiata in {{currency}}. Aggiornamento dei cambi in corso...',
    recordUpdated: 'Operazione aggiornata.',
    dataCleared: 'Dati cancellati e demo ricaricata.',
    clearConfirm: 'Cancellare tutti i dati e ricaricare il set demo? Questa azione non si può annullare.',
    backupConfirm: 'Vuoi esportare i dati attuali come backup CSV prima di cancellare tutto?'
  },
  data: {
    unknownSymbol: 'Simbolo sconosciuto ({{symbol}})',
    unknown: 'Sconosciuto'
  }
};

const nlNL = {
  common: {
    language: 'Taal',
    close: 'Sluiten',
    cancel: 'Annuleren',
    save: 'Opslaan',
    edit: 'Bewerken',
    delete: 'Verwijderen',
    importCsv: 'CSV importeren',
    exportCsv: 'CSV exporteren'
  },
  currencies: {
    TWD: 'Nieuwe Taiwanese dollar (TWD)',
    CNY: 'Chinese yuan (CNY)',
    HKD: 'Hongkong-dollar (HKD)',
    USD: 'Amerikaanse dollar (USD)',
    JPY: 'Japanse yen (JPY)'
  },
  markets: {
    all: 'Alles',
    chinaA: 'Chinese A-aandelen',
    hongKong: 'Hongkong-aandelen',
    taiwan: 'Taiwan-aandelen',
    japan: 'Japanse aandelen',
    us: 'Amerikaanse aandelen',
    other: 'Overig',
    unknown: 'Onbekend'
  },
  tradeTypes: {
    buy: 'Koop',
    sell: 'Verkoop'
  },
  timeRanges: {
    oneWeek: '1w',
    oneMonth: '1m',
    threeMonths: '3m',
    halfYear: '6m',
    ytd: 'YTD',
    oneYear: '1j',
    fiveYears: '5j',
    all: 'Alles'
  },
  app: {
    loadingLocalData: 'Lokale IndexedDB-data laden...',
    generatingImage: 'Afbeelding genereren...',
    imageExportSuccess: 'Afbeelding succesvol geëxporteerd.',
    imageExportFail: 'Exporteren van afbeelding mislukt.',
    noDataToExport: 'Er is op dit moment geen data om te exporteren.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Wereldwijd portefeuille-dashboard',
    demoDescription: 'Op dit moment zie je alleen een afgeslankte demo-set. Importeer de volledige CSV voor het complete plaatje.',
    recordsLoaded: '{{count}} transacties geladen en geanalyseerd',
    lastUpdated: 'Laatst bijgewerkt: {{value}}',
    switchToLight: 'Naar lichte modus',
    switchToDark: 'Naar donkere modus',
    settingsRecords: 'Instellingen en transacties',
    updatePrices: 'Koersen verversen',
    apiKeyRequired: 'API-sleutel nodig',
    updateWithCache: 'Live-koersen verversen met cache',
    setApiKeyFirst: 'Stel eerst je API-sleutel in',
    forceRefresh: 'Hard verversen',
    forceRefreshTitle: 'Cache overslaan en echte API-quota gebruiken',
    languageLabel: 'Taal wijzigen',
    csvTitle: 'CSV-veldgids',
    csvIntro: 'Zorg dat je CSV minstens deze kolommen bevat. De volgorde maakt niet uit:',
    csvRows: {
      date: 'Datum (bijvoorbeeld: 2025/01/01)',
      type: 'Type (Koop / Verkoop)',
      symbol: 'Symbool (bijvoorbeeld: SHEL, AAPL)',
      market: 'Markt (optioneel, handig voor handmatige invoer)',
      quantity: 'Aantal',
      price: 'Prijs per stuk (oorspronkelijke valuta)',
      amount: 'Totaalbedrag (oorspronkelijke valuta)',
      pnl: 'Winst/Verlies (verplicht bij verkoop, oorspronkelijke valuta)'
    },
    csvNote1: '* Opmerking 1: Zescijferige codes die met 6 of 0 beginnen worden automatisch gezien als Chinese A-aandelen (.SS / .SZ).',
    csvNote2: '* Opmerking 2: Voeg voor andere markten het suffix direct aan het symbool toe, bijvoorbeeld .TW of .HK.',
    forceRefreshConfirm: 'Hard verversen? Daarmee negeer je de 24-uurscache en gebruik je echte API-quota.'
  },
  summary: {
    totalRealized: 'Totaal gerealiseerde winst/verlies (omgerekend)',
    totalUnrealized: 'Totaal ongerealiseerde winst/verlies (omgerekend)',
    totalValue: 'Huidige portefeuillevermogen (omgerekend)',
    holdingCount: 'Open posities',
    holdingUnit: 'posities'
  },
  charts: {
    trendTitle: 'Cumulatieve kostprijs',
    saveImage: 'Grafiek opslaan als afbeelding',
    noTrend: 'Er is nog niet genoeg historie om de trend te tekenen.',
    realizedTitle: 'Gerealiseerde W/V per aandeel (te vroeg verkocht / strakke exit)',
    distributionTitle: 'Verdeling van portefeuillewaarde (top 10)',
    convertedNote: 'Getoond in {{currency}} na omrekening',
    noPnlData: 'Nog geen W/V-data beschikbaar.',
    noHoldings: 'Er zijn nu geen open posities.',
    legendConverted: '{{label}} (omgerekend)',
    costSeries: 'Cumulatieve kostprijs',
    realizedSeries: 'Cumulatieve gerealiseerde W/V',
    ifSoldSeries: 'Als vandaag verkocht',
    actualSeries: 'Echt gerealiseerd',
    others: 'Overig'
  },
  table: {
    title: 'Transactiehistorie per aandeel',
    subtitle: 'Open een rij om koop- en verkooplots te bekijken. Bedragen blijven in de oorspronkelijke noteringsvaluta staan.',
    columns: {
      symbol: 'Symbool / naam (markt · valuta)',
      holdingQty: 'Huidig aantal',
      currentValue: 'Laatste prijs / marktwaarde',
      unrealized: 'Ongerealiseerde W/V',
      realized: 'Gerealiseerde W/V',
      ifSoldToday: 'Als vandaag verkocht',
      date: 'Datum',
      type: 'Type',
      quantity: 'Aantal',
      price: 'Prijs',
      amount: 'Bedrag',
      pnl: 'W/V',
      actions: 'Acties'
    },
    manualBadge: 'Handmatig',
    manualUpdatedAt: 'Handmatige override: {{value}}',
    apiUpdatedAt: 'API bijgewerkt: {{value}}',
    notUpdatedYet: 'Nog niet bijgewerkt',
    manualNamePlaceholder: 'Handmatige naam',
    currentPricePlaceholder: 'Prijs',
    hedgeSuccess: 'Eerder uitstappen pakte beter uit ({{value}})',
    soldTooEarly: 'Te vroeg verkocht en {{value}} laten liggen',
    tradeDetails: 'Uitvoeringsdetails',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} stuks @ {{price}}',
    mobileHoldingQty: 'Aantal',
    mobileUnrealized: 'Ongereal.',
    mobileRealized: 'Gereal.'
  },
  manager: {
    title: 'Instellingen en transactielog',
    clearAndLoadDemo: 'Wissen en demo laden',
    apiKeyTitle: 'yfapi.net API-sleutel',
    getFreeApiKey: 'Gratis aanvragen',
    apiKeyPlaceholder: 'Plak hier je x-api-key (bijvoorbeeld: A2sD8...)',
    saveApiKey: 'API-sleutel opslaan',
    baseCurrencyTitle: 'Basisvaluta voor samenvatting',
    baseCurrencyHelp: '* Alle buitenlandse posities worden via live FX omgerekend naar deze basisvaluta, zodat de samenvattingskaarten bovenaan alles netjes kunnen optellen.',
    hideZeroHolding: 'Volledig verkochte posities verbergen',
    manualRecordTitle: 'Transactie handmatig toevoegen',
    fields: {
      date: 'Datum',
      type: 'Type',
      market: 'Markt',
      symbol: 'Symbool',
      quantity: 'Aantal',
      price: 'Prijs per stuk',
      amount: 'Totaalbedrag',
      pnl: 'Gerealiseerde W/V (alleen verkoop)'
    },
    placeholders: {
      symbol: 'Bijvoorbeeld: SHEL',
      quantity: 'Aantal aandelen',
      price: 'Prijs per aandeel',
      amount: 'In de valuta van die markt',
      pnl: 'Optioneel'
    },
    saveChanges: 'Wijzigingen opslaan',
    addRecord: 'Toevoegen',
    noRecords: 'Nog geen transacties.'
  },
  notice: {
    title: 'Welkom bij Trade Lens',
    body: 'Trade Lens is een open-source tool die broker-CSV’s omzet in kostprijstrends, W/V-overzichten en allocatiegrafieken.',
    privacy: 'Privacy eerst: alles blijft alleen in je browser (IndexedDB). Er gaat niets via onze server.',
    apiKey: 'De API-sleutel wordt alleen gebruikt voor koersopvragingen via yfapi.net en blijft ook lokaal opgeslagen.',
    sourceCode: 'Open source: bekijk de code en draag bij',
    dismiss: 'Niet meer tonen'
  },
  messages: {
    apiKeySaved: 'API-sleutel opgeslagen.',
    manualStockSaved: '{{symbol}} handmatig bijgewerkt.',
    needApiKey: 'Vul eerst je yfapi.net API-sleutel in het instellingenpaneel in voordat je koersen ververst.',
    cacheFresh: 'Koersen en FX-rates zijn in de afgelopen 24 uur al bijgewerkt, dus de app heeft de lokale cache hergebruikt om quota te sparen.',
    updateSuccess: '{{count}} koersen en FX-rates bijgewerkt.',
    fetchFailed: 'Ophalen mislukt: {{message}}',
    baseCurrencyChanged: 'Basisvaluta gewijzigd naar {{currency}}. FX-rates worden bijgewerkt...',
    recordUpdated: 'Transactie bijgewerkt.',
    dataCleared: 'Data gewist en demo opnieuw geladen.',
    clearConfirm: 'Alle data wissen en de demo opnieuw laden? Dit kan niet ongedaan worden gemaakt.',
    backupConfirm: 'Wil je de huidige data als CSV-back-up exporteren voordat je wist?'
  },
  data: {
    unknownSymbol: 'Onbekend symbool ({{symbol}})',
    unknown: 'Onbekend'
  }
};

const ptBR = {
  common: {
    language: 'Idioma',
    close: 'Fechar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Excluir',
    importCsv: 'Importar CSV',
    exportCsv: 'Exportar CSV'
  },
  currencies: {
    TWD: 'Novo dólar taiwanês (TWD)',
    CNY: 'Yuan chinês (CNY)',
    HKD: 'Dólar de Hong Kong (HKD)',
    USD: 'Dólar americano (USD)',
    JPY: 'Iene japonês (JPY)'
  },
  markets: {
    all: 'Tudo',
    chinaA: 'Ações A da China',
    hongKong: 'Ações de Hong Kong',
    taiwan: 'Ações de Taiwan',
    japan: 'Ações do Japão',
    us: 'Ações dos EUA',
    other: 'Outros',
    unknown: 'Desconhecido'
  },
  tradeTypes: {
    buy: 'Compra',
    sell: 'Venda'
  },
  timeRanges: {
    oneWeek: '1 sem.',
    oneMonth: '1 mês',
    threeMonths: '3 meses',
    halfYear: '6 meses',
    ytd: 'YTD',
    oneYear: '1 ano',
    fiveYears: '5 anos',
    all: 'Tudo'
  },
  app: {
    loadingLocalData: 'Carregando dados locais do IndexedDB...',
    generatingImage: 'Gerando imagem...',
    imageExportSuccess: 'Imagem exportada com sucesso.',
    imageExportFail: 'Falha ao exportar a imagem.',
    noDataToExport: 'Não há dados para exportar agora.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Painel global da carteira',
    demoDescription: 'Agora só aparece uma parte dos dados de demonstração. Importe o CSV completo para ver a carteira inteira.',
    recordsLoaded: '{{count}} operações carregadas e analisadas',
    lastUpdated: 'Última atualização: {{value}}',
    switchToLight: 'Ir para o modo claro',
    switchToDark: 'Ir para o modo escuro',
    settingsRecords: 'Configurações e operações',
    updatePrices: 'Atualizar cotações',
    apiKeyRequired: 'Chave API necessária',
    updateWithCache: 'Atualizar cotações ao vivo com cache',
    setApiKeyFirst: 'Cadastre sua chave API primeiro',
    forceRefresh: 'Forçar atualização',
    forceRefreshTitle: 'Ignorar cache e consumir quota real da API',
    languageLabel: 'Mudar idioma',
    csvTitle: 'Guia de campos CSV',
    csvIntro: 'Garanta que seu CSV tenha pelo menos estes cabeçalhos. A ordem não importa:',
    csvRows: {
      date: 'Data (exemplo: 2025/01/01)',
      type: 'Tipo (Compra / Venda)',
      symbol: 'Símbolo (exemplo: AAPL, TSLA)',
      market: 'Mercado (opcional, útil para lançamentos manuais)',
      quantity: 'Quantidade',
      price: 'Preço unitário (moeda original)',
      amount: 'Valor total (moeda original)',
      pnl: 'Lucro/Prejuízo (obrigatório em vendas, moeda original)'
    },
    csvNote1: '* Nota 1: Códigos de 6 dígitos começando em 6 ou 0 são detectados automaticamente como ações A da China (.SS / .SZ).',
    csvNote2: '* Nota 2: Para outros mercados, adicione o sufixo direto no símbolo, por exemplo .TW ou .HK.',
    forceRefreshConfirm: 'Forçar atualização? Isso vai ignorar o cache de 24 horas e gastar quota real da API.'
  },
  summary: {
    totalRealized: 'Lucro/prejuízo realizado total (convertido)',
    totalUnrealized: 'Lucro/prejuízo não realizado total (convertido)',
    totalValue: 'Valor atual da carteira (convertido)',
    holdingCount: 'Posições em aberto',
    holdingUnit: 'posições'
  },
  charts: {
    trendTitle: 'Tendência do custo acumulado',
    saveImage: 'Salvar gráfico como imagem',
    noTrend: 'Ainda não há histórico suficiente para desenhar a tendência.',
    realizedTitle: 'Lucro/prejuízo realizado por ativo (vendeu cedo / saída no timing)',
    distributionTitle: 'Distribuição do valor da carteira (top 10)',
    convertedNote: 'Mostrado em {{currency}} após conversão',
    noPnlData: 'Ainda não há dados de P/L.',
    noHoldings: 'Não há posições abertas agora.',
    legendConverted: '{{label}} (convertido)',
    costSeries: 'Custo acumulado',
    realizedSeries: 'Lucro/prejuízo realizado acumulado',
    ifSoldSeries: 'Se vendesse hoje',
    actualSeries: 'Realizado de verdade',
    others: 'Outros'
  },
  table: {
    title: 'Histórico por ativo',
    subtitle: 'Abra uma linha para revisar compras e vendas. Os valores continuam na moeda original de listagem.',
    columns: {
      symbol: 'Símbolo / nome (mercado · moeda)',
      holdingQty: 'Quantidade atual',
      currentValue: 'Último preço / valor de mercado',
      unrealized: 'Lucro/prejuízo não realizado',
      realized: 'Lucro/prejuízo realizado',
      ifSoldToday: 'Se vendesse hoje',
      date: 'Data',
      type: 'Tipo',
      quantity: 'Quantidade',
      price: 'Preço',
      amount: 'Valor',
      pnl: 'P/L',
      actions: 'Ações'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Ajuste manual: {{value}}',
    apiUpdatedAt: 'Atualização da API: {{value}}',
    notUpdatedYet: 'Ainda não atualizado',
    manualNamePlaceholder: 'Nome manual',
    currentPricePlaceholder: 'Preço',
    hedgeSuccess: 'Sair antes acabou sendo melhor ({{value}})',
    soldTooEarly: 'Vendeu cedo demais e deixou {{value}} na mesa',
    tradeDetails: 'Detalhes das execuções',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} ações @ {{price}}',
    mobileHoldingQty: 'Posição',
    mobileUnrealized: 'Não realiz.',
    mobileRealized: 'Realiz.'
  },
  manager: {
    title: 'Configurações e histórico',
    clearAndLoadDemo: 'Limpar e carregar dados demo',
    apiKeyTitle: 'Chave API do yfapi.net',
    getFreeApiKey: 'Pegue uma grátis',
    apiKeyPlaceholder: 'Cole sua x-api-key aqui (exemplo: A2sD8...)',
    saveApiKey: 'Salvar chave API',
    baseCurrencyTitle: 'Moeda-base do resumo',
    baseCurrencyHelp: '* Todos os ativos em moeda estrangeira são convertidos para essa moeda-base via FX ao vivo, para que os cards do resumo lá em cima somem tudo direito.',
    hideZeroHolding: 'Ocultar posições já zeradas',
    manualRecordTitle: 'Adicionar operação manual',
    fields: {
      date: 'Data',
      type: 'Tipo',
      market: 'Mercado',
      symbol: 'Símbolo',
      quantity: 'Quantidade',
      price: 'Preço unitário',
      amount: 'Valor total',
      pnl: 'Lucro/Prejuízo realizado (só venda)'
    },
    placeholders: {
      symbol: 'Ex.: AAPL',
      quantity: 'Quantidade de ações',
      price: 'Preço por ação',
      amount: 'Na moeda daquele mercado',
      pnl: 'Opcional'
    },
    saveChanges: 'Salvar alterações',
    addRecord: 'Adicionar',
    noRecords: 'Ainda não há operações.'
  },
  notice: {
    title: 'Bem-vindo ao Trade Lens',
    body: 'Trade Lens é uma ferramenta de código aberto para transformar CSVs da corretora em tendências de custo, visões de P/L e gráficos de alocação.',
    privacy: 'Privacidade em primeiro lugar: tudo fica só no seu navegador (IndexedDB). Nada é enviado ao nosso servidor.',
    apiKey: 'A chave API só é usada para consultar preços no yfapi.net e também fica salva localmente.',
    sourceCode: 'Código aberto: veja o código e contribua',
    dismiss: 'Não mostrar novamente'
  },
  messages: {
    apiKeySaved: 'Chave API salva.',
    manualStockSaved: '{{symbol}} atualizado manualmente.',
    needApiKey: 'Informe sua chave API do yfapi.net no painel de configurações antes de atualizar as cotações.',
    cacheFresh: 'Preços e câmbio já foram atualizados nas últimas 24 horas, então o app reutilizou o cache local para economizar quota.',
    updateSuccess: '{{count}} cotações e taxas FX atualizadas.',
    fetchFailed: 'Falha na consulta: {{message}}',
    baseCurrencyChanged: 'Moeda-base alterada para {{currency}}. Atualizando o câmbio...',
    recordUpdated: 'Operação atualizada.',
    dataCleared: 'Dados apagados e demo recarregada.',
    clearConfirm: 'Apagar todos os dados e recarregar o conjunto demo? Isso não pode ser desfeito.',
    backupConfirm: 'Quer exportar os dados atuais como backup CSV antes de apagar tudo?'
  },
  data: {
    unknownSymbol: 'Símbolo desconhecido ({{symbol}})',
    unknown: 'Desconhecido'
  }
};

const ptPT = {
  ...ptBR,
  common: {
    ...ptBR.common,
    delete: 'Eliminar'
  },
  header: {
    ...ptBR.header,
    demoDescription: 'Neste momento está a ser mostrada apenas uma parte dos dados de demonstração. Importe o CSV completo para ver a carteira toda.',
    csvRows: {
      ...ptBR.header.csvRows,
      symbol: 'Símbolo (exemplo: SHEL, AAPL)'
    }
  },
  charts: {
    ...ptBR.charts,
    realizedTitle: 'Lucro/prejuízo realizado por título (vendeu cedo demais / saída bem afinada)'
  },
  table: {
    ...ptBR.table,
    subtitle: 'Abra uma linha para rever compras e vendas. Os valores mantêm-se na moeda original de cotação.',
    hedgeSuccess: 'Sair mais cedo acabou por correr melhor ({{value}})',
    soldTooEarly: 'Vendeu cedo demais e deixou {{value}} em cima da mesa'
  },
  manager: {
    ...ptBR.manager,
    title: 'Definições e registo de operações',
    clearAndLoadDemo: 'Limpar e carregar dados de demonstração',
    getFreeApiKey: 'Obter gratuitamente',
    placeholders: {
      ...ptBR.manager.placeholders,
      symbol: 'Ex.: SHEL'
    }
  },
  notice: {
    ...ptBR.notice,
    body: 'Trade Lens é uma ferramenta de código aberto para investidores que transforma CSVs da corretora em tendências de custo, vistas de P/L e gráficos de alocação.'
  },
  messages: {
    ...ptBR.messages,
    apiKeySaved: 'Chave API guardada.',
    needApiKey: 'Introduza a sua chave API do yfapi.net no painel de definições antes de atualizar as cotações.',
    updateSuccess: '{{count}} cotações e taxas FX atualizadas.'
  }
};

const msMY = {
  common: {
    language: 'Bahasa',
    close: 'Tutup',
    cancel: 'Batal',
    save: 'Simpan',
    edit: 'Edit',
    delete: 'Padam',
    importCsv: 'Import CSV',
    exportCsv: 'Eksport CSV'
  },
  currencies: {
    TWD: 'Dolar Taiwan Baru (TWD)',
    CNY: 'Yuan China (CNY)',
    HKD: 'Dolar Hong Kong (HKD)',
    USD: 'Dolar AS (USD)',
    JPY: 'Yen Jepun (JPY)'
  },
  markets: {
    all: 'Semua',
    chinaA: 'Saham A China',
    hongKong: 'Saham Hong Kong',
    taiwan: 'Saham Taiwan',
    japan: 'Saham Jepun',
    us: 'Saham AS',
    other: 'Lain-lain',
    unknown: 'Tidak diketahui'
  },
  tradeTypes: {
    buy: 'Beli',
    sell: 'Jual'
  },
  timeRanges: {
    oneWeek: '1 minggu',
    oneMonth: '1 bulan',
    threeMonths: '3 bulan',
    halfYear: '6 bulan',
    ytd: 'YTD',
    oneYear: '1 tahun',
    fiveYears: '5 tahun',
    all: 'Semua'
  },
  app: {
    loadingLocalData: 'Sedang memuatkan data IndexedDB tempatan...',
    generatingImage: 'Sedang jana imej...',
    imageExportSuccess: 'Eksport imej berjaya.',
    imageExportFail: 'Eksport imej gagal.',
    noDataToExport: 'Tiada data untuk dieksport buat masa ini.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Papan pemuka portfolio saham global',
    demoDescription: 'Sekarang cuma dipaparkan sebahagian data contoh. Import CSV penuh untuk nampak keseluruhan portfolio.',
    recordsLoaded: 'Berjaya memuatkan dan menganalisis {{count}} rekod dagangan',
    lastUpdated: 'Kemas kini terakhir: {{value}}',
    switchToLight: 'Tukar ke mod cerah',
    switchToDark: 'Tukar ke mod gelap',
    settingsRecords: 'Tetapan & dagangan',
    updatePrices: 'Kemas kini harga',
    apiKeyRequired: 'Perlu tetapkan API Key dulu',
    updateWithCache: 'Kemas kini harga masa nyata (guna cache)',
    setApiKeyFirst: 'Sila tetapkan API Key dahulu',
    forceRefresh: 'Muat semula paksa',
    forceRefreshTitle: 'Abaikan cache dan guna kuota API sebenar',
    languageLabel: 'Tukar bahasa',
    csvTitle: 'Panduan lajur CSV',
    csvIntro: 'Pastikan CSV anda sekurang-kurangnya mengandungi tajuk lajur berikut. Susunan tidak penting:',
    csvRows: {
      date: 'Tarikh (contoh: 2025/01/01)',
      type: 'Jenis (Beli / Jual)',
      symbol: 'Simbol (contoh: 0700.HK, AAPL)',
      market: 'Pasaran (pilihan, berguna bila tambah rekod secara manual)',
      quantity: 'Kuantiti',
      price: 'Harga seunit (mata wang asal)',
      amount: 'Jumlah nilai (mata wang asal)',
      pnl: 'Untung/Rugi (wajib untuk jual, mata wang asal)'
    },
    csvNote1: '* Nota 1: Kod 6 digit yang bermula dengan 6 atau 0 akan dikenal pasti secara automatik sebagai saham A China (.SS / .SZ).',
    csvNote2: '* Nota 2: Untuk pasaran lain, tambahkan suffix terus pada simbol seperti .TW atau .HK.',
    forceRefreshConfirm: 'Betul mahu buat muat semula paksa? Cache 24 jam akan diabaikan dan kuota API sebenar akan digunakan.'
  },
  summary: {
    totalRealized: 'Jumlah untung/rugi direalisasi (ditukar)',
    totalUnrealized: 'Jumlah untung/rugi belum direalisasi (ditukar)',
    totalValue: 'Nilai pasaran semasa (ditukar)',
    holdingCount: 'Bilangan pegangan',
    holdingUnit: 'kaunter'
  },
  charts: {
    trendTitle: 'Trend kos terkumpul',
    saveImage: 'Simpan carta sebagai imej',
    noTrend: 'Rekod dagangan masih belum cukup untuk melukis trend.',
    realizedTitle: 'Untung/rugi direalisasi ikut saham (jual awal / keluar cantik)',
    distributionTitle: 'Agihan nilai portfolio (10 teratas)',
    convertedNote: 'Dipaparkan selepas ditukar ke {{currency}}',
    noPnlData: 'Belum ada data untung/rugi buat masa ini.',
    noHoldings: 'Tiada pegangan semasa.',
    legendConverted: '{{label}} (selepas tukaran)',
    costSeries: 'Kos terkumpul',
    realizedSeries: 'Untung/rugi direalisasi terkumpul',
    ifSoldSeries: 'Kalau jual hari ini',
    actualSeries: 'Untung/rugi sebenar',
    others: 'Lain-lain'
  },
  table: {
    title: 'Rekod dagangan mengikut saham',
    subtitle: 'Klik pada baris untuk lihat butiran beli dan jual. Semua amaun kekal dipaparkan dalam mata wang asal pasaran tersebut.',
    columns: {
      symbol: 'Simbol / nama saham (pasaran · mata wang)',
      holdingQty: 'Kuantiti semasa',
      currentValue: 'Harga semasa / nilai pasaran',
      unrealized: 'Untung/rugi belum direalisasi',
      realized: 'Untung/rugi direalisasi',
      ifSoldToday: 'Kalau jual hari ini',
      date: 'Tarikh',
      type: 'Jenis',
      quantity: 'Kuantiti',
      price: 'Harga',
      amount: 'Jumlah',
      pnl: 'Untung/Rugi',
      actions: 'Tindakan'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Dikemas kini manual: {{value}}',
    apiUpdatedAt: 'Kemas kini API terakhir: {{value}}',
    notUpdatedYet: 'Belum dikemas kini',
    manualNamePlaceholder: 'Nama saham manual',
    currentPricePlaceholder: 'Harga semasa',
    hedgeSuccess: 'Keluar awal rupa-rupanya lebih berbaloi ({{value}})',
    soldTooEarly: 'Jual terlalu awal, terlepas {{value}}',
    tradeDetails: 'Butiran dagangan',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} unit @ {{price}}',
    mobileHoldingQty: 'Pegangan',
    mobileUnrealized: 'Belum realisasi',
    mobileRealized: 'Direalisasi'
  },
  manager: {
    title: 'Tetapan & rekod dagangan',
    clearAndLoadDemo: 'Kosongkan dan muatkan data contoh',
    apiKeyTitle: 'Tetapan API Key yfapi.net',
    getFreeApiKey: 'Daftar percuma untuk dapatkan key',
    apiKeyPlaceholder: 'Tampal x-api-key anda di sini (contoh: A2sD8...)',
    saveApiKey: 'Simpan key',
    baseCurrencyTitle: 'Mata wang asas kad ringkasan',
    baseCurrencyHelp: '* Semua aset mata wang asing akan ditukar ke mata wang ini menggunakan kadar tukaran terkini supaya boleh dijumlahkan dalam kad ringkasan di atas.',
    hideZeroHolding: 'Sembunyikan rekod yang sudah tiada pegangan',
    manualRecordTitle: 'Tambah rekod secara manual',
    fields: {
      date: 'Tarikh',
      type: 'Jenis',
      market: 'Pasaran',
      symbol: 'Simbol',
      quantity: 'Kuantiti',
      price: 'Harga seunit',
      amount: 'Jumlah nilai',
      pnl: 'Untung/Rugi (untuk jual sahaja)'
    },
    placeholders: {
      symbol: 'Contoh: 0700.HK',
      quantity: 'Bilangan unit',
      price: 'Harga seunit',
      amount: 'Ikut mata wang pasaran itu',
      pnl: 'Pilihan'
    },
    saveChanges: 'Simpan perubahan',
    addRecord: 'Tambah',
    noRecords: 'Belum ada sebarang rekod.'
  },
  notice: {
    title: 'Selamat datang ke Trade Lens',
    body: 'Ini ialah alat sumber terbuka untuk pelabur yang menukar CSV broker menjadi carta kos, agihan untung/rugi, dan gambaran portfolio yang lebih mudah dibaca.',
    privacy: 'Privasi diutamakan: semua data hanya disimpan dalam pelayar anda (IndexedDB) dan tidak dihantar ke pelayan.',
    apiKey: 'API Key hanya digunakan untuk ambil harga daripada yfapi.net dan turut disimpan secara setempat.',
    sourceCode: 'Sumber terbuka: lihat kod dan sama-sama menyumbang',
    dismiss: 'Jangan tunjuk lagi'
  },
  messages: {
    apiKeySaved: 'API Key berjaya disimpan.',
    manualStockSaved: 'Maklumat {{symbol}} telah dikemas kini secara manual.',
    needApiKey: 'Masukkan API Key yfapi.net dalam panel tetapan dahulu sebelum kemas kini harga.',
    cacheFresh: 'Harga saham dan kadar tukaran sudah dikemas kini dalam 24 jam terakhir, jadi cache tempatan digunakan untuk jimatkan kuota.',
    updateSuccess: 'Berjaya mengemas kini harga saham dan kadar tukaran untuk {{count}} item.',
    fetchFailed: 'Gagal mendapatkan data: {{message}}',
    baseCurrencyChanged: 'Mata wang asas telah ditukar kepada {{currency}}. Sedang kemas kini kadar tukaran...',
    recordUpdated: 'Rekod dagangan berjaya dikemas kini.',
    dataCleared: 'Data telah dikosongkan dan rekod contoh dimuatkan semula.',
    clearConfirm: 'Betul mahu padam semua data dan muatkan semula data contoh? Tindakan ini tidak boleh dipulihkan.',
    backupConfirm: 'Sebelum padam, mahu eksport data semasa sebagai sandaran CSV dahulu?'
  },
  data: {
    unknownSymbol: 'Simbol tidak dikenali ({{symbol}})',
    unknown: 'Tidak diketahui'
  }
};

const viVN = {
  common: {
    language: 'Ngôn ngữ',
    close: 'Đóng',
    cancel: 'Hủy',
    save: 'Lưu',
    edit: 'Sửa',
    delete: 'Xóa',
    importCsv: 'Nhập CSV',
    exportCsv: 'Xuất CSV'
  },
  currencies: {
    TWD: 'Đài tệ (TWD)',
    CNY: 'Nhân dân tệ (CNY)',
    HKD: 'Đô la Hồng Kông (HKD)',
    USD: 'Đô la Mỹ (USD)',
    JPY: 'Yên Nhật (JPY)'
  },
  markets: {
    all: 'Tất cả',
    chinaA: 'Cổ phiếu A Trung Quốc',
    hongKong: 'Cổ phiếu Hồng Kông',
    taiwan: 'Cổ phiếu Đài Loan',
    japan: 'Cổ phiếu Nhật',
    us: 'Cổ phiếu Mỹ',
    other: 'Khác',
    unknown: 'Không rõ'
  },
  tradeTypes: {
    buy: 'Mua',
    sell: 'Bán'
  },
  timeRanges: {
    oneWeek: '1 tuần',
    oneMonth: '1 tháng',
    threeMonths: '3 tháng',
    halfYear: '6 tháng',
    ytd: 'YTD',
    oneYear: '1 năm',
    fiveYears: '5 năm',
    all: 'Tất cả'
  },
  app: {
    loadingLocalData: 'Đang tải dữ liệu IndexedDB cục bộ...',
    generatingImage: 'Đang tạo hình ảnh...',
    imageExportSuccess: 'Xuất hình ảnh thành công.',
    imageExportFail: 'Xuất hình ảnh thất bại.',
    noDataToExport: 'Hiện chưa có dữ liệu để xuất.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Bảng điều khiển danh mục đầu tư toàn cầu',
    demoDescription: 'Hiện chỉ hiển thị một phần dữ liệu mẫu. Nhập CSV đầy đủ để thấy toàn bộ bức tranh danh mục.',
    recordsLoaded: 'Đã tải và phân tích {{count}} giao dịch',
    lastUpdated: 'Cập nhật gần nhất: {{value}}',
    switchToLight: 'Chuyển sang giao diện sáng',
    switchToDark: 'Chuyển sang giao diện tối',
    settingsRecords: 'Cài đặt & giao dịch',
    updatePrices: 'Cập nhật giá',
    apiKeyRequired: 'Cần đặt API Key trước',
    updateWithCache: 'Cập nhật giá thời gian thực (dùng cache)',
    setApiKeyFirst: 'Vui lòng đặt API Key trước',
    forceRefresh: 'Làm mới cưỡng bức',
    forceRefreshTitle: 'Bỏ qua cache và dùng quota API thật',
    languageLabel: 'Đổi ngôn ngữ',
    csvTitle: 'Hướng dẫn cột CSV',
    csvIntro: 'CSV của bạn nên có tối thiểu các tiêu đề cột sau, không cần đúng thứ tự:',
    csvRows: {
      date: 'Ngày (ví dụ: 2025/01/01)',
      type: 'Loại (Mua / Bán)',
      symbol: 'Mã chứng khoán (ví dụ: AAPL, NVDA)',
      market: 'Thị trường (không bắt buộc, hữu ích khi thêm tay)',
      quantity: 'Khối lượng',
      price: 'Giá đơn vị (theo nguyên tệ)',
      amount: 'Tổng giá trị (theo nguyên tệ)',
      pnl: 'Lãi/Lỗ (bắt buộc khi bán, theo nguyên tệ)'
    },
    csvNote1: '* Lưu ý 1: Mã 6 chữ số bắt đầu bằng 6 hoặc 0 sẽ được nhận diện tự động là cổ phiếu A Trung Quốc (.SS / .SZ).',
    csvNote2: '* Lưu ý 2: Với thị trường khác, hãy thêm suffix trực tiếp vào mã như .TW hoặc .HK.',
    forceRefreshConfirm: 'Bạn chắc muốn làm mới cưỡng bức? Cache 24 giờ sẽ bị bỏ qua và quota API thật sẽ bị tiêu hao.'
  },
  summary: {
    totalRealized: 'Tổng lãi/lỗ đã chốt (quy đổi)',
    totalUnrealized: 'Tổng lãi/lỗ tạm tính (quy đổi)',
    totalValue: 'Giá trị thị trường hiện tại (quy đổi)',
    holdingCount: 'Số mã đang nắm giữ',
    holdingUnit: 'mã'
  },
  charts: {
    trendTitle: 'Xu hướng vốn tích lũy',
    saveImage: 'Lưu biểu đồ thành ảnh',
    noTrend: 'Dữ liệu giao dịch hiện chưa đủ để vẽ xu hướng.',
    realizedTitle: 'Lãi/lỗ đã chốt theo mã (bán non / thoát đẹp)',
    distributionTitle: 'Phân bổ giá trị danh mục (top 10)',
    convertedNote: 'Hiển thị sau khi quy đổi sang {{currency}}',
    noPnlData: 'Hiện chưa có dữ liệu lãi/lỗ.',
    noHoldings: 'Hiện chưa có vị thế nắm giữ.',
    legendConverted: '{{label}} (sau quy đổi)',
    costSeries: 'Vốn tích lũy',
    realizedSeries: 'Lãi/lỗ đã chốt tích lũy',
    ifSoldSeries: 'Nếu bán hôm nay',
    actualSeries: 'Lãi/lỗ thực tế',
    others: 'Khác'
  },
  table: {
    title: 'Lịch sử giao dịch theo mã',
    subtitle: 'Bấm vào từng dòng để xem chi tiết mua và bán; mọi giá trị vẫn hiển thị theo nguyên tệ của thị trường đó.',
    columns: {
      symbol: 'Mã / tên cổ phiếu (thị trường · tiền tệ)',
      holdingQty: 'Khối lượng đang giữ',
      currentValue: 'Giá hiện tại / giá trị thị trường',
      unrealized: 'Lãi/lỗ tạm tính',
      realized: 'Lãi/lỗ đã chốt',
      ifSoldToday: 'Nếu bán hôm nay',
      date: 'Ngày',
      type: 'Loại',
      quantity: 'Khối lượng',
      price: 'Giá',
      amount: 'Giá trị',
      pnl: 'Lãi/Lỗ',
      actions: 'Thao tác'
    },
    manualBadge: 'Nhập tay',
    manualUpdatedAt: 'Cập nhật tay lúc: {{value}}',
    apiUpdatedAt: 'API cập nhật gần nhất: {{value}}',
    notUpdatedYet: 'Chưa cập nhật',
    manualNamePlaceholder: 'Tên mã nhập tay',
    currentPricePlaceholder: 'Giá hiện tại',
    hedgeSuccess: 'Thoát sớm lại ngon hơn ({{value}})',
    soldTooEarly: 'Bán non mất {{value}}',
    tradeDetails: 'Chi tiết giao dịch',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} cổ phiếu @ {{price}}',
    mobileHoldingQty: 'Đang giữ',
    mobileUnrealized: 'Tạm tính',
    mobileRealized: 'Đã chốt'
  },
  manager: {
    title: 'Cài đặt & lịch sử giao dịch',
    clearAndLoadDemo: 'Xóa và nạp dữ liệu mẫu',
    apiKeyTitle: 'Thiết lập API Key của yfapi.net',
    getFreeApiKey: 'Đăng ký miễn phí để lấy key',
    apiKeyPlaceholder: 'Dán x-api-key của bạn vào đây (ví dụ: A2sD8...)',
    saveApiKey: 'Lưu key',
    baseCurrencyTitle: 'Đồng tiền gốc của thẻ tổng quan',
    baseCurrencyHelp: '* Tất cả tài sản ngoại tệ sẽ được quy đổi sang đồng tiền này bằng tỷ giá mới nhất để cộng dồn trong các thẻ tổng quan phía trên.',
    hideZeroHolding: 'Ẩn các mã đã bán hết',
    manualRecordTitle: 'Thêm giao dịch thủ công',
    fields: {
      date: 'Ngày',
      type: 'Loại',
      market: 'Thị trường',
      symbol: 'Mã',
      quantity: 'Khối lượng',
      price: 'Giá đơn vị',
      amount: 'Tổng giá trị',
      pnl: 'Lãi/Lỗ (chỉ khi bán)'
    },
    placeholders: {
      symbol: 'Ví dụ: AAPL',
      quantity: 'Số lượng cổ phiếu',
      price: 'Giá mỗi cổ phiếu',
      amount: 'Theo tiền tệ của thị trường đó',
      pnl: 'Tùy chọn'
    },
    saveChanges: 'Lưu thay đổi',
    addRecord: 'Thêm',
    noRecords: 'Hiện chưa có giao dịch nào.'
  },
  notice: {
    title: 'Chào mừng đến với Trade Lens',
    body: 'Đây là công cụ mã nguồn mở dành cho nhà đầu tư, biến CSV từ broker thành biểu đồ vốn, phân bổ lãi/lỗ và bức tranh danh mục dễ đọc hơn.',
    privacy: 'Ưu tiên quyền riêng tư: mọi dữ liệu chỉ nằm trong trình duyệt của bạn (IndexedDB) và không được gửi lên máy chủ.',
    apiKey: 'API Key chỉ dùng để lấy giá từ yfapi.net và cũng chỉ được lưu cục bộ.',
    sourceCode: 'Mã nguồn mở: xem code và tham gia đóng góp',
    dismiss: 'Đừng hiện lại'
  },
  messages: {
    apiKeySaved: 'Đã lưu API Key.',
    manualStockSaved: 'Đã cập nhật thủ công thông tin của {{symbol}}.',
    needApiKey: 'Hãy nhập API Key của yfapi.net trong bảng cài đặt trước khi cập nhật giá.',
    cacheFresh: 'Giá cổ phiếu và tỷ giá đã được cập nhật trong vòng 24 giờ qua, nên hệ thống dùng cache cục bộ để tiết kiệm quota.',
    updateSuccess: 'Đã cập nhật giá cổ phiếu và tỷ giá cho {{count}} mục.',
    fetchFailed: 'Lấy dữ liệu thất bại: {{message}}',
    baseCurrencyChanged: 'Đã đổi đồng tiền gốc sang {{currency}}. Đang cập nhật tỷ giá...',
    recordUpdated: 'Đã cập nhật lịch sử giao dịch.',
    dataCleared: 'Đã xóa dữ liệu và nạp lại dữ liệu mẫu.',
    clearConfirm: 'Bạn chắc muốn xóa toàn bộ dữ liệu và nạp lại dữ liệu mẫu? Thao tác này không thể hoàn tác.',
    backupConfirm: 'Trước khi xóa, bạn có muốn xuất dữ liệu hiện tại thành CSV để sao lưu không?'
  },
  data: {
    unknownSymbol: 'Mã không xác định ({{symbol}})',
    unknown: 'Không rõ'
  }
};

const thTH = {
  common: {
    language: 'ภาษา',
    close: 'ปิด',
    cancel: 'ยกเลิก',
    save: 'บันทึก',
    edit: 'แก้ไข',
    delete: 'ลบ',
    importCsv: 'นำเข้า CSV',
    exportCsv: 'ส่งออก CSV'
  },
  currencies: {
    TWD: 'ดอลลาร์ไต้หวันใหม่ (TWD)',
    CNY: 'หยวนจีน (CNY)',
    HKD: 'ดอลลาร์ฮ่องกง (HKD)',
    USD: 'ดอลลาร์สหรัฐ (USD)',
    JPY: 'เยนญี่ปุ่น (JPY)'
  },
  markets: {
    all: 'ทั้งหมด',
    chinaA: 'หุ้นจีน A',
    hongKong: 'หุ้นฮ่องกง',
    taiwan: 'หุ้นไต้หวัน',
    japan: 'หุ้นญี่ปุ่น',
    us: 'หุ้นสหรัฐ',
    other: 'อื่น ๆ',
    unknown: 'ไม่ทราบ'
  },
  tradeTypes: {
    buy: 'ซื้อ',
    sell: 'ขาย'
  },
  timeRanges: {
    oneWeek: '1 สัปดาห์',
    oneMonth: '1 เดือน',
    threeMonths: '3 เดือน',
    halfYear: '6 เดือน',
    ytd: 'YTD',
    oneYear: '1 ปี',
    fiveYears: '5 ปี',
    all: 'ทั้งหมด'
  },
  app: {
    loadingLocalData: 'กำลังโหลดข้อมูล IndexedDB ในเครื่อง...',
    generatingImage: 'กำลังสร้างรูปภาพ...',
    imageExportSuccess: 'ส่งออกรูปภาพสำเร็จ',
    imageExportFail: 'ส่งออกรูปภาพไม่สำเร็จ',
    noDataToExport: 'ตอนนี้ยังไม่มีข้อมูลให้ส่งออก',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'แดชบอร์ดติดตามพอร์ตหุ้นทั่วโลก',
    demoDescription: 'ตอนนี้แสดงเพียงข้อมูลตัวอย่างบางส่วน นำเข้า CSV ฉบับเต็มแล้วจะเห็นภาพพอร์ตครบกว่า',
    recordsLoaded: 'โหลดและวิเคราะห์รายการซื้อขายแล้ว {{count}} รายการ',
    lastUpdated: 'อัปเดตล่าสุด: {{value}}',
    switchToLight: 'สลับเป็นโหมดสว่าง',
    switchToDark: 'สลับเป็นโหมดมืด',
    settingsRecords: 'ตั้งค่าและประวัติซื้อขาย',
    updatePrices: 'อัปเดตราคา',
    apiKeyRequired: 'ต้องตั้งค่า API Key ก่อน',
    updateWithCache: 'อัปเดตราคาแบบเรียลไทม์ (ใช้แคช)',
    setApiKeyFirst: 'กรุณาตั้งค่า API Key ก่อน',
    forceRefresh: 'รีเฟรชแบบบังคับ',
    forceRefreshTitle: 'ข้ามแคชและใช้โควตา API จริง',
    languageLabel: 'เปลี่ยนภาษา',
    csvTitle: 'คู่มือหัวคอลัมน์ CSV',
    csvIntro: 'CSV ควรมีหัวคอลัมน์อย่างน้อยดังต่อไปนี้ โดยไม่จำเป็นต้องเรียงลำดับ:',
    csvRows: {
      date: 'วันที่ (เช่น 2025/01/01)',
      type: 'ประเภท (ซื้อ / ขาย)',
      symbol: 'สัญลักษณ์ (เช่น AAPL, TSLA)',
      market: 'ตลาด (ไม่บังคับ ใช้เป็นข้อมูลอ้างอิงเวลาเพิ่มเอง)',
      quantity: 'จำนวน',
      price: 'ราคาต่อหน่วย (สกุลเงินเดิม)',
      amount: 'มูลค่ารวม (สกุลเงินเดิม)',
      pnl: 'กำไร/ขาดทุน (กรอกตอนขาย, สกุลเงินเดิม)'
    },
    csvNote1: '* หมายเหตุ 1: รหัส 6 หลักที่ขึ้นต้นด้วย 6 หรือ 0 จะถูกมองเป็นหุ้นจีน A (.SS / .SZ) อัตโนมัติ',
    csvNote2: '* หมายเหตุ 2: ตลาดอื่น ๆ ให้เติม suffix ต่อท้ายสัญลักษณ์โดยตรง เช่น .TW หรือ .HK',
    forceRefreshConfirm: 'แน่ใจไหมว่าจะรีเฟรชแบบบังคับ? ระบบจะไม่ใช้แคช 24 ชั่วโมงและจะใช้โควตา API จริง'
  },
  summary: {
    totalRealized: 'กำไร/ขาดทุนที่ปิดแล้วรวม (หลังแปลงสกุล)',
    totalUnrealized: 'กำไร/ขาดทุนคงค้างรวม (หลังแปลงสกุล)',
    totalValue: 'มูลค่าตลาดปัจจุบัน (หลังแปลงสกุล)',
    holdingCount: 'จำนวนหุ้นที่ยังถือ',
    holdingUnit: 'ตัว'
  },
  charts: {
    trendTitle: 'แนวโน้มต้นทุนสะสม',
    saveImage: 'บันทึกกราฟเป็นรูปภาพ',
    noTrend: 'ตอนนี้รายการซื้อขายยังไม่พอสำหรับวาดกราฟ',
    realizedTitle: 'กำไร/ขาดทุนที่ปิดแล้วรายตัว (ขายหมู / ลงจากดอยทัน)',
    distributionTitle: 'สัดส่วนมูลค่าพอร์ต (10 อันดับแรก)',
    convertedNote: 'แปลงเป็น {{currency}} เพื่อแสดงผล',
    noPnlData: 'ตอนนี้ยังไม่มีข้อมูลกำไร/ขาดทุน',
    noHoldings: 'ตอนนี้ยังไม่มีหุ้นคงค้าง',
    legendConverted: '{{label}} (หลังแปลงสกุล)',
    costSeries: 'ต้นทุนสะสม',
    realizedSeries: 'กำไร/ขาดทุนที่ปิดแล้วสะสม',
    ifSoldSeries: 'ถ้าขายวันนี้',
    actualSeries: 'กำไร/ขาดทุนที่เกิดขึ้นจริง',
    others: 'อื่น ๆ'
  },
  table: {
    title: 'ประวัติซื้อขายรายหุ้น',
    subtitle: 'กดดูแต่ละแถวเพื่อเปิดรายละเอียดไม้ซื้อและขาย โดยมูลค่าจะยังแสดงในสกุลเงินเดิมของตลาดนั้น',
    columns: {
      symbol: 'สัญลักษณ์ / ชื่อหุ้น (ตลาด · สกุลเงิน)',
      holdingQty: 'จำนวนคงเหลือ',
      currentValue: 'ราคาล่าสุด / มูลค่า',
      unrealized: 'กำไร/ขาดทุนคงค้าง',
      realized: 'กำไร/ขาดทุนที่ปิดแล้ว',
      ifSoldToday: 'ถ้าขายวันนี้',
      date: 'วันที่',
      type: 'ประเภท',
      quantity: 'จำนวน',
      price: 'ราคา',
      amount: 'มูลค่า',
      pnl: 'กำไร/ขาดทุน',
      actions: 'จัดการ'
    },
    manualBadge: 'กรอกเอง',
    manualUpdatedAt: 'แก้เองเมื่อ: {{value}}',
    apiUpdatedAt: 'อัปเดตจาก API ล่าสุด: {{value}}',
    notUpdatedYet: 'ยังไม่ได้อัปเดต',
    manualNamePlaceholder: 'ชื่อหุ้นที่กรอกเอง',
    currentPricePlaceholder: 'ราคาล่าสุด',
    hedgeSuccess: 'ออกก่อนนี่คุ้มกว่า ({{value}})',
    soldTooEarly: 'ขายหมูไป {{value}}',
    tradeDetails: 'รายละเอียดรายการ',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} หุ้น ที่ {{price}}',
    mobileHoldingQty: 'คงเหลือ',
    mobileUnrealized: 'คงค้าง',
    mobileRealized: 'ปิดแล้ว'
  },
  manager: {
    title: 'ตั้งค่าและประวัติซื้อขาย',
    clearAndLoadDemo: 'ล้างข้อมูลแล้วโหลดชุดตัวอย่าง',
    apiKeyTitle: 'ตั้งค่า API Key ของ yfapi.net',
    getFreeApiKey: 'สมัครฟรีรับ Key',
    apiKeyPlaceholder: 'วาง x-api-key ของคุณที่นี่ (เช่น A2sD8...)',
    saveApiKey: 'บันทึก Key',
    baseCurrencyTitle: 'สกุลหลักของการ์ดสรุป',
    baseCurrencyHelp: '* สินทรัพย์ต่างสกุลทั้งหมดจะถูกแปลงเป็นสกุลเงินนี้ด้วยอัตราแลกเปลี่ยนล่าสุด เพื่อรวมยอดบนการ์ดสรุปด้านบน',
    hideZeroHolding: 'ซ่อนรายการที่ปิดสถานะหมดแล้ว',
    manualRecordTitle: 'เพิ่มรายการเอง',
    fields: {
      date: 'วันที่',
      type: 'ประเภท',
      market: 'ตลาด',
      symbol: 'สัญลักษณ์',
      quantity: 'จำนวน',
      price: 'ราคาต่อหน่วย',
      amount: 'มูลค่ารวม',
      pnl: 'กำไร/ขาดทุน (กรอกตอนขาย)'
    },
    placeholders: {
      symbol: 'เช่น: AAPL',
      quantity: 'จำนวนหุ้น',
      price: 'ราคาต่อหุ้น',
      amount: 'ใช้สกุลของตลาดนั้น',
      pnl: 'ไม่บังคับ'
    },
    saveChanges: 'บันทึกการเปลี่ยนแปลง',
    addRecord: 'เพิ่ม',
    noRecords: 'ตอนนี้ยังไม่มีรายการซื้อขาย'
  },
  notice: {
    title: 'ยินดีต้อนรับสู่ Trade Lens',
    body: 'นี่คือเครื่องมือโอเพนซอร์สสำหรับนักลงทุน ที่เปลี่ยน CSV จากโบรกเกอร์ให้กลายเป็นกราฟต้นทุน สัดส่วนพอร์ต และภาพรวมกำไร/ขาดทุนแบบอ่านง่าย',
    privacy: 'ความเป็นส่วนตัวมาก่อน: ข้อมูลทั้งหมดถูกเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น (IndexedDB) และจะไม่ถูกส่งขึ้นเซิร์ฟเวอร์',
    apiKey: 'API Key ใช้แค่สำหรับดึงราคาจาก yfapi.net และเก็บไว้ในเครื่องเช่นกัน',
    sourceCode: 'โอเพนซอร์ส: ดูโค้ดและร่วมพัฒนา',
    dismiss: 'ไม่ต้องแสดงอีก'
  },
  messages: {
    apiKeySaved: 'บันทึก API Key เรียบร้อยแล้ว',
    manualStockSaved: 'อัปเดตข้อมูล {{symbol}} ด้วยตนเองแล้ว',
    needApiKey: 'กรุณากรอก API Key ของ yfapi.net ในแผงจัดการก่อนอัปเดตราคา',
    cacheFresh: 'ราคาหุ้นและอัตราแลกเปลี่ยนถูกอัปเดตภายใน 24 ชั่วโมงที่ผ่านมาแล้ว ระบบจึงใช้แคชในเครื่องเพื่อช่วยประหยัดโควตา',
    updateSuccess: 'อัปเดตราคาหุ้นและอัตราแลกเปลี่ยน {{count}} รายการเรียบร้อยแล้ว',
    fetchFailed: 'ดึงข้อมูลไม่สำเร็จ: {{message}}',
    baseCurrencyChanged: 'เปลี่ยนสกุลเงินหลักเป็น {{currency}} แล้ว กำลังอัปเดตอัตราแลกเปลี่ยน...',
    recordUpdated: 'อัปเดตรายการซื้อขายเรียบร้อยแล้ว',
    dataCleared: 'ล้างข้อมูลและโหลดชุดตัวอย่างเรียบร้อยแล้ว',
    clearConfirm: 'แน่ใจไหมว่าจะล้างข้อมูลทั้งหมดแล้วโหลดตัวอย่างใหม่? การกระทำนี้ย้อนกลับไม่ได้',
    backupConfirm: 'ก่อนล้างข้อมูล ต้องการส่งออกข้อมูลปัจจุบันเป็น CSV ไว้สำรองก่อนหรือไม่?'
  },
  data: {
    unknownSymbol: 'สัญลักษณ์ที่ไม่รู้จัก ({{symbol}})',
    unknown: 'ไม่ทราบ'
  }
};

const arSA = {
  common: {
    language: 'اللغة',
    close: 'إغلاق',
    cancel: 'إلغاء',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    importCsv: 'استيراد CSV',
    exportCsv: 'تصدير CSV'
  },
  currencies: {
    TWD: 'دولار تايواني جديد (TWD)',
    CNY: 'يوان صيني (CNY)',
    HKD: 'دولار هونغ كونغ (HKD)',
    USD: 'دولار أمريكي (USD)',
    JPY: 'ين ياباني (JPY)'
  },
  markets: {
    all: 'الكل',
    chinaA: 'أسهم الصين A',
    hongKong: 'هونغ كونغ',
    taiwan: 'تايوان',
    japan: 'اليابان',
    us: 'الولايات المتحدة',
    other: 'أخرى',
    unknown: 'غير معروف'
  },
  tradeTypes: {
    buy: 'شراء',
    sell: 'بيع'
  },
  timeRanges: {
    oneWeek: 'أسبوع',
    oneMonth: 'شهر',
    threeMonths: '3 أشهر',
    halfYear: '6 أشهر',
    ytd: 'منذ بداية السنة',
    oneYear: 'سنة',
    fiveYears: '5 سنوات',
    all: 'الكل'
  },
  app: {
    loadingLocalData: 'جارٍ تحميل بيانات IndexedDB المحلية...',
    generatingImage: 'جارٍ إنشاء الصورة...',
    imageExportSuccess: 'تم تصدير الصورة بنجاح.',
    imageExportFail: 'فشل تصدير الصورة.',
    noDataToExport: 'لا توجد بيانات للتصدير حالياً.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'لوحة متابعة المحفظة الاستثمارية العالمية',
    demoDescription: 'المعروض الآن نسخة مختصرة من بيانات التجربة. ارفع ملف CSV كاملاً حتى تظهر لك الصورة كاملة.',
    recordsLoaded: 'تم تحميل وتحليل {{count}} عملية تداول.',
    lastUpdated: 'آخر تحديث: {{value}}',
    switchToLight: 'التبديل إلى الوضع الفاتح',
    switchToDark: 'التبديل إلى الوضع الداكن',
    settingsRecords: 'الإعدادات والسجل',
    updatePrices: 'تحديث الأسعار',
    apiKeyRequired: 'مطلوب مفتاح API',
    updateWithCache: 'تحديث الأسعار المباشرة مع التخزين المؤقت',
    setApiKeyFirst: 'اضبط مفتاح API أولاً',
    forceRefresh: 'تحديث إجباري',
    forceRefreshTitle: 'تجاوز التخزين المؤقت مع استهلاك الحصة',
    languageLabel: 'تغيير اللغة',
    csvTitle: 'دليل حقول CSV',
    csvIntro: 'تأكد من أن ملف CSV يحتوي على هذه الأعمدة على الأقل، ولا يهم ترتيبها:',
    csvRows: {
      date: 'التاريخ (مثال: 2025/01/01)',
      type: 'النوع (شراء / بيع)',
      symbol: 'الرمز (مثال: AAPL أو TSLA)',
      market: 'السوق (اختياري، ومفيد عند الإضافة اليدوية)',
      quantity: 'الكمية',
      price: 'سعر الوحدة (بالعملة الأصلية)',
      amount: 'إجمالي المبلغ (بالعملة الأصلية)',
      pnl: 'الربح أو الخسارة (مطلوب عند البيع، بالعملة الأصلية)'
    },
    csvNote1: '* ملاحظة 1: الرموز المكوّنة من 6 أرقام والتي تبدأ بـ 6 أو 0 يتم التعرف عليها تلقائياً كأسهم صينية A (.SS / .SZ).',
    csvNote2: '* ملاحظة 2: لبقية الأسواق، أضف اللاحقة مباشرة إلى الرمز مثل .TW أو .HK.',
    forceRefreshConfirm: 'هل تريد تنفيذ تحديث إجباري؟ سيتم تجاهل التخزين المؤقت لمدة 24 ساعة وسيتم استهلاك الحصة الفعلية للواجهة البرمجية.'
  },
  summary: {
    totalRealized: 'إجمالي الربح المحقق (بعد التحويل)',
    totalUnrealized: 'إجمالي الربح غير المحقق (بعد التحويل)',
    totalValue: 'القيمة السوقية الحالية للمحفظة (بعد التحويل)',
    holdingCount: 'عدد المراكز المفتوحة',
    holdingUnit: 'مراكز'
  },
  charts: {
    trendTitle: 'اتجاه التكلفة التراكمية',
    saveImage: 'حفظ الرسم كصورة',
    noTrend: 'لا يوجد سجل تداول كافٍ حتى الآن لرسم الاتجاه.',
    realizedTitle: 'الربح/الخسارة المحققة حسب السهم (بيع مبكر زيادة / خروج مرتب)',
    distributionTitle: 'توزيع قيمة المراكز (أعلى 10)',
    convertedNote: 'يُعرض بعد التحويل إلى {{currency}}',
    noPnlData: 'لا توجد بيانات أرباح أو خسائر حالياً.',
    noHoldings: 'لا توجد مراكز مفتوحة حالياً.',
    legendConverted: '{{label}} (بعد التحويل)',
    costSeries: 'إجمالي التكلفة التراكمية',
    realizedSeries: 'إجمالي الربح/الخسارة المحققة',
    ifSoldSeries: 'لو تم البيع اليوم',
    actualSeries: 'المحقق فعلياً',
    others: 'أخرى'
  },
  table: {
    title: 'سجل التداول حسب السهم',
    subtitle: 'افتح الصف للاطلاع على تفاصيل الشراء والبيع. تبقى المبالغ بعملة السوق الأصلية.',
    columns: {
      symbol: 'الرمز / الاسم (السوق · العملة)',
      holdingQty: 'الكمية الحالية',
      currentValue: 'السعر الحالي / القيمة السوقية',
      unrealized: 'ربح/خسارة غير محققة',
      realized: 'ربح/خسارة محققة',
      ifSoldToday: 'لو تم البيع اليوم',
      date: 'التاريخ',
      type: 'النوع',
      quantity: 'الكمية',
      price: 'السعر',
      amount: 'المبلغ',
      pnl: 'ربح/خسارة',
      actions: 'الإجراءات'
    },
    manualBadge: 'يدوي',
    manualUpdatedAt: 'آخر تعديل يدوي: {{value}}',
    apiUpdatedAt: 'آخر تحديث من API: {{value}}',
    notUpdatedYet: 'لم يتم التحديث بعد',
    manualNamePlaceholder: 'اسم مُدخل يدوياً',
    currentPricePlaceholder: 'السعر الحالي',
    hedgeSuccess: 'طلع البيع بدري هو القرار الأفضل هالمرة ({{value}})',
    soldTooEarly: 'بعت بدري أكثر من اللازم وخليت {{value}} على الطاولة',
    tradeDetails: 'تفاصيل الصفقات',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} سهم @ {{price}}',
    mobileHoldingQty: 'الكمية',
    mobileUnrealized: 'غير محقق',
    mobileRealized: 'محقق'
  },
  manager: {
    title: 'إدارة الإعدادات والسجل',
    clearAndLoadDemo: 'مسح وتحميل البيانات التجريبية',
    apiKeyTitle: 'مفتاح API من yfapi.net',
    getFreeApiKey: 'احصل عليه مجاناً',
    apiKeyPlaceholder: 'ألصق x-api-key هنا (مثال: A2sD8...)',
    saveApiKey: 'حفظ المفتاح',
    baseCurrencyTitle: 'العملة الأساسية لبطاقات الملخص',
    baseCurrencyHelp: '* يتم تحويل كل أصل أجنبي إلى هذه العملة عبر أسعار صرف مباشرة حتى يمكن جمعه داخل بطاقات الملخص.',
    hideZeroHolding: 'إخفاء السجلات التي لم يعد لها رصيد',
    manualRecordTitle: 'إضافة صفقة يدوية',
    fields: {
      date: 'التاريخ',
      type: 'النوع',
      market: 'السوق',
      symbol: 'الرمز',
      quantity: 'الكمية',
      price: 'سعر الوحدة',
      amount: 'إجمالي القيمة',
      pnl: 'الربح/الخسارة (للبيع فقط)'
    },
    placeholders: {
      symbol: 'مثال: AAPL',
      quantity: 'عدد الأسهم',
      price: 'سعر السهم',
      amount: 'بعملة ذلك السوق',
      pnl: 'اختياري'
    },
    saveChanges: 'حفظ التغييرات',
    addRecord: 'إضافة',
    noRecords: 'لا توجد سجلات تداول حالياً.'
  },
  notice: {
    title: 'مرحباً بك في Trade Lens',
    body: 'هذه أداة مفتوحة المصدر للمستثمرين تحوّل ملفات CSV من الوسيط إلى رسوم لتكلفة الشراء والأرباح والخسائر وتوزيع المراكز خلال ثوانٍ.',
    privacy: 'الخصوصية أولاً: كل البيانات تبقى داخل متصفحك فقط (IndexedDB)، ولا يتم إرسالها إلى الخادم.',
    apiKey: 'مفتاح API: يُستخدم فقط لجلب الأسعار من yfapi.net، ويتم حفظه محلياً أيضاً.',
    sourceCode: 'مفتوح المصدر: تصفح الكود وشارك بالمساهمة',
    dismiss: 'عدم الإظهار مرة أخرى'
  },
  messages: {
    apiKeySaved: 'تم حفظ مفتاح API.',
    manualStockSaved: 'تم تحديث {{symbol}} يدوياً.',
    needApiKey: 'أدخل مفتاح yfapi.net في لوحة الإدارة قبل تحديث الأسعار.',
    cacheFresh: 'تم تحديث الأسعار وأسعار الصرف خلال آخر 24 ساعة، لذلك استخدم التطبيق التخزين المحلي لتوفير الحصة.',
    updateSuccess: 'تم تحديث أسعار {{count}} سهم وأسعار الصرف.',
    fetchFailed: 'فشل الجلب: {{message}}',
    baseCurrencyChanged: 'تم تبديل العملة الأساسية إلى {{currency}}. جارٍ تحديث أسعار الصرف...',
    recordUpdated: 'تم تحديث سجل التداول.',
    dataCleared: 'تم مسح البيانات وتحميل السجلات التجريبية.',
    clearConfirm: 'هل تريد مسح كل البيانات وإعادة تحميل البيانات التجريبية؟ لا يمكن التراجع عن هذا الإجراء.',
    backupConfirm: 'هل تريد تصدير البيانات الحالية كنسخة CSV احتياطية قبل المسح؟'
  },
  data: {
    unknownSymbol: 'رمز غير معرّف ({{symbol}})',
    unknown: 'غير معروف'
  }
};

const enCA = {
  ...enUS,
  currencies: {
    ...enUS.currencies,
    CAD: 'Canadian Dollar (CAD)'
  },
  header: {
    ...enUS.header,
    demoDescription: 'A trimmed demo dataset is showing right now. Import your full CSV to see the whole book.',
    recordsLoaded: 'Loaded and analyzed {{count}} trades.',
    csvRows: {
      ...enUS.header.csvRows,
      symbol: 'Symbol (for example: AAPL, 0700.HK)'
    },
    csvNote2: '* Note 2: For other markets, add the suffix directly to the symbol (for example: .TW, .HK).'
  },
  summary: {
    ...enUS.summary,
    holdingCount: 'Open Holdings',
    holdingUnit: 'holdings'
  },
  charts: {
    ...enUS.charts,
    realizedTitle: 'Realized P&L by Name (sold too soon / solid exit)'
  },
  table: {
    ...enUS.table,
    title: 'Trade History by Name',
    hedgeSuccess: 'Selling earlier turned out to be the better move ({{value}})',
    soldTooEarly: 'Sold a little too early and left {{value}} on the table'
  },
  messages: {
    ...enUS.messages,
    updateSuccess: 'Updated {{count}} quotes and FX rates.'
  }
};

const enAU = {
  ...enGB,
  currencies: {
    ...enGB.currencies,
    AUD: 'Australian Dollar (AUD)'
  },
  header: {
    ...enGB.header,
    demoDescription: 'Right now you are seeing a trimmed demo set. Import the full CSV to see the full picture.',
    recordsLoaded: 'Loaded and analysed {{count}} trades.',
    csvRows: {
      ...enGB.header.csvRows,
      symbol: 'Symbol (for example: AAPL, 0700.HK)'
    },
    forceRefreshTitle: 'Ignore the cache and burn real API quota'
  },
  charts: {
    ...enGB.charts,
    realizedTitle: 'Realised P&L by Ticker (sold too early / tidy exit)'
  },
  table: {
    ...enGB.table,
    title: 'Trade History by Ticker',
    hedgeSuccess: 'Getting out earlier ended up being the better call ({{value}})',
    soldTooEarly: 'Sold too early and left {{value}} behind'
  },
  manager: {
    ...enGB.manager,
    placeholders: {
      ...enGB.manager.placeholders,
      symbol: 'For example: 0700.HK'
    }
  },
  messages: {
    ...enGB.messages,
    cacheFresh: 'Prices and FX rates were refreshed within the last 24 hours, so the app reused the local cache to save quota.'
  }
};

const frCA = {
  ...frFR,
  currencies: {
    ...frFR.currencies,
    CAD: 'Dollar canadien (CAD)'
  },
  header: {
    ...frFR.header,
    demoDescription: 'Pour le moment, tu vois un jeu de données démo allégé. Importe ton CSV complet pour voir tout le portrait.',
    recordsLoaded: '{{count}} transactions chargées et analysées',
    settingsRecords: 'Réglages et transactions',
    updatePrices: 'Actualiser les cours',
    updateWithCache: 'Actualiser les cours avec le cache',
    forceRefreshTitle: 'Ignorer le cache et brûler du quota API',
    csvRows: {
      ...frFR.header.csvRows,
      symbol: 'Symbole (par ex. : AAPL, 0700.HK)'
    },
    csvNote2: '* Note 2 : pour les autres marchés, ajoute directement le suffixe au symbole comme .TW ou .HK.'
  },
  summary: {
    ...frFR.summary,
    totalValue: 'Valeur actuelle des positions (convertie)'
  },
  charts: {
    ...frFR.charts,
    realizedTitle: 'P/L réalisé par titre (vente trop vite / bonne sortie)'
  },
  table: {
    ...frFR.table,
    title: 'Historique par titre',
    subtitle: 'Ouvre une ligne pour voir le détail des achats et ventes. Les montants restent affichés dans la devise d’origine du marché.',
    hedgeSuccess: 'Sortir plus tôt a finalement mieux payé ({{value}})',
    soldTooEarly: 'Vendu trop tôt, il manque {{value}}'
  },
  manager: {
    ...frFR.manager,
    clearAndLoadDemo: 'Effacer et charger les données démo',
    apiKeyTitle: 'Clé API yfapi.net',
    getFreeApiKey: 'Obtenir une clé gratuite',
    saveApiKey: 'Enregistrer la clé',
    manualRecordTitle: 'Ajouter une transaction manuelle',
    placeholders: {
      ...frFR.manager.placeholders,
      symbol: 'Ex. : 0700.HK'
    }
  },
  notice: {
    ...frFR.notice,
    body: 'Trade Lens est un outil open source pour investisseurs qui transforme les CSV de courtier en courbes de coût, vues P/L et graphiques de répartition plus faciles à lire.'
  }
};

const esMX = {
  ...es419,
  currencies: {
    ...es419.currencies,
    MXN: 'Peso mexicano (MXN)'
  },
  header: {
    ...es419.header,
    demoDescription: 'Ahorita solo se muestra una parte del set demo. Importa tu CSV completo para ver toda la foto.',
    settingsRecords: 'Configuración y movimientos',
    updatePrices: 'Actualizar precios',
    updateWithCache: 'Actualizar precios en vivo con caché',
    forceRefreshTitle: 'Ignorar caché y gastar cuota real del API',
    csvRows: {
      ...es419.header.csvRows,
      symbol: 'Símbolo (por ejemplo: AAPL, 0700.HK)'
    }
  },
  charts: {
    ...es419.charts,
    realizedTitle: 'P&L realizado por emisora (salida temprana / buena toma de ganancia)'
  },
  table: {
    ...es419.table,
    title: 'Historial por emisora',
    hedgeSuccess: 'Salir antes terminó saliendo mejor ({{value}})',
    soldTooEarly: 'Vendiste antes de tiempo y dejaste {{value}} sobre la mesa'
  },
  manager: {
    ...es419.manager,
    title: 'Configuración y registro de movimientos',
    placeholders: {
      ...es419.manager.placeholders,
      symbol: 'Por ejemplo: 0700.HK'
    }
  },
  messages: {
    ...es419.messages,
    needApiKey: 'Pon tu API key de yfapi.net en el panel de configuración antes de actualizar precios.'
  }
};

const plPL = {
  ...enUS,
  common: {
    language: 'Język',
    close: 'Zamknij',
    cancel: 'Anuluj',
    save: 'Zapisz',
    edit: 'Edytuj',
    delete: 'Usuń',
    importCsv: 'Importuj CSV',
    exportCsv: 'Eksportuj CSV'
  },
  currencies: {
    TWD: 'Nowy dolar tajwański (TWD)',
    CNY: 'Juan chiński (CNY)',
    HKD: 'Dolar hongkoński (HKD)',
    USD: 'Dolar amerykański (USD)',
    JPY: 'Jen japoński (JPY)',
    PLN: 'Polski złoty (PLN)'
  },
  markets: {
    all: 'Wszystko',
    chinaA: 'Chińskie akcje A',
    hongKong: 'Hongkong',
    taiwan: 'Tajwan',
    japan: 'Japonia',
    us: 'USA',
    other: 'Inne',
    unknown: 'Nieznane'
  },
  tradeTypes: {
    buy: 'Kupno',
    sell: 'Sprzedaż'
  },
  timeRanges: {
    oneWeek: '1 tydz.',
    oneMonth: '1 mies.',
    threeMonths: '3 mies.',
    halfYear: '6 mies.',
    ytd: 'YTD',
    oneYear: '1 rok',
    fiveYears: '5 lat',
    all: 'Wszystko'
  },
  app: {
    loadingLocalData: 'Ładowanie lokalnych danych z IndexedDB...',
    generatingImage: 'Generowanie obrazu...',
    imageExportSuccess: 'Obraz został wyeksportowany.',
    imageExportFail: 'Eksport obrazu nie powiódł się.',
    noDataToExport: 'Brak danych do eksportu.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Globalny dashboard portfela',
    demoDescription: 'Teraz widzisz tylko przycięty zestaw demo. Zaimportuj pełny CSV, żeby zobaczyć cały obraz.',
    recordsLoaded: 'Wczytano i przeanalizowano {{count}} transakcji.',
    lastUpdated: 'Ostatnia aktualizacja: {{value}}',
    switchToLight: 'Przełącz na jasny motyw',
    switchToDark: 'Przełącz na ciemny motyw',
    settingsRecords: 'Ustawienia i transakcje',
    updatePrices: 'Odśwież kursy',
    apiKeyRequired: 'Potrzebny API key',
    updateWithCache: 'Odśwież kursy z użyciem cache',
    setApiKeyFirst: 'Najpierw ustaw API key',
    forceRefresh: 'Wymuś odświeżenie',
    forceRefreshTitle: 'Pomiń cache i zużyj prawdziwy limit API',
    languageLabel: 'Zmień język',
    csvTitle: 'Przewodnik po polach CSV',
    csvIntro: 'Upewnij się, że CSV ma przynajmniej te nagłówki. Kolejność nie ma znaczenia:',
    csvRows: {
      date: 'Data (np. 2025/01/01)',
      type: 'Typ (Kupno / Sprzedaż)',
      symbol: 'Symbol (np. AAPL, 0700.HK)',
      market: 'Rynek (opcjonalnie, przydaje się przy ręcznych wpisach)',
      quantity: 'Ilość',
      price: 'Cena jednostkowa (waluta oryginalna)',
      amount: 'Kwota łączna (waluta oryginalna)',
      pnl: 'P&L (wymagane przy sprzedaży, waluta oryginalna)'
    },
    csvNote1: '* Uwaga 1: Sześciocyfrowe symbole zaczynające się od 6 lub 0 są automatycznie rozpoznawane jako chińskie akcje A (.SS / .SZ).',
    csvNote2: '* Uwaga 2: Dla innych rynków dodaj sufiks bezpośrednio do symbolu, np. .TW albo .HK.',
    forceRefreshConfirm: 'Wymusić odświeżenie? To zignoruje 24-godzinny cache i zużyje prawdziwy limit API.'
  },
  summary: {
    totalRealized: 'Łączny zrealizowany P&L (po przewalutowaniu)',
    totalUnrealized: 'Łączny niezrealizowany P&L (po przewalutowaniu)',
    totalValue: 'Aktualna wartość portfela (po przewalutowaniu)',
    holdingCount: 'Otwarte pozycje',
    holdingUnit: 'pozycje'
  },
  charts: {
    trendTitle: 'Skumulowany trend kosztu',
    saveImage: 'Zapisz wykres jako obraz',
    noTrend: 'Historia transakcji jest jeszcze za mała, żeby narysować trend.',
    realizedTitle: 'Zrealizowany P&L wg spółki (sprzedane za wcześnie / dobry timing)',
    distributionTitle: 'Struktura wartości portfela (top 10)',
    convertedNote: 'Pokazane po przeliczeniu na {{currency}}',
    noPnlData: 'Brak danych P&L.',
    noHoldings: 'Brak otwartych pozycji.',
    legendConverted: '{{label}} (po przewalutowaniu)',
    costSeries: 'Skumulowany koszt',
    realizedSeries: 'Skumulowany zrealizowany P&L',
    ifSoldSeries: 'Gdyby sprzedać dziś',
    actualSeries: 'Zrealizowane faktycznie',
    others: 'Pozostałe'
  },
  table: {
    title: 'Historia transakcji wg symbolu',
    subtitle: 'Otwórz wiersz, żeby zobaczyć szczegóły kupna i sprzedaży. Kwoty zostają w oryginalnej walucie notowania.',
    columns: {
      symbol: 'Symbol / nazwa (rynek · waluta)',
      holdingQty: 'Aktualna ilość',
      currentValue: 'Ostatnia cena / wartość rynkowa',
      unrealized: 'Niezrealizowany P&L',
      realized: 'Zrealizowany P&L',
      ifSoldToday: 'Gdyby sprzedać dziś',
      date: 'Data',
      type: 'Typ',
      quantity: 'Ilość',
      price: 'Cena',
      amount: 'Kwota',
      pnl: 'P&L',
      actions: 'Akcje'
    },
    manualBadge: 'Ręcznie',
    manualUpdatedAt: 'Ręczna korekta: {{value}}',
    apiUpdatedAt: 'Ostatnie odświeżenie API: {{value}}',
    notUpdatedYet: 'Jeszcze nie odświeżono',
    manualNamePlaceholder: 'Nazwa wpisana ręcznie',
    currentPricePlaceholder: 'Cena',
    hedgeSuccess: 'Wcześniejsze wyjście wyszło lepiej ({{value}})',
    soldTooEarly: 'Sprzedane za wcześnie, na stole zostało {{value}}',
    tradeDetails: 'Szczegóły wykonania',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} akcji @ {{price}}',
    mobileHoldingQty: 'Pozycja',
    mobileUnrealized: 'Niezrealizowane',
    mobileRealized: 'Zrealizowane'
  },
  manager: {
    title: 'Ustawienia i dziennik transakcji',
    clearAndLoadDemo: 'Wyczyść i wczytaj demo',
    apiKeyTitle: 'API key z yfapi.net',
    getFreeApiKey: 'Pobierz za darmo',
    apiKeyPlaceholder: 'Wklej tutaj swój x-api-key (np. A2sD8...)',
    saveApiKey: 'Zapisz API key',
    baseCurrencyTitle: 'Waluta bazowa podsumowania',
    baseCurrencyHelp: '* Każdy zagraniczny składnik portfela jest przeliczany na tę walutę według bieżącego FX, żeby karty podsumowania mogły wszystko sensownie zsumować.',
    hideZeroHolding: 'Ukryj pozycje całkowicie zamknięte',
    manualRecordTitle: 'Dodaj transakcję ręcznie',
    fields: {
      date: 'Data',
      type: 'Typ',
      market: 'Rynek',
      symbol: 'Symbol',
      quantity: 'Ilość',
      price: 'Cena jednostkowa',
      amount: 'Kwota łączna',
      pnl: 'Zrealizowany P&L (tylko sprzedaż)'
    },
    placeholders: {
      symbol: 'Np. AAPL',
      quantity: 'Liczba akcji',
      price: 'Cena za akcję',
      amount: 'W walucie tego rynku',
      pnl: 'Opcjonalnie'
    },
    saveChanges: 'Zapisz zmiany',
    addRecord: 'Dodaj',
    noRecords: 'Brak historii transakcji.'
  },
  notice: {
    title: 'Witaj w Trade Lens',
    body: 'Trade Lens to open source’owe narzędzie dla inwestorów, które zamienia CSV od brokera w wykres kosztu, widoki P&L i czytelniejszy obraz portfela.',
    privacy: 'Prywatność przede wszystkim: wszystko zostaje tylko w Twojej przeglądarce (IndexedDB). Nic nie trafia na nasz serwer.',
    apiKey: 'API key służy wyłącznie do pobierania cen z yfapi.net i też zostaje lokalnie.',
    sourceCode: 'Open source: przejrzyj kod i dołóż swoje',
    dismiss: 'Nie pokazuj ponownie'
  },
  messages: {
    apiKeySaved: 'API key zapisany.',
    manualStockSaved: '{{symbol}} zaktualizowano ręcznie.',
    needApiKey: 'Wpisz API key z yfapi.net w panelu ustawień, zanim odświeżysz kursy.',
    cacheFresh: 'Ceny i kursy FX były odświeżane w ciągu ostatnich 24 godzin, więc aplikacja użyła lokalnego cache, żeby oszczędzić limit.',
    updateSuccess: 'Zaktualizowano {{count}} kursów i stawek FX.',
    fetchFailed: 'Pobieranie nie powiodło się: {{message}}',
    baseCurrencyChanged: 'Waluta bazowa została zmieniona na {{currency}}. Trwa odświeżanie FX...',
    recordUpdated: 'Transakcja została zaktualizowana.',
    dataCleared: 'Dane wyczyszczone, wczytano zestaw demo.',
    clearConfirm: 'Wyczyścić wszystkie dane i ponownie załadować demo? Tego nie da się cofnąć.',
    backupConfirm: 'Chcesz wyeksportować bieżące dane do CSV przed wyczyszczeniem?'
  },
  data: {
    unknownSymbol: 'Nieznany symbol ({{symbol}})',
    unknown: 'Nieznane'
  }
};

const trTR = {
  ...enUS,
  common: {
    language: 'Dil',
    close: 'Kapat',
    cancel: 'İptal',
    save: 'Kaydet',
    edit: 'Düzenle',
    delete: 'Sil',
    importCsv: 'CSV içe aktar',
    exportCsv: 'CSV dışa aktar'
  },
  currencies: {
    TWD: 'Yeni Tayvan Doları (TWD)',
    CNY: 'Çin Yuanı (CNY)',
    HKD: 'Hong Kong Doları (HKD)',
    USD: 'ABD Doları (USD)',
    JPY: 'Japon Yeni (JPY)',
    TRY: 'Türk Lirası (TRY)'
  },
  markets: {
    all: 'Tümü',
    chinaA: 'Çin A Hisseleri',
    hongKong: 'Hong Kong',
    taiwan: 'Tayvan',
    japan: 'Japonya',
    us: 'ABD',
    other: 'Diğer',
    unknown: 'Bilinmiyor'
  },
  tradeTypes: {
    buy: 'Alım',
    sell: 'Satım'
  },
  timeRanges: {
    oneWeek: '1 hf',
    oneMonth: '1 ay',
    threeMonths: '3 ay',
    halfYear: '6 ay',
    ytd: 'YBB',
    oneYear: '1 yıl',
    fiveYears: '5 yıl',
    all: 'Tümü'
  },
  app: {
    loadingLocalData: 'Yerel IndexedDB verileri yükleniyor...',
    generatingImage: 'Görsel oluşturuluyor...',
    imageExportSuccess: 'Görsel başarıyla dışa aktarıldı.',
    imageExportFail: 'Görsel dışa aktarılamadı.',
    noDataToExport: 'Şu anda dışa aktarılacak veri yok.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Küresel portföy paneli',
    demoDescription: 'Şu anda kırpılmış bir demo veri seti görüyorsun. Tam resmi görmek için tam CSV’yi içe aktar.',
    recordsLoaded: '{{count}} işlem yüklendi ve analiz edildi.',
    lastUpdated: 'Son güncelleme: {{value}}',
    switchToLight: 'Aydınlık moda geç',
    switchToDark: 'Karanlık moda geç',
    settingsRecords: 'Ayarlar ve işlemler',
    updatePrices: 'Fiyatları yenile',
    apiKeyRequired: 'API key gerekli',
    updateWithCache: 'Canlı fiyatları önbellekle yenile',
    setApiKeyFirst: 'Önce API key gir',
    forceRefresh: 'Zorla yenile',
    forceRefreshTitle: 'Önbelleği yok say ve gerçek API kotası harca',
    languageLabel: 'Dili değiştir',
    csvTitle: 'CSV alan rehberi',
    csvIntro: 'CSV dosyanın en azından şu başlıklara sahip olduğundan emin ol. Sıra önemli değil:',
    csvRows: {
      date: 'Tarih (ör. 2025/01/01)',
      type: 'Tür (Alım / Satım)',
      symbol: 'Sembol (ör. AAPL, 0700.HK)',
      market: 'Piyasa (opsiyonel, manuel girişte işe yarar)',
      quantity: 'Miktar',
      price: 'Birim fiyat (orijinal para birimi)',
      amount: 'Toplam tutar (orijinal para birimi)',
      pnl: 'Kâr/Zarar (satışta zorunlu, orijinal para birimi)'
    },
    csvNote1: '* Not 1: 6 veya 0 ile başlayan altı haneli semboller otomatik olarak Çin A hissesi (.SS / .SZ) olarak algılanır.',
    csvNote2: '* Not 2: Diğer piyasalar için sembole doğrudan .TW veya .HK gibi ekleri yaz.',
    forceRefreshConfirm: 'Zorla yenilensin mi? Bu işlem 24 saatlik önbelleği yok sayar ve gerçek API kotası harcar.'
  },
  summary: {
    totalRealized: 'Toplam gerçekleşen P&L (çevrilmiş)',
    totalUnrealized: 'Toplam gerçekleşmemiş P&L (çevrilmiş)',
    totalValue: 'Güncel portföy değeri (çevrilmiş)',
    holdingCount: 'Açık pozisyon sayısı',
    holdingUnit: 'pozisyon'
  },
  charts: {
    trendTitle: 'Kümülatif maliyet trendi',
    saveImage: 'Grafiği görsel olarak kaydet',
    noTrend: 'Trend çizmek için henüz yeterli işlem geçmişi yok.',
    realizedTitle: 'Sembole göre gerçekleşen P&L (erken satış / temiz çıkış)',
    distributionTitle: 'Portföy değer dağılımı (ilk 10)',
    convertedNote: '{{currency}} cinsine çevrilmiş olarak gösterilir',
    noPnlData: 'Henüz P&L verisi yok.',
    noHoldings: 'Şu anda açık pozisyon yok.',
    legendConverted: '{{label}} (çevrilmiş)',
    costSeries: 'Kümülatif maliyet',
    realizedSeries: 'Kümülatif gerçekleşen P&L',
    ifSoldSeries: 'Bugün satılsaydı',
    actualSeries: 'Gerçekte gerçekleşen',
    others: 'Diğer'
  },
  table: {
    title: 'Sembole göre işlem geçmişi',
    subtitle: 'Bir satırı açıp alım ve satım detaylarını inceleyebilirsin. Tutarlar işlem gördüğü piyasanın kendi para biriminde kalır.',
    columns: {
      symbol: 'Sembol / ad (piyasa · para birimi)',
      holdingQty: 'Güncel miktar',
      currentValue: 'Son fiyat / piyasa değeri',
      unrealized: 'Gerçekleşmemiş P&L',
      realized: 'Gerçekleşen P&L',
      ifSoldToday: 'Bugün satılsaydı',
      date: 'Tarih',
      type: 'Tür',
      quantity: 'Miktar',
      price: 'Fiyat',
      amount: 'Tutar',
      pnl: 'P&L',
      actions: 'İşlemler'
    },
    manualBadge: 'Manuel',
    manualUpdatedAt: 'Manuel düzeltme: {{value}}',
    apiUpdatedAt: 'API son güncelleme: {{value}}',
    notUpdatedYet: 'Henüz güncellenmedi',
    manualNamePlaceholder: 'Manuel isim',
    currentPricePlaceholder: 'Fiyat',
    hedgeSuccess: 'Erken çıkmak daha iyi iş çıkardı ({{value}})',
    soldTooEarly: 'Biraz erken sattın, {{value}} masada kaldı',
    tradeDetails: 'İşlem detayları',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} adet @ {{price}}',
    mobileHoldingQty: 'Pozisyon',
    mobileUnrealized: 'Gerçekleşmemiş',
    mobileRealized: 'Gerçekleşen'
  },
  manager: {
    title: 'Ayarlar ve işlem kaydı',
    clearAndLoadDemo: 'Temizle ve demo verisini yükle',
    apiKeyTitle: 'yfapi.net API key',
    getFreeApiKey: 'Ücretsiz al',
    apiKeyPlaceholder: 'x-api-key değerini buraya yapıştır (ör. A2sD8...)',
    saveApiKey: 'API key kaydet',
    baseCurrencyTitle: 'Özet kartı baz para birimi',
    baseCurrencyHelp: '* Tüm yabancı para varlıkları canlı FX ile bu para birimine çevrilir; böylece üstteki özet kartları her şeyi düzgünce toplayabilir.',
    hideZeroHolding: 'Tamamen kapatılmış pozisyonları gizle',
    manualRecordTitle: 'Manuel işlem ekle',
    fields: {
      date: 'Tarih',
      type: 'Tür',
      market: 'Piyasa',
      symbol: 'Sembol',
      quantity: 'Miktar',
      price: 'Birim fiyat',
      amount: 'Toplam tutar',
      pnl: 'Gerçekleşen P&L (sadece satış)'
    },
    placeholders: {
      symbol: 'Örn: AAPL',
      quantity: 'Adet',
      price: 'Hisse başı fiyat',
      amount: 'O piyasanın para biriminde',
      pnl: 'Opsiyonel'
    },
    saveChanges: 'Değişiklikleri kaydet',
    addRecord: 'Ekle',
    noRecords: 'Henüz işlem kaydı yok.'
  },
  notice: {
    title: 'Trade Lens’e hoş geldin',
    body: 'Trade Lens, aracı kurum CSV’lerini maliyet trendlerine, P&L görünümüne ve portföy dağılımına çeviren açık kaynaklı bir yatırımcı aracıdır.',
    privacy: 'Önce gizlilik: her şey sadece tarayıcında kalır (IndexedDB). Sunucuya hiçbir şey gönderilmez.',
    apiKey: 'API key sadece yfapi.net fiyat sorguları için kullanılır; o da yerelde kalır.',
    sourceCode: 'Açık kaynak: koda bak ve katkı ver',
    dismiss: 'Bir daha gösterme'
  },
  messages: {
    apiKeySaved: 'API key kaydedildi.',
    manualStockSaved: '{{symbol}} manuel olarak güncellendi.',
    needApiKey: 'Fiyatları yenilemeden önce ayarlar paneline yfapi.net API key gir.',
    cacheFresh: 'Fiyatlar ve FX oranları son 24 saatte güncellendiği için uygulama kotayı korumak adına yerel önbelleği kullandı.',
    updateSuccess: '{{count}} fiyat ve FX oranı güncellendi.',
    fetchFailed: 'Veri alınamadı: {{message}}',
    baseCurrencyChanged: 'Baz para birimi {{currency}} olarak değiştirildi. FX oranları yenileniyor...',
    recordUpdated: 'İşlem kaydı güncellendi.',
    dataCleared: 'Veriler temizlendi ve demo kayıtları yüklendi.',
    clearConfirm: 'Tüm veriler silinip demo seti yeniden yüklensin mi? Bu işlem geri alınamaz.',
    backupConfirm: 'Silmeden önce mevcut verileri CSV yedeği olarak dışa aktarmak ister misin?'
  },
  data: {
    unknownSymbol: 'Bilinmeyen sembol ({{symbol}})',
    unknown: 'Bilinmiyor'
  }
};

const hiIN = {
  ...enUS,
  common: {
    language: 'भाषा',
    close: 'बंद करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    edit: 'एडिट करें',
    delete: 'हटाएं',
    importCsv: 'CSV इंपोर्ट करें',
    exportCsv: 'CSV एक्सपोर्ट करें'
  },
  currencies: {
    TWD: 'न्यू ताइवान डॉलर (TWD)',
    CNY: 'चीनी युआन (CNY)',
    HKD: 'हांगकांग डॉलर (HKD)',
    USD: 'अमेरिकी डॉलर (USD)',
    JPY: 'जापानी येन (JPY)',
    INR: 'भारतीय रुपया (INR)'
  },
  markets: {
    all: 'सभी',
    chinaA: 'चीन A-शेयर',
    hongKong: 'हांगकांग शेयर',
    taiwan: 'ताइवान शेयर',
    japan: 'जापान शेयर',
    us: 'अमेरिकी शेयर',
    other: 'अन्य',
    unknown: 'अज्ञात'
  },
  tradeTypes: {
    buy: 'खरीद',
    sell: 'बिक्री'
  },
  timeRanges: {
    oneWeek: '1 हफ्ता',
    oneMonth: '1 महीना',
    threeMonths: '3 महीने',
    halfYear: '6 महीने',
    ytd: 'YTD',
    oneYear: '1 साल',
    fiveYears: '5 साल',
    all: 'सभी'
  },
  app: {
    loadingLocalData: 'लोकल IndexedDB डेटा लोड हो रहा है...',
    generatingImage: 'इमेज बनाई जा रही है...',
    imageExportSuccess: 'इमेज सफलतापूर्वक एक्सपोर्ट हो गई।',
    imageExportFail: 'इमेज एक्सपोर्ट फेल हो गया।',
    noDataToExport: 'अभी एक्सपोर्ट करने के लिए कोई डेटा नहीं है।',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'ग्लोबल पोर्टफोलियो डैशबोर्ड',
    demoDescription: 'अभी सिर्फ छोटा डेमो डेटा दिख रहा है। पूरा CSV इंपोर्ट करो, तब पूरी तस्वीर दिखेगी।',
    recordsLoaded: '{{count}} ट्रेड रिकॉर्ड लोड और एनालाइज़ किए गए।',
    lastUpdated: 'आखिरी अपडेट: {{value}}',
    switchToLight: 'लाइट मोड पर जाएं',
    switchToDark: 'डार्क मोड पर जाएं',
    settingsRecords: 'सेटिंग्स और ट्रेड्स',
    updatePrices: 'कोट्स रिफ्रेश करें',
    apiKeyRequired: 'API key चाहिए',
    updateWithCache: 'कैश के साथ लाइव कोट्स रिफ्रेश करें',
    setApiKeyFirst: 'पहले API key सेट करें',
    forceRefresh: 'फोर्स रिफ्रेश',
    forceRefreshTitle: 'कैश छोड़ो और असली API quota खर्च करो',
    languageLabel: 'भाषा बदलें',
    csvTitle: 'CSV फील्ड गाइड',
    csvIntro: 'ध्यान रहे कि आपके CSV में कम से कम ये headers हों। क्रम मायने नहीं रखता:',
    csvRows: {
      date: 'तारीख (जैसे: 2025/01/01)',
      type: 'टाइप (खरीद / बिक्री)',
      symbol: 'सिंबल (जैसे: AAPL, 0700.HK)',
      market: 'मार्केट (वैकल्पिक, मैनुअल एंट्री में काम आता है)',
      quantity: 'क्वांटिटी',
      price: 'यूनिट प्राइस (मूल मुद्रा)',
      amount: 'कुल अमाउंट (मूल मुद्रा)',
      pnl: 'P&L (बिक्री पर जरूरी, मूल मुद्रा)'
    },
    csvNote1: '* नोट 1: 6 अंकों वाले और 6 या 0 से शुरू होने वाले symbols अपने आप China A-shares (.SS / .SZ) माने जाएंगे।',
    csvNote2: '* नोट 2: बाकी मार्केट्स के लिए symbol के बाद .TW या .HK जैसा suffix सीधे जोड़ें।',
    forceRefreshConfirm: 'फोर्स रिफ्रेश करना है? इससे 24 घंटे वाला cache ignore होगा और असली API quota खर्च होगा।'
  },
  summary: {
    totalRealized: 'कुल Realized P&L (कन्वर्टेड)',
    totalUnrealized: 'कुल Unrealized P&L (कन्वर्टेड)',
    totalValue: 'मौजूदा Holdings Value (कन्वर्टेड)',
    holdingCount: 'ओपन होल्डिंग्स',
    holdingUnit: 'होल्डिंग्स'
  },
  charts: {
    trendTitle: 'क्यूम्युलेटिव कॉस्ट ट्रेंड',
    saveImage: 'चार्ट को इमेज के रूप में सेव करें',
    noTrend: 'अभी ट्रेंड दिखाने लायक ट्रेड हिस्ट्री नहीं है।',
    realizedTitle: 'सिंबल के हिसाब से Realized P&L (जल्दी बेच दिया / सही समय पर निकले)',
    distributionTitle: 'होल्डिंग वैल्यू मिक्स (टॉप 10)',
    convertedNote: '{{currency}} में कन्वर्ट करके दिखाया गया है',
    noPnlData: 'अभी P&L डेटा नहीं है।',
    noHoldings: 'अभी कोई ओपन होल्डिंग नहीं है।',
    legendConverted: '{{label}} (कन्वर्टेड)',
    costSeries: 'क्यूम्युलेटिव कॉस्ट बेसिस',
    realizedSeries: 'क्यूम्युलेटिव Realized P&L',
    ifSoldSeries: 'अगर आज बेचते',
    actualSeries: 'असल में Realized',
    others: 'बाकी'
  },
  table: {
    title: 'सिंबल के हिसाब से ट्रेड हिस्ट्री',
    subtitle: 'किसी row को खोलकर buy और sell lots देखो। अमाउंट उसी listing currency में रहते हैं।',
    columns: {
      symbol: 'सिंबल / नाम (मार्केट · करेंसी)',
      holdingQty: 'मौजूदा शेयर',
      currentValue: 'लास्ट प्राइस / मार्केट वैल्यू',
      unrealized: 'Unrealized P&L',
      realized: 'Realized P&L',
      ifSoldToday: 'अगर आज बेचते',
      date: 'तारीख',
      type: 'टाइप',
      quantity: 'क्वांटिटी',
      price: 'प्राइस',
      amount: 'अमाउंट',
      pnl: 'P&L',
      actions: 'एक्शन'
    },
    manualBadge: 'मैनुअल',
    manualUpdatedAt: 'मैनुअल ओवरराइड: {{value}}',
    apiUpdatedAt: 'API रिफ्रेश: {{value}}',
    notUpdatedYet: 'अभी तक रिफ्रेश नहीं हुआ',
    manualNamePlaceholder: 'मैनुअल नाम',
    currentPricePlaceholder: 'प्राइस',
    hedgeSuccess: 'पहले निकलना इस बार सही पड़ा ({{value}})',
    soldTooEarly: 'थोड़ा जल्दी बेच दिया, {{value}} छूट गया',
    tradeDetails: 'एक्जीक्यूशन डिटेल्स',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} शेयर @ {{price}}',
    mobileHoldingQty: 'होल्डिंग',
    mobileUnrealized: 'अनरियलाइज़्ड',
    mobileRealized: 'रियलाइज़्ड'
  },
  manager: {
    title: 'सेटिंग्स और ट्रेड लॉग',
    clearAndLoadDemo: 'डेटा साफ करें और डेमो लोड करें',
    apiKeyTitle: 'yfapi.net API key',
    getFreeApiKey: 'फ्री में लें',
    apiKeyPlaceholder: 'अपना x-api-key यहां पेस्ट करें (जैसे: A2sD8...)',
    saveApiKey: 'API key सेव करें',
    baseCurrencyTitle: 'समरी बेस करेंसी',
    baseCurrencyHelp: '* सभी विदेशी एसेट्स लाइव FX के जरिए इस बेस करेंसी में बदले जाते हैं, ताकि ऊपर वाली summary cards में कुल जोड़ साफ-साफ दिखे।',
    hideZeroHolding: 'पूरी तरह exit हो चुकी holdings छिपाएं',
    manualRecordTitle: 'मैनुअल ट्रेड जोड़ें',
    fields: {
      date: 'तारीख',
      type: 'टाइप',
      market: 'मार्केट',
      symbol: 'सिंबल',
      quantity: 'क्वांटिटी',
      price: 'यूनिट प्राइस',
      amount: 'कुल अमाउंट',
      pnl: 'Realized P&L (सिर्फ sell)'
    },
    placeholders: {
      symbol: 'जैसे: AAPL',
      quantity: 'शेयर',
      price: 'प्रति शेयर कीमत',
      amount: 'उस मार्केट की करेंसी में',
      pnl: 'वैकल्पिक'
    },
    saveChanges: 'बदलाव सेव करें',
    addRecord: 'जोड़ें',
    noRecords: 'अभी कोई ट्रेड रिकॉर्ड नहीं है।'
  },
  notice: {
    title: 'Trade Lens में स्वागत है',
    body: 'Trade Lens एक open-source टूल है जो broker CSV को cost trends, P&L views और allocation charts में बदल देता है।',
    privacy: 'प्राइवेसी पहले: सब कुछ सिर्फ आपके ब्राउज़र (IndexedDB) में रहता है। हमारे सर्वर पर कुछ नहीं जाता।',
    apiKey: 'API key सिर्फ yfapi.net से price lookup के लिए है, और वह भी लोकल में ही रहता है।',
    sourceCode: 'ओपन सोर्स: कोड देखें और योगदान दें',
    dismiss: 'फिर मत दिखाना'
  },
  messages: {
    apiKeySaved: 'API key सेव हो गई।',
    manualStockSaved: '{{symbol}} को मैनुअली अपडेट कर दिया गया।',
    needApiKey: 'कोट्स रिफ्रेश करने से पहले settings panel में अपना yfapi.net API key डालें।',
    cacheFresh: 'पिछले 24 घंटों में prices और FX rates अपडेट हो चुके थे, इसलिए app ने quota बचाने के लिए local cache इस्तेमाल किया।',
    updateSuccess: '{{count}} quotes और FX rates अपडेट हो गए।',
    fetchFailed: 'Fetch फेल हुआ: {{message}}',
    baseCurrencyChanged: 'Base currency अब {{currency}} है। FX rates रिफ्रेश हो रहे हैं...',
    recordUpdated: 'ट्रेड रिकॉर्ड अपडेट हो गया।',
    dataCleared: 'डेटा साफ कर दिया गया और demo records लोड कर दिए गए।',
    clearConfirm: 'सारा डेटा साफ करके demo set फिर से लोड करना है? यह वापस नहीं होगा।',
    backupConfirm: 'साफ करने से पहले क्या मौजूदा डेटा को CSV backup के रूप में एक्सपोर्ट करना है?'
  },
  data: {
    unknownSymbol: 'अज्ञात सिंबल ({{symbol}})',
    unknown: 'अज्ञात'
  }
};

const ruRU = {
  ...enUS,
  common: {
    language: 'Язык',
    close: 'Закрыть',
    cancel: 'Отмена',
    save: 'Сохранить',
    edit: 'Редактировать',
    delete: 'Удалить',
    importCsv: 'Импорт CSV',
    exportCsv: 'Экспорт CSV'
  },
  currencies: {
    TWD: 'Новый тайваньский доллар (TWD)',
    CNY: 'Китайский юань (CNY)',
    HKD: 'Гонконгский доллар (HKD)',
    USD: 'Доллар США (USD)',
    JPY: 'Японская иена (JPY)',
    RUB: 'Российский рубль (RUB)'
  },
  markets: {
    all: 'Все',
    chinaA: 'Китайские A-акции',
    hongKong: 'Гонконг',
    taiwan: 'Тайвань',
    japan: 'Япония',
    us: 'США',
    other: 'Другое',
    unknown: 'Неизвестно'
  },
  tradeTypes: {
    buy: 'Покупка',
    sell: 'Продажа'
  },
  timeRanges: {
    oneWeek: '1 нед.',
    oneMonth: '1 мес.',
    threeMonths: '3 мес.',
    halfYear: '6 мес.',
    ytd: 'YTD',
    oneYear: '1 год',
    fiveYears: '5 лет',
    all: 'Все'
  },
  app: {
    loadingLocalData: 'Загрузка локальных данных IndexedDB...',
    generatingImage: 'Генерация изображения...',
    imageExportSuccess: 'Изображение успешно экспортировано.',
    imageExportFail: 'Не удалось экспортировать изображение.',
    noDataToExport: 'Сейчас нечего экспортировать.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Глобальная панель портфеля',
    demoDescription: 'Сейчас показан укороченный демо-набор. Импортируйте полный CSV, чтобы увидеть всю картину.',
    recordsLoaded: 'Загружено и проанализировано {{count}} сделок.',
    lastUpdated: 'Последнее обновление: {{value}}',
    switchToLight: 'Переключить на светлую тему',
    switchToDark: 'Переключить на тёмную тему',
    settingsRecords: 'Настройки и сделки',
    updatePrices: 'Обновить котировки',
    apiKeyRequired: 'Нужен API key',
    updateWithCache: 'Обновить котировки с кэшем',
    setApiKeyFirst: 'Сначала укажите API key',
    forceRefresh: 'Принудительное обновление',
    forceRefreshTitle: 'Игнорировать кэш и тратить реальную квоту API',
    languageLabel: 'Сменить язык',
    csvTitle: 'Подсказка по CSV',
    csvIntro: 'Убедитесь, что в CSV есть как минимум эти заголовки. Порядок не важен:',
    csvRows: {
      date: 'Дата (например: 2025/01/01)',
      type: 'Тип (Покупка / Продажа)',
      symbol: 'Тикер (например: AAPL, 0700.HK)',
      market: 'Рынок (необязательно, полезно для ручного ввода)',
      quantity: 'Количество',
      price: 'Цена за единицу (исходная валюта)',
      amount: 'Итоговая сумма (исходная валюта)',
      pnl: 'P&L (обязательно для продажи, исходная валюта)'
    },
    csvNote1: '* Примечание 1: шестизначные тикеры, начинающиеся с 6 или 0, автоматически распознаются как китайские A-акции (.SS / .SZ).',
    csvNote2: '* Примечание 2: для других рынков просто добавьте к тикеру суффикс, например .TW или .HK.',
    forceRefreshConfirm: 'Выполнить принудительное обновление? 24-часовой кэш будет проигнорирован, а реальная квота API будет потрачена.'
  },
  summary: {
    totalRealized: 'Суммарный реализованный P&L (после конвертации)',
    totalUnrealized: 'Суммарный нереализованный P&L (после конвертации)',
    totalValue: 'Текущая стоимость портфеля (после конвертации)',
    holdingCount: 'Открытые позиции',
    holdingUnit: 'позиции'
  },
  charts: {
    trendTitle: 'Тренд накопленной себестоимости',
    saveImage: 'Сохранить график как изображение',
    noTrend: 'Пока недостаточно истории сделок, чтобы построить график.',
    realizedTitle: 'Реализованный P&L по тикеру (продали рано / вышли вовремя)',
    distributionTitle: 'Структура стоимости портфеля (топ 10)',
    convertedNote: 'Показано после конвертации в {{currency}}',
    noPnlData: 'Данных по P&L пока нет.',
    noHoldings: 'Сейчас открытых позиций нет.',
    legendConverted: '{{label}} (после конвертации)',
    costSeries: 'Накопленная себестоимость',
    realizedSeries: 'Накопленный реализованный P&L',
    ifSoldSeries: 'Если бы продали сегодня',
    actualSeries: 'Фактически реализовано',
    others: 'Прочее'
  },
  table: {
    title: 'История сделок по тикеру',
    subtitle: 'Откройте строку, чтобы посмотреть покупки и продажи по лотам. Суммы остаются в валюте листинга.',
    columns: {
      symbol: 'Тикер / название (рынок · валюта)',
      holdingQty: 'Текущий объём',
      currentValue: 'Последняя цена / рыночная стоимость',
      unrealized: 'Нереализованный P&L',
      realized: 'Реализованный P&L',
      ifSoldToday: 'Если бы продали сегодня',
      date: 'Дата',
      type: 'Тип',
      quantity: 'Количество',
      price: 'Цена',
      amount: 'Сумма',
      pnl: 'P&L',
      actions: 'Действия'
    },
    manualBadge: 'Вручную',
    manualUpdatedAt: 'Ручная корректировка: {{value}}',
    apiUpdatedAt: 'API обновлён: {{value}}',
    notUpdatedYet: 'Ещё не обновлялось',
    manualNamePlaceholder: 'Название вручную',
    currentPricePlaceholder: 'Цена',
    hedgeSuccess: 'Раньше выйти оказалось выгоднее ({{value}})',
    soldTooEarly: 'Продали рановато и оставили {{value}} на столе',
    tradeDetails: 'Детали сделок',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} акций @ {{price}}',
    mobileHoldingQty: 'Позиция',
    mobileUnrealized: 'Нереализ.',
    mobileRealized: 'Реализ.'
  },
  manager: {
    title: 'Настройки и журнал сделок',
    clearAndLoadDemo: 'Очистить и загрузить демо-данные',
    apiKeyTitle: 'API key от yfapi.net',
    getFreeApiKey: 'Получить бесплатно',
    apiKeyPlaceholder: 'Вставьте сюда свой x-api-key (например: A2sD8...)',
    saveApiKey: 'Сохранить API key',
    baseCurrencyTitle: 'Базовая валюта сводки',
    baseCurrencyHelp: '* Все активы в иностранной валюте пересчитываются в эту базовую валюту по актуальному FX, чтобы верхние карточки корректно суммировали общий результат.',
    hideZeroHolding: 'Скрыть полностью закрытые позиции',
    manualRecordTitle: 'Добавить сделку вручную',
    fields: {
      date: 'Дата',
      type: 'Тип',
      market: 'Рынок',
      symbol: 'Тикер',
      quantity: 'Количество',
      price: 'Цена за единицу',
      amount: 'Итоговая сумма',
      pnl: 'Реализованный P&L (только продажа)'
    },
    placeholders: {
      symbol: 'Например: AAPL',
      quantity: 'Акции',
      price: 'Цена за акцию',
      amount: 'В валюте этого рынка',
      pnl: 'Необязательно'
    },
    saveChanges: 'Сохранить изменения',
    addRecord: 'Добавить',
    noRecords: 'Пока нет ни одной сделки.'
  },
  notice: {
    title: 'Добро пожаловать в Trade Lens',
    body: 'Trade Lens — это open-source инструмент для инвесторов, который превращает брокерские CSV в понятные графики себестоимости, P&L и структуры портфеля.',
    privacy: 'Сначала приватность: всё остаётся только в вашем браузере (IndexedDB). На сервер ничего не отправляется.',
    apiKey: 'API key нужен только для запросов цен к yfapi.net и тоже хранится локально.',
    sourceCode: 'Open source: смотрите код и подключайтесь',
    dismiss: 'Больше не показывать'
  },
  messages: {
    apiKeySaved: 'API key сохранён.',
    manualStockSaved: '{{symbol}} обновлён вручную.',
    needApiKey: 'Введите API key от yfapi.net в панели настроек, прежде чем обновлять котировки.',
    cacheFresh: 'Цены и FX уже обновлялись за последние 24 часа, поэтому приложение использовало локальный кэш, чтобы не тратить квоту.',
    updateSuccess: 'Обновлены {{count}} котировок и FX-ставок.',
    fetchFailed: 'Ошибка загрузки: {{message}}',
    baseCurrencyChanged: 'Базовая валюта переключена на {{currency}}. Обновляем FX...',
    recordUpdated: 'Сделка обновлена.',
    dataCleared: 'Данные очищены, демо-набор загружен.',
    clearConfirm: 'Очистить все данные и снова загрузить демо-набор? Это действие нельзя отменить.',
    backupConfirm: 'Хотите перед очисткой выгрузить текущие данные в CSV как резервную копию?'
  },
  data: {
    unknownSymbol: 'Неизвестный тикер ({{symbol}})',
    unknown: 'Неизвестно'
  }
};

const faIR = {
  common: {
    language: 'زبان',
    close: 'بستن',
    cancel: 'انصراف',
    save: 'ذخیره',
    edit: 'ویرایش',
    delete: 'حذف',
    importCsv: 'وارد کردن CSV',
    exportCsv: 'خروجی CSV'
  },
  currencies: {
    TWD: 'دلار جدید تایوان (TWD)',
    CNY: 'یوان چین (CNY)',
    HKD: 'دلار هنگ‌کنگ (HKD)',
    USD: 'دلار آمریکا (USD)',
    JPY: 'ین ژاپن (JPY)',
    IRR: 'ریال ایران (IRR)'
  },
  markets: {
    all: 'همه',
    chinaA: 'سهام A چین',
    hongKong: 'هنگ‌کنگ',
    taiwan: 'تایوان',
    japan: 'ژاپن',
    us: 'آمریکا',
    other: 'سایر',
    unknown: 'نامشخص'
  },
  tradeTypes: {
    buy: 'خرید',
    sell: 'فروش'
  },
  timeRanges: {
    oneWeek: '۱ هفته',
    oneMonth: '۱ ماه',
    threeMonths: '۳ ماه',
    halfYear: '۶ ماه',
    ytd: 'از ابتدای سال',
    oneYear: '۱ سال',
    fiveYears: '۵ سال',
    all: 'همه'
  },
  app: {
    loadingLocalData: 'در حال بارگذاری داده‌های محلی IndexedDB...',
    generatingImage: 'در حال ساخت تصویر...',
    imageExportSuccess: 'تصویر با موفقیت خروجی گرفته شد.',
    imageExportFail: 'گرفتن خروجی تصویر ناموفق بود.',
    noDataToExport: 'فعلاً داده‌ای برای خروجی گرفتن وجود ندارد.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'داشبورد پرتفوی جهانی',
    demoDescription: 'الان فقط یک دیتاست نمونه و سبک نمایش داده می‌شود. برای دیدن تصویر کامل، CSV اصلی‌تان را وارد کنید.',
    recordsLoaded: '{{count}} رکورد معاملاتی بارگذاری و تحلیل شد.',
    lastUpdated: 'آخرین به‌روزرسانی: {{value}}',
    switchToLight: 'رفتن به حالت روشن',
    switchToDark: 'رفتن به حالت تیره',
    settingsRecords: 'تنظیمات و معاملات',
    updatePrices: 'به‌روزرسانی قیمت‌ها',
    apiKeyRequired: 'API key لازم است',
    updateWithCache: 'به‌روزرسانی قیمت با استفاده از کش',
    setApiKeyFirst: 'اول API key را وارد کنید',
    forceRefresh: 'نوسازی اجباری',
    forceRefreshTitle: 'نادیده گرفتن کش و مصرف سهمیه واقعی API',
    languageLabel: 'تغییر زبان',
    csvTitle: 'راهنمای ستون‌های CSV',
    csvIntro: 'مطمئن شوید CSV حداقل این سرستون‌ها را دارد. ترتیب مهم نیست:',
    csvRows: {
      date: 'تاریخ (مثلاً 2025/01/01)',
      type: 'نوع (خرید / فروش)',
      symbol: 'نماد (مثلاً AAPL یا 0700.HK)',
      market: 'بازار (اختیاری، برای ثبت دستی به درد می‌خورد)',
      quantity: 'تعداد',
      price: 'قیمت واحد (ارز اصلی)',
      amount: 'مبلغ کل (ارز اصلی)',
      pnl: 'سود/زیان (برای فروش لازم است، ارز اصلی)'
    },
    csvNote1: '* نکته ۱: نمادهای ۶ رقمی که با ۶ یا ۰ شروع شوند، خودکار به‌عنوان سهام A چین (.SS / .SZ) تشخیص داده می‌شوند.',
    csvNote2: '* نکته ۲: برای بقیه بازارها، پسوند را مستقیم به نماد اضافه کنید؛ مثل .TW یا .HK.',
    forceRefreshConfirm: 'از نوسازی اجباری مطمئنید؟ کش ۲۴ ساعته نادیده گرفته می‌شود و سهمیه واقعی API مصرف خواهد شد.'
  },
  summary: {
    totalRealized: 'سود و زیان تحقق‌یافته کل (پس از تبدیل)',
    totalUnrealized: 'سود و زیان تحقق‌نیافته کل (پس از تبدیل)',
    totalValue: 'ارزش فعلی دارایی‌ها (پس از تبدیل)',
    holdingCount: 'تعداد موقعیت‌های باز',
    holdingUnit: 'موقعیت'
  },
  charts: {
    trendTitle: 'روند تجمعی بهای تمام‌شده',
    saveImage: 'ذخیره نمودار به‌صورت تصویر',
    noTrend: 'فعلاً سابقه معامله کافی نیست که روند رسم شود.',
    realizedTitle: 'سود و زیان تحقق‌یافته به تفکیک نماد (فروش زودهنگام / خروج به‌موقع)',
    distributionTitle: 'ترکیب ارزش پرتفوی (۱۰ نماد برتر)',
    convertedNote: 'نمایش پس از تبدیل به {{currency}}',
    noPnlData: 'هنوز داده‌ای برای سود و زیان نداریم.',
    noHoldings: 'الان موقعیت بازی وجود ندارد.',
    legendConverted: '{{label}} (تبدیل‌شده)',
    costSeries: 'بهای تمام‌شده تجمعی',
    realizedSeries: 'سود و زیان تحقق‌یافته تجمعی',
    ifSoldSeries: 'اگر امروز می‌فروختید',
    actualSeries: 'تحقق‌یافته واقعی',
    others: 'سایر'
  },
  table: {
    title: 'تاریخچه معاملات به تفکیک نماد',
    subtitle: 'با باز کردن هر ردیف، جزئیات خرید و فروش را می‌بینید. مبلغ‌ها در ارز اصلی همان بازار نمایش داده می‌شوند.',
    columns: {
      symbol: 'نماد / نام (بازار · ارز)',
      holdingQty: 'تعداد فعلی',
      currentValue: 'آخرین قیمت / ارزش بازار',
      unrealized: 'سود و زیان تحقق‌نیافته',
      realized: 'سود و زیان تحقق‌یافته',
      ifSoldToday: 'اگر امروز فروخته می‌شد',
      date: 'تاریخ',
      type: 'نوع',
      quantity: 'تعداد',
      price: 'قیمت',
      amount: 'مبلغ',
      pnl: 'سود/زیان',
      actions: 'اقدامات'
    },
    manualBadge: 'دستی',
    manualUpdatedAt: 'اصلاح دستی: {{value}}',
    apiUpdatedAt: 'آخرین به‌روزرسانی API: {{value}}',
    notUpdatedYet: 'هنوز به‌روزرسانی نشده',
    manualNamePlaceholder: 'نام دستی',
    currentPricePlaceholder: 'قیمت',
    hedgeSuccess: 'فروش زودتر این دفعه بهتر جواب داد ({{value}})',
    soldTooEarly: 'زود فروختید و {{value}} جا گذاشتید',
    tradeDetails: 'جزئیات معامله',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} سهم @ {{price}}',
    mobileHoldingQty: 'موقعیت',
    mobileUnrealized: 'تحقق‌نیافته',
    mobileRealized: 'تحقق‌یافته'
  },
  manager: {
    title: 'تنظیمات و دفتر معاملات',
    clearAndLoadDemo: 'پاک کردن و بارگذاری دیتای نمونه',
    apiKeyTitle: 'API key سرویس yfapi.net',
    getFreeApiKey: 'رایگان بگیر',
    apiKeyPlaceholder: 'x-api-key خودتان را اینجا وارد کنید (مثلاً: A2sD8...)',
    saveApiKey: 'ذخیره API key',
    baseCurrencyTitle: 'ارز پایه کارت‌های خلاصه',
    baseCurrencyHelp: '* همه دارایی‌های ارزی با نرخ زنده FX به این ارز پایه تبدیل می‌شوند تا کارت‌های بالای صفحه مجموع درستی نشان بدهند.',
    hideZeroHolding: 'پنهان کردن موقعیت‌های کاملاً بسته‌شده',
    manualRecordTitle: 'ثبت معامله به‌صورت دستی',
    fields: {
      date: 'تاریخ',
      type: 'نوع',
      market: 'بازار',
      symbol: 'نماد',
      quantity: 'تعداد',
      price: 'قیمت واحد',
      amount: 'مبلغ کل',
      pnl: 'سود/زیان تحقق‌یافته (فقط فروش)'
    },
    placeholders: {
      symbol: 'مثلاً: AAPL',
      quantity: 'تعداد سهم',
      price: 'قیمت هر سهم',
      amount: 'بر اساس ارز همان بازار',
      pnl: 'اختیاری'
    },
    saveChanges: 'ذخیره تغییرات',
    addRecord: 'افزودن',
    noRecords: 'هنوز رکوردی وجود ندارد.'
  },
  notice: {
    title: 'به Trade Lens خوش آمدید',
    body: 'Trade Lens یک ابزار متن‌باز برای سرمایه‌گذارهاست که CSV کارگزاری را به نمودار هزینه، نمای سود و زیان و ترکیب پرتفوی تبدیل می‌کند.',
    privacy: 'اولویت با حریم خصوصی است: همه‌چیز فقط داخل مرورگر شما (IndexedDB) می‌ماند و چیزی به سرور ارسال نمی‌شود.',
    apiKey: 'API key فقط برای گرفتن قیمت از yfapi.net استفاده می‌شود و همان هم محلی ذخیره می‌شود.',
    sourceCode: 'متن‌باز: کد را ببینید و مشارکت کنید',
    dismiss: 'دیگر نشان نده'
  },
  messages: {
    apiKeySaved: 'API key ذخیره شد.',
    manualStockSaved: '{{symbol}} به‌صورت دستی به‌روزرسانی شد.',
    needApiKey: 'قبل از به‌روزرسانی قیمت‌ها، API key مربوط به yfapi.net را در پنل تنظیمات وارد کنید.',
    cacheFresh: 'قیمت‌ها و نرخ‌های FX در ۲۴ ساعت گذشته به‌روزرسانی شده بودند؛ برای صرفه‌جویی در سهمیه، از کش محلی استفاده شد.',
    updateSuccess: '{{count}} قیمت و نرخ FX به‌روزرسانی شد.',
    fetchFailed: 'دریافت داده ناموفق بود: {{message}}',
    baseCurrencyChanged: 'ارز پایه به {{currency}} تغییر کرد. در حال نوسازی نرخ‌های FX...',
    recordUpdated: 'رکورد معامله به‌روزرسانی شد.',
    dataCleared: 'داده‌ها پاک شد و دیتای نمونه دوباره بارگذاری شد.',
    clearConfirm: 'همه داده‌ها پاک شود و مجموعه نمونه دوباره لود شود؟ این کار قابل بازگشت نیست.',
    backupConfirm: 'قبل از پاک کردن، می‌خواهید از داده‌های فعلی یک CSV پشتیبان بگیرید؟'
  },
  data: {
    unknownSymbol: 'نماد ناشناخته ({{symbol}})',
    unknown: 'نامشخص'
  }
};

const heIL = {
  common: {
    language: 'שפה',
    close: 'סגור',
    cancel: 'ביטול',
    save: 'שמור',
    edit: 'ערוך',
    delete: 'מחק',
    importCsv: 'ייבוא CSV',
    exportCsv: 'ייצוא CSV'
  },
  currencies: {
    TWD: 'דולר טאיוואני חדש (TWD)',
    CNY: 'יואן סיני (CNY)',
    HKD: 'דולר הונג קונגי (HKD)',
    USD: 'דולר אמריקאי (USD)',
    JPY: 'ין יפני (JPY)',
    ILS: 'שקל חדש (ILS)'
  },
  markets: {
    all: 'הכול',
    chinaA: 'מניות A בסין',
    hongKong: 'הונג קונג',
    taiwan: 'טאיוואן',
    japan: 'יפן',
    us: 'ארה"ב',
    other: 'אחר',
    unknown: 'לא ידוע'
  },
  tradeTypes: {
    buy: 'קנייה',
    sell: 'מכירה'
  },
  timeRanges: {
    oneWeek: 'שבוע',
    oneMonth: 'חודש',
    threeMonths: '3 חודשים',
    halfYear: 'חצי שנה',
    ytd: 'מתחילת השנה',
    oneYear: 'שנה',
    fiveYears: '5 שנים',
    all: 'הכול'
  },
  app: {
    loadingLocalData: 'טוען נתוני IndexedDB מקומיים...',
    generatingImage: 'מייצר תמונה...',
    imageExportSuccess: 'התמונה יוצאה בהצלחה.',
    imageExportFail: 'ייצוא התמונה נכשל.',
    noDataToExport: 'אין כרגע נתונים לייצוא.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'דשבורד תיק השקעות גלובלי',
    demoDescription: 'כרגע מוצגת רק גרסת דמו מצומצמת. ייבא את קובץ ה-CSV המלא כדי לראות את כל התמונה.',
    recordsLoaded: '{{count}} פעולות מסחר נטענו ונותחו.',
    lastUpdated: 'עודכן לאחרונה: {{value}}',
    switchToLight: 'לעבור למצב בהיר',
    switchToDark: 'לעבור למצב כהה',
    settingsRecords: 'הגדרות ועסקאות',
    updatePrices: 'רענון מחירים',
    apiKeyRequired: 'נדרש API key',
    updateWithCache: 'רענון מחירים עם קאש',
    setApiKeyFirst: 'קודם יש להגדיר API key',
    forceRefresh: 'רענון כפוי',
    forceRefreshTitle: 'התעלמות מהקאש וצריכת מכסת API אמיתית',
    languageLabel: 'החלפת שפה',
    csvTitle: 'מדריך שדות CSV',
    csvIntro: 'ודא שלקובץ ה-CSV יש לפחות את הכותרות האלה. הסדר לא משנה:',
    csvRows: {
      date: 'תאריך (למשל: 2025/01/01)',
      type: 'סוג (קנייה / מכירה)',
      symbol: 'סימול (למשל: AAPL או 0700.HK)',
      market: 'שוק (אופציונלי, שימושי להזנה ידנית)',
      quantity: 'כמות',
      price: 'מחיר ליחידה (במטבע המקורי)',
      amount: 'סכום כולל (במטבע המקורי)',
      pnl: 'רווח/הפסד (חובה במכירה, במטבע המקורי)'
    },
    csvNote1: '* הערה 1: סימולים בני 6 ספרות שמתחילים ב-6 או 0 מזוהים אוטומטית כמניות A סיניות (.SS / .SZ).',
    csvNote2: '* הערה 2: בשווקים אחרים פשוט מוסיפים סיומת לסימול, למשל .TW או .HK.',
    forceRefreshConfirm: 'לבצע רענון כפוי? זה יתעלם מקאש של 24 שעות ויצרוך מכסת API אמיתית.'
  },
  summary: {
    totalRealized: 'סה"כ רווח/הפסד ממומש (לאחר המרה)',
    totalUnrealized: 'סה"כ רווח/הפסד לא ממומש (לאחר המרה)',
    totalValue: 'שווי החזקות נוכחי (לאחר המרה)',
    holdingCount: 'פוזיציות פתוחות',
    holdingUnit: 'פוזיציות'
  },
  charts: {
    trendTitle: 'מגמת עלות מצטברת',
    saveImage: 'שמור גרף כתמונה',
    noTrend: 'עדיין אין מספיק היסטוריית מסחר כדי לצייר מגמה.',
    realizedTitle: 'רווח/הפסד ממומש לפי סימול (מכירה מוקדמת / יציאה בזמן)',
    distributionTitle: 'התפלגות שווי התיק (10 הגדולות)',
    convertedNote: 'מוצג לאחר המרה ל-{{currency}}',
    noPnlData: 'עדיין אין נתוני רווח/הפסד.',
    noHoldings: 'כרגע אין החזקות פתוחות.',
    legendConverted: '{{label}} (לאחר המרה)',
    costSeries: 'עלות מצטברת',
    realizedSeries: 'רווח/הפסד ממומש מצטבר',
    ifSoldSeries: 'אם היית מוכר היום',
    actualSeries: 'ממומש בפועל',
    others: 'אחרים'
  },
  table: {
    title: 'היסטוריית מסחר לפי סימול',
    subtitle: 'פתח שורה כדי לראות פירוט קניות ומכירות. הסכומים נשארים במטבע המקורי של אותו שוק.',
    columns: {
      symbol: 'סימול / שם (שוק · מטבע)',
      holdingQty: 'כמות נוכחית',
      currentValue: 'מחיר אחרון / שווי שוק',
      unrealized: 'רווח/הפסד לא ממומש',
      realized: 'רווח/הפסד ממומש',
      ifSoldToday: 'אם היה נמכר היום',
      date: 'תאריך',
      type: 'סוג',
      quantity: 'כמות',
      price: 'מחיר',
      amount: 'סכום',
      pnl: 'רווח/הפסד',
      actions: 'פעולות'
    },
    manualBadge: 'ידני',
    manualUpdatedAt: 'עודכן ידנית: {{value}}',
    apiUpdatedAt: 'עודכן דרך API: {{value}}',
    notUpdatedYet: 'עדיין לא עודכן',
    manualNamePlaceholder: 'שם ידני',
    currentPricePlaceholder: 'מחיר',
    hedgeSuccess: 'לצאת מוקדם יותר דווקא היה מהלך טוב ({{value}})',
    soldTooEarly: 'מכרת מוקדם מדי והשארת {{value}} על השולחן',
    tradeDetails: 'פירוט עסקאות',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} מניות @ {{price}}',
    mobileHoldingQty: 'פוזיציה',
    mobileUnrealized: 'לא ממומש',
    mobileRealized: 'ממומש'
  },
  manager: {
    title: 'הגדרות ויומן עסקאות',
    clearAndLoadDemo: 'נקה וטען נתוני דמו',
    apiKeyTitle: 'API key של yfapi.net',
    getFreeApiKey: 'קבל בחינם',
    apiKeyPlaceholder: 'הדבק כאן את ה-x-api-key שלך (למשל: A2sD8...)',
    saveApiKey: 'שמור API key',
    baseCurrencyTitle: 'מטבע בסיס לכרטיסי הסיכום',
    baseCurrencyHelp: '* כל נכס במטבע זר מומר למטבע הבסיס הזה לפי FX חי, כדי שכרטיסי הסיכום למעלה יציגו חיבור נקי.',
    hideZeroHolding: 'הסתר פוזיציות שנסגרו לגמרי',
    manualRecordTitle: 'הוסף עסקה ידנית',
    fields: {
      date: 'תאריך',
      type: 'סוג',
      market: 'שוק',
      symbol: 'סימול',
      quantity: 'כמות',
      price: 'מחיר ליחידה',
      amount: 'סכום כולל',
      pnl: 'רווח/הפסד ממומש (רק במכירה)'
    },
    placeholders: {
      symbol: 'למשל: AAPL',
      quantity: 'מניות',
      price: 'מחיר למניה',
      amount: 'במטבע של אותו שוק',
      pnl: 'אופציונלי'
    },
    saveChanges: 'שמור שינויים',
    addRecord: 'הוסף',
    noRecords: 'עדיין אין עסקאות.'
  },
  notice: {
    title: 'ברוכים הבאים ל-Trade Lens',
    body: 'Trade Lens הוא כלי קוד פתוח למשקיעים, שהופך CSV של ברוקר לגרפי עלות, תצוגות רווח/הפסד ותמונת תיק הרבה יותר ברורה.',
    privacy: 'פרטיות לפני הכול: הכול נשמר רק בדפדפן שלך (IndexedDB). שום דבר לא נשלח לשרת.',
    apiKey: 'ה-API key משמש רק לשליפת מחירים מ-yfapi.net וגם הוא נשמר מקומית.',
    sourceCode: 'קוד פתוח: היכנס לקוד ותרום',
    dismiss: 'אל תציג שוב'
  },
  messages: {
    apiKeySaved: 'ה-API key נשמר.',
    manualStockSaved: '{{symbol}} עודכן ידנית.',
    needApiKey: 'יש להזין API key של yfapi.net בפאנל ההגדרות לפני שמרעננים מחירים.',
    cacheFresh: 'המחירים ושערי ה-FX עודכנו ב-24 השעות האחרונות, לכן האפליקציה השתמשה בקאש המקומי כדי לחסוך מכסה.',
    updateSuccess: '{{count}} מחירים ושערי FX עודכנו.',
    fetchFailed: 'שגיאה בטעינה: {{message}}',
    baseCurrencyChanged: 'מטבע הבסיס הוחלף ל-{{currency}}. מרעננים עכשיו שערי FX...',
    recordUpdated: 'רשומת המסחר עודכנה.',
    dataCleared: 'הנתונים נוקו ונתוני הדמו נטענו מחדש.',
    clearConfirm: 'לנקות את כל הנתונים ולטעון מחדש את סט הדמו? אי אפשר לבטל את הפעולה הזו.',
    backupConfirm: 'רוצה לייצא קודם את הנתונים הנוכחיים כגיבוי CSV לפני הניקוי?'
  },
  data: {
    unknownSymbol: 'סימול לא מוכר ({{symbol}})',
    unknown: 'לא ידוע'
  }
};

const svSE = {
  common: {
    language: 'Språk',
    close: 'Stäng',
    cancel: 'Avbryt',
    save: 'Spara',
    edit: 'Redigera',
    delete: 'Ta bort',
    importCsv: 'Importera CSV',
    exportCsv: 'Exportera CSV'
  },
  currencies: {
    TWD: 'Taiwandollar (TWD)',
    CNY: 'Kinesisk yuan (CNY)',
    HKD: 'Hongkongdollar (HKD)',
    USD: 'Amerikansk dollar (USD)',
    JPY: 'Japansk yen (JPY)',
    SEK: 'Svensk krona (SEK)'
  },
  markets: {
    all: 'Alla',
    chinaA: 'Kina A-aktier',
    hongKong: 'Hongkong',
    taiwan: 'Taiwan',
    japan: 'Japan',
    us: 'USA',
    other: 'Övrigt',
    unknown: 'Okänt'
  },
  tradeTypes: {
    buy: 'Köp',
    sell: 'Sälj'
  },
  timeRanges: {
    oneWeek: '1 v',
    oneMonth: '1 mån',
    threeMonths: '3 mån',
    halfYear: '6 mån',
    ytd: 'YTD',
    oneYear: '1 år',
    fiveYears: '5 år',
    all: 'Alla'
  },
  app: {
    loadingLocalData: 'Laddar lokala IndexedDB-data...',
    generatingImage: 'Skapar bild...',
    imageExportSuccess: 'Bilden exporterades.',
    imageExportFail: 'Det gick inte att exportera bilden.',
    noDataToExport: 'Det finns inga data att exportera just nu.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Global portföljpanel',
    demoDescription: 'Just nu visas bara en nedbantad demouppsättning. Importera hela din CSV för att se hela läget.',
    recordsLoaded: '{{count}} affärer har laddats in och analyserats.',
    lastUpdated: 'Senast uppdaterad: {{value}}',
    switchToLight: 'Byt till ljust läge',
    switchToDark: 'Byt till mörkt läge',
    settingsRecords: 'Inställningar och affärer',
    updatePrices: 'Uppdatera kurser',
    apiKeyRequired: 'API-nyckel krävs',
    updateWithCache: 'Uppdatera kurser med cache',
    setApiKeyFirst: 'Lägg in API-nyckeln först',
    forceRefresh: 'Tvinga uppdatering',
    forceRefreshTitle: 'Ignorera cache och bränn riktig API-kvot',
    languageLabel: 'Byt språk',
    csvTitle: 'Guide till CSV-fält',
    csvIntro: 'Se till att CSV-filen innehåller åtminstone dessa rubriker. Ordningen spelar ingen roll:',
    csvRows: {
      date: 'Datum (t.ex. 2025/01/01)',
      type: 'Typ (Köp / Sälj)',
      symbol: 'Ticker (t.ex. AAPL eller 0700.HK)',
      market: 'Marknad (valfritt, praktiskt vid manuell registrering)',
      quantity: 'Antal',
      price: 'Styckpris (ursprungsvaluta)',
      amount: 'Totalbelopp (ursprungsvaluta)',
      pnl: 'Vinst/Förlust (krävs vid försäljning, ursprungsvaluta)'
    },
    csvNote1: '* Not 1: Sexsiffriga tickers som börjar med 6 eller 0 tolkas automatiskt som kinesiska A-aktier (.SS / .SZ).',
    csvNote2: '* Not 2: För andra marknader lägger du till suffixet direkt på tickern, till exempel .TW eller .HK.',
    forceRefreshConfirm: 'Tvinga uppdatering? Det här ignorerar 24-timmarscachen och drar riktig API-kvot.'
  },
  summary: {
    totalRealized: 'Total realiserad P&L (omräknad)',
    totalUnrealized: 'Total orealiserad P&L (omräknad)',
    totalValue: 'Nuvarande portföljvärde (omräknat)',
    holdingCount: 'Öppna innehav',
    holdingUnit: 'innehav'
  },
  charts: {
    trendTitle: 'Kumulativ kostnadstrend',
    saveImage: 'Spara diagram som bild',
    noTrend: 'Det finns ännu inte tillräckligt med affärshistorik för att rita en trend.',
    realizedTitle: 'Realiserad P&L per innehav (sålde för tidigt / bra exit)',
    distributionTitle: 'Fördelning av portföljvärde (topp 10)',
    convertedNote: 'Visas efter omräkning till {{currency}}',
    noPnlData: 'Det finns ännu inga P&L-data.',
    noHoldings: 'Det finns inga öppna innehav just nu.',
    legendConverted: '{{label}} (omräknad)',
    costSeries: 'Kumulativ kostnadsbas',
    realizedSeries: 'Kumulativ realiserad P&L',
    ifSoldSeries: 'Om du sålde i dag',
    actualSeries: 'Faktiskt realiserad',
    others: 'Övriga'
  },
  table: {
    title: 'Affärshistorik per ticker',
    subtitle: 'Öppna en rad för att se köp- och säljdetaljer. Beloppen visas fortsatt i marknadens ursprungsvaluta.',
    columns: {
      symbol: 'Ticker / namn (marknad · valuta)',
      holdingQty: 'Nuvarande antal',
      currentValue: 'Senaste kurs / marknadsvärde',
      unrealized: 'Orealiserad P&L',
      realized: 'Realiserad P&L',
      ifSoldToday: 'Om såld i dag',
      date: 'Datum',
      type: 'Typ',
      quantity: 'Antal',
      price: 'Pris',
      amount: 'Belopp',
      pnl: 'P&L',
      actions: 'Åtgärder'
    },
    manualBadge: 'Manuell',
    manualUpdatedAt: 'Manuell justering: {{value}}',
    apiUpdatedAt: 'API uppdaterad: {{value}}',
    notUpdatedYet: 'Inte uppdaterad än',
    manualNamePlaceholder: 'Manuellt namn',
    currentPricePlaceholder: 'Pris',
    hedgeSuccess: 'Att kliva av tidigare visade sig vara rätt drag ({{value}})',
    soldTooEarly: 'Du sålde lite för tidigt och lämnade {{value}} kvar på bordet',
    tradeDetails: 'Affärsdetaljer',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} aktier @ {{price}}',
    mobileHoldingQty: 'Innehav',
    mobileUnrealized: 'Orealiserad',
    mobileRealized: 'Realiserad'
  },
  manager: {
    title: 'Inställningar och affärslogg',
    clearAndLoadDemo: 'Rensa och ladda demo',
    apiKeyTitle: 'yfapi.net API-nyckel',
    getFreeApiKey: 'Hämta gratis',
    apiKeyPlaceholder: 'Klistra in din x-api-key här (t.ex. A2sD8...)',
    saveApiKey: 'Spara API-nyckel',
    baseCurrencyTitle: 'Basvaluta för översiktskorten',
    baseCurrencyHelp: '* Alla tillgångar i utländsk valuta räknas om till denna basvaluta med live-FX så att summeringskorten högst upp blir jämförbara.',
    hideZeroHolding: 'Dölj helt stängda innehav',
    manualRecordTitle: 'Lägg till affär manuellt',
    fields: {
      date: 'Datum',
      type: 'Typ',
      market: 'Marknad',
      symbol: 'Ticker',
      quantity: 'Antal',
      price: 'Styckpris',
      amount: 'Totalbelopp',
      pnl: 'Realiserad P&L (endast sälj)'
    },
    placeholders: {
      symbol: 'T.ex. AAPL',
      quantity: 'Antal aktier',
      price: 'Pris per aktie',
      amount: 'I den marknadens valuta',
      pnl: 'Valfritt'
    },
    saveChanges: 'Spara ändringar',
    addRecord: 'Lägg till',
    noRecords: 'Det finns ännu inga affärer.'
  },
  notice: {
    title: 'Välkommen till Trade Lens',
    body: 'Trade Lens är ett open source-verktyg för investerare som gör om mäklar-CSV till kostnadstrender, P&L-vyer och en mer begriplig portföljbild.',
    privacy: 'Integritet först: allt stannar i din webbläsare (IndexedDB). Ingenting skickas till vår server.',
    apiKey: 'API-nyckeln används bara för prisuppslag via yfapi.net och lagras också lokalt.',
    sourceCode: 'Open source: kika i koden och bidra',
    dismiss: 'Visa inte igen'
  },
  messages: {
    apiKeySaved: 'API-nyckeln har sparats.',
    manualStockSaved: '{{symbol}} uppdaterades manuellt.',
    needApiKey: 'Lägg in din yfapi.net API-nyckel i inställningspanelen innan du uppdaterar kurserna.',
    cacheFresh: 'Kurser och FX har redan uppdaterats de senaste 24 timmarna, så appen återanvände den lokala cachen för att spara kvot.',
    updateSuccess: '{{count}} kurser och FX-nivåer uppdaterades.',
    fetchFailed: 'Hämtningen misslyckades: {{message}}',
    baseCurrencyChanged: 'Basvalutan ändrades till {{currency}}. Uppdaterar FX-kurser nu...',
    recordUpdated: 'Affärsrecorden uppdaterades.',
    dataCleared: 'Datan rensades och demosetet laddades om.',
    clearConfirm: 'Rensa all data och ladda om demosetet? Det här går inte att ångra.',
    backupConfirm: 'Vill du exportera nuvarande data som CSV-backup innan rensning?'
  },
  data: {
    unknownSymbol: 'Okänd ticker ({{symbol}})',
    unknown: 'Okänd'
  }
};

const csCZ = {
  common: {
    language: 'Jazyk',
    close: 'Zavřít',
    cancel: 'Zrušit',
    save: 'Uložit',
    edit: 'Upravit',
    delete: 'Smazat',
    importCsv: 'Import CSV',
    exportCsv: 'Export CSV'
  },
  currencies: {
    TWD: 'Nový tchajwanský dolar (TWD)',
    CNY: 'Čínský jüan (CNY)',
    HKD: 'Hongkongský dolar (HKD)',
    USD: 'Americký dolar (USD)',
    JPY: 'Japonský jen (JPY)',
    CZK: 'Česká koruna (CZK)'
  },
  markets: {
    all: 'Vše',
    chinaA: 'Čínské A-akcie',
    hongKong: 'Hongkong',
    taiwan: 'Tchaj-wan',
    japan: 'Japonsko',
    us: 'USA',
    other: 'Ostatní',
    unknown: 'Neznámé'
  },
  tradeTypes: {
    buy: 'Nákup',
    sell: 'Prodej'
  },
  timeRanges: {
    oneWeek: '1 týden',
    oneMonth: '1 měsíc',
    threeMonths: '3 měsíce',
    halfYear: '6 měsíců',
    ytd: 'Od začátku roku',
    oneYear: '1 rok',
    fiveYears: '5 let',
    all: 'Vše'
  },
  app: {
    loadingLocalData: 'Načítám lokální data z IndexedDB...',
    generatingImage: 'Vytvářím obrázek...',
    imageExportSuccess: 'Obrázek byl úspěšně exportován.',
    imageExportFail: 'Export obrázku se nepovedl.',
    noDataToExport: 'Momentálně není co exportovat.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Globální portfolio dashboard',
    demoDescription: 'Právě vidíš jen zkrácený demo dataset. Naimportuj celé CSV a uvidíš celý obrázek.',
    recordsLoaded: 'Načteno a analyzováno {{count}} obchodních záznamů.',
    lastUpdated: 'Poslední aktualizace: {{value}}',
    switchToLight: 'Přepnout do světlého režimu',
    switchToDark: 'Přepnout do tmavého režimu',
    settingsRecords: 'Nastavení a obchody',
    updatePrices: 'Obnovit kurzy',
    apiKeyRequired: 'Je potřeba API klíč',
    updateWithCache: 'Obnovit kurzy s využitím cache',
    setApiKeyFirst: 'Nejdřív zadej API klíč',
    forceRefresh: 'Vynutit obnovení',
    forceRefreshTitle: 'Ignorovat cache a utratit reálný API limit',
    languageLabel: 'Změnit jazyk',
    csvTitle: 'Průvodce CSV poli',
    csvIntro: 'CSV by mělo obsahovat alespoň tyto hlavičky. Pořadí není důležité:',
    csvRows: {
      date: 'Datum (např. 2025/01/01)',
      type: 'Typ (Nákup / Prodej)',
      symbol: 'Ticker (např. AAPL nebo 0700.HK)',
      market: 'Trh (volitelné, hodí se při ručním zadání)',
      quantity: 'Množství',
      price: 'Jednotková cena (původní měna)',
      amount: 'Celková částka (původní měna)',
      pnl: 'Zisk/Ztráta (u prodeje povinné, původní měna)'
    },
    csvNote1: '* Poznámka 1: Šestimístné tickery začínající na 6 nebo 0 se automaticky berou jako čínské A-akcie (.SS / .SZ).',
    csvNote2: '* Poznámka 2: U ostatních trhů přidej suffix rovnou k tickeru, třeba .TW nebo .HK.',
    forceRefreshConfirm: 'Opravdu vynutit obnovení? Tím se obejde 24hodinová cache a spotřebuje se reálný API limit.'
  },
  summary: {
    totalRealized: 'Celkový realizovaný P&L (po přepočtu)',
    totalUnrealized: 'Celkový nerealizovaný P&L (po přepočtu)',
    totalValue: 'Aktuální hodnota portfolia (po přepočtu)',
    holdingCount: 'Otevřené pozice',
    holdingUnit: 'pozice'
  },
  charts: {
    trendTitle: 'Kumulovaný trend nákladů',
    saveImage: 'Uložit graf jako obrázek',
    noTrend: 'Zatím není dost historie obchodů na vykreslení trendu.',
    realizedTitle: 'Realizovaný P&L podle titulu (prodané moc brzy / dobrý exit)',
    distributionTitle: 'Rozložení hodnoty portfolia (top 10)',
    convertedNote: 'Zobrazeno po přepočtu do {{currency}}',
    noPnlData: 'Zatím nejsou k dispozici data o P&L.',
    noHoldings: 'Momentálně nejsou otevřené žádné pozice.',
    legendConverted: '{{label}} (po přepočtu)',
    costSeries: 'Kumulované náklady',
    realizedSeries: 'Kumulovaný realizovaný P&L',
    ifSoldSeries: 'Kdyby se prodalo dnes',
    actualSeries: 'Skutečně realizováno',
    others: 'Ostatní'
  },
  table: {
    title: 'Historie obchodů podle tickeru',
    subtitle: 'Otevři řádek a uvidíš detail nákupů a prodejů. Částky zůstávají v původní měně daného trhu.',
    columns: {
      symbol: 'Ticker / název (trh · měna)',
      holdingQty: 'Aktuální množství',
      currentValue: 'Poslední cena / tržní hodnota',
      unrealized: 'Nerealizovaný P&L',
      realized: 'Realizovaný P&L',
      ifSoldToday: 'Kdyby se prodalo dnes',
      date: 'Datum',
      type: 'Typ',
      quantity: 'Množství',
      price: 'Cena',
      amount: 'Částka',
      pnl: 'P&L',
      actions: 'Akce'
    },
    manualBadge: 'Ruční',
    manualUpdatedAt: 'Ruční úprava: {{value}}',
    apiUpdatedAt: 'API aktualizováno: {{value}}',
    notUpdatedYet: 'Ještě neaktualizováno',
    manualNamePlaceholder: 'Ruční název',
    currentPricePlaceholder: 'Cena',
    hedgeSuccess: 'Dřívější výstup se tentokrát vyplatil víc ({{value}})',
    soldTooEarly: 'Prodal jsi moc brzy a nechal na stole {{value}}',
    tradeDetails: 'Detaily obchodu',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} akcií @ {{price}}',
    mobileHoldingQty: 'Pozice',
    mobileUnrealized: 'Nerealiz.',
    mobileRealized: 'Realiz.'
  },
  manager: {
    title: 'Nastavení a obchodní deník',
    clearAndLoadDemo: 'Vyčistit a nahrát demo',
    apiKeyTitle: 'API klíč pro yfapi.net',
    getFreeApiKey: 'Získat zdarma',
    apiKeyPlaceholder: 'Sem vlož svůj x-api-key (např. A2sD8...)',
    saveApiKey: 'Uložit API klíč',
    baseCurrencyTitle: 'Základní měna souhrnných karet',
    baseCurrencyHelp: '* Všechna aktiva v cizí měně se pomocí live FX přepočítají do této základní měny, aby šlo nahoře všechno čistě sečíst.',
    hideZeroHolding: 'Skrýt plně uzavřené pozice',
    manualRecordTitle: 'Přidat obchod ručně',
    fields: {
      date: 'Datum',
      type: 'Typ',
      market: 'Trh',
      symbol: 'Ticker',
      quantity: 'Množství',
      price: 'Jednotková cena',
      amount: 'Celková částka',
      pnl: 'Realizovaný P&L (jen při prodeji)'
    },
    placeholders: {
      symbol: 'Např. AAPL',
      quantity: 'Počet akcií',
      price: 'Cena za akcii',
      amount: 'V měně daného trhu',
      pnl: 'Volitelné'
    },
    saveChanges: 'Uložit změny',
    addRecord: 'Přidat',
    noRecords: 'Zatím tu nejsou žádné obchody.'
  },
  notice: {
    title: 'Vítej v Trade Lens',
    body: 'Trade Lens je open-source nástroj pro investory, který převádí CSV od brokera na trend nákladů, pohledy na P&L a čitelnější rozložení portfolia.',
    privacy: 'Soukromí na prvním místě: všechno zůstává jen ve tvém prohlížeči (IndexedDB). Na server se nic neposílá.',
    apiKey: 'API klíč slouží pouze pro načítání cen z yfapi.net a zůstává uložený lokálně.',
    sourceCode: 'Open source: mrkni do kódu a přispěj',
    dismiss: 'Už nezobrazovat'
  },
  messages: {
    apiKeySaved: 'API klíč uložen.',
    manualStockSaved: '{{symbol}} byl ručně aktualizován.',
    needApiKey: 'Než obnovíš kurzy, zadej v nastavení svůj API klíč pro yfapi.net.',
    cacheFresh: 'Kurzy a FX byly aktualizované během posledních 24 hodin, takže aplikace použila lokální cache, aby šetřila limit.',
    updateSuccess: 'Bylo aktualizováno {{count}} kurzů a FX sazeb.',
    fetchFailed: 'Načtení selhalo: {{message}}',
    baseCurrencyChanged: 'Základní měna byla přepnuta na {{currency}}. Teď se obnovují FX sazby...',
    recordUpdated: 'Obchodní záznam byl aktualizován.',
    dataCleared: 'Data byla vyčištěna a demo znovu načteno.',
    clearConfirm: 'Vyčistit všechna data a znovu nahrát demo? Tuto akci nejde vrátit zpět.',
    backupConfirm: 'Chceš před vyčištěním exportovat aktuální data jako CSV zálohu?'
  },
  data: {
    unknownSymbol: 'Neznámý ticker ({{symbol}})',
    unknown: 'Neznámé'
  }
};

const roRO = {
  common: {
    language: 'Limbă',
    close: 'Închide',
    cancel: 'Anulează',
    save: 'Salvează',
    edit: 'Editează',
    delete: 'Șterge',
    importCsv: 'Importă CSV',
    exportCsv: 'Exportă CSV'
  },
  currencies: {
    TWD: 'Dolar nou taiwanez (TWD)',
    CNY: 'Yuan chinezesc (CNY)',
    HKD: 'Dolar din Hong Kong (HKD)',
    USD: 'Dolar american (USD)',
    JPY: 'Yen japonez (JPY)',
    RON: 'Leu românesc (RON)'
  },
  markets: {
    all: 'Tot',
    chinaA: 'Acțiuni A din China',
    hongKong: 'Hong Kong',
    taiwan: 'Taiwan',
    japan: 'Japonia',
    us: 'SUA',
    other: 'Altele',
    unknown: 'Necunoscut'
  },
  tradeTypes: {
    buy: 'Cumpărare',
    sell: 'Vânzare'
  },
  timeRanges: {
    oneWeek: '1 săpt.',
    oneMonth: '1 lună',
    threeMonths: '3 luni',
    halfYear: '6 luni',
    ytd: 'YTD',
    oneYear: '1 an',
    fiveYears: '5 ani',
    all: 'Tot'
  },
  app: {
    loadingLocalData: 'Se încarcă datele locale din IndexedDB...',
    generatingImage: 'Se generează imaginea...',
    imageExportSuccess: 'Imaginea a fost exportată cu succes.',
    imageExportFail: 'Exportul imaginii a eșuat.',
    noDataToExport: 'Nu există date de exportat momentan.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Panou global de portofoliu',
    demoDescription: 'Acum vezi doar un set demo scurt. Importă CSV-ul complet ca să vezi toată povestea.',
    recordsLoaded: '{{count}} tranzacții au fost încărcate și analizate.',
    lastUpdated: 'Ultima actualizare: {{value}}',
    switchToLight: 'Comută pe modul luminos',
    switchToDark: 'Comută pe modul întunecat',
    settingsRecords: 'Setări și tranzacții',
    updatePrices: 'Actualizează cotațiile',
    apiKeyRequired: 'Este nevoie de API key',
    updateWithCache: 'Actualizează cotațiile folosind cache-ul',
    setApiKeyFirst: 'Mai întâi setează API key-ul',
    forceRefresh: 'Forțează actualizarea',
    forceRefreshTitle: 'Ignoră cache-ul și consumă cotă reală de API',
    languageLabel: 'Schimbă limba',
    csvTitle: 'Ghid pentru câmpurile CSV',
    csvIntro: 'Asigură-te că fișierul CSV are cel puțin aceste coloane. Ordinea nu contează:',
    csvRows: {
      date: 'Data (de exemplu: 2025/01/01)',
      type: 'Tip (Cumpărare / Vânzare)',
      symbol: 'Simbol (de exemplu: AAPL sau 0700.HK)',
      market: 'Piață (opțional, util la introducerea manuală)',
      quantity: 'Cantitate',
      price: 'Preț unitar (moneda originală)',
      amount: 'Suma totală (moneda originală)',
      pnl: 'Profit/Pierdere (obligatoriu la vânzare, moneda originală)'
    },
    csvNote1: '* Notă 1: Simbolurile din 6 cifre care încep cu 6 sau 0 sunt detectate automat ca acțiuni A din China (.SS / .SZ).',
    csvNote2: '* Notă 2: Pentru celelalte piețe, adaugă direct sufixul la simbol, de exemplu .TW sau .HK.',
    forceRefreshConfirm: 'Vrei să forțezi actualizarea? Cache-ul de 24 de ore va fi ignorat și se va consuma cotă reală de API.'
  },
  summary: {
    totalRealized: 'P&L total realizat (convertit)',
    totalUnrealized: 'P&L total nerealizat (convertit)',
    totalValue: 'Valoarea curentă a portofoliului (convertită)',
    holdingCount: 'Poziții deschise',
    holdingUnit: 'poziții'
  },
  charts: {
    trendTitle: 'Trendul costului cumulat',
    saveImage: 'Salvează graficul ca imagine',
    noTrend: 'Încă nu există suficient istoric ca să desenăm trendul.',
    realizedTitle: 'P&L realizat pe simbol (vândut prea devreme / ieșire bună)',
    distributionTitle: 'Distribuția valorii portofoliului (top 10)',
    convertedNote: 'Afișat după conversia în {{currency}}',
    noPnlData: 'Nu există încă date de P&L.',
    noHoldings: 'Momentan nu există poziții deschise.',
    legendConverted: '{{label}} (convertit)',
    costSeries: 'Cost cumulat',
    realizedSeries: 'P&L realizat cumulat',
    ifSoldSeries: 'Dacă ai vinde azi',
    actualSeries: 'Realizat efectiv',
    others: 'Altele'
  },
  table: {
    title: 'Istoric de tranzacții pe simbol',
    subtitle: 'Deschide un rând ca să vezi detaliile de cumpărare și vânzare. Valorile rămân în moneda originală a pieței respective.',
    columns: {
      symbol: 'Simbol / nume (piață · monedă)',
      holdingQty: 'Cantitate curentă',
      currentValue: 'Ultimul preț / valoare de piață',
      unrealized: 'P&L nerealizat',
      realized: 'P&L realizat',
      ifSoldToday: 'Dacă s-ar vinde azi',
      date: 'Data',
      type: 'Tip',
      quantity: 'Cantitate',
      price: 'Preț',
      amount: 'Sumă',
      pnl: 'P&L',
      actions: 'Acțiuni'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Corecție manuală: {{value}}',
    apiUpdatedAt: 'Actualizat prin API: {{value}}',
    notUpdatedYet: 'Încă neactualizat',
    manualNamePlaceholder: 'Nume introdus manual',
    currentPricePlaceholder: 'Preț',
    hedgeSuccess: 'Ieșirea mai devreme s-a dovedit a fi mutarea bună ({{value}})',
    soldTooEarly: 'Ai vândut cam devreme și ai lăsat {{value}} pe masă',
    tradeDetails: 'Detalii execuție',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} acțiuni @ {{price}}',
    mobileHoldingQty: 'Poziție',
    mobileUnrealized: 'Nerealizat',
    mobileRealized: 'Realizat'
  },
  manager: {
    title: 'Setări și jurnal de tranzacții',
    clearAndLoadDemo: 'Șterge și încarcă demo',
    apiKeyTitle: 'API key pentru yfapi.net',
    getFreeApiKey: 'Ia unul gratis',
    apiKeyPlaceholder: 'Lipește aici x-api-key-ul tău (ex.: A2sD8...)',
    saveApiKey: 'Salvează API key-ul',
    baseCurrencyTitle: 'Moneda de bază pentru cardurile rezumat',
    baseCurrencyHelp: '* Toate activele în valută străină sunt convertite în această monedă de bază folosind FX live, ca să poți compara corect totalurile de sus.',
    hideZeroHolding: 'Ascunde pozițiile închise complet',
    manualRecordTitle: 'Adaugă tranzacție manual',
    fields: {
      date: 'Data',
      type: 'Tip',
      market: 'Piață',
      symbol: 'Simbol',
      quantity: 'Cantitate',
      price: 'Preț unitar',
      amount: 'Sumă totală',
      pnl: 'P&L realizat (doar la vânzare)'
    },
    placeholders: {
      symbol: 'Ex.: AAPL',
      quantity: 'Număr de acțiuni',
      price: 'Preț pe acțiune',
      amount: 'În moneda pieței respective',
      pnl: 'Opțional'
    },
    saveChanges: 'Salvează modificările',
    addRecord: 'Adaugă',
    noRecords: 'Încă nu există tranzacții.'
  },
  notice: {
    title: 'Bine ai venit în Trade Lens',
    body: 'Trade Lens este o unealtă open-source pentru investitori care transformă CSV-ul brokerului în trenduri de cost, vederi de P&L și o imagine mai clară a portofoliului.',
    privacy: 'Confidențialitatea e pe primul loc: totul rămâne doar în browserul tău (IndexedDB). Nimic nu ajunge pe serverul nostru.',
    apiKey: 'API key-ul este folosit doar pentru preluarea cotațiilor din yfapi.net și rămâne tot local.',
    sourceCode: 'Open source: uită-te în cod și contribuie',
    dismiss: 'Nu mai afișa'
  },
  messages: {
    apiKeySaved: 'API key-ul a fost salvat.',
    manualStockSaved: '{{symbol}} a fost actualizat manual.',
    needApiKey: 'Introdu API key-ul tău de la yfapi.net în panoul de setări înainte să actualizezi cotațiile.',
    cacheFresh: 'Prețurile și cursurile FX au fost actualizate în ultimele 24 de ore, așa că aplicația a folosit cache-ul local ca să economisească din cotă.',
    updateSuccess: '{{count}} cotații și cursuri FX au fost actualizate.',
    fetchFailed: 'Preluarea a eșuat: {{message}}',
    baseCurrencyChanged: 'Moneda de bază a fost schimbată în {{currency}}. Se actualizează cursurile FX...',
    recordUpdated: 'Tranzacția a fost actualizată.',
    dataCleared: 'Datele au fost șterse și demo-ul a fost reîncărcat.',
    clearConfirm: 'Vrei să ștergi toate datele și să reîncarci setul demo? Acțiunea nu poate fi anulată.',
    backupConfirm: 'Vrei să exporți datele curente ca backup CSV înainte de ștergere?'
  },
  data: {
    unknownSymbol: 'Simbol necunoscut ({{symbol}})',
    unknown: 'Necunoscut'
  }
};

const huHU = {
  common: {
    language: 'Nyelv',
    close: 'Bezárás',
    cancel: 'Mégse',
    save: 'Mentés',
    edit: 'Szerkesztés',
    delete: 'Törlés',
    importCsv: 'CSV import',
    exportCsv: 'CSV export'
  },
  currencies: {
    TWD: 'Új tajvani dollár (TWD)',
    CNY: 'Kínai jüan (CNY)',
    HKD: 'Hongkongi dollár (HKD)',
    USD: 'Amerikai dollár (USD)',
    JPY: 'Japán jen (JPY)',
    HUF: 'Magyar forint (HUF)'
  },
  markets: {
    all: 'Összes',
    chinaA: 'Kínai A-részvények',
    hongKong: 'Hongkong',
    taiwan: 'Tajvan',
    japan: 'Japán',
    us: 'USA',
    other: 'Egyéb',
    unknown: 'Ismeretlen'
  },
  tradeTypes: {
    buy: 'Vétel',
    sell: 'Eladás'
  },
  timeRanges: {
    oneWeek: '1 hét',
    oneMonth: '1 hó',
    threeMonths: '3 hó',
    halfYear: '6 hó',
    ytd: 'Év eleje óta',
    oneYear: '1 év',
    fiveYears: '5 év',
    all: 'Összes'
  },
  app: {
    loadingLocalData: 'Helyi IndexedDB-adatok betöltése...',
    generatingImage: 'Kép készítése...',
    imageExportSuccess: 'A kép exportja sikerült.',
    imageExportFail: 'A kép exportja nem sikerült.',
    noDataToExport: 'Jelenleg nincs exportálható adat.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Globális portfólió dashboard',
    demoDescription: 'Most csak egy megvágott demóadatkészlet látszik. Importáld a teljes CSV-t, és megkapod a teljes képet.',
    recordsLoaded: '{{count}} kereskedési rekord betöltve és elemezve.',
    lastUpdated: 'Utolsó frissítés: {{value}}',
    switchToLight: 'Váltás világos módra',
    switchToDark: 'Váltás sötét módra',
    settingsRecords: 'Beállítások és ügyletek',
    updatePrices: 'Árfolyamok frissítése',
    apiKeyRequired: 'API-kulcs szükséges',
    updateWithCache: 'Árfolyamfrissítés cache-sel',
    setApiKeyFirst: 'Előbb add meg az API-kulcsot',
    forceRefresh: 'Kényszerített frissítés',
    forceRefreshTitle: 'Cache kihagyása és valódi API-keret fogyasztása',
    languageLabel: 'Nyelv váltása',
    csvTitle: 'CSV mező útmutató',
    csvIntro: 'A CSV-ben legalább ezek a fejlécek legyenek meg. A sorrend nem számít:',
    csvRows: {
      date: 'Dátum (pl. 2025/01/01)',
      type: 'Típus (Vétel / Eladás)',
      symbol: 'Ticker (pl. AAPL vagy 0700.HK)',
      market: 'Piac (nem kötelező, kézi rögzítésnél hasznos)',
      quantity: 'Mennyiség',
      price: 'Egységár (eredeti deviza)',
      amount: 'Teljes összeg (eredeti deviza)',
      pnl: 'Profit/Veszteség (eladásnál kötelező, eredeti deviza)'
    },
    csvNote1: '* 1. megjegyzés: A 6-tal vagy 0-val kezdődő, 6 számjegyű tickerek automatikusan kínai A-részvényként (.SS / .SZ) lesznek kezelve.',
    csvNote2: '* 2. megjegyzés: Más piacoknál a suffixet közvetlenül a ticker mögé kell írni, például .TW vagy .HK.',
    forceRefreshConfirm: 'Biztosan kényszerített frissítést szeretnél? Ezzel figyelmen kívül hagyod a 24 órás cache-t és valódi API-keretet használsz.'
  },
  summary: {
    totalRealized: 'Összes realizált P&L (átváltva)',
    totalUnrealized: 'Összes nem realizált P&L (átváltva)',
    totalValue: 'Jelenlegi portfólióérték (átváltva)',
    holdingCount: 'Nyitott pozíciók',
    holdingUnit: 'pozíció'
  },
  charts: {
    trendTitle: 'Kumulált költségtrend',
    saveImage: 'Grafikon mentése képként',
    noTrend: 'Még nincs elég kereskedési előzmény a trend kirajzolásához.',
    realizedTitle: 'Realizált P&L tickerenként (túl korai eladás / jó kiszálló)',
    distributionTitle: 'Portfólióérték megoszlása (top 10)',
    convertedNote: '{{currency}} devizára átváltva jelenik meg',
    noPnlData: 'Még nincs P&L adat.',
    noHoldings: 'Jelenleg nincs nyitott pozíció.',
    legendConverted: '{{label}} (átváltva)',
    costSeries: 'Kumulált bekerülési költség',
    realizedSeries: 'Kumulált realizált P&L',
    ifSoldSeries: 'Ha ma adnád el',
    actualSeries: 'Ténylegesen realizált',
    others: 'Egyéb'
  },
  table: {
    title: 'Kereskedési előzmények ticker szerint',
    subtitle: 'Nyiss meg egy sort a vételi és eladási tételekhez. Az összegek az adott piac eredeti devizájában maradnak.',
    columns: {
      symbol: 'Ticker / név (piac · deviza)',
      holdingQty: 'Jelenlegi mennyiség',
      currentValue: 'Utolsó ár / piaci érték',
      unrealized: 'Nem realizált P&L',
      realized: 'Realizált P&L',
      ifSoldToday: 'Ha ma adnád el',
      date: 'Dátum',
      type: 'Típus',
      quantity: 'Mennyiség',
      price: 'Ár',
      amount: 'Összeg',
      pnl: 'P&L',
      actions: 'Műveletek'
    },
    manualBadge: 'Kézi',
    manualUpdatedAt: 'Kézi felülírás: {{value}}',
    apiUpdatedAt: 'API frissítés: {{value}}',
    notUpdatedYet: 'Még nincs frissítve',
    manualNamePlaceholder: 'Kézi név',
    currentPricePlaceholder: 'Ár',
    hedgeSuccess: 'Most az bizonyult jobb húzásnak, hogy korábban kiszálltál ({{value}})',
    soldTooEarly: 'Kicsit túl korán adtad el, és {{value}} maradt az asztalon',
    tradeDetails: 'Kötés részletei',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} részvény @ {{price}}',
    mobileHoldingQty: 'Pozíció',
    mobileUnrealized: 'Nem realizált',
    mobileRealized: 'Realizált'
  },
  manager: {
    title: 'Beállítások és kereskedési napló',
    clearAndLoadDemo: 'Törlés és demó betöltése',
    apiKeyTitle: 'yfapi.net API-kulcs',
    getFreeApiKey: 'Kérj ingyen',
    apiKeyPlaceholder: 'Illeszd be ide az x-api-key értéket (pl.: A2sD8...)',
    saveApiKey: 'API-kulcs mentése',
    baseCurrencyTitle: 'Összefoglaló kártyák alapdevizája',
    baseCurrencyHelp: '* Az összes külföldi devizás eszköz élő FX alapján ebbe az alapdevizába lesz átváltva, így a felső összesítők tisztán összeadhatók.',
    hideZeroHolding: 'A teljesen lezárt pozíciók elrejtése',
    manualRecordTitle: 'Ügylet kézi felvitele',
    fields: {
      date: 'Dátum',
      type: 'Típus',
      market: 'Piac',
      symbol: 'Ticker',
      quantity: 'Mennyiség',
      price: 'Egységár',
      amount: 'Teljes összeg',
      pnl: 'Realizált P&L (csak eladásnál)'
    },
    placeholders: {
      symbol: 'Pl.: AAPL',
      quantity: 'Részvénydarab',
      price: 'Ár részvényenként',
      amount: 'Az adott piac devizájában',
      pnl: 'Opcionális'
    },
    saveChanges: 'Változtatások mentése',
    addRecord: 'Hozzáadás',
    noRecords: 'Még nincs egyetlen ügylet sem.'
  },
  notice: {
    title: 'Üdv a Trade Lensben',
    body: 'A Trade Lens egy open-source eszköz befektetőknek, amely a brókercéges CSV-ket költségtrenddé, P&L nézetté és átláthatóbb portfólióképpé alakítja.',
    privacy: 'A magánszféra az első: minden csak a böngésződben marad (IndexedDB). Semmi nem megy fel a szerverre.',
    apiKey: 'Az API-kulcsot csak az yfapi.net árlekérdezéseihez használjuk, és az is helyben marad.',
    sourceCode: 'Open source: nézd meg a kódot és szállj be',
    dismiss: 'Ne mutasd újra'
  },
  messages: {
    apiKeySaved: 'Az API-kulcs elmentve.',
    manualStockSaved: '{{symbol}} kézzel frissítve.',
    needApiKey: 'Árfolyamfrissítés előtt add meg a yfapi.net API-kulcsot a beállítások panelen.',
    cacheFresh: 'Az árak és FX-ráták az elmúlt 24 órában már frissültek, ezért az alkalmazás a helyi cache-t használta, hogy spóroljon a kerettel.',
    updateSuccess: '{{count}} árfolyam és FX-ráta frissült.',
    fetchFailed: 'Betöltés sikertelen: {{message}}',
    baseCurrencyChanged: 'Az alapdeviza mostantól {{currency}}. Frissülnek az FX-ráták...',
    recordUpdated: 'Az ügylet frissítve lett.',
    dataCleared: 'Az adatok törölve lettek, a demó újratöltve.',
    clearConfirm: 'Minden adat törlése és a demó újratöltése? Ezt nem lehet visszacsinálni.',
    backupConfirm: 'Törlés előtt szeretnéd CSV mentésként exportálni a jelenlegi adatokat?'
  },
  data: {
    unknownSymbol: 'Ismeretlen ticker ({{symbol}})',
    unknown: 'Ismeretlen'
  }
};

const daDK = {
  common: {
    language: 'Sprog',
    close: 'Luk',
    cancel: 'Annuller',
    save: 'Gem',
    edit: 'Rediger',
    delete: 'Slet',
    importCsv: 'Importer CSV',
    exportCsv: 'Eksporter CSV'
  },
  currencies: {
    TWD: 'Ny taiwandollar (TWD)',
    CNY: 'Kinesisk yuan (CNY)',
    HKD: 'Hongkong-dollar (HKD)',
    USD: 'Amerikansk dollar (USD)',
    JPY: 'Japansk yen (JPY)',
    DKK: 'Dansk krone (DKK)'
  },
  markets: {
    all: 'Alle',
    chinaA: 'Kina A-aktier',
    hongKong: 'Hongkong',
    taiwan: 'Taiwan',
    japan: 'Japan',
    us: 'USA',
    other: 'Andre',
    unknown: 'Ukendt'
  },
  tradeTypes: {
    buy: 'Køb',
    sell: 'Salg'
  },
  timeRanges: {
    oneWeek: '1 uge',
    oneMonth: '1 md.',
    threeMonths: '3 md.',
    halfYear: '6 md.',
    ytd: 'ÅTD',
    oneYear: '1 år',
    fiveYears: '5 år',
    all: 'Alle'
  },
  app: {
    loadingLocalData: 'Indlæser lokale IndexedDB-data...',
    generatingImage: 'Genererer billede...',
    imageExportSuccess: 'Billedet blev eksporteret.',
    imageExportFail: 'Det lykkedes ikke at eksportere billedet.',
    noDataToExport: 'Der er ingen data at eksportere lige nu.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Global porteføljeoversigt',
    demoDescription: 'Lige nu ser du kun et trimmet demo-datasæt. Importér hele din CSV for at få det fulde billede.',
    recordsLoaded: '{{count}} handler er indlæst og analyseret.',
    lastUpdated: 'Sidst opdateret: {{value}}',
    switchToLight: 'Skift til lyst tema',
    switchToDark: 'Skift til mørkt tema',
    settingsRecords: 'Indstillinger og handler',
    updatePrices: 'Opdatér kurser',
    apiKeyRequired: 'API-nøgle kræves',
    updateWithCache: 'Opdatér kurser med cache',
    setApiKeyFirst: 'Sæt API-nøglen først',
    forceRefresh: 'Tving opdatering',
    forceRefreshTitle: 'Ignorér cache og brug rigtig API-kvote',
    languageLabel: 'Skift sprog',
    csvTitle: 'Guide til CSV-felter',
    csvIntro: 'Sørg for, at din CSV mindst indeholder disse kolonner. Rækkefølgen er ligegyldig:',
    csvRows: {
      date: 'Dato (fx 2025/01/01)',
      type: 'Type (Køb / Salg)',
      symbol: 'Ticker (fx AAPL eller 0700.HK)',
      market: 'Marked (valgfrit, nyttigt ved manuel indtastning)',
      quantity: 'Antal',
      price: 'Stykpris (oprindelig valuta)',
      amount: 'Samlet beløb (oprindelig valuta)',
      pnl: 'Gevinst/Tab (påkrævet ved salg, oprindelig valuta)'
    },
    csvNote1: '* Note 1: Sekscifrede tickers, der starter med 6 eller 0, genkendes automatisk som kinesiske A-aktier (.SS / .SZ).',
    csvNote2: '* Note 2: På andre markeder skal du bare tilføje suffix direkte til tickeren, fx .TW eller .HK.',
    forceRefreshConfirm: 'Vil du tvinge en opdatering? Det ignorerer 24-timers cachen og bruger rigtig API-kvote.'
  },
  summary: {
    totalRealized: 'Samlet realiseret P&L (omregnet)',
    totalUnrealized: 'Samlet urealiseret P&L (omregnet)',
    totalValue: 'Nuværende porteføljeværdi (omregnet)',
    holdingCount: 'Åbne positioner',
    holdingUnit: 'positioner'
  },
  charts: {
    trendTitle: 'Kumulativ omkostningstrend',
    saveImage: 'Gem diagram som billede',
    noTrend: 'Der er endnu ikke nok historik til at tegne en trend.',
    realizedTitle: 'Realiseret P&L pr. ticker (solgt for tidligt / pæn exit)',
    distributionTitle: 'Fordeling af porteføljeværdi (top 10)',
    convertedNote: 'Vises efter omregning til {{currency}}',
    noPnlData: 'Der er endnu ingen P&L-data.',
    noHoldings: 'Der er ingen åbne positioner lige nu.',
    legendConverted: '{{label}} (omregnet)',
    costSeries: 'Kumulativ kostpris',
    realizedSeries: 'Kumulativ realiseret P&L',
    ifSoldSeries: 'Hvis du solgte i dag',
    actualSeries: 'Faktisk realiseret',
    others: 'Andre'
  },
  table: {
    title: 'Handelshistorik pr. ticker',
    subtitle: 'Åbn en række for at se køb og salg i detaljer. Beløb vises fortsat i markedets oprindelige valuta.',
    columns: {
      symbol: 'Ticker / navn (marked · valuta)',
      holdingQty: 'Nuværende antal',
      currentValue: 'Seneste kurs / markedsværdi',
      unrealized: 'Urealiseret P&L',
      realized: 'Realiseret P&L',
      ifSoldToday: 'Hvis solgt i dag',
      date: 'Dato',
      type: 'Type',
      quantity: 'Antal',
      price: 'Pris',
      amount: 'Beløb',
      pnl: 'P&L',
      actions: 'Handlinger'
    },
    manualBadge: 'Manuel',
    manualUpdatedAt: 'Manuel justering: {{value}}',
    apiUpdatedAt: 'API opdateret: {{value}}',
    notUpdatedYet: 'Ikke opdateret endnu',
    manualNamePlaceholder: 'Manuelt navn',
    currentPricePlaceholder: 'Pris',
    hedgeSuccess: 'Det viste sig faktisk at være det rigtige træk at sælge tidligere ({{value}})',
    soldTooEarly: 'Du solgte lidt for tidligt og efterlod {{value}} på bordet',
    tradeDetails: 'Handelsdetaljer',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} aktier @ {{price}}',
    mobileHoldingQty: 'Position',
    mobileUnrealized: 'Urealiseret',
    mobileRealized: 'Realiseret'
  },
  manager: {
    title: 'Indstillinger og handelslog',
    clearAndLoadDemo: 'Ryd og indlæs demo',
    apiKeyTitle: 'yfapi.net API-nøgle',
    getFreeApiKey: 'Få en gratis',
    apiKeyPlaceholder: 'Indsæt din x-api-key her (fx A2sD8...)',
    saveApiKey: 'Gem API-nøgle',
    baseCurrencyTitle: 'Basisvaluta for oversigtskort',
    baseCurrencyHelp: '* Alle aktiver i fremmed valuta omregnes til denne basisvaluta med live FX, så oversigtskortene kan lægge det hele sammen på en ren måde.',
    hideZeroHolding: 'Skjul helt lukkede positioner',
    manualRecordTitle: 'Tilføj handel manuelt',
    fields: {
      date: 'Dato',
      type: 'Type',
      market: 'Marked',
      symbol: 'Ticker',
      quantity: 'Antal',
      price: 'Stykpris',
      amount: 'Samlet beløb',
      pnl: 'Realiseret P&L (kun ved salg)'
    },
    placeholders: {
      symbol: 'Fx AAPL',
      quantity: 'Antal aktier',
      price: 'Pris pr. aktie',
      amount: 'I markedets valuta',
      pnl: 'Valgfrit'
    },
    saveChanges: 'Gem ændringer',
    addRecord: 'Tilføj',
    noRecords: 'Der er endnu ingen handler.'
  },
  notice: {
    title: 'Velkommen til Trade Lens',
    body: 'Trade Lens er et open source-værktøj til investorer, som forvandler broker-CSV’er til omkostningstrends, P&L-visninger og et mere læsbart porteføljeoverblik.',
    privacy: 'Privatliv først: alt bliver kun i din browser (IndexedDB). Intet sendes til serveren.',
    apiKey: 'API-nøglen bruges kun til at hente priser fra yfapi.net og bliver også gemt lokalt.',
    sourceCode: 'Open source: kig i koden og vær med',
    dismiss: 'Vis ikke igen'
  },
  messages: {
    apiKeySaved: 'API-nøglen er gemt.',
    manualStockSaved: '{{symbol}} blev opdateret manuelt.',
    needApiKey: 'Indtast din API-nøgle fra yfapi.net i indstillingspanelet, før du opdaterer kurser.',
    cacheFresh: 'Kurser og FX blev allerede opdateret inden for de sidste 24 timer, så appen genbrugte den lokale cache for at spare kvote.',
    updateSuccess: '{{count}} kurser og FX-rater blev opdateret.',
    fetchFailed: 'Hentning fejlede: {{message}}',
    baseCurrencyChanged: 'Basisvalutaen blev skiftet til {{currency}}. FX-rater opdateres nu...',
    recordUpdated: 'Handelsposten blev opdateret.',
    dataCleared: 'Data blev ryddet, og demosættet blev genindlæst.',
    clearConfirm: 'Vil du rydde alle data og genindlæse demoen? Det kan ikke fortrydes.',
    backupConfirm: 'Vil du eksportere de nuværende data som CSV-backup, før du rydder dem?'
  },
  data: {
    unknownSymbol: 'Ukendt ticker ({{symbol}})',
    unknown: 'Ukendt'
  }
};

const elGR = {
  common: {
    language: 'Γλώσσα',
    close: 'Κλείσιμο',
    cancel: 'Ακύρωση',
    save: 'Αποθήκευση',
    edit: 'Επεξεργασία',
    delete: 'Διαγραφή',
    importCsv: 'Εισαγωγή CSV',
    exportCsv: 'Εξαγωγή CSV'
  },
  currencies: {
    TWD: 'Νέο δολάριο Ταϊβάν (TWD)',
    CNY: 'Κινεζικό γιουάν (CNY)',
    HKD: 'Δολάριο Χονγκ Κονγκ (HKD)',
    USD: 'Δολάριο ΗΠΑ (USD)',
    JPY: 'Ιαπωνικό γεν (JPY)',
    EUR: 'Ευρώ (EUR)'
  },
  markets: {
    all: 'Όλα',
    chinaA: 'Κινεζικές μετοχές A',
    hongKong: 'Χονγκ Κονγκ',
    taiwan: 'Ταϊβάν',
    japan: 'Ιαπωνία',
    us: 'ΗΠΑ',
    other: 'Λοιπά',
    unknown: 'Άγνωστο'
  },
  tradeTypes: {
    buy: 'Αγορά',
    sell: 'Πώληση'
  },
  timeRanges: {
    oneWeek: '1 εβδ.',
    oneMonth: '1 μήνας',
    threeMonths: '3 μήνες',
    halfYear: '6 μήνες',
    ytd: 'Από αρχή έτους',
    oneYear: '1 έτος',
    fiveYears: '5 έτη',
    all: 'Όλα'
  },
  app: {
    loadingLocalData: 'Φόρτωση τοπικών δεδομένων IndexedDB...',
    generatingImage: 'Δημιουργία εικόνας...',
    imageExportSuccess: 'Η εικόνα εξήχθη με επιτυχία.',
    imageExportFail: 'Η εξαγωγή εικόνας απέτυχε.',
    noDataToExport: 'Δεν υπάρχουν δεδομένα για εξαγωγή αυτή τη στιγμή.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Παγκόσμιο dashboard χαρτοφυλακίου',
    demoDescription: 'Αυτή τη στιγμή βλέπεις μόνο ένα μικρό demo dataset. Κάνε import το πλήρες CSV για να δεις ολόκληρη την εικόνα.',
    recordsLoaded: 'Φορτώθηκαν και αναλύθηκαν {{count}} συναλλαγές.',
    lastUpdated: 'Τελευταία ενημέρωση: {{value}}',
    switchToLight: 'Μετάβαση σε φωτεινό θέμα',
    switchToDark: 'Μετάβαση σε σκοτεινό θέμα',
    settingsRecords: 'Ρυθμίσεις και συναλλαγές',
    updatePrices: 'Ανανέωση τιμών',
    apiKeyRequired: 'Χρειάζεται API key',
    updateWithCache: 'Ανανέωση τιμών με cache',
    setApiKeyFirst: 'Βάλε πρώτα το API key',
    forceRefresh: 'Αναγκαστική ανανέωση',
    forceRefreshTitle: 'Παράκαμψη cache και κατανάλωση πραγματικού API quota',
    languageLabel: 'Αλλαγή γλώσσας',
    csvTitle: 'Οδηγός πεδίων CSV',
    csvIntro: 'Βεβαιώσου ότι το CSV έχει τουλάχιστον αυτές τις στήλες. Η σειρά δεν παίζει ρόλο:',
    csvRows: {
      date: 'Ημερομηνία (π.χ. 2025/01/01)',
      type: 'Τύπος (Αγορά / Πώληση)',
      symbol: 'Σύμβολο (π.χ. AAPL ή 0700.HK)',
      market: 'Αγορά (προαιρετικό, βολικό για χειροκίνητες εγγραφές)',
      quantity: 'Ποσότητα',
      price: 'Τιμή μονάδας (αρχικό νόμισμα)',
      amount: 'Συνολικό ποσό (αρχικό νόμισμα)',
      pnl: 'Κέρδος/Ζημιά (υποχρεωτικό στην πώληση, αρχικό νόμισμα)'
    },
    csvNote1: '* Σημείωση 1: Οι 6ψήφιοι κωδικοί που αρχίζουν από 6 ή 0 αναγνωρίζονται αυτόματα ως κινεζικές μετοχές A (.SS / .SZ).',
    csvNote2: '* Σημείωση 2: Για άλλες αγορές, πρόσθεσε κατευθείαν το suffix στο σύμβολο, π.χ. .TW ή .HK.',
    forceRefreshConfirm: 'Να γίνει αναγκαστική ανανέωση; Θα αγνοηθεί το 24ωρο cache και θα καταναλωθεί πραγματικό API quota.'
  },
  summary: {
    totalRealized: 'Συνολικό πραγματοποιημένο P&L (μετατρεμμένο)',
    totalUnrealized: 'Συνολικό μη πραγματοποιημένο P&L (μετατρεμμένο)',
    totalValue: 'Τρέχουσα αξία χαρτοφυλακίου (μετατρεμμένη)',
    holdingCount: 'Ανοιχτές θέσεις',
    holdingUnit: 'θέσεις'
  },
  charts: {
    trendTitle: 'Σωρευτική πορεία κόστους',
    saveImage: 'Αποθήκευση γραφήματος ως εικόνα',
    noTrend: 'Δεν υπάρχει ακόμη αρκετό ιστορικό συναλλαγών για να σχεδιαστεί η πορεία.',
    realizedTitle: 'Πραγματοποιημένο P&L ανά σύμβολο (πωλήθηκε νωρίς / καλό exit)',
    distributionTitle: 'Κατανομή αξίας χαρτοφυλακίου (top 10)',
    convertedNote: 'Εμφανίζεται μετά τη μετατροπή σε {{currency}}',
    noPnlData: 'Δεν υπάρχουν ακόμη δεδομένα P&L.',
    noHoldings: 'Δεν υπάρχουν ανοιχτές θέσεις αυτή τη στιγμή.',
    legendConverted: '{{label}} (μετατρεμμένο)',
    costSeries: 'Σωρευτικό κόστος',
    realizedSeries: 'Σωρευτικό πραγματοποιημένο P&L',
    ifSoldSeries: 'Αν πουλιόταν σήμερα',
    actualSeries: 'Πραγματικά πραγματοποιημένο',
    others: 'Λοιπά'
  },
  table: {
    title: 'Ιστορικό συναλλαγών ανά σύμβολο',
    subtitle: 'Άνοιξε μια γραμμή για να δεις τις λεπτομέρειες αγοράς και πώλησης. Τα ποσά παραμένουν στο αρχικό νόμισμα της αντίστοιχης αγοράς.',
    columns: {
      symbol: 'Σύμβολο / όνομα (αγορά · νόμισμα)',
      holdingQty: 'Τρέχουσα ποσότητα',
      currentValue: 'Τελευταία τιμή / αγοραία αξία',
      unrealized: 'Μη πραγματοποιημένο P&L',
      realized: 'Πραγματοποιημένο P&L',
      ifSoldToday: 'Αν πουλιόταν σήμερα',
      date: 'Ημερομηνία',
      type: 'Τύπος',
      quantity: 'Ποσότητα',
      price: 'Τιμή',
      amount: 'Ποσό',
      pnl: 'P&L',
      actions: 'Ενέργειες'
    },
    manualBadge: 'Χειροκίνητο',
    manualUpdatedAt: 'Χειροκίνητη διόρθωση: {{value}}',
    apiUpdatedAt: 'Τελευταία ενημέρωση API: {{value}}',
    notUpdatedYet: 'Δεν έχει ενημερωθεί ακόμη',
    manualNamePlaceholder: 'Χειροκίνητο όνομα',
    currentPricePlaceholder: 'Τιμή',
    hedgeSuccess: 'Το να βγεις νωρίτερα αποδείχθηκε σωστή κίνηση αυτή τη φορά ({{value}})',
    soldTooEarly: 'Πούλησες λίγο νωρίς και άφησες {{value}} πάνω στο τραπέζι',
    tradeDetails: 'Λεπτομέρειες εκτέλεσης',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} μετοχές @ {{price}}',
    mobileHoldingQty: 'Θέση',
    mobileUnrealized: 'Μη πραγμ.',
    mobileRealized: 'Πραγμ.'
  },
  manager: {
    title: 'Ρυθμίσεις και ημερολόγιο συναλλαγών',
    clearAndLoadDemo: 'Καθαρισμός και φόρτωση demo',
    apiKeyTitle: 'API key του yfapi.net',
    getFreeApiKey: 'Πάρε δωρεάν',
    apiKeyPlaceholder: 'Κόλλησε εδώ το x-api-key σου (π.χ. A2sD8...)',
    saveApiKey: 'Αποθήκευση API key',
    baseCurrencyTitle: 'Βασικό νόμισμα καρτών σύνοψης',
    baseCurrencyHelp: '* Όλα τα assets σε ξένο νόμισμα μετατρέπονται σε αυτό το βασικό νόμισμα με live FX, ώστε οι κάρτες σύνοψης να αθροίζουν σωστά.',
    hideZeroHolding: 'Απόκρυψη πλήρως κλεισμένων θέσεων',
    manualRecordTitle: 'Προσθήκη συναλλαγής χειροκίνητα',
    fields: {
      date: 'Ημερομηνία',
      type: 'Τύπος',
      market: 'Αγορά',
      symbol: 'Σύμβολο',
      quantity: 'Ποσότητα',
      price: 'Τιμή μονάδας',
      amount: 'Συνολικό ποσό',
      pnl: 'Πραγματοποιημένο P&L (μόνο στην πώληση)'
    },
    placeholders: {
      symbol: 'Π.χ. AAPL',
      quantity: 'Μετοχές',
      price: 'Τιμή ανά μετοχή',
      amount: 'Στο νόμισμα της αγοράς',
      pnl: 'Προαιρετικό'
    },
    saveChanges: 'Αποθήκευση αλλαγών',
    addRecord: 'Προσθήκη',
    noRecords: 'Δεν υπάρχουν ακόμα συναλλαγές.'
  },
  notice: {
    title: 'Καλώς ήρθες στο Trade Lens',
    body: 'Το Trade Lens είναι ένα open-source εργαλείο για επενδυτές που μετατρέπει τα CSV του broker σε trends κόστους, προβολές P&L και πιο καθαρή εικόνα χαρτοφυλακίου.',
    privacy: 'Πρώτα το απόρρητο: όλα μένουν μόνο στον browser σου (IndexedDB). Τίποτα δεν στέλνεται στον server.',
    apiKey: 'Το API key χρησιμοποιείται μόνο για αναζήτηση τιμών από το yfapi.net και μένει επίσης τοπικά.',
    sourceCode: 'Open source: δες τον κώδικα και συνεισέφερε',
    dismiss: 'Να μην εμφανιστεί ξανά'
  },
  messages: {
    apiKeySaved: 'Το API key αποθηκεύτηκε.',
    manualStockSaved: 'Το {{symbol}} ενημερώθηκε χειροκίνητα.',
    needApiKey: 'Βάλε το API key του yfapi.net στο panel ρυθμίσεων πριν ανανεώσεις τις τιμές.',
    cacheFresh: 'Οι τιμές και τα FX rates είχαν ενημερωθεί μέσα στις τελευταίες 24 ώρες, οπότε η εφαρμογή ξαναχρησιμοποίησε το τοπικό cache για να γλιτώσει quota.',
    updateSuccess: 'Ενημερώθηκαν {{count}} τιμές και FX rates.',
    fetchFailed: 'Η λήψη απέτυχε: {{message}}',
    baseCurrencyChanged: 'Το βασικό νόμισμα άλλαξε σε {{currency}}. Γίνεται τώρα ενημέρωση FX...',
    recordUpdated: 'Η συναλλαγή ενημερώθηκε.',
    dataCleared: 'Τα δεδομένα καθαρίστηκαν και το demo φορτώθηκε ξανά.',
    clearConfirm: 'Να καθαριστούν όλα τα δεδομένα και να ξαναφορτωθεί το demo; Αυτή η ενέργεια δεν αναιρείται.',
    backupConfirm: 'Θέλεις να εξαγάγεις τα τωρινά δεδομένα σε CSV backup πριν τον καθαρισμό;'
  },
  data: {
    unknownSymbol: 'Άγνωστο σύμβολο ({{symbol}})',
    unknown: 'Άγνωστο'
  }
};

const isPlainObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const mergeLocale = (base, overrides) => {
  const merged = { ...base };

  Object.entries(overrides).forEach(([key, value]) => {
    if (isPlainObject(value) && isPlainObject(base?.[key])) {
      merged[key] = mergeLocale(base[key], value);
    } else {
      merged[key] = value;
    }
  });

  return merged;
};

const enIE = mergeLocale(enGB, {
  currencies: {
    EUR: 'Euro (EUR)'
  },
  header: {
    demoDescription: 'You are looking at a trimmed demo set for now. Import your full CSV to see the whole picture.',
    recordsLoaded: 'Loaded and analysed {{count}} trades.',
    settingsRecords: 'Settings & trades',
    updateWithCache: 'Refresh live prices using cache',
    forceRefreshTitle: 'Skip the cache and use real API allowance',
    csvRows: {
      symbol: 'Symbol (for example: RYA.IR, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'Realised P&L by holding (bailed early / clean exit)'
  },
  table: {
    title: 'Trade history by holding',
    hedgeSuccess: 'Getting out earlier actually paid off ({{value}})',
    soldTooEarly: 'Sold a shade early and left {{value}} behind'
  },
  manager: {
    placeholders: {
      symbol: 'For example: RYA.IR'
    }
  },
  messages: {
    cacheFresh: 'Prices and FX were refreshed within the last 24 hours, so the app reused the local cache to save your allowance.'
  }
});

const enNZ = mergeLocale(enAU, {
  currencies: {
    NZD: 'New Zealand Dollar (NZD)'
  },
  header: {
    demoDescription: 'You are looking at a trimmed demo set right now. Import your full CSV to see the full picture.',
    csvRows: {
      symbol: 'Symbol (for example: FPH.NZ, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'Realised P&L by holding (jumped too soon / tidy exit)'
  },
  table: {
    title: 'Trade history by holding',
    hedgeSuccess: 'Getting out earlier ended up being the better call ({{value}})',
    soldTooEarly: 'Sold a bit early and left {{value}} behind'
  },
  manager: {
    placeholders: {
      symbol: 'For example: FPH.NZ'
    }
  }
});

const enZA = mergeLocale(enGB, {
  currencies: {
    ZAR: 'South African Rand (ZAR)'
  },
  header: {
    demoDescription: 'Right now you are seeing a trimmed demo set. Import your full CSV to get the full picture.',
    csvRows: {
      symbol: 'Symbol (for example: NPN.JO, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'Realised P&L by counter (sold too early / tidy exit)'
  },
  table: {
    title: 'Trade history by counter',
    hedgeSuccess: 'Selling earlier worked out better this time ({{value}})',
    soldTooEarly: 'Sold a touch too soon and left {{value}} behind'
  },
  manager: {
    placeholders: {
      symbol: 'For example: NPN.JO'
    }
  }
});

const frBE = mergeLocale(frFR, {
  header: {
    demoDescription: 'Pour l’instant, tu vois un set démo allégé. Importe ton CSV complet pour avoir toute la vue.',
    csvRows: {
      symbol: 'Symbole (par ex. : ABI.BR, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'P/L réalisé par ligne (sortie trop tôt / sortie propre)'
  },
  table: {
    title: 'Historique par ligne',
    hedgeSuccess: 'Sortir plus tôt s’est finalement révélé plus rentable ({{value}})',
    soldTooEarly: 'Vendu trop tôt, tu as laissé {{value}} sur la table'
  },
  manager: {
    placeholders: {
      symbol: 'Ex. : ABI.BR'
    }
  }
});

const frCH = mergeLocale(frFR, {
  currencies: {
    CHF: 'Franc suisse (CHF)'
  },
  header: {
    demoDescription: 'Pour l’instant, tu vois un jeu démo allégé. Importe ton CSV complet pour retrouver toute la photo.',
    csvRows: {
      symbol: 'Symbole (par ex. : NESN.SW, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'P/L réalisé par ligne (sortie trop vite / sortie propre)'
  },
  table: {
    title: 'Historique par ligne',
    hedgeSuccess: 'Sortir plus tôt a finalement mieux payé ({{value}})',
    soldTooEarly: 'Vendu un peu trop tôt, il manque {{value}}'
  },
  manager: {
    placeholders: {
      symbol: 'Ex. : NESN.SW'
    }
  }
});

const deAT = mergeLocale(deDE, {
  header: {
    demoDescription: 'Gerade siehst du ein abgespecktes Demo-Set. Importiere dein komplettes CSV, dann bekommst du das ganze Bild.',
    csvRows: {
      symbol: 'Symbol (z. B. OMV.VI oder AAPL)'
    }
  },
  charts: {
    realizedTitle: 'Realisierte P&L je Position (zu früh raus / sauberer Exit)'
  },
  table: {
    title: 'Trade-Historie nach Position',
    hedgeSuccess: 'Früher auszusteigen war diesmal der bessere Griff ({{value}})',
    soldTooEarly: 'Etwas zu früh verkauft und {{value}} liegen gelassen'
  },
  manager: {
    placeholders: {
      symbol: 'Z. B. OMV.VI'
    }
  }
});

const deCH = mergeLocale(deDE, {
  currencies: {
    CHF: 'Schweizer Franken (CHF)'
  },
  header: {
    demoDescription: 'Im Moment siehst du ein abgespecktes Demo-Set. Importiere dein vollständiges CSV, dann hast du das ganze Bild.',
    csvRows: {
      symbol: 'Symbol (z. B. NESN.SW oder AAPL)'
    }
  },
  charts: {
    realizedTitle: 'Realisierte P&L pro Titel (zu früh raus / sauberer Exit)'
  },
  table: {
    title: 'Trade-Historie pro Titel',
    hedgeSuccess: 'Früher auszusteigen war diesmal die bessere Entscheidung ({{value}})',
    soldTooEarly: 'Etwas zu früh verkauft und {{value}} liegen gelassen'
  },
  manager: {
    placeholders: {
      symbol: 'Z. B. NESN.SW'
    }
  }
});

const itCH = mergeLocale(itIT, {
  currencies: {
    CHF: 'Franco svizzero (CHF)'
  },
  header: {
    demoDescription: 'In questo momento stai vedendo un set demo ridotto. Importa il CSV completo per avere il quadro intero.',
    csvRows: {
      symbol: 'Simbolo (ad es.: NESN.SW, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'P&L realizzato per titolo (uscita troppo presto / uscita pulita)'
  },
  table: {
    title: 'Storico per titolo',
    hedgeSuccess: 'Uscire prima alla fine si è rivelata la mossa giusta ({{value}})',
    soldTooEarly: 'Hai venduto un filo troppo presto e hai lasciato {{value}} sul tavolo'
  },
  manager: {
    placeholders: {
      symbol: 'Es.: NESN.SW'
    }
  }
});

const nlBE = mergeLocale(nlNL, {
  header: {
    demoDescription: 'Je ziet nu een afgeslankte demoset. Importeer je volledige CSV om het hele plaatje te zien.',
    csvRows: {
      symbol: 'Symbool (bijv.: ABI.BR, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'Gerealiseerde P&L per positie (te vroeg buiten / nette exit)'
  },
  table: {
    title: 'Handelshistoriek per positie',
    hedgeSuccess: 'Eerder uitstappen bleek deze keer de betere zet ({{value}})',
    soldTooEarly: 'Net wat te vroeg verkocht en {{value}} laten liggen'
  },
  manager: {
    placeholders: {
      symbol: 'Bijv.: ABI.BR'
    }
  }
});

const esAR = mergeLocale(es419, {
  currencies: {
    ARS: 'Peso argentino (ARS)'
  },
  header: {
    demoDescription: 'Por ahora estás viendo un demo recortado. Importá tu CSV completo para ver toda la foto.',
    settingsRecords: 'Configuración y operaciones',
    updateWithCache: 'Actualizar cotizaciones con caché',
    forceRefreshTitle: 'Ignorar caché y gastar cuota real de la API',
    csvRows: {
      symbol: 'Símbolo (por ejemplo: GGAL.BA, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'P&L realizado por papel (saliste antes / salida prolija)'
  },
  table: {
    title: 'Historial por papel',
    hedgeSuccess: 'Salir antes terminó siendo la mejor jugada ({{value}})',
    soldTooEarly: 'Vendiste un poco antes y dejaste {{value}} arriba de la mesa'
  },
  manager: {
    placeholders: {
      symbol: 'Por ejemplo: GGAL.BA'
    }
  }
});

const esCL = mergeLocale(es419, {
  currencies: {
    CLP: 'Peso chileno (CLP)'
  },
  header: {
    demoDescription: 'Ahora mismo se muestra un demo recortado. Importa tu CSV completo para ver toda la película.',
    csvRows: {
      symbol: 'Símbolo (por ejemplo: BSANTANDER.SN, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'P&L realizado por papel (salida apurada / buena salida)'
  },
  table: {
    title: 'Historial por papel',
    hedgeSuccess: 'Salir antes terminó siendo mejor negocio ({{value}})',
    soldTooEarly: 'Vendiste medio antes y dejaste {{value}} sobre la mesa'
  },
  manager: {
    placeholders: {
      symbol: 'Por ejemplo: BSANTANDER.SN'
    }
  }
});

const esCO = mergeLocale(es419, {
  currencies: {
    COP: 'Peso colombiano (COP)'
  },
  header: {
    demoDescription: 'Por ahora estás viendo un demo recortado. Importa tu CSV completo para ver la película completa.',
    csvRows: {
      symbol: 'Símbolo (por ejemplo: ECOPETROL.CL, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'P&L realizado por especie (salida temprana / buena salida)'
  },
  table: {
    title: 'Historial por especie',
    hedgeSuccess: 'Salir antes terminó siendo la mejor jugada ({{value}})',
    soldTooEarly: 'Vendiste un poquito antes y dejaste {{value}} sobre la mesa'
  },
  manager: {
    placeholders: {
      symbol: 'Por ejemplo: ECOPETROL.CL'
    }
  }
});

const esVE = mergeLocale(es419, {
  header: {
    demoDescription: 'Ahorita estás viendo un demo recortado. Importa tu CSV completo para ver toda la foto.',
    csvRows: {
      symbol: 'Símbolo (por ejemplo: BVCC.CR, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'P&L realizado por emisor (saliste temprano / salida limpia)'
  },
  table: {
    title: 'Historial por emisor',
    hedgeSuccess: 'Salir antes terminó siendo la jugada buena ({{value}})',
    soldTooEarly: 'Vendiste antes de tiempo y dejaste {{value}} sobre la mesa'
  },
  manager: {
    placeholders: {
      symbol: 'Por ejemplo: BVCC.CR'
    }
  }
});

const esPE = mergeLocale(es419, {
  header: {
    demoDescription: 'Ahorita estás viendo una versión recortada del demo. Importa el CSV completo para ver la foto completa.',
    csvRows: {
      symbol: 'Símbolo (por ejemplo: MINSURI1.LM, AAPL)'
    }
  },
  charts: {
    realizedTitle: 'P&L realizado por valor (saliste temprano / salida limpia)'
  },
  table: {
    title: 'Historial por valor',
    hedgeSuccess: 'Salir antes terminó siendo la mejor jugada ({{value}})',
    soldTooEarly: 'Vendiste antes de tiempo y dejaste {{value}} sobre la mesa'
  },
  manager: {
    placeholders: {
      symbol: 'Por ejemplo: MINSURI1.LM'
    }
  }
});

const arAE = mergeLocale(arSA, {
  currencies: {
    AED: 'الدرهم الإماراتي (AED)'
  },
  header: {
    demoDescription: 'أنت الآن ترى نسخة ديمو مختصرة. حمّل ملف CSV الكامل حتى تشوف الصورة كاملة.',
    csvRows: {
      symbol: 'الرمز (مثال: EMAAR.AE أو AAPL)'
    }
  },
  charts: {
    realizedTitle: 'الربح والخسارة المحققة حسب السهم (خروج بدري / خروج مرتب)'
  },
  table: {
    title: 'سجل التداول حسب السهم',
    hedgeSuccess: 'الخروج بدري طلع هو القرار الصح هالمرة ({{value}})',
    soldTooEarly: 'بعت بدري شوي وتركت {{value}} على الطاولة'
  },
  manager: {
    placeholders: {
      symbol: 'مثال: EMAAR.AE'
    }
  }
});

const arKW = mergeLocale(arSA, {
  currencies: {
    KWF: 'فلس كويتي (KWF)'
  },
  header: {
    demoDescription: 'أنت حالياً تشوف نسخة تجريبية مختصرة. حمّل ملف CSV الكامل علشان تشوف الصورة كاملة.',
    csvRows: {
      symbol: 'الرمز (مثال: KFH.KW أو AAPL)'
    }
  },
  charts: {
    realizedTitle: 'الربح والخسارة المحققة حسب السهم (بيع بدري / خروج مرتب)'
  },
  table: {
    title: 'سجل التداول حسب السهم',
    hedgeSuccess: 'الطلعة المبكرة كانت أوفر هالمرة ({{value}})',
    soldTooEarly: 'بعت أبكر من اللازم وخليت {{value}} على الطاولة'
  },
  manager: {
    placeholders: {
      symbol: 'مثال: KFH.KW'
    }
  }
});

const arQA = mergeLocale(arSA, {
  currencies: {
    QAR: 'الريال القطري (QAR)'
  },
  header: {
    demoDescription: 'أنت الآن ترى نسخة ديمو مختصرة. حمّل CSV الكامل حتى تظهر لك الصورة كاملة.',
    csvRows: {
      symbol: 'الرمز (مثال: QNBK.QA أو AAPL)'
    }
  },
  charts: {
    realizedTitle: 'الربح والخسارة المحققة حسب السهم (خروج مبكر / خروج مرتب)'
  },
  table: {
    title: 'سجل التداول حسب السهم',
    hedgeSuccess: 'الخروج بدري كان القرار الأفضل هالمرة ({{value}})',
    soldTooEarly: 'بعت بدري شوي وخليت {{value}} على الطاولة'
  },
  manager: {
    placeholders: {
      symbol: 'مثال: QNBK.QA'
    }
  }
});

const arEG = mergeLocale(arSA, {
  currencies: {
    EGP: 'الجنيه المصري (EGP)'
  },
  header: {
    demoDescription: 'المعروض الآن نسخة مختصرة من بيانات التجربة. ارفع ملف CSV الكامل عشان تشوف الصورة كلها.',
    csvRows: {
      symbol: 'الرمز (مثال: COMI.CA أو AAPL)'
    }
  },
  charts: {
    realizedTitle: 'الربح/الخسارة المحققة حسب السهم (بعت بدري / خروج مرتب)'
  },
  table: {
    title: 'سجل التداول حسب السهم',
    hedgeSuccess: 'طلع البيع بدري كان أحسن قرار المرة دي ({{value}})',
    soldTooEarly: 'بعت بدري شوية وسيبت {{value}} على الترابيزة'
  },
  manager: {
    placeholders: {
      symbol: 'مثال: COMI.CA'
    }
  }
});

const nbNO = mergeLocale(daDK, {
  common: {
    language: 'Språk',
    close: 'Lukk',
    cancel: 'Avbryt',
    save: 'Lagre',
    edit: 'Rediger',
    delete: 'Slett',
    importCsv: 'Importer CSV',
    exportCsv: 'Eksporter CSV'
  },
  currencies: {
    TWD: 'Ny taiwandollar (TWD)',
    CNY: 'Kinesisk yuan (CNY)',
    HKD: 'Hongkong-dollar (HKD)',
    USD: 'Amerikansk dollar (USD)',
    JPY: 'Japansk yen (JPY)',
    NOK: 'Norsk krone (NOK)'
  },
  markets: {
    all: 'Alle',
    chinaA: 'Kina A-aksjer',
    hongKong: 'Hongkong',
    taiwan: 'Taiwan',
    japan: 'Japan',
    us: 'USA',
    other: 'Andre',
    unknown: 'Ukjent'
  },
  tradeTypes: {
    buy: 'Kjøp',
    sell: 'Salg'
  },
  timeRanges: {
    oneWeek: '1 uke',
    oneMonth: '1 mnd.',
    threeMonths: '3 mnd.',
    halfYear: '6 mnd.',
    ytd: 'Hittil i år',
    oneYear: '1 år',
    fiveYears: '5 år',
    all: 'Alle'
  },
  app: {
    loadingLocalData: 'Laster inn lokale IndexedDB-data...',
    generatingImage: 'Lager bilde...',
    imageExportSuccess: 'Bildet ble eksportert.',
    imageExportFail: 'Eksport av bilde mislyktes.',
    noDataToExport: 'Det finnes ingen data å eksportere akkurat nå.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Global porteføljeoversikt',
    demoDescription: 'Du ser et nedskalert demosett akkurat nå. Importer hele CSV-filen for å få hele bildet.',
    recordsLoaded: '{{count}} handler er lastet inn og analysert.',
    lastUpdated: 'Sist oppdatert: {{value}}',
    switchToLight: 'Bytt til lyst tema',
    switchToDark: 'Bytt til mørkt tema',
    settingsRecords: 'Innstillinger og handler',
    updatePrices: 'Oppdater kurser',
    apiKeyRequired: 'API-nøkkel kreves',
    updateWithCache: 'Oppdater kurser med cache',
    setApiKeyFirst: 'Legg inn API-nøkkelen først',
    forceRefresh: 'Tving oppdatering',
    forceRefreshTitle: 'Hopp over cache og bruk ekte API-kvote',
    languageLabel: 'Bytt språk',
    csvTitle: 'Guide til CSV-felter',
    csvIntro: 'Sørg for at CSV-filen minst har disse kolonnene. Rekkefølgen spiller ingen rolle:',
    csvRows: {
      date: 'Dato (f.eks. 2025/01/01)',
      type: 'Type (Kjøp / Salg)',
      symbol: 'Ticker (f.eks. EQNR.OL eller AAPL)',
      market: 'Marked (valgfritt, nyttig ved manuelle føringer)',
      quantity: 'Antall',
      price: 'Pris per enhet (opprinnelig valuta)',
      amount: 'Totalbeløp (opprinnelig valuta)',
      pnl: 'P&L (obligatorisk ved salg, opprinnelig valuta)'
    },
    csvNote1: '* Merk 1: Seks-sifrede tickere som starter med 6 eller 0 blir automatisk tolket som kinesiske A-aksjer (.SS / .SZ).',
    csvNote2: '* Merk 2: For andre markeder legger du suffix rett på tickeren, for eksempel .TW eller .HK.',
    forceRefreshConfirm: 'Vil du tvinge en oppdatering? Dette hopper over 24-timers cachen og bruker ekte API-kvote.'
  },
  summary: {
    totalRealized: 'Samlet realisert P&L (omregnet)',
    totalUnrealized: 'Samlet urealisert P&L (omregnet)',
    totalValue: 'Nåværende porteføljeverdi (omregnet)',
    holdingCount: 'Åpne posisjoner',
    holdingUnit: 'posisjoner'
  },
  charts: {
    trendTitle: 'Kumulativ kostnadstrend',
    saveImage: 'Lagre diagram som bilde',
    noTrend: 'Det er ikke nok historikk ennå til å tegne en trend.',
    realizedTitle: 'Realisert P&L per ticker (solgt for tidlig / ryddig exit)',
    distributionTitle: 'Fordeling av porteføljeverdi (topp 10)',
    convertedNote: 'Vises etter omregning til {{currency}}',
    noPnlData: 'Ingen P&L-data ennå.',
    noHoldings: 'Ingen åpne posisjoner akkurat nå.',
    legendConverted: '{{label}} (omregnet)',
    costSeries: 'Kumulativ kostpris',
    realizedSeries: 'Kumulativ realisert P&L',
    ifSoldSeries: 'Om du solgte i dag',
    actualSeries: 'Faktisk realisert',
    others: 'Andre'
  },
  table: {
    title: 'Handelshistorikk per ticker',
    subtitle: 'Åpne en rad for å se detaljer om kjøp og salg. Beløpene vises fortsatt i markedets opprinnelige valuta.',
    columns: {
      symbol: 'Ticker / navn (marked · valuta)',
      holdingQty: 'Nåværende antall',
      currentValue: 'Siste kurs / markedsverdi',
      unrealized: 'Urealisert P&L',
      realized: 'Realisert P&L',
      ifSoldToday: 'Om solgt i dag',
      date: 'Dato',
      type: 'Type',
      quantity: 'Antall',
      price: 'Pris',
      amount: 'Beløp',
      pnl: 'P&L',
      actions: 'Handlinger'
    },
    manualBadge: 'Manuell',
    manualUpdatedAt: 'Manuell justering: {{value}}',
    apiUpdatedAt: 'Sist oppdatert via API: {{value}}',
    notUpdatedYet: 'Ikke oppdatert ennå',
    manualNamePlaceholder: 'Manuelt navn',
    currentPricePlaceholder: 'Pris',
    hedgeSuccess: 'Det viste seg å være smartest å gå ut tidligere ({{value}})',
    soldTooEarly: 'Du solgte litt for tidlig og lot {{value}} bli liggende igjen',
    tradeDetails: 'Detaljer for handelen',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} aksjer @ {{price}}',
    mobileHoldingQty: 'Posisjon',
    mobileUnrealized: 'Urealisert',
    mobileRealized: 'Realisert'
  },
  manager: {
    title: 'Innstillinger og handelslogg',
    clearAndLoadDemo: 'Tøm og last demo',
    apiKeyTitle: 'yfapi.net API-nøkkel',
    getFreeApiKey: 'Få en gratis',
    apiKeyPlaceholder: 'Lim inn x-api-key her (f.eks. A2sD8...)',
    saveApiKey: 'Lagre API-nøkkel',
    baseCurrencyTitle: 'Basisvaluta for oppsummeringskort',
    baseCurrencyHelp: '* Alle eiendeler i utenlandsk valuta blir regnet om til denne basisvalutaen med live FX, slik at kortene øverst summerer riktig.',
    hideZeroHolding: 'Skjul posisjoner som er helt lukket',
    manualRecordTitle: 'Legg til handel manuelt',
    fields: {
      date: 'Dato',
      type: 'Type',
      market: 'Marked',
      symbol: 'Ticker',
      quantity: 'Antall',
      price: 'Pris per enhet',
      amount: 'Totalbeløp',
      pnl: 'Realisert P&L (kun ved salg)'
    },
    placeholders: {
      symbol: 'F.eks. EQNR.OL',
      quantity: 'Antall aksjer',
      price: 'Pris per aksje',
      amount: 'I markedets valuta',
      pnl: 'Valgfritt'
    },
    saveChanges: 'Lagre endringer',
    addRecord: 'Legg til',
    noRecords: 'Det finnes ingen handler ennå.'
  },
  notice: {
    title: 'Velkommen til Trade Lens',
    body: 'Trade Lens er et open source-verktøy for investorer som gjør om megler-CSV-er til kostnadstrender, P&L-visninger og en mer lesbar porteføljeoversikt.',
    privacy: 'Personvern først: alt lagres bare i nettleseren din (IndexedDB). Ingenting sendes til serveren.',
    apiKey: 'API-nøkkelen brukes kun til å hente priser fra yfapi.net og lagres også lokalt.',
    sourceCode: 'Open source: se koden og bidra',
    dismiss: 'Ikke vis igjen'
  },
  messages: {
    apiKeySaved: 'API-nøkkelen er lagret.',
    manualStockSaved: '{{symbol}} ble oppdatert manuelt.',
    needApiKey: 'Legg inn API-nøkkelen fra yfapi.net i innstillingspanelet før du oppdaterer kurser.',
    cacheFresh: 'Kurser og valutakurser ble oppdatert i løpet av de siste 24 timene, så appen brukte lokal cache for å spare kvote.',
    updateSuccess: '{{count}} kurser og valutakurser ble oppdatert.',
    fetchFailed: 'Henting mislyktes: {{message}}',
    baseCurrencyChanged: 'Basisvalutaen er byttet til {{currency}}. Oppdaterer valutakurser nå...',
    recordUpdated: 'Handelsoppføringen ble oppdatert.',
    dataCleared: 'Data ble tømt og demosettet ble lastet inn på nytt.',
    clearConfirm: 'Vil du slette alle data og laste inn demoen på nytt? Dette kan ikke angres.',
    backupConfirm: 'Vil du eksportere dagens data som CSV-backup før sletting?'
  },
  data: {
    unknownSymbol: 'Ukjent ticker ({{symbol}})',
    unknown: 'Ukjent'
  }
});

const fiFI = mergeLocale(enUS, {
  common: {
    language: 'Kieli',
    close: 'Sulje',
    cancel: 'Peruuta',
    save: 'Tallenna',
    edit: 'Muokkaa',
    delete: 'Poista',
    importCsv: 'Tuo CSV',
    exportCsv: 'Vie CSV'
  },
  currencies: {
    TWD: 'Uusi Taiwanin dollari (TWD)',
    CNY: 'Kiinan juan (CNY)',
    HKD: 'Hongkongin dollari (HKD)',
    USD: 'Yhdysvaltain dollari (USD)',
    JPY: 'Japanin jeni (JPY)',
    EUR: 'Euro (EUR)'
  },
  markets: {
    all: 'Kaikki',
    chinaA: 'Kiinan A-osakkeet',
    hongKong: 'Hongkong',
    taiwan: 'Taiwan',
    japan: 'Japani',
    us: 'Yhdysvallat',
    other: 'Muut',
    unknown: 'Tuntematon'
  },
  tradeTypes: {
    buy: 'Osto',
    sell: 'Myynti'
  },
  timeRanges: {
    oneWeek: '1 vko',
    oneMonth: '1 kk',
    threeMonths: '3 kk',
    halfYear: '6 kk',
    ytd: 'YTD',
    oneYear: '1 vuosi',
    fiveYears: '5 vuotta',
    all: 'Kaikki'
  },
  app: {
    loadingLocalData: 'Ladataan paikallisia IndexedDB-tietoja...',
    generatingImage: 'Luodaan kuvaa...',
    imageExportSuccess: 'Kuvan vienti onnistui.',
    imageExportFail: 'Kuvan vienti epäonnistui.',
    noDataToExport: 'Vietävää dataa ei ole juuri nyt.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Globaali salkkunäkymä',
    demoDescription: 'Näet nyt supistetun demoaineiston. Tuo koko CSV, niin näet koko kuvan.',
    recordsLoaded: '{{count}} tapahtumaa ladattu ja analysoitu.',
    lastUpdated: 'Viimeksi päivitetty: {{value}}',
    switchToLight: 'Vaihda vaaleaan teemaan',
    switchToDark: 'Vaihda tummaan teemaan',
    settingsRecords: 'Asetukset ja tapahtumat',
    updatePrices: 'Päivitä hinnat',
    apiKeyRequired: 'API-avain vaaditaan',
    updateWithCache: 'Päivitä hinnat välimuistilla',
    setApiKeyFirst: 'Aseta API-avain ensin',
    forceRefresh: 'Pakota päivitys',
    forceRefreshTitle: 'Ohita välimuisti ja kuluta oikeaa API-kiintiötä',
    languageLabel: 'Vaihda kieli',
    csvTitle: 'CSV-kenttien ohje',
    csvIntro: 'Varmista, että CSV:ssä on vähintään nämä sarakkeet. Järjestyksellä ei ole väliä:',
    csvRows: {
      date: 'Päiväys (esim. 2025/01/01)',
      type: 'Tyyppi (Osto / Myynti)',
      symbol: 'Tunnus (esim. KNEBV.HE tai AAPL)',
      market: 'Markkina (valinnainen, hyödyllinen manuaalisissa kirjauksissa)',
      quantity: 'Määrä',
      price: 'Yksikköhinta (alkuperäinen valuutta)',
      amount: 'Kokonaissumma (alkuperäinen valuutta)',
      pnl: 'P&L (pakollinen myynneissä, alkuperäinen valuutta)'
    },
    csvNote1: '* Huomio 1: Kuusinumeroiset tunnukset, jotka alkavat numerolla 6 tai 0, tulkitaan automaattisesti Kiinan A-osakkeiksi (.SS / .SZ).',
    csvNote2: '* Huomio 2: Muilla markkinoilla lisää pääte suoraan tunnukseen, esimerkiksi .TW tai .HK.',
    forceRefreshConfirm: 'Pakotetaanko päivitys? Tämä ohittaa 24 tunnin välimuistin ja kuluttaa oikeaa API-kiintiötä.'
  },
  summary: {
    totalRealized: 'Realisoitu P&L yhteensä (muunnettuna)',
    totalUnrealized: 'Realisoitumaton P&L yhteensä (muunnettuna)',
    totalValue: 'Nykyinen salkun arvo (muunnettuna)',
    holdingCount: 'Avoimet positiot',
    holdingUnit: 'positiota'
  },
  charts: {
    trendTitle: 'Kumulatiivinen kulukehitys',
    saveImage: 'Tallenna kaavio kuvana',
    noTrend: 'Tapahtumahistoriaa ei ole vielä tarpeeksi trendin piirtämiseen.',
    realizedTitle: 'Realisoitu P&L yhtiöittäin (myyty liian aikaisin / siisti exit)',
    distributionTitle: 'Salkun arvon jakauma (top 10)',
    convertedNote: 'Näytetään muunnettuna valuuttaan {{currency}}',
    noPnlData: 'P&L-dataa ei ole vielä.',
    noHoldings: 'Avoimia positioita ei ole juuri nyt.',
    legendConverted: '{{label}} (muunnettuna)',
    costSeries: 'Kumulatiivinen hankintameno',
    realizedSeries: 'Kumulatiivinen realisoitu P&L',
    ifSoldSeries: 'Jos myisit tänään',
    actualSeries: 'Oikeasti realisoitu',
    others: 'Muut'
  },
  table: {
    title: 'Tapahtumahistoria tunnuksittain',
    subtitle: 'Avaa rivi nähdäksesi ostot ja myynnit tarkemmin. Summat näytetään edelleen markkinan alkuperäisessä valuutassa.',
    columns: {
      symbol: 'Tunnus / nimi (markkina · valuutta)',
      holdingQty: 'Nykyinen määrä',
      currentValue: 'Viimeisin hinta / markkina-arvo',
      unrealized: 'Realisoitumaton P&L',
      realized: 'Realisoitu P&L',
      ifSoldToday: 'Jos myisit tänään',
      date: 'Päiväys',
      type: 'Tyyppi',
      quantity: 'Määrä',
      price: 'Hinta',
      amount: 'Summa',
      pnl: 'P&L',
      actions: 'Toiminnot'
    },
    manualBadge: 'Manuaalinen',
    manualUpdatedAt: 'Manuaalinen muutos: {{value}}',
    apiUpdatedAt: 'API päivitetty: {{value}}',
    notUpdatedYet: 'Ei päivitetty vielä',
    manualNamePlaceholder: 'Manuaalinen nimi',
    currentPricePlaceholder: 'Hinta',
    hedgeSuccess: 'Aiempi poistuminen olikin tällä kertaa parempi ratkaisu ({{value}})',
    soldTooEarly: 'Myit hieman liian aikaisin ja jätit {{value}} pöydälle',
    tradeDetails: 'Toteutuksen tiedot',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} osaketta @ {{price}}',
    mobileHoldingQty: 'Positio',
    mobileUnrealized: 'Realisoitumaton',
    mobileRealized: 'Realisoitu'
  },
  manager: {
    title: 'Asetukset ja tapahtumaloki',
    clearAndLoadDemo: 'Tyhjennä ja lataa demo',
    apiKeyTitle: 'yfapi.net API-avain',
    getFreeApiKey: 'Hanki ilmaiseksi',
    apiKeyPlaceholder: 'Liitä x-api-key tähän (esim. A2sD8...)',
    saveApiKey: 'Tallenna API-avain',
    baseCurrencyTitle: 'Yhteenvetokorttien perusvaluutta',
    baseCurrencyHelp: '* Kaikki ulkomaan valuutassa olevat varat muunnetaan tähän perusvaluuttaan live-FX:llä, jotta yläosan kortit osaavat laskea kaiken yhteen järkevästi.',
    hideZeroHolding: 'Piilota kokonaan suljetut positiot',
    manualRecordTitle: 'Lisää tapahtuma käsin',
    fields: {
      date: 'Päiväys',
      type: 'Tyyppi',
      market: 'Markkina',
      symbol: 'Tunnus',
      quantity: 'Määrä',
      price: 'Yksikköhinta',
      amount: 'Kokonaissumma',
      pnl: 'Realisoitu P&L (vain myynnit)'
    },
    placeholders: {
      symbol: 'Esim. KNEBV.HE',
      quantity: 'Osakemäärä',
      price: 'Hinta per osake',
      amount: 'Markkinan valuutassa',
      pnl: 'Valinnainen'
    },
    saveChanges: 'Tallenna muutokset',
    addRecord: 'Lisää',
    noRecords: 'Tapahtumia ei ole vielä.'
  },
  notice: {
    title: 'Tervetuloa Trade Lensiin',
    body: 'Trade Lens on avoimen lähdekoodin työkalu sijoittajille. Se muuttaa välittäjän CSV:t kustannustrendeiksi, P&L-näkymiksi ja luettavammaksi salkkunäkymäksi.',
    privacy: 'Yksityisyys ensin: kaikki pysyy vain selaimessasi (IndexedDB). Mitään ei lähetetä palvelimelle.',
    apiKey: 'API-avainta käytetään vain hintojen hakemiseen yfapi.netistä, ja sekin säilyy paikallisesti.',
    sourceCode: 'Avoin lähdekoodi: katso koodi ja osallistu',
    dismiss: 'Älä näytä uudelleen'
  },
  messages: {
    apiKeySaved: 'API-avain tallennettu.',
    manualStockSaved: '{{symbol}} päivitettiin käsin.',
    needApiKey: 'Syötä yfapi.netin API-avain asetuspaneeliin ennen hintojen päivittämistä.',
    cacheFresh: 'Hinnat ja valuuttakurssit on päivitetty viimeisen 24 tunnin aikana, joten sovellus käytti paikallista välimuistia kiintiön säästämiseksi.',
    updateSuccess: '{{count}} hintaa ja valuuttakurssia päivitettiin.',
    fetchFailed: 'Haku epäonnistui: {{message}}',
    baseCurrencyChanged: 'Perusvaluutta vaihdettiin valuuttaan {{currency}}. Päivitetään valuuttakursseja...',
    recordUpdated: 'Tapahtuma päivitettiin.',
    dataCleared: 'Data tyhjennettiin ja demosetti ladattiin uudelleen.',
    clearConfirm: 'Poistetaanko kaikki tiedot ja ladataanko demo uudelleen? Tätä ei voi perua.',
    backupConfirm: 'Haluatko viedä nykyiset tiedot CSV-varmuuskopioksi ennen tyhjennystä?'
  },
  data: {
    unknownSymbol: 'Tuntematon tunnus ({{symbol}})',
    unknown: 'Tuntematon'
  }
});

const etEE = mergeLocale(enUS, {
  common: {
    language: 'Keel',
    close: 'Sulge',
    cancel: 'Tühista',
    save: 'Salvesta',
    edit: 'Muuda',
    delete: 'Kustuta',
    importCsv: 'Impordi CSV',
    exportCsv: 'Ekspordi CSV'
  },
  currencies: {
    TWD: 'Uus Taiwani dollar (TWD)',
    CNY: 'Hiina jüaan (CNY)',
    HKD: 'Hongkongi dollar (HKD)',
    USD: 'USA dollar (USD)',
    JPY: 'Jaapani jeen (JPY)',
    EUR: 'Euro (EUR)'
  },
  markets: {
    all: 'Kõik',
    chinaA: 'Hiina A-aktsiad',
    hongKong: 'Hongkong',
    taiwan: 'Taiwan',
    japan: 'Jaapan',
    us: 'USA',
    other: 'Muu',
    unknown: 'Tundmatu'
  },
  tradeTypes: {
    buy: 'Ost',
    sell: 'Müük'
  },
  timeRanges: {
    oneWeek: '1 nädal',
    oneMonth: '1 kuu',
    threeMonths: '3 kuud',
    halfYear: '6 kuud',
    ytd: 'YTD',
    oneYear: '1 aasta',
    fiveYears: '5 aastat',
    all: 'Kõik'
  },
  app: {
    loadingLocalData: 'Kohalike IndexedDB andmete laadimine...',
    generatingImage: 'Pildi loomine...',
    imageExportSuccess: 'Pilt eksporditi edukalt.',
    imageExportFail: 'Pildi eksport ebaõnnestus.',
    noDataToExport: 'Praegu pole midagi eksportida.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Globaalne portfellivaade',
    demoDescription: 'Praegu näed kärbitud demoandmestikku. Impordi täielik CSV, et näha tervikpilti.',
    recordsLoaded: '{{count}} tehingut laaditi ja analüüsiti.',
    lastUpdated: 'Viimati uuendatud: {{value}}',
    switchToLight: 'Lülitu heledale teemale',
    switchToDark: 'Lülitu tumedale teemale',
    settingsRecords: 'Seaded ja tehingud',
    updatePrices: 'Uuenda hindu',
    apiKeyRequired: 'API-võti on vajalik',
    updateWithCache: 'Uuenda hindu vahemäluga',
    setApiKeyFirst: 'Sisesta enne API-võti',
    forceRefresh: 'Sunni uuendus',
    forceRefreshTitle: 'Eira vahemälu ja kuluta päris API limiiti',
    languageLabel: 'Vaheta keelt',
    csvTitle: 'CSV väljade juhend',
    csvIntro: 'Veendu, et CSV-s oleks vähemalt need veerud. Järjekord pole oluline:',
    csvRows: {
      date: 'Kuupäev (nt 2025/01/01)',
      type: 'Tüüp (Ost / Müük)',
      symbol: 'Sümbol (nt TAL1T.TL või AAPL)',
      market: 'Turg (valikuline, kasulik käsitsi kirjete puhul)',
      quantity: 'Kogus',
      price: 'Ühiku hind (algne valuuta)',
      amount: 'Kogusumma (algne valuuta)',
      pnl: 'P&L (müügil kohustuslik, algne valuuta)'
    },
    csvNote1: '* Märkus 1: Kuuekohalised sümbolid, mis algavad 6 või 0-ga, tuvastatakse automaatselt Hiina A-aktsiatena (.SS / .SZ).',
    csvNote2: '* Märkus 2: Muude turgude puhul lisa suffix otse sümboli lõppu, näiteks .TW või .HK.',
    forceRefreshConfirm: 'Kas sundida uuendust? See eirab 24 tunni vahemälu ja kulutab päris API limiiti.'
  },
  summary: {
    totalRealized: 'Kokku realiseeritud P&L (teisendatud)',
    totalUnrealized: 'Kokku realiseerimata P&L (teisendatud)',
    totalValue: 'Praegune portfelli väärtus (teisendatud)',
    holdingCount: 'Avatud positsioonid',
    holdingUnit: 'positsiooni'
  },
  charts: {
    trendTitle: 'Kumulatiivne kulutrend',
    saveImage: 'Salvesta graafik pildina',
    noTrend: 'Trendi joonistamiseks pole veel piisavalt ajalugu.',
    realizedTitle: 'Realiseeritud P&L sümboli järgi (müüsid liiga vara / korralik exit)',
    distributionTitle: 'Portfelli väärtuse jaotus (top 10)',
    convertedNote: 'Näidatakse valuutas {{currency}}',
    noPnlData: 'P&L-andmeid veel pole.',
    noHoldings: 'Avatud positsioone hetkel pole.',
    legendConverted: '{{label}} (teisendatud)',
    costSeries: 'Kumulatiivne soetusmaksumus',
    realizedSeries: 'Kumulatiivne realiseeritud P&L',
    ifSoldSeries: 'Kui müüksid täna',
    actualSeries: 'Tegelikult realiseeritud',
    others: 'Muu'
  },
  table: {
    title: 'Tehinguajalugu sümboli kaupa',
    subtitle: 'Ava rida, et näha ostu- ja müügitehingute detaile. Summad jäävad turu algses valuutas.',
    columns: {
      symbol: 'Sümbol / nimi (turg · valuuta)',
      holdingQty: 'Praegune kogus',
      currentValue: 'Viimane hind / turuväärtus',
      unrealized: 'Realiseerimata P&L',
      realized: 'Realiseeritud P&L',
      ifSoldToday: 'Kui müüksid täna',
      date: 'Kuupäev',
      type: 'Tüüp',
      quantity: 'Kogus',
      price: 'Hind',
      amount: 'Summa',
      pnl: 'P&L',
      actions: 'Toimingud'
    },
    manualBadge: 'Käsitsi',
    manualUpdatedAt: 'Käsitsi uuendatud: {{value}}',
    apiUpdatedAt: 'API viimane uuendus: {{value}}',
    notUpdatedYet: 'Pole veel uuendatud',
    manualNamePlaceholder: 'Käsitsi nimi',
    currentPricePlaceholder: 'Hind',
    hedgeSuccess: 'Varem väljumine osutus seekord paremaks sammuks ({{value}})',
    soldTooEarly: 'Müüsid veidi liiga vara ja jätsid {{value}} lauale',
    tradeDetails: 'Tehingu detailid',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} aktsiat @ {{price}}',
    mobileHoldingQty: 'Positsioon',
    mobileUnrealized: 'Realiseerimata',
    mobileRealized: 'Realiseeritud'
  },
  manager: {
    title: 'Seaded ja tehingulogi',
    clearAndLoadDemo: 'Puhasta ja lae demo',
    apiKeyTitle: 'yfapi.net API-võti',
    getFreeApiKey: 'Hangi tasuta',
    apiKeyPlaceholder: 'Kleebi siia oma x-api-key (nt A2sD8...)',
    saveApiKey: 'Salvesta API-võti',
    baseCurrencyTitle: 'Kokkuvõtte kaartide baasvaluuta',
    baseCurrencyHelp: '* Kõik välisvaluutas varad teisendatakse live-FX abil sellesse baasvaluutasse, et ülemised kokkuvõttekaardid saaksid kõik korrektselt kokku liita.',
    hideZeroHolding: 'Peida täielikult suletud positsioonid',
    manualRecordTitle: 'Lisa tehing käsitsi',
    fields: {
      date: 'Kuupäev',
      type: 'Tüüp',
      market: 'Turg',
      symbol: 'Sümbol',
      quantity: 'Kogus',
      price: 'Ühiku hind',
      amount: 'Kogusumma',
      pnl: 'Realiseeritud P&L (ainult müük)'
    },
    placeholders: {
      symbol: 'Nt TAL1T.TL',
      quantity: 'Aktsiate arv',
      price: 'Hind aktsia kohta',
      amount: 'Selle turu valuutas',
      pnl: 'Valikuline'
    },
    saveChanges: 'Salvesta muudatused',
    addRecord: 'Lisa',
    noRecords: 'Tehinguid veel pole.'
  },
  notice: {
    title: 'Tere tulemast Trade Lensi',
    body: 'Trade Lens on avatud lähtekoodiga tööriist investoritele, mis muudab maakleri CSV-d kulutrendideks, P&L-vaadeteks ja loetavamaks portfellipildiks.',
    privacy: 'Privaatsus ennekõike: kõik jääb ainult sinu brauserisse (IndexedDB). Midagi ei saadeta serverisse.',
    apiKey: 'API-võtit kasutatakse ainult hindade küsimiseks yfapi.net-ist ning see salvestatakse samuti lokaalselt.',
    sourceCode: 'Avatud lähtekood: vaata koodi ja panusta',
    dismiss: 'Ära näita enam'
  },
  messages: {
    apiKeySaved: 'API-võti salvestati.',
    manualStockSaved: '{{symbol}} uuendati käsitsi.',
    needApiKey: 'Sisesta enne hindade uuendamist seadete paneeli yfapi.net API-võti.',
    cacheFresh: 'Hinnad ja valuutakursid on viimase 24 tunni jooksul juba uuendatud, seega kasutas rakendus limiidi säästmiseks kohalikku vahemälu.',
    updateSuccess: '{{count}} hinda ja valuutakurssi uuendati.',
    fetchFailed: 'Päring ebaõnnestus: {{message}}',
    baseCurrencyChanged: 'Baasvaluuta vahetati valuuta {{currency}} vastu. Valuutakursse uuendatakse...',
    recordUpdated: 'Tehing kirje uuendati.',
    dataCleared: 'Andmed puhastati ja demoandmed laaditi uuesti.',
    clearConfirm: 'Kas kustutada kõik andmed ja laadida demo uuesti? Seda ei saa tagasi võtta.',
    backupConfirm: 'Kas soovid enne puhastamist eksportida praegused andmed CSV-varukoopiana?'
  },
  data: {
    unknownSymbol: 'Tundmatu sümbol ({{symbol}})',
    unknown: 'Tundmatu'
  }
});

const isIS = mergeLocale(enUS, {
  common: {
    language: 'Tungumál',
    close: 'Loka',
    cancel: 'Hætta við',
    save: 'Vista',
    edit: 'Breyta',
    delete: 'Eyða',
    importCsv: 'Flytja inn CSV',
    exportCsv: 'Flytja út CSV'
  },
  currencies: {
    TWD: 'Nýr taívanskur dalur (TWD)',
    CNY: 'Kínverskt júan (CNY)',
    HKD: 'Hong Kong dalur (HKD)',
    USD: 'Bandaríkjadalur (USD)',
    JPY: 'Japanskt jen (JPY)',
    ISK: 'Íslensk króna (ISK)'
  },
  markets: {
    all: 'Allt',
    chinaA: 'Kínversk A-hlutabréf',
    hongKong: 'Hong Kong',
    taiwan: 'Taívan',
    japan: 'Japan',
    us: 'Bandaríkin',
    other: 'Annað',
    unknown: 'Óþekkt'
  },
  tradeTypes: {
    buy: 'Kaup',
    sell: 'Sala'
  },
  timeRanges: {
    oneWeek: '1 vika',
    oneMonth: '1 mán.',
    threeMonths: '3 mán.',
    halfYear: '6 mán.',
    ytd: 'Frá áramótum',
    oneYear: '1 ár',
    fiveYears: '5 ár',
    all: 'Allt'
  },
  app: {
    loadingLocalData: 'Hleð inn staðbundnum IndexedDB-gögnum...',
    generatingImage: 'Bý til mynd...',
    imageExportSuccess: 'Mynd var flutt út.',
    imageExportFail: 'Ekki tókst að flytja mynd út.',
    noDataToExport: 'Engin gögn til að flytja út núna.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Alþjóðlegt eignasafnsyfirlit',
    demoDescription: 'Þú sérð nú stytt demógagnasett. Flyttu inn allt CSV-skráarsafnið til að fá heildarmyndina.',
    recordsLoaded: '{{count}} viðskipti hafa verið hlaðin inn og greind.',
    lastUpdated: 'Síðast uppfært: {{value}}',
    switchToLight: 'Skipta í ljóst þema',
    switchToDark: 'Skipta í dökkt þema',
    settingsRecords: 'Stillingar og viðskipti',
    updatePrices: 'Uppfæra verð',
    apiKeyRequired: 'API-lykill þarf',
    updateWithCache: 'Uppfæra verð með skyndiminni',
    setApiKeyFirst: 'Settu inn API-lykil fyrst',
    forceRefresh: 'Þvinga uppfærslu',
    forceRefreshTitle: 'Sleppa skyndiminni og nota raunverulegt API-kvóta',
    languageLabel: 'Skipta um tungumál',
    csvTitle: 'Leiðarvísir að CSV-reitum',
    csvIntro: 'Gakktu úr skugga um að CSV-skráin hafi að minnsta kosti þessa dálka. Röðin skiptir ekki máli:',
    csvRows: {
      date: 'Dagsetning (t.d. 2025/01/01)',
      type: 'Tegund (Kaup / Sala)',
      symbol: 'Tákn (t.d. ICEAIR.IC eða AAPL)',
      market: 'Markaður (valfrjálst, hentugt fyrir handvirkar færslur)',
      quantity: 'Magn',
      price: 'Verð á einingu (upprunalegur gjaldmiðill)',
      amount: 'Heildarupphæð (upprunalegur gjaldmiðill)',
      pnl: 'P&L (skylda við sölu, upprunalegur gjaldmiðill)'
    },
    csvNote1: '* Ath. 1: Sex stafa tákn sem byrja á 6 eða 0 eru sjálfkrafa túlkuð sem kínversk A-hlutabréf (.SS / .SZ).',
    csvNote2: '* Ath. 2: Fyrir aðra markaði skaltu bæta endingunni beint við táknið, til dæmis .TW eða .HK.',
    forceRefreshConfirm: 'Viltu þvinga uppfærslu? Þetta hunsar 24 tíma skyndiminni og notar raunverulegt API-kvóta.'
  },
  summary: {
    totalRealized: 'Samtals innleyst P&L (umbreytt)',
    totalUnrealized: 'Samtals óinnleyst P&L (umbreytt)',
    totalValue: 'Núverandi virði eignasafns (umbreytt)',
    holdingCount: 'Opnar stöður',
    holdingUnit: 'stöður'
  },
  charts: {
    trendTitle: 'Safnað kostnaðarferli',
    saveImage: 'Vista línurit sem mynd',
    noTrend: 'Viðskiptasagan er ekki enn næg til að teikna þróun.',
    realizedTitle: 'Innleyst P&L eftir félagi (selt of snemma / snyrtilegt exit)',
    distributionTitle: 'Dreifing eignasafnsvirðis (topp 10)',
    convertedNote: 'Sýnt eftir umbreytingu í {{currency}}',
    noPnlData: 'Engin P&L-gögn enn.',
    noHoldings: 'Engar opnar stöður núna.',
    legendConverted: '{{label}} (umbreytt)',
    costSeries: 'Safnaður kostnaður',
    realizedSeries: 'Safnað innleyst P&L',
    ifSoldSeries: 'Ef þú seldir í dag',
    actualSeries: 'Raunverulega innleyst',
    others: 'Annað'
  },
  table: {
    title: 'Viðskiptasaga eftir tákni',
    subtitle: 'Opnaðu línu til að sjá nánari kaup- og sölusögu. Upphæðir eru áfram sýndar í upprunalegum gjaldmiðli markaðarins.',
    columns: {
      symbol: 'Tákn / nafn (markaður · gjaldmiðill)',
      holdingQty: 'Núverandi magn',
      currentValue: 'Síðasta verð / markaðsvirði',
      unrealized: 'Óinnleyst P&L',
      realized: 'Innleyst P&L',
      ifSoldToday: 'Ef selt í dag',
      date: 'Dagsetning',
      type: 'Tegund',
      quantity: 'Magn',
      price: 'Verð',
      amount: 'Upphæð',
      pnl: 'P&L',
      actions: 'Aðgerðir'
    },
    manualBadge: 'Handvirkt',
    manualUpdatedAt: 'Handvirkt uppfært: {{value}}',
    apiUpdatedAt: 'API síðast uppfært: {{value}}',
    notUpdatedYet: 'Ekki uppfært enn',
    manualNamePlaceholder: 'Handvirkt nafn',
    currentPricePlaceholder: 'Verð',
    hedgeSuccess: 'Að fara fyrr út reyndist vera betri leikur að þessu sinni ({{value}})',
    soldTooEarly: 'Þú seldir aðeins of snemma og skildir {{value}} eftir á borðinu',
    tradeDetails: 'Viðskiptaupplýsingar',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} hlutir @ {{price}}',
    mobileHoldingQty: 'Staða',
    mobileUnrealized: 'Óinnleyst',
    mobileRealized: 'Innleyst'
  },
  manager: {
    title: 'Stillingar og viðskiptalisti',
    clearAndLoadDemo: 'Hreinsa og hlaða demo',
    apiKeyTitle: 'yfapi.net API-lykill',
    getFreeApiKey: 'Fá ókeypis',
    apiKeyPlaceholder: 'Límdu x-api-key hér (t.d. A2sD8...)',
    saveApiKey: 'Vista API-lykil',
    baseCurrencyTitle: 'Grunngjaldmiðill yfirlitskorta',
    baseCurrencyHelp: '* Allar eignir í erlendum gjaldmiðlum eru umbreyttar yfir í þennan grunngjaldmiðil með lifandi FX svo að yfirlitskortin að ofan leggi allt rétt saman.',
    hideZeroHolding: 'Fela stöður sem eru alveg lokaðar',
    manualRecordTitle: 'Bæta við viðskiptum handvirkt',
    fields: {
      date: 'Dagsetning',
      type: 'Tegund',
      market: 'Markaður',
      symbol: 'Tákn',
      quantity: 'Magn',
      price: 'Verð á einingu',
      amount: 'Heildarupphæð',
      pnl: 'Innleyst P&L (aðeins við sölu)'
    },
    placeholders: {
      symbol: 'T.d. ICEAIR.IC',
      quantity: 'Fjöldi hluta',
      price: 'Verð á hlut',
      amount: 'Í gjaldmiðli markaðarins',
      pnl: 'Valfrjálst'
    },
    saveChanges: 'Vista breytingar',
    addRecord: 'Bæta við',
    noRecords: 'Engin viðskipti enn.'
  },
  notice: {
    title: 'Velkomin í Trade Lens',
    body: 'Trade Lens er opinn hugbúnaður fyrir fjárfesta sem breytir CSV-skrám frá miðlara í kostnaðarþróun, P&L-yfirsýn og skýrari mynd af eignasafninu.',
    privacy: 'Persónuvernd fyrst: allt helst í vafranum þínum (IndexedDB). Ekkert er sent á netþjóninn.',
    apiKey: 'API-lykillinn er eingöngu notaður til að sækja verð frá yfapi.net og er einnig geymdur staðbundið.',
    sourceCode: 'Opinn hugbúnaður: skoðaðu kóðann og leggðu þitt af mörkum',
    dismiss: 'Ekki sýna aftur'
  },
  messages: {
    apiKeySaved: 'API-lykill vistaður.',
    manualStockSaved: '{{symbol}} var uppfært handvirkt.',
    needApiKey: 'Settu inn API-lykil frá yfapi.net í stillingaspjaldið áður en þú uppfærir verð.',
    cacheFresh: 'Verð og gjaldeyrisgengi hafa þegar verið uppfærð síðustu 24 klukkustundir, þannig að appið notaði staðbundið skyndiminni til að spara kvóta.',
    updateSuccess: '{{count}} verð og gjaldeyrisgengi voru uppfærð.',
    fetchFailed: 'Sótt mistókst: {{message}}',
    baseCurrencyChanged: 'Grunngjaldmiðli var skipt í {{currency}}. Verið er að uppfæra gengi...',
    recordUpdated: 'Viðskiptaskráning var uppfærð.',
    dataCleared: 'Gögn voru hreinsuð og demo-safnið hlaðið aftur inn.',
    clearConfirm: 'Viltu eyða öllum gögnum og hlaða demo-safninu aftur? Þetta er ekki hægt að afturkalla.',
    backupConfirm: 'Viltu flytja út núverandi gögn sem CSV-afrit áður en þau eru hreinsuð?'
  },
  data: {
    unknownSymbol: 'Óþekkt tákn ({{symbol}})',
    unknown: 'Óþekkt'
  }
});

const lvLV = mergeLocale(enUS, {
  common: {
    language: 'Valoda',
    close: 'Aizvērt',
    cancel: 'Atcelt',
    save: 'Saglabāt',
    edit: 'Rediģēt',
    delete: 'Dzēst',
    importCsv: 'Importēt CSV',
    exportCsv: 'Eksportēt CSV'
  },
  currencies: {
    TWD: 'Jaunais Taivānas dolārs (TWD)',
    CNY: 'Ķīnas juaņa (CNY)',
    HKD: 'Honkongas dolārs (HKD)',
    USD: 'ASV dolārs (USD)',
    JPY: 'Japānas jena (JPY)',
    EUR: 'Eiro (EUR)'
  },
  markets: {
    all: 'Visi',
    chinaA: 'Ķīnas A akcijas',
    hongKong: 'Honkonga',
    taiwan: 'Taivāna',
    japan: 'Japāna',
    us: 'ASV',
    other: 'Citi',
    unknown: 'Nezināms'
  },
  tradeTypes: {
    buy: 'Pirkums',
    sell: 'Pārdošana'
  },
  timeRanges: {
    oneWeek: '1 ned.',
    oneMonth: '1 mēn.',
    threeMonths: '3 mēn.',
    halfYear: '6 mēn.',
    ytd: 'No gada sākuma',
    oneYear: '1 gads',
    fiveYears: '5 gadi',
    all: 'Visi'
  },
  app: {
    loadingLocalData: 'Ielādē vietējos IndexedDB datus...',
    generatingImage: 'Veido attēlu...',
    imageExportSuccess: 'Attēls veiksmīgi eksportēts.',
    imageExportFail: 'Attēla eksportēšana neizdevās.',
    noDataToExport: 'Pašlaik nav datu eksportam.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Globālais portfeļa panelis',
    demoDescription: 'Pašlaik redzi saīsinātu demo datu kopu. Importē pilno CSV, lai redzētu pilnu ainu.',
    recordsLoaded: '{{count}} darījumi ielādēti un analizēti.',
    lastUpdated: 'Pēdējoreiz atjaunināts: {{value}}',
    switchToLight: 'Pārslēgties uz gaišo tēmu',
    switchToDark: 'Pārslēgties uz tumšo tēmu',
    settingsRecords: 'Iestatījumi un darījumi',
    updatePrices: 'Atjaunināt cenas',
    apiKeyRequired: 'Nepieciešama API atslēga',
    updateWithCache: 'Atjaunināt cenas ar kešatmiņu',
    setApiKeyFirst: 'Vispirms ievadi API atslēgu',
    forceRefresh: 'Piespiedu atjaunināšana',
    forceRefreshTitle: 'Ignorēt kešatmiņu un tērēt īsto API limitu',
    languageLabel: 'Mainīt valodu',
    csvTitle: 'CSV lauku ceļvedis',
    csvIntro: 'Pārliecinies, ka CSV failā ir vismaz šīs kolonnas. Secība nav svarīga:',
    csvRows: {
      date: 'Datums (piem., 2025/01/01)',
      type: 'Tips (Pirkums / Pārdošana)',
      symbol: 'Simbols (piem., SAF1R.RG vai AAPL)',
      market: 'Tirgus (neobligāti, noder manuāliem ierakstiem)',
      quantity: 'Daudzums',
      price: 'Cena par vienību (sākotnējā valūta)',
      amount: 'Kopējā summa (sākotnējā valūta)',
      pnl: 'P&L (obligāti pārdošanā, sākotnējā valūta)'
    },
    csvNote1: '* Piezīme 1: Sešciparu simboli, kas sākas ar 6 vai 0, tiek automātiski atpazīti kā Ķīnas A akcijas (.SS / .SZ).',
    csvNote2: '* Piezīme 2: Citos tirgos vienkārši pievieno sufiksu tieši simbolam, piemēram, .TW vai .HK.',
    forceRefreshConfirm: 'Vai piespiedu kārtā atjaunināt? Tas ignorēs 24 stundu kešatmiņu un patērēs īsto API limitu.'
  },
  summary: {
    totalRealized: 'Kopējais realizētais P&L (pārrēķināts)',
    totalUnrealized: 'Kopējais nerealizētais P&L (pārrēķināts)',
    totalValue: 'Pašreizējā portfeļa vērtība (pārrēķināta)',
    holdingCount: 'Atvērtās pozīcijas',
    holdingUnit: 'pozīcijas'
  },
  charts: {
    trendTitle: 'Kumulatīvo izmaksu tendence',
    saveImage: 'Saglabāt grafiku kā attēlu',
    noTrend: 'Vēl nav pietiekami daudz vēstures, lai uzzīmētu tendenci.',
    realizedTitle: 'Realizētais P&L pa vērtspapīriem (pārdots par agru / labs exit)',
    distributionTitle: 'Portfeļa vērtības sadalījums (top 10)',
    convertedNote: 'Rādīts pēc pārrēķina uz {{currency}}',
    noPnlData: 'P&L datu vēl nav.',
    noHoldings: 'Šobrīd nav atvērtu pozīciju.',
    legendConverted: '{{label}} (pārrēķināts)',
    costSeries: 'Kumulatīvās izmaksas',
    realizedSeries: 'Kumulatīvais realizētais P&L',
    ifSoldSeries: 'Ja pārdotu šodien',
    actualSeries: 'Faktiski realizēts',
    others: 'Citi'
  },
  table: {
    title: 'Darījumu vēsture pa simboliem',
    subtitle: 'Atver rindu, lai redzētu pirkumu un pārdošanu detaļas. Summas joprojām tiek rādītas tirgus sākotnējā valūtā.',
    columns: {
      symbol: 'Simbols / nosaukums (tirgus · valūta)',
      holdingQty: 'Pašreizējais daudzums',
      currentValue: 'Pēdējā cena / tirgus vērtība',
      unrealized: 'Nerealizētais P&L',
      realized: 'Realizētais P&L',
      ifSoldToday: 'Ja pārdotu šodien',
      date: 'Datums',
      type: 'Tips',
      quantity: 'Daudzums',
      price: 'Cena',
      amount: 'Summa',
      pnl: 'P&L',
      actions: 'Darbības'
    },
    manualBadge: 'Manuāli',
    manualUpdatedAt: 'Manuāli atjaunināts: {{value}}',
    apiUpdatedAt: 'API pēdējoreiz atjaunināts: {{value}}',
    notUpdatedYet: 'Vēl nav atjaunināts',
    manualNamePlaceholder: 'Manuāls nosaukums',
    currentPricePlaceholder: 'Cena',
    hedgeSuccess: 'Agrāka iziešana izrādījās labākais gājiens šoreiz ({{value}})',
    soldTooEarly: 'Pārdevi mazliet par agru un atstāji {{value}} uz galda',
    tradeDetails: 'Darījuma detaļas',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} akcijas @ {{price}}',
    mobileHoldingQty: 'Pozīcija',
    mobileUnrealized: 'Nerealizēts',
    mobileRealized: 'Realizēts'
  },
  manager: {
    title: 'Iestatījumi un darījumu žurnāls',
    clearAndLoadDemo: 'Notīrīt un ielādēt demo',
    apiKeyTitle: 'yfapi.net API atslēga',
    getFreeApiKey: 'Saņem bez maksas',
    apiKeyPlaceholder: 'Ielīmē savu x-api-key šeit (piem., A2sD8...)',
    saveApiKey: 'Saglabāt API atslēgu',
    baseCurrencyTitle: 'Kopsavilkuma karšu bāzes valūta',
    baseCurrencyHelp: '* Visi ārvalstu valūtas aktīvi tiek pārrēķināti šajā bāzes valūtā ar live-FX, lai augšējās kopsavilkuma kartes varētu visu korekti saskaitīt.',
    hideZeroHolding: 'Paslēpt pilnībā slēgtās pozīcijas',
    manualRecordTitle: 'Pievienot darījumu manuāli',
    fields: {
      date: 'Datums',
      type: 'Tips',
      market: 'Tirgus',
      symbol: 'Simbols',
      quantity: 'Daudzums',
      price: 'Cena par vienību',
      amount: 'Kopējā summa',
      pnl: 'Realizētais P&L (tikai pārdošanā)'
    },
    placeholders: {
      symbol: 'Piem., SAF1R.RG',
      quantity: 'Akciju skaits',
      price: 'Cena par akciju',
      amount: 'Šī tirgus valūtā',
      pnl: 'Neobligāti'
    },
    saveChanges: 'Saglabāt izmaiņas',
    addRecord: 'Pievienot',
    noRecords: 'Darījumu vēl nav.'
  },
  notice: {
    title: 'Laipni lūdzam Trade Lens',
    body: 'Trade Lens ir atvērtā koda rīks investoriem, kas pārveido brokera CSV failus izmaksu tendencēs, P&L skatā un skaidrākā portfeļa pārskatā.',
    privacy: 'Privātums pirmajā vietā: viss paliek tikai tavā pārlūkā (IndexedDB). Nekas netiek sūtīts uz serveri.',
    apiKey: 'API atslēga tiek izmantota tikai cenu saņemšanai no yfapi.net un arī tiek glabāta lokāli.',
    sourceCode: 'Atvērtais kods: apskati kodu un piedalies',
    dismiss: 'Nerādīt vēlreiz'
  },
  messages: {
    apiKeySaved: 'API atslēga saglabāta.',
    manualStockSaved: '{{symbol}} atjaunināts manuāli.',
    needApiKey: 'Pirms cenu atjaunināšanas ievadi yfapi.net API atslēgu iestatījumu panelī.',
    cacheFresh: 'Cenas un valūtu kursi tika atjaunināti pēdējo 24 stundu laikā, tāpēc lietotne izmantoja lokālo kešatmiņu, lai taupītu limitu.',
    updateSuccess: '{{count}} cenas un valūtu kursi tika atjaunināti.',
    fetchFailed: 'Neizdevās ielādēt: {{message}}',
    baseCurrencyChanged: 'Bāzes valūta nomainīta uz {{currency}}. Tiek atjaunināti valūtu kursi...',
    recordUpdated: 'Darījuma ieraksts tika atjaunināts.',
    dataCleared: 'Dati tika notīrīti un demo kopums ielādēts no jauna.',
    clearConfirm: 'Vai notīrīt visus datus un ielādēt demo no jauna? To nevar atsaukt.',
    backupConfirm: 'Vai pirms notīrīšanas vēlies eksportēt pašreizējos datus kā CSV rezerves kopiju?'
  },
  data: {
    unknownSymbol: 'Nezināms simbols ({{symbol}})',
    unknown: 'Nezināms'
  }
});

const ltLT = mergeLocale(enUS, {
  common: {
    language: 'Kalba',
    close: 'Uždaryti',
    cancel: 'Atšaukti',
    save: 'Išsaugoti',
    edit: 'Redaguoti',
    delete: 'Ištrinti',
    importCsv: 'Importuoti CSV',
    exportCsv: 'Eksportuoti CSV'
  },
  currencies: {
    TWD: 'Naujasis Taivano doleris (TWD)',
    CNY: 'Kinijos juanis (CNY)',
    HKD: 'Honkongo doleris (HKD)',
    USD: 'JAV doleris (USD)',
    JPY: 'Japonijos jena (JPY)',
    EUR: 'Euras (EUR)'
  },
  markets: {
    all: 'Visi',
    chinaA: 'Kinijos A akcijos',
    hongKong: 'Honkongas',
    taiwan: 'Taivanas',
    japan: 'Japonija',
    us: 'JAV',
    other: 'Kita',
    unknown: 'Nežinoma'
  },
  tradeTypes: {
    buy: 'Pirkimas',
    sell: 'Pardavimas'
  },
  timeRanges: {
    oneWeek: '1 sav.',
    oneMonth: '1 mėn.',
    threeMonths: '3 mėn.',
    halfYear: '6 mėn.',
    ytd: 'Nuo metų pradžios',
    oneYear: '1 metai',
    fiveYears: '5 metai',
    all: 'Visi'
  },
  app: {
    loadingLocalData: 'Kraunami vietiniai IndexedDB duomenys...',
    generatingImage: 'Generuojamas paveikslėlis...',
    imageExportSuccess: 'Paveikslėlis sėkmingai eksportuotas.',
    imageExportFail: 'Paveikslėlio eksportuoti nepavyko.',
    noDataToExport: 'Šiuo metu nėra duomenų eksportui.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Pasaulinė portfelio suvestinė',
    demoDescription: 'Dabar matai sutrumpintą demonstracinį rinkinį. Importuok pilną CSV, kad matytum visą vaizdą.',
    recordsLoaded: 'Įkelta ir išanalizuota {{count}} sandorių.',
    lastUpdated: 'Paskutinį kartą atnaujinta: {{value}}',
    switchToLight: 'Perjungti į šviesią temą',
    switchToDark: 'Perjungti į tamsią temą',
    settingsRecords: 'Nustatymai ir sandoriai',
    updatePrices: 'Atnaujinti kainas',
    apiKeyRequired: 'Reikalingas API raktas',
    updateWithCache: 'Atnaujinti kainas naudojant podėlį',
    setApiKeyFirst: 'Pirmiausia įvesk API raktą',
    forceRefresh: 'Priverstinis atnaujinimas',
    forceRefreshTitle: 'Ignoruoti podėlį ir naudoti tikrą API limitą',
    languageLabel: 'Keisti kalbą',
    csvTitle: 'CSV laukų gidas',
    csvIntro: 'Įsitikink, kad CSV turi bent šiuos stulpelius. Eiliškumas nesvarbus:',
    csvRows: {
      date: 'Data (pvz. 2025/01/01)',
      type: 'Tipas (Pirkimas / Pardavimas)',
      symbol: 'Simbolis (pvz. KNF1L.VS arba AAPL)',
      market: 'Rinka (nebūtina, naudinga rankiniams įrašams)',
      quantity: 'Kiekis',
      price: 'Vieneto kaina (pradinė valiuta)',
      amount: 'Bendra suma (pradinė valiuta)',
      pnl: 'P&L (privaloma pardavimo metu, pradinė valiuta)'
    },
    csvNote1: '* Pastaba 1: Šešių skaitmenų simboliai, prasidedantys 6 arba 0, automatiškai atpažįstami kaip Kinijos A akcijos (.SS / .SZ).',
    csvNote2: '* Pastaba 2: Kitoms rinkoms tiesiog pridėk galūnę prie simbolio, pvz. .TW arba .HK.',
    forceRefreshConfirm: 'Ar priverstinai atnaujinti? Tai ignoruos 24 valandų podėlį ir sunaudos tikrą API limitą.'
  },
  summary: {
    totalRealized: 'Bendras realizuotas P&L (perskaičiuotas)',
    totalUnrealized: 'Bendras nerealizuotas P&L (perskaičiuotas)',
    totalValue: 'Dabartinė portfelio vertė (perskaičiuota)',
    holdingCount: 'Atidarytos pozicijos',
    holdingUnit: 'pozicijos'
  },
  charts: {
    trendTitle: 'Kaupiamoji sąnaudų kreivė',
    saveImage: 'Išsaugoti grafiką kaip paveikslėlį',
    noTrend: 'Dar nepakanka istorijos, kad būtų galima nubraižyti tendenciją.',
    realizedTitle: 'Realizuotas P&L pagal poziciją (parduota per anksti / tvarkingas exit)',
    distributionTitle: 'Portfelio vertės pasiskirstymas (top 10)',
    convertedNote: 'Rodoma perskaičiavus į {{currency}}',
    noPnlData: 'Kol kas nėra P&L duomenų.',
    noHoldings: 'Šiuo metu nėra atidarytų pozicijų.',
    legendConverted: '{{label}} (perskaičiuota)',
    costSeries: 'Kaupiamoji savikaina',
    realizedSeries: 'Kaupiamasis realizuotas P&L',
    ifSoldSeries: 'Jei parduotum šiandien',
    actualSeries: 'Faktiškai realizuota',
    others: 'Kita'
  },
  table: {
    title: 'Sandorių istorija pagal simbolį',
    subtitle: 'Atverk eilutę, kad pamatytum pirkimų ir pardavimų detales. Sumos vis dar rodomos originalia rinkos valiuta.',
    columns: {
      symbol: 'Simbolis / pavadinimas (rinka · valiuta)',
      holdingQty: 'Dabartinis kiekis',
      currentValue: 'Paskutinė kaina / rinkos vertė',
      unrealized: 'Nerealizuotas P&L',
      realized: 'Realizuotas P&L',
      ifSoldToday: 'Jei parduotum šiandien',
      date: 'Data',
      type: 'Tipas',
      quantity: 'Kiekis',
      price: 'Kaina',
      amount: 'Suma',
      pnl: 'P&L',
      actions: 'Veiksmai'
    },
    manualBadge: 'Rankinis',
    manualUpdatedAt: 'Rankiniu būdu atnaujinta: {{value}}',
    apiUpdatedAt: 'API paskutinį kartą atnaujinta: {{value}}',
    notUpdatedYet: 'Dar neatnaujinta',
    manualNamePlaceholder: 'Rankinis pavadinimas',
    currentPricePlaceholder: 'Kaina',
    hedgeSuccess: 'Pasirodo, šį kartą išėjimas anksčiau buvo geresnis ėjimas ({{value}})',
    soldTooEarly: 'Pardavei kiek per anksti ir palikai {{value}} ant stalo',
    tradeDetails: 'Sandorio detalės',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} akcijos @ {{price}}',
    mobileHoldingQty: 'Pozicija',
    mobileUnrealized: 'Nerealizuota',
    mobileRealized: 'Realizuota'
  },
  manager: {
    title: 'Nustatymai ir sandorių žurnalas',
    clearAndLoadDemo: 'Išvalyti ir įkelti demo',
    apiKeyTitle: 'yfapi.net API raktas',
    getFreeApiKey: 'Gauti nemokamai',
    apiKeyPlaceholder: 'Įklijuok savo x-api-key čia (pvz. A2sD8...)',
    saveApiKey: 'Išsaugoti API raktą',
    baseCurrencyTitle: 'Suvestinės kortelių bazinė valiuta',
    baseCurrencyHelp: '* Visi užsienio valiuta denominuoti aktyvai perskaičiuojami į šią bazinę valiutą naudojant live-FX, kad viršutinės kortelės galėtų viską tvarkingai susumuoti.',
    hideZeroHolding: 'Slėpti visiškai uždarytas pozicijas',
    manualRecordTitle: 'Pridėti sandorį ranka',
    fields: {
      date: 'Data',
      type: 'Tipas',
      market: 'Rinka',
      symbol: 'Simbolis',
      quantity: 'Kiekis',
      price: 'Vieneto kaina',
      amount: 'Bendra suma',
      pnl: 'Realizuotas P&L (tik pardavimo metu)'
    },
    placeholders: {
      symbol: 'Pvz. KNF1L.VS',
      quantity: 'Akcijų skaičius',
      price: 'Kaina už akciją',
      amount: 'Tos rinkos valiuta',
      pnl: 'Nebūtina'
    },
    saveChanges: 'Išsaugoti pakeitimus',
    addRecord: 'Pridėti',
    noRecords: 'Sandorių dar nėra.'
  },
  notice: {
    title: 'Sveiki atvykę į Trade Lens',
    body: 'Trade Lens yra atvirojo kodo įrankis investuotojams, kuris brokerio CSV paverčia sąnaudų kreivėmis, P&L vaizdais ir aiškesne portfelio apžvalga.',
    privacy: 'Privatumas pirmiausia: viskas lieka tik tavo naršyklėje (IndexedDB). Nieko nesiunčiame į serverį.',
    apiKey: 'API raktas naudojamas tik kainoms gauti iš yfapi.net ir taip pat saugomas lokaliai.',
    sourceCode: 'Atvirasis kodas: peržiūrėk kodą ir prisidėk',
    dismiss: 'Daugiau nerodyti'
  },
  messages: {
    apiKeySaved: 'API raktas išsaugotas.',
    manualStockSaved: '{{symbol}} atnaujintas rankiniu būdu.',
    needApiKey: 'Prieš atnaujindamas kainas įvesk yfapi.net API raktą nustatymų skydelyje.',
    cacheFresh: 'Kainos ir valiutų kursai jau buvo atnaujinti per paskutines 24 valandas, todėl programa panaudojo vietinį podėlį, kad taupytų limitą.',
    updateSuccess: 'Atnaujinta {{count}} kainų ir valiutų kursų.',
    fetchFailed: 'Nepavyko gauti: {{message}}',
    baseCurrencyChanged: 'Bazinė valiuta pakeista į {{currency}}. Dabar atnaujinami valiutų kursai...',
    recordUpdated: 'Sandorio įrašas atnaujintas.',
    dataCleared: 'Duomenys išvalyti, demo rinkinys įkeltas iš naujo.',
    clearConfirm: 'Ar išvalyti visus duomenis ir iš naujo įkelti demo? Šio veiksmo atšaukti negalima.',
    backupConfirm: 'Ar prieš išvalydamas nori eksportuoti dabartinius duomenis kaip CSV atsarginę kopiją?'
  },
  data: {
    unknownSymbol: 'Nežinomas simbolis ({{symbol}})',
    unknown: 'Nežinoma'
  }
});

const filPH = mergeLocale(enUS, {
  common: {
    language: 'Wika',
    close: 'Isara',
    cancel: 'Kanselahin',
    save: 'I-save',
    edit: 'I-edit',
    delete: 'Burahin',
    importCsv: 'I-import ang CSV',
    exportCsv: 'I-export ang CSV'
  },
  currencies: {
    TWD: 'Bagong Taiwan dollar (TWD)',
    CNY: 'Chinese yuan (CNY)',
    HKD: 'Hong Kong dollar (HKD)',
    USD: 'US dollar (USD)',
    JPY: 'Japanese yen (JPY)',
    PHP: 'Philippine peso (PHP)'
  },
  markets: {
    all: 'Lahat',
    chinaA: 'China A-shares',
    hongKong: 'Hong Kong',
    taiwan: 'Taiwan',
    japan: 'Japan',
    us: 'US',
    other: 'Iba pa',
    unknown: 'Hindi alam'
  },
  tradeTypes: {
    buy: 'Bili',
    sell: 'Benta'
  },
  timeRanges: {
    oneWeek: '1 linggo',
    oneMonth: '1 buwan',
    threeMonths: '3 buwan',
    halfYear: '6 buwan',
    ytd: 'YTD',
    oneYear: '1 taon',
    fiveYears: '5 taon',
    all: 'Lahat'
  },
  app: {
    loadingLocalData: 'Naglo-load ng local IndexedDB data...',
    generatingImage: 'Gumagawa ng image...',
    imageExportSuccess: 'Tagumpay ang pag-export ng image.',
    imageExportFail: 'Hindi na-export ang image.',
    noDataToExport: 'Walang data na puwedeng i-export sa ngayon.',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Global portfolio dashboard',
    demoDescription: 'Trimmed demo data lang ang nakikita mo ngayon. I-import ang buong CSV para makita ang buong picture.',
    recordsLoaded: '{{count}} trade records ang na-load at na-analyze.',
    lastUpdated: 'Huling update: {{value}}',
    switchToLight: 'Lumipat sa light mode',
    switchToDark: 'Lumipat sa dark mode',
    settingsRecords: 'Settings at trades',
    updatePrices: 'I-update ang prices',
    apiKeyRequired: 'Kailangan ng API key',
    updateWithCache: 'I-update ang live prices gamit ang cache',
    setApiKeyFirst: 'Maglagay muna ng API key',
    forceRefresh: 'Force refresh',
    forceRefreshTitle: 'Laktawan ang cache at gumamit ng totoong API quota',
    languageLabel: 'Palitan ang wika',
    csvTitle: 'Gabay sa CSV fields',
    csvIntro: 'Siguraduhin na may kahit mga field na ito ang CSV mo. Hindi mahalaga ang order:',
    csvRows: {
      date: 'Petsa (hal. 2025/01/01)',
      type: 'Uri (Bili / Benta)',
      symbol: 'Symbol (hal. JFC.PS o AAPL)',
      market: 'Market (optional, useful sa manual entries)',
      quantity: 'Dami',
      price: 'Presyo kada unit (original currency)',
      amount: 'Kabuuang halaga (original currency)',
      pnl: 'P&L (required sa benta, original currency)'
    },
    csvNote1: '* Note 1: Ang 6-digit na symbols na nagsisimula sa 6 o 0 ay awtomatikong tatratuhing China A-shares (.SS / .SZ).',
    csvNote2: '* Note 2: Para sa ibang markets, idagdag lang ang suffix direkta sa symbol, gaya ng .TW o .HK.',
    forceRefreshConfirm: 'I-force refresh ba? Ibe-bypass nito ang 24-hour cache at gagamit ng totoong API quota.'
  },
  summary: {
    totalRealized: 'Kabuuang realized P&L (converted)',
    totalUnrealized: 'Kabuuang unrealized P&L (converted)',
    totalValue: 'Kasalukuyang halaga ng holdings (converted)',
    holdingCount: 'Bukas na holdings',
    holdingUnit: 'holdings'
  },
  charts: {
    trendTitle: 'Cumulative cost trend',
    saveImage: 'I-save ang chart bilang image',
    noTrend: 'Kulang pa ang trade history para makabuo ng trend.',
    realizedTitle: 'Realized P&L per stock (nauna ang benta / maayos ang exit)',
    distributionTitle: 'Distribusyon ng holding value (top 10)',
    convertedNote: 'Lahat ay naka-convert sa {{currency}}',
    noPnlData: 'Wala pang P&L data.',
    noHoldings: 'Wala kang bukas na holdings sa ngayon.',
    legendConverted: '{{label}} (converted)',
    costSeries: 'Cumulative cost',
    realizedSeries: 'Cumulative realized P&L',
    ifSoldSeries: 'Kung ibebenta ngayon',
    actualSeries: 'Talagang realized',
    others: 'Iba pa'
  },
  table: {
    title: 'Trade history per stock',
    subtitle: 'Buksan ang row para makita ang detalye ng bili at benta. Nananatili sa original market currency ang mga halaga.',
    columns: {
      symbol: 'Symbol / pangalan (market · currency)',
      holdingQty: 'Kasalukuyang dami',
      currentValue: 'Pinakahuling presyo / market value',
      unrealized: 'Unrealized P&L',
      realized: 'Realized P&L',
      ifSoldToday: 'Kung ibebenta ngayon',
      date: 'Petsa',
      type: 'Uri',
      quantity: 'Dami',
      price: 'Presyo',
      amount: 'Halaga',
      pnl: 'P&L',
      actions: 'Mga aksyon'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Manual na update: {{value}}',
    apiUpdatedAt: 'Huling API update: {{value}}',
    notUpdatedYet: 'Hindi pa na-update',
    manualNamePlaceholder: 'Manual na pangalan',
    currentPricePlaceholder: 'Presyo',
    hedgeSuccess: 'Mas okay pala ang maagang labas sa pagkakataong ito ({{value}})',
    soldTooEarly: 'Medyo napaaga ang benta at naiwan ang {{value}} sa mesa',
    tradeDetails: 'Detalye ng trade',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} shares @ {{price}}',
    mobileHoldingQty: 'Holding',
    mobileUnrealized: 'Unrealized',
    mobileRealized: 'Realized'
  },
  manager: {
    title: 'Settings at trade log',
    clearAndLoadDemo: 'Burahin at i-load ang demo data',
    apiKeyTitle: 'yfapi.net API key',
    getFreeApiKey: 'Kumuha nang libre',
    apiKeyPlaceholder: 'I-paste ang x-api-key mo dito (hal. A2sD8...)',
    saveApiKey: 'I-save ang API key',
    baseCurrencyTitle: 'Base currency ng summary cards',
    baseCurrencyHelp: '* Ang lahat ng assets na nasa foreign currency ay iko-convert sa base currency na ito gamit ang live FX para maayos na ma-sum ang nasa taas na summary cards.',
    hideZeroHolding: 'Itago ang mga position na fully closed na',
    manualRecordTitle: 'Magdagdag ng manual trade',
    fields: {
      date: 'Petsa',
      type: 'Uri',
      market: 'Market',
      symbol: 'Symbol',
      quantity: 'Dami',
      price: 'Presyo kada unit',
      amount: 'Kabuuang halaga',
      pnl: 'Realized P&L (sa benta lang)'
    },
    placeholders: {
      symbol: 'Hal. JFC.PS',
      quantity: 'Bilang ng shares',
      price: 'Presyo kada share',
      amount: 'Sa currency ng market na iyon',
      pnl: 'Optional'
    },
    saveChanges: 'I-save ang mga pagbabago',
    addRecord: 'Idagdag',
    noRecords: 'Wala pang trade records.'
  },
  notice: {
    title: 'Welcome sa Trade Lens',
    body: 'Ang Trade Lens ay isang open-source tool para sa investors na ginagawang mas madaling basahin ang broker CSV sa anyo ng cost trends, P&L views, at portfolio breakdown.',
    privacy: 'Privacy muna: lahat ng data ay nananatili lang sa browser mo (IndexedDB). Walang ipinapadala sa server.',
    apiKey: 'Ginagamit lang ang API key para kumuha ng prices mula sa yfapi.net at nananatili rin ito sa local mo.',
    sourceCode: 'Open source: silipin ang code at makisali',
    dismiss: 'Huwag nang ipakita ulit'
  },
  messages: {
    apiKeySaved: 'Na-save na ang API key.',
    manualStockSaved: 'Na-update nang manual ang {{symbol}}.',
    needApiKey: 'Ilagay muna ang yfapi.net API key sa settings panel bago mag-update ng prices.',
    cacheFresh: 'Na-update na ang prices at FX rates sa loob ng huling 24 oras, kaya local cache ang ginamit ng app para makatipid sa quota.',
    updateSuccess: '{{count}} prices at FX rates ang na-update.',
    fetchFailed: 'Hindi nakuha: {{message}}',
    baseCurrencyChanged: 'Pinalitan ang base currency sa {{currency}}. Ina-update na ang FX rates...',
    recordUpdated: 'Na-update ang trade record.',
    dataCleared: 'Na-clear ang data at na-load muli ang demo set.',
    clearConfirm: 'Buburahin ba ang lahat ng data at ilo-load muli ang demo? Hindi na ito mababawi.',
    backupConfirm: 'Gusto mo bang i-export muna bilang CSV backup ang current data bago i-clear?'
  },
  data: {
    unknownSymbol: 'Hindi kilalang symbol ({{symbol}})',
    unknown: 'Hindi alam'
  }
});

const urPK = mergeLocale(enUS, {
  common: {
    language: 'زبان',
    close: 'بند کریں',
    cancel: 'منسوخ کریں',
    save: 'محفوظ کریں',
    edit: 'ترمیم کریں',
    delete: 'حذف کریں',
    importCsv: 'CSV درآمد کریں',
    exportCsv: 'CSV برآمد کریں'
  },
  currencies: {
    TWD: 'نیا تائیوانی ڈالر (TWD)',
    CNY: 'چینی یوآن (CNY)',
    HKD: 'ہانگ کانگ ڈالر (HKD)',
    USD: 'امریکی ڈالر (USD)',
    JPY: 'جاپانی ین (JPY)',
    PKR: 'پاکستانی روپیہ (PKR)'
  },
  markets: {
    all: 'سب',
    chinaA: 'چین اے شیئرز',
    hongKong: 'ہانگ کانگ',
    taiwan: 'تائیوان',
    japan: 'جاپان',
    us: 'امریکہ',
    other: 'دیگر',
    unknown: 'نامعلوم'
  },
  tradeTypes: {
    buy: 'خرید',
    sell: 'فروخت'
  },
  timeRanges: {
    oneWeek: '1 ہفتہ',
    oneMonth: '1 ماہ',
    threeMonths: '3 ماہ',
    halfYear: '6 ماہ',
    ytd: 'سال تا تاریخ',
    oneYear: '1 سال',
    fiveYears: '5 سال',
    all: 'سب'
  },
  app: {
    loadingLocalData: 'لوکل IndexedDB ڈیٹا لوڈ ہو رہا ہے...',
    generatingImage: 'تصویر تیار کی جا رہی ہے...',
    imageExportSuccess: 'تصویر کامیابی سے ایکسپورٹ ہو گئی۔',
    imageExportFail: 'تصویر ایکسپورٹ نہیں ہو سکی۔',
    noDataToExport: 'اس وقت ایکسپورٹ کرنے کے لیے کوئی ڈیٹا نہیں ہے۔',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'عالمی پورٹ فولیو ڈیش بورڈ',
    demoDescription: 'اس وقت آپ کو مختصر demo data نظر آ رہا ہے۔ مکمل تصویر کے لیے پورا CSV درآمد کریں۔',
    recordsLoaded: '{{count}} ٹریڈ ریکارڈز لوڈ اور تجزیہ کیے گئے۔',
    lastUpdated: 'آخری اپڈیٹ: {{value}}',
    switchToLight: 'لائٹ موڈ پر جائیں',
    switchToDark: 'ڈارک موڈ پر جائیں',
    settingsRecords: 'سیٹنگز اور ٹریڈز',
    updatePrices: 'قیمتیں اپڈیٹ کریں',
    apiKeyRequired: 'API key درکار ہے',
    updateWithCache: 'cache کے ساتھ live prices اپڈیٹ کریں',
    setApiKeyFirst: 'پہلے API key سیٹ کریں',
    forceRefresh: 'فورس ریفریش',
    forceRefreshTitle: 'cache چھوڑیں اور اصل API quota استعمال کریں',
    languageLabel: 'زبان تبدیل کریں',
    csvTitle: 'CSV فیلڈ گائیڈ',
    csvIntro: 'یقین کر لیں کہ آپ کے CSV میں کم از کم یہ headings موجود ہیں۔ ترتیب اہم نہیں:',
    csvRows: {
      date: 'تاریخ (مثال: 2025/01/01)',
      type: 'قسم (خرید / فروخت)',
      symbol: 'سمبل (مثال: HBL.KA یا AAPL)',
      market: 'مارکیٹ (اختیاری، manual entries کے لیے مفید)',
      quantity: 'مقدار',
      price: 'فی یونٹ قیمت (اصل کرنسی)',
      amount: 'کل رقم (اصل کرنسی)',
      pnl: 'P&L (فروخت پر لازمی، اصل کرنسی)'
    },
    csvNote1: '* نوٹ 1: 6 ہندسوں والے symbols جو 6 یا 0 سے شروع ہوں، خودکار طور پر China A-shares (.SS / .SZ) سمجھے جائیں گے۔',
    csvNote2: '* نوٹ 2: دوسری مارکیٹس کے لیے suffix براہ راست symbol کے ساتھ لکھیں، جیسے .TW یا .HK۔',
    forceRefreshConfirm: 'کیا فورس ریفریش کرنا ہے؟ اس سے 24 گھنٹے والی cache نظرانداز ہو جائے گی اور اصل API quota استعمال ہوگا۔'
  },
  summary: {
    totalRealized: 'کل realised P&L (converted)',
    totalUnrealized: 'کل unrealised P&L (converted)',
    totalValue: 'موجودہ holdings value (converted)',
    holdingCount: 'اوپن پوزیشنز',
    holdingUnit: 'پوزیشنز'
  },
  charts: {
    trendTitle: 'کُل لاگت کا رجحان',
    saveImage: 'چارٹ کو تصویر کے طور پر محفوظ کریں',
    noTrend: 'trend بنانے کے لیے ابھی trade history کافی نہیں ہے۔',
    realizedTitle: 'ہر اسٹاک کا realised P&L (جلدی بیچ دیا / صاف exit)',
    distributionTitle: 'holding value کی تقسیم (top 10)',
    convertedNote: '{{currency}} میں convert کر کے دکھایا گیا ہے',
    noPnlData: 'ابھی P&L ڈیٹا موجود نہیں۔',
    noHoldings: 'اس وقت کوئی اوپن holdings نہیں ہیں۔',
    legendConverted: '{{label}} (converted)',
    costSeries: 'کُل لاگت',
    realizedSeries: 'کُل realised P&L',
    ifSoldSeries: 'اگر آج بیچیں',
    actualSeries: 'حقیقی realised',
    others: 'دیگر'
  },
  table: {
    title: 'ہر اسٹاک کی trade history',
    subtitle: 'row کھول کر خرید اور فروخت کی تفصیل دیکھیں۔ تمام رقوم مارکیٹ کی اصل کرنسی میں ہی رہیں گی۔',
    columns: {
      symbol: 'سمبل / نام (مارکیٹ · کرنسی)',
      holdingQty: 'موجودہ مقدار',
      currentValue: 'آخری قیمت / مارکیٹ ویلیو',
      unrealized: 'unrealised P&L',
      realized: 'realised P&L',
      ifSoldToday: 'اگر آج بیچیں',
      date: 'تاریخ',
      type: 'قسم',
      quantity: 'مقدار',
      price: 'قیمت',
      amount: 'رقم',
      pnl: 'P&L',
      actions: 'ایکشنز'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'manual update: {{value}}',
    apiUpdatedAt: 'API آخری اپڈیٹ: {{value}}',
    notUpdatedYet: 'ابھی اپڈیٹ نہیں ہوا',
    manualNamePlaceholder: 'manual نام',
    currentPricePlaceholder: 'قیمت',
    hedgeSuccess: 'جلدی نکلنا اس بار بہتر فیصلہ نکلا ({{value}})',
    soldTooEarly: 'آپ نے ذرا جلدی بیچ دیا اور {{value}} میز پر چھوڑ دیا',
    tradeDetails: 'trade details',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} shares @ {{price}}',
    mobileHoldingQty: 'holding',
    mobileUnrealized: 'unrealised',
    mobileRealized: 'realised'
  },
  manager: {
    title: 'سیٹنگز اور trade log',
    clearAndLoadDemo: 'ڈیٹا صاف کریں اور demo لوڈ کریں',
    apiKeyTitle: 'yfapi.net API key',
    getFreeApiKey: 'مفت حاصل کریں',
    apiKeyPlaceholder: 'اپنا x-api-key یہاں paste کریں (مثال: A2sD8...)',
    saveApiKey: 'API key محفوظ کریں',
    baseCurrencyTitle: 'summary cards کی base currency',
    baseCurrencyHelp: '* تمام foreign currency assets کو live FX کے ذریعے اس base currency میں convert کیا جائے گا تاکہ اوپر والی summary cards سب کچھ درست جمع کر سکیں۔',
    hideZeroHolding: 'مکمل بند پوزیشنز چھپائیں',
    manualRecordTitle: 'manual trade شامل کریں',
    fields: {
      date: 'تاریخ',
      type: 'قسم',
      market: 'مارکیٹ',
      symbol: 'سمبل',
      quantity: 'مقدار',
      price: 'فی یونٹ قیمت',
      amount: 'کل رقم',
      pnl: 'realised P&L (صرف فروخت پر)'
    },
    placeholders: {
      symbol: 'مثال: HBL.KA',
      quantity: 'شیئرز کی تعداد',
      price: 'فی شیئر قیمت',
      amount: 'اسی مارکیٹ کی کرنسی میں',
      pnl: 'اختیاری'
    },
    saveChanges: 'تبدیلیاں محفوظ کریں',
    addRecord: 'شامل کریں',
    noRecords: 'ابھی کوئی trade records نہیں ہیں۔'
  },
  notice: {
    title: 'Trade Lens میں خوش آمدید',
    body: 'Trade Lens ایک open-source tool ہے جو broker CSV کو cost trend، P&L views اور زیادہ صاف portfolio snapshot میں بدل دیتا ہے۔',
    privacy: 'privacy پہلے: تمام ڈیٹا صرف آپ کے browser میں رہتا ہے (IndexedDB)۔ کچھ بھی server پر نہیں بھیجا جاتا۔',
    apiKey: 'API key صرف yfapi.net سے prices لینے کے لیے استعمال ہوتی ہے اور یہ بھی لوکل ہی رہتی ہے۔',
    sourceCode: 'Open source: code دیکھیں اور حصہ ڈالیں',
    dismiss: 'دوبارہ نہ دکھائیں'
  },
  messages: {
    apiKeySaved: 'API key محفوظ ہو گئی۔',
    manualStockSaved: '{{symbol}} کو manual طور پر اپڈیٹ کر دیا گیا۔',
    needApiKey: 'prices اپڈیٹ کرنے سے پہلے settings panel میں yfapi.net API key درج کریں۔',
    cacheFresh: 'prices اور FX rates پچھلے 24 گھنٹوں میں اپڈیٹ ہو چکے تھے، اس لیے quota بچانے کے لیے app نے local cache استعمال کی۔',
    updateSuccess: '{{count}} prices اور FX rates اپڈیٹ کر دیے گئے۔',
    fetchFailed: 'حاصل نہیں ہو سکا: {{message}}',
    baseCurrencyChanged: 'base currency کو {{currency}} میں بدل دیا گیا ہے۔ FX rates اپڈیٹ ہو رہے ہیں...',
    recordUpdated: 'trade record اپڈیٹ ہو گیا۔',
    dataCleared: 'ڈیٹا صاف کر کے demo data دوبارہ لوڈ کر دیا گیا۔',
    clearConfirm: 'کیا تمام ڈیٹا صاف کر کے demo دوبارہ لوڈ کرنا ہے؟ یہ عمل واپس نہیں ہو سکے گا۔',
    backupConfirm: 'کیا صاف کرنے سے پہلے موجودہ ڈیٹا کو CSV backup کے طور پر برآمد کرنا چاہتے ہیں؟'
  },
  data: {
    unknownSymbol: 'نامعلوم symbol ({{symbol}})',
    unknown: 'نامعلوم'
  }
});

export const resources = {
  'zh-TW': { translation: zhTW },
  'yue-Hant-HK': { translation: yueHantHK },
  'zh-CN': { translation: zhCN },
  'zh-SG': { translation: zhSG },
  'en-US': { translation: enUS },
  'en-CA': { translation: enCA },
  'en-AU': { translation: enAU },
  'en-GB': { translation: enGB },
  'en-IE': { translation: enIE },
  'en-NZ': { translation: enNZ },
  'en-SG': { translation: enSG },
  'en-ZA': { translation: enZA },
  'ja-JP': { translation: jaJP },
  'ko-KR': { translation: koKR },
  'id-ID': { translation: idID },
  'fr-FR': { translation: frFR },
  'fr-BE': { translation: frBE },
  'fr-CA': { translation: frCA },
  'fr-CH': { translation: frCH },
  'de-DE': { translation: deDE },
  'de-AT': { translation: deAT },
  'de-CH': { translation: deCH },
  'it-IT': { translation: itIT },
  'it-CH': { translation: itCH },
  'ms-MY': { translation: msMY },
  'nl-NL': { translation: nlNL },
  'nl-BE': { translation: nlBE },
  'fa-IR': { translation: faIR },
  'he-IL': { translation: heIL },
  'es-419': { translation: es419 },
  'es-AR': { translation: esAR },
  'es-CL': { translation: esCL },
  'es-CO': { translation: esCO },
  'es-MX': { translation: esMX },
  'es-PE': { translation: esPE },
  'es-ES': { translation: esES },
  'es-VE': { translation: esVE },
  'pt-BR': { translation: ptBR },
  'pt-PT': { translation: ptPT },
  'pl-PL': { translation: plPL },
  'tr-TR': { translation: trTR },
  'hi-IN': { translation: hiIN },
  'ru-RU': { translation: ruRU },
  'sv-SE': { translation: svSE },
  'cs-CZ': { translation: csCZ },
  'et-EE': { translation: etEE },
  'is-IS': { translation: isIS },
  'ro-RO': { translation: roRO },
  'hu-HU': { translation: huHU },
  'da-DK': { translation: daDK },
  'el-GR': { translation: elGR },
  'lv-LV': { translation: lvLV },
  'lt-LT': { translation: ltLT },
  'nb-NO': { translation: nbNO },
  'fi-FI': { translation: fiFI },
  'fil-PH': { translation: filPH },
  'vi-VN': { translation: viVN },
  'th-TH': { translation: thTH },
  'ar-SA': { translation: arSA },
  'ar-EG': { translation: arEG },
  'ar-AE': { translation: arAE },
  'ar-KW': { translation: arKW },
  'ar-QA': { translation: arQA },
  'ur-PK': { translation: urPK }
};
