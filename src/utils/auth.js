export const setLocal = (key, value) => {
  if (typeof value === 'object') {
    this.value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const getLocal = key => localStorage.getItem(key)
