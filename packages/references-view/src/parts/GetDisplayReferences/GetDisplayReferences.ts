import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import type { Reference } from '../Reference/Reference.ts'
import * as GetName from '../GetBaseName/GetBaseName.ts'
import * as LocationType from '../LocationType/LocationType.ts'

export const getDisplayReferences = (references: readonly Reference[], icons: readonly string[], collapsedUris: readonly string[]): readonly DisplayReference[] => {
  const displayReferences: DisplayReference[] = []
  let currentUri = ''
  let outerPosInSet = 1
  let innerPosInSet = 1
  let fileCount = 0
  let index = 0
  for (const reference of references) {
    if (reference.uri === currentUri) {
      displayReferences.push({
        depth: 2,
        posInSet: innerPosInSet++,
        setSize: 1,
        type: LocationType.Leaf,
        uri: '',
        name: '',
        lineText: reference.lineText || '',
        icon: '',
        index: index++,
        startOffset: reference.startColumnIndex || reference.startOffset,
        endOffset: reference.endColumnIndex || reference.endOffset,
      })
    } else {
      fileCount++
      currentUri = reference.uri
      innerPosInSet = 1
      const name = GetName.getBaseName(reference.uri)
      const relativeIndex = references.indexOf(reference)
      const icon = icons[relativeIndex]
      displayReferences.push({
        depth: 1,
        posInSet: outerPosInSet++,
        setSize: 1,
        type: LocationType.Expanded,
        uri: reference.uri,
        name,
        lineText: '',
        icon,
        index: index++,
        startOffset: 0,
        endOffset: 0,
      })
      if (!collapsedUris.includes(reference.uri)) {
        displayReferences.push({
          depth: 2,
          posInSet: innerPosInSet++,
          setSize: 1,
          type: LocationType.Leaf,
          uri: '',
          name: '',
          lineText: reference.lineText || '',
          icon: '',
          index: index++,
          startOffset: reference.startColumnIndex || reference.startOffset,
          endOffset: reference.endColumnIndex || reference.endOffset,
        })
      }
    }
  }
  return displayReferences
}
