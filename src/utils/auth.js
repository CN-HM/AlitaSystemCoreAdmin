const TokenKey = 'User-Token'

export const setToken = value => {
  if (typeof value === 'object') {
    this.value = JSON.stringify(value)
  }
  localStorage.setItem(TokenKey, value)
}

export const removeToken = () => localStorage.removeItem(TokenKey)

export const getToken = () => localStorage.getItem(TokenKey)
