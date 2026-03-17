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

const buildVoicePatch = ({
  demoDescription,
  settingsRecords,
  realizedTitle,
  tableSubtitle,
  hedgeSuccess,
  soldTooEarly,
  body,
  privacy,
  apiKey
}) => ({
  header: {
    demoDescription,
    settingsRecords
  },
  charts: {
    realizedTitle
  },
  table: {
    subtitle: tableSubtitle,
    hedgeSuccess,
    soldTooEarly
  },
  notice: {
    body,
    privacy,
    apiKey
  }
});

const buildSplitCopyPatch = ({
  split,
  reverseSplit,
  splitQuantityChange,
  importReviewSkippedHelp
}) => ({
  tradeTypes: {
    split,
    reverseSplit
  },
  table: {
    splitQuantityChange
  },
  app: {
    importReviewSkippedHelp
  }
});

const assignPatch = (patches, locales, patch) => {
  locales.forEach((locale) => {
    patches[locale] = patch;
  });
};

const extendPatch = (patches, locales, patch) => {
  locales.forEach((locale) => {
    patches[locale] = patches[locale]
      ? mergeLocale(patches[locale], patch)
      : patch;
  });
};

const voicePatches = {};

assignPatch(voicePatches, ['zh-TW'], buildVoicePatch({
  demoDescription: "現在看到的是精簡版示範資料；把券商 CSV 匯進來，整包部位跟損益才會攤開來。",
  settingsRecords: "設定與交易紀錄",
  realizedTitle: "各股已實現損益（賣飛 / 漂亮下車榜）",
  tableSubtitle: "展開列可查看買進與賣出批次，金額一律保留該市場原幣，對帳時比較不會搞混。",
  hedgeSuccess: "這筆早點出場反而更划算（{{value}}）",
  soldTooEarly: "這筆太早下車，少賺 {{value}}",
  body: "Trade Lens 是個開源投資工具，專門把券商 CSV 整成比較好讀的成本走勢、損益視角，還有一眼看懂的持倉全貌。",
  privacy: "隱私先講在前面：資料全都只留在你的瀏覽器（IndexedDB），不會回傳到我們的伺服器。",
  apiKey: "yfapi.net 的 API Key 只拿來抓行情，而且一樣只存在本機。"
}));

assignPatch(voicePatches, ['yue-Hant-HK'], buildVoicePatch({
  demoDescription: "而家見到嘅係精簡示範資料；匯入券商 CSV 之後，成個倉位同損益先會現真身。",
  settingsRecords: "設定同交易紀錄",
  realizedTitle: "各股已實現損益（賣飛 / 靚位落袋榜）",
  tableSubtitle: "展開一行就可以睇買入同沽出 lot，金額會保留返各市場原幣，對數冇咁易亂。",
  hedgeSuccess: "呢筆早啲走反而著數（{{value}}）",
  soldTooEarly: "呢筆走得太早，少賺 {{value}}",
  body: "Trade Lens 係一個 open-source 投資工具，專門將券商 CSV 執到清清楚楚，變成成本走勢、損益視角，同一眼睇明嘅持倉全貌。",
  privacy: "隱私行先：所有資料都只留喺你個 browser（IndexedDB），唔會送返去我哋嘅 server。",
  apiKey: "yfapi.net 嘅 API Key 只係用嚟拎行情，而且一樣淨係留喺本機。"
}));

assignPatch(voicePatches, ['zh-CN', 'zh-SG'], buildVoicePatch({
  demoDescription: "现在看到的是精简版示例数据；把券商 CSV 导进来，整包仓位和盈亏才会摊开来。",
  settingsRecords: "设置与交易记录",
  realizedTitle: "个股已实现盈亏（卖飞 / 漂亮止盈榜）",
  tableSubtitle: "展开行就能看买入和卖出批次，金额都保留市场原币，对账时不容易串线。",
  hedgeSuccess: "这笔提早离场反而更划算（{{value}}）",
  soldTooEarly: "这笔卖早了，少赚 {{value}}",
  body: "Trade Lens 是一款开源投资工具，专门把券商 CSV 整理成更好读的成本走势、盈亏视角，以及一眼看清的持仓全貌。",
  privacy: "隐私先说在前：所有数据都只留在你的浏览器（IndexedDB），不会回传到我们的服务器。",
  apiKey: "yfapi.net 的 API Key 只用于拉取行情，而且同样只保存在本地。"
}));

assignPatch(voicePatches, ['en-US', 'en-CA', 'en-AU', 'en-GB', 'en-IE', 'en-NZ', 'en-SG', 'en-ZA'], buildVoicePatch({
  demoDescription: "You’re looking at the slimmed-down demo. Import your broker CSV and the real portfolio picture opens up.",
  settingsRecords: "Settings & Trades",
  realizedTitle: "Realized P&L by Symbol (Sold Too Soon / Nailed the Exit)",
  tableSubtitle: "Open a row to inspect the buy and sell lots. Values stay in each market’s native currency so reconciliation is less annoying.",
  hedgeSuccess: "On this trade, getting out earlier actually worked out better ({{value}})",
  soldTooEarly: "Got out too early and left {{value}} on the table",
  body: "Trade Lens is an open-source investing tool that turns messy broker CSVs into cost-basis trends, P&L views, and a portfolio snapshot you can actually read.",
  privacy: "Privacy first: everything stays in your browser (IndexedDB). Nothing is sent back to our servers.",
  apiKey: "Your yfapi.net API key is only used to fetch market data, and it stays local too."
}));

assignPatch(voicePatches, ['ja-JP'], buildVoicePatch({
  demoDescription: "今見えているのは軽量版のサンプルです。証券会社のCSVを取り込むと、ポートフォリオの全体像まできちんと見えてきます。",
  settingsRecords: "設定と取引履歴",
  realizedTitle: "銘柄別の実現損益（早売り / うまい利確ランキング）",
  tableSubtitle: "行を開くと買いと売りのロットを確認できます。金額は各市場の現地通貨のまま残すので、照合もしやすいです。",
  hedgeSuccess: "この取引は早めに手仕舞ったほうが結果的に得でした（{{value}}）",
  soldTooEarly: "この取引は売りが早く、{{value}} 取り逃がしました",
  body: "Trade Lens は、証券会社のCSVをコスト推移、損益の見え方、保有の全体像へ整理し直すためのオープンソース投資ツールです。",
  privacy: "プライバシー第一です。データはすべてブラウザ内（IndexedDB）にだけ保存され、サーバーへは送信しません。",
  apiKey: "yfapi.net の APIキーは相場データの取得にだけ使われ、これもローカルにしか保存されません。"
}));

assignPatch(voicePatches, ['ko-KR'], buildVoicePatch({
  demoDescription: "지금 보이는 건 가볍게 줄인 샘플 데이터입니다. 증권사 CSV를 가져오면 포트폴리오 실전 그림이 제대로 펼쳐집니다.",
  settingsRecords: "설정과 거래 기록",
  realizedTitle: "종목별 실현 손익 (너무 일찍 판 종목 / 잘 턴 종목)",
  tableSubtitle: "행을 펼치면 매수·매도 lot을 볼 수 있고, 금액은 각 시장의 현지 통화 그대로 남겨 둡니다.",
  hedgeSuccess: "이 건은 조금 일찍 정리한 쪽이 결과적으로 더 이득이었습니다 ({{value}})",
  soldTooEarly: "이 건은 너무 일찍 팔아서 {{value}}를 놓쳤습니다",
  body: "Trade Lens는 증권사 CSV를 비용 흐름, 손익 뷰, 그리고 한눈에 들어오는 보유 현황으로 정리해 주는 오픈소스 투자 도구입니다.",
  privacy: "프라이버시가 먼저입니다. 모든 데이터는 브라우저(IndexedDB)에만 남고 서버로 올라가지 않습니다.",
  apiKey: "yfapi.net API 키는 시세 데이터를 불러올 때만 쓰이며, 이것도 로컬에만 저장됩니다."
}));

assignPatch(voicePatches, ['id-ID'], buildVoicePatch({
  demoDescription: "Yang lagi kamu lihat itu data contoh versi ringkas. Begitu CSV broker diimpor, baru kelihatan bentuk portfolio yang sebenarnya.",
  settingsRecords: "Pengaturan & riwayat transaksi",
  realizedTitle: "P/L terealisasi per saham (jual kecepetan / exit-nya cakep)",
  tableSubtitle: "Buka satu baris untuk lihat lot beli dan jual. Nilai tetap ditampilkan dalam mata uang asli market-nya biar gampang dicocokkan.",
  hedgeSuccess: "Transaksi ini ternyata lebih untung kalau keluar lebih cepat ({{value}})",
  soldTooEarly: "Kejualan terlalu cepat, jadi kehilangan {{value}}",
  body: "Trade Lens adalah tool investasi open-source yang merapikan CSV broker jadi tren cost basis, tampilan P/L, dan ringkasan portfolio yang lebih enak dibaca.",
  privacy: "Privasi dulu: semua data tetap tinggal di browser kamu (IndexedDB), tidak diam-diam diunggah ke server.",
  apiKey: "API key yfapi.net cuma dipakai buat ambil data harga, dan tetap disimpan lokal juga."
}));

assignPatch(voicePatches, ['fr-FR', 'fr-BE', 'fr-CA', 'fr-CH'], buildVoicePatch({
  demoDescription: "Ce que vous voyez ici, c’est la démo allégée. Une fois le CSV du courtier importé, le portefeuille complet se dévoile vraiment.",
  settingsRecords: "Réglages et opérations",
  realizedTitle: "P&L réalisé par ligne (vente trop tôt / sortie bien sentie)",
  tableSubtitle: "Ouvrez une ligne pour revoir les lots d’achat et de vente. Les montants restent dans la devise du marché, donc le rapprochement est plus propre.",
  hedgeSuccess: "Sur cette ligne, sortir plus tôt s’est finalement révélé plus rentable ({{value}})",
  soldTooEarly: "Sortie trop tôt, {{value}} laissés sur la table",
  body: "Trade Lens est un outil d’investissement open source qui transforme les CSV du courtier en vues de coût d’acquisition, de P&L et en photo de portefeuille bien plus lisible.",
  privacy: "Côté vie privée, c’est simple : tout reste dans votre navigateur (IndexedDB). Rien n’est envoyé vers nos serveurs.",
  apiKey: "La clé API yfapi.net sert uniquement à récupérer les cours, et elle aussi reste stockée en local."
}));

assignPatch(voicePatches, ['de-DE', 'de-AT', 'de-CH'], buildVoicePatch({
  demoDescription: "Was du hier siehst, ist nur die abgespeckte Demo. Erst mit deinem Broker-CSV kommt das Depotbild vollständig rüber.",
  settingsRecords: "Einstellungen & Trades",
  realizedTitle: "Realisierter Gewinn/Verlust je Titel (zu früh verkauft / sauber raus)",
  tableSubtitle: "Klapp eine Zeile auf, um Kauf- und Verkaufslots zu prüfen. Die Beträge bleiben in der jeweiligen Markt-Währung, damit der Abgleich nicht schiefgeht.",
  hedgeSuccess: "Bei diesem Trade war der frühere Ausstieg im Nachhinein die bessere Entscheidung ({{value}})",
  soldTooEarly: "Hier warst du zu früh raus und hast {{value}} liegen lassen",
  body: "Trade Lens ist ein Open-Source-Investmenttool, das Broker-CSVs in Kostenverlauf, G/V-Perspektiven und eine deutlich klarere Depotübersicht verwandelt.",
  privacy: "Datenschutz zuerst: Alle Daten bleiben nur in deinem Browser (IndexedDB) und werden nicht an unsere Server geschickt.",
  apiKey: "Der yfapi.net-API-Key wird nur zum Abruf von Kursdaten genutzt und bleibt ebenfalls lokal gespeichert."
}));

assignPatch(voicePatches, ['it-IT', 'it-CH'], buildVoicePatch({
  demoDescription: "Quello che vedi ora è solo la demo alleggerita. Quando importi il CSV del broker, il quadro del portafoglio si apre davvero.",
  settingsRecords: "Impostazioni e operazioni",
  realizedTitle: "P/L realizzato per titolo (venduto troppo presto / uscita fatta bene)",
  tableSubtitle: "Apri una riga per controllare i lotti di acquisto e vendita. Gli importi restano nella valuta originale del mercato, così il confronto torna meglio.",
  hedgeSuccess: "Su questa operazione uscire prima si è rivelata la scelta migliore ({{value}})",
  soldTooEarly: "Hai venduto troppo presto e hai lasciato sul tavolo {{value}}",
  body: "Trade Lens è uno strumento open source per investire che trasforma i CSV del broker in andamento del costo, viste P/L e una fotografia del portafoglio molto più leggibile.",
  privacy: "Privacy prima di tutto: tutti i dati restano solo nel tuo browser (IndexedDB) e non vengono inviati ai nostri server.",
  apiKey: "La chiave API di yfapi.net serve solo per recuperare i prezzi di mercato e resta anch’essa salvata in locale."
}));

assignPatch(voicePatches, ['ms-MY'], buildVoicePatch({
  demoDescription: "Paparan sekarang cuma data contoh versi ringkas. Bila CSV broker diimport, barulah rupa portfolio sebenar nampak penuh.",
  settingsRecords: "Tetapan & rekod dagangan",
  realizedTitle: "Untung rugi direalisasi ikut kaunter (jual awal / keluar cun)",
  tableSubtitle: "Buka satu baris untuk semak lot beli dan jual. Nilai kekal dipapar dalam mata wang asal pasaran supaya senang semak balik.",
  hedgeSuccess: "Transaksi ini rupanya lebih berbaloi kalau keluar awal sikit ({{value}})",
  soldTooEarly: "Jual terlalu awal, terlepas {{value}}",
  body: "Trade Lens ialah alat pelaburan sumber terbuka yang kemaskan CSV broker menjadi trend kos, paparan untung rugi, dan gambaran portfolio yang lebih mudah hadam.",
  privacy: "Privasi dulu: semua data kekal dalam browser anda (IndexedDB) dan tidak dihantar ke server kami.",
  apiKey: "Kunci API yfapi.net hanya digunakan untuk ambil harga pasaran dan tetap disimpan secara lokal."
}));

assignPatch(voicePatches, ['nl-NL', 'nl-BE'], buildVoicePatch({
  demoDescription: "Wat je nu ziet is alleen de uitgeklede demo. Zodra je de broker-CSV importeert, zie je het echte plaatje van je portefeuille.",
  settingsRecords: "Instellingen & transacties",
  realizedTitle: "Gerealiseerde winst/verlies per aandeel (te vroeg verkocht / strak uitgestapt)",
  tableSubtitle: "Klap een regel open om de koop- en verkooplots te bekijken. Bedragen blijven in de oorspronkelijke marktvaluta staan, zodat afstemmen minder snel fout loopt.",
  hedgeSuccess: "Bij deze trade bleek eerder uitstappen uiteindelijk slimmer ({{value}})",
  soldTooEarly: "Te vroeg verkocht en {{value}} laten liggen",
  body: "Trade Lens is een open-source beleggingstool die broker-CSV's omzet in kostentrends, P&L-inzichten en een veel helderder portefeuilleoverzicht.",
  privacy: "Privacy eerst: alle data blijven gewoon in je browser (IndexedDB) en gaan niet stiekem naar onze servers.",
  apiKey: "Je yfapi.net API-key wordt alleen gebruikt om marktdata op te halen en blijft ook lokaal bewaard."
}));

assignPatch(voicePatches, ['fa-IR'], buildVoicePatch({
  demoDescription: "چیزی که الان می‌بینی فقط نسخه‌ی سبکِ داده‌های نمونه است. وقتی CSV کارگزار را وارد کنی، تصویر واقعی پرتفوی تازه کامل می‌شود.",
  settingsRecords: "تنظیمات و معاملات",
  realizedTitle: "سود و زیان تحقق‌یافته به تفکیک نماد (فروش زودهنگام / خروج تمیز)",
  tableSubtitle: "هر ردیف را باز کن تا لات‌های خرید و فروش را ببینی. مبلغ‌ها در ارز اصلی همان بازار می‌مانند تا تطبیق‌دادن راحت‌تر باشد.",
  hedgeSuccess: "در این معامله، خروج زودتر در نهایت به‌صرفه‌تر بود ({{value}})",
  soldTooEarly: "این معامله را زود فروختی و {{value}} از دست رفت",
  body: "Trade Lens یک ابزار سرمایه‌گذاری متن‌باز است که CSV کارگزاری را به روند بهای تمام‌شده، نمای سود و زیان، و تصویری روشن‌تر از پرتفوی تبدیل می‌کند.",
  privacy: "حریم خصوصی در اولویت است: همه‌ی داده‌ها فقط داخل مرورگر شما (IndexedDB) می‌مانند و به سرورهای ما فرستاده نمی‌شوند.",
  apiKey: "کلید API سرویس yfapi.net فقط برای گرفتن داده‌های بازار استفاده می‌شود و همان هم فقط به‌صورت محلی نگه داشته می‌شود."
}));

assignPatch(voicePatches, ['he-IL'], buildVoicePatch({
  demoDescription: "מה שרואים עכשיו הוא רק דמו מצומצם. ברגע שמייבאים את קובץ ה-CSV מהברוקר, תמונת התיק האמיתית נפתחת כמו שצריך.",
  settingsRecords: "הגדרות ועסקאות",
  realizedTitle: "רווח/הפסד ממומש לפי נייר (מכרת מוקדם מדי / יציאה מוצלחת)",
  tableSubtitle: "פתחו שורה כדי לבדוק את מנות הקנייה והמכירה. הסכומים נשארים במטבע המקורי של השוק, כדי שההתאמה תהיה נקייה יותר.",
  hedgeSuccess: "בעסקה הזאת יציאה מוקדמת דווקא השתלמה יותר ({{value}})",
  soldTooEarly: "יצאת מוקדם מדי והשארת {{value}} על השולחן",
  body: "Trade Lens הוא כלי השקעות בקוד פתוח שהופך קובצי CSV של ברוקר לתצוגת עלות, מבט על רווח והפסד, ותמונת תיק הרבה יותר ברורה.",
  privacy: "פרטיות לפני הכול: כל הנתונים נשמרים רק בדפדפן שלך (IndexedDB) ולא נשלחים לשרתים שלנו.",
  apiKey: "מפתח ה-API של yfapi.net משמש רק למשיכת נתוני שוק, וגם הוא נשאר מקומי."
}));

assignPatch(voicePatches, ['es-419', 'es-AR', 'es-CL', 'es-CO', 'es-MX', 'es-PE', 'es-VE'], buildVoicePatch({
  demoDescription: "Lo que ves ahora es solo la demo liviana. Cuando importas el CSV de tu bróker, recién aparece la foto completa del portafolio.",
  settingsRecords: "Configuración y operaciones",
  realizedTitle: "P&L realizado por ticker (vendiste antes de tiempo / salida redonda)",
  tableSubtitle: "Abre una fila para revisar los lotes de compra y venta. Los importes se quedan en la moneda original del mercado para que conciliar sea más fácil.",
  hedgeSuccess: "En esta operación, salir antes terminó siendo mejor negocio ({{value}})",
  soldTooEarly: "Saliste demasiado pronto y dejaste {{value}} sobre la mesa",
  body: "Trade Lens es una herramienta de inversión open source que convierte los CSV del bróker en tendencias de costo, vistas de P&L y una foto del portafolio mucho más clara.",
  privacy: "Privacidad primero: todo se queda en tu navegador (IndexedDB). No subimos nada a nuestros servidores.",
  apiKey: "La API key de yfapi.net solo se usa para traer cotizaciones, y también se queda guardada localmente."
}));

assignPatch(voicePatches, ['es-ES'], buildVoicePatch({
  demoDescription: "Lo que ves ahora es solo la demo ligera. En cuanto importas el CSV de tu bróker, aparece de verdad la foto completa de la cartera.",
  settingsRecords: "Ajustes y operaciones",
  realizedTitle: "P&L realizado por valor (vendiste demasiado pronto / salida redonda)",
  tableSubtitle: "Abre una fila para revisar los lotes de compra y venta. Los importes se mantienen en la divisa original del mercado para que cuadrarlo resulte más fácil.",
  hedgeSuccess: "En esta operación, salir antes acabó siendo la mejor jugada ({{value}})",
  soldTooEarly: "Saliste demasiado pronto y dejaste {{value}} encima de la mesa",
  body: "Trade Lens es una herramienta de inversión open source que convierte los CSV del bróker en tendencias de coste, vistas de P&L y una foto de cartera mucho más clara.",
  privacy: "La privacidad va primero: todo se queda en tu navegador (IndexedDB) y no se envía a nuestros servidores.",
  apiKey: "La API key de yfapi.net solo se usa para traer cotizaciones y también se queda guardada en local."
}));

assignPatch(voicePatches, ['pt-BR'], buildVoicePatch({
  demoDescription: "O que você está vendo agora é só a demo enxuta. Quando importa o CSV da corretora, aí sim aparece o retrato completo da carteira.",
  settingsRecords: "Configurações e operações",
  realizedTitle: "P&L realizado por ativo (vendeu cedo demais / saída redonda)",
  tableSubtitle: "Abra uma linha para revisar os lotes de compra e venda. Os valores continuam na moeda original de cada mercado para facilitar a conferência.",
  hedgeSuccess: "Nessa operação, sair antes acabou sendo a melhor jogada ({{value}})",
  soldTooEarly: "Você saiu cedo demais e deixou {{value}} na mesa",
  body: "Trade Lens é uma ferramenta open source de investimento que transforma CSVs da corretora em tendência de custo, visão de P&L e um retrato da carteira muito mais fácil de ler.",
  privacy: "Privacidade em primeiro lugar: tudo fica só no seu navegador (IndexedDB) e nada é enviado para os nossos servidores.",
  apiKey: "A chave da API do yfapi.net só é usada para buscar cotações e também fica guardada localmente."
}));

assignPatch(voicePatches, ['pt-PT'], buildVoicePatch({
  demoDescription: "O que está a ver agora é apenas a demo enxuta. Quando importar o CSV da corretora, aí sim aparece a fotografia completa da carteira.",
  settingsRecords: "Definições e operações",
  realizedTitle: "P&L realizado por título (vendeu cedo demais / saída redonda)",
  tableSubtitle: "Abra uma linha para rever os lotes de compra e venda. Os montantes mantêm-se na moeda original de cada mercado para facilitar a reconciliação.",
  hedgeSuccess: "Nesta operação, sair mais cedo acabou por ser a melhor jogada ({{value}})",
  soldTooEarly: "Saiu cedo demais e deixou {{value}} em cima da mesa",
  body: "Trade Lens é uma ferramenta open source de investimento que transforma CSVs da corretora em tendência de custo, perspetiva de P&L e uma fotografia da carteira muito mais clara.",
  privacy: "Privacidade primeiro: tudo fica apenas no seu browser (IndexedDB) e nada é enviado para os nossos servidores.",
  apiKey: "A chave de API do yfapi.net só é usada para obter cotações e também fica guardada localmente."
}));

assignPatch(voicePatches, ['pl-PL'], buildVoicePatch({
  demoDescription: "To, co teraz widzisz, to tylko odchudzona wersja demo. Po imporcie CSV z domu maklerskiego dopiero widać pełny obraz portfela.",
  settingsRecords: "Ustawienia i transakcje",
  realizedTitle: "Zrealizowany P/L według spółki (sprzedane za wcześnie / ładne wyjście)",
  tableSubtitle: "Rozwiń wiersz, aby sprawdzić loty kupna i sprzedaży. Kwoty zostają w oryginalnej walucie rynku, więc łatwiej to potem uzgodnić.",
  hedgeSuccess: "Przy tej transakcji wcześniejsze wyjście finalnie okazało się lepsze ({{value}})",
  soldTooEarly: "Sprzedaż była za wcześnie i uciekło {{value}}",
  body: "Trade Lens to open-source'owe narzędzie inwestycyjne, które zamienia CSV z biura maklerskiego w trendy kosztu, widok P/L i dużo czytelniejszy obraz portfela.",
  privacy: "Prywatność przede wszystkim: wszystkie dane zostają wyłącznie w Twojej przeglądarce (IndexedDB) i nie trafiają na nasze serwery.",
  apiKey: "Klucz API yfapi.net służy tylko do pobierania notowań i również zostaje zapisany lokalnie."
}));

assignPatch(voicePatches, ['tr-TR'], buildVoicePatch({
  demoDescription: "Şu anda gördüğün şey sadece hafifletilmiş demo veri seti. Aracı kurum CSV'sini içe aktarınca portföyün gerçek resmi ortaya çıkıyor.",
  settingsRecords: "Ayarlar ve işlemler",
  realizedTitle: "Hisse bazında gerçekleşen K/Z (erken sattıkların / temiz çıkışlar)",
  tableSubtitle: "Bir satırı açıp alış ve satış lotlarını inceleyebilirsin. Tutarlar her piyasanın kendi para biriminde kalır; mutabakat yaparken daha az kafa karıştırır.",
  hedgeSuccess: "Bu işlemde biraz erken çıkmak sonradan daha mantıklı çıktı ({{value}})",
  soldTooEarly: "Burada fazla erken sattın; {{value}} masada kaldı",
  body: "Trade Lens, aracı kurum CSV'lerini maliyet trendine, K/Z görünümüne ve çok daha okunaklı bir portföy özetine çeviren açık kaynaklı bir yatırım aracıdır.",
  privacy: "Önce gizlilik: tüm veriler yalnızca tarayıcında (IndexedDB) kalır, sunucularımıza gönderilmez.",
  apiKey: "yfapi.net API anahtarı sadece piyasa verisini çekmek için kullanılır; o da yalnızca yerelde saklanır."
}));

assignPatch(voicePatches, ['hi-IN'], buildVoicePatch({
  demoDescription: "अभी जो दिख रहा है वह बस हल्का-फुल्का demo data है। broker CSV import करते ही portfolio की पूरी तस्वीर सामने आ जाती है।",
  settingsRecords: "सेटिंग्स और ट्रेड रिकॉर्ड",
  realizedTitle: "स्टॉक-वार realized P&L (जल्दी बेच दिया / सही समय पर निकले)",
  tableSubtitle: "किसी row को खोलकर buy और sell lots देख सकते हैं। रकम उसी market की मूल currency में रहती है, इसलिए मिलान आसान रहता है।",
  hedgeSuccess: "इस trade में थोड़ा पहले निकलना ही बेहतर साबित हुआ ({{value}})",
  soldTooEarly: "यह trade जल्दी बेच दिया, {{value}} छूट गया",
  body: "Trade Lens एक open-source निवेश tool है जो broker CSV को cost trend, P&L view और portfolio की साफ़ तस्वीर में बदल देता है।",
  privacy: "Privacy पहले: सारा data सिर्फ आपके browser (IndexedDB) में रहता है, हमारे server पर नहीं जाता।",
  apiKey: "yfapi.net की API key सिर्फ market data लाने के लिए इस्तेमाल होती है, और वह भी local ही रहती है।"
}));

assignPatch(voicePatches, ['ru-RU'], buildVoicePatch({
  demoDescription: "Сейчас перед вами только облегчённый демо-набор. Как только импортируете CSV от брокера, картина портфеля станет полной.",
  settingsRecords: "Настройки и сделки",
  realizedTitle: "Реализованный P&L по тикерам (слишком рано продали / вышли как надо)",
  tableSubtitle: "Откройте строку, чтобы посмотреть лоты покупок и продаж. Суммы остаются в родной валюте рынка, поэтому сверять их проще.",
  hedgeSuccess: "По этой сделке выйти раньше в итоге было выгоднее ({{value}})",
  soldTooEarly: "Здесь вышли слишком рано и недозаработали {{value}}",
  body: "Trade Lens — это open-source инструмент для инвестиций, который превращает брокерские CSV в тренд себестоимости, представление P&L и куда более читаемую картину портфеля.",
  privacy: "С приватностью всё просто: данные хранятся только в вашем браузере (IndexedDB) и не отправляются на наши серверы.",
  apiKey: "API-ключ yfapi.net нужен только для загрузки рыночных данных и тоже хранится локально."
}));

assignPatch(voicePatches, ['sv-SE'], buildVoicePatch({
  demoDescription: "Det du ser nu är bara den avskalade demon. När du importerar CSV-filen från mäklaren får du hela portföljbilden på riktigt.",
  settingsRecords: "Inställningar och affärer",
  realizedTitle: "Realiserad P/L per innehav (sålde för tidigt / snygg exit)",
  tableSubtitle: "Öppna en rad för att granska köp- och säljlottar. Beloppen ligger kvar i marknadens ursprungsvaluta, så avstämningen blir smidigare.",
  hedgeSuccess: "I den här affären visade sig en tidigare exit faktiskt vara bättre ({{value}})",
  soldTooEarly: "Du sålde för tidigt och lämnade {{value}} på bordet",
  body: "Trade Lens är ett open-source-verktyg för investeringar som gör om mäklar-CSV:er till kostnadstrender, P/L-vyer och en mycket tydligare portföljbild.",
  privacy: "Integritet först: all data stannar i din webbläsare (IndexedDB) och skickas inte till våra servrar.",
  apiKey: "Din yfapi.net API-nyckel används bara för att hämta marknadsdata och lagras också lokalt."
}));

assignPatch(voicePatches, ['cs-CZ'], buildVoicePatch({
  demoDescription: "To, co teď vidíte, je jen odlehčené demo. Jakmile naimportujete CSV od brokera, ukáže se plný obraz portfolia.",
  settingsRecords: "Nastavení a obchody",
  realizedTitle: "Realizované P/L podle titulu (prodáno moc brzo / pěkný exit)",
  tableSubtitle: "Rozklikněte řádek a zkontrolujte nákupní a prodejní loty. Částky zůstávají v původní měně trhu, takže se lépe párují.",
  hedgeSuccess: "U tohohle obchodu se dřívější výstup nakonec ukázal jako lepší tah ({{value}})",
  soldTooEarly: "Prodali jste příliš brzy a nechali na stole {{value}}",
  body: "Trade Lens je open-source investiční nástroj, který z broker CSV dělá trend nákladů, pohled na P/L a mnohem čitelnější obrázek portfolia.",
  privacy: "Soukromí především: všechna data zůstávají jen ve vašem prohlížeči (IndexedDB) a neposílají se na naše servery.",
  apiKey: "API klíč yfapi.net slouží jen k načítání tržních dat a zůstává uložený lokálně."
}));

assignPatch(voicePatches, ['et-EE'], buildVoicePatch({
  demoDescription: "See, mida praegu näed, on ainult kärbitud demo. Kui impordid maakleri CSV, tuleb portfelli pärispilt alles siis välja.",
  settingsRecords: "Seaded ja tehingud",
  realizedTitle: "Realiseeritud P/L sümboli kaupa (müüsid liiga vara / hea väljumine)",
  tableSubtitle: "Ava rida ja vaata ostu- ning müügilotte. Summad jäävad turu algses valuutas, et hiljem oleks lihtsam üle kontrollida.",
  hedgeSuccess: "Selle tehingu puhul osutus varasem väljumine tagantjärele paremaks ({{value}})",
  soldTooEarly: "Müüsid liiga vara ja jätsid {{value}} lauale",
  body: "Trade Lens on avatud lähtekoodiga investeerimistööriist, mis muudab maakleri CSV failid kulutrendiks, P/L vaateks ja palju selgemaks portfellipildiks.",
  privacy: "Privaatsus ennekõike: kõik andmed jäävad ainult sinu brauserisse (IndexedDB) ega liigu meie serveritesse.",
  apiKey: "yfapi.net API-võtit kasutatakse ainult turuandmete laadimiseks ja ka see jääb lokaalselt tallele."
}));

assignPatch(voicePatches, ['is-IS'], buildVoicePatch({
  demoDescription: "Það sem þú sérð núna er bara létt útgáfa af demógögnum. Þegar þú flytur inn CSV frá miðlara birtist raunveruleg mynd af safninu.",
  settingsRecords: "Stillingar og viðskipti",
  realizedTitle: "Innleystur hagnaður/tap eftir félagi (selt of snemma / vel farið út)",
  tableSubtitle: "Opnaðu línu til að skoða kaup- og sölulotur. Upphæðir halda sér í upprunalegri mynt markaðarins svo uppgjör verði skýrara.",
  hedgeSuccess: "Í þessum viðskiptum reyndist betra að fara fyrr út ({{value}})",
  soldTooEarly: "Þú seldir of snemma og skildir {{value}} eftir á borðinu",
  body: "Trade Lens er opið fjárfestingartól sem breytir CSV skrám frá miðlara í kostnaðarþróun, P/L sýn og mun skýrari yfirsýn yfir safnið.",
  privacy: "Persónuvernd fyrst: öll gögn haldast eingöngu í vafranum þínum (IndexedDB) og fara ekki á netþjóna okkar.",
  apiKey: "yfapi.net API-lykillinn er aðeins notaður til að sækja markaðsgögn og er líka geymdur eingöngu staðbundið."
}));

assignPatch(voicePatches, ['ro-RO'], buildVoicePatch({
  demoDescription: "Ce vezi acum este doar varianta demo, mai ușoară. După ce imporți CSV-ul brokerului, abia atunci apare imaginea completă a portofoliului.",
  settingsRecords: "Setări și tranzacții",
  realizedTitle: "P/L realizat pe simbol (vândut prea devreme / ieșire reușită)",
  tableSubtitle: "Deschide un rând ca să vezi loturile de cumpărare și vânzare. Sumele rămân în moneda originală a pieței, ca să fie mai ușor de reconciliat.",
  hedgeSuccess: "La tranzacția asta, ieșirea mai devreme s-a dovedit până la urmă mai bună ({{value}})",
  soldTooEarly: "Ai ieșit prea devreme și ai lăsat {{value}} pe masă",
  body: "Trade Lens este un instrument open-source pentru investiții care transformă CSV-urile de broker în trenduri de cost, perspective P/L și o imagine mult mai clară a portofoliului.",
  privacy: "Confidențialitatea vine prima: toate datele rămân doar în browserul tău (IndexedDB) și nu ajung pe serverele noastre.",
  apiKey: "Cheia API yfapi.net este folosită doar pentru a lua cotații și rămâne stocată local."
}));

assignPatch(voicePatches, ['hu-HU'], buildVoicePatch({
  demoDescription: "Amit most látsz, az csak a karcsúsított demó. Amint importálod a bróker CSV-jét, rögtön összeáll a portfólió valódi képe.",
  settingsRecords: "Beállítások és ügyletek",
  realizedTitle: "Realizált P/L részvényenként (túl korai kiszálló / szép exit)",
  tableSubtitle: "Nyiss le egy sort, és nézd meg a vételi és eladási lotokat. Az összegek az adott piac eredeti devizájában maradnak, így könnyebb az egyeztetés.",
  hedgeSuccess: "Ennél az ügyletnél végül jobbnak bizonyult a korábbi kiszállás ({{value}})",
  soldTooEarly: "Túl korán szálltál ki, és {{value}} maradt az asztalon",
  body: "A Trade Lens egy nyílt forráskódú befektetési eszköz, amely a bróker CSV-kből költségalakulást, P/L nézetet és sokkal átláthatóbb portfólióképet csinál.",
  privacy: "Az adatvédelem az első: minden adat kizárólag a böngésződben (IndexedDB) marad, és nem kerül a szervereinkre.",
  apiKey: "A yfapi.net API-kulcsot csak piaci adatok lekérésére használjuk, és az is helyben marad tárolva."
}));

assignPatch(voicePatches, ['da-DK'], buildVoicePatch({
  demoDescription: "Det, du ser nu, er kun den slankede demo. Når du importerer brokerens CSV, får du det rigtige overblik over porteføljen.",
  settingsRecords: "Indstillinger og handler",
  realizedTitle: "Realiseret P/L pr. papir (solgt for tidligt / flot exit)",
  tableSubtitle: "Åbn en række for at se køb- og salgslots. Beløbene bliver i markedets oprindelige valuta, så afstemningen bliver nemmere.",
  hedgeSuccess: "På denne handel viste det sig faktisk at være bedre at komme ud lidt tidligere ({{value}})",
  soldTooEarly: "Du solgte for tidligt og lod {{value}} ligge på bordet",
  body: "Trade Lens er et open-source investeringsværktøj, der forvandler broker-CSV'er til omkostningstrends, P/L-overblik og et langt klarere billede af porteføljen.",
  privacy: "Privatliv først: alle data bliver kun i din browser (IndexedDB) og sendes ikke til vores servere.",
  apiKey: "Din yfapi.net API-nøgle bruges kun til at hente markedsdata og bliver også gemt lokalt."
}));

assignPatch(voicePatches, ['el-GR'], buildVoicePatch({
  demoDescription: "Αυτό που βλέπεις τώρα είναι μόνο το ελαφρύ demo. Μόλις κάνεις εισαγωγή το CSV του broker, φαίνεται η πραγματική εικόνα του χαρτοφυλακίου.",
  settingsRecords: "Ρυθμίσεις και συναλλαγές",
  realizedTitle: "Πραγματοποιημένο P/L ανά σύμβολο (πούλησες νωρίς / πέτυχες την έξοδο)",
  tableSubtitle: "Άνοιξε μια γραμμή για να δεις τα lots αγοράς και πώλησης. Τα ποσά μένουν στο αρχικό νόμισμα της αγοράς, ώστε η συμφωνία να είναι πιο καθαρή.",
  hedgeSuccess: "Σε αυτή τη συναλλαγή, το νωρίτερο κλείσιμο βγήκε τελικά καλύτερο ({{value}})",
  soldTooEarly: "Πούλησες πολύ νωρίς και άφησες {{value}} στο τραπέζι",
  body: "Το Trade Lens είναι ένα open-source επενδυτικό εργαλείο που μετατρέπει τα CSV του broker σε τάση κόστους, εικόνα P/L και πολύ πιο καθαρή εικόνα χαρτοφυλακίου.",
  privacy: "Πρώτα η ιδιωτικότητα: όλα τα δεδομένα μένουν μόνο στον browser σου (IndexedDB) και δεν στέλνονται στους δικούς μας servers.",
  apiKey: "Το API key του yfapi.net χρησιμοποιείται μόνο για δεδομένα αγοράς και μένει επίσης αποθηκευμένο τοπικά."
}));

assignPatch(voicePatches, ['lv-LV'], buildVoicePatch({
  demoDescription: "Tas, ko tagad redzi, ir tikai saīsinātā demonstrācija. Kad importē brokera CSV, parādās pilnais portfeļa skats.",
  settingsRecords: "Iestatījumi un darījumi",
  realizedTitle: "Realizētā P/L pa simboliem (pārdots par agru / labs izejas punkts)",
  tableSubtitle: "Atver rindu, lai apskatītu pirkšanas un pārdošanas lotes. Summas paliek tirgus oriģinālajā valūtā, tāpēc saskaņošana ir vieglāka.",
  hedgeSuccess: "Šajā darījumā agrāka izeja beigās izrādījās izdevīgāka ({{value}})",
  soldTooEarly: "Pārdevi par agru un atstāji {{value}} uz galda",
  body: "Trade Lens ir atvērtā koda investīciju rīks, kas brokera CSV pārvērš izmaksu dinamikā, P/L skatā un daudz skaidrākā portfeļa attēlā.",
  privacy: "Privātums pirmajā vietā: visi dati paliek tikai tavā pārlūkā (IndexedDB) un nenonāk mūsu serveros.",
  apiKey: "yfapi.net API atslēga tiek izmantota tikai tirgus datu ielādei un arī paliek lokāli."
}));

assignPatch(voicePatches, ['lt-LT'], buildVoicePatch({
  demoDescription: "Tai, ką dabar matai, tėra supaprastinta demo versija. Kai importuoji brokerio CSV, tik tada atsiveria pilnas portfelio vaizdas.",
  settingsRecords: "Nustatymai ir sandoriai",
  realizedTitle: "Realizuotas P/L pagal simbolį (parduota per anksti / geras išėjimas)",
  tableSubtitle: "Atverk eilutę ir peržiūrėk pirkimo bei pardavimo lot'us. Sumos paliekamos originalia rinkos valiuta, todėl suderinti duomenis lengviau.",
  hedgeSuccess: "Šio sandorio atveju ankstesnis išėjimas galiausiai buvo naudingesnis ({{value}})",
  soldTooEarly: "Pardavei per anksti ir palikai {{value}} ant stalo",
  body: "Trade Lens yra atvirojo kodo investavimo įrankis, kuris brokerio CSV paverčia savikainos tendencijomis, P/L vaizdu ir daug aiškesniu portfelio paveikslu.",
  privacy: "Privatumas pirmiausia: visi duomenys lieka tik tavo naršyklėje (IndexedDB) ir nėra siunčiami į mūsų serverius.",
  apiKey: "yfapi.net API raktas naudojamas tik rinkos duomenims gauti ir taip pat lieka saugomas lokaliai."
}));

assignPatch(voicePatches, ['nb-NO'], buildVoicePatch({
  demoDescription: "Det du ser nå er bare den slankede demoen. Når du importerer CSV-en fra megleren, får du det virkelige bildet av porteføljen.",
  settingsRecords: "Innstillinger og handler",
  realizedTitle: "Realisert P/L per aksje (solgt for tidlig / god exit)",
  tableSubtitle: "Åpne en rad for å se kjøps- og salgslotter. Beløpene blir stående i markedets opprinnelige valuta, så avstemmingen blir enklere.",
  hedgeSuccess: "På denne handelen viste det seg faktisk å være bedre å komme seg ut litt tidligere ({{value}})",
  soldTooEarly: "Du solgte for tidlig og lot {{value}} ligge igjen på bordet",
  body: "Trade Lens er et open-source investeringsverktøy som gjør broker-CSV-er om til kostnadstrender, P/L-visning og et mye klarere porteføljebilde.",
  privacy: "Personvern først: all data blir bare i nettleseren din (IndexedDB) og sendes ikke til serverne våre.",
  apiKey: "yfapi.net API-nøkkelen brukes bare til å hente markedsdata, og den blir også lagret lokalt."
}));

assignPatch(voicePatches, ['fi-FI'], buildVoicePatch({
  demoDescription: "Se mitä nyt näet, on vain kevennetty demoversio. Kun tuot välittäjän CSV:n sisään, salkun oikea kuva aukeaa kunnolla.",
  settingsRecords: "Asetukset ja kaupat",
  realizedTitle: "Realisoitu P/L osakkeittain (myyty liian aikaisin / hyvä exit)",
  tableSubtitle: "Avaa rivi nähdäksesi osto- ja myyntilotit. Summat pysyvät markkinan alkuperäisessä valuutassa, joten täsmäytys on helpompaa.",
  hedgeSuccess: "Tässä kaupassa aiempi irtautuminen osoittautui lopulta paremmaksi ratkaisuksi ({{value}})",
  soldTooEarly: "Myit liian aikaisin ja jätit {{value}} pöydälle",
  body: "Trade Lens on avoimen lähdekoodin sijoitustyökalu, joka muuttaa välittäjän CSV:t kustannustrendeiksi, P/L-näkymiksi ja paljon selkeämmäksi salkkukuvaksi.",
  privacy: "Yksityisyys ensin: kaikki data jää vain selaimeesi (IndexedDB) eikä siirry palvelimillemme.",
  apiKey: "yfapi.net API-avain käytetään vain markkinadatan hakuun, ja sekin säilyy paikallisesti."
}));

assignPatch(voicePatches, ['fil-PH'], buildVoicePatch({
  demoDescription: "Yung nakikita mo ngayon ay iyong pinayatang demo lang. Kapag in-import mo ang CSV ng broker, saka lalabas ang tunay na kabuuan ng portfolio mo.",
  settingsRecords: "Mga setting at trade",
  realizedTitle: "Realized P/L per symbol (naibenta nang maaga / maayos ang exit)",
  tableSubtitle: "Buksan ang isang row para makita ang buy at sell lots. Nananatili sa orihinal na currency ng market ang mga halaga para mas madaling i-reconcile.",
  hedgeSuccess: "Sa trade na ito, mas tama palang mas maagang lumabas ({{value}})",
  soldTooEarly: "Masyado kang maagang lumabas at naiwan ang {{value}} sa mesa",
  body: "Trade Lens ay isang open-source na investment tool na ginagawang mas malinaw na cost trend, P/L view, at portfolio snapshot ang magulong broker CSV.",
  privacy: "Unahin ang privacy: lahat ng data ay nananatili lang sa browser mo (IndexedDB) at hindi ipinapadala sa aming server.",
  apiKey: "Ang yfapi.net API key ay para lang sa pagkuha ng market data, at lokal din itong nakaimbak."
}));

assignPatch(voicePatches, ['vi-VN'], buildVoicePatch({
  demoDescription: "Những gì bạn đang thấy bây giờ chỉ là bộ dữ liệu mẫu bản gọn. Khi nhập CSV từ công ty chứng khoán, bức tranh danh mục thật sự mới hiện ra đầy đủ.",
  settingsRecords: "Thiết lập và giao dịch",
  realizedTitle: "Lãi/lỗ đã chốt theo mã (bán non / chốt đẹp)",
  tableSubtitle: "Mở từng dòng để xem các lô mua và bán. Số tiền được giữ nguyên theo đồng tiền gốc của từng thị trường nên đối soát sẽ đỡ rối hơn.",
  hedgeSuccess: "Ở giao dịch này, thoát sớm hơn hóa ra lại có lợi hơn ({{value}})",
  soldTooEarly: "Bán hơi sớm nên bỏ lỡ mất {{value}}",
  body: "Trade Lens là công cụ đầu tư mã nguồn mở giúp biến CSV từ công ty chứng khoán thành xu hướng giá vốn, góc nhìn lãi lỗ và ảnh chụp danh mục dễ đọc hơn nhiều.",
  privacy: "Ưu tiên quyền riêng tư: toàn bộ dữ liệu chỉ nằm trong trình duyệt của bạn (IndexedDB), không gửi về máy chủ của chúng tôi.",
  apiKey: "API key của yfapi.net chỉ dùng để lấy dữ liệu giá, và nó cũng chỉ được giữ ở máy của bạn."
}));

assignPatch(voicePatches, ['th-TH'], buildVoicePatch({
  demoDescription: "ตอนนี้ที่เห็นคือข้อมูลตัวอย่างแบบย่อก่อน พอเอา CSV จากโบรกมาใส่ ภาพพอร์ตจริงถึงจะกางออกครบ",
  settingsRecords: "ตั้งค่าและประวัติซื้อขาย",
  realizedTitle: "กำไร/ขาดทุนที่ปิดแล้วรายตัว (ขายหมู / ออกได้สวย)",
  tableSubtitle: "กดเปิดแต่ละแถวเพื่อดู lot ซื้อและขายได้ โดยมูลค่าจะคงเป็นสกุลเงินเดิมของตลาดนั้น ๆ ไว้ ทำให้เทียบรายการได้ง่ายกว่า",
  hedgeSuccess: "ดีลนี้ถ้าออกเร็วกว่านี้กลับคุ้มกว่า ({{value}})",
  soldTooEarly: "ขายเร็วไป เลยอดไป {{value}}",
  body: "Trade Lens คือเครื่องมือการลงทุนแบบโอเพนซอร์สที่ช่วยแปลง CSV จากโบรกให้กลายเป็นภาพต้นทุน มุมมองกำไรขาดทุน และภาพรวมพอร์ตที่อ่านง่ายขึ้นมาก",
  privacy: "เรื่องความเป็นส่วนตัวมาก่อน: ข้อมูลทั้งหมดอยู่แค่ในเบราว์เซอร์ของคุณ (IndexedDB) และไม่ถูกส่งกลับไปที่เซิร์ฟเวอร์ของเรา",
  apiKey: "API key ของ yfapi.net ใช้แค่ดึงข้อมูลราคา และก็เก็บไว้ในเครื่องคุณเท่านั้น"
}));

assignPatch(voicePatches, ['ar-SA', 'ar-EG', 'ar-AE', 'ar-KW', 'ar-QA'], buildVoicePatch({
  demoDescription: "الذي تراه الآن مجرد نسخة خفيفة من البيانات التجريبية. عندما تستورد ملف CSV من الوسيط تظهر الصورة الحقيقية للمحفظة بالكامل.",
  settingsRecords: "الإعدادات وسجل التداول",
  realizedTitle: "الأرباح والخسائر المحققة حسب الرمز (بيع بدري / خروج ممتاز)",
  tableSubtitle: "افتح أي صف لمراجعة دفعات الشراء والبيع. المبالغ تبقى بعملة السوق الأصلية حتى تكون المطابقة أوضح.",
  hedgeSuccess: "في هذه الصفقة، الخروج أبكر كان فعلاً أفضل ({{value}})",
  soldTooEarly: "خرجت بدري وتركت {{value}} على الطاولة",
  body: "Trade Lens أداة استثمار مفتوحة المصدر تحوّل ملفات CSV من الوسيط إلى اتجاه تكلفة أوضح، وعرض أرباح وخسائر، وصورة محفظة أسهل في القراءة.",
  privacy: "الخصوصية أولاً: كل البيانات تبقى داخل متصفحك فقط (IndexedDB)، ولا تُرسل إلى خوادمنا.",
  apiKey: "مفتاح yfapi.net API يُستخدم فقط لجلب بيانات السوق، ويبقى محفوظاً محلياً أيضاً."
}));

assignPatch(voicePatches, ['ur-PK'], buildVoicePatch({
  demoDescription: "جو آپ ابھی دیکھ رہے ہیں وہ صرف ہلکا سا demo data ہے۔ broker CSV import کرتے ہی پورے portfolio کی اصل تصویر سامنے آتی ہے۔",
  settingsRecords: "سیٹنگز اور ٹریڈ ریکارڈ",
  realizedTitle: "ہر symbol کا realized P&L (جلدی بیچ دیا / اچھی exit)",
  tableSubtitle: "کسی row کو کھول کر buy اور sell lots دیکھ سکتے ہیں۔ رقم ہر market کی اصل currency میں رہتی ہے، اس لیے match کرنا آسان رہتا ہے۔",
  hedgeSuccess: "اس trade میں تھوڑا پہلے نکلنا آخرکار بہتر نکلا ({{value}})",
  soldTooEarly: "یہ trade بہت جلد بند کر دی، {{value}} ہاتھ سے نکل گیا",
  body: "Trade Lens ایک open-source سرمایہ کاری tool ہے جو broker CSV کو cost trend, P&L view اور portfolio کی زیادہ صاف تصویر میں بدل دیتا ہے۔",
  privacy: "پرائیویسی پہلے: سارا data صرف آپ کے browser (IndexedDB) میں رہتا ہے، ہمارے server تک نہیں جاتا۔",
  apiKey: "yfapi.net کی API key صرف market data لانے کے لیے استعمال ہوتی ہے، اور وہ بھی local ہی رہتی ہے۔"
}));

extendPatch(voicePatches, ['zh-TW'], buildSplitCopyPatch({
  split: '拆股',
  reverseSplit: '反向拆股',
  splitQuantityChange: '調整 {{quantity}} 股',
  importReviewSkippedHelp: '下面先列幾筆這次解析階段就會略過的資料，先看一眼再決定要不要套用。'
}));

extendPatch(voicePatches, ['yue-Hant-HK'], buildSplitCopyPatch({
  split: '拆股',
  reverseSplit: '反向拆股',
  splitQuantityChange: '調整 {{quantity}} 股',
  importReviewSkippedHelp: '下面先列幾筆今次解析階段已經會略過嘅資料，睇一眼先再決定套唔套用。'
}));

extendPatch(voicePatches, ['zh-CN', 'zh-SG'], buildSplitCopyPatch({
  split: '拆股',
  reverseSplit: '反向拆股',
  splitQuantityChange: '调整 {{quantity}} 股',
  importReviewSkippedHelp: '下面先列几笔这次解析阶段就会跳过的数据，先过一眼再决定要不要应用。'
}));

extendPatch(voicePatches, ['en-US', 'en-CA', 'en-AU', 'en-GB', 'en-IE', 'en-NZ', 'en-SG', 'en-ZA'], buildSplitCopyPatch({
  split: 'Stock Split',
  reverseSplit: 'Reverse Split',
  splitQuantityChange: '{{quantity}} shares adjusted',
  importReviewSkippedHelp: 'These are examples of rows the parser is already planning to skip before you apply the import.'
}));

extendPatch(voicePatches, ['ja-JP'], buildSplitCopyPatch({
  split: '株式分割',
  reverseSplit: '株式併合',
  splitQuantityChange: '{{quantity}} 株を調整',
  importReviewSkippedHelp: 'ここには、適用前の時点で解析側がスキップ予定の行をいくつか先に表示しています。'
}));

extendPatch(voicePatches, ['ko-KR'], buildSplitCopyPatch({
  split: '액면분할',
  reverseSplit: '역분할',
  splitQuantityChange: '{{quantity}}주 조정',
  importReviewSkippedHelp: '여기에는 가져오기를 적용하기 전에 파서가 이미 건너뛸 예정인 행 예시를 먼저 보여줍니다.'
}));

extendPatch(voicePatches, ['id-ID'], buildSplitCopyPatch({
  split: 'Stock split',
  reverseSplit: 'Reverse split',
  splitQuantityChange: '{{quantity}} saham disesuaikan',
  importReviewSkippedHelp: 'Ini contoh baris yang dari tahap parsing memang sudah akan dilewati sebelum impor benar-benar diterapkan.'
}));

extendPatch(voicePatches, ['fr-FR', 'fr-BE', 'fr-CA', 'fr-CH'], buildSplitCopyPatch({
  split: 'Division d’actions',
  reverseSplit: 'Regroupement d’actions',
  splitQuantityChange: '{{quantity}} actions ajustées',
  importReviewSkippedHelp: 'Voici quelques exemples de lignes que le parseur prévoit déjà d’ignorer avant même d’appliquer l’import.'
}));

extendPatch(voicePatches, ['de-DE', 'de-AT', 'de-CH'], buildSplitCopyPatch({
  split: 'Aktiensplit',
  reverseSplit: 'Aktienzusammenlegung',
  splitQuantityChange: '{{quantity}} Stück angepasst',
  importReviewSkippedHelp: 'Hier siehst du ein paar Beispielzeilen, die der Parser schon vor dem eigentlichen Import überspringen würde.'
}));

extendPatch(voicePatches, ['it-IT', 'it-CH'], buildSplitCopyPatch({
  split: 'Frazionamento',
  reverseSplit: 'Raggruppamento',
  splitQuantityChange: '{{quantity}} azioni rettificate',
  importReviewSkippedHelp: 'Qui sotto vedi alcuni esempi di righe che il parser salterà già in fase di analisi, prima ancora di applicare l’import.'
}));

extendPatch(voicePatches, ['ms-MY'], buildSplitCopyPatch({
  split: 'Pecahan saham',
  reverseSplit: 'Pecahan songsang',
  splitQuantityChange: '{{quantity}} saham dilaraskan',
  importReviewSkippedHelp: 'Di bawah ini ialah beberapa contoh baris yang memang akan dilangkau oleh parser sebelum import benar-benar diterapkan.'
}));

extendPatch(voicePatches, ['nl-NL', 'nl-BE'], buildSplitCopyPatch({
  split: 'Aandelensplitsing',
  reverseSplit: 'Omgekeerde aandelensplitsing',
  splitQuantityChange: '{{quantity}} aandelen aangepast',
  importReviewSkippedHelp: 'Hier zie je alvast een paar voorbeeldregels die de parser nog vóór het toepassen van de import zal overslaan.'
}));

extendPatch(voicePatches, ['fa-IR'], buildSplitCopyPatch({
  split: 'تقسیم سهام',
  reverseSplit: 'ادغام سهام',
  splitQuantityChange: '{{quantity}} سهم تعدیل شد',
  importReviewSkippedHelp: 'اینجا چند نمونه از ردیف‌هایی را می‌بینی که پارسر قبل از اعمال ایمپورت قرار است ردشان کند.'
}));

extendPatch(voicePatches, ['he-IL'], buildSplitCopyPatch({
  split: 'פיצול מניות',
  reverseSplit: 'איחוד מניות',
  splitQuantityChange: '{{quantity}} מניות הותאמו',
  importReviewSkippedHelp: 'כאן מוצגות כמה דוגמאות לשורות שהמפרש כבר מתכנן לדלג עליהן עוד לפני החלת הייבוא.'
}));

extendPatch(voicePatches, ['es-419', 'es-AR', 'es-CL', 'es-CO', 'es-MX', 'es-PE', 'es-VE'], buildSplitCopyPatch({
  split: 'Split de acciones',
  reverseSplit: 'Contrasplit',
  splitQuantityChange: '{{quantity}} acciones ajustadas',
  importReviewSkippedHelp: 'Aquí ves algunos ejemplos de filas que el parser ya piensa omitir antes de aplicar la importación.'
}));

extendPatch(voicePatches, ['es-ES'], buildSplitCopyPatch({
  split: 'Desdoblamiento',
  reverseSplit: 'Contrasplit',
  splitQuantityChange: '{{quantity}} acciones ajustadas',
  importReviewSkippedHelp: 'Aquí puedes ver algunos ejemplos de filas que el parser ya dejará fuera antes de aplicar la importación.'
}));

extendPatch(voicePatches, ['pt-BR'], buildSplitCopyPatch({
  split: 'Desdobramento',
  reverseSplit: 'Grupamento',
  splitQuantityChange: '{{quantity}} ações ajustadas',
  importReviewSkippedHelp: 'Aqui vão alguns exemplos de linhas que o parser já pretende ignorar antes mesmo de aplicar a importação.'
}));

extendPatch(voicePatches, ['pt-PT'], buildSplitCopyPatch({
  split: 'Desdobramento',
  reverseSplit: 'Agrupamento',
  splitQuantityChange: '{{quantity}} ações ajustadas',
  importReviewSkippedHelp: 'Aqui vês alguns exemplos de linhas que o parser já tenciona ignorar antes de aplicar a importação.'
}));

extendPatch(voicePatches, ['pl-PL'], buildSplitCopyPatch({
  split: 'Split akcji',
  reverseSplit: 'Scalenie akcji',
  splitQuantityChange: 'Skorygowano {{quantity}} akcji',
  importReviewSkippedHelp: 'Tutaj widać kilka przykładowych wierszy, które parser planuje pominąć jeszcze przed zastosowaniem importu.'
}));

extendPatch(voicePatches, ['tr-TR'], buildSplitCopyPatch({
  split: 'Hisse bölünmesi',
  reverseSplit: 'Ters bölünme',
  splitQuantityChange: '{{quantity}} adet güncellendi',
  importReviewSkippedHelp: 'Burada, içe aktarmayı uygulamadan önce parserın zaten atlamayı planladığı birkaç satır örneği görünüyor.'
}));

extendPatch(voicePatches, ['hi-IN'], buildSplitCopyPatch({
  split: 'स्टॉक स्प्लिट',
  reverseSplit: 'रिवर्स स्प्लिट',
  splitQuantityChange: '{{quantity}} शेयर समायोजित',
  importReviewSkippedHelp: 'यहाँ कुछ उदाहरण पंक्तियाँ दिखाई जा रही हैं जिन्हें इम्पोर्ट लागू करने से पहले ही parser छोड़ने वाला है।'
}));

extendPatch(voicePatches, ['ru-RU'], buildSplitCopyPatch({
  split: 'Сплит акций',
  reverseSplit: 'Обратный сплит',
  splitQuantityChange: 'Скорректировано {{quantity}} акций',
  importReviewSkippedHelp: 'Здесь показаны примеры строк, которые парсер уже собирается пропустить ещё до применения импорта.'
}));

extendPatch(voicePatches, ['sv-SE'], buildSplitCopyPatch({
  split: 'Aktiesplit',
  reverseSplit: 'Omvänd split',
  splitQuantityChange: '{{quantity}} aktier justerade',
  importReviewSkippedHelp: 'Här ser du några exempelrader som parsern redan tänker hoppa över innan importen faktiskt tillämpas.'
}));

extendPatch(voicePatches, ['cs-CZ'], buildSplitCopyPatch({
  split: 'Split akcií',
  reverseSplit: 'Reverzní split',
  splitQuantityChange: '{{quantity}} akcií upraveno',
  importReviewSkippedHelp: 'Tady jsou ukázky řádků, které parser plánuje přeskočit ještě před samotným použitím importu.'
}));

extendPatch(voicePatches, ['et-EE'], buildSplitCopyPatch({
  split: 'Aktsiasplit',
  reverseSplit: 'Pöördsplit',
  splitQuantityChange: '{{quantity}} aktsiat korrigeeritud',
  importReviewSkippedHelp: 'Siin on mõned näiteread, mille parser plaanib juba enne importi vahele jätta.'
}));

extendPatch(voicePatches, ['is-IS'], buildSplitCopyPatch({
  split: 'Hlutabréfasplit',
  reverseSplit: 'Öfugt split',
  splitQuantityChange: '{{quantity}} hlutir leiðréttir',
  importReviewSkippedHelp: 'Hér sérðu nokkur dæmi um línur sem lesarinn ætlar nú þegar að sleppa áður en innflutningurinn er beittur.'
}));

extendPatch(voicePatches, ['ro-RO'], buildSplitCopyPatch({
  split: 'Split de acțiuni',
  reverseSplit: 'Consolidare acțiuni',
  splitQuantityChange: '{{quantity}} acțiuni ajustate',
  importReviewSkippedHelp: 'Aici vezi câteva exemple de rânduri pe care parserul le va sări deja înainte să aplici importul.'
}));

extendPatch(voicePatches, ['hu-HU'], buildSplitCopyPatch({
  split: 'Részvényfelosztás',
  reverseSplit: 'Fordított split',
  splitQuantityChange: '{{quantity}} részvény igazítva',
  importReviewSkippedHelp: 'Itt látsz néhány példasort, amelyet az értelmező már az import alkalmazása előtt is át fog ugrani.'
}));

extendPatch(voicePatches, ['da-DK'], buildSplitCopyPatch({
  split: 'Aktiesplit',
  reverseSplit: 'Omvendt split',
  splitQuantityChange: '{{quantity}} aktier justeret',
  importReviewSkippedHelp: 'Her ser du nogle eksempelrækker, som parseren allerede planlægger at springe over, før importen bliver anvendt.'
}));

extendPatch(voicePatches, ['el-GR'], buildSplitCopyPatch({
  split: 'Split μετοχών',
  reverseSplit: 'Reverse split',
  splitQuantityChange: '{{quantity}} μετοχές προσαρμόστηκαν',
  importReviewSkippedHelp: 'Εδώ βλέπεις μερικά παραδείγματα γραμμών που ο parser σκοπεύει ήδη να προσπεράσει πριν εφαρμοστεί η εισαγωγή.'
}));

extendPatch(voicePatches, ['lv-LV'], buildSplitCopyPatch({
  split: 'Akciju sadalīšana',
  reverseSplit: 'Apgrieztais split',
  splitQuantityChange: '{{quantity}} akcijas koriģētas',
  importReviewSkippedHelp: 'Šeit redzami daži piemēra ieraksti, kurus parseris jau plāno izlaist vēl pirms importa piemērošanas.'
}));

extendPatch(voicePatches, ['lt-LT'], buildSplitCopyPatch({
  split: 'Akcijų padalijimas',
  reverseSplit: 'Atvirkštinis splitas',
  splitQuantityChange: '{{quantity}} akcijos pakoreguotos',
  importReviewSkippedHelp: 'Čia matai kelis eilučių pavyzdžius, kuriuos parseris jau planuoja praleisti dar prieš pritaikant importą.'
}));

extendPatch(voicePatches, ['nb-NO'], buildSplitCopyPatch({
  split: 'Aksjesplitt',
  reverseSplit: 'Omvendt splitt',
  splitQuantityChange: '{{quantity}} aksjer justert',
  importReviewSkippedHelp: 'Her ser du noen eksempelrader som parseren allerede planlegger å hoppe over før importen faktisk brukes.'
}));

extendPatch(voicePatches, ['fi-FI'], buildSplitCopyPatch({
  split: 'Osakesplit',
  reverseSplit: 'Käänteinen split',
  splitQuantityChange: '{{quantity}} osaketta oikaistu',
  importReviewSkippedHelp: 'Tässä näkyy muutama esimerkkirivi, jotka parseri aikoo ohittaa jo ennen kuin tuonti otetaan käyttöön.'
}));

extendPatch(voicePatches, ['fil-PH'], buildSplitCopyPatch({
  split: 'Stock split',
  reverseSplit: 'Reverse split',
  splitQuantityChange: '{{quantity}} shares na-adjust',
  importReviewSkippedHelp: 'Narito ang ilang halimbawang row na balak nang laktawan ng parser bago pa talaga i-apply ang import.'
}));

extendPatch(voicePatches, ['vi-VN'], buildSplitCopyPatch({
  split: 'Tách cổ phiếu',
  reverseSplit: 'Gộp cổ phiếu',
  splitQuantityChange: 'Đã điều chỉnh {{quantity}} cổ phiếu',
  importReviewSkippedHelp: 'Ở đây là vài dòng mẫu mà bộ phân tích đã định bỏ qua ngay từ trước khi bạn áp dụng lần import này.'
}));

extendPatch(voicePatches, ['th-TH'], buildSplitCopyPatch({
  split: 'แตกพาร์',
  reverseSplit: 'รวมพาร์',
  splitQuantityChange: 'ปรับจำนวน {{quantity}} หุ้น',
  importReviewSkippedHelp: 'ด้านล่างคือตัวอย่างบางแถวที่ตัว parser ตั้งใจจะข้ามอยู่แล้วก่อนที่คุณจะกดใช้การนำเข้า'
}));

extendPatch(voicePatches, ['ar-SA', 'ar-EG', 'ar-AE', 'ar-KW', 'ar-QA'], buildSplitCopyPatch({
  split: 'تجزئة الأسهم',
  reverseSplit: 'تجميع الأسهم',
  splitQuantityChange: 'تم تعديل {{quantity}} سهم',
  importReviewSkippedHelp: 'في الأسفل ترى أمثلة لبعض الصفوف التي يخطط المحلل لتجاوزها مسبقاً قبل تطبيق عملية الاستيراد.'
}));

extendPatch(voicePatches, ['ur-PK'], buildSplitCopyPatch({
  split: 'اسٹاک اسپلٹ',
  reverseSplit: 'ریورس اسپلٹ',
  splitQuantityChange: '{{quantity}} شیئر ایڈجسٹ ہوئے',
  importReviewSkippedHelp: 'یہاں چند مثالیں دکھ رہی ہیں جنہیں parser import لاگو ہونے سے پہلے ہی چھوڑنے والا ہے۔'
}));

export const VOICE_REFINED_LOCALES = Object.freeze(Object.keys(voicePatches));

export const applyLocaleVoiceRefinements = (translations) => Object.fromEntries(
  Object.entries(translations).map(([locale, translation]) => [
    locale,
    voicePatches[locale] ? mergeLocale(translation, voicePatches[locale]) : translation
  ])
);
