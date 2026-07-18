import { activate, registerReferenceProvider } from '@lvce-editor/api'

await activate()

const referenceProvider = {
  id: 'sample.reference-provider-no-results',
  languageId: 'xyz',
  provideReferences(textDocument, offset) {
    return []
  },
}

registerReferenceProvider(referenceProvider)
