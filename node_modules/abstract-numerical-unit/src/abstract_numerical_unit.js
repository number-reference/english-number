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

  isOne(): boolean {
    return this.value === 1 && this.power === 0 && this.next == null;
  }

  isZero(): boolean {
    return this.value === 0 && this.power === 0 && this.next == null;
  }

  /*
   Returns a stack of a NumericalUnits.
  */
  static fromNumerical(numerical: numerical): self {
    const string_of_number = Number(numerical).toString();
    if (string_of_number === "0") {
      return new this(0, 0, null);
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
      last_unit = new this(power, value, last_unit);
    }
    return last_unit;
  }

  /*
   * Returns a copy of this but with the same properties.
   */
  copy(): this {
    return new this.constructor(
      this.power,
      this.value,
      (this.next != null) ? this.next.copy() : null,
    );
  }

  /*
   * Increases the power of all units by `digits`.  Negative inputs supported.
   */
  shift(digits: number): this {
    let cursor = this;
    while (cursor != null) {
      cursor.power += digits;
      cursor = cursor.next;
    }
    return this;
  }

  /*
   * Returns the last unit in the stack
   */
  tail(): this {
    let cursor = this;
    while (cursor.next != null) {
      cursor = cursor.next;
    }
    return cursor;
  }

  toString(): string {
		return `AbstractNumericalUnit { p: ${this.power}, v: ${this.value}, n: ${this.next == null ? 'null' : this.next.toString()} }`
  }
}
