/* @flow */
"use strict";

const EnglishUnit = require("./english_unit");
const assert = require("assert");

const assertions = [
  [0, "Zero"],
  [1, "One"],
  [7, "Seven"],
  [11, "Eleven"],
  [17, "Seventeen"],
  [21, "Twenty-One"],
  [27, "Twenty-Seven"],
  [30, "Thirty"],
  [90, "Ninety"],
  [101, "One Hundred and One"],
  [107, "One Hundred and Seven"],
  [111, "One Hundred and Eleven"],
  [117, "One Hundred and Seventeen"],
  [121, "One Hundred and Twenty-One"],
  [127, "One Hundred and Twenty-Seven"],
  [130, "One Hundred and Thirty"],
  [500, "Five Hundred"],
  [1000, "One Thousand"],
  [1001, "One Thousand One"],
  [1007, "One Thousand Seven"],
  [1011, "One Thousand Eleven"],
  [1017, "One Thousand Seventeen"],
  [1021, "One Thousand Twenty-One"],
  [1027, "One Thousand Twenty-Seven"],
  [1030, "One Thousand Thirty"],
  [1101, "One Thousand One Hundred and One"],
  [1107, "One Thousand One Hundred and Seven"],
  [1111, "One Thousand One Hundred and Eleven"],
  [1117, "One Thousand One Hundred and Seventeen"],
  [1121, "One Thousand One Hundred and Twenty-One"],
  [1127, "One Thousand One Hundred and Twenty-Seven"],
  [1130, "One Thousand One Hundred and Thirty"],
  [1500, "One Thousand Five Hundred"],
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

assertions.forEach(function(assertion) {
  const actual = EnglishUnit.fromNumerical(assertion[0]).toString();
  const expected = assertion[1];
  assert.deepStrictEqual(actual, expected);
}); 

console.log("All tests pass!");
