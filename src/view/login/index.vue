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
      <div class="input-text" v-if="loginType === 'newPassword'">
        <el-input :type="TextType" v-model="value" ref="userPwd" placeholder="请设置新的登录密码">
          <template slot="prepend"><span style="color: black">新密码</span>&nbsp;</template>
          <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i>
        </el-input>
      </div>
      <form-suite></form-suite>
      <form-phone slot="formPhone" ref="userPhone"></form-phone>
      <form-pwd v-if="loginType === 'password'" slot="formPwd" ref="userPwd"></form-pwd>
      <form-check v-else-if="loginType === 'verifyCode'" slot="formCheck" ref="userCheck">
      </form-check>
      <form-check v-else-if="loginType === 'reset'" slot="formCheck" ref="userCheck">
      </form-check>
      <form-other slot="formOther" :statusD="content[index].statusDes"
                  v-bind:loginType="loginType"
                  v-on:switchLoginType="switchLoginType($event)"></form-other>
    </div>
  </div>
</template>

<script>
import { formOther, formPhone, formPwd, formSuite, textDesc, titleCom, formCheck } from './components';
import user from '../../store/modules/user';

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
            ClauseText: '点击登录，即表示已阅读并同意',
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
            ClauseText: '登录即表示已阅读并同意',
          },
        },
        { title: '',
          dataText: '找回密码',
          dataText1: '请输入您的手机号码',
          dataText2: '验证并重新设置新的登录密码',
          statusDes: {
            status: 'part4',
            DeedText: '验证',
          },
        },
        { title: '',
          dataText: '找回密码',
          TextType: 'password',
          dataText1: '请重置您的密码',
          dataText2: '请设置您的新密码并牢记',
          statusDes: {
            status: 'part5',
            DeedText: '确定',
          },
          value: '',
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
        this.index = 1;
      } else if (this.loginType === 'verifyCode') {
        this.index = 0;
      } else {
        this.index = 2;
      }
    },

    sendPost() {
      const self = this;
      const userPhone = self.$refs.userPhone.value;
      const regUser = /^1[3|4|5|7|8][0-9]{9}$/;
      if (self.loginType === 'password') {
        const password = self.encrypt(this.$refs.userPwd.value);
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
      } else if (self.loginType === 'verifyCode') {
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
          self.$store.dispatch('LoginByMobileVerifCode', loginForm).then((response) => {
            const code = response.data.data;
            if (code === -2 || code === -1) {
              self.$router.replace({ path: '/registerPage' });
            } else if (code === 200) {
              self.$router.replace({ path: '/' });
            }
          }).catch(() => {});
        }
      } else {
        const userCheckNum = self.$refs.userCheck.userCheck;
        if (userPhone == null || userPhone === '') {
          self.$vux.confirm.show({
            title: '提示',
            content: '手机号不能为空！',
          });
        } else if (!regUser.test(userPhone)) {
          self.$vux.confirm.show({
            title: '提示',
            content: '请输入正确的手机号！',
          });
        } else if (userCheckNum == null || userCheckNum === '') {
          self.$vux.confirm.show({
            title: '提示',
            content: '验证码不能为空！',
          });
        } else {
          const mobile = userPhone;
          const mobile1 = {
            mobile,
          };
          self.$store.dispatch('', mobile1).then((response) => {
            console.log(response.data);
            if (response.data.code === 200) {
              self.$vux.confirm.show({
                title: '提示',
                content: '！',
              });
              self.switchLoginType();
            } else {
              self.$vux.confirm.show({
                title: '提示',
                content: '！',
              });
            }
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
        // if (response.data.code === 200) {
        //   self.$router.push({ path: '/' });
        // } else {
        //   self.$vux.confirm.show({
        //     title: '提示',
        //     content: '完善信息失败！',
        //   });
        // }
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
    .titleCom .title_text {
      height: auto;
      font-weight: lighter;
      margin-top: 11px;
      font-size:0.9em;
      margin-left:80%;
  }
  }
</style>
