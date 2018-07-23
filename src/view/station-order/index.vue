<template>
  <div id="wapper">
		<div class="title">
			<img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
			<p class="titleName">{{titleName}}</p>
		</div>
		<div class="wapper_item">
      <div class="item_cell" v-for=" order in orderList ">
        <div class="item_cell_text">
					<img class="textleftIcon" src="../../../static/images/location.png"/>
					<div class="textLeft">
						<p class="textLeft_payDetail">{{order.time_style}}</p>
						<p class="textLeft_location">{{order.location}}</p>
					</div>
          <div class="textRight">{{order.tradeAmount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
			
export default {
	
	name: 'stationOrder',
	
	data() {
		return{
			titleName:'我的预约',
			orderList:[]
		}
	},
		
	mounted() {
		if(true){
			this.orderList=[
				{
					"tradeAmount": '已取消',
					"time_style": '今天18:50 停车预约',
					"location":'珠海优特科技大厦 珠海市-香洲区-兴华路210号'
				},
				{
					"tradeAmount": '超时',
					"tradeType": '今天13:50 取车预约',
					"location":'珠海优特科技大厦 珠海市-香洲区-兴华路210号'
				},
				{
					"tradeAmount": '完成',
					"tradeType": '今天20:50 停车预约',
					"location":'珠海优特科技大厦 珠海市-香洲区-兴华路210号'
				}
			]
		}
		this.getOrder()
	},
		
	methods: {
		//返回
		backPrePage: function () {
			this.$router.go(-1);
		},
		getOrder:function () {
			console.log('获取预约数据成功');
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
				.textleftIcon{
					margin: 0 5px;
				}
        .textLeft{
          margin: 0 15px;
          color: #999999;
          font-size: 14px;
        }
        .textRight{
					width: 50px;
          margin: 0 0;
          color: #333333;
          font-size: 14px;
					margin-left: auto;
					}
				.textLeft_payDetail{
					color: #333333;
					font-size: 14px;
				}
				.textLeft_location{
					font-size: 3px;
				}
      }
    }
  }
</style>
