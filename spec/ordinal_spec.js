"use strict";

const EnglishNumber = require("../lib/english_number");
const assert = require("assert");

const ordinal_assertions = [
  [0, "Zeroth"],
  [1, "First"],
  [2, "Second"],
  [3, "Third"],
  [4, "Fourth"],
  [7, "Seventh"],
  [8, "Eighth"],
  [9, "Ninth"],
  [10, "Tenth"],
  [11, "Eleventh"],
  [12, "Twelfth"],
  [17, "Seventeenth"],
  [20, "Twentieth"],
  [21, "Twenty-First"],
  [27, "Twenty-Seventh"],
  [30, "Thirtieth"],
  [32, "Thirty-Second"],
  [40, "Fortieth"],
  [50, "Fiftieth"],
  [58, "Fifty-Eighth"],
  [60, "Sixtieth"],
  [64, "Sixty-Fourth"],
  [70, "Seventieth"],
  [79, "Seventy-Ninth"],
  [80, "Eightieth"],
  [83, "Eighty-Third"],
  [90, "Ninetieth"],
  [99, "Ninety-Ninth"],
  [100, "One Hundredth"],
  [101, "One Hundred and First"],
  [102, "One Hundred and Second"],
  [107, "One Hundred and Seventh"],
  [111, "One Hundred and Eleventh"],
  [112, "One Hundred and Twelfth"],
  [117, "One Hundred and Seventeenth"],
  [121, "One Hundred and Twenty-First"],
  [127, "One Hundred and Twenty-Seventh"],
  [130, "One Hundred and Thirtieth"],
  [208, "Two Hundred and Eighth"],
  [1000, "One Thousandth"],
  [20000, "Twenty Thousandth"],
]

describe("Ordinal numbers", () => {
  ordinal_assertions.forEach((assertion) => {
    it(`converts the number ${assertion[0]}`, () => {
      const actual = EnglishNumber.orderOf(assertion[0]);
      const expected = assertion[1];
      assert.deepStrictEqual(actual, expected);
    });

    it(`converts the string "${assertion[0]}"`, () => {
      const actual = EnglishNumber.orderOf(assertion[0].toString());
      const expected = assertion[1];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
