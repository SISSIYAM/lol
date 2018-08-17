<template>
<div class="wrapper">
    <div class="title">
      <img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
      <p class="titleName">{{titleName}}</p>
			<img class="rightIcon" src="../../../static/images/scanOpen.png"/>
    </div>
    <div class="subTitle">
      <img class="leftIcon" src="../../../static/images/location.png" v-on:click="backPrePage"/>
      <p class="subTitleName">优特电力科大厦</p>
			<p class="subTitleContent">计费说明</p>
    </div>
    <div class="msgListWrapper">
      <div class="row" v-bind:class="{isToRead:item.status==0}" v-for="(item, index) in msgList" v-on:click="toMsgPage(index)">
        <div class="msgInfo" @click="openPickerFunction()">
          <p class="msgtitle">{{item.title}}</p>
          <p class="msgContent" >{{item.content}}</p>
        </div>
      <img class="listIcon" src="../../../static/images/bike_stationIcon.png"/>
      </div>
    </div>
		<div class="picker" v-show="pickerVisiliable">
			<div class="subTitle">
				<p class="canclePicker">取消</p>
				<p class="subTitleName">车辆类型</p>
				<p class="openPicker">开锁</p>
			</div>
			<picker></picker>
		</div>
  </div>
</template>

<script>

import Picker from './picker';

export default {
  components: {
    Picker,
  },
  data() {
    return {
      titleName: '咻咻开锁',
      msgList: [],
      gridData: [{ date: '共享车桩' }, { date: '私人车桩' }],
      bikeDockListBox: true,
      pickerVisiliable: false,
    };
  },
  created() {
    if (true) {
      this.msgList = [
        {
          id: 10086,
          title: '001车桩',
          content: '111111',
          type: 1,
          status: 0,
          createTime: '2018/04/06',
        },
        { id: 10086, title: '002车桩', content: '私人单车', type: 1, status: 1, createTime: '2018/04/06' },
        { id: 10086, title: '003车桩', content: '空闲车桩', type: 1, status: 0, createTime: '2018/04/06' },
        { id: 10086, title: '004车桩', content: '空闲车桩', type: 1, status: 0, createTime: '2018/04/06' },
      ];
		 this.bleDeviceList = [{ name: '#12345' },
        { name: '#34467' },
        { name: '#34567' },
        { name: '#34667' },
        { name: '#35567' },
      ];
    } else {
      this.list();
    }
  },
  methods: {
    // 打开picker
    openPickerFunction() {
      this.pickerVisiliable = !this.pickerVisiliable;
    },
    backPrePage() {
      this.$router.go(-1);
    },
    toMsgPage(index) {

      //         //未读消息标记为已读
      //         if (this.msgList[index].status == 0) {
      //           var _this = this;
      //           this.$http.post('/notify/setNotifyRead',
      //             {
      //               notifyId: _this.msgList[index].id,
      //             }).then(function (response) {
      //             console.log(response.data);
      //             if (response.data.code != 200) {
      //               console.log("标记已读失败")
      //             } else {
      //               console.log("标记已读成功")
      //             }
      //           }).catch((err) => {
      //             console.log("标记已读失败:" + err);
      //           })
      //
      //         }
      //
      //         this.$router.push({
      //           path: '/msg_page',
      //           name: 'msg_page',
      //           params: {
      //             msgObj: this.msgList[index]
      //           }
      //         })

    },
    list() {
      //         var _this = this;
      //         this.$http.post('/notify/pullAllNotify', {
      //
      //         }).then(function (response) {
      //           console.log(response.data);
      //           if (response.data.code != 200) {
      //             console.log("获取消息失败")
      //             _this.showTotal("提示信息", "获取消息失败", '');
      //           } else {
      //             _this.msgList = response.data.data;
      //             console.log("获取消息成功" + JSON.stringify(_this.msgList))
      //           }
      //         }).catch((err) => {
      //           console.log("获取消息失败:" + err);
      //         })
      //       }
    },
  },
};
</script>

<style scoped>
 /* @font-face {
    font-family: 'PingFangBold';
    src: url('../../../assets/font/PingFangBold.ttf');
  } */

  /* @font-face {
    font-family: 'PingFangMedium';
    src: url('../../../assets/font/PingFangMedium.ttf');
  } */

  .msgContent {
    margin: 0px;
    padding-top: 10px;
    /* font-family: PingFangMedium; */
    font-size: 14px;
    color: #999999;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .isToRead {
    background-color: white;
  }

  .timeTxt {
    color: #999999;
    /* font-family: PingFangMedium; */
    font-size: 12px;
  }

  .msgtitle {
    /* font-family: PingFangBold; */
    font-size: 16px;
    color: #333333;
    margin: 0px;
  }

  .msgInfo {
    text-align: left;
    margin: 0px;
    flex: 1;
  }

  .row {
    display: flex;
    flex-direction: row;
    /*align-items: center;*/
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: solid 1px #dfdfdf;
  }
  .msgListWrapper {
    height: calc(100% - 44px);
    overflow: scroll;
    width: 100%;
  }

  .msgList {
    background-color: white;
  }
	.listIcon {
		line-height: 44px;
		position: absolute;
		right: 20px;
		width: 24px;
		height: 24px;
	}
  .wrapper {
    background-color: #f9f9f9;
    height: 100%;
  }

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
    /* font-family: PingFangBold; */
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
		right: 20px;
		width: 24px;
		height: 24px;
		z-index: 9;
	}
	/*********次标题  *********/
	.subTitle {
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

	.subTitleName {
		line-height: 64px;
		position: absolute;
		text-align: center;
		left: 0;
		right: 0;
		margin: 0px;
		font-size: 14px;
		color: black;
		vertical-align: middle;
		/* font-family: PingFangBold; */
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
		font-family: PingFangBold;
	}
	/*********picker *********/
	.picker {
		position: absolute;
    bottom: 60px;
    background-color: white;
    width: 100%;
    display: table-column-group;
    height: 30%;
    align-items: center;
    justify-content: center;
    font-family: "Ping SC Regular";
    font-weight: bold;
		z-index: 999;
	}
	.canclePicker {
		line-height: 64px;
		position: absolute;
		text-align: left;
		left: 0;
		right: 0;
		margin-left: 10px;
		font-size: 12px;
		color: black;
		vertical-align: middle;
		font-family: PingFangBold;
	}
	.openPicker {
		line-height: 64px;
		position: absolute;
		text-align: right;
		left: 0;
		right: 0;
		margin-right: 10px;
		font-size: 12px;
		color: black;
		vertical-align: middle;
		font-family: PingFangBold;
	}

</style>
