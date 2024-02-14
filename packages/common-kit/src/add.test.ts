import { expect, test } from 'vitest';
import add from './add';

test('adds two numbers', () => {
  expect(add(1, 9)).toBe(10);
});
