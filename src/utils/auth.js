const TokenKey = 'User-Token'
const RefreshTokenKey = 'Refresh-Token'

export const setToken = value => {
  if (typeof value === 'object') {
    this.value = JSON.stringify(value)
  }
  localStorage.setItem(TokenKey, value)
}

export const setRefreshToken = value => {
  if (typeof value === 'object') {
    this.value = JSON.stringify(value)
  }
  localStorage.setItem(RefreshTokenKey, value)
}

// 移除所有TOKEN
export const removeToken = () => {
  localStorage.removeItem(TokenKey)
  localStorage.removeItem(RefreshTokenKey)
}

// 获取TOKEN
export const getToken = () => localStorage.getItem(TokenKey)

// 获取刷新TOKEN
export const getRefreshToken = () => localStorage.getItem(RefreshTokenKey)
