<template>
  <div class="navbar-container">
    <div class="drawer-container" @click="showPoper">
      <svg-icon icon-class="user" class="user-info"></svg-icon>
    </div>
    <div class="bike-car-container">
      <tab v-model="index01" prevent-default @on-before-index-change="switchTabItem">
        <tab-item>单车
        </tab-item>
        <!-- <tab-item>汽车</tab-item> -->
      </tab>
    </div>
    <div class="little-utils-container" @click="scanOrder">
      <!-- <svg-icon icon-class="message" class="right-item"></svg-icon> -->
      <svg-icon icon-class="scan" class="right-item"></svg-icon>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, Loading } from 'vux';
import ShareBikeApi from '../../../utils/sharebikeCordovaApi';

export default {
  name: 'navbar',
  components: {
    TabItem,
    Tab,
    Loading,
  },
  data() {
    return {
      isBike: true,
      index01: 0,
      index: 0,
    };
  },
  methods: {
    switchTabItem(index) {
      console.log('on-before-index-change', index);
      this.$vux.loading.show({
        text: '稍等',
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.index01 = index;
      }, 1000);
    },
    showPoper() {
      if (this.$store.getters.authCode) {
        this.$emit('showPageTotal');
      } else {
        this.$router.push('/login');
      }
      // this.$emit('showPageTotal');
    },

    scanOrder() {
      console.log('点击二维码');
      if (this.$store.getters.authCode) {
        ShareBikeApi.startScan(() => {
        }, (data) => {});
      } else {
        self.$router.push({ path: '/login' });
      }
    },
  },
};
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
.navbar-container {
  height: 44px;
  line-height: 44px;
  background-color: #FFF;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  .drawer-container {
    float:left;
    margin-left: 20px;
    .user-info {
      width: 22px;
      height: 22px;
    }
  }
  .bike-car-container {
    display: inline-flex;
    font-weight: bold;
    font-size: 17px;
    .vux-tab-wrap{
      position: inherit;
      .vux-tab-container {
        height: 44px;
        top: 0;
        left: 102px;
        right: 102px;
        overflow: hidden;
        position: absolute;
        .vux-tab .vux-tab-item.vux-tab-selected {
          color: #2CB8FF;
          border-bottom: 3px solid #2CB8FF;
          display: block;
        }
        .vux-tab-ink-bar {
          position: absolute;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #ffffff;
          text-align: center;
        }
        .vux-tab .vux-tab-item {
          display: block;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          width: 100%;
          height: 100%;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          /*background: -webkit-gradient(linear, left top, left bottom, from(#e5e5e5),
          color-stop(#e5e5e5), to(rgba(229, 229, 229, 0))) bottom left no-repeat;*/
          background: none;
          background-size: 100% 1px;
          font-size: 17px;
          text-align: center;
          line-height: 44px;
          color: #666;
        }
      }
    }
  }
  .little-utils-container {
    float: right;
    &:focus {
      outline:none;
    }
    .right-item{
      display: inline-block;
      margin-right: 20px;
      width: 22px;
      height: 22px;
    }
  }
}
</style>
