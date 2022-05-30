export function isDef(value: any): boolean {
  return value !== undefined && value !== null
}

export function isUnEmpty(arr: any[]): boolean {
  return arr && arr.length > 0
}
