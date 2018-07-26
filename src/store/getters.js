const getters = {
  authCode: state => state.user.authCode,
  addRouters: state => state.permission.addRouters,
  userToken: state => state.user.token,
  userName: state => state.user.name,
  userPhone: state => state.user.telNo,
  createTime: state => state.user.createTime,
};

export default getters;
