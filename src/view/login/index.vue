<template>
  <div class="login-container">
    <el-form class="login-form">
      <!-- 用户名和密码，以及用户民和验证码登录切换 -->
      <div class="login-options">
        <div ref="titleImg" class="title-img" @click="goBack">
          <icon name="chevron-left" scale="1.2" fixed-width></icon>
        </div>
        <div ref="titleTextMid" class="title-mid">
          {{ titleMid }}
        </div>
        <div ref="titleText" class="title-text" @click="turnTo" style="margin-top: 0px">
          {{ titleMes }}
        </div>
      </div>
      <!-- 引导用户不同登录方式输入信息 -->
      <div class="login-content">
        <div class="General">
          <span>{{GenText}}</span>
        </div>
        <div class="detali">
          <p>
            <span>{{detailsOne}}</span>
          </p>
          <p>
            <span>{{detailsTwo}}</span>
          </p>
        </div>
      </div>
      <!-- 电话号码，密码，或者验证码输入项 -->
      <el-form-item prop="username">
        <span>+86</span>
        <el-input name="username" :type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <span>密码</span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item prop="authCode">
        <el-input v-model="loginForm.authCode" clearable maxlength="6" placeholder="6位短信验证码"/>
        <el-button type="primary" ref="sendButton" @click="doSendCheck" :disabled ="Stuas">{{ statusCheck }}</el-button>
      </el-form-item>

      <!-- 提交按钮，登录和找回密码验证-->
      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="">验证</el-button>

      <!-- 服务规则，找回密码 TODO：车桩服务规则窗口阅读，找回密码验证-->
      <div class="login-tips">
        <span>登录即表示已阅读并同意《车桩服务规则》</span>
      </div>
      <div class="forget-password">
        <span @click.prevent="forgetPwd">忘记密码</span>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    titleMes: String,
    titleMid: String,
    toPathUrl: String,
  },
  data() {
    return {
    };
  },

  mounted() {
    //  初始化样式
    this.getMarignTop();
  },


  methods: {

    goBack() {
      if (this.$props.toPathUrl === '' || this.$props.toPathUrl == null) {
        this.$router.go(-1);
      } else {
        this.$router.push(this.$props.toPathUrl);
      }
    },

    turnTo() {
      if (this.$props.titleMes === '短信登录') {
        this.$router.push('/register');
      } else if (this.$props.titleMes === '密码登录') {
        this.$router.push('/');
      }
    },

    getMarignTop() {
      //  初始化样式
      const Ptitle = this.$refs.title;
      const CtitleImg = this.$refs.titleImg;
      const titleTextMid = this.$refs.titleTextMid;
      const valueHeight = Ptitle.offsetHeight - CtitleImg.offsetHeight;
      if (this.$props.titleMid === '' || this.$props.titleMid == null) {
        if (this.$props.titleMes === '') {
          CtitleImg.style.marginTop = `${(valueHeight * 0.5) + 5}px`;
        } else {
          const CtitleText = this.$refs.titleText;
          CtitleText.style.marginTop = `${(valueHeight * 0.5) + 5}px`;
          CtitleImg.style.marginTop = `${(valueHeight * 0.5) + 5}px`;
        }
      } else {
        CtitleImg.style.marginTop = `${(valueHeight * 0.5) + 5}px`;
        titleTextMid.style.marginTop = `${(valueHeight * 0.5) + 5}px`;
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
