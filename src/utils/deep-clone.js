/**
 * 深克隆方法 解决json克隆无法复制function的问题
 * @export
 * @param {*} obj
 * @return {*}
 */
const deepClone = obj => {
  let newObj = null
  if (typeof obj === 'object' && obj !== null) {
    newObj = obj instanceof Array ? [] : {}
    // eslint-disable-next-line guard-for-in
    for (const i in obj) {
      newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  } else {
    newObj = obj
  }

  return newObj
}

export default deepClone
