import * as Assert from '../Assert/Assert.ts'

export const getUniqueObjectCount = (objects: readonly any[], key: string): number => {
  Assert.array(objects)
  Assert.string(key)
  const seen: any[] = []
  for (const object of objects) {
    const value = object[key]
    if (!seen.includes(value)) {
      seen.push(value)
    }
  }
  return seen.length
}
