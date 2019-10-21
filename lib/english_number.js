/*       */
"strict";

                                                       

const AbstractNumericalUnit = require('abstract-numerical-unit');
const assert = require("assert");

const IRREGULAR_ORDINALS                     = {
  "One": "First",
  "Two": "Second",
  "Three": "Third",
  "Five": "Fifth",
  "Eight": "Eighth",
  "Nine": "Ninth",
  "Twelve": "Twelfth",
};

const UNITS           = [
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
const SCALES           = [
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
  #word        ;

  static fromNumerical(numerical           )       {
    return super.fromNumerical(numerical).setNames();
  }

  static nameOf(numerical           )         {
    const original = this.fromNumerical(numerical);
    const [whole_number, remainder] = original.split();
    if (whole_number != null && remainder == null) {
      return whole_number.getLabel(false);
    }
    if (whole_number == null && remainder != null) {
      return remainder.getDecimalFraction();
    }
    if (whole_number != null && remainder != null) {
      return `${whole_number.getLabel(false)} plus ${remainder.getDecimalFraction()}`;
    }
    return "Zero";
  }

  static orderOf(numerical           )         {
    return EnglishNumber.fromNumerical(numerical).getLabel(true);
  }

  static nameOfRatio(numerator_numerical           , denominator_numerical           )         {
    const n = Number(numerator_numerical);
    const d = Number(denominator_numerical);
    const numerator = this.fromNumerical(numerator_numerical);
    const denominator = this.fromNumerical(denominator_numerical);
    assert(Math.floor(n) === n, "Numerator must be an integer");
    assert(Math.floor(d) === d && d !== 0 , "Denominator must be a non-zero integer");
    return `${numerator.getLabel(false)} ${denominator.getDenominator(!numerator.isOne())}`;
  }

  inSameUnitAsNext()          {
    if (this.next == null) {
      return false;
    }

    return Math.floor(this.power / 3) === Math.floor(this.next.power / 3);
  }

  getUnit()         {
    return UNITS[this.value];
  }

  getScale()          {
    if (this.inSameUnitAsNext()) {
      return null;
    }
    const scale = SCALES[Math.floor(this.power / 3) - 1];
    return (scale == null) ? null : scale;
  }

  setNames()       {
    let cursor = this;
    while (cursor != null) {
      cursor.setName();
      cursor = cursor.next;
    }
    return this;
  }

  setName()       {
    if (this.power % 3 === 1) {
      let value = this.value;
      if (this.next != null && this.value === 1 && this.next.power + 1 === this.power) {
        value = 10 * value + this.next.value;
        this.value = this.next.value;
        this.next = this.next.next;
      }
      switch (value) {
        case 1:
          this.word = "Ten";
          break;
        case 2:
          this.word = "Twenty";
          break;
        case 3:
          this.word = "Thirty";
          break;
        case 4:
          this.word = "Forty";
          break;
        case 5:
          this.word = "Fifty";
          break;
        case 6:
          this.word = "Sixty";
          break;
        case 7:
          this.word = "Seventy";
          break;
        case 8:
          this.word = "Eighty";
          break;
        case 9:
          this.word = "Ninety";
          break;
        case 11:
          this.word = "Eleven";
          break;
        case 12:
          this.word = "Twelve";
          break;
        case 13:
          this.word = "Thirteen";
          break;
        case 15:
          this.word = "Fifteen";
          break;
        default:
          this.word = `${this.getUnit()}teen`;
      }
    } else {
      this.word = this.getUnit();
    }
    return this;
  }

  static ordinalize(string        )         {
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

  toString()         {
    return this.getLabel(false);
  }

  getLabel(ordinal         )         {
    let string = this.word;
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

  getDenominator(plural         )         {
    if (this.power === 0 && this.value === 2 && this.next == null) {
      return plural ? "Halves" : "Half";
    } else if (this.power === 0 && this.value === 4 && this.next == null) {
      return `Quarter${plural ? "s" : ""}`;
    }
    if (this.getScale() === null) {
      return `${this.getLabel(true)}${plural ? "s" : ""}`;
    } else {
      return `${this.getLabel(true)}${plural ? "s" : ""}`;
    }
  }

  /*
   * Returns a tuple of the whole number (1st element) separated from its fractional component (2nd)
   */
  split()                 {
    let pointer = this;
    if (this.power < 0) {
      return [null, this];
    }
    while (pointer.next != null && pointer.next.power >= 0) {
      pointer = pointer.next;
    }
    const next = pointer.next;
    pointer.next = null;
    return [this, next];
  }

  getDecimalFraction()         {
    const lowest_power = this.tail().power;
    const numerator = this.copy().shift(-lowest_power).setNames();
    const denominator = this.tail().copy();
    denominator.power *= -1;
    denominator.value = 1;
    denominator.setNames();
    let denominator_phrase = denominator.getDenominator(!numerator.isOne());
    if (denominator_phrase.slice(0, 4) === "One ") {
      denominator_phrase = denominator_phrase.slice(4);
    }
    return `${numerator.getLabel(false)} ${denominator_phrase}`;
  }
};
