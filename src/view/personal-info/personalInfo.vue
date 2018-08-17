<template>
  <div class="wrapper">
    <title-com :to-path-url="url" class="titleCom"></title-com>
    <div class="wrapper_back">
      <div class="infoWrapper">
        <div class="rowDiv" v-on:click="onClick">
          <p class="txt">头像</p>
          <svg-icon icon-class="icon_male"  class="user-image"></svg-icon>
          <svg-icon icon-class="right_arrow" class="right-arrow"></svg-icon>
            <!--<input type="file" @change="onfile"/>-->
            <!--<button @click="uploading">uploading</button>-->
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
    <popup-picker v-on:showValue="showValue"></popup-picker>
  </div>
</template>

<script>
import titleCom from '../login/components/titleCom';
import store from '../../store';
import { formatDate } from '../../filters/date';
import { uploadingImg } from '../../api/userDetails';
import popupPicker from '../../components/popupPicker';

const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};
export default {
  name: 'personalInfo',
  data() {
    return {
      user: {
        userName: store.getters.userName,
        userPhone: store.getters.userPhone,
        createTime: '',
      },
      tempValue: getObject(this.value),
      closeType: false,
      currentData: JSON.stringify(this.data),
      selectedFileList: null,
      selectedFileName: null,
    };
  },
  components: {
    titleCom,
    popupPicker,
  },
  props: {
    title: String,
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: String,
    columns: {
      type: Number,
      default: 0,
    },
    fixedColumns: {
      type: Number,
      default: 0,
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    showName: Boolean,
    inlineDesc: String,
    showCell: {
      type: Boolean,
      default: true,
    },
    show: Boolean,
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

    onClick() {
      console.log('选择上传头像方式');
      this.$emit('showValue');
    },

    onHide(type) {
      this.show = false;
      if (type) {
        this.closeType = true;
        this.value = getObject(this.tempValue);
      }
      if (!type) {
        this.closeType = false;
        if (this.value.length > 0) {
          this.tempValue = getObject(this.value);
        }
      }
    },

    onPopupHide(val) {
      if (this.value.length > 0) {
        this.tempValue = getObject(this.value);
      }
      this.$emit('on-hide', this.closeType);
    },

    onPickerChange(val) {
      if (JSON.stringify(this.value) !== JSON.stringify(val)) {
        // if has value, replace it
        if (this.value.length) {
          const nowData = JSON.stringify(this.data);
          if (nowData !== this.currentData && this.currentData !== '[]') {
            this.value = getObject(val);
          }
          this.currentData = nowData;
        } else { // if no value, stay quiet
          // if set to auto update, do update the value
        }
      }
      this.$emit('on-shadow-change', getObject(val));
    },

    onfile(event) {
      this.selectedFile = event.target.files[0];
    },

    uploading() {
      const form = new FormData();
      form.append('file', this.selectedFile);
      uploadingImg(form).then((response) => {
        const code = response.code;
        if (code === 200) {
          console.log('图片上传成功');
        }
      }).catch((e) => {
        console.log(e);
      });
    },
  },
  watch: {
    value(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
        this.tempValue = getObject(val);
      }
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
