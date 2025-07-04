import * as DirentType from '../DirentType/DirentType.ts'
import { getBaseName } from '../GetBaseName/GetBaseName.ts'
import { getSimpleIconRequestType } from '../GetSimpleIconRequestType/GetSimpleIconRequestType.ts'

export const toSimpleIconRequest = (request: any): any => {
  const { uri } = request
  const name = getBaseName(uri)
  return {
    name: name,
    type: getSimpleIconRequestType(DirentType.File),
  }
}
