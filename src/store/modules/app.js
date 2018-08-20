import ShareBikeApi from "../../utils/sharebikeCordovaApi";

const app = {
  state: {
    showPicker: false,
    pickerValue: '',
  },
  mutations: {
    SET_SHOWPICKER: (state, showValue) => {
      state.showPicker = showValue;
    },
    SET_PICKERVALUE: (state, pickerValue) => {
      state.pickerValue = pickerValue;
    },
  },
  actions: {
    beginShowPicker({ commit }) {
      commit('SET_SHOWPICKER', true);
    },
    hidePicker({ commit }) {
      commit('SET_SHOWPICKER', false);
    },
    setPickerValue({ commit }, value) {
      commit('SET_PICKERVALUE', value);
    },
  },
};

export default app;
