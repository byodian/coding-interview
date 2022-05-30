export function setItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getItem(key: string) {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export function removeItem(key: string) {
  localStorage.removeItem(key)
}

export function clearItems() {
  localStorage.clear()
}
