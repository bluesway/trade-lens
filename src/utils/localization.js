import { getFormattingLocale } from '../locales/config';

const DEFAULT_DECIMAL_OPTIONS = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
};

const DEFAULT_CURRENCY_OPTIONS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
};

const DEFAULT_PERCENT_OPTIONS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: 'exceptZero'
};

const toNumber = (value) => {
  const normalizedValue = typeof value === 'string'
    ? value.replace(/[^0-9.-]+/g, '')
    : value;

  const numericValue = Number(normalizedValue || 0);
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const getValidDate = (value) => {
  if (!value) return null;

  const dateValue = value instanceof Date ? value : new Date(value);
  return Number.isNaN(dateValue.getTime()) ? null : dateValue;
};

export const formatLocalizedNumber = (value, locale, options = DEFAULT_DECIMAL_OPTIONS) => (
  new Intl.NumberFormat(getFormattingLocale(locale), {
    ...DEFAULT_DECIMAL_OPTIONS,
    ...options
  }).format(toNumber(value))
);

export const formatLocalizedCompactNumber = (value, locale, options = {}) => (
  new Intl.NumberFormat(getFormattingLocale(locale), {
    notation: 'compact',
    maximumFractionDigits: 1,
    ...options
  }).format(toNumber(value))
);

export const formatLocalizedCurrency = (value, currency, locale, options = {}) => {
  const { signed = false, ...numberFormatOptions } = options;

  return new Intl.NumberFormat(getFormattingLocale(locale), {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
    ...DEFAULT_CURRENCY_OPTIONS,
    ...(signed ? { signDisplay: 'exceptZero' } : {}),
    ...numberFormatOptions
  }).format(toNumber(value));
};

export const formatLocalizedPercent = (value, locale, options = DEFAULT_PERCENT_OPTIONS) => {
  const { signed = true, ...numberFormatOptions } = options;

  return new Intl.NumberFormat(getFormattingLocale(locale), {
    style: 'percent',
    ...DEFAULT_PERCENT_OPTIONS,
    ...(signed ? {} : { signDisplay: 'auto' }),
    ...numberFormatOptions
  }).format(toNumber(value) / 100);
};

export const formatLocalizedDate = (value, locale, options = {}) => {
  const parsedDate = getValidDate(value);
  if (!parsedDate) {
    return typeof value === 'string' ? value : '';
  }

  return new Intl.DateTimeFormat(getFormattingLocale(locale), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options
  }).format(parsedDate);
};

export const formatLocalizedDateTime = (value, locale, options = {}) => {
  const parsedDate = getValidDate(value);
  if (!parsedDate) {
    return typeof value === 'string' ? value : '';
  }

  return new Intl.DateTimeFormat(getFormattingLocale(locale), {
    dateStyle: 'medium',
    timeStyle: 'short',
    ...options
  }).format(parsedDate);
};
