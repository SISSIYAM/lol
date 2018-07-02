<template>
  <vue-drawer-layout :enable='false' ref="drawer" @mask-click="handleMaskClick">
    <div class="drawer-content" slot="drawer">
      <!-- drawer-content -->
      <div class="leftDrawDiv">
        <div class="userBgDiv">
          <div class="userBgDivBottom" v-on:click="toUserInfoPage">
            <img class="userIcon" src="../../../../static/images/icon_male.png"/>

          </div>
        </div>
        <!-- 列表 -->
        <div>
          <div class="rowDiv" @click="myWalletPage">
            <img class="smallIcon" src="../../../../static/images/userPaker.png">
            <p class="txt">我的钱包</p>
          </div>

          <div class="rowDiv">
            <img class="smallIcon" src="../../../../static/images/card_voucher.png">
            <p class="txt">我的卡券</p>
          </div>

          <div class="rowDiv" @click="myTripPage">
            <img class="smallIcon" src="../../../../static/images/user_march.png">
            <p class="txt">我的行程</p>
          </div>

          <div class="rowDiv" @click="scanToReport">
            <img class="smallIcon" src="../../../../static/images/icon_report.png">
            <p class="txt">扫码举报</p>
          </div>

        </div>
      </div>
    </div>
    <div slot="content" style="height: 100%">
      <!-- main-content -->
      <div class="mainDrawDiv">
        <page-title-com style="height: 7%;margin-bottom: 5px" @showPageTotal="showPageTotal"
                        :mid-status="MidMethods.midStatus"
                        :mid-text-left="MidMethods.left" :mid-text-right="MidMethods.right" @GoOutMethod="GoOutMethod"
                        @BikeKneeMethod="BikeKneeMethod" @clickMsg="clickMsg"></page-title-com>
        <!-- 地图 -->
        <!--<div id="map-container"></div>-->
        <map_bike v-if="isShowBikeMap" change-to-navi="changeToNav" @changeToNav="changeToNav" @unlockBikeDock="startOperateLock(...arguments)" class="map-container"
                  ref="bikemap"></map_bike>
        <map_car v-else change-to-navi="changeToNav" @changeToNav="changeToNav" class="map-container"
                 ref="carmap"></map_car>


        <!-- 底部功能选项框 -->
        <div id="whereGo" v-if="!isShowNavigate">
          <div class="whereGoitem" @click="whereGoOut">
            <div class="itemChild">
              <img src="../../../../static/images/goOut.png" style="width: 23px;height: 23px"><span>出行</span>
            </div>
          </div>

          <!-- TODO：原扫码方案 暂时从底部功能选项中移出 等待设计>
          <!--<div class="whereGoitem" @click="scanOrder">-->
          <!--<div class="itemChild">-->
          <!--<img src="../../../../static/images/scanOpen.png" style="width: 23px;height: 23px"><span>扫码开/关锁</span>-->
          <!--</div>-->
          <!--</div>-->

          <div class="whereGoitem" @click="startBleScan">
            <div class="itemChild">
              <img src="../../../../static/images/broadcasting.png" style="width: 23px;height: 23px">
              <span>咻咻开锁</span>
            </div>
          </div>
        </div>

        <div v-else id="navigateButton" v-on:click="startNavigate">
          <span>开始导航</span>
        </div>

        <div class="blue-device-list" v-show="bikeDockListBox">
          <div class="blue-device-list-row" v-for="(item,index) in bleDeviceList">
            <div class="blue-device-list-column">
              <img src="../../../../static/images/bike_dock.png">
            </div>
            <div class="blue-device-list-column list-content">
              <span>车位{{index+1}}</span>
            </div>
            <div class="blue-device-list-column list-content">
              <span>{{item.name}}</span>
            </div>
            <div class="blue-device-list-column" @click="connectBle(item)">
              <img src="../../../../static/images/off_on.png">
            </div>
          </div>
          <button class="close-blue-device-button" @click="closeBlueDeviceList">
            <span>取消</span>
          </button>
        </div>
      </div>

    </div>
  </vue-drawer-layout>
</template>

<script>
import { DrawerLayout } from 'vue-drawer-layout';

export default {
  name: 'drawerBar',
  components: {
    DrawerLayout,
  },
};
</script>

<style scoped>

</style>
