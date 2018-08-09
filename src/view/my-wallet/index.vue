/* eslint-disable */
<template>
  <div class="wrapper">
    <div class="title">
			<img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
      <p class="titleName">{{titleName}}</p>
			<div class="detail" @click="rechargeHistory">      
				<p >明细</p>
			</div>
		</div>
    <div class="wrapper_back">
      <div class="infoWrapper">
        <div class="rowDivMoney">
					<svg-icon icon-class="wallet" class="rowDivMoneyImg"></svg-icon>
          <p class="txt3">余额(元)</p>
          <p class="txt2">{{ money }}</p>
        </div>
        <div class="line"></div>
        <div class="rowDiv2" @click="recharge">
					<img class="smallIcon" src="../../../static/images/recharge.png">
          <p class="txtWallet">充值</p>
          <img class="rightArrow" src="../../../static/images/right_arrow.png"/>					
        </div>
        <div class="line"></div>
        <div class="rowDiv2" @click="reposit">
          <img class="smallIcon" src="../../../static/images/reposit.png">					
          <p class="txtWallet">提现</p>
          <img class="rightArrow" src="../../../static/images/right_arrow.png"/>					
        </div>
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

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    font-weight: 600;
  }
  /*********标题栏  *********/
  .title {
    padding-top: 5px;
    height: 44px;
    line-height: 44px;
    width: 100%;
    background-color: #f1f1f161;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }

  .titleName {
    line-height: 64px;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    margin: 0px;
    font-size: 18px;
    color: black;
    vertical-align: middle;
  }

  .leftIcon {
    line-height: 44px;
    position: absolute;
    left: 20px;
    width: 24px;
    height: 24px;
    z-index: 9;
  }
  .detail {
    line-height: 64px;
    text-align: right;    
    font-size: 14px;
    color: black;
		margin-left: 90%;
    vertical-align: middle;
		z-index: 9;
  }

  /*********标题栏 the end *********/
  .titleCom {
    height: 8%;
  }

  .wrapper_back {
    background-color: #f9f9f9;
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
    color: #FFFFFF;
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
    background-color: white;
  }

  .txtWallet {
    margin-left: 10px;
    font-size: 14px;
    color: #333333;
  }

</style>
