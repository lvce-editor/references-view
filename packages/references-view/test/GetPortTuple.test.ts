import { test, expect } from '@jest/globals'
import * as GetPortTuple from '../src/parts/GetPortTuple/GetPortTuple.js'

test('getPortTuple should return an object with port1 and port2', () => {
  const result = GetPortTuple.getPortTuple()
  expect(result).toHaveProperty('port1')
  expect(result).toHaveProperty('port2')
})