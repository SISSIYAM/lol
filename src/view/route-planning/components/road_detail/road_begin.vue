<template>
  <div class="walk_detail flex-h flex-vc">
    <svg-icon icon-class="planning_begin_green" class="begin_left_icon"></svg-icon>
    <div class="walk_detail_title">起点</div>
    <div class="walk_detail_add">（{{dataObj.title}}）</div>
  </div>
</template>

<script>
export default {
  name: "road_begin",
  props: [
    'dataObj',
  ],
}
</script>

<style scoped>
  @import "../../../station-booking/css/flex.css";
  .walk_detail{
    height: 30px;
  }
  .begin_left_icon {
    width: 16px;
    height: 16px;
  }
  .walk_detail_title{
    margin-left: 20px;
  }
  .walk_detail_add{
    margin-left: 10px;
    font-weight: 700;
  }
</style>
