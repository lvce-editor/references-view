import { test, expect } from '@jest/globals'
import {
  noResults,
  oneResultInOneFile,
  locations,
  manyResultsInOneFile,
  manyResultsInManyFiles,
  refresh,
  clear,
  collapseAll,
} from '../src/parts/LocationStrings/LocationsStrings.js'

test('noResults should return correct string', () => {
  const result = noResults()
  expect(result).toBe('No Results')
})

test('oneResultInOneFile should return correct string', () => {
  const result = oneResultInOneFile()
  expect(result).toBe('1 result in 1 file')
})

test('locations should return correct string', () => {
  const result = locations()
  expect(result).toBe('Locations')
})

test('manyResultsInOneFile should return correct string with count', () => {
  const result = manyResultsInOneFile(5)
  expect(result).toBe('5 results in 1 file')
})

test('manyResultsInManyFiles should return correct string with counts', () => {
  const result = manyResultsInManyFiles(10, 3)
  expect(result).toBe('10 results in 3 files')
})

test('refresh should return correct string', () => {
  const result = refresh()
  expect(result).toBe('Refresh')
})

test('clear should return correct string', () => {
  const result = clear()
  expect(result).toBe('Clear')
})

test('collapseAll should return correct string', () => {
  const result = collapseAll()
  expect(result).toBe('Collapse All')
})
