const referenceProvider = {
  languageId: 'xyz',
  provideReferences2(textDocument, offset) {
    throw new Error(`oops`)
  },
}

export const activate = () => {
  vscode.registerReferenceProvider(referenceProvider)
}
