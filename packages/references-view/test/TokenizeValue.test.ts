import { test, expect } from '@jest/globals'
import { tokenizeValue } from '../src/parts/TokenizeValue/TokenizeValue.js'

test('tokenizeValue should tokenize simple identifiers', () => {
  const result = tokenizeValue('hello')
  expect(result).toEqual(['hello', 'Identifier'])
})

test('tokenizeValue should tokenize keywords', () => {
  const result = tokenizeValue('const')
  expect(result).toEqual(['const', 'Keyword'])
})

test('tokenizeValue should tokenize function keyword', () => {
  const result = tokenizeValue('function')
  expect(result).toEqual(['function', 'Function'])
})

test('tokenizeValue should tokenize numbers', () => {
  const result = tokenizeValue('123')
  expect(result).toEqual(['123', 'Number'])
})

test('tokenizeValue should tokenize decimal numbers', () => {
  const result = tokenizeValue('123.45')
  expect(result).toEqual(['123.45', 'Number'])
})

test('tokenizeValue should tokenize strings', () => {
  const result = tokenizeValue('"hello"')
  expect(result).toEqual(['"hello"', 'String'])
})

test('tokenizeValue should tokenize operators', () => {
  const result = tokenizeValue('+')
  expect(result).toEqual(['+', 'Operator'])
})

test('tokenizeValue should tokenize multi-character operators', () => {
  const result = tokenizeValue('===')
  expect(result).toEqual(['===', 'Operator'])
})

test('tokenizeValue should tokenize punctuation', () => {
  const result = tokenizeValue('(')
  expect(result).toEqual(['(', 'Punctuation'])
})

test('tokenizeValue should tokenize whitespace', () => {
  const result = tokenizeValue(' ')
  expect(result).toEqual([' ', 'WhiteSpace'])
})

test('tokenizeValue should tokenize comments', () => {
  const result = tokenizeValue('// comment')
  expect(result).toEqual(['// comment', 'Comment'])
})

test('tokenizeValue should tokenize complex expression', () => {
  const result = tokenizeValue('const x = 123 + "hello"')
  expect(result).toEqual([
    'const', 'Keyword',
    ' ', 'WhiteSpace',
    'x', 'Identifier',
    ' ', 'WhiteSpace',
    '=', 'Operator',
    ' ', 'WhiteSpace',
    '123', 'Number',
    ' ', 'WhiteSpace',
    '+', 'Operator',
    ' ', 'WhiteSpace',
    '"hello"', 'String'
  ])
})