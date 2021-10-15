const state = {
  visitedViews: [],
  cachedViews: [],
}

const mutations = {
  ADD_VISITED_VIEW: (reState, view) => {
    if (reState.visitedViews.some(v => v.path === view.path)) return
    reState.visitedViews.push(
      { ...view, title: view.meta.title || 'no-name' },
    )
  },
  ADD_CACHED_VIEW: (reState, view) => {
    if (reState.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      reState.cachedViews.push(view.name)
    }
  },

  DEL_VISITED_VIEW: (reState, view) => {
    const viewState = reState
    for (const [i, v] of viewState.visitedViews.entries()) {
      if (v.path === view.path) {
        viewState.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (reState, view) => {
    const viewState = reState
    const index = viewState.cachedViews.indexOf(view.name)
    // eslint-disable-next-line no-unused-expressions
    index > -1 && viewState.cachedViews.splice(index, 1)
  },

  DEL_OTHERS_VISITED_VIEWS: (reState, view) => {
    const viewState = reState
    viewState.visitedViews = reState.visitedViews.filter(v => v.meta.affix || v.path === view.path)
  },
  DEL_OTHERS_CACHED_VIEWS: (reState, view) => {
    const viewState = reState
    const index = reState.cachedViews.indexOf(view.name)
    if (index > -1) {
      viewState.cachedViews = reState.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      viewState.cachedViews = []
    }
  },

  DEL_ALL_VISITED_VIEWS: reState => {
    const viewState = reState

    // keep affix tags
    const affixTags = reState.visitedViews.filter(tag => tag.meta.affix)
    viewState.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: reState => {
    const viewState = reState
    viewState.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (reState, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },

  delView({ dispatch, reState }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...reState.visitedViews],
        cachedViews: [...reState.cachedViews],
      })
    })
  },
  delVisitedView({ commit, reState }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...reState.visitedViews])
    })
  },
  delCachedView({ commit, reState }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...reState.cachedViews])
    })
  },

  delOthersViews({ dispatch, reState }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...reState.visitedViews],
        cachedViews: [...reState.cachedViews],
      })
    })
  },
  delOthersVisitedViews({ commit, reState }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...reState.visitedViews])
    })
  },
  delOthersCachedViews({ commit, reState }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...reState.cachedViews])
    })
  },

  delAllViews({ dispatch, reState }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...reState.visitedViews],
        cachedViews: [...reState.cachedViews],
      })
    })
  },
  delAllVisitedViews({ commit, reState }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...reState.visitedViews])
    })
  },
  delAllCachedViews({ commit, reState }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...reState.cachedViews])
    })
  },

  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
