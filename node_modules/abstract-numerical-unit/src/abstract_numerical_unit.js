/* @flow */

'use strict';

export type numerical = string | number;

module.exports = class AbstractNumericalUnit {
  power: number;
  value: number; // A decimal digit
  next: ?AbstractNumericalUnit;

  constructor(power: numerical, value: numerical, next: ?AbstractNumericalUnit) {
    this.power = Number(power);
    this.value = Number(value);
    this.next = next == null ? null : next;
  }

  /*
   * Returns true whenever *this digit* has a nonzero value
   */
  isNonZero(): boolean {
    return this.value !== 0;
  }

  /*
   Returns a stack of a NumericalUnits.
  */
  static fromNumerical(numerical: numerical): AbstractNumericalUnit {
    const string_of_number = Number(numerical).toString();
    if (string_of_number === "0") {
      return new AbstractNumericalUnit(0, 0, null);
    }
    const index_of_decimal = [...string_of_number].findIndex((element) => element === ".");
    const number_character_array = [...string_of_number.replace(".", "")];
    const length = number_character_array.length;
    const decimal_offset = (index_of_decimal === -1) ? length : index_of_decimal;

    let last_unit = null;
    for (let i = length - 1; i >= 0; i--) {
      const power = decimal_offset - i - 1;
      const value = Number(number_character_array[i]);
      if (value === 0) {
        continue;
      }
      last_unit = new AbstractNumericalUnit(power, value, last_unit);
    }
    // $FlowFixMe
    return last_unit;
  }

  toString(): string {
		return `AbstractNumericalUnit { p: ${this.power}, v: ${this.value}, n: ${this.next == null ? 'null' : this.next.toString()} }`
  }
}
