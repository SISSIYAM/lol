<template>
  <div class="checkItem">
    <div class="checkInput">
      <el-input placeholder="6位短信验证码" v-model="checkNum" clearable maxlength="6">
        <template slot="prepend">
          <div style="width: 35px;font-size: small">
            <span style="color: black;">验证码</span>
          </div>
        </template>
      </el-input>
    </div>
    <el-button type="primary" ref="sendButton" @click="doSendCheck" :disabled ="Stuas">
      {{ statusCheck }}</el-button>
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

<style lang="scss" scoped>
  .checkItem{
    display: inline-block;
    margin-bottom: 3%;
    width: 90%;
  .checkInput{
    font-weight: bold;
    color: black;
    font-size: 1.2em;
    margin-right: 2%;
    width: 65%;
    float: left;
  }
  .el-button--primary{
    float: right;
    width: 33%;
  }
  }
</style>
