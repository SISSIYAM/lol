<template>
  <!-- <div ref="title" id="title">
    <div ref="titleImg" class="title_img" @click="goBack">
      <svg-icon icon-class="icon_back"></svg-icon>
    </div>
    <div ref="titleTextMid" class="title_mid">
      {{ titleMid }}
    </div>
    <div ref="titleText" class="title_text" v-on:click="turnTo">
      {{ titleMes }}
    </div>
  </div> -->
  <div ref="title" class="header-wrapper">
    <div class="header header-fixed ">
      <div ref="titleImg" class="header-left" @click="goBack">
        <svg-icon icon-class="icon_back" class="arrow"></svg-icon>
      </div>
      <div ref="titleTextMid" class="title">{{ titleMid }}</div>
      <div ref="titleText" class="more" @click="turnTo">{{ titleMes }}</div>
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
      // TODO: 跳转问题
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

<style lang="less" scoped>
@import "../../../styles/header.less";
</style>
