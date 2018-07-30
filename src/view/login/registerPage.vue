<template>
  <div id="wapper">
    <title-com :title-mes="title" class="titleCom"></title-com>
    <text-desc :GenText="getText" :detaText1="detaText1" :detaText2="detaText2"></text-desc>
    <div class="input_text">
      <el-input ref="userName" v-model="value"
                placeholder="4-16个字符" clearable minlength="4" maxlength="16">
        <template slot="prepend">
          <div style="width: 35px">
            <span style="color: black">昵称</span>
          </div>
        </template>
      </el-input>
    </div>
    <form-suite></form-suite>
    <form-pwd slot="frompwd" ref="userPwd" ></form-pwd>
    <form-other slot="fromOther" :statusD="statusDes"></form-other>
  </div>
</template>

<script>
import { formOther, formPhone, formPwd, formSuite, textDesc, titleCom, formCheck } from './components';

export default {
  name: 'registerPage',
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
      title: '',
      getText: '完善资料',
      detaText1: '请补全昵称和密码',
      detaText2: '完成您的YouTe停车桩账号注册',
      statusDes: {
        status: 'part3',
        DeedText: '完成',
      },
      value: '',
    };
  },
  methods: {
    sendPost() {
      const self = this;
      const userName = this.$refs.userName.value;
      const userPwd = this.encrypt(this.$refs.userPwd.value);
      console.log(`加密前    ${this.$refs.userPwd.value}`);
      console.log(`${userName}  ${userPwd}`);
      if (userName == null || userName === '') {
        self.showTotal('提示信息', '用户名不能为空');
      } else if (userPwd == null || userPwd === '') {
        self.showTotal('提示信息', '密码不能为空');
      } else {
        const registerForm = {
          userName,
          userPwd,
        }
        self.$store.dispatch('AfterUserSignupfillInfo', registerForm).then((response) => {
          console.log(response.data);
          if (response.data.code !== 200) {
            self.$router.push('/');
            self.showTotal('提示信息', '完善信息出现错误');
          } else {
            self.$router.push('/');
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    showTotal(title, content, strPath) {
      const Vue = this;
      //  弹出框
      this.$vux.alert.show({
        title,
        content,
        onHide() {
          if (strPath == null || strPath === '') {
            console.log('隐藏');
          } else {
            Vue.$router.push(strPath);
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  #wapper{
    width: 100%;
    height: 100%;
    .titleCom{
      height: 8%;
    }
  }
  .input_text{
    width: 90%;
    font-weight: bold;
    color: black;
    font-size: 1.1em;
    margin: 0.1em auto;
  }
</style>
