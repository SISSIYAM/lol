import { hasAuth } from '../../api/auth';
import { loginByUserAccount, loginByMobileVerifCode } from '../../api/login';
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
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_ID: () => {},
    SET_ACCOUNT: () => {},
    SET_NAME: () => {},
    SET_EMAIL: () => {},
    SET_TELNO: () => {},
    SET_PASSWORD: () => {},
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
    authUser({ commit }, { token }) {
      return new Promise((resolve) => {
        hasAuth(token).then((response) => {
          const data = response.data;
          commit('SET_CODE', data.code);
          resolve();
        });
      });
    },

    LoginByUserAccount({ commit }, loginForm) {
      const userPhone = loginForm.userPhone.trim();
      const password = loginForm.password.trim();
      return new Promise((resolve, reject) => {
        loginByUserAccount(userPhone, password).then((response) => {
          const data = response.data;
          commit('SET_TOKEN', data.uuid);
          ShareBikeApi.saveUserInfo((data) => {
            const data = data;
            commit ('SET_')
          });
          resolve();
        }).catch((error) => {
          reject(error);
        });
      },
      );
    },

    LoginByMobileVerifCode({ commit }, userPhone, userCheck) {
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
  },
};

export default user;
