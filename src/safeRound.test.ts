import { roundToPlaces, safeRound, sumUp } from "./safeRound";

describe("round", () => {
    test("round to no places (int)", () => {
        const result = roundToPlaces(1.6, 0);
        expect(result).toBe(2);
    });

    test("round to two places (int)", () => {
        const result = roundToPlaces(1.667, 2);
        expect(result).toBe(1.67);
    });
});

describe("sum", () => {
    test("sum up and round (int)", () => {
        const result = sumUp([1.5, 1.66, 0.177]);
        expect(result).toBe(3);
    });

    test("sum up and round to decimal", () => {
        const result = sumUp([1.5, 1.66, 0.177], 2);
        expect(result).toBe(3.34);
    });

    test("sum up positive and negative", () => {
        const result = sumUp([2, -2, -1]);
        expect(result).toBe(-1);
    });
});

describe("safe round", () => {
    const fixture = [4.0001, 3.2345, 3.2321, 6.4523, 5.3453, 7.3422];

    test("to 0 places (int)", () => {
        const result = safeRound(fixture, 0);
        expect(result).toEqual([4, 3, 3, 7, 6, 7]);
        expect(sumUp(result)).toBe(sumUp(fixture));
    });

    test("rounds to second place (decimal)", () => {
        const result = safeRound(fixture, 2);
        expect(result).toEqual([4, 3.24, 3.23, 6.45, 5.35, 7.34]);
        expect(sumUp(result)).toBe(sumUp(fixture));
    });

    test("rounds negative (decimal)", () => {
        const negativeFixture = fixture.map((v) => v * -1);
        const result = safeRound(negativeFixture, 2);
        expect(result).toEqual([-4, -3.24, -3.23, -6.45, -5.35, -7.34]);
        expect(sumUp(result)).toBe(sumUp(negativeFixture));
    });

    test("rounds huge (int)", () => {
        const hugeFixture = fixture.map((v) => v * 100000);
        const result = safeRound(hugeFixture, 0);
        expect(result).toEqual([400010, 323450, 323210, 645230, 534530, 734220]);
        expect(sumUp(result)).toBe(sumUp(hugeFixture));
    });

    test("returns empty on empty input", () => {
        const result = safeRound([], 5);
        expect(result).toEqual([]);
    });

    test("rounds near zero", () => {
        const fixture = [
            0.013245557004700679, 0.7268604797100215, 0.6155001637295456,
            0.06875329582046738, 0.8387831576913838, 0.03243429881206358,
            0.0023860988000495792, 0.41960946536150784, 0.675551119386058,
            0.6409523907667709, 0.9659239729174308,
        ];
        const result = safeRound(fixture);
        expect(result).toEqual([0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1]);
        expect(sumUp(result)).toBe(sumUp(fixture));
    });

    test("readme example", () => {
        const fixture = [60.19012964572332, 15.428802458406679, 24.381067895870007];
        const out = [60, 16, 24];
        const result = safeRound(fixture, 0);

        expect(result).toEqual(out);
    });

    test("test_basic_difference", () => {
        const out = [4.0, 3.24, 3.23, 6.45, 5.35, 7.34];
        const result = safeRound(fixture, 2);

        expect(result).toEqual(out);
    })
});
