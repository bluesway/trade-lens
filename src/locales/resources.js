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
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: '全球投資組合儀表板',
    demoDescription: '目前顯示的是部分範例資料，匯入完整 CSV 才能看到完整樣貌。',
    recordsLoaded: '已成功載入並分析 {{count}} 筆交易紀錄',
    lastUpdated: '資料最後更新：{{value}}',
    switchToLight: '切換到淺色模式',
    switchToDark: '切換到深色模式',
    settingsRecords: '設定與交易',
    updatePrices: '更新行情',
    apiKeyRequired: '需先設定金鑰',
    updateWithCache: '手動更新即時行情（使用快取）',
    setApiKeyFirst: '請先設定 API Key',
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
    csvNote1: '* 註 1：6 位數且以 6 或 0 開頭的代號，系統會自動判定為陸股（.SS / .SZ）。',
    csvNote2: '* 註 2：其他市場請直接在代號後補上後綴（例如：.TW、.HK）。',
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
    realizedTitle: '各股已實現損益（賣飛 / 避險榜）',
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
    hedgeSuccess: '提早賣出較划算（{{value}}）',
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

const zhHK = {
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
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: '全球投資組合儀表板',
    demoDescription: '而家顯示緊部分示範資料，匯入完整 CSV 先睇到全貌。',
    recordsLoaded: '已成功載入並分析 {{count}} 筆交易紀錄',
    lastUpdated: '資料最後更新：{{value}}',
    switchToLight: '切換到淺色模式',
    switchToDark: '切換到深色模式',
    settingsRecords: '設定與交易',
    updatePrices: '更新報價',
    apiKeyRequired: '要先設金鑰',
    updateWithCache: '手動更新即時報價（用快取）',
    setApiKeyFirst: '請先設定 API Key',
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
    csvNote1: '* 註 1：6 位數且以 6 或 0 開頭的代號，系統會自動判做 A 股（.SS / .SZ）。',
    csvNote2: '* 註 2：其他市場請直接喺代號後面加後綴（例如：.TW、.HK）。',
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
    realizedTitle: '各股已實現損益（賣飛 / 對沖榜）',
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
    hedgeSuccess: '早啲沽反而着數（{{value}}）',
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
    exportFilenamePrefix: 'trade_records'
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
    csvNote1: '* 注 1：6 位数字且以 6 或 0 开头的代码，系统会自动识别为 A 股（.SS / .SZ）。',
    csvNote2: '* 注 2：其他市场请直接在代码后补后缀（例如：.TW、.HK）。',
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
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Global Portfolio Dashboard',
    demoDescription: 'A trimmed demo dataset is showing right now. Import a full CSV to see the entire picture.',
    recordsLoaded: 'Loaded and analyzed {{count}} trade records.',
    lastUpdated: 'Last updated: {{value}}',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    settingsRecords: 'Settings & Trades',
    updatePrices: 'Refresh Quotes',
    apiKeyRequired: 'API key needed',
    updateWithCache: 'Refresh live quotes with cache',
    setApiKeyFirst: 'Set your API key first',
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
    csvNote1: '* Note 1: Six-digit symbols starting with 6 or 0 are auto-detected as China A-shares (.SS / .SZ).',
    csvNote2: '* Note 2: For other markets, append the suffix directly to the symbol (for example: .TW, .HK).',
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
    realizedTitle: 'Realized P&L by Symbol (Missed Upside / Timely Exit)',
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
    hedgeSuccess: 'Earlier exit worked out better ({{value}})',
    soldTooEarly: 'Sold too soon ({{value}})',
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
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: 'Global Portfolio Dashboard',
    demoDescription: 'A trimmed demo dataset is showing right now. Import a full CSV to see the whole picture.',
    recordsLoaded: 'Loaded and analysed {{count}} trade records.',
    lastUpdated: 'Last updated: {{value}}',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    settingsRecords: 'Settings & Trades',
    updatePrices: 'Refresh Quotes',
    apiKeyRequired: 'API key needed',
    updateWithCache: 'Refresh live quotes with cache',
    setApiKeyFirst: 'Set your API key first',
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
    csvNote1: '* Note 1: Six-digit symbols beginning with 6 or 0 are auto-detected as China A shares (.SS / .SZ).',
    csvNote2: '* Note 2: For other markets, append the suffix directly to the symbol (for example: .TW, .HK).',
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
    realizedTitle: 'Realised P&L by Symbol (Missed Upside / Timely Exit)',
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
    hedgeSuccess: 'Selling earlier worked out better ({{value}})',
    soldTooEarly: 'Sold too soon ({{value}})',
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
    exportFilenamePrefix: 'trade_records'
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
    csvNote1: '* 注 1: 6 桁で 6 または 0 から始まるコードは、中国 A 株（.SS / .SZ）として自動判定します。',
    csvNote2: '* 注 2: そのほかの市場は、コードの末尾に接尾辞を付けてください（例: .TW、.HK）。',
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
    demoDescription: 'المعروض الآن عينة مختصرة من البيانات. ارفع ملف CSV كاملاً لرؤية الصورة الكاملة.',
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
    realizedTitle: 'الربح/الخسارة المحققة حسب السهم (بيع مبكر / خروج موفق)',
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
    hedgeSuccess: 'كان البيع المبكر أفضل ({{value}})',
    soldTooEarly: 'تم البيع مبكراً أكثر من اللازم ({{value}})',
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

export const resources = {
  'zh-TW': { translation: zhTW },
  'zh-HK': { translation: zhHK },
  'zh-CN': { translation: zhCN },
  'zh-SG': { translation: zhSG },
  'en-US': { translation: enUS },
  'en-GB': { translation: enGB },
  'ja-JP': { translation: jaJP },
  'ko-KR': { translation: koKR },
  'th-TH': { translation: thTH },
  'ar-SA': { translation: arSA }
};
