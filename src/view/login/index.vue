<template>
  <div></div>
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
    this.getMarginTop();
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

    // 登录样式初始，原代码复制
    getMarginTop() {
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
