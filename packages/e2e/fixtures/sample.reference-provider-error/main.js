import { activate, registerReferenceProvider } from '@lvce-editor/api'

await activate()

const referenceProvider = {
  id: 'sample.reference-provider-error',
  languageId: 'xyz',
  provideReferences(textDocument, offset) {
    throw new Error(`oops`)
  },
}

registerReferenceProvider(referenceProvider)
