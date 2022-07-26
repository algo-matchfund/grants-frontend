const formatCurrency = (number, language, currency = 'EUR') => new Intl.NumberFormat(language, { style: 'currency', currency }).format(number);

export default formatCurrency;
