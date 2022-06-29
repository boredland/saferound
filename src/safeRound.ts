/**
 * sums up a list of values and rounds the result to given number of places
 * @param values - to sum up
 * @param places - to round to
 * @returns rounded sum
 */
export const sumUp = (values: number[], places = 0) => {
  return roundToPlaces(
    values.reduce((pre, current) => pre + current, 0),
    places,
  );
};

/**
 * rounds a number to a given place
 * @param value - number to round
 * @param places - places to round to
 * @returns rounded number
 */
export const roundToPlaces = (value: number, places = 0) =>
  Math.round((value + Number.EPSILON) * 10 ** places) / 10 ** places;

const _mininc = (places = 0) => {
  return 1 / 10 ** places;
};

/**
 * Safely round a list of values so, that their resulting sum equals the input values sum
 * @param values - values to round
 * @param places - places to round to
 * @returns list of rounded values
 */
export const safeRound = (values: number[], places = 0) => {
  const local = [...values];
  const originalSum = sumUp(local, places);
  let localSum = originalSum-99999;
  let increment = -1;

  while (localSum !== originalSum) {
    const diff = roundToPlaces(originalSum - localSum, places);
    if (diff < 0) {
      increment = -1 * _mininc(places);
    } else {
      increment = _mininc(places);
    }
    const tweaks = Math.floor(Math.abs(diff) / _mininc(places));
    [...local.slice(0, tweaks)].forEach((v, i) => {
      local[i] = roundToPlaces((local[i] += increment), places);
    });
    localSum = sumUp(local, places);
  }
  return local;
};
