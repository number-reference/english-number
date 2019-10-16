# Convert Numbers into English

This is an iteration over [an inferior package](https://github.com/number-reference/number-to-english) that relies on a well-crafted stack structure that abstracts much more generically across languages

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
EnglishNumber.describeRatio(10, 3); // "Ten Thirds"
```

## Limitations

Support is limited to numbers not greater in magnitude than one sextillion (+/- 10^21) and with resolutoin limited to the sextillionth (10^-21).

# Motivation & Related Work

[Number Reference](www.number-reference.com) is an online encyclopedia of calculations that relies heavily on this and related packages.
