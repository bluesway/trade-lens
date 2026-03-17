const BUY_TYPE_TERMS = [
  '買',
  '买',
  'buy',
  'bot',
  'bid',
  'long',
  'achat',
  'beli',
  'acquisto',
  'compra',
  'comprar',
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

const SORTED_BUY_TYPE_TERMS = [...BUY_TYPE_TERMS].sort((a, b) => b.length - a.length);
const SORTED_SELL_TYPE_TERMS = [...SELL_TYPE_TERMS].sort((a, b) => b.length - a.length);

const STANDARD_HEADER_ALIASES = {
  日期: ['日期', '交易日期', '成交日期', 'Date', 'Trade Date', 'Tanggal', 'Tarikh', 'Ngày', 'Ngày giao dịch', 'Date opération', 'Date de transaction', 'Fecha', 'Fecha de operación', 'Fecha de transacción', 'Data', 'Data operação', 'Datum', 'Handelsdatum', 'Data di negoziazione', '日付', '取引日', 'التاريخ', 'วันที่', 'วันที่ซื้อขาย', '날짜', '거래일', '체결일'],
  類型: ['類型', '交易類別', '動作', 'Type', 'Action', 'Side', 'Jenis', 'Loại', 'Giao dịch', 'Type d\'ordre', 'Ordre', 'Tipo', 'Tipo de orden', 'Operación', 'Transacción', 'Tipo de operação', 'Operação', 'Auftragstyp', 'Transaktionstyp', 'Art', 'Ordine', 'Operazione', 'Ordertype', 'Transactie', '区分', '種類', '売買区分', 'النوع', 'الإجراء', 'ประเภท', 'ฝั่ง', 'สถานะ', '구분', '유형', '매매구분'],
  代號: ['代號', '股票代號', '代碼', 'Symbol', 'Ticker', 'Stock Code', 'Simbol', 'Kode', 'Kod', 'Símbolo', 'Código', 'Código bursátil', 'Mã', 'Mã CK', 'Mã chứng khoán', 'Symbole', 'Code valeur', 'Wertpapier', 'Ticker-Symbol', 'Simbolo', 'Codice', 'Codice titolo', 'Symbool', '銘柄コード', 'コード', 'ティッカー', 'الرمز', 'สัญลักษณ์', 'ชื่อย่อ', 'ticker', '종목코드', '종목', '티커'],
  市場: ['市場', '交易所', 'Market', 'Exchange', 'Pasar', 'Pasaran', 'Thị trường', 'Marché', 'Place de marché', 'Mercado', 'Bolsa', 'Markt', 'Börse', 'Mercato', 'Beurs', '取引所', 'السوق', 'البورصة', 'ตลาด', '시장'],
  數量: ['數量', '成交股數', '股數', 'Quantity', 'Qty', 'Shares', 'Kuantitas', 'Jumlah saham', 'Kuantiti', 'Bilangan unit', 'Bilangan saham', 'Số lượng', 'Khối lượng', 'Quantité', 'Cantidad', 'Acciones', 'Quantidade', 'Qtd', 'Stückzahl', 'Menge', 'Quantità', 'Aantal', '数量', '株数', 'الكمية', 'عدد الأسهم', 'จำนวน', 'จำนวนหุ้น', '수량', '주수'],
  單價: ['單價', '成交價', '成交單價', 'Price', 'Execution Price', 'Harga', 'Harga per unit', 'Harga seunit', 'Giá', 'Giá khớp', 'Đơn giá', 'Prix', 'Prix unitaire', 'Precio', 'Precio unitario', 'Preço', 'Preço unitário', 'Preis', 'Kurs', 'Prezzo', 'Prijs', '単価', '価格', '約定価格', 'سعر الوحدة', 'السعر', 'ราคา', 'ราคาต่อหุ้น', 'ราคาต่อหน่วย', '단가', '체결가', '가격'],
  總金額: ['總金額', '成交金額', '淨額', 'Amount', 'Total Amount', 'Net Amount', 'Nilai', 'Jumlah', 'Jumlah keseluruhan', 'Giá trị', 'Tổng giá trị', 'Montant', 'Montant total', 'Valeur totale', 'Importe', 'Importe total', 'Monto', 'Monto total', 'Valor total', 'Betrag', 'Gesamtbetrag', 'Importo', 'Totale', 'Bedrag', 'Totaalbedrag', '金額', '合計金額', '約定代金', 'إجمالي المبلغ', 'إجمالي القيمة', 'القيمة', 'มูลค่า', 'มูลค่ารวม', 'ยอดรวม', '금액', '총금액', '총액'],
  損益: ['損益', '實現損益', 'PnL', 'Realized PnL', 'Profit', 'P&L', 'Untung/Rugi', 'Untung rugi', 'Laba/Rugi', 'Lãi/Lỗ', 'Lãi lỗ', 'Lãi/Lỗ đã chốt', 'Plus/moins-value', 'Plus-value', 'Moins-value', 'Gain/Perte', 'Ganancia/Pérdida', 'Ganancias/Pérdidas', 'Resultado', 'Lucro/Prejuízo', 'Lucro / Prejuízo', 'Gewinn/Verlust', 'G/V', 'Utile/Perdita', 'Profitto/Perdita', 'Winst/Verlies', '実現損益', 'الربح أو الخسارة', 'الربح/الخسارة', 'الأرباح والخسائر', 'กำไรขาดทุน', 'กำไร/ขาดทุน', '손익', '실현손익']
};

const REQUIRED_STANDARD_FIELDS = ['日期', '類型', '代號', '數量'];
const DELIMITER_CANDIDATES = [',', ';', '\t'];
const DELIMITER_LABELS = {
  ',': ',',
  ';': ';',
  '\t': 'tab'
};

const CSV_IMPORT_PROFILES = [
  {
    id: 'trade-lens',
    label: 'Trade Lens',
    translationKey: 'header.csvProfiles.tradeLens',
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
  }
];

export const CSV_IMPORT_PROFILE_OPTIONS = [
  { id: 'auto', label: 'Auto detect', translationKey: 'header.importProfileAuto' },
  ...CSV_IMPORT_PROFILES.map(({ id, label, translationKey }) => ({ id, label, translationKey }))
];

const PROFILE_LOOKUP = new Map(CSV_IMPORT_PROFILES.map((profile) => [profile.id, profile]));

const tokenizeHeaderLabel = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .split(/[\s_()[\]{}:：/\\.'"-]+/g)
  .filter(Boolean);

const normalizeHeaderLabel = (value) => tokenizeHeaderLabel(value).join('');

const matchesHeaderLabel = (rawHeader, keyword) => {
  const headerTokens = tokenizeHeaderLabel(rawHeader);
  const keywordTokens = tokenizeHeaderLabel(keyword);
  const normalizedHeader = normalizeHeaderLabel(rawHeader);
  const normalizedKeyword = normalizeHeaderLabel(keyword);

  if (!normalizedHeader || !normalizedKeyword) {
    return false;
  }

  if (normalizedHeader === normalizedKeyword) {
    return true;
  }

  if (headerTokens.length > 1 || keywordTokens.length > 1) {
    return keywordTokens.every((token) => headerTokens.includes(token));
  }

  return normalizedHeader.includes(normalizedKeyword)
    || normalizedKeyword.includes(normalizedHeader);
};

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
    const matched = rawHeaders.some((header) => keywords.some((keyword) => matchesHeaderLabel(header, keyword)));
    if (matched) {
      score += 14;
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
    Object.entries(STANDARD_HEADER_ALIASES).forEach(([standardField, keywords]) => {
      if (headerMap[standardField] !== undefined) {
        return;
      }

      if (keywords.some((keyword) => matchesHeaderLabel(rawHeader, keyword))) {
        headerMap[standardField] = index;
      }
    });
  });

  return headerMap;
};

const inspectHeaderRow = (rawHeaders, preferredProfileId = 'auto') => {
  const headerMap = buildHeaderMap(rawHeaders);
  const matchedFields = Object.keys(headerMap);
  const matchedRequiredFields = REQUIRED_STANDARD_FIELDS.filter((field) => headerMap[field] !== undefined);
  const hasSymbolAndType = headerMap['代號'] !== undefined && headerMap['類型'] !== undefined;
  const hasValueField = headerMap['總金額'] !== undefined || headerMap['單價'] !== undefined;
  const profileDetection = detectProfile(rawHeaders, preferredProfileId);
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
  const normalizedType = normalizeHeaderLabel(rawValue);
  if (!normalizedType) {
    return '';
  }

  if (SORTED_SELL_TYPE_TERMS.some((term) => normalizedType.includes(normalizeHeaderLabel(term)))) {
    return '賣出';
  }

  if (SORTED_BUY_TYPE_TERMS.some((term) => normalizedType.includes(normalizeHeaderLabel(term)))) {
    return '買入';
  }

  return rawValue;
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
  value = value.replace(/[^\d,.\-]/g, '');

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

const normalizeParsedRow = (rawRow, preferredDecimalSeparator) => {
  const normalizedRow = {
    日期: String(rawRow['日期'] || '').trim(),
    類型: normalizeTradeType(rawRow['類型']),
    代號: String(rawRow['代號'] || '').trim(),
    市場: String(rawRow['市場'] || '').trim(),
    數量: normalizeNumericCell(rawRow['數量'], preferredDecimalSeparator),
    單價: normalizeNumericCell(rawRow['單價'], preferredDecimalSeparator),
    總金額: normalizeNumericCell(rawRow['總金額'], preferredDecimalSeparator),
    損益: normalizeNumericCell(rawRow['損益'], preferredDecimalSeparator)
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

const isImportableRow = (row) => (
  Boolean(row['日期'])
  && Boolean(row['類型'])
  && Boolean(row['代號'])
  && Boolean(row['數量'])
  && (Boolean(row['單價']) || Boolean(row['總金額']))
);

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
  const missingRequiredFields = REQUIRED_STANDARD_FIELDS.filter((field) => inspection.headerMap?.[field] === undefined);

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
        matchedFields: inspection.matchedFields || [],
        missingRequiredFields
      }
    };
  }

  const delimiter = layout?.delimiter || ',';
  const preferredDecimalSeparator = inspection.profile?.preferredDecimalSeparator || '.';
  const result = [];
  let skippedRowCount = 0;
  const problematicRowNumbers = [];

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

    const normalizedRow = normalizeParsedRow(rawRow, preferredDecimalSeparator);
    if (isImportableRow(normalizedRow)) {
      result.push(normalizedRow);
    } else {
      skippedRowCount += 1;
    }
  }

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
        matchedFields: inspection.matchedFields || [],
        missingRequiredFields: [],
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
        matchedFields: inspection.matchedFields || [],
        missingRequiredFields: []
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
      matchedFields: inspection.matchedFields || [],
      missingRequiredFields: []
    }
  };
};

export const parseCSV = (text, options = {}) => parseCSVWithMeta(text, options).rows;
