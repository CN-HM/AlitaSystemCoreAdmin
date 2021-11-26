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
    timeout: 2500,
    vertical: false,
  },

  // 逻辑处理,同步函数
  mutations: {
    OPEN_SNACKBAR(state, options) {
      state.visible = true
      state.msg = options.msg
      state.color = options.color
    },
    CLOSE_SNACKBAR(state) {
      state.visible = false
    },
  },

  // 逻辑处理,异步函数
  actions: {
    success(context, msg) {
      setTimeout(() => {
        context.commit('CLOSE_SNACKBAR')
      }, context.state.timeout)

      return new Promise(() => {
        context.commit('OPEN_SNACKBAR', {
          msg,
          color: 'success',
        })
      })
    },
    error(context, msg) {
      setTimeout(() => {
        context.commit('CLOSE_SNACKBAR')
      }, context.state.timeout)

      return new Promise(() => {
        context.commit('OPEN_SNACKBAR', {
          msg,
          color: 'error',
        })
      })
    },
    warning(context, msg) {
      setTimeout(() => {
        context.commit('CLOSE_SNACKBAR')
      }, context.state.timeout)

      return new Promise(() => {
        context.commit('OPEN_SNACKBAR', {
          msg,
          color: 'warning',
        })
      })
    },
    info(context, msg) {
      setTimeout(() => {
        context.commit('CLOSE_SNACKBAR')
      }, context.state.timeout)

      return new Promise(() => {
        context.commit('OPEN_SNACKBAR', {
          msg,
          color: 'accent',
        })
      })
    },
  },
}
export default message
