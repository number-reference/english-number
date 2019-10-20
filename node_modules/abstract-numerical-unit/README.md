# Represent Numbers as a Stack

What do you get by putting the the mantissa at the head of a stack of digits?

A very natural means of converting numerical representations into natural language.

## Install

```
npm install --save integer-to-cardinal-english
```

NOTE: `abstract-numerical-unit` has no production dependencies.

## Usage

```node
const AbstractNumericalUnit = require('abstract-numerical-unit');

/* 
 * Returns an AbstractNumericalUnit representing 
 * 1 times ten raised to the power of 1,
 * with a pointer to 2 times ten raised to teh power of -1
 * which in turn has a pointer to 3 times ten raised to the power of -2 
 */
AbstractNumericalUnit.fromNumerical("10.23")
```

## Tests

Using the [Jasmine](https://jasmine.github.io)

```
npm test
```

## Motivation & Related Work

[Number Reference](http://www.number-reference.com) is an online encyclopedia
of calculations that relies heavily on this and related packages.

## License

Nice and Brief: [BSD-3-Clause](./LICENSE)
