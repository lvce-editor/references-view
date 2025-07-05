import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as GetCollapsedVirtualDom from '../GetCollapsedVirtualDom/GetCollapsedVirtualDom.ts'
import * as GetExpandedVirtualDom from '../GetExpandedVirtualDom/GetExpandedVirtualDom.ts'
import * as GetLeafVirtualDom from '../GetLeafVirtualDom/GetLeafVirtualDom.ts'
import * as LocationType from '../LocationType/LocationType.ts'

export const getLocationVirtualDom = (location: DisplayReference): readonly VirtualDomNode[] => {
  const { type } = location
  switch (type) {
    case LocationType.Leaf:
      return GetLeafVirtualDom.getLeafVirtualDom(location)
    case LocationType.Collapsed:
      return GetCollapsedVirtualDom.getCollapsedVirtualDom(location)
    case LocationType.Expanded:
      return GetExpandedVirtualDom.getExpandedVirtualDom(location)
    default:
      return []
  }
}
