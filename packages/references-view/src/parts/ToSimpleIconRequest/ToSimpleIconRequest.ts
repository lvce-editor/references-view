import { getSimpleIconRequestType } from '../GetSimpleIconRequestType/GetSimpleIconRequestType.ts'

export const toSimpleIconRequest = (request: any): any => {
  return {
    name: request.name,
    type: getSimpleIconRequestType(request.type),
  }
}
