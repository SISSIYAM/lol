<template>
  <div id="wapper">
		<div class="title">
			<img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
			<p class="titleName">{{titleName}}</p>
		</div>
		<div class="wapper_item">
			<div class="payDiv">
				<img class="payImg" src="../../../static/images/payResult.png"/>
				<p class="payTitle">支付成功</p>
				<p class="payNum">充值金额:{{rechargeResult}}元</p>
				<div class="buttonDiv">
					<el-button type="primary" size="medium" style="width: 90%;margin: 3px;" @click="backMainPage">确认</el-button>
					<el-button type="info" size="medium" style="width: 90%;margin: 3px;" @click="toHistoryPage">充值记录</el-button>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
			
export default {
			
	data() {
		return{
			titleName:'支付中心',
			rechargeResult:''
		}
	},
		
	mounted() {
		if(true){
			this.rechargeResult= 100;
		}
		this.getRechargeResult()
	},
		
	methods: {
		//返回
		backPrePage: function () {
			this.$router.go(-1);
		},
		//确认返回主页
		backMainPage: function () {
			this.$router.push({
				path: '/initLayout',
				name: 'initLayout',
			})
		},
		//转到充值记录
		toHistoryPage: function () {
			this.$router.push({
				path: '/rechargeHistory',
				name: 'rechargeHistory',
			})
		},
		getRechargeResult:function () {
			console.log('支付成功');
		},
	}
}
</script>

<style scoped lang="scss">
	
	/*********标题栏  *********/
	.title {
		padding-top: 20px;
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
		font-family: PingFangBold;
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
		position: absolute;
		text-align: right;
		left: 0;
		right: 0;
		margin: 0px;
		font-size: 15px;
		color: black;
		vertical-align: middle;
		font-family: PingFangBold;
	}
	/*********标题栏 the end *********/
	
  #wapper{
    width: 100%;
    height: 100%;
    .wapper_item{
      width: 92%;
      height: 100%;
      font-family: "Ping SC Regular";
      font-weight: bold;
    }
		.payDiv{
			width: 100%;
			height: 60%;
			position: absolute;
			text-align: center;
			vertical-align: middle;
		}
		.payImg{
			width: 50%;
			height: 40%;
		}
		.payTitle{
			font-size: 20px;
		}
		.payNum{
			font-size: 10px;
		}
		.buttonDiv{
			margin-top: 50%;
		}
  }
</style>
