<template>
  <div id="wapper">
    <div class="header-wrapper">
      <div class="header header-fixed ">
        <div class="header-left" v-on:click="backPrePage">
          <svg-icon icon-class="icon_back" class="arrow"></svg-icon>
        </div>
        <div class="title">{{titleName}}</div>
      </div>
    </div>
    <div class="wapper_item">
      <div class="payDiv">
        <img class="payImg" src="../../../static/images/payResult.png" />
        <p class="payTitle">支付成功</p>
        <p class="payNum">充值金额:{{rechargeResult}}元</p>
        <div class="buttonDiv">
          <x-button type="primary" @click.native="backMainPage">确认</x-button>
          <x-button type="default" @click.native="toHistoryPage">充值记录</x-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      titleName: '支付中心',
      rechargeResult: '',
    };
  },

  mounted() {
    if (true) {
      this.rechargeResult = 100;
    }
    this.getRechargeResult();
  },

  methods: {
    // 返回
    backPrePage() {
      this.$router.go(-1);
    },
    // 确认返回主页
    backMainPage() {
      this.$router.push({
        path: '/initLayout',
        name: 'initLayout',
      });
    },
    // 转到充值记录
    toHistoryPage() {
      this.$router.push({
        path: '/rechargeHistory',
        name: 'rechargeHistory',
      });
    },
    getRechargeResult() {
      console.log('支付成功');
    },
  },
};
</script>

<style scoped lang="less">
@import "../../styles/header.less";

#wapper {
  width: 100%;
  height: 100%;
  .wapper_item {
    width: 100%;
    height: calc(100vh - 44px);
    overflow: hidden;
    background: #FFF;
  }
  .payDiv {
    margin-top: 100px;
    width: 100%;
    position: absolute;
    text-align: center;
    vertical-align: middle;
  }
  .payImg {
    width: 50%;
    height: 40%;
  }
  .payTitle {
    font-weight: Bold;
    font-size: 28px;
  }
  .payNum {
    font-size: 14px;
  }
  .buttonDiv {
    position: fixed;
    width: calc(100vw - 40px);
    margin: 0 20px;
    text-align: center;
    bottom: 20px;
    left: 0;
  }
}
</style>
