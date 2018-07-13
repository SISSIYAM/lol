<template>
  <div id="wapper">
    <div id="form-wapper">
      <title-com :title-mes="title" class="titleCom"></title-com>
      <text-desc :GenText="getText" :detaText1="detaText1" :detaText2="detaText2"></text-desc>
      <form-suite></form-suite>
      <form-phone slot="formPhone" ref="userPhone"></form-phone>
      <form-pwd slot="formPwd" ref="userPwd"></form-pwd>
      <form-other slot="formOther" :statusD="statusDes"></form-other>
    </div>
  </div>
</template>

<script>
import { formOther, formPhone, formPwd, formSuite, textDesc, titleCom } from './components';

export default {
  name: 'login',
  components: {
    titleCom,
    formOther,
    formPhone,
    formPwd,
    formSuite,
    textDesc,
  },
  data() {
    return {
    };
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
