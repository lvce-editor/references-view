import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplayReference } from '../DisplayReference/DisplayReference.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetLocationVirtualDom from '../GetLocationVirtualDom/GetLocationVirtualDom.ts'
import * as LocationStrings from '../LocationStrings/LocationsStrings.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const locationsNode: VirtualDomNode = {
  childCount: 2,
  className: mergeClassNames('Viewlet', 'Locations'),
  onMouseDown: DomEventListenerFunctions.HandleClickReference,
  type: VirtualDomElements.Div,
}

const locationsMessageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.LocationsMessage,
  id: 'LocationsMessage',
  role: AriaRoles.Status,
  type: VirtualDomElements.Div,
}

export const getLocationsVirtualDom = (locations: readonly DisplayReference[], message: string): readonly VirtualDomNode[] => {
  return [
    locationsNode,
    locationsMessageNode,
    VirtualDomHelpers.text(message),
    {
      ariaDescribedBy: 'LocationsMessage',
      ariaLabel: LocationStrings.locations(),
      childCount: locations.length,
      className: ClassNames.LocationList,
      role: AriaRoles.Tree,
      tabIndex: TabIndex.Focusable,
      type: VirtualDomElements.Div,
    },
    ...locations.flatMap(GetLocationVirtualDom.getLocationVirtualDom),
  ]
}
