import { guessMarket, normalizeMarket } from './helpers.js';

const BUY_TYPE_TERMS = [
  '買',
  '买',
  'buy',
  'bought',
  'bot',
  'bid',
  'long',
  'achat',
  'beli',
  'acquisto',
  'compra',
  'comprar',
  'koop',
  'reinvest',
  'reinvestment',
  'koopt',
  'kopen',
  'kauf',
  'mua',
  'ซื้อ',
  '매수',
  '매입',
  '買付',
  '買い',
  'شراء'
];

const SELL_TYPE_TERMS = [
  '賣',
  '卖',
  'sell',
  'sold',
  'sld',
  'ask',
  'short',
  'vente',
  'jual',
  'vendita',
  'vendere',
  'venda',
  'vender',
  'venta',
  'verkopen',
  'verkauf',
  'verkoop',
  'bán',
  'ขาย',
  '매도',
  '매각',
  '沽',
  '売',
  'بيع'
];

const REVERSE_SPLIT_TYPE_TERMS = [
  'reverse split',
  'reverse stock split',
  'stock consolidation',
  'share consolidation',
  'reverse stock consolidation',
  'reverse shares split',
  '反向拆股',
  '反向分割',
  '股票反向分割',
  '併股',
  '并股',
  '合股',
  '株式併合',
  '株式併合',
  '역분할',
  '주식병합'
];

const SPLIT_TYPE_TERMS = [
  'stock split',
  'share split',
  'forward split',
  '股票分割',
  '拆股',
  '分股',
  '拆細',
  '拆细',
  '株式分割',
  '액면분할',
  '주식분할'
];

const SORTED_BUY_TYPE_TERMS = [...BUY_TYPE_TERMS].sort((a, b) => b.length - a.length);
const SORTED_SELL_TYPE_TERMS = [...SELL_TYPE_TERMS].sort((a, b) => b.length - a.length);
const SORTED_REVERSE_SPLIT_TYPE_TERMS = [...REVERSE_SPLIT_TYPE_TERMS].sort((a, b) => b.length - a.length);
const SORTED_SPLIT_TYPE_TERMS = [...SPLIT_TYPE_TERMS].sort((a, b) => b.length - a.length);

const STANDARD_HEADER_ALIASES = {
  日期: ['日期', '交易日期', '成交日期', '成交時間', '交易時間', 'Date', 'Date/Time', 'Trade Date', 'Trade Time', 'Execution Time', 'Filled Time', 'Placed Time', 'Run Date', 'Settlement Date', 'Activity Date', 'Transaction Date', 'Timestamp', 'Time', 'Tanggal', 'Tarikh', 'Ngày', 'Ngày giao dịch', 'Date opération', 'Date de transaction', 'Fecha', 'Fecha de operación', 'Fecha de transacción', 'Data', 'Data operação', 'Datum', 'Handelsdatum', 'Buchungsdatum', 'Data di negoziazione', '日付', '取引日', '約定日', '受渡日', 'التاريخ', 'วันที่', 'วันที่ซื้อขาย', '날짜', '거래일', '체결일'],
  類型: ['類型', '交易類別', '交易類型', '交易方向', '買賣別', '買賣', '交易別', '動作', 'Type', 'Action', 'Transaction', 'Activity', 'Trade Type', 'Transaction Type', 'Action Type', 'Direction', 'Side', 'Jenis', 'Loại', 'Giao dịch', 'Type d\'ordre', 'Ordre', 'Tipo', 'Tipo de orden', 'Operación', 'Transacción', 'Tipo de operação', 'Operação', 'Auftragstyp', 'Transaktionstyp', 'Typ', 'Art', 'Ordine', 'Operazione', 'Ordertype', 'Transactie', '区分', '種類', '売買区分', '売買', '取引', '取引区分', 'النوع', 'الإجراء', 'ประเภท', 'ฝั่ง', 'สถานะ', '구분', '유형', '매매구분'],
  代號: ['代號', '股票代號', '代碼', '股號', '商品代號', '證券代號', '證券代碼', '證券編號', '股票編號', '股票代码', '證券コード', 'Symbol', 'Ticker', 'Ticker Symbol', 'Instrument Symbol', 'Trading Symbol', 'Stock Code', 'Simbol', 'Kode', 'Kod', 'Símbolo', 'Código', 'Código bursátil', 'Mã', 'Mã CK', 'Mã chứng khoán', 'Symbole', 'Code valeur', 'Wertpapier', 'Ticker-Symbol', 'Simbolo', 'Codice', 'Codice titolo', 'Symbool', '銘柄コード', 'コード', 'ティッカー', '銘柄番号', 'الرمز', 'สัญลักษณ์', 'ชื่อย่อ', 'ticker', '종목코드', '종목', '티커'],
  市場: ['市場', '市場別', '市場名稱', '市場名称', '市場區別', '市場区分', '交易所', 'Market', 'Exchange', 'Trading venue', 'Execution venue', 'Venue', 'Listing Exchange', 'Pasar', 'Pasaran', 'Thị trường', 'Marché', 'Place de marché', 'Mercado', 'Bolsa', 'Markt', 'Börse', 'Börsenplatz', 'Mercato', 'Beurs', '取引所', 'السوق', 'البورصة', 'ตลาด', '시장'],
  數量: ['數量', '成交股數', '成交數量', '成交数量', '股數', 'Quantity', 'Share Quantity', 'Qty', 'Shares', 'No. of shares', 'Units', 'Filled Qty', 'Kuantitas', 'Jumlah saham', 'Kuantiti', 'Bilangan unit', 'Bilangan saham', 'Số lượng', 'Khối lượng', 'Quantité', 'Cantidad', 'Acciones', 'Quantidade', 'Qtd', 'Stückzahl', 'Stück', 'Menge', 'Quantità', 'Aantal', '数量', '株数', '約定数量', '約定株数', '成交股數/張數', '股數/張數', 'الكمية', 'عدد الأسهم', 'จำนวน', 'จำนวนหุ้น', '수량', '주수'],
  單價: ['單價', '成交價', '成交單價', '成交均價', '成交均价', '均價', '均价', '平均價', '平均价格', 'Price', 'Price / share', 'Price per share', 'Share Price', 'Execution Price', 'T. Price', 'Trade Price', 'Average Price', 'Avg Price', 'Avg. Price', 'Filled Avg Price', 'Harga', 'Harga per unit', 'Harga seunit', 'Giá', 'Giá khớp', 'Đơn giá', 'Prix', 'Prix unitaire', 'Precio', 'Precio unitario', 'Preço', 'Preço unitário', 'Preis', 'Kurs', 'Prezzo', 'Prijs', 'Prijs per aandeel', '単価', '価格', '約定価格', '約定単価', '取得単価', 'سعر الوحدة', 'السعر', 'ราคา', 'ราคาต่อหุ้น', 'ราคาต่อหน่วย', '단가', '체결가', '가격'],
  總金額: ['總金額', '成交金額', '成交金额', '成交價金', '成交价金', '交割金額', '應收付金額', '淨額', '淨交收金額', '結算金額', 'Amount', 'Proceeds', 'Total', 'Total Amount', 'Total Value', 'Net Amount', 'Net Cash Amount', 'Trade Amount', 'Local value', 'Filled Amount', 'Nilai', 'Jumlah', 'Jumlah keseluruhan', 'Giá trị', 'Tổng giá trị', 'Montant', 'Montant total', 'Valeur totale', 'Importe', 'Importe total', 'Monto', 'Monto total', 'Valor total', 'Betrag', 'Gesamtbetrag', 'Importo', 'Totale', 'Bedrag', 'Totaalbedrag', '金額', '合計金額', '約定代金', '取得金額', '受渡金額', 'إجمالي المبلغ', 'إجمالي القيمة', 'القيمة', 'มูลค่า', 'มูลค่ารวม', 'ยอดรวม', '금액', '총금액', '총액'],
  損益: ['損益', '實現損益', 'PnL', 'P/L', 'Realized PnL', 'Realized P/L', 'Realized Gain/Loss', 'Profit', 'P&L', 'Gain/Loss', 'Gain/Loss $', 'P&L $', 'P&L $ (Unrealized)', 'Unrealized P/L', 'Untung/Rugi', 'Untung rugi', 'Laba/Rugi', 'Lãi/Lỗ', 'Lãi lỗ', 'Lãi/Lỗ đã chốt', 'Plus/moins-value', 'Plus-value', 'Moins-value', 'Gain/Perte', 'Ganancia/Pérdida', 'Ganancias/Pérdidas', 'Resultado', 'Lucro/Prejuízo', 'Lucro / Prejuízo', 'Gewinn/Verlust', 'G/V', 'Utile/Perdita', 'Profitto/Perdita', 'Winst/Verlies', '実現損益', '含み損益', 'الربح أو الخسارة', 'الربح/الخسارة', 'الأرباح والخسائر', 'กำไรขาดทุน', 'กำไร/ขาดทุน', '손익', '실현손익'],
  說明: ['Description', 'Name', 'Security Name', 'Stock Name', 'Details', 'Instrument', 'Instrument Name', 'Product', 'Security', 'Asset', '股票名稱', '證券名稱', '商品名稱', '股名', '銘柄', '銘柄名', '銘柄名称'],
  持倉類型: ['Position', 'Position Type'],
  成本基礎: ['Cost Basis', 'Cost basis', 'Cost Basis $', 'Basis', 'Total Cost'],
  每股成本: ['Cost per Share', 'Cost/Share', 'Share Cost', 'Share/Contract Cost', 'Cost Price', 'Average Cost'],
  市值: ['Market Value', 'Position Value', 'Value'],
  開倉日: ['Open Date', 'Open'],
  帳戶類型: ['Account Type', 'Account', 'Account Name', 'Account Number', 'Portfolio', '口座区分', '口座種別'],
  手續費: ['Comm/Fee', 'Commission', 'Comm/Tax', 'Total Commission', 'Fee', 'Fees', 'Transaction fee', 'Brokerage fee', 'Brokerage fees', 'Charge amount', 'Currency conversion fee', 'AutoFX Fee', 'AutoFX fee', 'Stamp duty', 'Stamp duty reserve tax', 'PTM levy', 'Finra fee', 'SEC fee', 'Gebühr', 'Gebühren', 'Provision', 'Kommission', 'Courtage', 'Frais', 'Frais de transaction', '手續費', '手续费', '佣金', '手数料'],
  幣別: ['Currency', 'Trade Currency', 'Settlement Currency', 'Account Currency', 'Currency (Price / share)', 'Currency (Total)', 'Currency (Amount)', 'Price Currency', 'Währung', 'Devise', 'Valuta', '交收貨幣', '幣別', '币别', '通貨'],
  ISIN: ['ISIN']
};

const REQUIRED_STANDARD_FIELDS = ['日期', '類型', '代號', '數量'];
const DELIMITER_CANDIDATES = [',', ';', '\t'];
const DELIMITER_LABELS = {
  ',': ',',
  ';': ';',
  '\t': 'tab'
};
const MAX_SKIPPED_PREVIEW_ROWS = 5;

const CSV_IMPORT_PROFILES = [
  {
    id: 'trade-lens',
    label: 'Trade Lens',
    translationKey: 'header.csvProfiles.tradeLens',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['日期'],
      類型: ['類型'],
      代號: ['代號'],
      數量: ['數量'],
      單價: ['單價'],
      總金額: ['總金額'],
      損益: ['損益']
    }
  },
  {
    id: 'broker-zh',
    label: '中文 CSV',
    translationKey: 'header.csvProfiles.brokerZh',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['交易日期', '成交日期'],
      類型: ['交易類別', '動作'],
      代號: ['股票代號', '代碼'],
      數量: ['成交股數', '股數'],
      單價: ['成交價', '成交單價'],
      總金額: ['成交金額', '淨額']
    }
  },
  {
    id: 'broker-en',
    label: 'English CSV',
    translationKey: 'header.csvProfiles.brokerEn',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Trade Date', 'Date'],
      類型: ['Side', 'Type', 'Action'],
      代號: ['Symbol', 'Ticker'],
      數量: ['Quantity', 'Qty', 'Shares'],
      單價: ['Price', 'Execution Price'],
      總金額: ['Amount', 'Total Amount', 'Net Amount'],
      損益: ['PnL', 'Realized PnL', 'Profit', 'P&L']
    }
  },
  {
    id: 'broker-ja',
    label: '日本語 CSV',
    translationKey: 'header.csvProfiles.brokerJa',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['取引日', '日付'],
      類型: ['売買区分', '種類', '区分'],
      代號: ['銘柄コード', 'コード', 'ティッカー'],
      數量: ['株数', '数量'],
      單價: ['約定価格', '価格', '単価'],
      總金額: ['約定代金', '合計金額', '金額'],
      損益: ['実現損益']
    }
  },
  {
    id: 'broker-ko',
    label: '한국어 CSV',
    translationKey: 'header.csvProfiles.brokerKo',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['거래일', '체결일', '날짜'],
      類型: ['매매구분', '구분', '유형'],
      代號: ['종목코드', '종목', '티커'],
      數量: ['수량', '주수'],
      單價: ['체결가', '단가', '가격'],
      總金額: ['금액', '총금액', '총액'],
      損益: ['실현손익', '손익']
    }
  },
  {
    id: 'broker-th',
    label: 'ไทย CSV',
    translationKey: 'header.csvProfiles.brokerTh',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['วันที่ซื้อขาย', 'วันที่'],
      類型: ['ฝั่ง', 'ประเภท', 'สถานะ'],
      代號: ['สัญลักษณ์', 'ชื่อย่อ'],
      數量: ['จำนวนหุ้น', 'จำนวน'],
      單價: ['ราคาต่อหุ้น', 'ราคาต่อหน่วย', 'ราคา'],
      總金額: ['มูลค่ารวม', 'มูลค่า', 'ยอดรวม'],
      損益: ['กำไร/ขาดทุน', 'กำไรขาดทุน']
    }
  },
  {
    id: 'broker-ar',
    label: 'العربية CSV',
    translationKey: 'header.csvProfiles.brokerAr',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['التاريخ'],
      類型: ['النوع', 'الإجراء'],
      代號: ['الرمز'],
      數量: ['الكمية', 'عدد الأسهم'],
      單價: ['سعر الوحدة', 'السعر'],
      總金額: ['إجمالي المبلغ', 'إجمالي القيمة', 'القيمة'],
      損益: ['الربح/الخسارة', 'الربح أو الخسارة', 'الأرباح والخسائر']
    }
  },
  {
    id: 'broker-euro',
    label: 'Euro-style CSV',
    translationKey: 'header.csvProfiles.brokerEuro',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: ',',
    signatureHeaders: {
      日期: ['Date de transaction', 'Date opération', 'Fecha de transacción', 'Fecha de operación', 'Data operação', 'Handelsdatum', 'Data di negoziazione'],
      類型: ['Type d\'ordre', 'Operación', 'Tipo de operação', 'Auftragstyp', 'Ordertype', 'Operazione'],
      代號: ['Code valeur', 'Símbolo', 'Código bursátil', 'Ticker-Symbol', 'Codice titolo', 'Symbool'],
      數量: ['Quantité', 'Cantidad', 'Quantidade', 'Menge', 'Quantità', 'Aantal'],
      單價: ['Prix unitaire', 'Precio unitario', 'Preço unitário', 'Kurs', 'Prezzo', 'Prijs'],
      總金額: ['Montant total', 'Importe total', 'Valor total', 'Gesamtbetrag', 'Importo', 'Totaalbedrag'],
      損益: ['Gain/Perte', 'Ganancia/Pérdida', 'Lucro/Prejuízo', 'Gewinn/Verlust', 'Profitto/Perdita', 'Winst/Verlies']
    }
  },
  {
    id: 'trading212-transactions',
    label: 'Trading 212 transactions',
    translationKey: 'header.csvProfiles.trading212Transactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Time', 'Date/Time'],
      類型: ['Action'],
      代號: ['Ticker', 'Ticker Symbol'],
      數量: ['No. of shares', 'Quantity'],
      單價: ['Price / share', 'Price'],
      總金額: ['Total', 'Total Amount'],
      手續費: ['Transaction fee', 'Currency conversion fee', 'Stamp duty reserve tax']
    }
  },
  {
    id: 'freetrade-transactions',
    label: 'Freetrade activity',
    translationKey: 'header.csvProfiles.freetradeTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Date', 'Time'],
      類型: ['Type', 'Action'],
      代號: ['Ticker', 'Symbol'],
      數量: ['Quantity', 'Shares'],
      單價: ['Price per share', 'Price / share', 'Price'],
      總金額: ['Total', 'Amount', 'Total Amount'],
      手續費: ['Fee', 'Fees']
    }
  },
  {
    id: 'scalable-transactions',
    label: 'Scalable Capital trades',
    translationKey: 'header.csvProfiles.scalableTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: ',',
    signatureHeaders: {
      日期: ['Buchungsdatum', 'Handelsdatum', 'Datum'],
      類型: ['Typ', 'Auftragstyp', 'Transaktionstyp'],
      代號: ['Ticker', 'Ticker-Symbol', 'Symbol'],
      市場: ['Börsenplatz', 'Markt'],
      數量: ['Stück', 'Menge'],
      單價: ['Preis', 'Kurs'],
      總金額: ['Betrag', 'Gesamtbetrag'],
      手續費: ['Gebühr', 'Gebühren', 'Provision']
    }
  },
  {
    id: 'saxo-transactions',
    label: 'Saxo transactions',
    translationKey: 'header.csvProfiles.saxoTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Trade Date', 'Transaction Date', 'Date'],
      類型: ['Trade Type', 'Transaction Type', 'Type'],
      代號: ['Instrument Symbol', 'Symbol', 'Ticker'],
      市場: ['Exchange', 'Market', 'Trading venue'],
      數量: ['Quantity'],
      單價: ['Price', 'Trade Price'],
      總金額: ['Trade Amount', 'Amount', 'Net Amount'],
      手續費: ['Commission', 'Fee', 'Fees'],
      幣別: ['Currency', 'Trade Currency']
    }
  },
  {
    id: 'schwab-transactions',
    label: 'Schwab transactions',
    translationKey: 'header.csvProfiles.schwabTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Date'],
      類型: ['Action'],
      代號: ['Symbol'],
      數量: ['Quantity'],
      單價: ['Price'],
      總金額: ['Amount'],
      說明: ['Description']
    }
  },
  {
    id: 'schwab-positions',
    label: 'Schwab positions',
    translationKey: 'header.csvProfiles.schwabPositions',
    importKind: 'positions',
    requiredFields: ['代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      代號: ['Symbol'],
      數量: ['Quantity'],
      單價: ['Price'],
      市值: ['Market Value'],
      成本基礎: ['Cost Basis', 'Cost basis'],
      每股成本: ['Cost per Share', 'Share/Contract Cost', 'Cost/Share'],
      開倉日: ['Open Date'],
      說明: ['Description'],
      持倉類型: ['Position']
    }
  },
  {
    id: 'ibkr-transactions',
    label: 'IBKR trades',
    translationKey: 'header.csvProfiles.ibkrTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Date/Time'],
      代號: ['Symbol'],
      數量: ['Quantity'],
      單價: ['T. Price', 'Trade Price'],
      總金額: ['Proceeds'],
      成本基礎: ['Basis', 'Cost Basis'],
      手續費: ['Comm/Fee', 'Total Commission'],
      損益: ['Realized P/L', 'Realized Gain/Loss']
    }
  },
  {
    id: 'ibkr-positions',
    label: 'IBKR positions',
    translationKey: 'header.csvProfiles.ibkrPositions',
    importKind: 'positions',
    requiredFields: ['代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      代號: ['Symbol'],
      數量: ['Quantity'],
      每股成本: ['Cost Price', 'Average Cost'],
      成本基礎: ['Cost Basis'],
      市值: ['Value', 'Market Value'],
      開倉日: ['Open'],
      損益: ['Unrealized P/L']
    }
  },
  {
    id: 'firstrade-transactions',
    label: 'Firstrade activity',
    translationKey: 'header.csvProfiles.firstradeTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Date'],
      類型: ['Transaction'],
      代號: ['Symbol'],
      數量: ['Share Quantity', 'Quantity'],
      單價: ['Price', 'Share Price'],
      總金額: ['Amount'],
      帳戶類型: ['Account Type'],
      說明: ['Description']
    }
  },
  {
    id: 'robinhood-transactions',
    label: 'Robinhood activity',
    translationKey: 'header.csvProfiles.robinhoodTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Date/Time'],
      類型: ['Type', 'Activity'],
      代號: ['Symbol'],
      數量: ['Quantity', 'Share Quantity'],
      單價: ['Price', 'Average Price'],
      總金額: ['Amount', 'Total Amount'],
      手續費: ['Fees', 'Fee'],
      說明: ['Details', 'Description']
    }
  },
  {
    id: 'rakuten-transactions',
    label: 'Rakuten Securities trades',
    translationKey: 'header.csvProfiles.rakutenTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['約定日', '受渡日'],
      類型: ['売買'],
      代號: ['銘柄コード'],
      數量: ['約定数量', '株数'],
      單價: ['約定単価', '約定価格'],
      總金額: ['受渡金額', '約定代金'],
      說明: ['銘柄']
    }
  },
  {
    id: 'sbi-transactions',
    label: 'SBI Securities trades',
    translationKey: 'header.csvProfiles.sbiTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['約定日', '受渡日'],
      類型: ['取引', '売買'],
      代號: ['銘柄コード', 'コード'],
      數量: ['約定数量', '株数'],
      單價: ['約定単価', '約定価格'],
      總金額: ['受渡金額', '約定代金'],
      說明: ['銘柄']
    }
  },
  {
    id: 'sinopac-tw-transactions',
    label: 'Sinopac Taiwan trades',
    translationKey: 'header.csvProfiles.sinopacTwTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['成交日期', '交易日期'],
      類型: ['買賣別', '交易別'],
      代號: ['股票代號'],
      數量: ['成交股數', '成交數量'],
      單價: ['成交價', '成交均價'],
      總金額: ['成交價金', '成交金額'],
      市場: ['市場別'],
      說明: ['股票名稱']
    }
  },
  {
    id: 'fubon-tw-transactions',
    label: 'Fubon Taiwan trades',
    translationKey: 'header.csvProfiles.fubonTwTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['成交日期', '交易日期'],
      類型: ['買賣別', '交易別'],
      代號: ['證券代號', '股票代號'],
      數量: ['成交數量', '成交股數'],
      單價: ['成交價格', '成交價'],
      總金額: ['成交金額', '成交價金'],
      市場: ['市場別'],
      說明: ['證券名稱', '股票名稱']
    }
  },
  {
    id: 'futu-transactions',
    label: 'Futu / moomoo activity',
    translationKey: 'header.csvProfiles.futuTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['成交時間', '交易日期', 'Date/Time', 'Trade Date'],
      類型: ['交易方向', '買賣', 'Action', 'Side'],
      代號: ['證券代碼', '股票代號', '股票編號', 'Symbol', 'Stock Code'],
      市場: ['市場', 'Market'],
      數量: ['成交數量', '成交股數', 'Filled Qty', 'Quantity'],
      單價: ['成交均價', '平均價', 'Avg Price', 'Average Price'],
      總金額: ['成交金額', '淨交收金額', '結算金額', 'Filled Amount', 'Amount'],
      說明: ['股票名稱', '證券名稱', 'Stock Name', 'Name']
    }
  },
  {
    id: 'monex-transactions',
    label: 'Monex Securities trades',
    translationKey: 'header.csvProfiles.monexTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['約定日', '受渡日'],
      類型: ['取引種別'],
      代號: ['銘柄コード', 'ティッカー'],
      數量: ['数量', '数量[株]'],
      單價: ['単価', '約定単価'],
      總金額: ['受渡金額', '約定代金'],
      帳戶類型: ['口座区分'],
      說明: ['銘柄名', '銘柄名称']
    }
  },
  {
    id: 'yuanta-tw-transactions',
    label: 'Yuanta Taiwan trades',
    translationKey: 'header.csvProfiles.yuantaTwTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['成交日期', '交易日期'],
      類型: ['買賣別'],
      代號: ['股號'],
      數量: ['成交股數', '股數'],
      單價: ['成交價格', '成交價'],
      總金額: ['應收付金額', '交割金額'],
      說明: ['股名']
    }
  },
  {
    id: 'kgi-tw-transactions',
    label: 'KGI Taiwan trades',
    translationKey: 'header.csvProfiles.kgiTwTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['成交日期', '交易日期'],
      類型: ['買賣別', '交易別'],
      代號: ['商品代號'],
      數量: ['成交數量', '成交股數'],
      單價: ['成交價格', '成交價'],
      總金額: ['交割金額', '應收付金額'],
      市場: ['市場別'],
      說明: ['商品名稱', '證券名稱']
    }
  },
  {
    id: 'president-tw-transactions',
    label: 'President Securities Taiwan trades',
    translationKey: 'header.csvProfiles.presidentTwTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['成交日期', '交易日期'],
      類型: ['買賣別'],
      代號: ['股票代號', '股號'],
      數量: ['成交股數', '股數'],
      單價: ['成交價', '成交價格'],
      總金額: ['應收付金額', '交割金額', '成交金額'],
      說明: ['股票名稱', '股名']
    }
  },
  {
    id: 'matsui-transactions',
    label: 'Matsui Securities trades',
    translationKey: 'header.csvProfiles.matsuiTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['取引日'],
      類型: ['売買区分', '取引区分'],
      代號: ['銘柄コード'],
      數量: ['株数', '約定株数'],
      單價: ['取得単価', '約定単価', '単価'],
      總金額: ['取得金額', '受渡金額', '約定代金'],
      說明: ['銘柄名']
    }
  },
  {
    id: 'fidelity-transactions',
    label: 'Fidelity history',
    translationKey: 'header.csvProfiles.fidelityTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Run Date', 'Settlement Date'],
      類型: ['Action'],
      代號: ['Symbol'],
      數量: ['Quantity'],
      單價: ['Price', 'Price ($)'],
      總金額: ['Amount', 'Amount ($)'],
      帳戶類型: ['Account'],
      說明: ['Security Description', 'Description']
    }
  },
  {
    id: 'webull-transactions',
    label: 'Webull orders',
    translationKey: 'header.csvProfiles.webullTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Filled Time', 'Placed Time', 'Date/Time'],
      類型: ['Side', 'Action'],
      代號: ['Symbol'],
      數量: ['Filled Qty', 'Quantity'],
      單價: ['Avg. Price', 'Avg Price', 'Average Price'],
      總金額: ['Filled Amount', 'Amount'],
      說明: ['Ticker Name', 'Description']
    }
  },
  {
    id: 'wealthsimple-activities',
    label: 'Wealthsimple activities',
    translationKey: 'header.csvProfiles.wealthsimpleActivities',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Date', 'Activity Date'],
      類型: ['Activity', 'Action'],
      代號: ['Symbol', 'Ticker'],
      數量: ['Quantity', 'Units'],
      單價: ['Price', 'Price per share'],
      總金額: ['Amount', 'Value'],
      帳戶類型: ['Account', 'Account Name'],
      幣別: ['Currency']
    }
  },
  {
    id: 'wealthsimple-holdings',
    label: 'Wealthsimple holdings',
    translationKey: 'header.csvProfiles.wealthsimpleHoldings',
    importKind: 'positions',
    requiredFields: ['代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      代號: ['Symbol', 'Ticker'],
      數量: ['Quantity', 'Units'],
      單價: ['Current Price', 'Price'],
      每股成本: ['Average Cost', 'Average cost'],
      成本基礎: ['Book Value', 'Cost Basis'],
      市值: ['Market Value', 'Current Value'],
      帳戶類型: ['Account', 'Account Name'],
      幣別: ['Currency'],
      說明: ['Security', 'Holding']
    }
  },
  {
    id: 'questrade-transactions',
    label: 'Questrade activity',
    translationKey: 'header.csvProfiles.questradeTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['Transaction Date', 'Settlement Date'],
      類型: ['Action', 'Activity Type'],
      代號: ['Symbol', 'Ticker'],
      數量: ['Quantity'],
      單價: ['Price', 'Price Per Share'],
      總金額: ['Net Amount', 'Gross Amount'],
      手續費: ['Commission'],
      幣別: ['Currency'],
      說明: ['Description', 'Security']
    }
  },
  {
    id: 'hk-statement-transactions',
    label: 'Hong Kong broker statement',
    translationKey: 'header.csvProfiles.hkStatementTransactions',
    importKind: 'trades',
    requiredFields: ['日期', '類型', '代號', '數量'],
    preferredDecimalSeparator: '.',
    signatureHeaders: {
      日期: ['交易日期', 'Trade Date'],
      類型: ['買賣', '交易方向', 'Buy/Sell'],
      代號: ['股票編號', '證券代碼', 'Stock Code'],
      數量: ['成交股數', '股數', '成交股數/張數'],
      單價: ['平均價', '成交均價', 'Average Price'],
      總金額: ['淨交收金額', '結算金額', 'Net Settlement Amount'],
      幣別: ['交收貨幣', 'Currency'],
      說明: ['證券名稱', 'Stock Name']
    }
  }
];

const buildProfileOption = ({ id, importKind, label, translationKey }) => ({
  id,
  importKind,
  label,
  translationKey,
  presetKind: id.startsWith('broker-') || id === 'trade-lens' ? 'generic' : 'broker'
});

export const CSV_IMPORT_PROFILE_OPTIONS = [
  { id: 'auto', label: 'Auto detect', translationKey: 'header.importProfileAuto', presetKind: 'auto', importKind: 'trades' },
  ...CSV_IMPORT_PROFILES.map(buildProfileOption)
];

export const CSV_IMPORT_PROFILE_OPTION_GROUPS = [
  {
    id: 'recommended',
    label: 'Recommended',
    translationKey: 'header.importPresetGroups.recommended',
    options: CSV_IMPORT_PROFILE_OPTIONS.filter((option) => option.presetKind === 'auto')
  },
  {
    id: 'brokerPresets',
    label: 'Broker presets',
    translationKey: 'header.importPresetGroups.brokerPresets',
    options: CSV_IMPORT_PROFILE_OPTIONS.filter((option) => option.presetKind === 'broker')
  },
  {
    id: 'genericTemplates',
    label: 'Generic templates',
    translationKey: 'header.importPresetGroups.genericTemplates',
    options: CSV_IMPORT_PROFILE_OPTIONS.filter((option) => option.presetKind === 'generic')
  }
];

const PROFILE_LOOKUP = new Map(CSV_IMPORT_PROFILES.map((profile) => [profile.id, profile]));

const tokenizeHeaderLabel = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .split(/[\s_()[\]{}:：/\\.'"-]+/g)
  .filter(Boolean);

const normalizeHeaderLabel = (value) => tokenizeHeaderLabel(value).join('');

const getHeaderMatchStrength = (rawHeader, keyword) => {
  const headerTokens = tokenizeHeaderLabel(rawHeader);
  const keywordTokens = tokenizeHeaderLabel(keyword);
  const normalizedHeader = normalizeHeaderLabel(rawHeader);
  const normalizedKeyword = normalizeHeaderLabel(keyword);

  if (!normalizedHeader || !normalizedKeyword) {
    return 0;
  }

  if (normalizedHeader === normalizedKeyword) {
    return 2;
  }

  if (headerTokens.length > 1 || keywordTokens.length > 1) {
    return keywordTokens.every((token) => headerTokens.includes(token))
      ? 1
      : 0;
  }

  return (
    normalizedHeader.includes(normalizedKeyword)
    || normalizedKeyword.includes(normalizedHeader)
  )
    ? 1
    : 0;
};

const matchesHeaderLabel = (rawHeader, keyword) => getHeaderMatchStrength(rawHeader, keyword) > 0;

const splitDelimitedLine = (line, delimiter) => {
  const cells = [];
  let currentValue = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        currentValue += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === delimiter && !inQuotes) {
      cells.push(currentValue.trim());
      currentValue = '';
      continue;
    }

    currentValue += character;
  }

  cells.push(currentValue.trim());
  return cells.map((cell) => cell.replace(/^\uFEFF/, '').trim());
};

const scoreProfileAgainstHeaders = (rawHeaders, profile) => {
  let score = 0;
  const matchedFields = [];

  Object.entries(profile.signatureHeaders).forEach(([field, keywords]) => {
    const bestMatchStrength = rawHeaders.reduce((currentBestStrength, header) => {
      const headerBestStrength = keywords.reduce((currentKeywordBest, keyword) => (
        Math.max(currentKeywordBest, getHeaderMatchStrength(header, keyword))
      ), 0);

      return Math.max(currentBestStrength, headerBestStrength);
    }, 0);

    if (bestMatchStrength > 0) {
      score += bestMatchStrength >= 2 ? 18 : 14;
      matchedFields.push(field);
    }
  });

  return {
    score,
    matchedFields
  };
};

const detectProfile = (rawHeaders, preferredProfileId = 'auto') => {
  const preferredProfile = preferredProfileId !== 'auto'
    ? PROFILE_LOOKUP.get(preferredProfileId)
    : null;

  if (preferredProfile) {
    const profileScore = scoreProfileAgainstHeaders(rawHeaders, preferredProfile);
    return {
      profile: preferredProfile,
      score: profileScore.score + 20,
      matchedFields: profileScore.matchedFields
    };
  }

  const rankedProfiles = CSV_IMPORT_PROFILES.map((profile) => {
    const profileScore = scoreProfileAgainstHeaders(rawHeaders, profile);

    return {
      profile,
      score: profileScore.score,
      matchedFields: profileScore.matchedFields
    };
  }).sort((left, right) => right.score - left.score);

  if (!rankedProfiles.length || rankedProfiles[0].score <= 0) {
    return {
      profile: null,
      score: 0,
      matchedFields: []
    };
  }

  return rankedProfiles[0];
};

const buildHeaderMap = (rawHeaders) => {
  const headerMap = {};

  rawHeaders.forEach((rawHeader, index) => {
    for (const [standardField, keywords] of Object.entries(STANDARD_HEADER_ALIASES)) {
      if (headerMap[standardField] !== undefined) {
        continue;
      }

      if (keywords.some((keyword) => matchesHeaderLabel(rawHeader, keyword))) {
        headerMap[standardField] = index;
        break;
      }
    }
  });

  return headerMap;
};

const inspectHeaderRow = (rawHeaders, preferredProfileId = 'auto') => {
  const headerMap = buildHeaderMap(rawHeaders);
  const matchedFields = Object.keys(headerMap);
  const profileDetection = detectProfile(rawHeaders, preferredProfileId);
  const requiredFields = profileDetection.profile?.requiredFields || REQUIRED_STANDARD_FIELDS;
  const matchedRequiredFields = requiredFields.filter((field) => headerMap[field] !== undefined);
  const hasSymbolAndType = headerMap['代號'] !== undefined
    && (headerMap['類型'] !== undefined || profileDetection.profile?.importKind === 'positions');
  const hasValueField = headerMap['總金額'] !== undefined
    || headerMap['單價'] !== undefined
    || headerMap['成本基礎'] !== undefined
    || headerMap['市值'] !== undefined
    || headerMap['每股成本'] !== undefined;
  const score = (
    matchedFields.length * 8
    + matchedRequiredFields.length * 20
    + (hasValueField ? 8 : 0)
    + profileDetection.score
  );

  return {
    score,
    headerMap,
    matchedFields,
    requiredFields,
    matchedRequiredFields,
    hasSymbolAndType,
    hasValueField,
    profile: profileDetection.profile,
    profileLabel: profileDetection.profile?.label || 'Generic CSV',
    profileLabelKey: profileDetection.profile?.translationKey || ''
  };
};

const detectLayout = (lines, preferredProfileId = 'auto') => {
  const inspectedCandidates = DELIMITER_CANDIDATES.map((delimiter) => {
    let bestHeaderIndex = -1;
    let bestInspection = null;
    let widestRow = 0;

    lines.slice(0, 12).forEach((line, index) => {
      const cells = splitDelimitedLine(line, delimiter);
      widestRow = Math.max(widestRow, cells.length);
      const inspection = inspectHeaderRow(cells, preferredProfileId);

      if (!bestInspection || inspection.score > bestInspection.score) {
        bestInspection = inspection;
        bestHeaderIndex = index;
      }
    });

    return {
      delimiter,
      widestRow,
      headerIndex: bestHeaderIndex,
      inspection: bestInspection,
      score: (bestInspection?.score || 0) + widestRow
    };
  }).sort((left, right) => right.score - left.score);

  const bestCandidate = inspectedCandidates[0];
  if (!bestCandidate) {
    return null;
  }

  return {
    rawHeaders: splitDelimitedLine(lines[bestCandidate.headerIndex] || '', bestCandidate.delimiter),
    delimiter: bestCandidate.delimiter,
    delimiterLabel: DELIMITER_LABELS[bestCandidate.delimiter] || bestCandidate.delimiter,
    headerIndex: bestCandidate.headerIndex >= 0 ? bestCandidate.headerIndex : 0,
    inspection: bestCandidate.inspection || inspectHeaderRow(splitDelimitedLine(lines[0] || '', bestCandidate.delimiter), preferredProfileId)
  };
};

const normalizeTradeType = (rawValue) => {
  const typeTokens = tokenizeHeaderLabel(rawValue);
  const normalizedType = normalizeHeaderLabel(rawValue);
  if (!normalizedType) {
    return '';
  }

  if (SORTED_REVERSE_SPLIT_TYPE_TERMS.some((term) => normalizedType.includes(normalizeHeaderLabel(term)))) {
    return '反向拆股';
  }

  if (SORTED_SPLIT_TYPE_TERMS.some((term) => normalizedType.includes(normalizeHeaderLabel(term)))) {
    return '拆股';
  }

  if (typeTokens.includes('split')) {
    return '拆股';
  }

  if (SORTED_SELL_TYPE_TERMS.some((term) => normalizedType.includes(normalizeHeaderLabel(term)))) {
    return '賣出';
  }

  if (SORTED_BUY_TYPE_TERMS.some((term) => normalizedType.includes(normalizeHeaderLabel(term)))) {
    return '買入';
  }

  return rawValue;
};

const MARKET_HINTS = [
  { market: '台股', hints: ['台股', '臺股', '台灣', '臺灣', 'taiwan', 'tw', 'twse', 'tpex'] },
  { market: '港股', hints: ['港股', '香港', 'hongkong', 'hk', 'hkex', '香港株', '香港株式'] },
  { market: '日股', hints: ['日股', '日本', 'japan', 'jp', 'tse', 'tokyo', '日本株', '日本株式', '国内株'] },
  { market: '美股', hints: ['美股', '美國', '美国', 'us', 'usa', 'nyse', 'nasdaq', '米国株', '米国株式'] },
  { market: '陸股', hints: ['陸股', '中國', '中国', 'china', 'ashare', 'a股', '上海', '深圳', 'shanghai', 'shenzhen', '中国株', '中国株式'] },
  { market: '英股', hints: ['英股', '英國', '英国', 'uk', 'gb', 'lse', 'london', 'unitedkingdom'] },
  { market: '法股', hints: ['法股', '法國', '法国', 'fr', 'france', 'paris', 'euronextparis'] },
  { market: '德股', hints: ['德股', '德國', '德国', 'de', 'germany', 'xetra', 'frankfurt'] },
  { market: '義股', hints: ['義股', '意股', '義大利', '意大利', 'it', 'italy', 'milan', 'borsaitaliana'] },
  { market: '荷股', hints: ['荷股', '荷蘭', '荷兰', 'nl', 'netherlands', 'amsterdam', 'euronextamsterdam'] },
  { market: '西班牙股', hints: ['西班牙股', '西股', 'es', 'spain', 'madrid', 'bme'] },
  { market: '葡股', hints: ['葡股', '葡萄牙', 'pt', 'portugal', 'lisbon', 'euronextlisbon'] },
  { market: '瑞士股', hints: ['瑞士股', 'ch', 'switzerland', 'six', 'swiss'] },
  { market: '瑞典股', hints: ['瑞典股', 'se', 'sweden', 'stockholm', 'nasdaqstockholm'] },
  { market: '丹麥股', hints: ['丹麥股', '丹麦股', 'dk', 'denmark', 'copenhagen', 'nasdaqcopenhagen'] },
  { market: '挪威股', hints: ['挪威股', 'no', 'norway', 'oslo', 'oslobors'] },
  { market: '芬蘭股', hints: ['芬蘭股', '芬兰股', 'fi', 'finland', 'helsinki', 'nasdaqhelsinki'] }
];

const resolveCanonicalMarket = (rawValue) => {
  const normalizedMarketName = normalizeMarket(rawValue);
  if (normalizedMarketName) {
    return normalizedMarketName;
  }

  const normalizedMarket = normalizeHeaderLabel(rawValue);
  if (!normalizedMarket) {
    return '';
  }

  const matchedMarket = MARKET_HINTS.find(({ hints }) => (
    hints.some((hint) => normalizedMarket.includes(normalizeHeaderLabel(hint)))
  ));

  return matchedMarket?.market || '';
};

const inferSymbolMarket = (rawSymbol) => {
  const normalizedSymbol = String(rawSymbol || '').trim().toUpperCase();
  if (!normalizedSymbol) {
    return '';
  }

  const guessedMarket = guessMarket(normalizedSymbol);
  if (guessedMarket && guessedMarket !== '未知' && (normalizedSymbol.includes('.') || guessedMarket !== '美股')) {
    return guessedMarket;
  }

  if (/\.HK$/.test(normalizedSymbol)) {
    return '港股';
  }

  if (/\.TWO?$/.test(normalizedSymbol)) {
    return '台股';
  }

  if (/\.T$/.test(normalizedSymbol)) {
    return '日股';
  }

  if (/\.SS$|\.SZ$/.test(normalizedSymbol)) {
    return '陸股';
  }

  if (/\.TO$|\.V$|\.CN$|\.NE$/.test(normalizedSymbol)) {
    return '加拿大股';
  }

  if (/^\d{6}$/.test(normalizedSymbol) && (normalizedSymbol.startsWith('6') || normalizedSymbol.startsWith('0'))) {
    return '陸股';
  }

  if (/^\d{5}$/.test(normalizedSymbol)) {
    return '港股';
  }

  if (/^\d{4}$/.test(normalizedSymbol)) {
    return '日股';
  }

  if (/^[A-Z][A-Z0-9-]*$/.test(normalizedSymbol)) {
    return '美股';
  }

  return '';
};

const CURRENCY_MARKET_HINTS = {
  CAD: '加拿大股',
  CNY: '陸股',
  CNH: '陸股',
  CHF: '瑞士股',
  DKK: '丹麥股',
  GBX: '英股',
  GBP: '英股',
  HKD: '港股',
  JPY: '日股',
  NOK: '挪威股',
  SEK: '瑞典股',
  TWD: '台股',
  USD: '美股'
};

const ISIN_MARKET_HINTS = {
  CH: '瑞士股',
  DE: '德股',
  DK: '丹麥股',
  ES: '西班牙股',
  FI: '芬蘭股',
  FR: '法股',
  GB: '英股',
  IT: '義股',
  NL: '荷股',
  NO: '挪威股',
  PT: '葡股',
  SE: '瑞典股'
};

const inferMarketFromCurrency = (rawCurrency) => {
  const normalizedCurrency = String(rawCurrency || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  return CURRENCY_MARKET_HINTS[normalizedCurrency] || '';
};

const inferMarketFromIsin = (rawIsin) => {
  const normalizedIsin = String(rawIsin || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');

  if (normalizedIsin.length < 2) {
    return '';
  }

  return ISIN_MARKET_HINTS[normalizedIsin.slice(0, 2)] || '';
};

const normalizeBrokerSymbolForMarket = (rawSymbol, market) => {
  const normalizedSymbol = String(rawSymbol || '').trim().toUpperCase();
  if (!normalizedSymbol || normalizedSymbol.includes('.') || normalizedSymbol.includes('=')) {
    return normalizedSymbol;
  }

  if ((market === '台股' || market === '港股' || market === '日股') && /^\d{1,4}$/.test(normalizedSymbol)) {
    return normalizedSymbol.padStart(4, '0');
  }

  if (market === '陸股' && /^\d{1,6}$/.test(normalizedSymbol)) {
    return normalizedSymbol.padStart(6, '0');
  }

  return normalizedSymbol;
};

const prepareBrokerRow = (rawRow, options = {}) => {
  const explicitMarket = resolveCanonicalMarket(rawRow['市場']);
  const fallbackMarket = typeof options.resolveMarket === 'function'
    ? options.resolveMarket(rawRow, explicitMarket)
    : options.defaultMarket || '';
  const market = explicitMarket || fallbackMarket || '';

  return {
    ...rawRow,
    代號: normalizeBrokerSymbolForMarket(rawRow['代號'], market),
    市場: market
  };
};

const resolveCrossMarketBroker = (sourceRow, explicitMarket) => {
  const normalizedSymbol = String(sourceRow['代號'] || '').trim().toUpperCase();
  const inferredFromSymbol = inferSymbolMarket(normalizedSymbol);
  const looksLikeBareTicker = /^[A-Z][A-Z0-9-]*$/.test(normalizedSymbol)
    && !normalizedSymbol.includes('.')
    && !normalizedSymbol.includes('=');

  if (explicitMarket) {
    return explicitMarket;
  }

  return (
    inferMarketFromIsin(sourceRow['ISIN'])
    || inferMarketFromCurrency(sourceRow['幣別'])
    || (looksLikeBareTicker && inferredFromSymbol === '美股' ? '' : inferredFromSymbol)
    || ''
  );
};

const getNormalizedTradeTypeOrEmpty = (rawValue) => {
  const normalizedType = normalizeTradeType(rawValue);
  return ['買入', '賣出', '拆股', '反向拆股'].includes(normalizedType)
    ? normalizedType
    : '';
};

const formatParsedNumber = (value, maxFractionDigits = 8) => {
  if (!Number.isFinite(value)) {
    return '';
  }

  const fixed = value.toFixed(maxFractionDigits);
  return fixed.replace(/\.?0+$/, '');
};

const normalizeNumericCell = (rawValue, preferredDecimalSeparator = '.') => {
  let value = String(rawValue || '').trim();
  if (!value) {
    return '';
  }

  const isNegativeByParentheses = /^\(.*\)$/.test(value);
  value = value.replace(/[()\s\u00A0\u202F]/g, '');
  value = value.replace(/[^\d,.-]/g, '');

  if (!value) {
    return '';
  }

  const commaCount = (value.match(/,/g) || []).length;
  const dotCount = (value.match(/\./g) || []).length;

  if (commaCount > 0 && dotCount > 0) {
    const lastCommaIndex = value.lastIndexOf(',');
    const lastDotIndex = value.lastIndexOf('.');
    const decimalSeparator = lastCommaIndex > lastDotIndex ? ',' : '.';

    value = decimalSeparator === ','
      ? value.replace(/\./g, '').replace(',', '.')
      : value.replace(/,/g, '');
  } else if (commaCount > 0) {
    const decimalDigits = value.length - value.lastIndexOf(',') - 1;
    const looksLikeGrouping = /^\d{1,3}(,\d{3})+$/.test(value);

    if (looksLikeGrouping) {
      value = value.replace(/,/g, '');
    } else if (preferredDecimalSeparator === ',' || decimalDigits <= 2) {
      value = value.replace(',', '.');
    } else {
      value = value.replace(/,/g, '');
    }
  } else if (dotCount > 0 && preferredDecimalSeparator === ',') {
    const looksLikeGrouping = /^\d{1,3}(\.\d{3})+$/.test(value);
    if (looksLikeGrouping) {
      value = value.replace(/\./g, '');
    }
  }

  const numericValue = Number.parseFloat(value);
  if (!Number.isFinite(numericValue)) {
    return '';
  }

  const signedValue = isNegativeByParentheses ? -Math.abs(numericValue) : numericValue;
  return formatParsedNumber(signedValue);
};

const parseNumericCellValue = (rawValue, preferredDecimalSeparator = '.') => {
  const normalizedValue = normalizeNumericCell(rawValue, preferredDecimalSeparator);
  const numericValue = Number.parseFloat(normalizedValue);
  return Number.isFinite(numericValue)
    ? numericValue
    : null;
};

const formatAbsoluteNumber = (value) => (
  Number.isFinite(value)
    ? formatParsedNumber(Math.abs(value))
    : ''
);

const normalizeCorporateActionFactor = (factor) => (
  Number.isFinite(factor)
  && factor > 0
  && Math.abs(factor - 1) > 1e-9
    ? factor
    : null
);

const extractSplitFactorFromText = (rawValue) => {
  const normalizedText = String(rawValue || '')
    .replace(/[－–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalizedText) {
    return null;
  }

  const ratioPatterns = [
    /(\d+(?:\.\d+)?)\s*(?:for|:|\/|to)\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*-\s*for\s*-\s*(\d+(?:\.\d+)?)/i
  ];

  for (const pattern of ratioPatterns) {
    const match = normalizedText.match(pattern);
    if (!match) {
      continue;
    }

    const numerator = Number.parseFloat(match[1]);
    const denominator = Number.parseFloat(match[2]);
    if (Number.isFinite(numerator) && Number.isFinite(denominator) && denominator > 0) {
      return normalizeCorporateActionFactor(numerator / denominator);
    }
  }

  return null;
};

const resolveTradeType = ({
  rawType,
  description,
  quantityValue,
  amountDirectionValue
}) => {
  const normalizedType = getNormalizedTradeTypeOrEmpty(rawType);
  if (normalizedType) {
    return normalizedType;
  }

  const normalizedDescriptionType = getNormalizedTradeTypeOrEmpty(description);
  if (normalizedDescriptionType) {
    return normalizedDescriptionType;
  }

  if (Number.isFinite(amountDirectionValue) && amountDirectionValue !== 0) {
    return amountDirectionValue < 0 ? '買入' : '賣出';
  }

  if (Number.isFinite(quantityValue) && quantityValue !== 0) {
    return quantityValue < 0 ? '賣出' : '買入';
  }

  return '';
};

const buildNormalizedTradeRow = ({
  rawRow,
  type,
  quantityValue,
  priceValue,
  amountValue,
  pnlValue
}) => ({
  日期: String(rawRow['日期'] || '').trim(),
  類型: type,
  原始類型: String(rawRow['類型'] || '').trim(),
  代號: String(rawRow['代號'] || '').trim(),
  市場: String(rawRow['市場'] || '').trim(),
  數量: formatAbsoluteNumber(quantityValue),
  單價: Number.isFinite(priceValue) ? formatParsedNumber(priceValue) : '',
  總金額: formatAbsoluteNumber(amountValue),
  損益: Number.isFinite(pnlValue) ? formatParsedNumber(pnlValue) : '',
  說明: String(rawRow['說明'] || '').trim()
});

const normalizeBrokerTransactionRow = (rawRow, preferredDecimalSeparator, options = {}) => {
  const quantityValue = parseNumericCellValue(rawRow['數量'], preferredDecimalSeparator);
  const priceValue = parseNumericCellValue(rawRow['單價'], preferredDecimalSeparator);
  const amountDirectionValue = parseNumericCellValue(rawRow['總金額'], preferredDecimalSeparator);
  const basisValue = parseNumericCellValue(rawRow['成本基礎'], preferredDecimalSeparator);
  const feeValue = parseNumericCellValue(rawRow['手續費'], preferredDecimalSeparator);
  const rawPnlValue = parseNumericCellValue(rawRow['損益'], preferredDecimalSeparator);
  const type = resolveTradeType({
    rawType: rawRow['類型'],
    description: rawRow['說明'],
    quantityValue,
    amountDirectionValue
  });

  if (!type || !Number.isFinite(quantityValue) || quantityValue === 0) {
    return buildNormalizedTradeRow({
      rawRow,
      type,
      quantityValue,
      priceValue,
      amountValue: amountDirectionValue,
      pnlValue: rawPnlValue
    });
  }

  let amountValue = Number.isFinite(amountDirectionValue)
    ? Math.abs(amountDirectionValue)
    : null;

  let amountFromBasis = false;
  if (type === '買入' && options.preferBasisForBuys && Number.isFinite(basisValue) && basisValue > 0) {
    amountValue = Math.abs(basisValue);
    amountFromBasis = true;
  }

  if (!Number.isFinite(amountValue) && Number.isFinite(priceValue)) {
    amountValue = Math.abs(quantityValue * priceValue);
  }

  if (
    type === '買入'
    && options.includeFeesInBuyCost
    && !amountFromBasis
    && Number.isFinite(amountValue)
    && Number.isFinite(feeValue)
    && feeValue !== 0
  ) {
    amountValue += Math.abs(feeValue);
  }

  let pnlValue = rawPnlValue;
  if (
    type === '賣出'
    && !Number.isFinite(pnlValue)
    && Number.isFinite(amountDirectionValue)
    && Number.isFinite(basisValue)
  ) {
    pnlValue = amountDirectionValue - basisValue + (Number.isFinite(feeValue) ? feeValue : 0);
  }

  return buildNormalizedTradeRow({
    rawRow,
    type,
    quantityValue,
    priceValue,
    amountValue,
    pnlValue
  });
};

const normalizeParsedRow = (rawRow, preferredDecimalSeparator) => {
  const normalizedRow = {
    日期: String(rawRow['日期'] || '').trim(),
    類型: normalizeTradeType(rawRow['類型']),
    原始類型: String(rawRow['類型'] || '').trim(),
    代號: String(rawRow['代號'] || '').trim(),
    市場: String(rawRow['市場'] || '').trim(),
    數量: normalizeNumericCell(rawRow['數量'], preferredDecimalSeparator),
    單價: normalizeNumericCell(rawRow['單價'], preferredDecimalSeparator),
    總金額: normalizeNumericCell(rawRow['總金額'], preferredDecimalSeparator),
    損益: normalizeNumericCell(rawRow['損益'], preferredDecimalSeparator),
    說明: String(rawRow['說明'] || '').trim()
  };

  const quantityValue = Number.parseFloat(normalizedRow['數量']);
  const priceValue = Number.parseFloat(normalizedRow['單價']);
  const amountValue = Number.parseFloat(normalizedRow['總金額']);

  if (Number.isFinite(quantityValue) && quantityValue !== 0) {
    if (!normalizedRow['單價'] && Number.isFinite(amountValue)) {
      normalizedRow['單價'] = formatParsedNumber(amountValue / quantityValue);
    }

    if (!normalizedRow['總金額'] && Number.isFinite(priceValue)) {
      normalizedRow['總金額'] = formatParsedNumber(quantityValue * priceValue);
    }
  }

  return normalizedRow;
};

const resolveSnapshotDate = (rawDateValue) => {
  const trimmedDate = String(rawDateValue || '').trim();
  if (trimmedDate) {
    return trimmedDate;
  }

  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

const normalizePositionRow = (rawRow, preferredDecimalSeparator) => {
  const quantity = normalizeNumericCell(rawRow['數量'], preferredDecimalSeparator);
  const currentPrice = normalizeNumericCell(rawRow['單價'], preferredDecimalSeparator);
  const costPerShare = normalizeNumericCell(rawRow['每股成本'], preferredDecimalSeparator);
  const costBasis = normalizeNumericCell(rawRow['成本基礎'], preferredDecimalSeparator);
  const marketValue = normalizeNumericCell(rawRow['市值'], preferredDecimalSeparator);
  const positionType = normalizeHeaderLabel(rawRow['持倉類型']);

  if (positionType.includes('short')) {
    return null;
  }

  const quantityValue = Number.parseFloat(quantity);
  if (!Number.isFinite(quantityValue) || quantityValue <= 0) {
    return null;
  }

  const totalCostValue = Number.parseFloat(costBasis)
    || (Number.parseFloat(costPerShare) * quantityValue)
    || Number.parseFloat(marketValue)
    || (Number.parseFloat(currentPrice) * quantityValue);

  if (!Number.isFinite(totalCostValue) || totalCostValue <= 0) {
    return null;
  }

  const unitCost = Number.parseFloat(costPerShare) > 0
    ? Number.parseFloat(costPerShare)
    : totalCostValue / quantityValue;

  return {
    日期: resolveSnapshotDate(rawRow['開倉日'] || rawRow['日期']),
    類型: '買入',
    代號: String(rawRow['代號'] || '').trim(),
    市場: String(rawRow['市場'] || '').trim(),
    數量: formatParsedNumber(quantityValue),
    單價: formatParsedNumber(unitCost),
    總金額: formatParsedNumber(totalCostValue),
    損益: ''
  };
};

const normalizeEuropeanBrokerTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: resolveCrossMarketBroker
  }),
  preferredDecimalSeparator
);

const normalizeTrading212TransactionRow = (rawRow, preferredDecimalSeparator) => normalizeEuropeanBrokerTransactionRow(
  rawRow,
  preferredDecimalSeparator
);

const normalizeFreetradeTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeEuropeanBrokerTransactionRow(
  rawRow,
  preferredDecimalSeparator
);

const normalizeScalableTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeEuropeanBrokerTransactionRow(
  rawRow,
  preferredDecimalSeparator
);

const normalizeSaxoTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeEuropeanBrokerTransactionRow(
  rawRow,
  preferredDecimalSeparator
);

const normalizeIbkrTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  rawRow,
  preferredDecimalSeparator,
  {
    preferBasisForBuys: true,
    includeFeesInBuyCost: true
  }
);

const normalizeFirstradeTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  rawRow,
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeRobinhoodTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  rawRow,
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeRakutenTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => explicitMarket || inferSymbolMarket(sourceRow['代號'])
  }),
  preferredDecimalSeparator
);

const normalizeSbiTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => explicitMarket || inferSymbolMarket(sourceRow['代號'])
  }),
  preferredDecimalSeparator
);

const normalizeSinopacTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    defaultMarket: '台股'
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeFubonTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    defaultMarket: '台股'
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeFutuTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => {
      if (explicitMarket) {
        return explicitMarket;
      }

      const symbol = String(sourceRow['代號'] || '').trim().toUpperCase();
      if (/^\d{6}$/.test(symbol) && (symbol.startsWith('6') || symbol.startsWith('0'))) {
        return '陸股';
      }

      if (/^\d{1,5}$/.test(symbol)) {
        return '港股';
      }

      if (/^[A-Z][A-Z0-9-]*$/.test(symbol)) {
        return '美股';
      }

      return '';
    }
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeMonexTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => explicitMarket || inferSymbolMarket(sourceRow['代號'])
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeYuantaTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    defaultMarket: '台股'
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeKgiTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    defaultMarket: '台股'
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizePresidentTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    defaultMarket: '台股'
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeMatsuiTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => explicitMarket || inferSymbolMarket(sourceRow['代號'])
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeFidelityTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => (
      explicitMarket
      || inferMarketFromCurrency(sourceRow['幣別'])
      || inferSymbolMarket(sourceRow['代號'])
    )
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeWebullTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => (
      explicitMarket
      || inferMarketFromCurrency(sourceRow['幣別'])
      || inferSymbolMarket(sourceRow['代號'])
    )
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeWealthsimpleActivityRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => (
      explicitMarket
      || inferMarketFromCurrency(sourceRow['幣別'])
      || inferSymbolMarket(sourceRow['代號'])
    )
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeWealthsimpleHoldingRow = (rawRow, preferredDecimalSeparator) => normalizePositionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => (
      explicitMarket
      || inferMarketFromCurrency(sourceRow['幣別'])
      || inferSymbolMarket(sourceRow['代號'])
    )
  }),
  preferredDecimalSeparator
);

const normalizeQuestradeTransactionRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => (
      explicitMarket
      || inferMarketFromCurrency(sourceRow['幣別'])
      || inferSymbolMarket(sourceRow['代號'])
    )
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeHongKongStatementRow = (rawRow, preferredDecimalSeparator) => normalizeBrokerTransactionRow(
  prepareBrokerRow(rawRow, {
    resolveMarket: (sourceRow, explicitMarket) => (
      explicitMarket
      || inferMarketFromCurrency(sourceRow['幣別'])
      || inferSymbolMarket(sourceRow['代號'])
      || '港股'
    )
  }),
  preferredDecimalSeparator,
  {
    includeFeesInBuyCost: true
  }
);

const normalizeRowForProfile = (rawRow, profile, preferredDecimalSeparator) => {
  switch (profile?.id) {
    case 'broker-euro':
      return normalizeEuropeanBrokerTransactionRow(rawRow, preferredDecimalSeparator);
    case 'trading212-transactions':
      return normalizeTrading212TransactionRow(rawRow, preferredDecimalSeparator);
    case 'freetrade-transactions':
      return normalizeFreetradeTransactionRow(rawRow, preferredDecimalSeparator);
    case 'scalable-transactions':
      return normalizeScalableTransactionRow(rawRow, preferredDecimalSeparator);
    case 'saxo-transactions':
      return normalizeSaxoTransactionRow(rawRow, preferredDecimalSeparator);
    case 'ibkr-transactions':
      return normalizeIbkrTransactionRow(rawRow, preferredDecimalSeparator);
    case 'firstrade-transactions':
      return normalizeFirstradeTransactionRow(rawRow, preferredDecimalSeparator);
    case 'robinhood-transactions':
      return normalizeRobinhoodTransactionRow(rawRow, preferredDecimalSeparator);
    case 'rakuten-transactions':
      return normalizeRakutenTransactionRow(rawRow, preferredDecimalSeparator);
    case 'sbi-transactions':
      return normalizeSbiTransactionRow(rawRow, preferredDecimalSeparator);
    case 'sinopac-tw-transactions':
      return normalizeSinopacTransactionRow(rawRow, preferredDecimalSeparator);
    case 'fubon-tw-transactions':
      return normalizeFubonTransactionRow(rawRow, preferredDecimalSeparator);
    case 'futu-transactions':
      return normalizeFutuTransactionRow(rawRow, preferredDecimalSeparator);
    case 'monex-transactions':
      return normalizeMonexTransactionRow(rawRow, preferredDecimalSeparator);
    case 'yuanta-tw-transactions':
      return normalizeYuantaTransactionRow(rawRow, preferredDecimalSeparator);
    case 'kgi-tw-transactions':
      return normalizeKgiTransactionRow(rawRow, preferredDecimalSeparator);
    case 'president-tw-transactions':
      return normalizePresidentTransactionRow(rawRow, preferredDecimalSeparator);
    case 'matsui-transactions':
      return normalizeMatsuiTransactionRow(rawRow, preferredDecimalSeparator);
    case 'fidelity-transactions':
      return normalizeFidelityTransactionRow(rawRow, preferredDecimalSeparator);
    case 'webull-transactions':
      return normalizeWebullTransactionRow(rawRow, preferredDecimalSeparator);
    case 'wealthsimple-activities':
      return normalizeWealthsimpleActivityRow(rawRow, preferredDecimalSeparator);
    case 'wealthsimple-holdings':
      return normalizeWealthsimpleHoldingRow(rawRow, preferredDecimalSeparator);
    case 'questrade-transactions':
      return normalizeQuestradeTransactionRow(rawRow, preferredDecimalSeparator);
    case 'hk-statement-transactions':
      return normalizeHongKongStatementRow(rawRow, preferredDecimalSeparator);
    default:
      return profile?.importKind === 'positions'
        ? normalizePositionRow(rawRow, preferredDecimalSeparator)
        : normalizeParsedRow(rawRow, preferredDecimalSeparator);
  }
};

const isImportableTradeRow = (row) => {
  const quantityValue = Number.parseFloat(row['數量']);
  const priceValue = Number.parseFloat(row['單價']);
  const amountValue = Number.parseFloat(row['總金額']);
  const explicitSplitFactor = normalizeCorporateActionFactor(Number.parseFloat(String(row['拆股比例'] || '')));
  const splitFactor = explicitSplitFactor || extractSplitFactorFromText(`${row['原始類型'] || ''} ${row['說明'] || ''}`);
  const isCorporateAction = row['類型'] === '拆股' || row['類型'] === '反向拆股';

  if (isCorporateAction) {
    return (
      Boolean(row['日期'])
      && Boolean(row['代號'])
      && (
        (Number.isFinite(quantityValue) && quantityValue > 0)
        || (Number.isFinite(splitFactor) && splitFactor > 0 && splitFactor !== 1)
      )
    );
  }

  return (
    Boolean(row['日期'])
    && (row['類型'] === '買入' || row['類型'] === '賣出')
    && Boolean(row['代號'])
    && Number.isFinite(quantityValue)
    && quantityValue > 0
    && (
      (Number.isFinite(priceValue) && priceValue > 0)
      || (Number.isFinite(amountValue) && amountValue > 0)
    )
  );
};

const OPTION_OCC_SYMBOL_REGEX = /^[A-Z]{1,6}\d{6}[CP]\d{8}$/i;
const OPTION_LOCALIZED_KEYWORD_REGEX = /(選擇權|期權|期货期權|股票期權|股票期权|옵션|오플션|オプション|خيارات|옵ція)/i;
const OPTION_KEYWORD_REGEX = /\b(call option|put option|equity option|stock option|mini option|covered call|listed option|index option)\b/i;
const OPTION_GENERIC_KEYWORD_REGEX = /\boption(?:s)?\b/i;
const OPTION_SIDE_REGEX = /\b(call|put)\b/i;
const OPTION_EXPIRY_REGEX = /\b(\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2}|jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/i;
const OPTION_STRIKE_REGEX = /\b([CP]\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[CP])\b/i;

const isLikelyOptionRow = (rawRow, normalizedRow) => {
  const symbol = String(normalizedRow?.['代號'] || rawRow?.['代號'] || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '');
  const description = String(rawRow?.['說明'] || '')
    .trim()
    .replace(/\s+/g, ' ');
  const combinedText = `${symbol} ${description}`.trim();

  if (!combinedText) {
    return false;
  }

  if (OPTION_OCC_SYMBOL_REGEX.test(symbol)) {
    return true;
  }

  if (OPTION_LOCALIZED_KEYWORD_REGEX.test(combinedText) || OPTION_KEYWORD_REGEX.test(combinedText)) {
    return true;
  }

  if (OPTION_GENERIC_KEYWORD_REGEX.test(combinedText) && (OPTION_EXPIRY_REGEX.test(combinedText) || OPTION_STRIKE_REGEX.test(combinedText))) {
    return true;
  }

  return OPTION_SIDE_REGEX.test(combinedText)
    && OPTION_EXPIRY_REGEX.test(combinedText)
    && OPTION_STRIKE_REGEX.test(combinedText);
};

const getSkippedRowReasonCode = (rawRow, normalizedRow, isOptionRow) => {
  if (isOptionRow) {
    return 'derivative';
  }

  if (!normalizedRow) {
    return 'unsupportedRow';
  }

  if (!normalizedRow['日期'] || !normalizedRow['代號'] || !normalizedRow['類型']) {
    return 'missingTradeFields';
  }

  const quantityValue = Number.parseFloat(normalizedRow['數量']);
  if (!Number.isFinite(quantityValue) || quantityValue <= 0) {
    return 'invalidQuantity';
  }

  const priceValue = Number.parseFloat(normalizedRow['單價']);
  const amountValue = Number.parseFloat(normalizedRow['總金額']);
  if (
    (!Number.isFinite(priceValue) || priceValue <= 0)
    && (!Number.isFinite(amountValue) || amountValue <= 0)
  ) {
    return 'invalidAmount';
  }

  return 'unsupportedRow';
};

const buildSkippedRowPreview = ({ rawRow, normalizedRow, rowNumber, reasonCode }) => ({
  rowNumber,
  reasonCode,
  date: String(normalizedRow?.['日期'] || rawRow?.['日期'] || '').trim(),
  type: String(normalizedRow?.['類型'] || rawRow?.['類型'] || '').trim(),
  symbol: String(normalizedRow?.['代號'] || rawRow?.['代號'] || '').trim(),
  market: String(normalizedRow?.['市場'] || rawRow?.['市場'] || '').trim(),
  description: String(rawRow?.['說明'] || '').trim()
});

const normalizeCorporateActionDescriptor = (rawValue) => String(rawValue || '')
  .toUpperCase()
  .replace(/XXX.*$/, '')
  .replace(/\b(?:REVERSE|STOCK)\s+SPLIT\b.*$/, '')
  .replace(/\bEFF:.*$/, '')
  .replace(/[^A-Z0-9]+/g, '');

const buildCorporateActionFactorLookup = (entries, preferredDecimalSeparator) => {
  const factorLookup = new Map();
  const corporateActionEntries = entries.filter(({ normalizedRow }) => (
    normalizedRow
    && (normalizedRow['類型'] === '拆股' || normalizedRow['類型'] === '反向拆股')
  ));

  corporateActionEntries.forEach((entry) => {
    const explicitTextFactor = extractSplitFactorFromText(
      `${entry.normalizedRow['原始類型'] || ''} ${entry.rawRow['說明'] || entry.normalizedRow['說明'] || ''}`
    );

    if (explicitTextFactor) {
      factorLookup.set(entry.rowNumber, formatParsedNumber(explicitTextFactor));
    }
  });

  corporateActionEntries.forEach((entry) => {
    if (factorLookup.has(entry.rowNumber)) {
      return;
    }

    const quantityValue = parseNumericCellValue(entry.normalizedRow['數量'], preferredDecimalSeparator);
    if (!Number.isFinite(quantityValue) || quantityValue <= 0) {
      return;
    }

    const entryDescriptor = normalizeCorporateActionDescriptor(entry.rawRow['說明'] || entry.normalizedRow['說明'] || '');

    const pairedNegativeEntry = corporateActionEntries.reduce((bestMatch, candidate) => {
      if (
        candidate.rowNumber === entry.rowNumber
        || candidate.normalizedRow['類型'] !== entry.normalizedRow['類型']
        || candidate.normalizedRow['日期'] !== entry.normalizedRow['日期']
      ) {
        return bestMatch;
      }

      const candidateQuantity = parseNumericCellValue(candidate.normalizedRow['數量'], preferredDecimalSeparator);
      if (!Number.isFinite(candidateQuantity) || candidateQuantity >= 0) {
        return bestMatch;
      }

      const candidateDescriptor = normalizeCorporateActionDescriptor(
        candidate.rawRow['說明'] || candidate.normalizedRow['說明'] || ''
      );
      if (!entryDescriptor || !candidateDescriptor) {
        return bestMatch;
      }

      const descriptorsRelated = entryDescriptor.startsWith(candidateDescriptor)
        || candidateDescriptor.startsWith(entryDescriptor);

      if (!descriptorsRelated) {
        return bestMatch;
      }

      const matchScore = (
        Math.min(entryDescriptor.length, candidateDescriptor.length)
        + (/^\d+$/.test(String(candidate.normalizedRow['代號'] || '').trim()) ? 4 : 0)
      );

      if (!bestMatch || matchScore > bestMatch.matchScore) {
        return {
          candidate,
          matchScore
        };
      }

      return bestMatch;
    }, null);

    if (!pairedNegativeEntry) {
      return;
    }

    const pairedQuantity = Math.abs(parseNumericCellValue(
      pairedNegativeEntry.candidate.normalizedRow['數量'],
      preferredDecimalSeparator
    ));
    const inferredFactor = normalizeCorporateActionFactor(quantityValue / pairedQuantity);

    if (inferredFactor) {
      factorLookup.set(entry.rowNumber, formatParsedNumber(inferredFactor));
    }
  });

  return factorLookup;
};

export const parseCSVWithMeta = (text, options = {}) => {
  const normalizedText = String(text || '').replace(/\r\n?/g, '\n');
  const lines = normalizedText.split('\n').filter((line) => line.trim() !== '');

  if (lines.length === 0) {
    return {
      rows: [],
      meta: {
        ok: false,
        errorCode: 'empty',
        importedRowCount: 0,
        skippedRowCount: 0,
        missingRequiredFields: REQUIRED_STANDARD_FIELDS
      }
    };
  }

  const layout = detectLayout(lines, options.profileId || 'auto');
  const inspection = layout?.inspection || inspectHeaderRow(splitDelimitedLine(lines[0] || '', ','), options.profileId || 'auto');
  const rawHeaderCount = layout?.rawHeaders?.length || 0;
  const importKind = inspection.profile?.importKind || 'trades';
  const missingRequiredFields = (inspection.requiredFields || REQUIRED_STANDARD_FIELDS)
    .filter((field) => inspection.headerMap?.[field] === undefined);

  if (missingRequiredFields.length > 0) {
    return {
      rows: [],
      meta: {
        ok: false,
        errorCode: 'missingRequiredHeaders',
        importedRowCount: 0,
        skippedRowCount: 0,
        delimiter: layout?.delimiter || ',',
        delimiterLabel: layout?.delimiterLabel || DELIMITER_LABELS[','],
        headerRowIndex: layout?.headerIndex ?? 0,
        profileId: inspection.profile?.id || 'generic',
        profileLabel: inspection.profileLabel || 'Generic CSV',
        profileLabelKey: inspection.profileLabelKey || '',
        importKind,
        matchedFields: inspection.matchedFields || [],
        missingRequiredFields
      }
    };
  }

  const delimiter = layout?.delimiter || ',';
  const preferredDecimalSeparator = inspection.profile?.preferredDecimalSeparator || '.';
  const result = [];
  let skippedRowCount = 0;
  let derivativeSkippedRowCount = 0;
  const skippedPreviewRows = [];
  const problematicRowNumbers = [];
  const parsedEntries = [];

  for (let index = (layout?.headerIndex ?? 0) + 1; index < lines.length; index += 1) {
    const cells = splitDelimitedLine(lines[index], delimiter);
    while (cells.length > rawHeaderCount && cells[cells.length - 1] === '') {
      cells.pop();
    }

    if (rawHeaderCount > 0 && cells.length > rawHeaderCount) {
      problematicRowNumbers.push(index + 1);
      continue;
    }

    const rawRow = {};

    Object.keys(STANDARD_HEADER_ALIASES).forEach((field) => {
      const fieldIndex = inspection.headerMap[field];
      rawRow[field] = fieldIndex !== undefined ? cells[fieldIndex] || '' : '';
    });

    const normalizedRow = normalizeRowForProfile(rawRow, inspection.profile, preferredDecimalSeparator);
    const isOptionRow = isLikelyOptionRow(rawRow, normalizedRow);
    parsedEntries.push({
      rawRow,
      normalizedRow,
      isOptionRow,
      rowNumber: index + 1
    });
  }

  const corporateActionFactorLookup = buildCorporateActionFactorLookup(parsedEntries, preferredDecimalSeparator);

  parsedEntries.forEach(({ rawRow, normalizedRow, isOptionRow, rowNumber }) => {
    const inferredSplitFactor = corporateActionFactorLookup.get(rowNumber);
    const normalizedRowWithFactor = inferredSplitFactor && normalizedRow
      ? {
        ...normalizedRow,
        拆股比例: inferredSplitFactor
      }
      : normalizedRow;

    if (normalizedRowWithFactor && isImportableTradeRow(normalizedRowWithFactor) && !isOptionRow) {
      result.push(normalizedRowWithFactor);
      return;
    }

    skippedRowCount += 1;
    if (isOptionRow) {
      derivativeSkippedRowCount += 1;
    }

    if (skippedPreviewRows.length < MAX_SKIPPED_PREVIEW_ROWS) {
      skippedPreviewRows.push(buildSkippedRowPreview({
        rawRow,
        normalizedRow: normalizedRowWithFactor,
        rowNumber,
        reasonCode: getSkippedRowReasonCode(rawRow, normalizedRowWithFactor, isOptionRow)
      }));
    }
  });

  if (problematicRowNumbers.length > 0) {
    return {
      rows: [],
      meta: {
        ok: false,
        errorCode: 'rowWidthMismatch',
        importedRowCount: 0,
        skippedRowCount,
        delimiter,
        delimiterLabel: layout?.delimiterLabel || DELIMITER_LABELS[delimiter],
        headerRowIndex: layout?.headerIndex ?? 0,
        profileId: inspection.profile?.id || 'generic',
        profileLabel: inspection.profileLabel || 'Generic CSV',
        profileLabelKey: inspection.profileLabelKey || '',
        importKind,
        matchedFields: inspection.matchedFields || [],
        missingRequiredFields: [],
        derivativeSkippedRowCount,
        skippedPreviewRows,
        problematicRowNumbers
      }
    };
  }

  if (result.length === 0) {
    return {
      rows: [],
      meta: {
        ok: false,
        errorCode: 'noImportableRows',
        importedRowCount: 0,
        skippedRowCount,
        delimiter,
        delimiterLabel: layout?.delimiterLabel || DELIMITER_LABELS[delimiter],
        headerRowIndex: layout?.headerIndex ?? 0,
        profileId: inspection.profile?.id || 'generic',
        profileLabel: inspection.profileLabel || 'Generic CSV',
        profileLabelKey: inspection.profileLabelKey || '',
        importKind,
        matchedFields: inspection.matchedFields || [],
        missingRequiredFields: [],
        derivativeSkippedRowCount,
        skippedPreviewRows
      }
    };
  }

  return {
    rows: result,
    meta: {
      ok: true,
      importedRowCount: result.length,
      skippedRowCount,
      delimiter,
      delimiterLabel: layout?.delimiterLabel || DELIMITER_LABELS[delimiter],
      headerRowIndex: layout?.headerIndex ?? 0,
      profileId: inspection.profile?.id || 'generic',
      profileLabel: inspection.profileLabel || 'Generic CSV',
      profileLabelKey: inspection.profileLabelKey || '',
      importKind,
      matchedFields: inspection.matchedFields || [],
      missingRequiredFields: [],
      derivativeSkippedRowCount,
      skippedPreviewRows
    }
  };
};

export const parseCSV = (text, options = {}) => parseCSVWithMeta(text, options).rows;
