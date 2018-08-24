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
    <div class="recharge">
      <checker v-model="value" default-item-class="default" selected-item-class="choosed">
        <checker-item v-for="(item,i) in recharge" :key="i" :value="item">{{item}}元</checker-item>
      </checker>
    </div>
    <div class="toPay">
      <div class="desc">
        <span>支付方式</span>
      </div>
      <div class="payDiv" @click="selectWXPay">
        <svg-icon icon-class="icon_wechatpay" class="smallIcon"></svg-icon>
        <p class="name">微信支付</p>
        <input class="rightArrow_weChat" type="radio" id="wechat" name="payStyle" checked=true>
      </div>

      <div class="payDiv" @click="selectAliPay">
        <svg-icon icon-class="icon_alipay" class="smallIcon"></svg-icon>
        <p class="name">支付宝支付</p>
        <input class="rightArrow_aliPay" type="radio" id="alipay" name="payStyle">
      </div>

      <div class="submit">
        <div class="explainDiv">
          <span>点击充值即表示同意</span>
          <a class="explain" href="javascript:" @click="window.open('http;//www.baidu.com')">充值协议</a>
        </div>
        <x-button type="primary" @click.native="crofirmNumber">充值</x-button>
      </div>
    </div>
  </div>
</template>

<script>

import ShareBikeApi from '../../utils/sharebikeCordovaApi';
import { aliPay, wxPay } from '../../api/payAndTrade';

export default {
  name: '',
  data() {
    return {
      recharge: [100, 50, 20, 5],
      value: 100,
      titleName: '充值',
      aliSelect: false,
      wxSelect: true,
      payStyle: '支付宝',
    };
  },
  methods: {

    // 返回
    backPrePage() {
      this.$router.go(-1);
    },

    selectAliPay() {
      document.getElementById('alipay').checked = true;
      this.aliSelect = true;
      this.wxSelect = false;
      console.log(`nowButtonStatus:wx:${this.wxSelect}:ali:${this.aliSelect}`);
    },

    selectWXPay() {
      document.getElementById('wechat').checked = true;
      this.wxSelect = true;
      this.aliSelect = false;
      console.log(`nowButtonStatus:wx:${this.wxSelect}:ali:${this.aliSelect}`);
    },

    crofirmNumber() {
      if (this.value === 0) {
        this.showPlugin('提示', '充值金额不能为0');
        return;
      }
      if (document.getElementById('alipay').checked) {
        this.payStyle = '支付宝';
      }
      if (document.getElementById('wechat').checked) {
        this.payStyle = '微信';
      }
      // this.showComfir("提示信息", "确定使用" + this.payStyle + "充值" + this.value + "吗?")
      this.showPayPlugin('提示信息', `确定使用${this.payStyle}充值${this.value}吗?`);
    },

    // alipay支付
    alipaySign() {
      console.log('开始阿里支付');
      const money = this.value * 100;
      aliPay('用户充值', '用户充值', '1h', money, 'alipayutbike').then((response) => {
        console.log(`阿里支付结果 :${response}`);
        console.log(response);
        if (response.data.code == 200) {
          ShareBikeApi.alipay(response.data.data);
        }
      }).catch(function (error) {
        this.showPlugin('支付宝验证失败', _this);
      });
    },

    // 微信支付
    wxpaySign() {
      console.log('开始微信支付');
      const money = this.value * 100;
      wxPay('用户充值', money, 'APP').then((response) => {
        console.log(`微信支付结果 : ${response}`);
        if (response.data.code == 200) {
          ShareBikeApi.wxpay(response.data.data);
        }
      });
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

    // 提示框
    showPayPlugin(title, content) {
      const _this = this;
      console.log(content);
      if (_this.wxSelect) {
        _this.wxpaySign();
      } else {
        _this.alipaySign();
      }
      // this.$vux.alert.show({
      //   title,
      //   content,
      //   onShow() {
      //   },
      //   onHide() {
      //     if (_this.wxSelect) {
      //       _this.wxpaySign();
      //     } else {
      //       _this.alipaySign();
      //     }
      //   },
      // });
    },

  },
};
</script>

<style lang="less" scoped>
@import "../../styles/header.less";

#wapper {
  width: 100%;
  height: 100%;
  .input_text {
    width: 90%;
    font-weight: bold;
    color: black;
    font-size: 1.1em;
    margin: 0.8em auto;
  }
  .number {
    width: 90%;
    margin: 1ex;
    button {
      width: 100%;
      height: 3.5em;
    }
  }
}

.recharge {
  background: #fff;
  padding: 20px;
  text-align: center;
  .vux-checker-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .vux-checker-item {
      margin-bottom: 10px;
      position: relative;
      width: 100%;
      flex: 0 0 calc(50% - 5px);
      max-width: calc(50% - 5px);
      height: 60px;
      line-height: 60px;
      box-sizing: border-box;
      border-radius: 2px;
      border: 1px solid #dfdfdf;
    }
    .defalut {
      background-color: #fff;
    }
    .choosed {
      color: #fff;
      background-color: #2cb8ff;
    }
  }
}
.toPay {
  margin-top: 10px;
  background: #fff;
  .desc {
    padding: 20px 0 0 20px;
    height: 20px;
    font-size: 12px;
    color: #999;
  }
  .payDiv {
    margin: 10px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    .smallIcon {
      margin-left: 10px;
      width: 22px;
      height: 22px;
    }
    .name {
      margin-left: 10px;
      font-size: 14px;
      color: #333333;
    }
    .rightArrow_aliPay {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 20px;
    }

    .rightArrow_weChat {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 20px;
    }
  }
}
.submit {
  width: 90%;
  margin: 0 20px;
  position: absolute;
  bottom: 20px;
  .explainDiv {
    margin-bottom: 10px;
    text-align: center;
    font-size: 12px;
    color: #999999;
    .explain {
      color: #5bc8ff;
    }
  }
}
</style>
