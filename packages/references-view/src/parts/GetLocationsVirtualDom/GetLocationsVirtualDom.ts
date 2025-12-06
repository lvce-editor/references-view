import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetLocationVirtualDom from '../GetLocationVirtualDom/GetLocationVirtualDom.ts'
import * as LocationStrings from '../LocationStrings/LocationsStrings.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getLocationsVirtualDom = (locations: readonly DisplayReference[], message: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: 'Viewlet Locations',
      onMouseDown: DomEventListenerFunctions.HandleClickReference,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.LocationsMessage,
      id: 'LocationsMessage',
      role: AriaRoles.Status,
      type: VirtualDomElements.Div,
    },
    VirtualDomHelpers.text(message),
    {
      ariaDescribedBy: 'LocationsMessage',
      ariaLabel: LocationStrings.locations(),
      childCount: locations.length,
      className: ClassNames.LocationList,
      role: AriaRoles.Tree,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...locations.flatMap(GetLocationVirtualDom.getLocationVirtualDom),
  ]
}
