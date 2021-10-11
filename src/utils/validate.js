/**
 * @returns {Array}
 * @desc 用户名校验
 */
export function validUserName() {
  const rule = [
    v => !!v || 'UserName is required',
    v => (v && v.length <= 20) || 'UserName must be less than 20 characters',
  ]

  return rule
}

/**
 * @returns {Array}
 * @desc 密码校验
 */
export function validUserPassword() {
  const rule = [
    v => !!v || 'Password is required',
    v => (v && v.length <= 20) || 'Password must be less than 20 characters',
  ]

  return rule
}
