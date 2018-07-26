import { hasAuth } from '../../api/auth';
import { loginByUserAccount, loginByMobileVerifCode, getMobileVerifCode } from '../../api/login';
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
  },

  actions: {
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
          commit('SET_TOKEN', data.uuid);
          resolve();
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
          resolve();
        }).catch(() => {});
      });
    },

    UpdateUserName({ commit }, newName) {
      return new Promise((resolve) => {
        updateUserName(newName).then((response) => {
          const code = response.data;
          commit('SET_');
        }).catch();
      });
    },
  },
};

export default user;
