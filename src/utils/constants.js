// 股票資料對應表 (當 API 抓不到名稱或價格時的備援)
export const STOCK_MAPPING = {
  "002245.SZ": { name: "江蘇蔚藍鋰芯", price: 17.83 },
  "603186.SS": { name: "華正新材", price: 70.80 },
  "002230.SZ": { name: "科大訊飛", price: 53.70 },
  "002074.SZ": { name: "國軒高科", price: 38.06 },
  "000962.SZ": { name: "東方鉭業", price: 55.63 },
  "000090.SZ": { name: "天健集團", price: 3.92 },
  "000166.SZ": { name: "申萬宏源", price: 4.88 },
  "000630.SZ": { name: "銅陵有色", price: 7.32 },
  "000670.SZ": { name: "盈方微電子", price: 8.22 },
  "000725.SZ": { name: "京東方", price: 4.35 },
  "000816.SZ": { name: "智慧農業", price: 3.77 },
  "000878.SZ": { name: "雲南銅業", price: 23.36 },
  "002251.SZ": { name: "步步高", price: 4.61 },
  "002456.SZ": { name: "歐菲光集團", price: 9.59 },
  "002475.SZ": { name: "立訊精密", price: 49.39 },
  "002594.SZ": { name: "比亞迪", price: 96.60 },
  "600006.SS": { name: "東風汽車", price: 6.88 },
  "600028.SS": { name: "中國石化", price: 6.56 },
  "600198.SS": { name: "大唐電信", price: 9.23 },
  "600221.SS": { name: "海南航空", price: 1.55 },
  "600301.SS": { name: "廣西華錫", price: 64.20 },
  "600808.SS": { name: "馬鞍山鋼鐵", price: 4.22 },
  "601988.SS": { name: "中國銀行", price: 5.33 },
  "AAPL": { name: "Apple Inc.", price: 180.00 },
  "2330.TW": { name: "台積電", price: 800.00 },
  "0700.HK": { name: "騰訊控股", price: 300.00 }
};

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B'];

export const CURRENCY_SYMBOLS = {
  USD: '$',
  TWD: 'NT$',
  HKD: 'HK$',
  CNY: '¥',
  JPY: '¥'
};

export const DEFAULT_CSV = `日期,類型,代號,市場,數量,單價,總金額,損益,獲利率/虧損率,投資天數
5/28/2025,賣出,002594,陸股,100,362.89,36289.00,+8596.00,31.04%,124
1/24/2025,買入,002594,陸股,100,276.93,27693.00,,
10/31/2025,買入,603186,陸股,200,48.24,9648.00,,
12/1/2025,買入,AAPL,美股,10,180.00,1800.00,,
12/2/2025,買入,2330,台股,1000,800.00,800000.00,,
12/3/2025,買入,0700,港股,100,300.00,30000.00,`;

export const DB_NAME = 'TrDashboardDB';
export const STORE_NAME = 'store';
export const DB_VERSION = 1;
