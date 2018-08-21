<template>
  <div class="getCode">
    <x-input title="验证码" class="login-input" v-model="checkNum" placeholder="6位短信验证码"></x-input>
    <x-button type="primary" ref="sendButton" class="get" @click.native="doSendCheck" :disabled="Stuas">{{ statusCheck }}</x-button>
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
      Stuas: false,
    };
  },
  methods: {
    doSendCheck() {
      console.log(this);
      if (this.$parent.sendCheck()) {
        const self = this;
        let Maxtime = 60;
        let time;
        if (this.staus) {
          this.staus = false;
          self.Stuas = true;
          console.log('发送验证码');
          time = () => {
            if (Maxtime === 0) {
              self.staus = true;
              self.Stuas = false;
              self.statusCheck = '发送验证码';
            } else {
              Maxtime -= 1;
              setTimeout(() => {
                self.statusCheck = `${Maxtime}秒后重试`;
                time();
              }, 1000);
            }
          };
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
