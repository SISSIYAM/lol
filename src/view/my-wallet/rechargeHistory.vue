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
      <ul>
        <li class="item_cell" v-for=" (recharge, index) in rechargeList " :key="index">
          <div class="textLeft">
            <p class="textLeft_payDetail">{{recharge.tradeType}}</p>
            <p class="textLeft_time">{{recharge.tradeTime}}</p>
          </div>
          <div class="money" :class="textRightStyle(recharge)">
            <span v-if="recharge.tradeAmount > 0">+</span> {{recharge.tradeAmount}} 元</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


import { getRechargeHistory } from '../../api/payAndTrade';


export default {


  data() {
    return {
      titleName: '明细',
      rechargeList: [],
    };
  },

  mounted() {
    if (false) {
      this.rechargeList = [
        {
          tradeAmount: 24,
          tradeType: '停车费用',
          tradeTime: '2018.07.15-16:32:12',
        },
        {
          tradeAmount: -24,
          tradeType: '充值',
          tradeTime: '2018.07.15-16:32:12',
        },
        {
          tradeAmount: 24,
          tradeType: '停车费用',
          tradeTime: '2018.07.15-16:32:12',
        },
      ];
    }
    this.getRechargeList();
  },

  methods: {

    // 返回
    backPrePage() {
      this.$router.go(-1);
    },

    // 获取充值记录
    getRechargeList() {
      const _this = this;
      getRechargeHistory(1).then((response) => {
        console.log(response);
        if (response.status !== 200) {
          _this.showPlugin('提示信息', '获取充值记录失败');
        } else {
          console.log('获取充值记录成功');
          _this.rechargeList = response.data;
        }
      })
        .catch((error) => {
          console.log(error);
        });
    },

    // 更改金额样式
    textRightStyle(item) {
      if (Number(item.tradeAmount) >= 0) {
        return 'textRight_gray';
      }
      return 'textRight';
    },

    // 提示框
    showPlugin(title, content) {
      this.$vux.alert.show({
        title,
        content,
        onShow() {
          console.log('显示的时候触发的事件');
        },
        onHide() {
          console.log('点击确定按钮后触发');
        },
      });
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
    background-color: white;
    ul {
      height: 100%;
      overflow-y: scroll;
      margin-left: 20px;
      list-style: none;
      .item_cell {
        display: flex;
        justify-content: space-between;
        height: 60px;
        width: 100%;
        box-sizing: border-box;
        border-bottom: solid 1px #dfdfdf;
        overflow: hidden;
        font-weight: bold;
        img {
          width: 19px;
          height: 19px;
        }
        .textLeft {
          margin-top: 14px;
          color: #999999;
          font-size: 14px;
        }
        .money {
          margin-right: 20px;
        }
        .textRight {
          height: 60px;
          line-height: 60px;
          color: #ff3b30;
          font-size: 17px;
        }
        .textRight_gray {
          height: 60px;
          line-height: 60px;
          color: #333;
          font-size: 17px;
        }
        .textLeft_payDetail {
          color: #333333;
          font-size: 14px;
        }
        .textLeft_time {
          color: #999;
          font-size: 10px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
