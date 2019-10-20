/*       */
'strict';

                                                       

const AbstractNumericalUnit = require('abstract-numerical-unit');

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
  #name        ;

  constructor(power           , value           , next                ) {
    super(power, value, next);
  }

  static fromNumerical(numerical           )                {
    return EnglishNumber.fromAbstract(super.fromNumerical(numerical));
  }

  static fromAbstract(abstract_unit                       )                {
    const number = new EnglishNumber(
      abstract_unit.power,
      abstract_unit.value,
      abstract_unit.next == null ? null : EnglishNumber.fromAbstract(abstract_unit.next),
    )
    number.setNames();
    return number;
  }

  static name(numerical           )         {
    return EnglishNumber.fromNumerical(numerical).toString();
  }

  static order(numerical           )         {
    const number = EnglishNumber.fromNumerical(numerical);
    return number.getLabel(true);
  }

  static ratio(numerator           , denominator           )         {
    return "a";
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

  separate()               {
    let pointer = this;
    while (pointer.next != null && pointer.power >= 0) {
      pointer = pointer.next;
    }
    return [this, pointer.next];
  }
};
