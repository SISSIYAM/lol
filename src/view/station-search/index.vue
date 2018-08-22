<template>
  <div id="wapper">
    <div class="input_view">
      <div class="input_view_left" v-on:click="goBack">
        <svg-icon icon-class="icon_back" class="icon-back"></svg-icon>
      </div>
      <div id="inputRow">
        <el-input class="myInput" placeholder="请输入内容" v-on:input="getAutoAdText" :clearable='true' ref="input" v-focus></el-input>
      </div>

    </div>
    <div v-show="searchResults.length <= 0" class="tips animated fadeInUp">这里可以增加文字提示，支持地点、公交行政区搜索</div>
    <ul id="repeat-object" class="demo">

      <li v-for="(value, index) in searchResults" v-on:click="selectPlace(value)" :key="index">
        <div class="li_left_icon">
          <svg-icon icon-class="search_black_location"></svg-icon>
        </div>
        <div class="li_content">
          <div class="title">
            {{ value.name }}
          </div>
          <div class="detail">
            {{ value.district }}
          </div>
        </div>
      </li>
    </ul>
    <!--<input id="file" type="file" name="" value="" @change="file">-->
    <!--<input type="button" value="上传" @click="uploadFiles"/>-->
  </div>
</template>

<script>
import MapMethod from '../../utils/map';
import { getUserSearchLog, insertSearchLog } from './../../api/shareStation';
import SearchResults from './searchResults';
import { uploadImage } from '../../api/userDetails';

export default {
  name: 'stationSearch',
  props: {},
  data() {
    return {
      historyList: [],
      searchList: [],
      searchResults: [],
      file1: '',
    };
  },
  mounted() {
    this.getHistoryList();
    this.$refs.input.focus();
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    // file(event) {
    //   this.file1 = event.target.files[0];
    // },
    // uploadFiles() {
    //   // const fileObj = document.getElementById('file').files[0];
    //   // console.log(fileObj);
    //   // const typeStr="image/jpg,image/png,image/gif,image/jpeg";
    //   const file2 = this.file1;
    //   const form = new FormData();
    //   // 可以增加表单数据
    //   form.append("file", file2);         // 文件对象
    //   uploadImage(form).then((response) => {
    //     console.log(response);
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // },
    getHistoryList() {
      const myThis = this;
      getUserSearchLog(0)
        .then((response) => {
          console.log(response);
          if (response.data.code === 200) {
            myThis.historyList = response.data.data;
            myThis.historyList.forEach((obj) => {
              obj.name = obj.value;
              obj.district = obj.address;
              obj.location = {
                lat: obj.latitude,
                lng: obj.longitude,
              };
            });
            myThis.searchResults = myThis.historyList;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAutoAdText(ev) {
      console.log(ev);
      const myThis = this;
      if (ev.length > 0) {
        MapMethod.getSearchResults('珠海', ev, (value) => {
          console.log(value);
          myThis.searchList = value;
          myThis.searchResults = value;
        });
      } else {
        myThis.searchResults = myThis.historyList;
      }
    },
    selectPlace(obj) {
      console.log(obj);
      // 存储搜索结果
      SearchResults.isSearching = true;
      SearchResults.searchLocation = {
        lng: String(obj.location.lng),
        lat: String(obj.location.lat),
        des: obj.name,
      };
      if (this.$route.params.searchType === 0) {
        SearchResults.beginLocation = {
          lng: String(obj.location.lng),
          lat: String(obj.location.lat),
          des: obj.name,
        };
      } else if (this.$route.params.searchType === 1) {
        SearchResults.endLocation = {
          lng: String(obj.location.lng),
          lat: String(obj.location.lat),
          des: obj.name,
        };
      }
      this.goBack();
      this.insertSearchLog(obj);
    },
    insertSearchLog(obj) {
      // 上传数据
      console.log(obj);
      insertSearchLog(
        obj.district,
        obj.name,
        obj.location.lng,
        obj.location.lat,
      )
        .then((response) => {
          console.log(response);
          if (response.data.code === 200) {
            console.log('写入用户搜索记录成功');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goBack() {
      console.log('searchtype');
      console.log(this.$route.params);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/_animate.scss";

#wapper {
  width: 100%;
  height: 100vh;
  background: #efefef;
  .input_view {
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    background: white;
    width: calc(100%);
    height: 40px;
    margin: 0 auto;
    margin-bottom: 10px;
    overflow: hidden;
    .input_view_left {
      width: 30px;
      height: 40px;
      /*background: red;*/
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      .icon-back {
        width: 22px;
        height: 22px;
      }
    }
    #inputRow {
      display: flex;
      justify-content: left;
      width: calc(100vw - 80px);
      /*height: 40px;*/
      font-size: 16px;
      /*outline:none;*/
      /*outline-offset: none;*/
      float: left;
      /*margin-left: 20px;*/
    }
  }
  .myInput .el-input__inner {
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    font-size: 16px !important;
  }
  .tips {
    display: table-cell;
    padding: 20px;
    height: 300px;
    width: 100vw;
    vertical-align: middle;
    text-align: center;
    color: #606266;
    font-size: 14px;
  }
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
    background: white;
  }
  li {
    width: 100%;
    height: 80px;
    position: relative;
    display: flex;
    align-items: center;
    .li_left_icon {
      width: 20px;
      height: 20px;
      /*background: red;*/
      margin-left: 20px;
    }
    .li_content {
      margin-left: 20px;
      height: 80px;
      width: 100%;
      box-sizing: border-box;
      .title {
        margin-top: 20px;
        font-size: 14px;
        line-height: 2;
        font-weight: 800;
        color: #333333;
      }
      .detail {
        font-size: 12px;
        color: #999999;
      }
    }
    &:not(:last-child) .li_content {
      border-bottom: 1px solid #dfdfdf;
    }
  }
}
</style>
