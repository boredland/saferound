# saferound

[![npm](https://img.shields.io/npm/v/saferound)](https://www.npmjs.com/package/saferound)
![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/saferound/latest)
[![npm](https://img.shields.io/npm/dw/saferound)](https://www.npmjs.com/package/saferound)
[![GitHub](https://img.shields.io/github/license/boredland/saferound)](./LICENSE)
[![test](https://github.com/boredland/saferound/actions/workflows/test.yml/badge.svg)](https://github.com/boredland/saferound/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/boredland/saferound/badge.svg?branch=main)](https://coveralls.io/github/boredland/saferound?branch=main)

## About

`saferound` is a simplified typescript adaption of the python library [Iteround](https://pypi.org/project/iteround/), a sum-safe rounding library.

The library solves the problem of rounding a list of numbers whilst preserving the sum.

## Usage

```typescript
import saferound from 'saferound';

const result = safeRound([4.0001, 3.2345, 3.2321, 6.4523, 5.3453, 7.3422], 0); // sum = 30
expect(result).toEqual([5, 3, 4, 6, 5, 7]); // sum = 30
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
