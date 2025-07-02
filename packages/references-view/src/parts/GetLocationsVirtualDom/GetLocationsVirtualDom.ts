import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as LocationStrings from '../LocationStrings/LocationsStrings.ts'
import * as LocationType from '../LocationType/LocationType.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getLeafVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
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
      VirtualDomHelpers.text(lineText || '(empty line)'),
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
      VirtualDomHelpers.text(before),
      {
        type: VirtualDomElements.Span,
        className: ClassNames.Highlight,
        childCount: 1,
      },
      VirtualDomHelpers.text(middle),
      VirtualDomHelpers.text(end),
    )
  }
  return dom
}

const getCollapsedVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { index, name } = location
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      ariaExpanded: false,
      id: `Reference-${index}`,
      childCount: 1,
    },
    VirtualDomHelpers.text(name),
  ]
}

const getExpandedVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
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
    VirtualDomHelpers.text(name),
  ]
}

const getLocationVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
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

export const getLocationsVirtualDom = (locations: readonly DisplayReference[], message: string): readonly VirtualDomNode[] => {
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
    VirtualDomHelpers.text(message),
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
