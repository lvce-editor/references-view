const referenceProvider = {
  languageId: 'xyz',
  provideReferences2(textDocument, offset) {
    return []
  },
}

export const activate = () => {
  vscode.registerReferenceProvider(referenceProvider)
}
