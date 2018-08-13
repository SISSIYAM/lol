<template>
  <div id="wrap">
    <div class="title flex-h flex-vc flex-hc">
      <div class="title_icon">
        <svg-icon icon-class="icon_location"></svg-icon>
      </div>
      <div class="title_content flex-v">
        <div class="title_content_head">{{ address }}</div>
        <div class="title_content_detail">{{ addressDetail }}</div>
      </div>
      <div class="title_btn flex-h flex-vc flex-hc">
        <svg-icon icon-class="book_go_where" class="go_where"></svg-icon>
      </div>

    </div>
    <div class="title_line"></div>
    <div class="station flex-h flex-vc">
      <div class="station_num">
        <div class="station_num_value">{{ free_num }}</div>
        <div class="station_num_title">空闲车位</div>
      </div>
      <div class="station_num">
        <div class="station_num_value">{{ use_num }}</div>
        <div class="station_num_title">共享车位</div>
      </div>
    </div>
    <div class="title_line"></div>
    <div class="action flex-h flex-vc flex-hc">
      <div class="action_stop" @click="selectTime(0)">停车预约</div>
      <div class="action_line"></div>
      <div class="action_get" @click="selectTime(1)">取车预约</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StationInfo',
  props: [
    'address',
    'addressDetail',
    'free_num',
    'use_num',
  ],
  methods: {
    selectTime(value) {
      console.log('点击进入预约');
      console.log(value);
      this.$emit('clickOrder', value);
    },
  },
};
</script>

<style lang="scss" scoped>
  /*引入flex浏览器适配*/
  @import '../css/flex.css';
  #wrap{
    color: #303030;
    width: calc(96%);
    margin: 0 auto;
    height: 100%;
    background: white;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    .title {
      width: 100%;
      height: 80px;
      .title_icon {
        /*background: blue;*/
        width: 20px;
        height: 20px;
      }
      .title_content {
        margin-left: 10px;
        width: calc(100% - 140px);
        .title_content_head {
          width: 100%;
          /*height: 25px;*/
          font-size: 16px;

        }
        .title_content_detail {
          width: 100%;
          font-size: 8px;
          color: gray;
        }
      }
      .title_btn{
        width: 80px;
        height: 40px;
        border-radius: 20px;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        .go_where{
          width: 100%;
          height: 100%;
        }
      }
    }
    .station {
      width: 100%;
      height: 100px;
      .station_num{
        width: 50%;
        height: 100%;
        text-align: center;
        .station_num_value{
          font-size: 50px;
          height: 70px;
        }
        .station_num_title{
          font-size: 8px;
          color: gray;
        }
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
    .title_line {
      width: calc(100% - 20px);
      height: 1px;
      background: #E2E2E2;
      margin: 0 auto;
    }
  }
</style>
