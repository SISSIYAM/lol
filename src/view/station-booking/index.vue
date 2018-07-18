<template>
  <div id="stationBooking" @click="removeBooking">
    <div class="stationInfo" v-show="isStationInfo">
      <station-info v-on:clickOrder="clickOrder" v-bind:address="address" v-bind:address-detail="addressDetail" v-bind:free_num="free_num" v-bind:use_num="use_num"></station-info>
    </div>
    <div class="selectTime" v-show="isSelectTime">
      <booking-time ref="editTime" v-on:cancelClick="cancelClick" v-on:sureClick="sureClick"></booking-time>
    </div>
    <div class="bookDetail" v-show="isBookingDetail">
      <booking-detail v-on:cancelClick="cancelClick" v-on:bookingSureClick="bookingSureClick" :orderTime="orderTime" :address="headAddress" :orderNum="bookingNum" :orderType="bookingValue"></booking-detail>
    </div>
  </div>
</template>

<script>
import StationInfo from './components/stationInfo';
import BookingTime from './components/bookingTime';
import BookingDetail from './components/bookingDetail';
import { bookStation } from '../../api/shareStation';

export default {
  name: 'StationBooking',
  data() {
    return {
      isSelectTime: false, // 是否显示选择时间界面
      isStationInfo: true, // 是否显示站点信息界面
      isBookingDetail: false, // 是否显示预定详细界面
      canHidden: true, // 判断是否通过点击上面的空白区域取消界面（目前只有站点信息界面为true）
      // 用于预约详细界面的数据
      bookingType: '', // 0：停车预约，1：取车预约
      bookingValue: '', // 预约类型文字内容
      bookingNum: '', // 预约车桩编号
      orderTime: '', // 预约车桩时间
      headAddress: '',
      // 站点信息的详细内容，通过点击站点传入
      stationInfo: {},
    };
  },
  props: [
    'address',
    'addressDetail',
    'free_num',
    'use_num',
  ],
  components: {
    StationInfo,
    BookingTime,
    BookingDetail,
  },
  methods: {
    /**
     *
     * 设置车桩信息内容
     * 从上一页通过$refs调用
     *
     *
     * */
    setStationInfo(obj) {
      this.stationInfo = obj;
      this.headAddress = obj.description;
      console.log(obj);
    },

    /**
    *
    * clickOrder：点击停车预约、取车预约按钮
    * value：
    * 0：取车预约
    * 1：停车预约
    *
    * */
    clickOrder(value) {
      this.isSelectTime = true;
      this.canHidden = false;
      this.bookingType = value;
      if (this.bookingType === 0) {
        this.bookingValue = '停车预约';
      } else {
        this.bookingValue = '取车预约';
      }
      this.bookingNum = '3';
      this.$refs.editTime.setTimeArray();
    },

    /**
    *
    * removeBooking：移除当前界面，需要向主组件回调，通过父组件来隐藏该界面
    *
    * */
    // 向父组件调用移除掉stationinfo这个组件
    removeBooking(ev) {
      // 判断点击的是否是后面的大背景标签，如果是，则移除界面

      if (ev.target.id === 'stationBooking' && this.canHidden === true) {
        this.$emit('removeStation');
        this.isStationInfo = true;
        this.isSelectTime = false;
        this.isBookingDetail = false;
      }
    },
    /*
    *
    * 在选择时间界面，点击取消按钮
    *
    * */
    cancelClick() {
      // this.$emit('removeStation');
      this.isStationInfo = true;
      this.isSelectTime = false;
      this.isBookingDetail = false;
      this.canHidden = true;
    //  下一步：取消所有绑定的预约内容

    },
    /*
    *
    * 在选择时间界面，点击确定按钮
    * value:日期对象
    *
    * */
    sureClick(value) {
      // this.$emit()
      this.isBookingDetail = true;
      this.isSelectTime = false;
      this.isStationInfo = false;
      this.orderTime = String(value.getHours()) + ':' + String(value.getMinutes());
      console.log('收到值:' + value);
      console.log(this.free_num);
      console.log(this.stationInfo);
    },
    /**
     *
     * 预约确认按钮
     *
     *
     * */
    bookingSureClick() {
      console.log('点击了');
      this.isStationInfo = false;
      this.isSelectTime = false;
      this.isBookingDetail = false;
      this.canHidden = true;
      this.beginBooking();
    //  下一步：正式预约
    //   this.beginBooking();
    },
    /**
     *
     * 正式预约成功
     *
     * */
    beginBooking() {
      console.log('可以预约了');
      const type = this.bookingType;
      const myid = this.stationInfo.id;
      bookStation(type, myid).then((response) => {
        console.log('预约成功');
        console.log(response);
      }).catch((error) => {

      });
    },
    // 以下方法用在提前预约时候使用，暂时保留

    /**
     *
     * 开始预约一分钟
     *
     * */
    bookingWithMinutes() {

    },


    /**
     *
     * 修改预约时长
     *
     *
     * */
    resetBookingTime() {

    },
  },
};
</script>

<style lang="scss" scoped>
  /*引入flex浏览器适配*/
  @import 'css/flex.css';
#stationBooking{
  width: 100%;
  height: 100%;
  position: relative;
  .stationInfo {
    width: 100%;
    height: 232px;
    position: absolute;
    bottom: 20px;
  }
  .selectTime {
    width: 100%;
    height: 278px;
    position: absolute;
    bottom: 0;
  }
  .bookDetail {
    width: 100%;
    height: 252px;
    position: absolute;
    bottom: 20px;
  }
}


</style>
