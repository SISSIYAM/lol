<template>
  <div class="walk_detail flex-h flex-vc">
    <svg-icon icon-class="planning_begin_red" class="begin_left_icon"></svg-icon>
    <div class="walk_detail_title">终点</div>
    <div class="walk_detail_add">（{{dataObj.title}}）</div>
  </div>
</template>

<script>
export default {
  name: "road_end",
  props: [
    'dataObj',
  ],
}
</script>

<style scoped>
  @import "../../../station-booking/css/flex.css";
  .walk_detail{
    height: 30px;
    padding-bottom: 20px;
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
