import moment from 'moment';

const getDatesThisWeek = () => {
  const week = [];

  for (let i = 1; i <= 7; i += 1) {
    const day = moment().isoWeekday(i);
    week.push({
      weekday: day.format('dddd'),
      formatFull: day.format('YYYY-MM-DD'),
      formatTiny: day.format('MM-DD'),
    });
  }

  return week;
};

export default getDatesThisWeek;
