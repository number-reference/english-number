"use strict";

const Unit = require("../lib/abstract_numerical_unit");

const assertions = [
  {input: 102.3, shift: 1, expected: new Unit(3, 1, new Unit(1, 2, new Unit(0, 3)))},
  {input: 102.3, shift: 0, expected: new Unit(2, 1, new Unit(0, 2, new Unit(-1, 3)))},
  {input: 102.3, shift: -1, expected: new Unit(1, 1, new Unit(-1, 2, new Unit(-2, 3)))},
];

describe("Invert", () => {
  assertions.forEach(({input, shift, expected}) => {
    it(`Handles input ${input}`, () => {
      const actual = Unit.fromNumerical(input).shift(shift);
      expect(actual).toEqual(expected);
    });
  });
});
