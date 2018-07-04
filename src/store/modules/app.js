const app = {
  state: {
    drawerBar: {
      opened: false,
      withoutAnimation: false,
    },
  },
  mutations: {
    TOGGLE_DRAWERBAR: (state) => {
      state.drawerBar.opened = true;
      state.drawerBar.withoutAnimation = false;
    },
    CLOSE_DRAWERBAR: (state, withoutAnimation) => {
      state.drawerBar.opended = false;
      state.drawerBar.withoutAnimation = withoutAnimation;
    },
  },
  actions: {
    toggleDrawerBar({ commit }) {
      commit('TOGGLE_DRAWERBAR');
    },
    closeDrawerBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_DRAWERBAR', withoutAnimation);
    },
  },
};

export default app;
