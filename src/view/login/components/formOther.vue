<template>
  <div>
    <div class="ButtomUse" @click.prevent="postFrom">
      <el-button type="primary">{{ statusD.DeedText }}</el-button>
    </div>
    <div v-if="resultS === 'part1'" class="Clause">
      <span class="span3">{{ statusD.ClauseText }}</span>
      <router-link :to="{path:'/customerAgreement'}" class="text" >《车桩服务规则》</router-link>
      <span class="span2" v-on:click="forgetPwd">忘记密码</span>
    </div>
    <div v-else-if="resultS === 'part2'" class="Clause">
      <span class="span1">{{ statusD.ClauseText }}</span>
      <router-link :to="{path:'/customerAgreement'}" class="text">《车桩服务规则》</router-link>
    </div>
    <div v-else-if="resultS === 'part3'" class="Clause">
      <span class="span1">{{ statusD.ClauseText }}</span>
      <router-link :to="{path:'/customerAgreement'}" class="text">《车桩服务规则》</router-link>
    </div>
    <div v-else-if="resultS === 'part4'" class="Clause">
      <span class="span1">{{ statusD.ClauseText }}</span>
      <router-link :to="{path:'/customerAgreement'}" class="text">《车桩服务规则》</router-link>
    </div>
    <div v-else-if="resultS === 'part5'" class="Clause">
      <span class="span1">{{ statusD.ClauseText }}</span>
      <router-link :to="{path:'/customerAgreement'}" class="text">《车桩服务规则》</router-link>
    </div>
    <router-link :to="{path:'/customerAgreement'}" class="text">《车桩服务规则》</router-link>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    statusD: Object,
  },
  data() {
    return {
      TextType: 'password',
    };
  },
  computed: {
    resultS() {
      if (this.$props.statusD.status === 'part1') {
        return 'part1';
      } else if (this.$props.statusD.status === 'part2') {
        return 'part2';
      } else if (this.$props.statusD.status === 'part3') {
        return 'part3';
      } else if (this.$props.statusD.status === 'part4') {
        return 'part4';
      } else if (this.$props.statusD.status === 'part5') {
        return 'part5';
      }
      return true;
    },
  },
  methods: {
    postFrom() {
      // eslint-disable-next-line
      switch (this.resultS) {
        case 'part1':
          //  调用传递
          this.$parent.sendPost();
          break;
        case 'part2':
          this.$parent.sendPost();
          break;
        case 'part3':
          this.$parent.sendPost();
          break;
        case 'part4':
          this.$parent.sendPost();
          break;
        case 'part5':
          this.$parent.sendPost();
          break;
      }
    },
    //  更改密码可见性
    showPwd() {
      if (this.TextType === 'password') {
        this.TextType = 'text';
      } else {
        this.TextType = 'password';
      }
    },

    forgetPwd() {
      this.$emit('switchLoginType', 'reset');
    },
  },
};
</script>

<style lang="scss" scoped>
  .ButtomUse{
    width: 90%;
    margin-top: 1.3ex;
  button{
    width: 100%;
    height: 3.5em;
    margin:19px;
  }
  }

  .Clause{
    color: #888888;
    font-weight: 400;
    width: 90%;
    display: inline-block;
    margin-left:20px;
  .span1{
    margin-top: 0.8em;
    font-size: 12px;
    margin-left:23px;
  }
  .span2{
    margin-top: 0.4em;
    font-size: 11px;
  }
  .span3{
    font-size: 11px;
  }
  .text{
    color:#2CB8FF;
    }
  }
</style>
