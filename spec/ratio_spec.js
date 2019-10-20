"use strict";

const EnglishNumber = require("../lib/english_number");
const assert = require("assert");

const ratio_assertions = [
  // Ratio
  [[0, 2], "Zero Halves"],
  [[1, 2], "One Half"],
  [[2, 2], "Two Halves"],
  [[3, 2], "Three Halves"],
  [[0, 3], "Zero Thirds"],
  [[1, 3], "One Third"],
  [[2, 3], "Two Thirds"],
  [[3, 3], "Three Thirds"],
  [[4, 3], "Four Thirds"],
  [[1, 4], "One Quarter"],
  [[2, 4], "Two Quarters"],
  [[3, 4], "Three Quarters"],
  [[4, 4], "Four Quarters"],
  [[5, 4], "Five Quarters"],
  [[1, 10], "One Tenth"],
  [[2, 12], "Two Twelfths"],
  [[1, 100], "One One Hundredth"],
  [[1, 200], "One Two Hundredth"],
  [[1, 1000], "One One Thousandth"],

]

describe("Ratios", () => {
  ratio_assertions.forEach((assertion) => {
    it(`converts the ratio ${assertion[0][0]}/${assertion[0][1]}`, () => {
      const actual = EnglishNumber.ratio(...assertion[0]);
      const expected = assertion[1];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
