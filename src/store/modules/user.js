import { hasAuth } from '../../api/auth';
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
     * 验证用户登录状态
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
  },
};

export default user;
