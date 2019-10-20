# Convert Numbers into English

Using a well-crafted stack structure that abstracts generically across languages.

## Installation

```
npm install english-number
```

## Usage

```
const EnglishNumber = require('english-number');
```

Pass any decimal representation of a number:

```
EnglishNumber.name(1521.12); // => "One Thousand Five Hundred and Twenty-One and Twelve Hundredths"
EnglishNumber.name("40001.7"); // => "Forty Thousand One and Seven Tenths"
```

Count off with `order()`

```
EnglishNumber.order(208); // => "Two Hundredth and Eighth"
```

Or, if you're working with ratios and want to avoid repeating decimals:

```
EnglishNumber.ratio(7, 2); // "Seven Halves"
EnglishNumber.ratio(10, 3); // "Ten Thirds"
```

## Tests

More than 200 [Jasmine](https://jasmine.github.io) specs that handle the many irregularities of the English language

```
npm test
```

## Limitations

Support is limited to numbers not greater in magnitude than one vigintillion (+/- 10^63) and with resolutoin limited to the vigintillionth (10^-63).

# Motivation & Related Work

[Number Reference](www.number-reference.com) is an online encyclopedia of calculations that relies heavily on this and related packages.

This is an iteration over [an inferior package](https://github.com/number-reference/number-to-english).
