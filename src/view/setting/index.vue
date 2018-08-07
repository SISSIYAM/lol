<template>
  <div class="setting-container">
    <div class="setting-header">
      <title-com :title-mes="title" class="titleCom"></title-com>
      <div>
        <p class="title cell-label">重置密码</p>
        <svg-icon icon-class="right-arrow" class="right-arrow"></svg-icon>
      </div>
    </div>

    <div class="setting-main">
      <group>
        <!--<cell title="检测新版本" class="cell-label">{{}}</cell>-->
        <cell title="意见反馈" is-link class="cell-label" @click.native="goToReport"></cell>
        <cell title="关于我们" is-link class="cell-label" @click.native="goToAboutUS"></cell>
      </group>

      <group>
        <cell title="用户协议" is-link class="cell-label" @click.native="goToCustomerAgreement"></cell>
        <cell title="充值协议" is-link class="cell-label" @click.native="goToPayAgreement"></cell>
      </group>

      <div class="setting-button">
        <button class="logout" @click="logout">退出登录</button>
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
    goToCustomerAgreement() {
      this.$router.push({ path: '/customerAgreement' });
    },
    goToPayAgreement() {
      this.$router.push({ path: '/payAgreement' });
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
.titleCom {
 font-size: 13px;
  text-align: center !important;
  float: initial !important;
}
.cell-label {
  font-size: 13px;
}
.title {
  margin-left: 15px;
  margin-top: 14px;
}
.right-arrow {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
}
.setting-button {
  margin-top: 25px;
  margin-left: 10px;
}
.logout {
  width:98%;
  height:38px;
  border-radius: 3px;
  background-color: #ff3b30;
  color: #fff;
  line-height: 1;
  border: 1px solid #ff3b30;
  }
</style>
