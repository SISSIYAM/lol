<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <div class="header header-fixed ">
        <div class="header-left" v-on:click="backPrePage">
          <svg-icon icon-class="icon_back" class="arrow"></svg-icon>
        </div>
        <div class="title">{{titleName}}</div>
      </div>
    </div>
    <div class="upload-wrapper">
      <div class="header">
        <span class="icon">
          <svg-icon icon-class="icon_images"></svg-icon>
        </span>
        <span>上传车辆照片
          <span class="tips">(最多4张，共享单车请附带二维码照片)</span>
        </span>
      </div>
      <div class="upload">
        <ul class="weui-uploader__files">
          <li class="weui-uploader__file" :style="{backgroundImage: `url(${item.url})`}" v-for="(item, index) in imgList" :key="index">
            <a class="dele" @click="removeImg(index)">
              <icon type="clear"></icon>
            </a>
          </li>
          <!-- TODO:上传反馈 -->
          <!-- <li class="weui-uploader__file" :class="{'weui-uploader__file_status': true}" :style="{backgroundImage: 'url(https://weui.io/images/pic_160.png)'}">
                    <div class="weui-uploader__file-content">50%</div>
                </li> -->
        </ul>
        <div class="weui-uploader__input-box" v-show="imgList.length < 4">
          <input class="weui-uploader__input" type="file" accept="image/*" multiple="false" @change="uploadImg">
        </div>
      </div>
    </div>
    <div class="location">
      <x-input v-model="description" class="get">
        <span slot="label" style="padding-right:10px;display:block;" width="24" height="24">
          <svg-icon icon-class="icon_location"></svg-icon>
        </span>
        <span slot="right" style="font-size:8px;">></span>
      </x-input>
    </div>
    <div class="handle">
      <x-button type="primary" :disabled="disabled">上传</x-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleName: '违停举报',
      type: 0,
      longitude: '',
      latitude: '',
      description: '默认还没地址',
      imgList: [],
      disabled: true,
    };
  },
  methods: {
    // 返回按钮
    backPrePage() {
      this.$router.go(-1);
    },
    uploadImg(e) {
      const MAX = 4;
      const now = this.imgList.length;
      const add = e.target.files.length;
      // TODO:超过四张只保留前四张
      if (now + add <= MAX) {
        let src;
        const url = window.URL || window.webkitURL || window.mozURL;
        const files = e.target.files;
        for (let i = 0, len = files.length; i < len; i++) {
          const file = files[i];
          if (url) {
            src = url.createObjectURL(file);
          } else {
            src = e.target.result;
          }
          this.imgList.push({ url: src });
        }
      } else {
        this.$vux.alert.show({
          title: '数量超出限制',
          content: '您最多可以上传4张车辆照片',
        });
      }
    },
    removeImg(i) {
      this.imgList.splice(i, 1);
    },
  },
  watch: {
    imgList() {
      if (this.imgList.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/header.less";

.upload-wrapper {
  padding: 20px;
  background-color: #fff;
  .header {
    margin-bottom: 30px;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    .icon {
      width: 16px;
      height: 16px;
      padding-right: 10px;
    }
    .tips {
      font-size: 10px;
      color: #ff3b30;
    }
  }
  .upload {
    overflow: hidden;
    .weui-uploader__files {
      list-style: none;
    }
    .weui-uploader__file {
      position: relative;
      float: left;
      margin-right: 9px;
      margin-bottom: 9px;
      width: 79px;
      height: 79px;
      background: no-repeat center center;
      background-size: cover;
      .dele {
        display: block;
        position: absolute;
        top: 0px;
        right: 0px;
        height: 16px;
        width: 16px;
        line-height: 0;
        i {
          color: #ff3b30;
        }
      }
    }
    .weui-uploader__file_status {
      &::before {
        content: " ";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
      .weui-uploader__file-content {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        color: #ffffff;
      }
    }
    .weui-uploader__input-box {
      float: left;
      position: relative;
      margin-right: 9px;
      margin-bottom: 9px;
      width: 77px;
      height: 77px;
      border: 1px solid #d9d9d9;
      &:before {
        width: 2px;
        height: 39.5px;
      }
      &:after {
        width: 39.5px;
        height: 2px;
      }
      &:before,
      &:after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #d9d9d9;
      }
      .weui-uploader__input {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
  }
}
.location {
  margin-top: 10px;
  font-size: 14px;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  .get {
    background: #fff;
  }
}
.handle {
  margin: 30px 10px;
}
</style>
