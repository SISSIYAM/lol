<template>
<div class="wrapper">
    <div class="title">
      <img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
      <p class="titleName">{{titleName}}</p>
			<img class="rightIcon" src="../../../static/images/scanOpen.png" />
    </div>
    <div class="subTitle" v-show="subTitleShow">
      <img class="subLeftIcon" src="../../../static/images/orderStationIconSmall.png"/>
      <p class="subTitleName">{{stationName}}</p>
			<!--<p class="subTitleContent">计费说明</p>-->
    </div>
    <div class="bluListWrapper">
      <div class="row" v-bind:class="{isToRead:item.status===0}" v-for="item in bleDeviceList">
        <div class="bluInfo flex-h flex-vc" @click="openPickerFunction(item)">
          <div class="blutitle">{{item.no}}号车桩</div>
          <div :class="stationTypeStyle(item)" >{{item.content}}</div>
          <div :class="listIconStyle(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShareBikeApi from '../../utils/sharebikeCordovaApi';
import { getUsableStation ,lockStatusUpdate} from '../../api/shareStation'
import BluetoothManager from '../../utils/bluetoothConnect/bluetoothManager'

export default {
  components: {
	},
  data() {
		return {
			subTitleShow:false,
			titleName: "咻咻开锁",
			bleDeviceList: [],
			bikeDockListBox: true,
			pickerVisiliable: false,
			stationName:'',
		}
  },

	mounted() {
  },

	created() {
		this.getStations();
	},
  methods: {
		// 车桩类型style
		stationTypeStyle(item){
		if (Number(item.type) == 0) {
				return 'bluContentPrivate'
			} else {
				return 'bluContent'
			}
		},
		// 车桩可用状态style
		listIconStyle(item) {
			if (Number(item.status) == 0) {
				return 'listIconAble'
			} else {
				return 'listIconUnable'
				}
		},
		//  获取附近停车桩
		getStations () {
			console.log("加载数据中");
			const self = this;
			getUsableStation(113.541555,22.275072, -1).then((response) => {
					console.log(response);
					if(response.data.code !== 200){
						self.showPlugin("提示","附近没有可用车桩");
					}	else {
					  console.log(response);
					  if (response.data.data.length > 0) {
              self.subTitleShow = true;
              self.bleDeviceList = response.data.data;
              self.stationName = self.bleDeviceList[0].stationName;
              self.bleDeviceList.forEach((obj) => {
                if (String(obj.type) === '0') {
                  obj.content = '共享单车';
                }
                if (String(obj.type === '1')){
                  obj.content = '私人单车';
                }
                if (String(obj.status === '0')) {
                  obj.content = '空闲车位';
                }
              });
            } else {
              self.showPlugin("提示","附近没有可用车桩");
            }
					}
				}).catch(function (error) {
					console.log(error);
			});
		},
		// 返回上一页
		backPrePage: function () {
			this.$router.go(-1);
		},
    openPickerFunction(item) {
		  // 相当于取车
		  if (String(item.status) === '0') {
		    console.log('iiii');
        // --------------------------?????????????????????????????????????---------------------------------
        // 弹出选择框选择车辆类型
        // --------------------------?????????????????????????????????????---------------------------------
        this.$store.dispatch('beginShowPicker');


      }
    },
		// 提示框
		showPlugin ( title, content) {
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

		// 加载框
		showLoading (text) {
			// 显示loading界面
      this.$vux.loading.show({
        text: text,
      });
      // loading在2秒后消失（网络请求结束或者蓝牙链接成功的时候调用）
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 2000)
		}
  }
}
</script>

<style scoped>
@import "../station-booking/css/flex.css";
	.wrapper {
		background-color: white;
		height: 100%;
	}
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
	.rightIcon {
		line-height: 44px;
		position: absolute;
		right: 10px;
		width: 20px;
		height: 20px;
		z-index: 9;
	}
	/*********次标题  *********/
	.subTitle {
		height: 40px;
		line-height: 44px;
		width: 100%;
		background-color: whitesmoke;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
    font-weight: 800;
	}
	.subLeftIcon {
    margin-left: 20px;
		line-height: 44px;
		/*position: absolute;*/
		left: 20px;
		width: 15px;
		height: 15px;
		z-index: 9;
	}
	.subTitleName {
		line-height: 64px;
		/*position: absolute;*/
    margin-left: 10px;
		text-align: left;
		/*left: 0;*/
		/*right: 0;*/
		/*margin: 0px;*/
		font-size: 14px;
		color: black;
		vertical-align: middle;
	}
	.subTitleContent {
		line-height: 64px;
		position: absolute;
		text-align: right;
		left: 0;
		right: 0;
		margin-right: 3px;
		font-size: 10px;
		color: red;
		vertical-align: middle;
	}

	/**********预约列表***********/
  .bluListWrapper {
    height: calc(100% - 44px);
    overflow: scroll;
    width: 100%;
	  background-color: white;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: solid 1px #dfdfdf;
  }
  .bluInfo {
    text-align: left;
    margin-top: 10px;
    flex: 1;
		display: flex;
		flex-direction: row;
  }
	.listIconAble {
		line-height: 44px;
		position: absolute;
		right: 15px;
		width: 20px;
		height: 20px;
		background-image: url(../../../static/images/stationOrderStatus.png);
		background-repeat:no-repeat;
	}
	.listIconUnable {
		line-height: 44px;
		position: absolute;
		right: 15px;
		width: 20px;
		height: 20px;
		background-image: url(../../../static/images/stationOrderStatusUnable.png);
		background-repeat:no-repeat;
	}
	.blutitle {
		font-size: 18px;
		color: black;
		word-break:keep-all;
		white-space:nowrap;
    font-weight: 800;
	}
  .bluContent {
  	margin-left: 7px;
  	font-size: 8px;
  	color: red;
    border: 0.3px solid red;
  }
	.bluContentPrivate {
  	margin-left: 7px;
  	font-size: 8px;
  	color: deepskyblue;
    border: 0.3px solid deepskyblue;
  }

	/*********picker *********/
	.picker {
		position: absolute;
    bottom: 0;
    background-color: white;
    width: 100%;
    display: table-column-group;
    height: 30%;
    align-items: center;
    justify-content: center;
		font-size: 16px;
    font-weight: bold;

		z-index: 999;
	}
	.pickerTitle {
		height: 20px;
		line-height: 64px;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}
	.pickerTitleName {
		line-height: 64px;
		position: absolute;
		text-align: center;
		left: 0;
		right: 0;
		margin: 0px;
		font-size: 14px;
		color: black;
		vertical-align: middle;
	}
	.canclePicker {
		line-height: 64px;
		width: 30px;
		position: absolute;
		margin-left: 10px;
		font-size: 14px;
		vertical-align: middle;
		z-index: 999;
	}
	.openPicker {
		width: 30px;
		line-height: 64px;
		position: absolute;
		margin-right: 10px;
		font-size: 14px;
		vertical-align: middle;
		margin-left: 90%;
	}

</style>
