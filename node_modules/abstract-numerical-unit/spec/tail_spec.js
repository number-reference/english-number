"use strict";

const Unit = require("../lib/abstract_numerical_unit");

const assertions = [
  {input: 102.3, expected: new Unit(-1, 3)},
  {input: 10, expected: new Unit(1, 1)},
  {input: 0.03, expected: new Unit(-2, 3)},
];

describe("Tail", () => {
  assertions.forEach(({input, expected}) => {
    it(`Handles input ${input}`, () => {
      const actual = Unit.fromNumerical(input).tail();
      expect(actual).toEqual(expected);
    });
  });
});
