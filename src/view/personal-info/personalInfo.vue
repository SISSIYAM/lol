<template>
  <div class="wrapper">
    <title-com :to-path-url="url" class="titleCom"></title-com>
    <div class="wrapper_back">
      <div class="infoWrapper">
        <div class="rowDiv">
          <p class="txt">头像</p>
          <svg-icon icon-class="icon_male"  class="user-image"></svg-icon>
          <svg-icon icon-class="right_arrow" class="right-arrow"></svg-icon>
          <div class="sissi">
          <popup-picker :data ="updateList" @on-show="onShow"
                        @on-hide="onHide" @on-change="onChange" >
          </popup-picker>
          </div>
        </div>
        <div class="line"></div>
        <router-link :to="{path:'/changeName'}" class="rowDiv2">
          <p class="txt">昵称</p>
          <p class="nickName">{{ user.userName }}</p>
          <svg-icon icon-class="right_arrow" class="right-arrow"></svg-icon>
        </router-link>
        <div class="line"></div>
        <div class="rowDiv2">
          <p class="txt">手机号码</p>
          <p class="nickName">{{user.userPhone}}</p>
        </div>
        <div class="line"></div>
      </div>
      <br>
      <div class="infoWrapper">
        <div class='rowDiv2'>
          <p class="txt">注册时间</p>
          <p class='nickName'>{{user.createTime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PopupPicker } from 'vux';
import titleCom from '../login/components/titleCom';
import store from '../../store';
import { formatDate } from '../../filters/date';

export default {
  name: 'personalInfo',
  data() {
    return {
      user: {
        userName: store.getters.userName,
        userPhone: store.getters.userPhone,
        createTime: '',
      },
      updateList: [['本地相册', '手机拍照']],
      value: ['本地相册'],
    };
  },
  components: {
    titleCom,
    PopupPicker,
  },
  created() {
    this.formatCreateTime();
  },
  methods: {
    formatCreateTime() {
      const self = this;
      const time = self.$store.getters.createTime;
      this.user.createTime = formatDate(time, 'yyyy-MM-dd');
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    font-weight: 600;
  }
  .titleCom{
    height: 8%;
  }
  .wrapper_back{
    background-color: #f9f9f9;
    width: 100%;
    height: 100%;
  }
  .line {
    background-color:#dfdfdf;
    height: 1px;
    width: 100%;
    opacity: 0.4;
    margin-left: 20px;
  }
  /*********用户  *********/
  .logOutDiv{
    width: 90%;
    background-color: #ff3b30;
    margin: 20px auto;
    border-radius: 10px;
  }
  .logOutTxt{
    padding: 15px;
    font-size: 14px;
    color: white;
  }
  .nickName{
    position: absolute;
    right: 35px;
    font-size: 13px;
    color: #666666;
  }
  .right-arrow {
    width: 8px;
    height: 8px;
    position: absolute;
    right: 20px;
  }
  .rowDiv {
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  .rowDiv2 {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  .sexChange{
    width: 80%;
    height: 60px;
    .weui-cells{
      margin: 0px 0px;
      padding: 0px 0px;
      height: 60px;
    }
    .weui-cell_access,.weui-cell__ft{
      padding: 0px 0px;
    }
    .weui-cell,.vux-tap-active,.weui-cell_access{
      height: 60px;
    }
    .vux-cell-value{
      margin-right: 11px;
    }
  }
  .user-image {
    width: 58px !important;
    height: 58px !important;
    position: absolute;
    right: 50px;
  }
  .infoWrapper {
    background-color: white;
  }
  .txt {
    position: absolute;
    left: 20px;
    font-size: 12px;
    color: #333333;
    font-weight:lighter;
    margin-left: 3px;
  }
</style>
