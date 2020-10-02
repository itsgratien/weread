import moment from 'moment';

export const convertToTime = (val: number) => {
  const duration = moment.duration(val, 'milliseconds');
  const minutes =
    duration.minutes() < 9 ? `0${duration.minutes()}` : duration.minutes();
  const seconds =
    duration.seconds() < 9 ? `0${duration.seconds()}` : duration.seconds();
  const hours =
    duration.hours() < 9 ? `0${duration.hours()}` : duration.hours();

  return `${hours}:${minutes}:${seconds}`;
};
