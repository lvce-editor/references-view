import * as DirentType from '../DirentType/DirentType.ts'
import * as IconTheme from '../IconTheme/IconTheme.ts'
import * as LocationType from '../LocationType/LocationType.ts'

const getName = (uri: string): string => {
  if (!uri) {
    return ''
  }
  return uri.slice(uri.lastIndexOf('/') + 1)
}

export const getDisplayReferences = (references: readonly any[]): readonly any[] => {
  const displayReferences = []
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
      const name = getName(reference.uri)
      displayReferences.push({
        depth: 1,
        posInSet: outerPosInSet++,
        setSize: 1,
        type: LocationType.Expanded,
        uri: reference.uri,
        name,
        lineText: '',
        icon: IconTheme.getIcon({
          type: DirentType.File,
          path: reference.uri,
          name,
        }),
        index: index++,
        startOffset: 0,
        endOffset: 0,
      })
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
  return displayReferences
}
