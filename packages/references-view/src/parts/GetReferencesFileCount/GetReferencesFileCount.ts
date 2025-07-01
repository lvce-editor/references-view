import * as GetUniqueObjectCount from '../GetUniqueObjectCount/GetUniqueObjectCount.ts'

export const getFileCount = (references: readonly any[]): number => {
  return GetUniqueObjectCount.getUniqueObjectCount(references, 'uri')
}
