import { constantRouterMap } from '@/router';

// function hasPermission (auth, route){
//   if (route.meta && route.meta.auth){
// return
//   }
// }

const permission = {
  state: {
    routers: constantRouterMap,
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = constantRouterMap.concat(routers);
    },
  },
  // actions: {
  //   GenerateRoutes({ commit }, data) {
  //     return new Promise((resolve) => {
  //       const { auth } = data;
  //       let accessedRouters;
  //       if (auth) {
  //         accessedRouters = asyncRouterMap;
  //       }
  //       else {
  //         accessedRouters = filterAsyncRouter(asyncRouterMap, auth)
  //       }
  //       commit('SET_ROUTERS', accessedRouters)
  //       resolve();
  //     });
  //   },
  // },
};


export default permission;
