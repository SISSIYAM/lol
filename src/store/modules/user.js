import { hasAuth } from '../../api/auth';
import { loginByUserAccount,
  loginByMobileVerifCode,
  getMobileVerifCode,
  afterUserSignupfillInfo,
  logout } from '../../api/login';
import { updateUserName } from '../../api/userDetails';
import ShareBikeApi from '../../utils/sharebikeCordovaApi';

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
    token: '',
    code: '',
    authCode: '',
    platform: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_TELNO: (state, telNo) => {
      state.telNo = telNo;
    },
    SET_PASSWORD: (state, password) => {
      state.password = password;
    },
    SET_CREATETIME: (state, createTime) => {
      state.createTime = createTime;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_GROUPID: (state, groupId) => {
      state.groupId = groupId;
    },
    SET_HEADPIC: (state, headPic) => {
      state.headPic = headPic;
    },
    SET_GROUP: (state, group) => {
      state.group = group;
    },
    SET_AUTHCODE: (state, authCode) => {
      state.authCode = authCode;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_PLATFORM: (state, platform) => {
      state.paltform = platform;
    },
  },

  actions: {
    /**
     * 获取用户设备平台属性调不通api请求入口
     * */
    checkPlatform({ commit }) {
      ShareBikeApi.checkPlatform((data) => {
        const platformType = data.type;
        commit('SET_PLATFORM', platformType);
      });
    },
    /**
     * 获取储存中的用户UUID
     * @param {{data.uuid:string}} data
     */
    hasUsersToken({ commit }) {
      ShareBikeApi.getUserInfo((data) => {
        const token = data.uuid;
        commit('SET_TOKEN', token);
      });
    },
    /**
     * 验证用户登录状态是否过期
     */
    authUser({ commit }, token) {
      return new Promise((resolve, reject) => {
        console.log(`authUser:${token}`);
        hasAuth(token).then((response) => {
          const data = response.data;
          commit('SET_AUTHCODE', data.code);
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },

    LoginByUserAccount({ commit }, loginForm) {
      const userPhone = loginForm.userPhone.trim();
      const password = loginForm.password.trim();
      return new Promise((resolve, reject) => {
        loginByUserAccount(userPhone, password).then((response) => {
          const data = response.data.data;
          commit('SET_TOKEN', data.uuid);
          commit('SET_ID', data.id);
          commit('SET_NAME', data.name);
          commit('SET_ACCOUNT', data.account);
          commit('SET_HEADPIC', data.headPic);
          commit('SET_TELNO', data.telNo);
          commit('SET_CREATETIME', data.createTime);
          commit('SET_AUTHCODE', true);
          // ShareBikeApi.saveUserInfo(data);
          resolve();
        }).catch((error) => {
          reject(error);
        });
      },
      );
    },

    LoginByMobileVerifCode({ commit }, loginForm) {
      const userPhone = loginForm.userPhone.trim();
      const userCheck = loginForm.userCheck.trim();
      return new Promise((resolve, reject) => {
        loginByMobileVerifCode(userPhone, userCheck).then((response) => {
          const data = response.data;
          if (data.code === 200) {
            commit('SET_TOKEN', data.msg);
          }
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      },
      );
    },

    GetMobileVerifCode({ commit }, userPhone1) {
      return new Promise((resolve) => {
        getMobileVerifCode(userPhone1).then((response) => {
          const code = response.data;
          commit('SET_MOBILE', code);
          resolve(response);
        }).catch(() => {});
      });
    },

    UpdateUserName({ commit }, Name) {
      return new Promise((resolve) => {
        updateUserName(Name).then((response) => {
          const code = response.data.code;
          if (code === 200) {
            commit('SET_NAME', Name);
          }
          resolve(response);
        }).catch();
      });
    },

    AfterUserSignupfillInfo({ commit }, registerForm) {
      const name = registerForm.userName.trim();
      const password = registerForm.userPwd.trim();
      return new Promise((resolve) => {
        afterUserSignupfillInfo(name, password).then((response) => {
          const data = response.data;
          if (data.code === 200) {
            commit('SET_AUTHCODE', true);
            commit('SET_NAME', data.data.name);
            commit('SET_TOKEN', data.data.uuid);
            commit('SET_TELNO', data.data.telNo);
            commit('SET_CREATETIME', data.data.createTime);
          }
          resolve(response);
        }).catch(() => {});
      });
    },

    Logout({ commit }) {
      logout().then((response) => {
        const data = response.data.code;
        if (data === 200) {
          commit('SET_AUTHCODE', false);
          commit('SET_TOKEN', '');
          commit('SET_ID', '');
          commit('SET_NAME', '');
          commit('SET_ACCOUNT', '');
          commit('SET_HEADPIC', '');
          commit('SET_TELNO', '');
          commit('SET_CREATETIME', '');
          // ShareBikeApi.deleteUser();
        }
      }).catch();
    },


  },
};

export default user;
