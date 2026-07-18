import { activate, registerReferenceProvider } from '@lvce-editor/api'

await activate()

const provideReferences = (textDocument, offset) => {
  return [
    {
      uri: `${textDocument.uri}`,
      startRowIndex: 0,
      startColumnIndex: 0,
      endRowIndex: 0,
      endColumnIndex: 0,
    },
  ]
}

const referenceProvider = {
  id: 'sample.reference-provider-basic',
  languageId: 'xyz',
  provideReferences,
  provideReferences2: provideReferences,
}

registerReferenceProvider(referenceProvider)
