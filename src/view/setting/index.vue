<template>
  <div class="setting-container">
    <title-com :title-mid="title"></title-com>
    <div class="setting-header">
      <div>
        <p class="title cell-label">重置密码</p>
        <svg-icon icon-class="right-arrow" class="right-arrow"></svg-icon>
      </div>
    </div>

    <div class="setting-main">
      <group>
        <!--<cell title="检测新版本" class="cell-label">{{}}</cell>-->
        <cell title="意见反馈" is-link @click.native="goToReport"></cell>
        <cell title="关于我们" is-link @click.native="goToAboutUS"></cell>
      </group>

      <group>
        <cell title="用户协议" is-link></cell>
        <cell title="充值协议" is-link></cell>
      </group>

      <div class="setting-button">
        <!-- <button class="logout" @click="logout"></button> -->
        <x-button type="warn" @click.native="logout">退出登录</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, Group } from 'vux';
import { titleCom } from '../login/components';

export default {
  name: 'setting',
  components: {
    titleCom,
    Cell,
    Group,
  },
  data() {
    return {
      title: '系统设置',
    };
  },
  methods: {
    goToReport() {
      this.$router.push({ path: '/report' });
    },
    goToAboutUS() {
      this.$router.push({ path: '/aboutUs' });
    },
    logout() {
      const self = this;
      this.$vux.confirm.show({
        title: '提示',
        content: '退出后您无法使用停车桩！',
        onCancel() {
        },
        onConfirm() {
          self.$store.dispatch('Logout');
          self.$router.push({ path: '/' });
        },
      });
    },
  },
};
</script>

<style scoped>
.title {
  margin-left: 15px;
  margin-top: 14px;
  font-size: 14px;
}
.right-arrow {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
}
.setting-button {
  margin: 25px 10px 0;
}
</style>
