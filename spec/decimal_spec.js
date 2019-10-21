"use strict";

const EnglishNumber = require("../lib/english_number");

const decimal_assertions = [
  [0.0, "Zero"],
  [0.00, "Zero"],
  [0.000, "Zero"],
  [0.001, "One Thousandth"],
  [0.01, "One Hundredth"],
  [0.010, "One Hundredth"],
  [0.1, "One Tenth"],
  [0.120, "Twelve Hundredths"],
  [1.0, "One"],
  [1.00, "One"],
  [1.000, "One"],
  [1.01, "One plus One Hundredth"],
  [1.1, "One plus One Tenth"],
  [1.10, "One plus One Tenth"],
  [1.23, "One plus Twenty-Three Hundredths"],
  [1.002, "One plus Two Thousandths"],
  [1.203, "One plus Two Hundred and Three Thousandths"],
  [1.2003, "One plus Two Thousand and Three Ten Thousandths"],
];

describe("Decimal numbers", () => {
  decimal_assertions.forEach((assertion) => {
    it(`converts the number ${assertion[0]}`, () => {
      const actual = EnglishNumber.nameOf(assertion[0]);
      const expected = assertion[1];
      expect(actual).toEqual(expected);
    });

    it(`converts the string "${assertion[0]}"`, () => {
      const actual = EnglishNumber.nameOf(assertion[0].toString());
      const expected = assertion[1];
      expect(actual).toEqual(expected);
    });
  });
});
