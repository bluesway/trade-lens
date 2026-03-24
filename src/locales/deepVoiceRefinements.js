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

const buildDeepPatch = ({
  manualUpdatedAt,
  apiUpdatedAt,
  notUpdatedYet,
  baseCurrencyTitle,
  hideZeroHolding,
  manualRecordTitle,
  sourceCode,
  dismiss,
  apiKeySaved,
  needApiKey,
  cacheFresh,
  updateSuccess,
  recordUpdated,
  dataCleared,
  clearConfirm,
  backupConfirm
}) => ({
  table: {
    manualUpdatedAt,
    apiUpdatedAt,
    notUpdatedYet
  },
  manager: {
    baseCurrencyTitle,
    hideZeroHolding,
    manualRecordTitle
  },
  notice: {
    sourceCode,
    dismiss
  },
  messages: {
    apiKeySaved,
    needApiKey,
    cacheFresh,
    updateSuccess,
    recordUpdated,
    dataCleared,
    clearConfirm,
    backupConfirm
  }
});

const buildTableControlPatch = ({
  sortSelectorTitle,
  sortDirectionAscending,
  sortDirectionDescending,
  latestTradeDate,
  marketFilterTitle
}) => ({
  table: {
    sortSelectorTitle,
    sortDirectionAscending,
    sortDirectionDescending,
    sortOptions: {
      latestTradeDate
    },
    marketFilterTitle
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

const deepPatches = {};

assignPatch(deepPatches, ['zh-TW'], buildDeepPatch({
  manualUpdatedAt: '手動覆寫：{{value}}',
  apiUpdatedAt: 'API 更新時間：{{value}}',
  notUpdatedYet: '還沒更新',
  baseCurrencyTitle: '總覽卡片的基準幣別',
  hideZeroHolding: '隱藏已經清倉的紀錄',
  manualRecordTitle: '手動補一筆交易',
  sourceCode: '原始碼公開：去看專案，也歡迎一起補刀',
  dismiss: '先不要再吵我',
  apiKeySaved: 'API 金鑰存好了。',
  needApiKey: '先到設定面板填好 yfapi.net 金鑰，再來更新行情。',
  cacheFresh: '股價和匯率在 24 小時內剛更新過，這次直接吃本機快取，順手幫你省 API 額度。',
  updateSuccess: '已更新 {{count}} 檔股票與匯率。',
  recordUpdated: '這筆交易已更新。',
  dataCleared: '資料已清空，示範資料也重新載好了。',
  clearConfirm: '確定要把目前資料全清掉，重新載入示範資料？這步按下去就回不去了。',
  backupConfirm: '清掉之前，要不要先把現在的資料匯出成 CSV 備份？'
}));

assignPatch(deepPatches, ['yue-Hant-HK'], buildDeepPatch({
  manualUpdatedAt: '手動覆寫：{{value}}',
  apiUpdatedAt: 'API 更新時間：{{value}}',
  notUpdatedYet: '仲未更新',
  baseCurrencyTitle: '總覽卡片基準貨幣',
  hideZeroHolding: '隱藏已經清倉嘅紀錄',
  manualRecordTitle: '手動補一筆交易',
  sourceCode: '原始碼公開：入去睇 project，想幫手都得',
  dismiss: '暫時唔好再彈',
  apiKeySaved: 'API 金鑰已經存好。',
  needApiKey: '先去設定面板填好 yfapi.net 金鑰，先再更新報價。',
  cacheFresh: '股價同匯率喺 24 小時內先啱啱更新過，今次直接食本機快取，順手幫你慳 API 額度。',
  updateSuccess: '已更新 {{count}} 隻股票同匯率。',
  recordUpdated: '呢筆交易已更新。',
  dataCleared: '資料已清走，示範資料都重新載好。',
  clearConfirm: '確定要清走而家全部資料，再重新載入示範資料？呢步撳落去就冇得返轉頭。',
  backupConfirm: '清走之前，要唔要先將而家資料匯出做 CSV 備份？'
}));

assignPatch(deepPatches, ['zh-CN', 'zh-SG'], buildDeepPatch({
  manualUpdatedAt: '手动覆盖：{{value}}',
  apiUpdatedAt: 'API 更新时间：{{value}}',
  notUpdatedYet: '还没更新',
  baseCurrencyTitle: '总览卡片基准币种',
  hideZeroHolding: '隐藏已经清仓的记录',
  manualRecordTitle: '手动补一笔交易',
  sourceCode: '源码公开：去看项目，也欢迎顺手来提改动',
  dismiss: '先别再弹了',
  apiKeySaved: 'API Key 已保存。',
  needApiKey: '先到设置面板填好 yfapi.net API Key，再来更新行情。',
  cacheFresh: '股价和汇率在 24 小时内刚更新过，这次直接复用本地缓存，顺手帮你省一点 API 配额。',
  updateSuccess: '已更新 {{count}} 只股票与汇率。',
  recordUpdated: '这笔交易已更新。',
  dataCleared: '数据已清空，示例数据也重新载好了。',
  clearConfirm: '确定要清空当前数据并重新载入示例数据吗？这一步按下去就不能反悔了。',
  backupConfirm: '清空之前，要不要先把当前数据导出成 CSV 备份？'
}));

assignPatch(deepPatches, ['en-US', 'en-CA', 'en-AU', 'en-GB', 'en-IE', 'en-NZ', 'en-SG', 'en-ZA'], buildDeepPatch({
  manualUpdatedAt: 'Manual override: {{value}}',
  apiUpdatedAt: 'API refresh: {{value}}',
  notUpdatedYet: 'Not refreshed yet',
  baseCurrencyTitle: 'Summary base currency',
  hideZeroHolding: 'Hide fully exited names',
  manualRecordTitle: 'Add a trade by hand',
  sourceCode: 'Open source: read the code, file an idea, or jump in',
  dismiss: 'Don’t show this again',
  apiKeySaved: 'API key saved.',
  needApiKey: 'Add your yfapi.net API key in settings before refreshing quotes.',
  cacheFresh: 'Prices and FX were refreshed within the last 24 hours, so the app reused local cache and spared your quota.',
  updateSuccess: 'Updated {{count}} quotes plus FX.',
  recordUpdated: 'Trade updated.',
  dataCleared: 'Data cleared and the demo set is back in place.',
  clearConfirm: 'Clear everything and reload the demo set? Once you do it, there’s no undo.',
  backupConfirm: 'Want to export the current data as a CSV backup before clearing it?'
}));

assignPatch(deepPatches, ['ja-JP'], buildDeepPatch({
  manualUpdatedAt: '手動上書き: {{value}}',
  apiUpdatedAt: 'API 更新時刻: {{value}}',
  notUpdatedYet: 'まだ更新していません',
  baseCurrencyTitle: 'サマリーカードの基準通貨',
  hideZeroHolding: '完全に手仕舞い済みの銘柄を隠す',
  manualRecordTitle: '取引を手入力で追加',
  sourceCode: 'オープンソース: コードを読んで、気になればそのまま参加できます',
  dismiss: 'もう表示しない',
  apiKeySaved: 'APIキーを保存しました。',
  needApiKey: '価格を更新する前に、設定パネルで yfapi.net の APIキーを入れてください。',
  cacheFresh: '株価と為替は過去24時間以内に更新済みだったため、今回はローカルキャッシュを再利用してAPI枠を節約しました。',
  updateSuccess: '{{count}} 件の価格と為替を更新しました。',
  recordUpdated: '取引を更新しました。',
  dataCleared: 'データを消去し、デモセットを読み込み直しました。',
  clearConfirm: '現在のデータをすべて消して、デモセットを読み込み直しますか？ 実行すると元には戻せません。',
  backupConfirm: '消去する前に、今のデータをCSVバックアップとして書き出しますか？'
}));

assignPatch(deepPatches, ['ko-KR'], buildDeepPatch({
  manualUpdatedAt: '수동 덮어쓰기: {{value}}',
  apiUpdatedAt: 'API 갱신 시각: {{value}}',
  notUpdatedYet: '아직 갱신 안 됨',
  baseCurrencyTitle: '요약 카드 기준 통화',
  hideZeroHolding: '완전히 정리한 종목 숨기기',
  manualRecordTitle: '거래 한 건 직접 넣기',
  sourceCode: '오픈소스: 코드 구경하고, 마음 내키면 바로 합류해도 됩니다',
  dismiss: '다시 띄우지 않기',
  apiKeySaved: 'API 키를 저장했습니다.',
  needApiKey: '시세를 새로 받기 전에 설정 패널에 yfapi.net API 키부터 넣어 주세요.',
  cacheFresh: '주가와 환율은 최근 24시간 안에 이미 갱신돼 있어서, 이번에는 로컬 캐시를 재사용해 한도를 아꼈습니다.',
  updateSuccess: '시세와 환율 {{count}}건을 업데이트했습니다.',
  recordUpdated: '거래 내역을 업데이트했습니다.',
  dataCleared: '데이터를 비우고 데모 세트를 다시 불러왔습니다.',
  clearConfirm: '현재 데이터를 전부 지우고 데모 세트를 다시 불러올까요? 한 번 실행하면 되돌릴 수 없습니다.',
  backupConfirm: '지우기 전에 현재 데이터를 CSV 백업으로 먼저 내보낼까요?'
}));

assignPatch(deepPatches, ['id-ID'], buildDeepPatch({
  manualUpdatedAt: 'Ditimpa manual: {{value}}',
  apiUpdatedAt: 'Refresh API: {{value}}',
  notUpdatedYet: 'Belum direfresh',
  baseCurrencyTitle: 'Mata uang dasar ringkasan',
  hideZeroHolding: 'Sembunyikan posisi yang sudah benar-benar habis',
  manualRecordTitle: 'Tambahkan trade manual',
  sourceCode: 'Open source: lihat kodenya, kasih ide, atau langsung ikut ngoprek',
  dismiss: 'Jangan tampilkan lagi',
  apiKeySaved: 'API key tersimpan.',
  needApiKey: 'Isi dulu API key yfapi.net di panel pengaturan sebelum refresh harga.',
  cacheFresh: 'Harga dan kurs sudah diperbarui dalam 24 jam terakhir, jadi aplikasi memakai cache lokal biar kuotanya tidak kebuang.',
  updateSuccess: '{{count}} harga dan kurs berhasil diperbarui.',
  recordUpdated: 'Trade berhasil diperbarui.',
  dataCleared: 'Data dibersihkan dan set demo dimuat ulang.',
  clearConfirm: 'Yakin mau hapus semua data lalu muat ulang demo? Sekali jalan, tidak ada tombol undo.',
  backupConfirm: 'Sebelum dihapus, mau ekspor data sekarang sebagai backup CSV dulu?'
}));

assignPatch(deepPatches, ['fr-FR', 'fr-BE', 'fr-CA', 'fr-CH'], buildDeepPatch({
  manualUpdatedAt: 'Correction manuelle : {{value}}',
  apiUpdatedAt: 'Rafraîchi via API : {{value}}',
  notUpdatedYet: 'Pas encore rafraîchi',
  baseCurrencyTitle: 'Devise de base du résumé',
  hideZeroHolding: 'Masquer les lignes complètement soldées',
  manualRecordTitle: 'Ajouter une opération à la main',
  sourceCode: 'Open source : allez voir le code, proposer une idée ou mettre directement les mains dedans',
  dismiss: 'Ne plus afficher',
  apiKeySaved: 'Clé API enregistrée.',
  needApiKey: 'Renseignez d’abord votre clé API yfapi.net dans les réglages avant de rafraîchir les cours.',
  cacheFresh: 'Les cours et les changes ont déjà bougé dans les dernières 24 heures, donc l’application a réutilisé le cache local pour économiser le quota.',
  updateSuccess: '{{count}} cours et taux de change mis à jour.',
  recordUpdated: 'L’opération a été mise à jour.',
  dataCleared: 'Les données ont été vidées et le jeu de démo a été rechargé.',
  clearConfirm: 'Effacer toutes les données et recharger la démo ? Une fois lancé, pas de retour arrière.',
  backupConfirm: 'Avant d’effacer, voulez-vous exporter les données actuelles en CSV de sauvegarde ?'
}));

assignPatch(deepPatches, ['de-DE', 'de-AT', 'de-CH'], buildDeepPatch({
  manualUpdatedAt: 'Manuell überschrieben: {{value}}',
  apiUpdatedAt: 'API-Refresh: {{value}}',
  notUpdatedYet: 'Noch nicht aktualisiert',
  baseCurrencyTitle: 'Basiswährung der Übersicht',
  hideZeroHolding: 'Komplett geschlossene Positionen ausblenden',
  manualRecordTitle: 'Trade manuell nachtragen',
  sourceCode: 'Open Source: Code anschauen, Idee dalassen oder direkt mitbauen',
  dismiss: 'Nicht mehr anzeigen',
  apiKeySaved: 'API-Key gespeichert.',
  needApiKey: 'Trag zuerst deinen yfapi.net API-Key in den Einstellungen ein, bevor du Kurse aktualisierst.',
  cacheFresh: 'Kurse und FX wurden bereits innerhalb der letzten 24 Stunden aktualisiert, deshalb hat die App den lokalen Cache genutzt und Kontingent gespart.',
  updateSuccess: '{{count}} Kurse und FX-Werte aktualisiert.',
  recordUpdated: 'Trade aktualisiert.',
  dataCleared: 'Daten gelöscht und Demo-Set neu geladen.',
  clearConfirm: 'Alle Daten löschen und das Demo-Set neu laden? Wenn du das bestätigst, gibt es kein Zurück.',
  backupConfirm: 'Möchtest du vor dem Löschen die aktuellen Daten als CSV-Backup exportieren?'
}));

assignPatch(deepPatches, ['it-IT', 'it-CH'], buildDeepPatch({
  manualUpdatedAt: 'Correzione manuale: {{value}}',
  apiUpdatedAt: 'Refresh API: {{value}}',
  notUpdatedYet: 'Non ancora aggiornato',
  baseCurrencyTitle: 'Valuta base del riepilogo',
  hideZeroHolding: 'Nascondi le posizioni chiuse del tutto',
  manualRecordTitle: 'Aggiungi un trade a mano',
  sourceCode: 'Open source: guarda il codice, lancia un’idea o buttati dentro direttamente',
  dismiss: 'Non mostrarlo più',
  apiKeySaved: 'Chiave API salvata.',
  needApiKey: 'Inserisci prima la chiave API di yfapi.net nel pannello impostazioni, poi aggiorna le quotazioni.',
  cacheFresh: 'Prezzi e cambi erano già stati aggiornati nelle ultime 24 ore, quindi l’app ha riusato la cache locale per non sprecare quota.',
  updateSuccess: 'Aggiornati {{count}} prezzi e cambi.',
  recordUpdated: 'Operazione aggiornata.',
  dataCleared: 'Dati puliti e set demo ricaricato.',
  clearConfirm: 'Vuoi cancellare tutti i dati e ricaricare il set demo? Una volta confermato non si torna indietro.',
  backupConfirm: 'Prima di cancellare tutto, vuoi esportare i dati correnti come backup CSV?'
}));

assignPatch(deepPatches, ['ms-MY'], buildDeepPatch({
  manualUpdatedAt: 'Ditindih secara manual: {{value}}',
  apiUpdatedAt: 'Segar semula API: {{value}}',
  notUpdatedYet: 'Belum dikemas kini lagi',
  baseCurrencyTitle: 'Mata wang asas ringkasan',
  hideZeroHolding: 'Sembunyikan posisi yang sudah habis dijual',
  manualRecordTitle: 'Tambah trade secara manual',
  sourceCode: 'Sumber terbuka: tengok kod, baling idea, atau terus masuk menyumbang',
  dismiss: 'Jangan tunjuk lagi',
  apiKeySaved: 'API key sudah disimpan.',
  needApiKey: 'Isi dahulu API key yfapi.net dalam panel tetapan sebelum kemas kini harga.',
  cacheFresh: 'Harga dan kadar tukaran sudah dikemas kini dalam tempoh 24 jam terakhir, jadi aplikasi guna cache tempatan untuk jimatkan kuota.',
  updateSuccess: '{{count}} harga dan kadar tukaran berjaya dikemas kini.',
  recordUpdated: 'Trade berjaya dikemas kini.',
  dataCleared: 'Data sudah dibersihkan dan set demo dimuat semula.',
  clearConfirm: 'Betul mahu padam semua data dan muat semula set demo? Sekali jalan, memang tak boleh patah balik.',
  backupConfirm: 'Sebelum padam, mahu eksport data semasa sebagai backup CSV dulu?'
}));

assignPatch(deepPatches, ['nl-NL', 'nl-BE'], buildDeepPatch({
  manualUpdatedAt: 'Handmatig overschreven: {{value}}',
  apiUpdatedAt: 'API-refresh: {{value}}',
  notUpdatedYet: 'Nog niet ververst',
  baseCurrencyTitle: 'Basisvaluta van de samenvatting',
  hideZeroHolding: 'Volledig gesloten posities verbergen',
  manualRecordTitle: 'Trade handmatig toevoegen',
  sourceCode: 'Open source: duik in de code, drop een idee of bouw meteen mee',
  dismiss: 'Niet meer tonen',
  apiKeySaved: 'API-sleutel opgeslagen.',
  needApiKey: 'Vul eerst je yfapi.net API-sleutel in bij instellingen voordat je koersen ververst.',
  cacheFresh: 'Koersen en FX zijn al binnen de laatste 24 uur bijgewerkt, dus de app heeft de lokale cache hergebruikt om quota te sparen.',
  updateSuccess: '{{count}} koersen en FX bijgewerkt.',
  recordUpdated: 'Trade bijgewerkt.',
  dataCleared: 'Data gewist en de demo opnieuw geladen.',
  clearConfirm: 'Alle data wissen en de demo opnieuw laden? Als je doorgaat, is er geen weg terug.',
  backupConfirm: 'Wil je vóór het wissen de huidige data als CSV-back-up exporteren?'
}));

assignPatch(deepPatches, ['fa-IR'], buildDeepPatch({
  manualUpdatedAt: 'اصلاح دستی: {{value}}',
  apiUpdatedAt: 'تازه‌سازی از API: {{value}}',
  notUpdatedYet: 'هنوز تازه‌سازی نشده',
  baseCurrencyTitle: 'ارز پایه خلاصه',
  hideZeroHolding: 'پنهان کردن موقعیت‌های کاملاً بسته‌شده',
  manualRecordTitle: 'ثبت دستی یک معامله',
  sourceCode: 'متن‌باز: کد را ببین، ایده بده یا مستقیم وارد کار شو',
  dismiss: 'دیگر نشان نده',
  apiKeySaved: 'کلید API ذخیره شد.',
  needApiKey: 'قبل از به‌روزرسانی قیمت‌ها، کلید API مربوط به yfapi.net را در بخش تنظیمات وارد کن.',
  cacheFresh: 'قیمت‌ها و نرخ‌های FX در ۲۴ ساعت گذشته به‌روز شده بودند؛ برای صرفه‌جویی در سهمیه، برنامه از کش محلی استفاده کرد.',
  updateSuccess: '{{count}} قیمت و نرخ FX به‌روزرسانی شد.',
  recordUpdated: 'معامله به‌روزرسانی شد.',
  dataCleared: 'داده‌ها پاک شد و مجموعه دمو دوباره بارگذاری شد.',
  clearConfirm: 'همه داده‌ها پاک شوند و دمو دوباره بارگذاری شود؟ اگر تأیید کنی، برگشتی در کار نیست.',
  backupConfirm: 'قبل از پاک کردن، می‌خواهی از داده‌های فعلی یک CSV پشتیبان بگیری؟'
}));

assignPatch(deepPatches, ['he-IL'], buildDeepPatch({
  manualUpdatedAt: 'דריסה ידנית: {{value}}',
  apiUpdatedAt: 'רענון API: {{value}}',
  notUpdatedYet: 'עוד לא רוענן',
  baseCurrencyTitle: 'מטבע בסיס לסיכום',
  hideZeroHolding: 'להסתיר פוזיציות שנסגרו לגמרי',
  manualRecordTitle: 'להוסיף עסקה ידנית',
  sourceCode: 'קוד פתוח: תיכנסו לקוד, תזרקו רעיון או פשוט תצטרפו',
  dismiss: 'אל תציג שוב',
  apiKeySaved: 'מפתח ה-API נשמר.',
  needApiKey: 'לפני רענון המחירים צריך להזין את מפתח ה-API של yfapi.net בהגדרות.',
  cacheFresh: 'המחירים ושערי ה-FX עודכנו ב-24 השעות האחרונות, אז האפליקציה השתמשה בקאש המקומי כדי לא לבזבז מכסה.',
  updateSuccess: '{{count}} מחירים ושערי FX עודכנו.',
  recordUpdated: 'העסקה עודכנה.',
  dataCleared: 'הנתונים נוקו וסט הדמו נטען מחדש.',
  clearConfirm: 'למחוק את כל הנתונים ולטעון מחדש את הדמו? אחרי אישור אין דרך חזרה.',
  backupConfirm: 'רוצה לייצא קודם את הנתונים הנוכחיים כגיבוי CSV לפני הניקוי?'
}));

assignPatch(deepPatches, ['es-419', 'es-AR', 'es-CL', 'es-CO', 'es-MX', 'es-PE', 'es-VE'], buildDeepPatch({
  manualUpdatedAt: 'Ajuste manual: {{value}}',
  apiUpdatedAt: 'Refresh vía API: {{value}}',
  notUpdatedYet: 'Todavía no se actualizó',
  baseCurrencyTitle: 'Moneda base del resumen',
  hideZeroHolding: 'Ocultar posiciones ya cerradas del todo',
  manualRecordTitle: 'Agregar trade manual',
  sourceCode: 'Código abierto: mira el repo, tira una idea o métete de una',
  dismiss: 'No mostrar otra vez',
  apiKeySaved: 'API key guardada.',
  needApiKey: 'Primero carga tu API key de yfapi.net en configuración y recién ahí refresca precios.',
  cacheFresh: 'Los precios y el FX ya se habían actualizado en las últimas 24 horas, así que la app reutilizó la caché local para ahorrar cuota.',
  updateSuccess: 'Se actualizaron {{count}} precios y tipos de cambio.',
  recordUpdated: 'Trade actualizado.',
  dataCleared: 'Se borraron los datos y se recargó el set demo.',
  clearConfirm: '¿Borrar todo y volver a cargar la demo? Si sigues, no hay vuelta atrás.',
  backupConfirm: '¿Quieres exportar los datos actuales como respaldo CSV antes de borrarlos?'
}));

assignPatch(deepPatches, ['es-ES'], buildDeepPatch({
  manualUpdatedAt: 'Ajuste manual: {{value}}',
  apiUpdatedAt: 'Refresco vía API: {{value}}',
  notUpdatedYet: 'Aún no se ha actualizado',
  baseCurrencyTitle: 'Moneda base del resumen',
  hideZeroHolding: 'Ocultar posiciones ya cerradas por completo',
  manualRecordTitle: 'Añadir operación manual',
  sourceCode: 'Código abierto: entra al repo, deja una idea o súmate directamente',
  dismiss: 'No volver a mostrar',
  apiKeySaved: 'Clave API guardada.',
  needApiKey: 'Primero mete tu clave de yfapi.net en ajustes y luego ya actualizas las cotizaciones.',
  cacheFresh: 'Los precios y el FX ya se actualizaron en las últimas 24 horas, así que la app reutilizó la caché local para ahorrar cuota.',
  updateSuccess: 'Se actualizaron {{count}} precios y tipos de cambio.',
  recordUpdated: 'Operación actualizada.',
  dataCleared: 'Datos borrados y demo recargada.',
  clearConfirm: '¿Borrar todos los datos y volver a cargar la demo? Si confirmas, no hay marcha atrás.',
  backupConfirm: '¿Quieres exportar los datos actuales como respaldo CSV antes de borrarlos?'
}));

assignPatch(deepPatches, ['pt-BR'], buildDeepPatch({
  manualUpdatedAt: 'Ajuste manual: {{value}}',
  apiUpdatedAt: 'Refresh via API: {{value}}',
  notUpdatedYet: 'Ainda não atualizou',
  baseCurrencyTitle: 'Moeda-base do resumo',
  hideZeroHolding: 'Ocultar posições já zeradas de vez',
  manualRecordTitle: 'Adicionar trade manual',
  sourceCode: 'Código aberto: entra no repo, manda uma ideia ou já chega contribuindo',
  dismiss: 'Não mostrar de novo',
  apiKeySaved: 'Chave API salva.',
  needApiKey: 'Preencha primeiro a chave do yfapi.net nas configurações antes de atualizar as cotações.',
  cacheFresh: 'Preços e câmbio já tinham sido atualizados nas últimas 24 horas, então o app reaproveitou o cache local para não gastar quota à toa.',
  updateSuccess: '{{count}} preços e taxas FX atualizados.',
  recordUpdated: 'Trade atualizado.',
  dataCleared: 'Os dados foram limpos e o conjunto demo foi carregado de novo.',
  clearConfirm: 'Apagar tudo e recarregar a demo? Depois de confirmar, não tem volta.',
  backupConfirm: 'Quer exportar os dados atuais como backup CSV antes de apagar tudo?'
}));

assignPatch(deepPatches, ['pt-PT'], buildDeepPatch({
  manualUpdatedAt: 'Ajuste manual: {{value}}',
  apiUpdatedAt: 'Refresh via API: {{value}}',
  notUpdatedYet: 'Ainda não foi atualizado',
  baseCurrencyTitle: 'Moeda-base do resumo',
  hideZeroHolding: 'Ocultar posições já totalmente encerradas',
  manualRecordTitle: 'Adicionar operação manual',
  sourceCode: 'Código aberto: entra no repositório, deixa uma ideia ou junta-te já',
  dismiss: 'Não mostrar novamente',
  apiKeySaved: 'Chave API guardada.',
  needApiKey: 'Introduz primeiro a tua chave do yfapi.net nas definições antes de atualizares as cotações.',
  cacheFresh: 'Os preços e o FX já tinham sido atualizados nas últimas 24 horas, por isso a app reutilizou a cache local para poupar quota.',
  updateSuccess: '{{count}} preços e taxas FX atualizados.',
  recordUpdated: 'Operação atualizada.',
  dataCleared: 'Os dados foram limpos e o conjunto demo voltou a ser carregado.',
  clearConfirm: 'Apagar todos os dados e voltar a carregar a demo? Depois de confirmares, não há volta atrás.',
  backupConfirm: 'Queres exportar os dados atuais como backup CSV antes de apagar tudo?'
}));

assignPatch(deepPatches, ['pl-PL'], buildDeepPatch({
  manualUpdatedAt: 'Ręczna korekta: {{value}}',
  apiUpdatedAt: 'Odświeżono przez API: {{value}}',
  notUpdatedYet: 'Jeszcze nie odświeżono',
  baseCurrencyTitle: 'Waluta bazowa podsumowania',
  hideZeroHolding: 'Ukryj pozycje zamknięte do zera',
  manualRecordTitle: 'Dodaj trade ręcznie',
  sourceCode: 'Open source: zajrzyj do kodu, wrzuć pomysł albo od razu dołącz',
  dismiss: 'Nie pokazuj ponownie',
  apiKeySaved: 'Klucz API zapisany.',
  needApiKey: 'Najpierw wpisz klucz API z yfapi.net w ustawieniach, a dopiero potem odśwież kursy.',
  cacheFresh: 'Ceny i kursy FX były już aktualizowane w ostatnich 24 godzinach, więc aplikacja użyła lokalnej pamięci podręcznej, żeby nie przepalać limitu.',
  updateSuccess: 'Zaktualizowano {{count}} cen i kursów FX.',
  recordUpdated: 'Trade został zaktualizowany.',
  dataCleared: 'Dane wyczyszczone, demo wczytane od nowa.',
  clearConfirm: 'Wyczyścić wszystko i ponownie załadować demo? Po potwierdzeniu nie będzie odwrotu.',
  backupConfirm: 'Chcesz przed czyszczeniem wyeksportować bieżące dane jako kopię CSV?'
}));

assignPatch(deepPatches, ['tr-TR'], buildDeepPatch({
  manualUpdatedAt: 'Manuel düzeltme: {{value}}',
  apiUpdatedAt: 'API yenilemesi: {{value}}',
  notUpdatedYet: 'Henüz yenilenmedi',
  baseCurrencyTitle: 'Özetin baz para birimi',
  hideZeroHolding: 'Tamamen kapanmış pozisyonları gizle',
  manualRecordTitle: 'Elle trade ekle',
  sourceCode: 'Açık kaynak: koda bak, fikir bırak ya da direkt dalıp katkı ver',
  dismiss: 'Bir daha gösterme',
  apiKeySaved: 'API anahtarı kaydedildi.',
  needApiKey: 'Fiyatları yenilemeden önce ayarlardan yfapi.net API anahtarını gir.',
  cacheFresh: 'Fiyatlar ve FX son 24 saat içinde zaten güncellenmişti; uygulama da kotayı korumak için yerel önbelleği kullandı.',
  updateSuccess: '{{count}} fiyat ve FX değeri güncellendi.',
  recordUpdated: 'Trade güncellendi.',
  dataCleared: 'Veriler temizlendi ve demo seti yeniden yüklendi.',
  clearConfirm: 'Tüm verileri silip demo setini yeniden yüklemek istiyor musun? Onaylarsan geri dönüş yok.',
  backupConfirm: 'Silmeden önce mevcut verileri CSV yedeği olarak dışa aktarmak ister misin?'
}));

assignPatch(deepPatches, ['hi-IN'], buildDeepPatch({
  manualUpdatedAt: 'मैनुअल ओवरराइड: {{value}}',
  apiUpdatedAt: 'API रिफ्रेश: {{value}}',
  notUpdatedYet: 'अभी तक रिफ्रेश नहीं हुआ',
  baseCurrencyTitle: 'समरी की बेस करेंसी',
  hideZeroHolding: 'पूरी तरह exit हो चुकी holdings छिपाएँ',
  manualRecordTitle: 'हाथ से एक trade जोड़ें',
  sourceCode: 'ओपन सोर्स: कोड देखो, आइडिया फेंको, या सीधे योगदान दे दो',
  dismiss: 'अब यह मत दिखाना',
  apiKeySaved: 'API key सेव हो गई।',
  needApiKey: 'भाव रिफ्रेश करने से पहले settings में yfapi.net API key डालनी होगी।',
  cacheFresh: 'पिछले 24 घंटों में prices और FX rates अपडेट हो चुके थे, इसलिए app ने local cache दोबारा इस्तेमाल किया और quota बचा लिया।',
  updateSuccess: '{{count}} prices और FX rates अपडेट हो गए।',
  recordUpdated: 'Trade अपडेट हो गया।',
  dataCleared: 'डेटा साफ कर दिया गया और demo set फिर से लोड हो गया।',
  clearConfirm: 'सारा डेटा साफ करके demo set फिर से लोड करना है? एक बार हाँ कहा तो वापस नहीं होगा।',
  backupConfirm: 'साफ करने से पहले क्या मौजूदा डेटा CSV backup के रूप में एक्सपोर्ट करना है?'
}));

assignPatch(deepPatches, ['ru-RU'], buildDeepPatch({
  manualUpdatedAt: 'Ручная правка: {{value}}',
  apiUpdatedAt: 'Обновлено через API: {{value}}',
  notUpdatedYet: 'Ещё не обновлялось',
  baseCurrencyTitle: 'Базовая валюта сводки',
  hideZeroHolding: 'Скрыть позиции, закрытые в ноль',
  manualRecordTitle: 'Добавить сделку вручную',
  sourceCode: 'Open source: заходите в код, кидайте идеи или сразу подключайтесь',
  dismiss: 'Больше не показывать',
  apiKeySaved: 'API key сохранён.',
  needApiKey: 'Сначала добавьте API key от yfapi.net в настройках, а уже потом обновляйте котировки.',
  cacheFresh: 'Цены и FX уже обновлялись за последние 24 часа, поэтому приложение повторно использовало локальный кэш и сэкономило квоту.',
  updateSuccess: 'Обновлено {{count}} цен и FX-курсов.',
  recordUpdated: 'Сделка обновлена.',
  dataCleared: 'Данные очищены, демо-набор загружен заново.',
  clearConfirm: 'Очистить все данные и снова загрузить демо? После подтверждения пути назад не будет.',
  backupConfirm: 'Хотите перед очисткой выгрузить текущие данные в CSV как резервную копию?'
}));

assignPatch(deepPatches, ['sv-SE'], buildDeepPatch({
  manualUpdatedAt: 'Manuell korrigering: {{value}}',
  apiUpdatedAt: 'API-refresh: {{value}}',
  notUpdatedYet: 'Inte uppdaterad än',
  baseCurrencyTitle: 'Basvaluta för översikten',
  hideZeroHolding: 'Dölj innehav som är helt stängda',
  manualRecordTitle: 'Lägg in en trade manuellt',
  sourceCode: 'Open source: kika i koden, släng in en idé eller hoppa med direkt',
  dismiss: 'Visa inte igen',
  apiKeySaved: 'API-nyckeln sparades.',
  needApiKey: 'Lägg in din API-nyckel från yfapi.net i inställningarna innan du uppdaterar kurser.',
  cacheFresh: 'Kurser och FX hade redan uppdaterats inom de senaste 24 timmarna, så appen återanvände lokal cache för att spara kvot.',
  updateSuccess: '{{count}} priser och FX-nivåer uppdaterades.',
  recordUpdated: 'Trade uppdaterad.',
  dataCleared: 'Datan rensades och demosetet laddades om.',
  clearConfirm: 'Rensa all data och ladda om demosetet? Bekräftar du nu finns ingen ångra-knapp.',
  backupConfirm: 'Vill du exportera nuvarande data som CSV-backup innan du rensar?'
}));

assignPatch(deepPatches, ['cs-CZ'], buildDeepPatch({
  manualUpdatedAt: 'Ruční přepis: {{value}}',
  apiUpdatedAt: 'Obnoveno přes API: {{value}}',
  notUpdatedYet: 'Ještě neobnoveno',
  baseCurrencyTitle: 'Základní měna přehledu',
  hideZeroHolding: 'Skrýt úplně zavřené pozice',
  manualRecordTitle: 'Přidat trade ručně',
  sourceCode: 'Open source: mrkni do kódu, hoď nápad nebo se rovnou přidej',
  dismiss: 'Už nezobrazovat',
  apiKeySaved: 'API klíč uložen.',
  needApiKey: 'Než obnovíš ceny, zadej v nastavení API klíč pro yfapi.net.',
  cacheFresh: 'Kurzy a FX se aktualizovaly během posledních 24 hodin, takže aplikace znovu použila lokální cache a šetřila limit.',
  updateSuccess: 'Aktualizováno {{count}} cen a FX sazeb.',
  recordUpdated: 'Trade byl aktualizován.',
  dataCleared: 'Data byla vyčištěna a demo znovu načteno.',
  clearConfirm: 'Smazat všechna data a znovu nahrát demo? Po potvrzení už není cesty zpět.',
  backupConfirm: 'Chceš před čištěním exportovat aktuální data jako CSV zálohu?'
}));

assignPatch(deepPatches, ['et-EE'], buildDeepPatch({
  manualUpdatedAt: 'Käsitsi üle kirjutatud: {{value}}',
  apiUpdatedAt: 'API värskendus: {{value}}',
  notUpdatedYet: 'Pole veel värskendatud',
  baseCurrencyTitle: 'Kokkuvõtte baasvaluuta',
  hideZeroHolding: 'Peida täielikult suletud positsioonid',
  manualRecordTitle: 'Lisa trade käsitsi',
  sourceCode: 'Avatud lähtekood: vaata koodi, paku idee või tule kohe kaasa',
  dismiss: 'Ära enam näita',
  apiKeySaved: 'API-võti salvestati.',
  needApiKey: 'Enne hindade värskendamist sisesta seadetes yfapi.net API-võti.',
  cacheFresh: 'Hinnad ja valuutakursid olid juba viimase 24 tunni jooksul uuendatud, nii et rakendus kasutas kohaliku vahemälu uuesti ära ja säästis limiiti.',
  updateSuccess: '{{count}} hinda ja valuutakurssi uuendati.',
  recordUpdated: 'Trade uuendati.',
  dataCleared: 'Andmed puhastati ja demo laeti uuesti sisse.',
  clearConfirm: 'Kas kustutada kõik andmed ja laadida demo uuesti? Kui kinnitad, siis tagasiteed ei ole.',
  backupConfirm: 'Kas soovid enne puhastamist eksportida praegused andmed CSV-varukoopiana?'
}));

assignPatch(deepPatches, ['is-IS'], buildDeepPatch({
  manualUpdatedAt: 'Handvirk yfirskrift: {{value}}',
  apiUpdatedAt: 'API-endurnýjun: {{value}}',
  notUpdatedYet: 'Ekki endurnýjað enn',
  baseCurrencyTitle: 'Grunngjaldmiðill yfirlits',
  hideZeroHolding: 'Fela stöður sem eru alveg lokaðar',
  manualRecordTitle: 'Bæta handvirkt við trade',
  sourceCode: 'Opinn hugbúnaður: skoðaðu kóðann, sendu hugmynd eða hoppaðu beint inn',
  dismiss: 'Ekki sýna aftur',
  apiKeySaved: 'API-lykill vistaður.',
  needApiKey: 'Settu yfapi.net API-lykilinn inn í stillingarnar áður en þú uppfærir verð.',
  cacheFresh: 'Verð og gjaldeyrisgengi höfðu þegar verið uppfærð síðustu 24 klukkustundir, þannig að appið endurnotaði staðbundið skyndiminni og sparaði kvóta.',
  updateSuccess: '{{count}} verð og FX-gildi voru uppfærð.',
  recordUpdated: 'Trade var uppfærð.',
  dataCleared: 'Gögn voru hreinsuð og demo-settið hlaðið aftur inn.',
  clearConfirm: 'Viltu hreinsa öll gögn og hlaða demóinu aftur? Ef þú staðfestir er ekki hægt að bakka út.',
  backupConfirm: 'Viltu flytja út núverandi gögn sem CSV-afrit áður en þau eru hreinsuð?'
}));

assignPatch(deepPatches, ['ro-RO'], buildDeepPatch({
  manualUpdatedAt: 'Corecție manuală: {{value}}',
  apiUpdatedAt: 'Refresh prin API: {{value}}',
  notUpdatedYet: 'Încă nereîmprospătat',
  baseCurrencyTitle: 'Moneda de bază a rezumatului',
  hideZeroHolding: 'Ascunde pozițiile închise complet',
  manualRecordTitle: 'Adaugă un trade manual',
  sourceCode: 'Open source: uită-te în cod, aruncă o idee sau intră direct în joc',
  dismiss: 'Nu mai afișa',
  apiKeySaved: 'API key salvat.',
  needApiKey: 'Pune mai întâi cheia yfapi.net în setări, apoi actualizează cotațiile.',
  cacheFresh: 'Prețurile și cursurile FX au fost deja actualizate în ultimele 24 de ore, așa că aplicația a refolosit cache-ul local și a economisit din cotă.',
  updateSuccess: '{{count}} prețuri și cursuri FX actualizate.',
  recordUpdated: 'Trade actualizat.',
  dataCleared: 'Datele au fost curățate și demo-ul a fost încărcat din nou.',
  clearConfirm: 'Ștergem tot și reîncărcăm demo-ul? După confirmare nu mai există cale de întoarcere.',
  backupConfirm: 'Vrei să exporți datele curente ca backup CSV înainte de ștergere?'
}));

assignPatch(deepPatches, ['hu-HU'], buildDeepPatch({
  manualUpdatedAt: 'Kézi felülírás: {{value}}',
  apiUpdatedAt: 'API-frissítés: {{value}}',
  notUpdatedYet: 'Még nincs frissítve',
  baseCurrencyTitle: 'Az összegzés alapdevizája',
  hideZeroHolding: 'A teljesen lezárt pozíciók elrejtése',
  manualRecordTitle: 'Trade kézi rögzítése',
  sourceCode: 'Open source: nézz bele a kódba, dobj egy ötletet, vagy csatlakozz rögtön',
  dismiss: 'Ne mutasd újra',
  apiKeySaved: 'API-kulcs elmentve.',
  needApiKey: 'Árfrissítés előtt add meg a yfapi.net API-kulcsot a beállítások között.',
  cacheFresh: 'Az árak és FX-ek már frissültek az elmúlt 24 órában, így az app a helyi cache-t használta újra, hogy spóroljon a kerettel.',
  updateSuccess: '{{count}} ár és FX érték frissült.',
  recordUpdated: 'Trade frissítve.',
  dataCleared: 'Az adatok törölve lettek, a demó újratöltve.',
  clearConfirm: 'Töröljünk mindent és töltsük újra a demót? Ha most rábólintasz, nincs visszaút.',
  backupConfirm: 'Törlés előtt szeretnéd CSV-mentésként exportálni a jelenlegi adatokat?'
}));

assignPatch(deepPatches, ['da-DK'], buildDeepPatch({
  manualUpdatedAt: 'Manuel overskrivning: {{value}}',
  apiUpdatedAt: 'API-refresh: {{value}}',
  notUpdatedYet: 'Ikke opdateret endnu',
  baseCurrencyTitle: 'Basisvaluta for oversigten',
  hideZeroHolding: 'Skjul positioner, der er helt lukket',
  manualRecordTitle: 'Tilføj trade manuelt',
  sourceCode: 'Open source: kig i koden, smid en idé eller hop bare med',
  dismiss: 'Vis ikke igen',
  apiKeySaved: 'API-nøglen er gemt.',
  needApiKey: 'Indtast først din API-nøgle fra yfapi.net i indstillingerne, før du opdaterer kurser.',
  cacheFresh: 'Kurser og FX var allerede opdateret inden for de seneste 24 timer, så appen genbrugte lokal cache og sparede kvote.',
  updateSuccess: '{{count}} priser og FX-rater blev opdateret.',
  recordUpdated: 'Trade blev opdateret.',
  dataCleared: 'Data blev ryddet, og demoen blev indlæst igen.',
  clearConfirm: 'Vil du rydde alle data og genindlæse demoen? Når du bekræfter, er der ingen vej tilbage.',
  backupConfirm: 'Vil du eksportere de nuværende data som CSV-backup, før du rydder dem?'
}));

assignPatch(deepPatches, ['el-GR'], buildDeepPatch({
  manualUpdatedAt: 'Χειροκίνητη παράκαμψη: {{value}}',
  apiUpdatedAt: 'Ανανέωση μέσω API: {{value}}',
  notUpdatedYet: 'Δεν έχει γίνει ακόμη ανανέωση',
  baseCurrencyTitle: 'Βασικό νόμισμα σύνοψης',
  hideZeroHolding: 'Απόκρυψη θέσεων που έχουν κλείσει πλήρως',
  manualRecordTitle: 'Προσθήκη trade χειροκίνητα',
  sourceCode: 'Open source: δες τον κώδικα, πέτα μια ιδέα ή μπες κατευθείαν στο παιχνίδι',
  dismiss: 'Να μην εμφανιστεί ξανά',
  apiKeySaved: 'Το API key αποθηκεύτηκε.',
  needApiKey: 'Βάλε πρώτα το API key του yfapi.net στις ρυθμίσεις πριν ανανεώσεις τις τιμές.',
  cacheFresh: 'Οι τιμές και τα FX είχαν ήδη ενημερωθεί μέσα στις τελευταίες 24 ώρες, οπότε η εφαρμογή ξαναχρησιμοποίησε το τοπικό cache και γλίτωσε quota.',
  updateSuccess: 'Ενημερώθηκαν {{count}} τιμές και FX.',
  recordUpdated: 'Το trade ενημερώθηκε.',
  dataCleared: 'Τα δεδομένα καθαρίστηκαν και το demo φορτώθηκε ξανά.',
  clearConfirm: 'Να καθαριστούν όλα τα δεδομένα και να ξαναφορτωθεί το demo; Αν το επιβεβαιώσεις, δεν υπάρχει επιστροφή.',
  backupConfirm: 'Θέλεις να εξαγάγεις τα τωρινά δεδομένα σε CSV backup πριν τον καθαρισμό;'
}));

assignPatch(deepPatches, ['lv-LV'], buildDeepPatch({
  manualUpdatedAt: 'Manuāla pārrakstīšana: {{value}}',
  apiUpdatedAt: 'API atsvaidze: {{value}}',
  notUpdatedYet: 'Vēl nav atsvaidzināts',
  baseCurrencyTitle: 'Kopsavilkuma bāzes valūta',
  hideZeroHolding: 'Paslēpt pozīcijas, kas ir pilnībā aizvērtas',
  manualRecordTitle: 'Pievienot trade manuāli',
  sourceCode: 'Atvērtais kods: ieskaties kodā, iemet ideju vai pievienojies uzreiz',
  dismiss: 'Vairs nerādīt',
  apiKeySaved: 'API atslēga saglabāta.',
  needApiKey: 'Pirms cenu atjaunināšanas iestatījumos ievadi yfapi.net API atslēgu.',
  cacheFresh: 'Cenas un valūtu kursi jau tika atjaunināti pēdējo 24 stundu laikā, tāpēc lietotne atkārtoti izmantoja lokālo kešatmiņu un ietaupīja limitu.',
  updateSuccess: 'Atjauninātas {{count}} cenas un FX kursi.',
  recordUpdated: 'Trade ieraksts atjaunināts.',
  dataCleared: 'Dati notīrīti un demo ielādēts no jauna.',
  clearConfirm: 'Notīrīt visus datus un no jauna ielādēt demo? Pēc apstiprināšanas atpakaļceļa vairs nebūs.',
  backupConfirm: 'Vai pirms tīrīšanas vēlies eksportēt pašreizējos datus kā CSV rezerves kopiju?'
}));

assignPatch(deepPatches, ['lt-LT'], buildDeepPatch({
  manualUpdatedAt: 'Rankinis perrašymas: {{value}}',
  apiUpdatedAt: 'API atnaujinimas: {{value}}',
  notUpdatedYet: 'Dar neatnaujinta',
  baseCurrencyTitle: 'Suvestinės bazinė valiuta',
  hideZeroHolding: 'Slėpti visiškai uždarytas pozicijas',
  manualRecordTitle: 'Pridėti trade ranka',
  sourceCode: 'Atvirasis kodas: pažiūrėk į kodą, numesk idėją arba prisijunk iškart',
  dismiss: 'Daugiau nerodyti',
  apiKeySaved: 'API raktas išsaugotas.',
  needApiKey: 'Prieš atnaujindamas kainas, nustatymuose įvesk yfapi.net API raktą.',
  cacheFresh: 'Kainos ir FX jau buvo atnaujinti per paskutines 24 valandas, todėl programa pakartotinai panaudojo vietinį podėlį ir sutaupė limitą.',
  updateSuccess: 'Atnaujinta {{count}} kainų ir FX reikšmių.',
  recordUpdated: 'Trade įrašas atnaujintas.',
  dataCleared: 'Duomenys išvalyti, demo įkelta iš naujo.',
  clearConfirm: 'Ar išvalyti visus duomenis ir iš naujo įkelti demo? Patvirtinus kelio atgal nebebus.',
  backupConfirm: 'Ar prieš išvalydamas nori eksportuoti dabartinius duomenis kaip CSV atsarginę kopiją?'
}));

assignPatch(deepPatches, ['nb-NO'], buildDeepPatch({
  manualUpdatedAt: 'Manuell overstyring: {{value}}',
  apiUpdatedAt: 'API-refresh: {{value}}',
  notUpdatedYet: 'Ikke oppdatert ennå',
  baseCurrencyTitle: 'Basisvaluta for oppsummeringen',
  hideZeroHolding: 'Skjul posisjoner som er helt lukket',
  manualRecordTitle: 'Legg til trade manuelt',
  sourceCode: 'Open source: se i koden, kast inn en idé eller bli med med én gang',
  dismiss: 'Ikke vis igjen',
  apiKeySaved: 'API-nøkkelen er lagret.',
  needApiKey: 'Legg først inn API-nøkkelen fra yfapi.net i innstillingene før du oppdaterer kurser.',
  cacheFresh: 'Kurser og valutakurser hadde allerede blitt oppdatert i løpet av de siste 24 timene, så appen brukte lokal cache på nytt og sparte kvote.',
  updateSuccess: '{{count}} priser og valutakurser ble oppdatert.',
  recordUpdated: 'Trade ble oppdatert.',
  dataCleared: 'Data ble tømt og demoen ble lastet inn på nytt.',
  clearConfirm: 'Vil du slette alle data og laste inn demoen på nytt? Bekrefter du nå, er det ingen vei tilbake.',
  backupConfirm: 'Vil du eksportere dagens data som CSV-backup før sletting?'
}));

assignPatch(deepPatches, ['fi-FI'], buildDeepPatch({
  manualUpdatedAt: 'Manuaalinen yliajo: {{value}}',
  apiUpdatedAt: 'API-päivitys: {{value}}',
  notUpdatedYet: 'Ei vielä päivitetty',
  baseCurrencyTitle: 'Yhteenvedon perusvaluutta',
  hideZeroHolding: 'Piilota kokonaan suljetut positiot',
  manualRecordTitle: 'Lisää trade käsin',
  sourceCode: 'Avoin lähdekoodi: käy kurkkaamassa koodia, heitä idea tai tule suoraan mukaan',
  dismiss: 'Älä näytä uudelleen',
  apiKeySaved: 'API-avain tallennettu.',
  needApiKey: 'Syötä ensin yfapi.netin API-avain asetuksiin ennen hintojen päivittämistä.',
  cacheFresh: 'Hinnat ja FX oli jo päivitetty viimeisen 24 tunnin aikana, joten sovellus käytti paikallista välimuistia uudelleen ja säästi kiintiötä.',
  updateSuccess: '{{count}} hintaa ja FX-arvoa päivitettiin.',
  recordUpdated: 'Trade päivitettiin.',
  dataCleared: 'Data tyhjennettiin ja demo ladattiin uudelleen.',
  clearConfirm: 'Poistetaanko kaikki tiedot ja ladataanko demo uudelleen? Kun vahvistat, paluuta ei enää ole.',
  backupConfirm: 'Haluatko viedä nykyiset tiedot CSV-varmuuskopioksi ennen tyhjennystä?'
}));

assignPatch(deepPatches, ['fil-PH'], buildDeepPatch({
  manualUpdatedAt: 'Manual override: {{value}}',
  apiUpdatedAt: 'API refresh: {{value}}',
  notUpdatedYet: 'Hindi pa nare-refresh',
  baseCurrencyTitle: 'Base currency ng summary',
  hideZeroHolding: 'Itago ang mga posisyong fully closed na',
  manualRecordTitle: 'Magdagdag ng trade nang mano-mano',
  sourceCode: 'Open source: silipin ang code, maghulog ng idea, o sumabak na agad',
  dismiss: 'Huwag na itong ipakita ulit',
  apiKeySaved: 'Na-save na ang API key.',
  needApiKey: 'Ilagay muna ang yfapi.net API key sa settings bago mag-refresh ng prices.',
  cacheFresh: 'Na-update na ang prices at FX sa loob ng huling 24 oras, kaya ni-reuse ng app ang local cache para makatipid sa quota.',
  updateSuccess: 'Na-update ang {{count}} prices at FX.',
  recordUpdated: 'Na-update ang trade.',
  dataCleared: 'Na-clear ang data at ni-reload ang demo set.',
  clearConfirm: 'Buburahin ba ang lahat ng data at ire-reload ang demo? Kapag tinuloy mo, wala nang balikan.',
  backupConfirm: 'Gusto mo bang i-export muna ang kasalukuyang data bilang CSV backup bago i-clear?'
}));

assignPatch(deepPatches, ['vi-VN'], buildDeepPatch({
  manualUpdatedAt: 'Ghi đè thủ công: {{value}}',
  apiUpdatedAt: 'Làm mới qua API: {{value}}',
  notUpdatedYet: 'Chưa làm mới',
  baseCurrencyTitle: 'Đồng tiền gốc của phần tổng quan',
  hideZeroHolding: 'Ẩn các vị thế đã đóng hẳn',
  manualRecordTitle: 'Thêm một giao dịch thủ công',
  sourceCode: 'Mã nguồn mở: ghé xem code, quăng ý tưởng hoặc nhảy vào góp tay luôn',
  dismiss: 'Đừng hiện lại nữa',
  apiKeySaved: 'Đã lưu API key.',
  needApiKey: 'Hãy nhập API key của yfapi.net trong phần cài đặt trước khi làm mới giá.',
  cacheFresh: 'Giá và tỷ giá đã được cập nhật trong 24 giờ gần đây, nên ứng dụng tái dùng cache cục bộ để đỡ tốn quota.',
  updateSuccess: 'Đã cập nhật {{count}} mức giá và tỷ giá.',
  recordUpdated: 'Đã cập nhật giao dịch.',
  dataCleared: 'Dữ liệu đã được dọn sạch và bộ demo đã được nạp lại.',
  clearConfirm: 'Bạn có chắc muốn xóa toàn bộ dữ liệu và nạp lại demo không? Đã bấm là không quay đầu được đâu.',
  backupConfirm: 'Trước khi xóa, bạn có muốn xuất dữ liệu hiện tại thành CSV để sao lưu không?'
}));

assignPatch(deepPatches, ['th-TH'], buildDeepPatch({
  manualUpdatedAt: 'แก้มือเอง: {{value}}',
  apiUpdatedAt: 'รีเฟรชผ่าน API: {{value}}',
  notUpdatedYet: 'ยังไม่ได้รีเฟรช',
  baseCurrencyTitle: 'สกุลหลักของภาพรวม',
  hideZeroHolding: 'ซ่อนสถานะที่ปิดหมดแล้ว',
  manualRecordTitle: 'เพิ่มรายการซื้อขายด้วยมือ',
  sourceCode: 'โอเพนซอร์ส: แวะดูโค้ด โยนไอเดีย หรือจะลงมือช่วยเลยก็ได้',
  dismiss: 'ไม่ต้องเด้งอีก',
  apiKeySaved: 'บันทึก API key เรียบร้อยแล้ว',
  needApiKey: 'ก่อนรีเฟรชราคา กรุณาใส่ API key ของ yfapi.net ในหน้าตั้งค่าก่อน',
  cacheFresh: 'ราคาหุ้นและอัตราแลกเปลี่ยนเพิ่งอัปเดตภายใน 24 ชั่วโมงที่ผ่านมา รอบนี้เลยใช้แคชในเครื่องต่อเพื่อช่วยประหยัดโควตา',
  updateSuccess: 'อัปเดตราคาและอัตราแลกเปลี่ยน {{count}} รายการเรียบร้อยแล้ว',
  recordUpdated: 'อัปเดตรายการซื้อขายแล้ว',
  dataCleared: 'ล้างข้อมูลและโหลดชุดเดโมใหม่เรียบร้อยแล้ว',
  clearConfirm: 'แน่ใจไหมว่าจะล้างข้อมูลทั้งหมดแล้วโหลดเดโมใหม่? กดยืนยันแล้วไม่มีปุ่มย้อนกลับนะ',
  backupConfirm: 'ก่อนล้างข้อมูล ต้องการส่งออกข้อมูลปัจจุบันเป็น CSV เก็บไว้ก่อนหรือไม่?'
}));

assignPatch(deepPatches, ['ar-SA', 'ar-EG', 'ar-AE', 'ar-KW', 'ar-QA'], buildDeepPatch({
  manualUpdatedAt: 'تعديل يدوي: {{value}}',
  apiUpdatedAt: 'تحديث عبر API: {{value}}',
  notUpdatedYet: 'لم يتم التحديث بعد',
  baseCurrencyTitle: 'العملة الأساسية للملخص',
  hideZeroHolding: 'إخفاء المراكز التي أُغلقت بالكامل',
  manualRecordTitle: 'إضافة صفقة يدوية',
  sourceCode: 'مفتوح المصدر: ادخل على الكود، ارمِ فكرة، أو شارك مباشرة',
  dismiss: 'لا تعرضها مرة أخرى',
  apiKeySaved: 'تم حفظ مفتاح API.',
  needApiKey: 'أدخل أولاً مفتاح yfapi.net في الإعدادات قبل تحديث الأسعار.',
  cacheFresh: 'الأسعار وأسعار الصرف تم تحديثها خلال آخر 24 ساعة، لذلك أعاد التطبيق استخدام التخزين المحلي لتوفير الحصة.',
  updateSuccess: 'تم تحديث {{count}} سعرًا وقيم FX.',
  recordUpdated: 'تم تحديث الصفقة.',
  dataCleared: 'تم مسح البيانات وإعادة تحميل مجموعة الديمو.',
  clearConfirm: 'هل تريد مسح كل البيانات وإعادة تحميل الديمو؟ إذا أكدت الآن فلن يكون هناك رجوع.',
  backupConfirm: 'هل تريد تصدير البيانات الحالية كنسخة CSV احتياطية قبل المسح؟'
}));

assignPatch(deepPatches, ['ur-PK'], buildDeepPatch({
  manualUpdatedAt: 'manual override: {{value}}',
  apiUpdatedAt: 'API refresh: {{value}}',
  notUpdatedYet: 'ابھی refresh نہیں ہوا',
  baseCurrencyTitle: 'summary کی base currency',
  hideZeroHolding: 'مکمل بند positions چھپائیں',
  manualRecordTitle: 'ایک manual trade شامل کریں',
  sourceCode: 'Open source: code دیکھیں، idea دیں، یا سیدھا شامل ہو جائیں',
  dismiss: 'اب دوبارہ نہ دکھائیں',
  apiKeySaved: 'API key محفوظ ہو گئی۔',
  needApiKey: 'prices refresh کرنے سے پہلے settings میں yfapi.net API key ڈالیں۔',
  cacheFresh: 'prices اور FX rates پچھلے 24 گھنٹوں میں اپڈیٹ ہو چکے تھے، اس لیے app نے local cache دوبارہ استعمال کر کے quota بچا لیا۔',
  updateSuccess: '{{count}} prices اور FX rates اپڈیٹ ہو گئے۔',
  recordUpdated: 'trade اپڈیٹ ہو گئی۔',
  dataCleared: 'data صاف کر کے demo set دوبارہ لوڈ کر دیا گیا۔',
  clearConfirm: 'کیا تمام data صاف کر کے demo set دوبارہ لوڈ کرنا ہے؟ ایک بار ہاں کہہ دی تو واپسی نہیں۔',
  backupConfirm: 'صاف کرنے سے پہلے کیا موجودہ data کو CSV backup کے طور پر export کرنا چاہتے ہیں؟'
}));

extendPatch(deepPatches, ['zh-TW'], buildTableControlPatch({
  sortSelectorTitle: '排序方式',
  sortDirectionAscending: '升冪',
  sortDirectionDescending: '降冪',
  latestTradeDate: '最後交易日期',
  marketFilterTitle: '目前資料中的市場'
}));

extendPatch(deepPatches, ['yue-Hant-HK'], buildTableControlPatch({
  sortSelectorTitle: '排序方式',
  sortDirectionAscending: '由細到大',
  sortDirectionDescending: '由大到細',
  latestTradeDate: '最後交易日期',
  marketFilterTitle: '而家資料入面嘅市場'
}));

extendPatch(deepPatches, ['zh-CN', 'zh-SG'], buildTableControlPatch({
  sortSelectorTitle: '排序方式',
  sortDirectionAscending: '升序',
  sortDirectionDescending: '降序',
  latestTradeDate: '最后交易日期',
  marketFilterTitle: '当前数据中的市场'
}));

extendPatch(deepPatches, ['en-US', 'en-CA', 'en-AU', 'en-GB', 'en-IE', 'en-NZ', 'en-SG', 'en-ZA'], buildTableControlPatch({
  sortSelectorTitle: 'Sort by',
  sortDirectionAscending: 'Ascending',
  sortDirectionDescending: 'Descending',
  latestTradeDate: 'Last trade date',
  marketFilterTitle: 'Markets in current data'
}));

extendPatch(deepPatches, ['ja-JP'], buildTableControlPatch({
  sortSelectorTitle: '並び替え',
  sortDirectionAscending: '昇順',
  sortDirectionDescending: '降順',
  latestTradeDate: '最終取引日',
  marketFilterTitle: '現在のデータにある市場'
}));

extendPatch(deepPatches, ['ko-KR'], buildTableControlPatch({
  sortSelectorTitle: '정렬 기준',
  sortDirectionAscending: '오름차순',
  sortDirectionDescending: '내림차순',
  latestTradeDate: '마지막 거래일',
  marketFilterTitle: '현재 데이터에 있는 시장'
}));

extendPatch(deepPatches, ['id-ID'], buildTableControlPatch({
  sortSelectorTitle: 'Urutkan menurut',
  sortDirectionAscending: 'Naik',
  sortDirectionDescending: 'Turun',
  latestTradeDate: 'Tanggal transaksi terakhir',
  marketFilterTitle: 'Pasar dalam data saat ini'
}));

extendPatch(deepPatches, ['fr-FR', 'fr-BE', 'fr-CA', 'fr-CH'], buildTableControlPatch({
  sortSelectorTitle: 'Trier par',
  sortDirectionAscending: 'Croissant',
  sortDirectionDescending: 'Décroissant',
  latestTradeDate: 'Dernière date de transaction',
  marketFilterTitle: 'Marchés présents dans les données'
}));

extendPatch(deepPatches, ['de-DE', 'de-AT', 'de-CH'], buildTableControlPatch({
  sortSelectorTitle: 'Sortieren nach',
  sortDirectionAscending: 'Aufsteigend',
  sortDirectionDescending: 'Absteigend',
  latestTradeDate: 'Letztes Handelsdatum',
  marketFilterTitle: 'Märkte in den aktuellen Daten'
}));

extendPatch(deepPatches, ['it-IT', 'it-CH'], buildTableControlPatch({
  sortSelectorTitle: 'Ordina per',
  sortDirectionAscending: 'Crescente',
  sortDirectionDescending: 'Decrescente',
  latestTradeDate: 'Data ultima operazione',
  marketFilterTitle: 'Mercati presenti nei dati correnti'
}));

extendPatch(deepPatches, ['ms-MY'], buildTableControlPatch({
  sortSelectorTitle: 'Susun ikut',
  sortDirectionAscending: 'Menaik',
  sortDirectionDescending: 'Menurun',
  latestTradeDate: 'Tarikh dagangan terakhir',
  marketFilterTitle: 'Pasaran dalam data semasa'
}));

extendPatch(deepPatches, ['nl-NL', 'nl-BE'], buildTableControlPatch({
  sortSelectorTitle: 'Sorteren op',
  sortDirectionAscending: 'Oplopend',
  sortDirectionDescending: 'Aflopend',
  latestTradeDate: 'Laatste transactiedatum',
  marketFilterTitle: 'Markten in de huidige data'
}));

extendPatch(deepPatches, ['fa-IR'], buildTableControlPatch({
  sortSelectorTitle: 'مرتب‌سازی بر اساس',
  sortDirectionAscending: 'صعودی',
  sortDirectionDescending: 'نزولی',
  latestTradeDate: 'تاریخ آخرین معامله',
  marketFilterTitle: 'بازارهای موجود در داده‌های فعلی'
}));

extendPatch(deepPatches, ['he-IL'], buildTableControlPatch({
  sortSelectorTitle: 'מיון לפי',
  sortDirectionAscending: 'בסדר עולה',
  sortDirectionDescending: 'בסדר יורד',
  latestTradeDate: 'תאריך העסקה האחרון',
  marketFilterTitle: 'שווקים שקיימים בנתונים הנוכחיים'
}));

extendPatch(deepPatches, ['es-419', 'es-AR', 'es-CL', 'es-CO', 'es-MX', 'es-PE', 'es-VE'], buildTableControlPatch({
  sortSelectorTitle: 'Ordenar por',
  sortDirectionAscending: 'Ascendente',
  sortDirectionDescending: 'Descendente',
  latestTradeDate: 'Última fecha de operación',
  marketFilterTitle: 'Mercados presentes en los datos actuales'
}));

extendPatch(deepPatches, ['es-ES'], buildTableControlPatch({
  sortSelectorTitle: 'Ordenar por',
  sortDirectionAscending: 'Ascendente',
  sortDirectionDescending: 'Descendente',
  latestTradeDate: 'Última fecha de operación',
  marketFilterTitle: 'Mercados presentes en los datos actuales'
}));

extendPatch(deepPatches, ['pt-BR'], buildTableControlPatch({
  sortSelectorTitle: 'Ordenar por',
  sortDirectionAscending: 'Crescente',
  sortDirectionDescending: 'Decrescente',
  latestTradeDate: 'Data da última operação',
  marketFilterTitle: 'Mercados presentes nos dados atuais'
}));

extendPatch(deepPatches, ['pt-PT'], buildTableControlPatch({
  sortSelectorTitle: 'Ordenar por',
  sortDirectionAscending: 'Crescente',
  sortDirectionDescending: 'Decrescente',
  latestTradeDate: 'Data da última operação',
  marketFilterTitle: 'Mercados presentes nos dados atuais'
}));

extendPatch(deepPatches, ['pl-PL'], buildTableControlPatch({
  sortSelectorTitle: 'Sortuj według',
  sortDirectionAscending: 'Rosnąco',
  sortDirectionDescending: 'Malejąco',
  latestTradeDate: 'Data ostatniej transakcji',
  marketFilterTitle: 'Rynki obecne w bieżących danych'
}));

extendPatch(deepPatches, ['tr-TR'], buildTableControlPatch({
  sortSelectorTitle: 'Sırala',
  sortDirectionAscending: 'Artan',
  sortDirectionDescending: 'Azalan',
  latestTradeDate: 'Son işlem tarihi',
  marketFilterTitle: 'Mevcut verilerdeki piyasalar'
}));

extendPatch(deepPatches, ['hi-IN'], buildTableControlPatch({
  sortSelectorTitle: 'क्रमबद्ध करें',
  sortDirectionAscending: 'आरोही',
  sortDirectionDescending: 'अवरोही',
  latestTradeDate: 'आख़िरी ट्रेड तारीख',
  marketFilterTitle: 'मौजूदा डेटा में मौजूद बाज़ार'
}));

extendPatch(deepPatches, ['ru-RU'], buildTableControlPatch({
  sortSelectorTitle: 'Сортировать по',
  sortDirectionAscending: 'По возрастанию',
  sortDirectionDescending: 'По убыванию',
  latestTradeDate: 'Дата последней сделки',
  marketFilterTitle: 'Рынки в текущих данных'
}));

extendPatch(deepPatches, ['sv-SE'], buildTableControlPatch({
  sortSelectorTitle: 'Sortera efter',
  sortDirectionAscending: 'Stigande',
  sortDirectionDescending: 'Fallande',
  latestTradeDate: 'Senaste handelsdatum',
  marketFilterTitle: 'Marknader i nuvarande data'
}));

extendPatch(deepPatches, ['cs-CZ'], buildTableControlPatch({
  sortSelectorTitle: 'Řadit podle',
  sortDirectionAscending: 'Vzestupně',
  sortDirectionDescending: 'Sestupně',
  latestTradeDate: 'Datum posledního obchodu',
  marketFilterTitle: 'Trhy v aktuálních datech'
}));

extendPatch(deepPatches, ['et-EE'], buildTableControlPatch({
  sortSelectorTitle: 'Sorteeri järgi',
  sortDirectionAscending: 'Kasvavalt',
  sortDirectionDescending: 'Kahanevalt',
  latestTradeDate: 'Viimase tehingu kuupäev',
  marketFilterTitle: 'Praegustes andmetes olevad turud'
}));

extendPatch(deepPatches, ['is-IS'], buildTableControlPatch({
  sortSelectorTitle: 'Raða eftir',
  sortDirectionAscending: 'Hækkandi',
  sortDirectionDescending: 'Lækkandi',
  latestTradeDate: 'Dagsetning síðustu viðskipta',
  marketFilterTitle: 'Markaðir í núverandi gögnum'
}));

extendPatch(deepPatches, ['ro-RO'], buildTableControlPatch({
  sortSelectorTitle: 'Sortează după',
  sortDirectionAscending: 'Crescător',
  sortDirectionDescending: 'Descrescător',
  latestTradeDate: 'Data ultimei tranzacții',
  marketFilterTitle: 'Piețele din datele curente'
}));

extendPatch(deepPatches, ['hu-HU'], buildTableControlPatch({
  sortSelectorTitle: 'Rendezés',
  sortDirectionAscending: 'Növekvő',
  sortDirectionDescending: 'Csökkenő',
  latestTradeDate: 'Utolsó ügylet dátuma',
  marketFilterTitle: 'A jelenlegi adatok piacai'
}));

extendPatch(deepPatches, ['da-DK'], buildTableControlPatch({
  sortSelectorTitle: 'Sortér efter',
  sortDirectionAscending: 'Stigende',
  sortDirectionDescending: 'Faldende',
  latestTradeDate: 'Dato for seneste handel',
  marketFilterTitle: 'Markeder i de aktuelle data'
}));

extendPatch(deepPatches, ['el-GR'], buildTableControlPatch({
  sortSelectorTitle: 'Ταξινόμηση κατά',
  sortDirectionAscending: 'Αύξουσα',
  sortDirectionDescending: 'Φθίνουσα',
  latestTradeDate: 'Ημερομηνία τελευταίας συναλλαγής',
  marketFilterTitle: 'Αγορές στα τρέχοντα δεδομένα'
}));

extendPatch(deepPatches, ['lv-LV'], buildTableControlPatch({
  sortSelectorTitle: 'Kārtot pēc',
  sortDirectionAscending: 'Augošā secībā',
  sortDirectionDescending: 'Dilstošā secībā',
  latestTradeDate: 'Pēdējā darījuma datums',
  marketFilterTitle: 'Tirgi pašreizējos datos'
}));

extendPatch(deepPatches, ['lt-LT'], buildTableControlPatch({
  sortSelectorTitle: 'Rikiuoti pagal',
  sortDirectionAscending: 'Didėjančiai',
  sortDirectionDescending: 'Mažėjančiai',
  latestTradeDate: 'Paskutinio sandorio data',
  marketFilterTitle: 'Rinkos dabartiniuose duomenyse'
}));

extendPatch(deepPatches, ['nb-NO'], buildTableControlPatch({
  sortSelectorTitle: 'Sorter etter',
  sortDirectionAscending: 'Stigende',
  sortDirectionDescending: 'Synkende',
  latestTradeDate: 'Dato for siste handel',
  marketFilterTitle: 'Markeder i dagens data'
}));

extendPatch(deepPatches, ['fi-FI'], buildTableControlPatch({
  sortSelectorTitle: 'Lajittele',
  sortDirectionAscending: 'Nouseva',
  sortDirectionDescending: 'Laskeva',
  latestTradeDate: 'Viimeisin kaupankäyntipäivä',
  marketFilterTitle: 'Nykyisten tietojen markkinat'
}));

extendPatch(deepPatches, ['fil-PH'], buildTableControlPatch({
  sortSelectorTitle: 'Ayusin ayon sa',
  sortDirectionAscending: 'Pataas',
  sortDirectionDescending: 'Pababa',
  latestTradeDate: 'Huling petsa ng trade',
  marketFilterTitle: 'Mga market sa kasalukuyang data'
}));

extendPatch(deepPatches, ['vi-VN'], buildTableControlPatch({
  sortSelectorTitle: 'Sắp xếp theo',
  sortDirectionAscending: 'Tăng dần',
  sortDirectionDescending: 'Giảm dần',
  latestTradeDate: 'Ngày giao dịch gần nhất',
  marketFilterTitle: 'Các thị trường có trong dữ liệu hiện tại'
}));

extendPatch(deepPatches, ['th-TH'], buildTableControlPatch({
  sortSelectorTitle: 'เรียงตาม',
  sortDirectionAscending: 'น้อยไปมาก',
  sortDirectionDescending: 'มากไปน้อย',
  latestTradeDate: 'วันที่ซื้อขายล่าสุด',
  marketFilterTitle: 'ตลาดที่มีอยู่ในข้อมูลตอนนี้'
}));

extendPatch(deepPatches, ['ar-SA', 'ar-EG', 'ar-AE', 'ar-KW', 'ar-QA'], buildTableControlPatch({
  sortSelectorTitle: 'الترتيب حسب',
  sortDirectionAscending: 'تصاعدي',
  sortDirectionDescending: 'تنازلي',
  latestTradeDate: 'تاريخ آخر صفقة',
  marketFilterTitle: 'الأسواق الموجودة في البيانات الحالية'
}));

extendPatch(deepPatches, ['ur-PK'], buildTableControlPatch({
  sortSelectorTitle: 'ترتیب کے مطابق',
  sortDirectionAscending: 'صعودی',
  sortDirectionDescending: 'نزولی',
  latestTradeDate: 'آخری ٹریڈ کی تاریخ',
  marketFilterTitle: 'موجودہ ڈیٹا میں موجود مارکیٹس'
}));

export const DEEP_REFINED_LOCALES = Object.freeze(Object.keys(deepPatches));

export const applyLocaleDeepVoiceRefinements = (translations) => Object.fromEntries(
  Object.entries(translations).map(([locale, translation]) => [
    locale,
    deepPatches[locale] ? mergeLocale(translation, deepPatches[locale]) : translation
  ])
);
