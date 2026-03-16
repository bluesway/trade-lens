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
    HKD: '港幣 (HKD)',
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
    buy: '買入',
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
    title: '全球交易組合視覺化儀表板',
    demoDescription: '目前顯示的是部分範例資料，丟完整 CSV 進來才看得到全貌。',
    recordsLoaded: '已成功載入並分析 {{count}} 筆交易紀錄',
    lastUpdated: '資料最後更新：{{value}}',
    switchToLight: '切換到淺色模式',
    switchToDark: '切換到深色模式',
    settingsRecords: '設定與紀錄',
    updatePrices: '更新股價',
    apiKeyRequired: '需設定金鑰',
    updateWithCache: '手動更新即時股價（使用快取）',
    setApiKeyFirst: '請先設定 API Key',
    forceRefresh: '強制刷新',
    forceRefreshTitle: '強制更新並消耗額度',
    languageLabel: '切換語言',
    csvTitle: 'CSV 欄位格式說明',
    csvIntro: '請確認您的 CSV 至少包含以下標題列（順序不拘）：',
    csvRows: {
      date: '日期（例如：2025/01/01）',
      type: '類型（買入 / 賣出）',
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
    totalValue: '目前持股總市值（換算）',
    holdingCount: '持倉檔數',
    holdingUnit: '檔股票'
  },
  charts: {
    trendTitle: '累積投資趨勢變化',
    saveImage: '將圖表存為圖片',
    noTrend: '目前交易紀錄還不夠，暫時畫不出走勢。',
    realizedTitle: '各股已實現損益（賣飛 / 避險榜）',
    distributionTitle: '持股市值分佈（Top 10）',
    convertedNote: '統一換算為 {{currency}} 繪製',
    noPnlData: '目前無損益資料',
    noHoldings: '目前空手無持股',
    legendConverted: '{{label}}（換算後）',
    costSeries: '累積投入本金',
    realizedSeries: '累積已實現損益',
    ifSoldSeries: '若今天才賣',
    actualSeries: '實際已實現',
    others: '其它'
  },
  table: {
    title: '各股歷史交易記錄',
    subtitle: '點擊列可查看買賣明細，金額皆為該市場原幣別',
    columns: {
      symbol: '代號 / 股名（市場 · 幣別）',
      holdingQty: '當前持股數',
      currentValue: '目前股價 / 市值（原幣）',
      unrealized: '未實現損益（原幣）',
      realized: '實際已實現（原幣）',
      ifSoldToday: '若今天才賣（原幣）',
      date: '日期',
      type: '類型',
      quantity: '數量',
      price: '單價',
      amount: '總金額',
      pnl: '損益',
      actions: '操作'
    },
    manualBadge: '手動',
    manualUpdatedAt: '手動修改於：{{value}}',
    apiUpdatedAt: 'API 最後更新：{{value}}',
    notUpdatedYet: '尚未更新',
    manualNamePlaceholder: '手動股名',
    currentPricePlaceholder: '現價',
    hedgeSuccess: '成功避險（{{value}}）',
    soldTooEarly: '少賺賣飛（{{value}}）',
    tradeDetails: '交易明細',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 股 @ {{price}}',
    mobileHoldingQty: '持股數',
    mobileUnrealized: '未實現損益',
    mobileRealized: '已實現損益'
  },
  manager: {
    title: '設定與紀錄管理',
    clearAndLoadDemo: '清除並載入範例',
    apiKeyTitle: 'yfapi.net API 金鑰設定',
    getFreeApiKey: '免費註冊取得',
    apiKeyPlaceholder: '請貼上您的 x-api-key（例如：A2sD8...）',
    saveApiKey: '儲存金鑰',
    baseCurrencyTitle: '總計面板基礎幣別（Base Currency）',
    baseCurrencyHelp: '* 所有外幣資產都會透過即時匯率換成此幣別，方便在上方總計卡片一起加總。',
    hideZeroHolding: '隱藏目前無持股的交易紀錄',
    manualRecordTitle: '手動新增單筆紀錄',
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
      symbol: '例如：AAPL',
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
    title: '歡迎使用 Trade Lens 交易視覺化工具',
    body: '這是專為投資人設計的開源工具，能把券商 CSV 轉成成本走勢、損益分佈與持倉比例圖，讓您一眼掌握整體投資節奏。',
    privacy: '隱私安全：所有資料只存在瀏覽器本地（IndexedDB），不會送去伺服器。',
    apiKey: 'API 金鑰：只用來向 yfapi.net 抓股價，而且同樣只存在本地。',
    sourceCode: '開放原始碼：查看專案原始碼與貢獻',
    dismiss: '不再顯示'
  },
  messages: {
    apiKeySaved: 'API 金鑰已更新並儲存！',
    manualStockSaved: '已手動更新 {{symbol}} 的資訊',
    needApiKey: '請先在管理面板輸入 yfapi.net 金鑰才能更新股價',
    cacheFresh: '所有股價與匯率都在 24 小時內更新過，直接吃本機快取幫你省額度。',
    updateSuccess: '成功更新 {{count}} 檔股票與匯率資訊！',
    fetchFailed: '抓取失敗：{{message}}',
    baseCurrencyChanged: '基礎計價幣別已切換成 {{currency}}，正在更新匯率...',
    recordUpdated: '交易紀錄已更新！',
    dataCleared: '已清除資料並載入範例',
    clearConfirm: '確定要清除所有資料並載入範例嗎？此動作無法復原！',
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
    HKD: '港幣 (HKD)',
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
    sell: '賣出'
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
    title: '全球交易組合視覺化儀表板',
    demoDescription: '而家顯示緊部分示範資料，上傳完整 CSV 先睇到全貌。',
    recordsLoaded: '已成功載入並分析 {{count}} 筆交易紀錄',
    lastUpdated: '資料最後更新：{{value}}',
    switchToLight: '切換到淺色模式',
    switchToDark: '切換到深色模式',
    settingsRecords: '設定與紀錄',
    updatePrices: '更新股價',
    apiKeyRequired: '要先設金鑰',
    updateWithCache: '手動更新即時股價（用快取）',
    setApiKeyFirst: '請先設定 API Key',
    forceRefresh: '強制刷新',
    forceRefreshTitle: '強制更新並消耗額度',
    languageLabel: '切換語言',
    csvTitle: 'CSV 欄位格式說明',
    csvIntro: '請確認 CSV 至少有以下標題列（次序不限）：',
    csvRows: {
      date: '日期（例如：2025/01/01）',
      type: '類型（買入 / 賣出）',
      symbol: '代號（例如：2330.TW、AAPL）',
      market: '市場（選填，方便手動新增）',
      quantity: '數量',
      price: '單價（原幣）',
      amount: '總金額（原幣）',
      pnl: '損益（賣出必填，原幣）'
    },
    csvNote1: '* 註 1：6 位數且以 6 或 0 開頭的代號，系統會自動判做 A 股（.SS / .SZ）。',
    csvNote2: '* 註 2：其他市場請直接喺代號後面加後綴（例如：.TW、.HK）。',
    forceRefreshConfirm: '確定要強制刷新？呢個動作會無視 24 小時快取，仲會真係扣 API 額度。'
  },
  summary: {
    totalRealized: '總已實現損益（換算）',
    totalUnrealized: '總未實現損益（換算）',
    totalValue: '目前持股總市值（換算）',
    holdingCount: '持倉檔數',
    holdingUnit: '隻股票'
  },
  charts: {
    trendTitle: '累積投資走勢變化',
    saveImage: '將圖表存成圖片',
    noTrend: '而家交易紀錄唔夠，未畫到走勢。',
    realizedTitle: '各股已實現損益（賣飛 / 對沖榜）',
    distributionTitle: '持股市值分佈（Top 10）',
    convertedNote: '統一換算做 {{currency}} 顯示',
    noPnlData: '而家冇損益資料',
    noHoldings: '而家未有持股',
    legendConverted: '{{label}}（換算後）',
    costSeries: '累積投入本金',
    realizedSeries: '累積已實現損益',
    ifSoldSeries: '如果今日先賣',
    actualSeries: '實際已實現',
    others: '其他'
  },
  table: {
    title: '各股歷史交易記錄',
    subtitle: '撳一下可睇買賣明細，金額都係用該市場原幣顯示',
    columns: {
      symbol: '代號 / 股名（市場 · 幣別）',
      holdingQty: '現時持股數',
      currentValue: '現價 / 市值（原幣）',
      unrealized: '未實現損益（原幣）',
      realized: '實際已實現（原幣）',
      ifSoldToday: '如果今日先賣（原幣）',
      date: '日期',
      type: '類型',
      quantity: '數量',
      price: '單價',
      amount: '總金額',
      pnl: '損益',
      actions: '操作'
    },
    manualBadge: '手動',
    manualUpdatedAt: '手動修改於：{{value}}',
    apiUpdatedAt: 'API 最後更新：{{value}}',
    notUpdatedYet: '未更新',
    manualNamePlaceholder: '手動股名',
    currentPricePlaceholder: '現價',
    hedgeSuccess: '避險成功（{{value}}）',
    soldTooEarly: '賣早咗少賺（{{value}}）',
    tradeDetails: '交易明細',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 股 @ {{price}}',
    mobileHoldingQty: '持股數',
    mobileUnrealized: '未實現損益',
    mobileRealized: '已實現損益'
  },
  manager: {
    title: '設定與紀錄管理',
    clearAndLoadDemo: '清除並載入示範',
    apiKeyTitle: 'yfapi.net API 金鑰設定',
    getFreeApiKey: '免費註冊取得',
    apiKeyPlaceholder: '請貼上您的 x-api-key（例如：A2sD8...）',
    saveApiKey: '儲存金鑰',
    baseCurrencyTitle: '總計面板基礎幣別（Base Currency）',
    baseCurrencyHelp: '* 所有外幣資產都會經即時匯率轉做呢個幣別，方便喺上面總計卡片一齊計。',
    hideZeroHolding: '隱藏而家冇持股嘅交易紀錄',
    manualRecordTitle: '手動新增單筆紀錄',
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
      symbol: '例如：AAPL',
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
    title: '歡迎使用 Trade Lens 交易視覺化工具',
    body: '呢個係專為投資者設計嘅開源工具，可以將券商 CSV 快速轉成成本走勢、損益分佈同持倉比例圖。',
    privacy: '私隱安全：所有資料都只會留喺瀏覽器本地（IndexedDB），唔會經過伺服器。',
    apiKey: 'API 金鑰：只用嚟向 yfapi.net 讀股價，而且一樣只會留喺本地。',
    sourceCode: '開放原始碼：查看專案原始碼同貢獻',
    dismiss: '唔再顯示'
  },
  messages: {
    apiKeySaved: 'API 金鑰已更新並儲存！',
    manualStockSaved: '已手動更新 {{symbol}} 嘅資訊',
    needApiKey: '請先喺管理面板輸入 yfapi.net 金鑰先可以更新股價',
    cacheFresh: '所有股價同匯率都喺 24 小時內更新過，直接用本機快取幫你慳額度。',
    updateSuccess: '成功更新 {{count}} 隻股票同匯率資訊！',
    fetchFailed: '抓取失敗：{{message}}',
    baseCurrencyChanged: '基礎計價幣別已切換成 {{currency}}，正更新匯率...',
    recordUpdated: '交易紀錄已更新！',
    dataCleared: '已清除資料並載入示範',
    clearConfirm: '確定要清除所有資料並載入示範？呢個動作冇得還原！',
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
    HKD: '港币 (HKD)',
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
    title: '全球交易组合可视化仪表盘',
    demoDescription: '当前展示的是部分示例数据，上传完整 CSV 才能看全貌。',
    recordsLoaded: '已成功加载并分析 {{count}} 条交易记录',
    lastUpdated: '数据最后更新：{{value}}',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    settingsRecords: '设置与记录',
    updatePrices: '更新股价',
    apiKeyRequired: '需先设密钥',
    updateWithCache: '手动更新实时股价（使用缓存）',
    setApiKeyFirst: '请先设置 API Key',
    forceRefresh: '强制刷新',
    forceRefreshTitle: '强制更新并消耗额度',
    languageLabel: '切换语言',
    csvTitle: 'CSV 字段格式说明',
    csvIntro: '请确保 CSV 至少包含以下标题列（顺序不限）：',
    csvRows: {
      date: '日期（例如：2025/01/01）',
      type: '类型（买入 / 卖出）',
      symbol: '代码（例如：2330.TW、AAPL）',
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
    totalValue: '当前持仓总市值（换算）',
    holdingCount: '持仓档数',
    holdingUnit: '只股票'
  },
  charts: {
    trendTitle: '累计投资趋势变化',
    saveImage: '将图表保存为图片',
    noTrend: '当前交易记录还不够，暂时画不出走势。',
    realizedTitle: '各股已实现盈亏（卖飞 / 对冲榜）',
    distributionTitle: '持股市值分布（Top 10）',
    convertedNote: '统一换算为 {{currency}} 绘制',
    noPnlData: '当前没有盈亏数据',
    noHoldings: '当前空仓无持股',
    legendConverted: '{{label}}（换算后）',
    costSeries: '累计投入本金',
    realizedSeries: '累计已实现盈亏',
    ifSoldSeries: '如果今天才卖',
    actualSeries: '实际已实现',
    others: '其他'
  },
  table: {
    title: '各股历史交易记录',
    subtitle: '点击行可查看买卖明细，金额均以该市场原币显示',
    columns: {
      symbol: '代码 / 股名（市场 · 币别）',
      holdingQty: '当前持股数',
      currentValue: '当前股价 / 市值（原币）',
      unrealized: '未实现盈亏（原币）',
      realized: '实际已实现（原币）',
      ifSoldToday: '如果今天才卖（原币）',
      date: '日期',
      type: '类型',
      quantity: '数量',
      price: '单价',
      amount: '总金额',
      pnl: '损益',
      actions: '操作'
    },
    manualBadge: '手动',
    manualUpdatedAt: '手动修改于：{{value}}',
    apiUpdatedAt: 'API 最后更新：{{value}}',
    notUpdatedYet: '尚未更新',
    manualNamePlaceholder: '手动股名',
    currentPricePlaceholder: '现价',
    hedgeSuccess: '成功对冲（{{value}}）',
    soldTooEarly: '卖早了少赚（{{value}}）',
    tradeDetails: '交易明细',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 股 @ {{price}}',
    mobileHoldingQty: '持股数',
    mobileUnrealized: '未实现盈亏',
    mobileRealized: '已实现盈亏'
  },
  manager: {
    title: '设置与记录管理',
    clearAndLoadDemo: '清除并载入示例',
    apiKeyTitle: 'yfapi.net API 密钥设置',
    getFreeApiKey: '免费注册获取',
    apiKeyPlaceholder: '请贴上您的 x-api-key（例如：A2sD8...）',
    saveApiKey: '保存密钥',
    baseCurrencyTitle: '总览面板基础币别（Base Currency）',
    baseCurrencyHelp: '* 所有外币资产都会通过实时汇率换算成该币别，方便在上方汇总卡片统一加总。',
    hideZeroHolding: '隐藏当前无持股的交易记录',
    manualRecordTitle: '手动新增单笔记录',
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
      symbol: '例如：AAPL',
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
    title: '欢迎使用 Trade Lens 交易可视化工具',
    body: '这是一个专为投资者设计的开源工具，可将券商 CSV 快速转成成本走势、盈亏分布和持仓占比图。',
    privacy: '隐私安全：所有数据仅保存在浏览器本地（IndexedDB），不会经过服务器。',
    apiKey: 'API 密钥：仅用于向 yfapi.net 获取股价，同样只保存在本地。',
    sourceCode: '开源项目：查看源码并参与贡献',
    dismiss: '不再显示'
  },
  messages: {
    apiKeySaved: 'API 密钥已更新并保存！',
    manualStockSaved: '已手动更新 {{symbol}} 的信息',
    needApiKey: '请先在管理面板输入 yfapi.net 密钥才能更新股价',
    cacheFresh: '所有股价和汇率都在 24 小时内更新过，直接用本地缓存帮你省配额。',
    updateSuccess: '成功更新 {{count}} 只股票和汇率信息！',
    fetchFailed: '抓取失败：{{message}}',
    baseCurrencyChanged: '基础计价币别已切换为 {{currency}}，正在更新汇率...',
    recordUpdated: '交易记录已更新！',
    dataCleared: '已清除数据并载入示例',
    clearConfirm: '确定要清除所有数据并载入示例吗？此操作无法恢复！',
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
    HKD: '港币 (HKD)',
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
    noDataToExport: '现在没有资料可以导出 lah。',
    exportFilenamePrefix: 'trade_records'
  },
  header: {
    title: '全球交易组合可视化仪表板',
    demoDescription: '现在先显示部分示范资料，上传完整 CSV 才比较完整 lah。',
    recordsLoaded: '已经成功载入并分析 {{count}} 笔交易记录',
    lastUpdated: '资料最后更新：{{value}}',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    settingsRecords: '设置与记录',
    updatePrices: '更新股价',
    apiKeyRequired: '要先设 key',
    updateWithCache: '手动更新实时股价（用缓存）',
    setApiKeyFirst: '请先设置 API Key',
    forceRefresh: '强制刷新',
    forceRefreshTitle: '强制更新并消耗额度',
    languageLabel: '切换语言',
    csvTitle: 'CSV 字段格式说明',
    csvIntro: '请确认 CSV 至少有这些标题列（顺序不用一样）：',
    csvRows: {
      date: '日期（例如：2025/01/01）',
      type: '类型（买入 / 卖出）',
      symbol: '代码（例如：2330.TW、AAPL）',
      market: '市场（可不填，手动新增时比较好用）',
      quantity: '数量',
      price: '单价（原币）',
      amount: '总金额（原币）',
      pnl: '损益（卖出必填，原币）'
    },
    csvNote1: '* 注 1：6 位数字且以 6 或 0 开头的代码，系统会自动认成 A 股（.SS / .SZ）。',
    csvNote2: '* 注 2：其他市场请直接在代码后面加后缀（例如：.TW、.HK）。',
    forceRefreshConfirm: '确定要强制刷新吗？这个会跳过 24 小时缓存，还会真的吃掉 API 配额。'
  },
  summary: {
    totalRealized: '总已实现盈亏（换算）',
    totalUnrealized: '总未实现盈亏（换算）',
    totalValue: '当前持仓总市值（换算）',
    holdingCount: '持仓档数',
    holdingUnit: '只股票'
  },
  charts: {
    trendTitle: '累计投资趋势变化',
    saveImage: '把图表存成图片',
    noTrend: '现在交易记录还不够，暂时画不出走势。',
    realizedTitle: '各股已实现盈亏（卖飞 / 对冲榜）',
    distributionTitle: '持股市值分布（Top 10）',
    convertedNote: '统一换算成 {{currency}} 来画',
    noPnlData: '现在没有盈亏资料',
    noHoldings: '现在空手没有持股',
    legendConverted: '{{label}}（换算后）',
    costSeries: '累计投入本金',
    realizedSeries: '累计已实现盈亏',
    ifSoldSeries: '如果今天才卖',
    actualSeries: '实际已实现',
    others: '其他'
  },
  table: {
    title: '各股历史交易记录',
    subtitle: '点一下就能看买卖明细，金额都会用该市场原币显示',
    columns: {
      symbol: '代码 / 股名（市场 · 币别）',
      holdingQty: '当前持股数',
      currentValue: '当前股价 / 市值（原币）',
      unrealized: '未实现盈亏（原币）',
      realized: '实际已实现（原币）',
      ifSoldToday: '如果今天才卖（原币）',
      date: '日期',
      type: '类型',
      quantity: '数量',
      price: '单价',
      amount: '总金额',
      pnl: '损益',
      actions: '操作'
    },
    manualBadge: '手动',
    manualUpdatedAt: '手动修改于：{{value}}',
    apiUpdatedAt: 'API 最后更新：{{value}}',
    notUpdatedYet: '还没更新',
    manualNamePlaceholder: '手动股名',
    currentPricePlaceholder: '现价',
    hedgeSuccess: '避险有赚到（{{value}}）',
    soldTooEarly: '卖太早少赚了（{{value}}）',
    tradeDetails: '交易明细',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 股 @ {{price}}',
    mobileHoldingQty: '持股数',
    mobileUnrealized: '未实现盈亏',
    mobileRealized: '已实现盈亏'
  },
  manager: {
    title: '设置与记录管理',
    clearAndLoadDemo: '清除并载入示范',
    apiKeyTitle: 'yfapi.net API Key 设置',
    getFreeApiKey: '免费注册获取',
    apiKeyPlaceholder: '请贴上你的 x-api-key（例如：A2sD8...）',
    saveApiKey: '保存 Key',
    baseCurrencyTitle: '总览面板基础币别（Base Currency）',
    baseCurrencyHelp: '* 所有外币资产都会通过实时汇率换成这个币别，方便在上面总览卡片一起算。',
    hideZeroHolding: '隐藏现在没有持股的交易记录',
    manualRecordTitle: '手动新增单笔记录',
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
      symbol: '例如：AAPL',
      quantity: '股数',
      price: '单股价格',
      amount: '按该市场币别',
      pnl: '选填'
    },
    saveChanges: '保存变更',
    addRecord: '加入',
    noRecords: '现在没有任何记录'
  },
  notice: {
    title: '欢迎使用 Trade Lens 交易可视化工具',
    body: '这是给投资人用的开源工具，可以把券商 CSV 很快变成成本走势、盈亏分布和持仓比例图。',
    privacy: '隐私安全：所有资料都只会存在浏览器本地（IndexedDB），不会经过服务器。',
    apiKey: 'API Key：只用来向 yfapi.net 抓股价，而且一样只保存在本地。',
    sourceCode: '开源项目：查看源码和一起贡献',
    dismiss: '不再显示'
  },
  messages: {
    apiKeySaved: 'API Key 已更新并保存！',
    manualStockSaved: '已经手动更新 {{symbol}} 的资料',
    needApiKey: '请先在管理面板输入 yfapi.net Key 才能更新股价',
    cacheFresh: '所有股价和汇率都在 24 小时内更新过，直接用本机缓存帮你省额度。',
    updateSuccess: '成功更新 {{count}} 只股票和汇率资料！',
    fetchFailed: '抓取失败：{{message}}',
    baseCurrencyChanged: '基础计价币别已经切换成 {{currency}}，正在更新汇率...',
    recordUpdated: '交易记录已更新！',
    dataCleared: '已清除资料并载入示范',
    clearConfirm: '确定要清除所有资料并载入示范吗？这个动作不能恢复哦。',
    backupConfirm: '清除之前，要不要先把现在资料导出成 CSV 备份？'
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
    chinaA: 'China A-shares',
    hongKong: 'Hong Kong',
    taiwan: 'Taiwan',
    japan: 'Japan',
    us: 'US',
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
    title: 'Global Trade Portfolio Dashboard',
    demoDescription: 'You are seeing a slim demo dataset right now. Upload a full CSV to unlock the full picture.',
    recordsLoaded: 'Loaded and analyzed {{count}} trade records.',
    lastUpdated: 'Last updated: {{value}}',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    settingsRecords: 'Settings & Records',
    updatePrices: 'Refresh Prices',
    apiKeyRequired: 'API key needed',
    updateWithCache: 'Refresh live prices with cache',
    setApiKeyFirst: 'Set your API key first',
    forceRefresh: 'Force Refresh',
    forceRefreshTitle: 'Force a refresh and spend API quota',
    languageLabel: 'Change language',
    csvTitle: 'CSV Format Guide',
    csvIntro: 'Make sure your CSV includes these headers at minimum. The order does not matter:',
    csvRows: {
      date: 'Date (for example: 2025/01/01)',
      type: 'Type (Buy / Sell)',
      symbol: 'Symbol (for example: 2330.TW, AAPL)',
      market: 'Market (optional, helpful for manual entries)',
      quantity: 'Quantity',
      price: 'Unit price (original currency)',
      amount: 'Total amount (original currency)',
      pnl: 'PnL (required for sells, original currency)'
    },
    csvNote1: '* Note 1: Six-digit symbols starting with 6 or 0 are auto-detected as China A-shares (.SS / .SZ).',
    csvNote2: '* Note 2: For other markets, append the suffix directly to the symbol (for example: .TW, .HK).',
    forceRefreshConfirm: 'Force a refresh? This will ignore the 24-hour cache and consume real API quota.'
  },
  summary: {
    totalRealized: 'Total Realized PnL (Converted)',
    totalUnrealized: 'Total Unrealized PnL (Converted)',
    totalValue: 'Current Holdings Value (Converted)',
    holdingCount: 'Open Positions',
    holdingUnit: 'stocks'
  },
  charts: {
    trendTitle: 'Cumulative Investment Trend',
    saveImage: 'Save chart as image',
    noTrend: 'There is not enough trade history yet to draw the trend.',
    realizedTitle: 'Realized PnL by Stock',
    distributionTitle: 'Holding Value Distribution (Top 10)',
    convertedNote: 'Rendered in {{currency}} after conversion',
    noPnlData: 'No PnL data yet.',
    noHoldings: 'No holdings right now.',
    legendConverted: '{{label}} (converted)',
    costSeries: 'Cumulative Capital In',
    realizedSeries: 'Cumulative Realized PnL',
    ifSoldSeries: 'If Sold Today',
    actualSeries: 'Actually Realized',
    others: 'Others'
  },
  table: {
    title: 'Trade History by Stock',
    subtitle: 'Tap a row to inspect buy and sell details. Amounts stay in the stock market’s native currency.',
    columns: {
      symbol: 'Symbol / Name (Market · Currency)',
      holdingQty: 'Current Shares',
      currentValue: 'Current Price / Value',
      unrealized: 'Unrealized PnL',
      realized: 'Realized PnL',
      ifSoldToday: 'If Sold Today',
      date: 'Date',
      type: 'Type',
      quantity: 'Quantity',
      price: 'Price',
      amount: 'Amount',
      pnl: 'PnL',
      actions: 'Actions'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Manually updated: {{value}}',
    apiUpdatedAt: 'API updated: {{value}}',
    notUpdatedYet: 'Not updated yet',
    manualNamePlaceholder: 'Manual name',
    currentPricePlaceholder: 'Price',
    hedgeSuccess: 'Nice hedge ({{value}})',
    soldTooEarly: 'Left money on the table ({{value}})',
    tradeDetails: 'Trade details',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} shares @ {{price}}',
    mobileHoldingQty: 'Shares',
    mobileUnrealized: 'Unrealized',
    mobileRealized: 'Realized'
  },
  manager: {
    title: 'Settings & Record Management',
    clearAndLoadDemo: 'Clear and Load Demo',
    apiKeyTitle: 'yfapi.net API Key',
    getFreeApiKey: 'Get one for free',
    apiKeyPlaceholder: 'Paste your x-api-key here (for example: A2sD8...)',
    saveApiKey: 'Save Key',
    baseCurrencyTitle: 'Base Currency for Summary Cards',
    baseCurrencyHelp: '* Every foreign asset is converted into this base currency through live FX so the summary cards can add everything up cleanly.',
    hideZeroHolding: 'Hide trade records with zero shares left',
    manualRecordTitle: 'Add a Manual Trade Record',
    fields: {
      date: 'Date',
      type: 'Type',
      market: 'Market',
      symbol: 'Symbol',
      quantity: 'Quantity',
      price: 'Unit Price',
      amount: 'Total Amount',
      pnl: 'PnL (sell only)'
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
    noRecords: 'No records yet.'
  },
  notice: {
    title: 'Welcome to Trade Lens',
    body: 'This open-source tool is built for investors who want to turn broker CSV files into cost curves, PnL views, and holding mix charts in a few clicks.',
    privacy: 'Privacy first: everything stays in your browser only (IndexedDB). Nothing is sent through our server.',
    apiKey: 'API key: it is only used for yfapi.net price lookups, and it stays local too.',
    sourceCode: 'Open source: browse the code and contribute',
    dismiss: 'Do not show again'
  },
  messages: {
    apiKeySaved: 'API key saved.',
    manualStockSaved: 'Updated {{symbol}} manually.',
    needApiKey: 'Enter your yfapi.net API key in the manager panel before refreshing prices.',
    cacheFresh: 'All prices and FX rates were refreshed within 24 hours, so the app used the local cache to save quota.',
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
    chinaA: 'China A shares',
    hongKong: 'Hong Kong',
    taiwan: 'Taiwan',
    japan: 'Japan',
    us: 'US',
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
    title: 'Global Trade Portfolio Dashboard',
    demoDescription: 'A trimmed demo dataset is showing right now. Upload a full CSV to see the whole picture.',
    recordsLoaded: 'Loaded and analysed {{count}} trade records.',
    lastUpdated: 'Last updated: {{value}}',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    settingsRecords: 'Settings & Records',
    updatePrices: 'Refresh Prices',
    apiKeyRequired: 'API key needed',
    updateWithCache: 'Refresh live prices with cache',
    setApiKeyFirst: 'Set your API key first',
    forceRefresh: 'Force Refresh',
    forceRefreshTitle: 'Force a refresh and consume API quota',
    languageLabel: 'Change language',
    csvTitle: 'CSV Format Guide',
    csvIntro: 'Make sure your CSV contains at least these headers. Their order does not matter:',
    csvRows: {
      date: 'Date (for example: 2025/01/01)',
      type: 'Type (Buy / Sell)',
      symbol: 'Symbol (for example: 2330.TW, AAPL)',
      market: 'Market (optional, useful for manual entries)',
      quantity: 'Quantity',
      price: 'Unit price (original currency)',
      amount: 'Total amount (original currency)',
      pnl: 'PnL (required for sells, original currency)'
    },
    csvNote1: '* Note 1: Six-digit symbols beginning with 6 or 0 are auto-detected as China A shares (.SS / .SZ).',
    csvNote2: '* Note 2: For other markets, append the suffix directly to the symbol (for example: .TW, .HK).',
    forceRefreshConfirm: 'Force a refresh? This will ignore the 24-hour cache and use real API allowance.'
  },
  summary: {
    totalRealized: 'Total Realised PnL (Converted)',
    totalUnrealized: 'Total Unrealised PnL (Converted)',
    totalValue: 'Current Holdings Value (Converted)',
    holdingCount: 'Open Positions',
    holdingUnit: 'stocks'
  },
  charts: {
    trendTitle: 'Cumulative Investment Trend',
    saveImage: 'Save chart as image',
    noTrend: 'There is not enough trade history yet to draw the trend.',
    realizedTitle: 'Realised PnL by Stock',
    distributionTitle: 'Holding Value Distribution (Top 10)',
    convertedNote: 'Rendered in {{currency}} after conversion',
    noPnlData: 'No PnL data yet.',
    noHoldings: 'No holdings at the moment.',
    legendConverted: '{{label}} (converted)',
    costSeries: 'Cumulative Capital In',
    realizedSeries: 'Cumulative Realised PnL',
    ifSoldSeries: 'If Sold Today',
    actualSeries: 'Actually Realised',
    others: 'Others'
  },
  table: {
    title: 'Trade History by Stock',
    subtitle: 'Open a row to inspect buy and sell details. Amounts remain in the market’s native currency.',
    columns: {
      symbol: 'Symbol / Name (Market · Currency)',
      holdingQty: 'Current Shares',
      currentValue: 'Current Price / Value',
      unrealized: 'Unrealised PnL',
      realized: 'Realised PnL',
      ifSoldToday: 'If Sold Today',
      date: 'Date',
      type: 'Type',
      quantity: 'Quantity',
      price: 'Price',
      amount: 'Amount',
      pnl: 'PnL',
      actions: 'Actions'
    },
    manualBadge: 'Manual',
    manualUpdatedAt: 'Manually updated: {{value}}',
    apiUpdatedAt: 'API updated: {{value}}',
    notUpdatedYet: 'Not updated yet',
    manualNamePlaceholder: 'Manual name',
    currentPricePlaceholder: 'Price',
    hedgeSuccess: 'Good hedge ({{value}})',
    soldTooEarly: 'Sold too early ({{value}})',
    tradeDetails: 'Trade details',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} shares @ {{price}}',
    mobileHoldingQty: 'Shares',
    mobileUnrealized: 'Unrealised',
    mobileRealized: 'Realised'
  },
  manager: {
    title: 'Settings & Record Management',
    clearAndLoadDemo: 'Clear and Load Demo',
    apiKeyTitle: 'yfapi.net API Key',
    getFreeApiKey: 'Get one for free',
    apiKeyPlaceholder: 'Paste your x-api-key here (for example: A2sD8...)',
    saveApiKey: 'Save Key',
    baseCurrencyTitle: 'Base Currency for Summary Cards',
    baseCurrencyHelp: '* Every foreign asset is converted into this base currency using live FX so the summary cards can total everything cleanly.',
    hideZeroHolding: 'Hide trade records with no shares left',
    manualRecordTitle: 'Add a Manual Trade Record',
    fields: {
      date: 'Date',
      type: 'Type',
      market: 'Market',
      symbol: 'Symbol',
      quantity: 'Quantity',
      price: 'Unit Price',
      amount: 'Total Amount',
      pnl: 'PnL (sell only)'
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
    noRecords: 'No records yet.'
  },
  notice: {
    title: 'Welcome to Trade Lens',
    body: 'This open-source tool is built for investors who want to turn broker CSV files into cost curves, PnL views and holding mix charts in a few clicks.',
    privacy: 'Privacy first: everything stays in your browser only (IndexedDB). Nothing is sent through our server.',
    apiKey: 'API key: it is only used for yfapi.net price look-ups, and it stays local too.',
    sourceCode: 'Open source: browse the code and contribute',
    dismiss: 'Do not show again'
  },
  messages: {
    apiKeySaved: 'API key saved.',
    manualStockSaved: 'Updated {{symbol}} manually.',
    needApiKey: 'Enter your yfapi.net API key in the manager panel before refreshing prices.',
    cacheFresh: 'All prices and FX rates were refreshed within 24 hours, so the app used the local cache to save allowance.',
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
    buy: '買い',
    sell: '売り'
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
    demoDescription: 'いまはサンプルの一部だけ表示中です。フル CSV を入れると全体像が見えます。',
    recordsLoaded: '{{count}} 件の取引履歴を読み込んで分析しました。',
    lastUpdated: '最終更新: {{value}}',
    switchToLight: 'ライトモードに切り替え',
    switchToDark: 'ダークモードに切り替え',
    settingsRecords: '設定と記録',
    updatePrices: '価格を更新',
    apiKeyRequired: 'API キーが必要',
    updateWithCache: 'キャッシュを使って株価を更新',
    setApiKeyFirst: '先に API キーを設定してください',
    forceRefresh: '強制更新',
    forceRefreshTitle: 'キャッシュを無視して API 枠を使う',
    languageLabel: '言語を切り替え',
    csvTitle: 'CSV フォーマット案内',
    csvIntro: 'CSV には最低でも次のヘッダーを含めてください。順番は自由です。',
    csvRows: {
      date: '日付（例: 2025/01/01）',
      type: '種類（買い / 売り）',
      symbol: '銘柄コード（例: 2330.TW、AAPL）',
      market: '市場（任意。手動追加時の参考用）',
      quantity: '数量',
      price: '単価（現地通貨）',
      amount: '合計金額（現地通貨）',
      pnl: '損益（売り時は必須、現地通貨）'
    },
    csvNote1: '* 注 1: 6 桁で 6 または 0 から始まるコードは、中国 A 株（.SS / .SZ）として自動判定します。',
    csvNote2: '* 注 2: そのほかの市場は、コードの末尾に接尾辞を付けてください（例: .TW、.HK）。',
    forceRefreshConfirm: '強制更新しますか？ 24 時間キャッシュを無視して API 枠を消費します。'
  },
  summary: {
    totalRealized: '実現損益 合計（換算後）',
    totalUnrealized: '含み損益 合計（換算後）',
    totalValue: '保有評価額 合計（換算後）',
    holdingCount: '保有銘柄数',
    holdingUnit: '銘柄'
  },
  charts: {
    trendTitle: '累積投資トレンド',
    saveImage: '画像として保存',
    noTrend: '取引履歴がまだ足りないので、トレンドを描けません。',
    realizedTitle: '銘柄ごとの実現損益',
    distributionTitle: '保有評価額の分布（Top 10）',
    convertedNote: '{{currency}} に換算して表示',
    noPnlData: '損益データがまだありません。',
    noHoldings: 'いまは保有銘柄がありません。',
    legendConverted: '{{label}}（換算後）',
    costSeries: '累積投下資本',
    realizedSeries: '累積実現損益',
    ifSoldSeries: '今日売った場合',
    actualSeries: '実際の実現損益',
    others: 'その他'
  },
  table: {
    title: '銘柄ごとの取引履歴',
    subtitle: '行を開くと売買の明細を確認できます。金額はその市場の現地通貨のまま表示します。',
    columns: {
      symbol: '銘柄コード / 名称（市場 · 通貨）',
      holdingQty: '現在の保有数',
      currentValue: '現在価格 / 評価額',
      unrealized: '含み損益',
      realized: '実現損益',
      ifSoldToday: '今日売った場合',
      date: '日付',
      type: '種類',
      quantity: '数量',
      price: '単価',
      amount: '金額',
      pnl: '損益',
      actions: '操作'
    },
    manualBadge: '手動',
    manualUpdatedAt: '手動更新: {{value}}',
    apiUpdatedAt: 'API 更新: {{value}}',
    notUpdatedYet: '未更新',
    manualNamePlaceholder: '手動の銘柄名',
    currentPricePlaceholder: '現在値',
    hedgeSuccess: 'ナイスヘッジ（{{value}}）',
    soldTooEarly: '早売りでもったいない（{{value}}）',
    tradeDetails: '取引明細',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} 株 @ {{price}}',
    mobileHoldingQty: '保有数',
    mobileUnrealized: '含み損益',
    mobileRealized: '実現損益'
  },
  manager: {
    title: '設定と履歴管理',
    clearAndLoadDemo: 'クリアしてサンプルを読み込む',
    apiKeyTitle: 'yfapi.net API キー設定',
    getFreeApiKey: '無料登録はこちら',
    apiKeyPlaceholder: 'x-api-key を貼り付けてください（例: A2sD8...）',
    saveApiKey: 'キーを保存',
    baseCurrencyTitle: 'サマリーカードの基準通貨',
    baseCurrencyHelp: '* すべての外貨資産はリアルタイム為替でこの通貨へ換算され、上部サマリーでまとめて集計されます。',
    hideZeroHolding: '保有数が 0 の取引履歴を隠す',
    manualRecordTitle: '取引履歴を手動追加',
    fields: {
      date: '日付',
      type: '種類',
      market: '市場',
      symbol: '銘柄コード',
      quantity: '数量',
      price: '単価',
      amount: '合計金額',
      pnl: '損益（売りのみ）'
    },
    placeholders: {
      symbol: '例: AAPL',
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
    body: '証券会社の CSV を、コスト推移・損益分布・保有比率チャートへサクッと変換できる投資家向けのオープンソースツールです。',
    privacy: 'プライバシー重視: すべてのデータはブラウザ内（IndexedDB）のみ保存され、サーバーには送られません。',
    apiKey: 'API キー: yfapi.net から価格を取得するためだけに使われ、これもローカル保存です。',
    sourceCode: 'オープンソース: コードを見てコントリビュート',
    dismiss: '今後は表示しない'
  },
  messages: {
    apiKeySaved: 'API キーを保存しました。',
    manualStockSaved: '{{symbol}} を手動更新しました。',
    needApiKey: '株価を更新する前に、管理パネルで yfapi.net の API キーを入力してください。',
    cacheFresh: '株価と為替は 24 時間以内に更新済みだったため、API 枠節約のためローカルキャッシュを使いました。',
    updateSuccess: '{{count}} 銘柄の株価と為替を更新しました。',
    fetchFailed: '取得に失敗しました: {{message}}',
    baseCurrencyChanged: '基準通貨を {{currency}} に切り替えました。為替を更新しています...',
    recordUpdated: '取引履歴を更新しました。',
    dataCleared: 'データを削除し、サンプル履歴を読み込みました。',
    clearConfirm: 'すべてのデータを削除してサンプルを読み込みますか？ この操作は元に戻せません。',
    backupConfirm: '削除する前に、現在のデータを CSV としてバックアップしますか？'
  },
  data: {
    unknownSymbol: '不明な銘柄コード（{{symbol}}）',
    unknown: '不明'
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
    title: 'لوحة متابعة المحافظ التداولية العالمية',
    demoDescription: 'أنت ترى الآن بيانات تجريبية مختصرة. ارفع ملف CSV كامل لرؤية الصورة كاملة.',
    recordsLoaded: 'تم تحميل وتحليل {{count}} عملية تداول.',
    lastUpdated: 'آخر تحديث: {{value}}',
    switchToLight: 'التبديل إلى الوضع الفاتح',
    switchToDark: 'التبديل إلى الوضع الداكن',
    settingsRecords: 'الإعدادات والسجلات',
    updatePrices: 'تحديث الأسعار',
    apiKeyRequired: 'مطلوب مفتاح API',
    updateWithCache: 'تحديث الأسعار مع استخدام التخزين المؤقت',
    setApiKeyFirst: 'اضبط مفتاح API أولاً',
    forceRefresh: 'تحديث إجباري',
    forceRefreshTitle: 'تحديث إجباري مع استهلاك الحصة',
    languageLabel: 'تغيير اللغة',
    csvTitle: 'دليل تنسيق CSV',
    csvIntro: 'تأكد من أن ملف CSV يحتوي على هذه العناوين على الأقل. الترتيب غير مهم:',
    csvRows: {
      date: 'التاريخ (مثال: 2025/01/01)',
      type: 'النوع (شراء / بيع)',
      symbol: 'الرمز (مثال: 2330.TW أو AAPL)',
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
    totalValue: 'القيمة الحالية للمحفظة (بعد التحويل)',
    holdingCount: 'عدد المراكز المفتوحة',
    holdingUnit: 'أسهم'
  },
  charts: {
    trendTitle: 'اتجاه الاستثمار التراكمي',
    saveImage: 'حفظ الرسم كصورة',
    noTrend: 'لا يوجد سجل تداول كافٍ حتى الآن لرسم الاتجاه.',
    realizedTitle: 'الربح المحقق حسب السهم',
    distributionTitle: 'توزيع قيمة المراكز (أفضل 10)',
    convertedNote: 'يتم العرض بعد التحويل إلى {{currency}}',
    noPnlData: 'لا توجد بيانات أرباح أو خسائر حالياً.',
    noHoldings: 'لا توجد مراكز حالياً.',
    legendConverted: '{{label}} (بعد التحويل)',
    costSeries: 'إجمالي رأس المال المستثمر',
    realizedSeries: 'إجمالي الربح المحقق',
    ifSoldSeries: 'لو تم البيع اليوم',
    actualSeries: 'المحقق فعلياً',
    others: 'أخرى'
  },
  table: {
    title: 'سجل التداول حسب السهم',
    subtitle: 'افتح الصف لرؤية تفاصيل الشراء والبيع. المبالغ تبقى بعملة السوق الأصلية.',
    columns: {
      symbol: 'الرمز / الاسم (السوق · العملة)',
      holdingQty: 'الكمية الحالية',
      currentValue: 'السعر الحالي / القيمة',
      unrealized: 'ربح غير محقق',
      realized: 'ربح محقق',
      ifSoldToday: 'لو تم البيع اليوم',
      date: 'التاريخ',
      type: 'النوع',
      quantity: 'الكمية',
      price: 'السعر',
      amount: 'المبلغ',
      pnl: 'الربح / الخسارة',
      actions: 'الإجراءات'
    },
    manualBadge: 'يدوي',
    manualUpdatedAt: 'تم التحديث يدوياً: {{value}}',
    apiUpdatedAt: 'آخر تحديث من API: {{value}}',
    notUpdatedYet: 'لم يتم التحديث بعد',
    manualNamePlaceholder: 'اسم يدوي',
    currentPricePlaceholder: 'السعر الحالي',
    hedgeSuccess: 'تحوّط ممتاز ({{value}})',
    soldTooEarly: 'تم البيع مبكراً ({{value}})',
    tradeDetails: 'تفاصيل الصفقات',
    atPrice: '@ {{price}}',
    quantityAtPrice: '{{quantity}} سهم @ {{price}}',
    mobileHoldingQty: 'الكمية',
    mobileUnrealized: 'غير محقق',
    mobileRealized: 'محقق'
  },
  manager: {
    title: 'إدارة الإعدادات والسجلات',
    clearAndLoadDemo: 'مسح وتحميل بيانات تجريبية',
    apiKeyTitle: 'مفتاح API من yfapi.net',
    getFreeApiKey: 'احصل عليه مجاناً',
    apiKeyPlaceholder: 'ألصق x-api-key هنا (مثال: A2sD8...)',
    saveApiKey: 'حفظ المفتاح',
    baseCurrencyTitle: 'العملة الأساسية لبطاقات الملخص',
    baseCurrencyHelp: '* يتم تحويل كل أصل أجنبي إلى هذه العملة عبر أسعار صرف مباشرة حتى يمكن جمعه داخل بطاقات الملخص.',
    hideZeroHolding: 'إخفاء السجلات التي لم يعد فيها أسهم مملوكة',
    manualRecordTitle: 'إضافة سجل تداول يدوي',
    fields: {
      date: 'التاريخ',
      type: 'النوع',
      market: 'السوق',
      symbol: 'الرمز',
      quantity: 'الكمية',
      price: 'سعر الوحدة',
      amount: 'إجمالي المبلغ',
      pnl: 'الربح / الخسارة (للبيع فقط)'
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
    noRecords: 'لا توجد سجلات حالياً.'
  },
  notice: {
    title: 'مرحباً بك في Trade Lens',
    body: 'هذه أداة مفتوحة المصدر للمستثمرين لتحويل ملفات CSV من الوسيط إلى منحنيات تكلفة ورسوم أرباح وخسائر وتوزيع للمراكز خلال ثوانٍ.',
    privacy: 'الخصوصية أولاً: كل البيانات تبقى داخل متصفحك فقط (IndexedDB)، ولا يتم إرسالها إلى الخادم.',
    apiKey: 'مفتاح API: يُستخدم فقط لجلب الأسعار من yfapi.net، ويتم حفظه محلياً أيضاً.',
    sourceCode: 'مفتوح المصدر: تصفح الكود وشارك بالمساهمة',
    dismiss: 'عدم الإظهار مرة أخرى'
  },
  messages: {
    apiKeySaved: 'تم حفظ مفتاح API.',
    manualStockSaved: 'تم تحديث {{symbol}} يدوياً.',
    needApiKey: 'أدخل مفتاح yfapi.net في لوحة الإدارة قبل تحديث الأسعار.',
    cacheFresh: 'كل الأسعار وأسعار الصرف محدثة خلال آخر 24 ساعة، لذلك تم استخدام التخزين المحلي لتوفير الحصة.',
    updateSuccess: 'تم تحديث {{count}} من الأسعار وأسعار الصرف.',
    fetchFailed: 'فشل الجلب: {{message}}',
    baseCurrencyChanged: 'تم تبديل العملة الأساسية إلى {{currency}}. جارٍ تحديث أسعار الصرف...',
    recordUpdated: 'تم تحديث سجل التداول.',
    dataCleared: 'تم مسح البيانات وتحميل السجلات التجريبية.',
    clearConfirm: 'هل تريد مسح كل البيانات وإعادة تحميل البيانات التجريبية؟ لا يمكن التراجع عن هذا الإجراء.',
    backupConfirm: 'هل تريد تصدير البيانات الحالية كنسخة CSV احتياطية قبل المسح؟'
  },
  data: {
    unknownSymbol: 'رمز غير معروف ({{symbol}})',
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
  'ar-SA': { translation: arSA }
};
