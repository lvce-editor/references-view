import { test, expect } from '@jest/globals'
import * as GetLineText from '../src/parts/GetLineText/GetLineText.js'

test('getLineText should extract first line', () => {
  const content: string = 'hello world\nsecond line\nthird line'
  const result: string = GetLineText.getLineText(content, 0, 0, 0, 0)
  expect(result).toBe('hello world')
})

test('getLineText should extract second line', () => {
  const content: string = 'first line\nhello world\nthird line'
  const result: string = GetLineText.getLineText(content, 1, 0, 1, 0)
  expect(result).toBe('hello world')
})

test('getLineText should extract last line', () => {
  const content: string = 'first line\nsecond line\nhello world'
  const result: string = GetLineText.getLineText(content, 2, 0, 2, 0)
  expect(result).toBe('hello world')
})

test('getLineText should work with single line', () => {
  const content: string = 'hello world'
  const result: string = GetLineText.getLineText(content, 0, 0, 0, 0)
  expect(result).toBe('hello world')
})

test('getLineText should work with empty lines', () => {
  const content: string = 'first line\n\nthird line'
  const result: string = GetLineText.getLineText(content, 1, 0, 1, 0)
  expect(result).toBe('')
})

test('getLineText should trim whitespace', () => {
  const content: string = 'first line\n  hello world  \nthird line'
  const result: string = GetLineText.getLineText(content, 1, 0, 1, 0)
  expect(result).toBe('hello world')
})