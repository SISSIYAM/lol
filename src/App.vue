<template>
  <div id="app">
    <router-view/>
    <picker :show="this.$store.getters.showPicker" :list="values" v-on:sureClick="sureClick" v-on:cancelClick="cancelClick"></picker>
  </div>
</template>

<script>
import Picker from './components/popupPicker/picker';

export default {
  name: 'App',
  components: { Picker },
  data() {
    return {
      values: [],
    };
  },
  created() {
    this.$store.dispatch('checkPlatform');
    this.$store.dispatch('hasUsersToken');
  },
  mounted() {
    this.values = [[{
      name: '请选择',
      value: '0',
    }, {
      name: '共享单车',
      value: '1',
    }, {
      name: '私人单车',
      value: '2',
    }]];
  },
  methods: {
    sureClick(value) {
      console.log(value[0]);
      this.$store.dispatch('setPickerValue', value[0]);
      // 显示界面
      this.$store.dispatch('hidePicker');
    },
    cancelClick(type) {
      this.$store.dispatch('setPickerValue', '');
      this.$store.dispatch('hidePicker');
    },
  },
};
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  body{
    background-color: #F9F9F9;
  }
  .myPicker{
    position: absolute;
    z-index: 1000000;
    bottom: 0;
    width: 100vw;
  }
</style>
