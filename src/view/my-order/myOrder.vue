<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <div class="header header-fixed ">
        <div class="header-left" v-on:click="backPrePage">
          <svg-icon icon-class="icon_back" class="arrow"></svg-icon>
        </div>
        <div class="title">{{titleName}}</div>
      </div>
    </div>
    <div class="order-wrapper">
      <div class="orderList" v-if="orderList.length">
        <ul>
          <li class="item" v-for="(item,index) in orderList" :key="index">
            <div class="top">
              <div class="title">{{item.type === 0 ? '停车' : '取车'}}
                <svg-icon :icon-class="iconName(item.stationType)" class="exchange"></svg-icon>
              </div>
              <div class="charge">
                <span>{{item.cost/100}}</span> 元</div>
            </div>
            <div class="bottom">
              <div class="detail">
                <p>{{item.endTime | time2Date}}</p>
                <p>{{item.stationName}}</p>
                <p>{{item.stationDetailId}}桩</p>
              </div>
              <div class="time">{{calcTime(item.startTime, item.endTime)}} 分钟</div>
            </div>
          </li>
        </ul>
      </div>
      <nodata-tips v-if="!orderList.length" :title="'暂无订单记录'" :desc="'快来一场说走就走的旅程吧！'"></nodata-tips>
    </div>
  </div>
</template>

<script>
import { getPayOrder } from '../../api/payAndTrade';
import NodataTips from '../../components/NodataTips/NodataTips';
import { formatDate } from '../../filters/date';

export default {
  data() {
    return {
      titleName: '我的订单',
      orderList: [],
    };
  },
  mounted() {
    this.getPayOrderList();
  },
  methods: {
    // 返回按钮
    backPrePage() {
      this.$router.go(-1);
    },
    iconName(type) {
      if (Number(type) === 0) {
        return 'public_icon';
      } else if (Number(type) === 1) {
        return 'private_icon';
      }
      return 'empty_icon';
    },
    getPayOrderList() {
      getPayOrder(-1).then((res) => {
        if (res.data.code !== 200) {
          console.log('获取订单记录失败');
          this.$vux.alert.show({
            title: '提示信息',
            content: '获取订单记录失败',
          });
        } else {
          console.log('获取订单记录成功');
          this.orderList = res.data.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    calcTime(a, b) {
      return (b - a) / (1000 * 60);
    },
  },
  components: {
    NodataTips,
  },
  filters: {
    time2Date: (time) => {
      const date = new Date(time);
      return formatDate(date, 'yyyy年MM月dd日 h:m:s');
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/header.less";
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.order-wrapper {
  height: calc(100vh - 44px);
  overflow: hidden;
  .orderList {
    width: 100%;
    background-color: #fff;
    height: 100%;
    overflow-y: scroll;
    ul {
      list-style: none;
      margin-left: 20px;
      .item {
        height: 120px;
        overflow: hidden;
        box-sizing: border-box;
        border-bottom: 1px solid #dfdedf;
        .top {
          margin-top: 20px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          color: #333;
          .title {
            font-size: 13px;
            .exchange {
              height: 14px;
              width: 60px;
            }
          }
          .charge {
            font-size: 15px;
            margin-right: 20px;
            span {
              color: #ff3b30;
            }
          }
        }
        .bottom {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
          .time {
            font-size: 12px;
            margin-right: 20px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
