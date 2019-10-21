/* @flow */
'strict';

import type {numerical} from "abstract-numerical-unit";

const AbstractNumericalUnit = require('abstract-numerical-unit');

const IRREGULAR_ORDINALS: {[string]: string} = {
  "One": "First",
  "Two": "Second",
  "Three": "Third",
  "Five": "Fifth",
  "Eight": "Eighth",
  "Nine": "Ninth",
  "Twelve": "Twelfth",
};

const UNITS: string[] = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

// Source: https://en.wikipedia.org/wiki/Names_of_large_numbers
const SCALES: string[] = [
  "Thousand",
  "Million",
  "Billion",
  "Trillion",
  "Quadrillion",
  "Quintillion",
  "Sextillion",
  "Octillion",
  "Nonillion",
  "Decillion",
  "Undecillion",
  "Duodecillion",
  "Tredecillion",
  "Quattuordecillion",
  "Quindecillion",
  "Sexdecillion",
  "Septendecillion",
  "Octodecillion",
  "Novemdecillion",
  "Vigintillion",
]

/*
 * Source: https://en.wikipedia.org/wiki/English_numerals
 */
module.exports = class EnglishNumber extends AbstractNumericalUnit {
  #name: string;

  static fromNumerical(numerical: numerical): this {
    return super.fromNumerical(numerical).setNames();
  }

  static name(numerical: numerical): string {
    return EnglishNumber.fromNumerical(numerical).toString();
  }

  static order(numerical: numerical): string {
    return EnglishNumber.fromNumerical(numerical).getLabel(true);
  }

  static ratio(numerator_numerical: numerical, denominator_numerical: numerical): string {
    const n = Number(numerator_numerical);
    const d = Number(denominator_numerical);
    const numerator = this.fromNumerical(numerator_numerical);
    const denominator = this.fromNumerical(denominator_numerical);
    assert(Math.floor(n) === n, "Numerator must be an integer");
    assert(Math.floor(d) === d && d !== 0 , "Denominator must be a non-zero integer");
    return `${numerator.getLabel(false)} ${denominator.reverse().getDenominator(n !== 1)}`;
  }

  inSameUnitAsNext(): boolean {
    if (this.next == null) {
      return false;
    }

    return Math.floor(this.power / 3) === Math.floor(this.next.power / 3);
  }

  getUnit(): string {
    return UNITS[this.value];
  }

  getScale(): ?string {
    if (this.inSameUnitAsNext()) {
      return null;
    }
    const scale = SCALES[Math.floor(this.power / 3) - 1];
    return (scale == null) ? null : scale;
  }

  setNames(): self {
    let cursor = this;
    while (cursor != null) {
      cursor.setName();
      cursor = cursor.next;
    }
    return this;
  }

  setName(): self {
    if (this.power % 3 === 1) {
      let value = this.value;
      if (this.next != null && this.value === 1 && this.next.power + 1 === this.power) {
        value = 10 * value + this.next.value;
        this.value = this.next.value;
        this.next = this.next.next;
      }
      switch (value) {
        case 1:
          this.name = "Ten";
          break;
        case 2:
          this.name = "Twenty";
          break;
        case 3:
          this.name = "Thirty";
          break;
        case 4:
          this.name = "Forty";
          break;
        case 5:
          this.name = "Fifty";
          break;
        case 6:
          this.name = "Sixty";
          break;
        case 7:
          this.name = "Seventy";
          break;
        case 8:
          this.name = "Eighty";
          break;
        case 9:
          this.name = "Ninety";
          break;
        case 11:
          this.name = "Eleven";
          break;
        case 12:
          this.name = "Twelve";
          break;
        case 13:
          this.name = "Thirteen";
          break;
        case 15:
          this.name = "Fifteen";
          break;
        default:
          this.name = `${this.getUnit()}teen`;
      }
    } else {
      this.name = this.getUnit();
    }
    return this;
  }

  static ordinalize(string: string): string {
    if (string in IRREGULAR_ORDINALS) {
      return IRREGULAR_ORDINALS[string];
    } else {
      if (string.slice(-1) === "y") {
        return string.slice(0, -1) + "ieth";  // e.g. Eighty --> Eightieth
      } else {
        return string + "th";  // e.g. Regular ordinalization
      }
    }
  }

  toString(): string {
    return this.getLabel(false);
  }

  getLabel(ordinal: boolean): string {
    let string = this.name;
    const modulus = this.power % 3;

    if (modulus === 2) {
      string += " Hundred";
    }

    if (this.getScale() !== null) {
      string += ` ${String(this.getScale())}`;
    }

    if (ordinal && this.next == null) {
      return EnglishNumber.ordinalize(string);
    }

    if (this.next != null && modulus === 1 && this.next.power + 1 === this.power) {
      return `${string}-${this.next.getLabel(ordinal)}`
    }

    if (this.next != null && this.next.power % 3 <= 1) {
      return `${string} and ${this.next.getLabel(ordinal)}`
    }

    if (this.next != null) {
      string += ` ${this.next.getLabel(ordinal)}`;
    }

    return string;
  }

  separate(): [self, self] {
    let pointer = this;
    while (pointer.next != null && pointer.power >= 0) {
      pointer = pointer.next;
    }
    return [this, pointer.next];
  }
};
