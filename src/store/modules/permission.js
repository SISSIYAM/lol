import { constantRouterMap, asyncRouterMap } from '@/router';

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { authUser } = data;
        let accessedRouters;
        if (authUser === 200) {
          accessedRouters = asyncRouterMap;
        } else {
          accessedRouters = [];
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    },
  },
};


export default permission;
