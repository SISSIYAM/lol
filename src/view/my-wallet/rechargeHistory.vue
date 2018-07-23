<template>
  <div id="wapper">
		<div class="title">
			<img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
			<p class="titleName">{{titleName}}</p>
		</div>
		<div class="wapper_item">
      <div class="item_cell" v-for=" recharge in rechargeList ">
        <div class="item_cell_text">
					<div class="textLeft" @click="showPlugin">
						<p class="textLeft_payDetail">{{recharge.tradeType}}</p>
						<p class="textLeft_time">{{recharge.time}}</p>
					</div>
          <div class="textRight">{{recharge.tradeAmount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	
import { Alert } from 'vux'
import { getRechargeHistory } from '../../api/payAndTrade'


export default {
	
  components: { Alert, },
		
	data() {
		return{
			titleName:'明细',
			rechargeList:[]
		}
	},
		
	mounted() {
		if(true){
			this.rechargeList=[
				{
					"tradeAmount": 24,
					"tradeType": '停车费用',
					"time":'2018.07.15-16:32:12'
				},
				{
					"tradeAmount": -24,
					"tradeType": '充值',
					"time":'2018.07.15-16:32:12'              
				},
				{
					"tradeAmount": 24,
					"tradeType": '停车费用',
					"time":'2018.07.15-16:32:12'              
					}
			]
		}
		this.getRechargeList()
	},
		
	methods: {
		//返回
		backPrePage: function () {
			this.$router.go(-1);
		},
		//获取充值记录
		getRechargeList:function () {
			var _this =this;
			getRechargeHistory({
			pageStart:1
			})
			.then(function (response) {
				console.log(response.data);
				if(response.data.code != 200){
					console.log("获取充值记录失败")
					// _this.showTotal("提示信息","获取充值记录失败",'');
				}else{
					console.log("获取充值记录成功")
					_this.rechargeList=response.data;
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		
		showTotal: function (title,content,strPath) {
	// 			 let Vue = this;
	// 			 console.log('tanchu');
	// 			 //  弹出框
	// 			 this.$vux.alert.show({
	// 				 title: title,
	// 				 content: content,
	// 				 onHide () {
	// 					 if(strPath == null || strPath == ''){
	// 						 console.log("隐藏")
	// 					 }else{
	// 						 Vue.$router.push(strPath);
	// 					 }
	// 				 }
	// 			 })
		},
		
	  showPlugin () {
		  this.$vux.alert.show({
		   title: 'VUX is Cool',
			 content: _this.$t('Do you agree?'),
			 onShow () {
			   console.log('Plugin: I\'m showing')
			 },
			 onHide () {
				 console.log('Plugin: I\'m hiding now')
			 }
		 })
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
    .titleCom{
      height: 8%;
    }
    .wapper_item{
      width: 92%;
      height: 100%;
      font-family: "Ping SC Regular";
      font-weight: bold;
    }
    .item_cell{
      width: 100%;
      display: inline-flex;
      padding-top: 10px;
      padding-bottom: 10px;
      align-items: center;
      img{
        width: 19px;
        height: 19px;
      }
      .item_cell_text{
        border-bottom: solid 1px #dfdfdf;
        height:80%;
        padding-bottom: 15px;
        display: inline-flex;
        width: 100%;
        .textLeft{
          margin: 0 15px;
          color: #999999;
          font-size: 14px;
        }
        .textRight{
          margin: 0 0;
          color: #333333;
          font-size: 14px;
					margin-left: auto;
					}
				.textLeft_payDetail{
					color: #333333;
					font-size: 14px;
				}
				.textLeft_time{
					font-size: 5px;
				}
      }
    }
  }
</style>
