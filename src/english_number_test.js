/* @flow */
"use strict";

const EnglishUnit = require("./english_number");
const assert = require("assert");

const cardinal_assertions = [
  [0, "Zero"],
  [1, "One"],
  [7, "Seven"],
  [11, "Eleven"],
  [16, "Sixteen"],
  [17, "Seventeen"],
  [21, "Twenty-One"],
  [27, "Twenty-Seven"],
  [30, "Thirty"],
  [31, "Thirty-One"],
  [90, "Ninety"],
  [99, "Ninety-Nine"],
  [101, "One Hundred and One"],
  [107, "One Hundred and Seven"],
  [111, "One Hundred and Eleven"],
  [117, "One Hundred and Seventeen"],
  [121, "One Hundred and Twenty-One"],
  [127, "One Hundred and Twenty-Seven"],
  [130, "One Hundred and Thirty"],
  [500, "Five Hundred"],
  [1000, "One Thousand"],
  [1001, "One Thousand and One"],
  [1007, "One Thousand and Seven"],
  [1011, "One Thousand and Eleven"],
  [1017, "One Thousand and Seventeen"],
  [1021, "One Thousand and Twenty-One"],
  [1027, "One Thousand and Twenty-Seven"],
  [1030, "One Thousand and Thirty"],
  [1101, "One Thousand One Hundred and One"],
  [1107, "One Thousand One Hundred and Seven"],
  [1111, "One Thousand One Hundred and Eleven"],
  [1117, "One Thousand One Hundred and Seventeen"],
  [1121, "One Thousand One Hundred and Twenty-One"],
  [1127, "One Thousand One Hundred and Twenty-Seven"],
  [1130, "One Thousand One Hundred and Thirty"],
  [1500, "One Thousand Five Hundred"],
  [99000, "Ninety-Nine Thousand"],
  [99001, "Ninety-Nine Thousand and One"],
  [100500, "One Hundred Thousand Five Hundred"],
  [100501, "One Hundred Thousand Five Hundred and One"],
  [101500, "One Hundred and One Thousand Five Hundred"],
  [107500, "One Hundred and Seven Thousand Five Hundred"],
  [111500, "One Hundred and Eleven Thousand Five Hundred"],
  [117500, "One Hundred and Seventeen Thousand Five Hundred"],
  [121500, "One Hundred and Twenty-One Thousand Five Hundred"],
  [127500, "One Hundred and Twenty-Seven Thousand Five Hundred"],
  [127521, "One Hundred and Twenty-Seven Thousand Five Hundred and Twenty-One"],
  [130500, "One Hundred and Thirty Thousand Five Hundred"],
  [1000000, "One Million"],
];

cardinal_assertions.forEach(function(assertion) {
  const actual = EnglishUnit.name(assertion[0]);
  const expected = assertion[1];
  assert.deepStrictEqual(actual, expected);
});

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
]

ordinal_assertions.forEach(function(assertion) {
  const actual = EnglishUnit.order(assertion[0]);
  const expected = assertion[1];
  assert.deepStrictEqual(actual, expected);
});

console.log("All tests pass!");
