<template>
  <div class="ride_detail flex-h">
    <div class="ride_detail_left">
      <svg-icon icon-class="planning_detail_ride" class="detailRide"></svg-icon>
    </div>
    <div class="ride_detail_right">
      <div class="ride_right_top flex-h flex-vc">
        <div class="walk_detail_title">{{dataObj.beginType}}</div>
        <div class="walk_detail_add">（{{dataObj.beginTitle}}）</div>
        <div class="ride_order_num flex-h flex-vc">{{dataObj.getOrderNum}}</div>
      </div>
      <div class="walk_detail_mill flex-h flex-vc">
        <div class="walk_detail_mill_length">{{dataObj.middleTitle}}</div>
      </div>
      <div class="ride_right_top flex-h flex-vc">
        <div class="walk_detail_title">{{dataObj.endType}}</div>
        <div class="walk_detail_add">（{{dataObj.endTitle}}）</div>
        <div class="ride_order_num flex-h flex-vc">{{dataObj.putOrderNum}}</div>
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
}
</script>

<style scoped>
  @import "../../../station-booking/css/flex.css";
  .ride_detail{
    height: 130px;
  }
  .ride_detail_left{
    height: 100%;
  }
  .detailRide{
    width: 16px;
    height: 100%;
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
  }
</style>
