import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const noResults = (): string => {
  return I18nString.i18nString(UiStrings.NoResults)
}

export const oneResultInOneFile = (): string => {
  return I18nString.i18nString(UiStrings.OneResultInOneFile)
}

export const locations = (): string => {
  return I18nString.i18nString(UiStrings.Locations)
}

export const manyResultsInOneFile = (resultCount: number): string => {
  return I18nString.i18nString(UiStrings.ManyResultsInOneFile, {
    PH1: resultCount,
  })
}

export const manyResultsInManyFiles = (resultCount: number, fileCount: number): string => {
  return I18nString.i18nString(UiStrings.ManyResultsInManyFiles, {
    PH1: resultCount,
    PH2: fileCount,
  })
}
