<template>
  <div id="wapper">
  <div class="input_view">
    <div class="input_view_left" v-on:click="goBack">
      <svg-icon icon-class="icon_back" class="icon-back"></svg-icon>
    </div>
    <div id="inputRow">
      <el-input class="myInput" placeholder="请输入内容" v-on:input="getAutoAdText" :clearable='true'></el-input>
    </div>

  </div>
  <ul id="repeat-object" class="demo">

    <li v-for="value in searchResults" v-on:click="selectPlace(value)">
      <div class="li_left_icon">

      </div>
      <div class="li_content">
        <div class="title">
          {{ value.name }}
        </div>
        <div class="detail">
          {{ value.district }}
        </div>

      </div>
      <div class="line"></div>

    </li>
  </ul>
  </div>
</template>

<script>
import MapMethod from '../../utils/map';
import { getUserSearchLog, insertSearchLog } from './../../api/shareStation';
import SearchResults from './searchResults';


export default {
  name: 'stationSearch',
  data() {
    return {
      historyList: [],
      searchList: [],
      searchResults: [],
    };
  },
  mounted() {
    this.getHistoryList();
  },
  methods: {
    getHistoryList() {
      const myThis = this;
      getUserSearchLog(0).then((response) => {
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
      }).catch((error) => {
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
      // 存储搜索结果
      SearchResults.isSearching = true;
      SearchResults.searchLocation = {
        lng: obj.location.lng,
        lat: obj.location.lat,
        des: obj.name,
      };
      this.goBack();
      this.insertSearchLog(obj);
    },
    insertSearchLog(obj) {
      //上传数据
      console.log(obj);
      insertSearchLog(obj.district, obj.name, obj.location.lng, obj.location.lat).then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          console.log('写入用户搜索记录成功');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
  #wapper {
    width: 100%;
    height: 100vh;
    background: #EFEFEF;
    .input_view{
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
    .myInput .el-input__inner{
      border: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 0;
      -moz-border-radius: 0;
      -webkit-border-radius: 0;
    }

    ul,li {
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
        background: red;
        margin-left: 20px;
      }
      .title, .detail {
        text-align: left;
        margin-left: 20px;
      }
      .title {
        font-size: 20px;
        font-weight: 800;
      }
      .detail {
        font-size: 16px;
        color: gray;
      }
      .line {
        width: calc(100% - 40px);
        margin-left: 20px;
        height: 0.8px;
        background: lightgray;
        position: absolute;
        bottom: 0;
      }
    }
  }

</style>
