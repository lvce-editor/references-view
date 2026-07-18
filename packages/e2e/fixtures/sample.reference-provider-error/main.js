import { activate, registerReferenceProvider } from '@lvce-editor/api'

await activate()

const provideReferences = (textDocument, offset) => {
  throw new Error(`oops`)
}

const referenceProvider = {
  id: 'sample.reference-provider-error',
  languageId: 'xyz',
  provideReferences,
  provideReferences2: provideReferences,
}

registerReferenceProvider(referenceProvider)
