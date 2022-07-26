function getWeekdaysLocale(localeName = 'en', weekday = 'long') {
  const { format } = new Intl.DateTimeFormat(localeName, { weekday });
  return [...Array(7).keys()]
    .map((day) => format(new Date(Date.UTC(2021, 5, day))));
}

export default getWeekdaysLocale;
