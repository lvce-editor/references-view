import { expect, test } from '@jest/globals'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { getSimpleIconRequestType } from '../src/parts/GetSimpleIconRequestType/GetSimpleIconRequestType.ts'

test('getSimpleIconRequestType returns the directory type for directories', () => {
  expect(getSimpleIconRequestType(DirentType.Directory)).toBe(2)
})
