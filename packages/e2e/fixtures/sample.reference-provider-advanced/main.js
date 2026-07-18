const createReference = (uri, startRowIndex, startColumnIndex = 0, endColumnIndex = startColumnIndex) => {
  return {
    endColumnIndex,
    endRowIndex: startRowIndex,
    startColumnIndex,
    startRowIndex,
    uri,
  }
}

const referenceProvider = {
  languageId: 'xyz',
  provideReferences2(textDocument) {
    const { uri } = textDocument
    if (uri.endsWith('/multiple-results.xyz')) {
      return [createReference(uri, 0), createReference(uri, 1)]
    }
    if (uri.endsWith('/multiple-files.xyz')) {
      const otherUri = `${uri.slice(0, -'multiple-files.xyz'.length)}other.xyz`
      return [createReference(uri, 0), createReference(otherUri, 0)]
    }
    if (uri.endsWith('/highlight.xyz')) {
      return [createReference(uri, 0, 6, 12)]
    }
    if (uri.endsWith('/empty-line.xyz')) {
      return [createReference(uri, 1)]
    }
    return [createReference(uri, 0)]
  },
}

export const activate = () => {
  vscode.registerReferenceProvider(referenceProvider)
}
