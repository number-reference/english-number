/*       */

'use strict';

                                        

module.exports = class AbstractNumericalUnit {
                
                 // A decimal digit
                               

  constructor(power           , value           , next                        ) {
    this.power = Number(power);
    this.value = Number(value);
    this.next = next == null ? null : next;
  }

  /*
   * Returns true whenever *this digit* has a nonzero value
   */
  isNonZero()          {
    return this.value !== 0;
  }

  /*
   Returns a stack of a NumericalUnits.
  */
  static fromNumerical(numerical           )       {
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
  copy()       {
    return new this.constructor(
      this.power,
      this.value,
      this.next,
    );
  }

  /*
   * Reverse the stack, modifying the original such that the original head is now the tail and vice versa.
   */
  invert()       {
    let cursor = this.next;
    let last_head = this;
    let current_tail = this;
    current_tail.next = null;
    while (cursor != null) {
      last_head = cursor;
      cursor = cursor.next;
      last_head.next = current_tail;
      current_tail = last_head;
    }
    return last_head;
  }

  toString()         {
		return `AbstractNumericalUnit { p: ${this.power}, v: ${this.value}, n: ${this.next == null ? 'null' : this.next.toString()} }`
  }
}
