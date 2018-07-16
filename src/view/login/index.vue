<template>
  <div class="wapper">
    <div id="form-wapper">
      <title-com :title-mes="content[index].title" class="titleCom"
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
      <form-other slot="formOther" :statusD="content[index].statusDes.item"></form-other>
    </div>
  </div>
</template>

<script>
import { formOther, formPhone, formPwd, formSuite, textDesc, titleCom, formCheck } from './components';

const index = 1;

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
          dataText1: '请输入您的手机和密码',
          dataText2: '登录您的YouTe停车桩账号',
          statusDes: {
            status: 'part1',
            DeedText: '登录',
            ClauseText: '登录即表示已阅读并同意《车桩服务规则》',
          },
        },
      ],
      loginType: 'password',
    };
  },
  methods: {
    switchLoginType(res) {
      this.loginType = res;
      if (this.loginType === 'password') {
        this.content.$set(index, 0);
      } else {
        this.content.$set(index, 1);
      }
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
