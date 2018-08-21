<template>
  <div>
    <x-input title="+86" v-model="value" placeholder="请输入手机号" class="login-input">
    </x-input>
  </div>
</template>

<script>
export default {
  name: 'formPhone',
  data() {
    return {
      value: '',
    };
  },
};
</script>

<style lang="less" scoped>
</style>
