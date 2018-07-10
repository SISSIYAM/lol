const getters = {
  drawerBar: state => state.app.drawerBar,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  userToken: state => state.user.token,
};

export default getters;
