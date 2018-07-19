<template>
  <el-menu class="navbar-container">
    <div class="drawer-container"  @click="toggleDrawerBar" :class="drawerBar.opened">
      <svg-icon icon-class="icon_male" class="user-icon"></svg-icon>
    </div>
    <div class="bike-car-container">
      <tab v-model="index01" prevent-default @on-before-index-change="switchTabItem">
        <tab-item>单车
        </tab-item>
        <tab-item>汽车</tab-item>
      </tab>
    </div>
    <div class="little-utils-container">
      <svg-icon icon-class="icon_male" class="right-item"></svg-icon>
      <svg-icon icon-class="icon_male" class="right-item"></svg-icon>
    </div>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex';
import { Tab, TabItem, Loading } from 'vux';
import store from '../../../store';

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
  computed: {
    ...mapGetters([
      'drawerBar',
    ]),
  },
  methods: {
    toggleDrawerBar() {
      if (store.getters.authStatus) {
        this.$store.dispatch('toggleDrawerBar');
      } else {
        this.$router.push({ path: '/login' });
      }
    },

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
  },
};
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
.navbar-container {
  height: 44px;
  line-height: 50px;
  .drawer-container {
    line-height:58px;
    height:50px;
    float:left;
    padding: 0 10px;
    .user-icon {
      width: 27px;
      height: 27px;
    }
  }
  .bike-car-container {
    display: inline-flex;
    font-family: PingFangBold;
    font-weight: bold;
    font-size: 14px;
    .vux-tab-wrap{
      position: inherit;
      .vux-tab-container {
        height: 44px;
        top: 0;
        left: 113px;
        right: 134px;
        overflow: hidden;
        position: absolute;
        .vux-tab .vux-tab-item.vux-tab-selected {
          color: #369ebe;
          border-bottom: 3px solid #369ebe;
        }
      }
    }
  }
  .little-utils-container {
    float: right;
    height: 100%;
    &:focus {
      outline:none;
    }
    .right-item{
      display: inline-block;
      margin: 3px 20px;
    }
  }
}
</style>
