import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker';
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as LocationStrings from '../LocationStrings/LocationsStrings.ts'
import * as LocationType from '../LocationType/LocationType.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getLeafVirtualDom = (location: any): readonly VirtualDomNode[] => {
  const { lineText, index, startOffset, endOffset } = location
  const dom = []
  dom.push({
    type: VirtualDomElements.Div,
    className: ClassNames.TreeItem,
    id: `Reference-${index}`,
    childCount: 1,
    paddingLeft: '2rem',
  })
  if (startOffset === endOffset) {
    dom.push(
      {
        type: VirtualDomElements.Div,
        className: ClassNames.Label,
        childCount: 1,
      },
      text(lineText || '(empty line)'),
    )
  } else {
    const before = lineText.slice(0, startOffset)
    const middle = lineText.slice(startOffset, endOffset)
    const end = lineText.slice(endOffset)
    dom.push(
      {
        type: VirtualDomElements.Div,
        className: ClassNames.Label,
        childCount: 3,
      },
      text(before),
      {
        type: VirtualDomElements.Span,
        className: ClassNames.Highlight,
        childCount: 1,
      },
      text(middle),
      text(end),
    )
  }
  return dom
}

const getCollapsedVirtualDom = (location: any): readonly VirtualDomNode[] => {
  const { index, name } = location
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      ariaExpanded: false,
      id: `Reference-${index}`,
      childCount: 1,
    },
    text(name),
  ]
}

const getExpandedVirtualDom = (location: any): readonly VirtualDomNode[] => {
  const { index, name, icon } = location
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      ariaExpanded: true,
      id: `Reference-${index}`,
      childCount: 2,
      paddingLeft: '1rem',
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.FileIcon,
      src: icon,
    },
    text(name),
  ]
}

const getLocationVirtualDom = (location: any): readonly VirtualDomNode[] => {
  const { type } = location
  switch (type) {
    case LocationType.Leaf:
      return getLeafVirtualDom(location)
    case LocationType.Collapsed:
      return getCollapsedVirtualDom(location)
    case LocationType.Expanded:
      return getExpandedVirtualDom(location)
    default:
      return []
  }
}

export const getLocationsVirtualDom = (locations: readonly any[], message: string): readonly VirtualDomNode[] => {
  const dom = []
  dom.push({
    type: VirtualDomElements.Div,
    className: 'Viewlet Locations',
    onMouseDown: 'handleLocationsMouseDown',
    childCount: 2,
  })
  dom.push(
    {
      type: VirtualDomElements.Div,
      className: ClassNames.LocationsMessage,
      id: 'LocationsMessage',
      role: AriaRoles.Status,
      childCount: 1,
    },
    text(message),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.LocationList,
      role: AriaRoles.Tree,
      ariaLabel: LocationStrings.locations(),
      tabIndex: 0,
      ariaDescribedBy: 'LocationsMessage',
      childCount: locations.length,
    },
    ...locations.flatMap(getLocationVirtualDom),
  )
  return dom
}
