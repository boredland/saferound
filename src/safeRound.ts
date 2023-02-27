/**
 * sums up a list of values and rounds the result to given number of places
 * @param values - to sum up
 * @param places - to round to
 * @returns rounded sum
 */
export const sumUp = (values: number[], places = 0) => {
  return roundToPlaces(
    values.reduce((pre, current) => pre + current, 0),
    places
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

  get value() {
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

class List {
  private _items: ListNumber[];

  constructor(values: number[], private places: number) {
    this._items = values.map(
      (value, index) => new ListNumber(index, value, this.places)
    );
  }

  public update(items: ListNumber[]) {
    this._items = items;
  }

  get items() {
    return this._items.sort((a, b) => a.order - b.order);
  }

  private get original() {
    return this.items.map((item) => item.original);
  }

  public get values() {
    return this.items.map((item) => item.value);
  }

  get sum() {
    return sumUp(this.values, this.places);
  }

  get originalSum() {
    return sumUp(this.original, this.places);
  }
}

/**
 * Safely round a list of values so, that their resulting sum equals the input values sum
 * @param values - values to round
 * @param places - places to round to
 * @returns list of rounded values
 */
export const safeRound = (values: number[], places = 0) => {
  let list = new List(values, places);
  const minic = 1 / 10 ** places;

  while (list.sum !== list.originalSum) {
    const diff = roundToPlaces(list.originalSum - list.sum, places);

    const negadiff = diff < 0;
    const increment = negadiff ? -1 * minic : minic;

    const tweaks = Math.floor(Math.abs(diff) / minic);
    // 
    const items = list.items.sort((a, b) =>
      negadiff ? a.diff - b.diff : b.diff - a.diff
    );

    [...items.slice(0, tweaks)].forEach((v, i) => {
      items[i].add(increment);
    });
    list.update(items);
  }
  return list.values;
};
