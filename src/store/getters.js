const getters = {
  authCode: state => state.user.authCode,
  addRouters: state => state.permission.addRouters,
  userToken: state => state.user.token,
  userName: state => state.user.name,
  userPhone: state => state.user.telNo,
  createTime: state => state.user.createTime,
  platformType: state => state.user.paltform,
  pickerValue: state => state.app.pickerValue,
  showPicker: state => state.app.showPicker,
  userHeadPic: state => state.user.headPic,
};

export default getters;
