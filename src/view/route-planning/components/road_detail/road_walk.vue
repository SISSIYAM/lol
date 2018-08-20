<template>
  <div class="walk_detail_mill flex-h flex-vc">
    <div class="ride_detail_left">
      <svg-icon icon-class="planning_walk_left" class="planning_walk_left_icon"></svg-icon>
    </div>
    <div class="walk_detail_mill_length">{{dataObj.middleTitle}}</div>
  </div>
</template>

<script>
export default {
  name: "road_walk",
  props:[
    'dataObj',
  ],
}
</script>

<style lang="scss" scoped>
  @import "../../../station-booking/css/flex.css";
  .walk_detail_mill{
    width: 100%;
    height: 80px;
    color: #616161;
    font-size: 14px;
    .ride_detail_left{
      width: 16px;
      height: 80px;
    }
    .planning_walk_left_icon{
      width: 16px;
      height: 80px;
    }
    .walk_detail_mill_length{
      margin-left: 20px;
    }
  }

</style>
