import { describe, expect, test } from 'vitest';
import { sum, sumArray, sumArray2 } from '../test.ts';

describe('sum', () => {
  test('adds 1 + 2 to equal 3', () => {
    const a = 1;
    const b = 2;
    const result = sum(a, b);
    expect(result).toBe(a + b);
  });
});

describe('sumArray', () => {
  test('sum array number', () => {
    const numbers = [1, 2, 3, 4, 5];
    if (numbers.length === 0) {
      expect(sumArray(numbers)).toBe(0);
      return;
    }
    numbers.forEach((num) => {
      if (typeof num !== 'number') {
        throw new Error('Array contains non-number element');
      }
    });
    const result = sumArray(numbers);
    const expression = sumArray2(numbers);
    expect(result).toBe(Number(expression));
  });
});
