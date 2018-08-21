<template>
  <div>
    <x-input title="密码" v-model="value" :type="TextType" placeholder="请输入密码" class="login-input">
      <span slot="right" @click="showPwd" style="width:16px;height:16px;margin-left:10px;">
        <svg-icon icon-class="icon_eye"></svg-icon>
      </span>
    </x-input>
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

<style lang="less" scoped>
</style>
