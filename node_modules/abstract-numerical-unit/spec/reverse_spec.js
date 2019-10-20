"use strict";

const assert = require("assert");
const Unit = require("../lib/abstract_numerical_unit");

const assertions = [
  {input: 101.1, expected: new Unit(-1, 1, new Unit(0, 1, new Unit(2, 1)))},
];

describe("Invert", () => {
  assertions.forEach(({input, expected}) => {
    it(`Handles input ${input}`, () => {
      const actual = Unit.fromNumerical(input).reverse();
      assert.deepEqual(actual, expected);
    });
  });
});

console.log('All tests passsed');
