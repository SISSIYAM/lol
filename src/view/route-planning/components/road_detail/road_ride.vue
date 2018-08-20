<template>
  <div class="ride_detail flex-h">
    <div class="ride_detail_left">
      <svg-icon :icon-class="dataObj.type==='RIDE' ? 'planning_detail_ride' : 'planning_detail_bus'" class="detailRide"></svg-icon>
    </div>
    <div class="ride_detail_right">
      <div class="ride_right_top flex-h flex-vc">
        <div class="walk_detail_title">{{dataObj.beginType}}</div>
        <div class="walk_detail_add">（{{dataObj.beginTitle}}）</div>
        <!--<div class="ride_order_num flex-h flex-vc">{{dataObj.getOrderNum}}</div>-->
      </div>
      <div class="walk_detail_mill flex-h flex-vc">
        <div class="walk_detail_mill_length">{{dataObj.middleTitle}}</div>
      </div>
      <div class="ride_right_top flex-h flex-vc">
        <div class="walk_detail_title">{{dataObj.endType}}</div>
        <div class="walk_detail_add">（{{dataObj.endTitle}}）</div>
        <!--<div class="ride_order_num flex-h flex-vc">{{dataObj.putOrderNum}}</div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "roadRide",
  props:[
    'dataObj',
  ],
  methods: {
    leftImage() {
      if (dataObj.type === 'RIDE') {
        return 'planning_detail_ride';
      } else {
        return 'planning_detail_bus';
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "../../../station-booking/css/flex.css";
  .ride_detail{
    width: 100%;
    height: 130px;
    .ride_detail_left{
      width: 16px;
      height: 130px;
      .detailRide{
        width: 16px;
        height: 130px;
      }
    }
    .walk_detail_title{
      margin-left: 20px;
    }
    .walk_detail_add{
      margin-left: 10px;
      font-weight: 700;
    }
    .ride_order_num{
      border: 1px solid #78C9FF;
      width: 20px;
      height: 14px;
      color: #78C9FF;
      font-size: 10px;
      line-height: 14px;
    }
    .walk_detail_mill{
      height: 80px;
      /*margin-left: 20px;*/
      color: #616161;
      font-size: 14px;
    }
    .walk_detail_mill_length{
      margin-left: 20px;
      width: calc(60%);
      word-wrap:break-word;
      word-break:break-all;
      overflow: hidden;
    }
  }

</style>
