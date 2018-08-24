/* eslint-disable */
<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <div class="header header-fixed ">
        <div class="header-left" v-on:click="backPrePage">
          <svg-icon icon-class="icon_back" class="arrow"></svg-icon>
        </div>
        <div class="title">{{titleName}}</div>
        <div class="more" @click="rechargeHistory">明细</div>
      </div>
    </div>
    <div class="wrapper_back">
      <div class="infoWrapper">
        <div class="rowDivMoney">
          <svg-icon icon-class="wallet" class="rowDivMoneyImg"></svg-icon>
          <p class="txt3">余额(元)</p>
          <p class="txt2">{{ money }}</p>
        </div>
        <ul class="profile_list">
          <li class="item" @click="recharge">
            <aside>
              <svg-icon icon-class="icon_recharge" class="icon"></svg-icon>
            </aside>
            <div class="info">充值</div>
            <div class="right">
              <svg-icon icon-class="icon_right" class="icon_mini"></svg-icon>
            </div>
          </li>
          <!-- <li class="item" @click="reposit">
            <aside>
              <svg-icon icon-class="icon_reposit" class="icon"></svg-icon>
            </aside>
            <div class="info">提现</div>
            <div class="right">
              <svg-icon icon-class="icon_right" class="icon_mini"></svg-icon>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getCurrentBalance } from '../../api/payAndTrade';

export default {
	
  data() {
		
    return {
      titleName: '我的钱包',
      url: '/mainPage',
      money: '0.00',
    };
		
  },
	
  mounted() {
		
    this.getMoney();
		
  },

  methods: {
		
		// 返回按钮
    backPrePage() {
      this.$router.go(-1);
    },

    //  充值
    recharge() {
      this.$router.push({
        path: '/recharge',
        name: 'recharge',
      });
    },

    //  提现
    reposit() {
			
    },
		
    // 明细
    rechargeHistory() {
			console.log("跳转到明细界面");
      this.$router.push({
        path: '/rechargeHistory',
        name: 'rechargeHistory',
      });
    },
		
		// 获取余额
    getMoney() {
      const _this = this;		
      getCurrentBalance().then((response) => {
        console.log(response.data);
        if (response.data.code != 200) {
					_this.showPlugin("提示信息", "获取余额失败", '');
        } else {
          console.log('获取余额成功');
          _this.money = response.data.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
		
		// 提示框
	  showPlugin (title , content) {
			this.$vux.alert.show({
        title: title,
        content: content,
        onShow () {
          console.log('显示的时候触发的事件');
        },
        onHide () {
          console.log('点击确定按钮后触发');
        }
      });
	 }
	 
	 
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/header.less";
@import "../../styles/profile_list.less";

.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.titleCom {
  height: 8%;
}

.wrapper_back {
  width: 100%;
  height: 100%;
}

.line {
  background-color: #dfdfdf;
  height: 1px;
  width: 100%;
  opacity: 0.4;
  margin-left: 20px;
}

.rightArrow {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
}

.rowDivMoney {
  height: 200px;
  width: 100%;
  align-items: center;
}

.rowDivMoneyImg {
  height: 100% !important;
  width: 100% !important;
}

.txt2 {
  margin-top: 30px;
  margin: 0 auto;
  text-align: center;
  font-size: 50px;
  color: #ffffff;
  z-index: 999;
}

.txt3 {
  margin: 0 auto;
  text-align: center;
  margin-top: -150px;
  font-size: 20px;
  color: floralwhite;
}
.rowDiv2 {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.smallIcon {
  margin-left: 10px;
  width: 22px;
  height: 22px;
}

.userImage {
  width: 58px;
  height: 58px;
  position: absolute;
  right: 50px;
}

.infoWrapper {
}

.txtWallet {
  margin-left: 10px;
  font-size: 14px;
  color: #333333;
}
</style>
