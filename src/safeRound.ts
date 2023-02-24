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
export const roundToPlaces = (value: number, places: number) =>
  Math.round((value + Number.EPSILON) * 10 ** places) / 10 ** places;

const _mininc = (places: number) => {
  return 1 / 10 ** places;
};

class ListNumber {
  private _value: number;
  private _diff: number = NaN;

  constructor(
    public readonly order: number, 
    public readonly original: number, 
    private readonly places = 0
  ) {
    this._value = this.original;
    this.add(0);
  }

  get value(){
    return this._value;
  }

  get diff() {
    return this._diff;
  }

  public add(increment: number) {
    this._value = roundToPlaces(this.value + increment, this.places);
    this._diff = this.original - this.value;
  }
}

/**
 * Safely round a list of values so, that their resulting sum equals the input values sum
 * @param values - values to round
 * @param places - places to round to
 * @returns list of rounded values
 */
export const safeRound = (values: number[], places = 0) => {
  let local: ListNumber[] = values.map((value, index) => new ListNumber(index, value, places));
  const originalSum = sumUp(local.map(value => value.original), places);
  let localSum = sumUp(local.map(item => item.value), places);
  let increment = -1;

  while (localSum !== originalSum) {
    const diff = roundToPlaces(originalSum - localSum, places);
    if (diff < 0) {
      increment = -1 * _mininc(places);
    } else {
      increment = _mininc(places);
    }
    const tweaks = Math.floor(Math.abs(diff) / _mininc(places));
    local = local.sort((a,b) => a.diff - b.diff);

    [...local.slice(0, tweaks)].forEach((v, i) => {
      local[i].add(increment);
    });
    localSum = sumUp(local.map(item => item.value), places);
  }
  return local.sort((a, b) => a.order - b.order).map(item =>  item.value);
};
