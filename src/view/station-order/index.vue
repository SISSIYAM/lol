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
    <div class="wapper_item">
      <ul class="orderList" v-if="orderList.length">
        <li class="item" v-for="(order, index) in orderList" :key="index" @click="itemClick(order)">
          <div class="left">
            <div style="margin:20px 10px 0 0">
              <svg-icon icon-class="icon_location" class="icon"></svg-icon>
            </div>
          </div>
          <div class="main">
            <div class="info">
              <span>{{order.isday}}</span>
              <span>{{order.expireTime}}</span>
              <span>{{order.type}}</span>
              <div class="address">{{order.stationName}}</div>
            </div>
            <div class="right" :class="{default: order.status === '预约进行时'}">
              {{order.status}}
              <svg-icon icon-class="icon_right" class="icon"></svg-icon>
            </div>
          </div>
        </li>
      </ul>
      <nodata-tips v-if="!orderList.length" :title="'暂无预约记录'" :desc="'快来一场说走就走的旅程吧！'"></nodata-tips>
    </div>
  </div>
</template>

<script>

import { getBookList } from '../../api/shareOrder';
import OrderDetail from './orderDetail';
import { formatDate } from '../../filters/date';
import NodataTips from '../../components/NodataTips/NodataTips';

export default {

  name: 'stationOrder',

  data() {
    return {
      titleName: '我的预约',
      orderList: [],
      status: '预约状态未知',
      expireTime: '',
    };
  },
  created() {
    // this.formatCreateTime();
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
    this.getOrder();
  },

  methods: {
    // 更改预约状态样式
    textRightStyle(order) {
      if (String(order.status) === '预约进行时') {
        return 'textRightBlue';
      }
      return 'textRight';
    },
    // 时间转换
    // formatCreateTime() {
    // 	this.expireTime = formatDate(time, 'yyyy-MM-dd');
    // },
    // 返回
    backPrePage() {
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
        if (response.data.code !== 200) {
          _this.showPlugin('提示信息', '获取预约列表失败');
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
            if (String(obj.status) === '0') {
              obj.status = '预约进行时';
            } else if (String(obj.status) === '1') {
              obj.status = '履行预约';
            }	else if (String(obj.status) === '2') {
              obj.status = '预约过期';
            } else {
              obj.status = '预约取消';
            }
          });
          _this.orderList = response.data.data;
        }
      }).catch((error) => {
        console.log(error);
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
    itemClick(order) {
		  this.$router.push({
        name: 'orderDetail',
        params: {
          orderObj: order,
        },
      });
    },
  },
  components: {
    NodataTips,
  },
};
</script>

<style scoped lang="less">
/*********标题栏  *********/
@import "../../styles/header.less";
#wapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .wapper_item {
    height: calc(100vh - 44px);
    width: 100%;
    overflow: hidden;
    .orderList {
      height: 100%;
      background: #fff;
      list-style: none;
      overflow-y: auto;
      .item {
        display: flex;
        justify-content: space-between;
        height: 84px;
        width: 100%;
        overflow: hidden;
        &:active {
          background: #ddd;
        }
        .left {
          margin-left: 20px;
          height: 84px;
          .icon {
            width: 16px;
            height: 16px;
          }
        }
        .main {
          height: 84px;
          display: flex;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          border-bottom: solid 1px #dfdfdf;
          font-size: 14px;
          .info {
            font-weight: bold;
            margin-top: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .address {
              font-size: 12px;
              font-weight: normal;
              margin-top: 10px;
              color: #666;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .right {
            min-width: 63px;
            font-size: 12px;
            margin-top: 20px;
            margin-right: 20px;
            color: #999;

            .icon {
              width: 8px;
              height: 8px;
            }
          }
          .default {
            color: #2cb8ff;
          }
        }
      }
    }
  }
}
</style>
