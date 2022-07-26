// Get month from date string
const getShortMonthLocale = (date, language = 'en') => {
  const dateFormat = new Intl.DateTimeFormat(language, { month: 'short' });
  return dateFormat.format(new Date(date));
};

export default getShortMonthLocale;
