/*       */

"use strict";

const assert = require("assert");
const Unit = require("./abstract_numerical_unit");

const assertions = [
  {input: 0.01, expected: new Unit(-2, 1)},
  {input: 0.1, expected: new Unit(-1, 1)},
  {input: 0.10, expected: new Unit(-1, 1)},
  {input: 0.101, expected: new Unit(-1, 1, new Unit(-3, 1))},
  {input: 0.11, expected: new Unit(-1, 1, new Unit(-2, 1))},
  {input: 0, expected: new Unit(0, 0)},
  {input: 1, expected: new Unit(0, 1)},
  {input: 1.01, expected: new Unit(0, 1, new Unit(-2, 1))},
  {input: 1.1, expected: new Unit(0, 1, new Unit(-1, 1))},
  {input: 1.10, expected: new Unit(0, 1, new Unit(-1, 1))},
  {input: 1.101, expected: new Unit(0, 1, new Unit(-1, 1, new Unit(-3, 1)))},
  {input: 1.11, expected: new Unit(0, 1, new Unit(-1, 1, new Unit(-2, 1)))},
  {input: 1.203, expected: new Unit(0, 1, new Unit(-1, 2, new Unit(-3, 3)))},
  {input: 10, expected: new Unit(1, 1)},
  {input: 10.01, expected: new Unit(1, 1, new Unit(-2, 1))},
  {input: 10.1, expected: new Unit(1, 1, new Unit(-1, 1))},
  {input: 10.10, expected: new Unit(1, 1, new Unit(-1, 1))},
  {input: 10.101, expected: new Unit(1, 1, new Unit(-1, 1, new Unit(-3, 1)))},
  {input: 10.11, expected: new Unit(1, 1, new Unit(-1, 1, new Unit(-2, 1)))},
  {input: 11, expected: new Unit(1, 1, new Unit(0, 1))},
  {input: 11.01, expected: new Unit(1, 1, new Unit(0, 1, new Unit(-2, 1)))},
  {input: 11.1, expected: new Unit(1, 1, new Unit(0, 1, new Unit(-1, 1)))},
  {input: 11.10, expected: new Unit(1, 1, new Unit(0, 1, new Unit(-1, 1)))},
  {input: 11.101, expected: new Unit(1, 1, new Unit(0, 1, new Unit(-1, 1, new Unit(-3, 1))))},
  {input: 11.11, expected: new Unit(1, 1, new Unit(0, 1, new Unit(-1, 1, new Unit(-2, 1))))},
  {input: 101, expected: new Unit(2, 1, new Unit(0, 1))},
  {input: 101.01, expected: new Unit(2, 1, new Unit(0, 1, new Unit(-2, 1)))},
  {input: 101.1, expected: new Unit(2, 1, new Unit(0, 1, new Unit(-1, 1)))},
];

assertions.forEach(({input, expected}) => {
  const actual = Unit.fromNumerical(input);
  assert.deepEqual(actual, expected, `
Failed for ${input.toString()}

Actual: ${actual.toString()}
          !==
Expected: ${expected.toString()}`);
}); 

console.log('All tests passsed');
