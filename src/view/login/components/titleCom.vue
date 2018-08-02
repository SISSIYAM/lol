<template>
  <div ref="title" id="title">
    <div ref="titleImg" class="title_img" @click="goBack">
      <svg-icon icon-class="icon_back"></svg-icon>
    </div>
    <div ref="titleTextMid" class="title_mid">
      {{ titleMid }}
    </div>
    <div ref="titleText" class="title_text" v-on:click="turnTo">
      {{ titleMes }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'titleCom',
  props: ['titleMes', 'titleMid', 'toPathUrl', 'loginType'],
  mounted() {
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
        this.$emit('switchLoginType', 'verifyCode');
      } else if (this.$props.titleMes === '密码登录') {
        this.$emit('switchLoginType', 'password');
      }
    },
  },
};
</script>

<style scoped>
  #title{
    width: 100%;
    background-color: #ffffff;
    display: inline-block;
    overflow: hidden;
    font-weight: bold;
    height:44px;
  }

  .title_img{
    float: left;
    margin-left: 3%;
    margin-top:11px;
  }

  .title_mid{
    width: auto;
    text-align: center;
    font-size: 13px;
    margin-top:13px;
  }

  .title_text{
    height: auto;
    font-weight: bold;
    margin-top: 11px;
    font-size:0.9em;
  }
</style>
