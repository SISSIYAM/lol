import { loginByUserAccount, loginByMobileVerifCode, getMobileVerifCode, getUserInfo, afterUserSignupfillInfo, retrieveVerifCode, logout } from '@api/login';

const user = {
  state: {
    id: '',
    account: '',
    name: '',
    email: '',
    telNo: '',
    password: '',
    createTime: '',
    status: '',
    groupId: '',
    sex: '',
    headPic: '',
    thirdSystem: '',
    group: '',
    uuid: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },

  actions:{
    /**
     * 验证用户登录状态
     */
    authUser({commit},token){
      return
    }
  }
};
