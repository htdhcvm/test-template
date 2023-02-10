import { DAY_MS, HOUR_MS, MINUTE_MS, SECOND_MS } from '../const/time.const';

/**
 * @typedef {Object} ReturnDateDifference
 * @property {number} days - The name of the user
 * @property {number} hours - The name of the user
 * @property {number} minutes - The name of the user
 * @property {number} seconds - The age of the user
 */
type ReturnDateDifference = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * @param {Number} dateStart
 * @param {number} dateEnd
 * @returns {ReturnDateDifference}
 */
function dateDifference(dateStart: Date, dateEnd: Date): ReturnDateDifference {
  const dateStartMs = dateStart.getTime();
  const dateEndMs = dateEnd.getTime();

  const diff = Math.abs(dateEndMs - dateStartMs);

  let delta = diff;

  const days = Math.floor(delta / DAY_MS);
  delta -= days * DAY_MS;

  const hours = Math.floor(delta / HOUR_MS);
  delta -= hours * HOUR_MS;

  const minutes = Math.floor(delta / MINUTE_MS);
  delta -= minutes * MINUTE_MS;

  const seconds = Math.floor(delta / SECOND_MS);
  delta -= seconds * SECOND_MS;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export default dateDifference;
