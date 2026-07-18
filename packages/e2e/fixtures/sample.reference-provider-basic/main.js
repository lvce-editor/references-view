import { activate, registerReferenceProvider } from '@lvce-editor/api'

await activate()

const referenceProvider = {
  id: 'sample.reference-provider-basic',
  languageId: 'xyz',
  provideReferences(textDocument, offset) {
    return [
      {
        uri: `${textDocument.uri}`,
        startRowIndex: 0,
        startColumnIndex: 0,
        endRowIndex: 0,
        endColumnIndex: 0,
      },
    ]
  },
}

registerReferenceProvider(referenceProvider)
