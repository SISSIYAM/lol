<template>
  <div id="wapper">
		<div class="title">
			<img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
			<p class="titleName">{{titleName}}</p>
		</div>
		<div class="wapper_item">
      <div class="item_cell" v-for=" order in orderList ">
        <div class="item_cell_text" @click="itemClick(order)">
					<img class="textleftIcon" src="../../../static/images/orderStationIcon.png"/>
					<div class="textLeft">
						<div class="textLeft_div">
							<p class="textLeft_data">{{order.isday}}</p>
							<p class="textLeft_payDetail">{{order.expireTime}}</p>
							<p class="textLeft_Type">{{order.type}}</p>
						</div>
						<p class="textLeft_location">{{order.stationName}}</p>
					</div>
          <div :class="textRightStyle(order)">{{order.status}}</div>
					<img class="textRightIcon" src="../../../static/images/orderStationRight.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getBookList } from '../../api/shareOrder';
import OrderDetail from './orderDetail';
import { formatDate } from '../../filters/date';

export default {

	name: 'stationOrder',

	data() {
		return{
			titleName:'我的预约',
			orderList:[],
			status:'预约状态未知',
			expireTime: ''
		}
	},
	created() {
    this.formatCreateTime();
  },


	/**
	 * stationId：站点id;
	 * stationName: 站点名称;
	 * no: 车桩编号;
	 * mac: 车桩蓝牙mac地址;
	 * longitude: 站点经度;
	 * latitude:纬度;
	 * type: 预约类型1取车0还车;
	 * createTime: 预约创建时间;
	 * expireTime:预约过期时间;
	 * status：预约状态0预约进行时1履行预约2 预约过期3 预约被取消
	 */

	mounted() {
		if(false){
			this.orderList=[
				{
					"status": '预约进行时',
					"expireTime": '今天18:50',
					"type":'停车预约',
					"stationName":'珠海优特科技大厦 珠海市-香洲区-兴华路210号'
				},
				{
					"status": '预约过期',
					"expireTime": '今天13:50',
					"type":'取车预约',
					"stationName":'珠海优特科技大厦 珠海市-香洲区-兴华路210号'
				},
				{
					"status": '履行预约',
					"expireTime": '今天20:50',
					"type":'停车预约',
					"stationName":'珠海优特科技大厦 珠海市-香洲区-兴华路210号'
				}
			]
		}
		this.getOrder()
	},

	methods: {
		// 更改预约状态样式
		textRightStyle (order) {
			if (String(order.status) === '预约进行时') {
				return 'textRightBlue';
			} else {
				return 'textRight';
			}
		},
		// 时间转换
		formatCreateTime() {
			this.expireTime = formatDate(time, 'yyyy-MM-dd');
		},
		// 返回
		backPrePage: function () {
			this.$router.go(-1);
		},

		// 获取预约列表
    getOrder() {
      const _this = this;

			const currentDate = new Date();
			const currentStamp = currentDate.getTime();
			const current = formatDate(currentStamp, 'yyyy年MM月dd日');


      getBookList().then((response) => {
        console.log(response);
        if (response.data.code != 200) {
          _this.showPlugin("提示信息", "获取预约列表失败");
        } else {
          console.log('获取预约列表成功');
					response.data.data.forEach((obj) => {
						const nowDate = formatDate(obj.expireTime, 'yyyy年MM月dd日');
						if (nowDate === current) {
							obj.isday = '今天';
						} else {
							obj.isday = nowDate;
						}
						obj.expireTime = formatDate(obj.expireTime, 'hh:mm');
						if (String(obj.type) === '1') {
							obj.type = '取车';
						} else {
							obj.type = '还车';
						}
						if (String(obj.status) === '0'){
							obj.status = '预约进行时'
						} else if (String(obj.status) === '1') {
							obj.status = '履行预约'
						}	else if (String(obj.status) === '2') {
							obj.status = '预约过期'
						} else {
							obj.status = '预约取消'
						}
					});
					_this.orderList = response.data.data;
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
		},
    itemClick(order) {
		  this.$router.push({
        name:'orderDetail',
        params:{
          'orderObj': order,
        },
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
		background-color: #FFFFFF;
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
		font-size: 14px;
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
					margin-left: 10px;
				}
				.textRightIcon{
					margin: 2px 2px;
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
          font-size: 12px;
					margin-left: auto;
					}
				.textRightBlue{
					width: 50px;
					margin: 0 0;
					color: #409EFF;
					font-size: 12px;
					margin-left: auto;
					}
				.textLeft_div{
					display: inline-flex;
				}
				.textLeft_payDetail{
					color: #333333;
					font-size: 14px;
				}
				.textLeft_data{
					color: #333333;
					font-size: 14px;
				}
				.textLeft_type{
					color: #333333;
					font-size: 14px;
					margin-left: 5px;
				}
				.textLeft_location{
					font-size: 8px;
				}
      }
    }
  }
</style>
