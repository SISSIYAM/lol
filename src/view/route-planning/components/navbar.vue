<template>
  <div id="wrap">
    <div class="middle"></div>
  </div>
</template>

<script>
  export default {
    name: 'navbar',
    props: {
      titleMes: String,
    },
    data() {
      return {
        
      };
    }
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
