const state = {
  pendingAjax: new Map(),
  count: 0
}
const base_api = process.env.VUE_APP_BASE_API
const mutations = {
  ADD_PENDING_AJAX: (state, { config, cancelToken }) => {
    const map = state.pendingAjax;
    const duplicatedKey = JSON.stringify({
      duplicatedKey: `${config.method}${config.url}${config.data || ''}`
    })
    if (duplicatedKey && !map.has(duplicatedKey)) {
      state.pendingAjax.set(duplicatedKey, cancelToken);
      state.count++;
      console.log('addPendingAjax', state.count, duplicatedKey);
    }
  },
  REMOVE_PENDING_AJAX: (state, config) => {
    const map = state.pendingAjax;
    const duplicatedKey = JSON.stringify({
      duplicatedKey: `${config.method}${base_api}${config.url}${config.data || ''}`
    });
    if (duplicatedKey && map.has(duplicatedKey)) {
      const cancel = map.get(duplicatedKey);
      cancel(duplicatedKey);
      state.pendingAjax.delete(duplicatedKey);
      console.log('removePendingAjax', state.count, duplicatedKey);
    }
  },
  CLEAR_PENDING: (state) => {
    const map = state.pendingAjax;
    map.forEach(item => {
      item('路由跳转取消请求');
    });
    state.pendingAjax = [];
    console.log('clearPending');
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}