<template>
  <div id="wapper">
    <div id="form-wapper">
      <title-com :title-mes="title[index]" class="titleCom" @click="switchLoginType"></title-com>
      <text-desc :GenText="getText[index]" :detaText1="detaText1[index]"
                 :detaText2="detaText2[index]">
      </text-desc>
      <form-suite></form-suite>
      <form-phone slot="formPhone" ref="userPhone"></form-phone>
      <form-pwd v-if="loginType === 'password'" slot="formPwd" ref="userPwd"></form-pwd>
      <form-check v-else slot="formCheck" ref="userCheck"> </form-check>
      <form-other slot="formOther" :statusD="statusDes[index]"></form-other>
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
      title: ['密码登录', 'sissi', '短信登录'],
      getText: ['手机验证', '密码登录'],
      detaText1: ['请输入您的手机号码', '请输入您的手机和密码'],
      detaText2: ['登录或注册您的YouTe停车桩账号', '登录您的YouTe停车桩账号'],
      statusDes: [
        '登录即表示已阅读并同意《车桩服务规则》',
        '点击登录，即表示已阅读并同意《车桩服务规则》',
      ],
      // 设计为用户登录默认为密码登录
      loginType: 'password',
    };
  },
  methods: {
    switchLoginType() {
      if (this.loginType === 'password') {
        this.title.index = 0;
        this.getText.index = 0;
      } else {

      }
    },
  },
};
</script>

<style lang="scss" scoped type="text/css">

  .login-options{
    width: 100%;
    background-color: #f1f1f161;
    display: inline-block;
    overflow: hidden;
    font-weight: bold;
  }

  .title-img{
    float: left;
    margin-left: 3%;
  }

  .title-mid{
    width: auto;
  }

  .title-text{
    float: right;
    height: auto;
    margin-right: 3%;
    font-weight: bold;
  }
</style>
