<template>
  <div ref="title" id="title">
    <div ref="titleImg" class="title_img" @click="goBack">
      <svg-icon icon-class="icon_back"></svg-icon>
    </div>
    <div ref="titleTextMid" class="title_mid">
      {{ titleMid }}
    </div>
    <div ref="titleText" class="title_text" v-on:click="turnTo" style="margin-top: 0px">
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
    background-color: #f1f1f161;
    display: inline-block;
    overflow: hidden;
    font-weight: bold;
  }

  .title_img{
    float: left;
    margin-left: 3%;
  }

  .title_mid{
    width: auto;
  }

  .title_text{
    float: right;
    height: auto;
    margin-right: 3%;
    font-weight: bold;
  }
</style>
