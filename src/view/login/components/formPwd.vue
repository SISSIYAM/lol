<template>
  <div class="input_text">
    <el-input v-model="value" :type="TextType" placeholder="请输入密码">
      <template slot="prepend">
        <div style="width: 35px;">
          <span style="color: black;">密码</span>
        </div>
      </template>
      <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'formPwd',
  data() {
    return {
      TextType: 'password',
      value: '',
    };
  },
  methods: {
    //  更改密码可见性
    showPwd() {
      if (this.TextType === 'password') {
        this.TextType = 'text';
      } else {
        this.TextType = 'password';
      }
    },

  },
};
</script>

<style lang="scss" scoped>
  .input_text{
    width: 90%;
    font-weight: bold;
    color: black;
    font-size: 1.1em;
    margin: 0.57em auto;
  }
</style>
