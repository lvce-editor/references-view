import { activate, registerDefinitionProvider } from '@lvce-editor/api'

await activate()

registerDefinitionProvider({
  id: 'sample.definition-provider-only',
  languageId: 'xyz',
  provideDefinition(textDocument) {
    const startOffset = textDocument.text.indexOf('add')
    return {
      endOffset: startOffset + 3,
      startOffset,
      uri: textDocument.uri,
    }
  },
})
