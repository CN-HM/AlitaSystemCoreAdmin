/**
 * @param msg 信息
 * @param color message 颜色
 * @param visible 是否可见
 * @param showClose 关闭按钮
 * @param timeout 停留持续时间
 */
const message = {
  namespaced: true,
  state: {
    msg: '',
    color: '',
    visible: false,
    showClose: true,
    timeout: 5000,
    vertical: false,
  },

  // 逻辑处理,同步函数
  mutations: {
    OPEN_SNACKBAR(state, options) {
      state.visible = true
      state.msg = options.msg
      state.color = options.color

      // setTimeout(() => {
      //   state.visible = false
      // }, state.timeout)
    },

    // CLOSE_SNACKBAR(state) {
    //   state.visible = false
    // },
    // setShowClose(state, isShow) {
    //   state.showClose = isShow
    // },
    // setTimeout(state, timeout) {
    //   state.timeout = timeout
    // },
  },

  // 逻辑处理,异步函数
  actions: {
    success(context, options) {
      return new Promise(() => {
        context.commit('OPEN_SNACKBAR', {
          msg: options.msg,
          color: 'success',
        })
      })
    },
    error(context, options) {
      return new Promise(() => {
        context.commit('OPEN_SNACKBAR', {
          msg: options.msg,
          color: 'error',
        })
      })
    },
    warning(context, options) {
      return new Promise(() => {
        context.commit('OPEN_SNACKBAR', {
          msg: options.msg,
          color: 'warning',
        })
      })
    },
    info(context, options) {
      return new Promise(() => {
        context.commit('OPEN_SNACKBAR', {
          msg: options.msg,
          color: 'accent',
        })
      })
    },
  },
}
export default message
