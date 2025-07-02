import { test, expect } from '@jest/globals'
import { noResults, oneResultInOneFile, locations, manyResultsInOneFile, manyResultsInManyFiles } from '../src/parts/LocationStrings/LocationsStrings.js'

test('noResults should return a string', () => {
  const result = noResults()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('oneResultInOneFile should return a string', () => {
  const result = oneResultInOneFile()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('locations should return a string', () => {
  const result = locations()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('manyResultsInOneFile should return a string with count', () => {
  const result = manyResultsInOneFile(5)
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('manyResultsInManyFiles should return a string with counts', () => {
  const result = manyResultsInManyFiles(10, 3)
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})