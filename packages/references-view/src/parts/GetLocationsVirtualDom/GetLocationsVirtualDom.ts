import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetLocationVirtualDom from '../GetLocationVirtualDom/GetLocationVirtualDom.ts'
import * as LocationStrings from '../LocationStrings/LocationsStrings.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

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
    ...locations.flatMap(GetLocationVirtualDom.getLocationVirtualDom),
  )
  return dom
}
