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
      <div class="title_btn flex-h flex-vc flex-hc" @click="beginNav">
        <svg-icon icon-class="book_go_where" class="go_where"></svg-icon>
      </div>

    </div>
    <div class="title_line"></div>
    <div class="station">
      <div class="station_num">
        <p class="station_num_value">{{ free_num }}</p>
        <p class="station_num_title">空闲车位</p>
      </div>
      <div class="station_num">
        <p class="station_num_value">{{ use_num }}</p>
        <p class="station_num_title">共享车位</p>
      </div>
    </div>
    <!-- <div class="title_line"></div> -->
    <div class="action flex-h flex-vc flex-hc">
      <div class="item" @click="selectTime(0)">停车预约</div>
      <div class="item" @click="selectTime(1)">取车预约</div>
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
    beginNav() {
      this.$emit('beginNav');
    },
  },
};
</script>

<style lang="scss" scoped>
  /*引入flex浏览器适配*/
  @import '../css/flex.css';
  @import '../../../styles/_popupBtn.scss';
  #wrap{
    color: #303030;
    width: calc(100% - 20px);
    margin: 0 auto;
    height: 100%;
    background: white;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    .title {
      width: 100%;
      height: 80px;
      .title_icon {
        /*background: blue;*/
        width: 16px;
        height: 16px;
        margin-bottom: 16px * 1.6;
      }
      .title_content {
        margin-left: 10px;
        width: calc(100% - 140px);
        .title_content_head {
          width: 100%;
          /*height: 25px;*/
          font-size: 17px;

        }
        .title_content_detail {
          width: 100%;
          font-size: 12px;
          color: #666;
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
      height: 131px;
      display: table;
      .station_num{
        display: table-cell;
        width: 50%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        .station_num_value{
          font-size: 40px;
          line-height: 1.5;
        }
        .station_num_title{
          font-size: 12px;
          line-height: 1;
          color: #666;
        }
      }
    }
  }
</style>
