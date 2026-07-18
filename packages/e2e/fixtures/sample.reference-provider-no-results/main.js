import { activate, registerReferenceProvider } from '@lvce-editor/api'

await activate()

const provideReferences = (textDocument, offset) => {
  return []
}

const referenceProvider = {
  id: 'sample.reference-provider-no-results',
  languageId: 'xyz',
  provideReferences,
  provideReferences2: provideReferences,
}

registerReferenceProvider(referenceProvider)
