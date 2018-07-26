<template>
  <div class="wapper">
    <div id="form-wapper">
      <title-com v-bind:title-mes="content[index].title" class="titleCom"
                 v-bind:loginType="loginType"
                 v-on:switchLoginType="switchLoginType($event)">
      </title-com>
      <text-desc :GenText="content[index].dataText" :dataText1="content[index].dataText1"
                 :dataText2="content[index].dataText2">
      </text-desc>
      <form-suite></form-suite>
      <form-phone slot="formPhone" ref="userPhone"></form-phone>
      <form-pwd v-if="loginType === 'password'" slot="formPwd" ref="userPwd"></form-pwd>
      <form-check v-else-if="loginType === 'verifyCode'" slot="formCheck" ref="userCheck">
      </form-check>
      <form-other slot="formOther" :statusD="content[index].statusDes"></form-other>
    </div>
  </div>
</template>

<script>
import { formOther, formPhone, formPwd, formSuite, textDesc, titleCom, formCheck } from './components';

export default {
  name: 'login',
  components: {
    titleCom,
    formOther,
    formPhone,
    formPwd,
    formSuite,
    textDesc,
    formCheck,
  },
  data() {
    return {
      content: [
        {
          title: '密码登录',
          dataText: '手机验证',
          dataText1: '请输入您的手机号',
          dataText2: '登录或注册您的YouTe停车桩账号',
          statusDes: {
            status: 'part2',
            DeedText: '登录',
            ClauseText: '点击登录，即表示已阅读并同意《车桩服务规则》',
          },
        },
        {
          title: '短信登录',
          dataText: '密码登录',
          dataText1: '请输入手机和密码',
          dataText2: '登录您的“优车位”账号',
          statusDes: {
            status: 'part1',
            DeedText: '登录',
            ClauseText: '登录即表示已阅读并同意《车桩服务规则》',
          },
        },
      ],
      loginType: 'password',
      index: 1,
    };
  },
  methods: {
    switchLoginType(res) {
      this.loginType = res;
      if (this.loginType === 'password') {
        this.index = 0;
      } else {
        this.index = 1;
      }
    },

    sendPost() {
      const self = this;
      const userPhone = self.$refs.userPhone.value;
      if (self.loginType === 'password') {
        const password = self.encrypt(this.$refs.userPwd.value);
        const regUser = /^1[3|4|5|7|8][0-9]{9}$/;
        if (userPhone == null || userPhone === '') {
          self.showTotal('提示信息', '手机号不能为空', '');
        } else if (!regUser.test(userPhone)) {
          self.showTotal('提示信息', '请输入正确的手机号');
        } else if (password == null || password === '') {
          self.showTotal('提示信息', '密码不能为空');
        } else {
          const loginForm = {
            userPhone,
            password,
          };
          self.$store.dispatch('LoginByUserAccount', loginForm).then(() => {
            console.log('test');
            self.$router.push({ path: '/' });
          }).catch(() => {});
        }
      } else {
        const userCheck = self.$refs.userCheck.checkNum;
        const loginForm = {
          userPhone,
          userCheck,
        };
        if (userPhone == null || userPhone === '') {
          self.showTotal('提示信息', '请输入手机号', '');
        } else if (userCheck == null || userCheck === '') {
          self.showTotal('提示信息', '验证码不能为空', '');
        } else {
          self.$store.dispatch('LoginByMobileVerifCode', loginForm).then(() => {
            self.$router.push({ path: '/registerPage' });
          }).catch(() => {});
        }
      }
    },

    sendCheck() {
      const self = this;
      const userPhone = this.$refs.userPhone.value;
      const regUser = /^1[3|4|5|7|8][0-9]{9}$/;
      if (userPhone == null || userPhone === '') {
        self.showTotal('提示信息', '手机号不能为空');
        return false;
      } else if (!regUser.test(userPhone)) {
        self.showTotal('提示信息', '请输入正确的手机号');
        return false;
      }
      const mobile = userPhone;
      const mobile1 = {
        mobile,
      };
      self.$store.dispatch('GetMobileVerifCode', mobile1).then((response) => {
        console.log(response.data);
        if (response.data.code === 200) {
          self.showTotal('提示信息', '发送验证码成功', '');
        } else {
          self.showTotal('提示信息', '请稍后重试', '');
        }
      }).catch(() => {});
      return true;
    },

  },
};
</script>

<style lang="scss">
  .wapper {
    width: 100%;
    height: 100%;
    .titleCom {
      height: 8%;
    }
  }
</style>
