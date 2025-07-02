import { test, expect } from '@jest/globals'
import * as Clamp from '../src/parts/Clamp/Clamp.js'

test('clamp should return value when within bounds', () => {
  expect(Clamp.clamp(5, 0, 10)).toBe(5)
  expect(Clamp.clamp(0, 0, 10)).toBe(0)
  expect(Clamp.clamp(10, 0, 10)).toBe(10)
})

test('clamp should return min when value is below min', () => {
  expect(Clamp.clamp(-5, 0, 10)).toBe(0)
  expect(Clamp.clamp(2, 5, 10)).toBe(5)
})

test('clamp should return max when value is above max', () => {
  expect(Clamp.clamp(15, 0, 10)).toBe(10)
  expect(Clamp.clamp(8, 0, 5)).toBe(5)
})

test('clamp should work with negative numbers', () => {
  expect(Clamp.clamp(-10, -20, -5)).toBe(-10)
  expect(Clamp.clamp(-25, -20, -5)).toBe(-20)
  expect(Clamp.clamp(0, -20, -5)).toBe(-5)
})