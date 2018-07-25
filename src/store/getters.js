const getters = {
  authCode: state => state.user.authCode,
  addRouters: state => state.permission.addRouters,
  userToken: state => state.user.token,
};

export default getters;
