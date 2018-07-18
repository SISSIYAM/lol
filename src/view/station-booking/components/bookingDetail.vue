<template>
  <div id="bookDetail">
    <div class="header flex-h flex-vc flex-hc">
      <div class="timeicon"></div>
      <div class="timeValue">今天 {{ orderTime }}</div>
    </div>
    <div class="middleLine"></div>
    <div class="detail flex-v flex-hc">
      <div class="detail_title flex-h">
        <div class="detail_title_icon"></div>
        <div class="detail_title_value">{{address}}</div>
      </div>
      <div class="detail_num">车桩编号:{{orderNum}}</div>
      <div class="detail_type">预约类型: {{ orderType }}</div>
    </div>
    <div class="endLine"></div>
    <div class="action flex-h flex-vc flex-hc">
      <div class="action_stop" @click="cancelClick">取消</div>
      <div class="action_line"></div>
      <div class="action_get" @click="sureClick">确认</div>
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
  },
}
</script>

<style lang="scss" scoped>
  @import "../css/flex.css";
#bookDetail {
  width: calc(96%);
  height: 100%;
  background: white;
  margin: 0 auto;
  color: #272727;
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  .header{
    width: 100%;
    height: 50px;
    .timeicon{
      width: 20px;
      height: 20px;
      background: red;
    }
    .timeValue {
      text-align: center;
      margin-left: 10px;
    }
  }
  .detail {
    width: 100%;
    height: 150px;
    .detail_title {
      margin-left: 20px;
      margin-bottom: 15px;

    }
    .detail_title_icon {
      width: 20px;
      /*height: 20px;*/
      background: red;
    }
    .detail_title_value {
      margin-left: 10px;
      font-weight: 700;
      font-size: 16px;
    }
    .detail_num,.detail_type{
      margin-left: 50px;
      color: #2A2A2A;
      font-weight: 200;
      font-size: 14px;
    }
  }
  .action {
    width: 100%;
    height: 50px;
    .action_stop {
      width: calc(50% - 0.5px);
      /*height: 100%;*/
      text-align: center;
    }
    .action_line {
      width: 1px;
      height: 100%;
      background: #E2E2E2;
    }
    .action_get{
      width: calc(50% - 0.5px);
      /*height: 100%;*/
      text-align: center;
    }
  }
  .middleLine {
    width: calc(100% - 40px);
    height: 1px;
    background: #E2E2E2;
    margin: 0 auto;
  }
  .endLine {
    width: 100%;
    height: 1px;
    background: #E2E2E2;
  }
}


</style>
