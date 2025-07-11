import * as Assert from '../Assert/Assert.ts'
import * as LocationStrings from '../LocationStrings/LocationsStrings.ts'

export const getMessage = (resultCount: number, fileCount: number): string => {
  Assert.number(resultCount)
  Assert.number(fileCount)
  if (resultCount === 0) {
    return LocationStrings.noResults()
  }
  if (resultCount === 1 && fileCount === 1) {
    return LocationStrings.oneResultInOneFile()
  }
  if (fileCount === 1) {
    return LocationStrings.manyResultsInOneFile(resultCount)
  }
  return LocationStrings.manyResultsInManyFiles(resultCount, fileCount)
}
