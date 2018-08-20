<template>
  <div id="bookDetail">
    <div class="header flex-h flex-vc flex-hc" @click="changeTimeClick">
      <div class="timeicon">
        <svg-icon icon-class="book_clock"></svg-icon>
      </div>
      <div class="timeValue">今天 {{ orderTime }}</div>
      <div class="changetime">
        <svg-icon icon-class="icon_down"></svg-icon>
      </div>
    </div>
    <div class="middleLine"></div>
    <div class="detail flex-v">
      <div class="detail_title flex-h">
        <div class="detail_title_icon">
          <svg-icon icon-class="icon_location"></svg-icon>
        </div>
        <div class="detail_title_value">{{address}}</div>
      </div>
      <!--<div class="detail_num">车桩编号:{{orderNum}}</div>-->
      <div class="detail_type">预约类型: {{ orderType }}</div>
    </div>
    <div class="action flex-h flex-vc flex-hc">
      <div class="item" @click="cancelClick">取消</div>
      <div class="item" @click="sureClick">确认</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookingDetail',
  props: [
    'orderTime',
    'stationInfo',
    'orderType',
    'address',
    'orderNum',
  ],
  data() {
    return {
    };
  },
  methods: {
    cancelClick() {
      this.$emit('cancelClick');
    },
    sureClick() {
      this.$emit('bookingSureClick');
    },
    changeTimeClick() {
      console.log('iiiii');
      this.$emit('changeTime');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../css/flex.css";
  @import '../../../styles/_popupBtn.scss';
#bookDetail {
  width: calc(100% - 20px);
  height: 100%;
  background: white;
  margin: 0 auto;
  color: #272727;
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  .header{
    width: 100%;
    height: 60px;
    .timeicon{
      width: 20px;
      /*height: 20px;*/
      /*background: red;*/
    }
    .changetime{
      margin-left: 10px;
      width: 8px;
      .svg-icon{
        width: 8px;
      }
    }
    .timeValue {
      text-align: center;
      margin-left: 10px;
      font-size: 17px;
    }
  }
  .detail {
    width: 100%;
    height: 157px;
    .detail_title {
      margin-left: 20px;
      margin-top: 20px;
    }
    .detail_title_icon {
      width: 16px;
      height: 16px;
      /*background: red;*/
    }
    .detail_title_value {
      margin-left: 10px;
      font-weight: 700;
      font-size: 17px;
    }
    .detail_num,.detail_type{
      margin-left: 46px;
      color: #2A2A2A;
      font-weight: 200;
      font-size: 14px;
    }
  }
  .middleLine {
    width: calc(100% - 40px);
    height: 1px;
    background: #DFDFDF;
    margin: 0 auto;
  }
}


</style>
