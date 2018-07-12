<template>
  <div class="routing-xiuxiu-container">
    <tabbar class="vux-demo-tabbar" icon-calss="" slot="bottom">
      <tabbar-item :link="{path:'/routePlanning'}">
        <span><svg-icon></svg-icon></span>
        <span slot="label">行程规划</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/xiuxiuUnlocking'}">
        <span><svg-icon></svg-icon></span>
        <span slot="label">咻咻开锁</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux';


export default {
  name: 'routingXiuxiu',
  components: {
    TabbarItem,
    Tabbar,
  },
};
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  .routing-xiuxiu-container{
   min-height: calc( 100vh - 74px );
    position:absolute;
    overflow: hidden;
    .weui-tabbar {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      position: fixed;
      z-index: 500;
      bottom: 10px;
      left:7px;
      width: 96%;
      background-color: #9dc3ea;
      border-radius: 3px;
      .weui-tabbar__label {
        text-align: center;
        font-family: PingFangBolding;
        color: #333333;
      }
    }
  }
</style>
