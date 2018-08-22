<template>
  <div class="getCode">
    <x-input title="验证码" class="login-input" v-model="checkNum" placeholder="6位短信验证码"></x-input>
    <x-button :type="timeLimit ? 'default' : 'primary'" ref="sendButton" class="get" @click.native="doSendCheck" :disabled="timeLimit">{{ statusCheck }}</x-button>
  </div>
</template>

<script>
export default {
  name: 'formCheck',
  data() {
    return {
      checkNum: '',
      statusCheck: '发送验证码',
      staus: true,
      timeLimit: false,
      TIME_COUNT: 10,
      count: null,
      countDown: null,
    };
  },
  methods: {
    doSendCheck() {
      if (this.$parent.sendCheck()) {
        const self = this;
        if (this.staus) {
          this.staus = false;
          self.timeLimit = true;
          console.log('发送验证码');
          this.count = this.TIME_COUNT;
          if (!this.countDown) {
            this.countDown = setInterval(() => {
              if (this.count > 0 && this.count <= this.TIME_COUNT) {
                this.count -= 1;
                this.statusCheck = `${this.count}秒后重试`;
              } else {
                self.staus = true;
                this.timeLimit = false;
                this.statusCheck = '发送验证码';
                clearInterval(this.countDown);
                this.countDown = null;
              }
            }, 1000);
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.getCode {
  display: flex;
  .login-input {
    flex: 1 1 auto;
  }
  .get {
    flex: 1 1 auto;
    width: 140px;
    height: 45.28px;
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
