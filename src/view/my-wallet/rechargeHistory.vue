<template>
  <div id="wapper">
		<div class="title">
			<img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
			<p class="titleName">{{titleName}}</p>
		</div>
		<div class="wapper_item">
      <div class="item_cell" v-for=" recharge in rechargeList ">
        <div class="item_cell_text">
					<div class="textLeft">
						<p class="textLeft_payDetail">{{recharge.tradeType}}</p>
						<p class="textLeft_time">{{recharge.tradeTime}}</p>
					</div>
          <div :class="textRightStyle(recharge)">{{recharge.tradeAmount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	

import { getRechargeHistory } from '../../api/payAndTrade'


export default {
	
		
	data() {
		return{
			titleName:'明细',
			rechargeList:[],
		}
	},
		
	mounted() {
		if(false){
			this.rechargeList=[
				{
					"tradeAmount": 24,
					"tradeType": '停车费用',
					"tradeTime":'2018.07.15-16:32:12'
				},
				{
					"tradeAmount": -24,
					"tradeType": '充值',
					"tradeTime":'2018.07.15-16:32:12'              
				},
				{
					"tradeAmount": 24,
					"tradeType": '停车费用',
					"tradeTime":'2018.07.15-16:32:12'              
					}
			]
		}
		this.getRechargeList();	
	},
		
	methods: {
		
		// 返回
		backPrePage: function () {
			this.$router.go(-1);
		},
	
		// 获取充值记录
		getRechargeList () {
			var _this =this;
			getRechargeHistory(1).then((response) => {
				console.log(response);
				if (response.status != 200) {
					_this.showPlugin("提示信息","获取充值记录失败");
				} else {
					console.log("获取充值记录成功")
					_this.rechargeList=response.data;			
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		
		// 更改金额样式
		textRightStyle(item) {
			if (Number(item.tradeAmount) >= 0) {
				return 'textRight_gray';
			} else {
				return 'textRight';
			}
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
	 },
	 
	}
}
</script>

<style scoped lang="scss">
	
	/*********标题栏  *********/
	.title {
		padding-top: 5px;
		height: 44px;
		line-height: 44px;
		width: 100%;
		background-color: white;
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
	/*********标题栏 the end *********/
	
  #wapper{
    width: 100%;
    height: 100%;
		background-color: whitesmoke;
    .wapper_item{
      width: 100%;
      height: 100%;
      font-weight: bold;
			background-color: white;
    }
    .item_cell{
      width: 100%;
      display: inline-flex;
      padding-top: 10px;
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
          margin: 0 10px;
          color: red;
          font-size: 14px;
					margin-left: auto;
					align-items: center;
					}
					.textRight_gray{
						margin: 0 10px;
						color: black;
						font-size: 14px;
						margin-left: auto;
						align-items: center;
						}
				.textLeft_payDetail{
					color: #333333;
					font-size: 14px;
				}
				.textLeft_time{
					font-size: 8px;
				}
      }
    }
  }
</style>
