<template>
  <div class="aboutUs-container">
    <title-com :title-mes="title" class="titleCom"></title-com>
    <div class="aboutUs-header">
      <svg-icon icon-class="Youte" class="aboutUs"></svg-icon>
      <p> v{{currentVersion}}</p>
    </div>
    <div class="aboutUs-main">
      <group>
        <cell title="联系电话" class="cell-label"></cell>
        <cell title="电子邮箱" class="cell-label"></cell>
        <cell title="政府及公共事务" class="cell-label"></cell>
        <cell title="官方网站" class="cell-label"></cell>
        <cell title="广告合作"  class="cell-label"></cell>
      </group>
    </div>
    <div class="aboutUs-bottom">
      <p>珠海优特物联科技有限公司</p>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux';
import { titleCom } from '../login/components';

export default {
  name: 'aboutUs',
  components: {
    titleCom,
    Group,
    Cell,
  },
  data() {
    return {
      title: '关于我们',
      currentVersion: '1.0.1',
    };
  },
};
</script>

<style scoped>
  .aboutUs {
    width:50px !important;
    height:50px !important;
    display:block;
    margin: auto;
  }
  .titleCom{
    margin-top: 0px;
    font-weight: 500;
    margin-right: 20px;
  }
  .cell-label {
    font-size: 13px;
  }
  .aboutUs-header p {
    font-size: 12px;
    color:#ccc;
    font-weight:bold;
    text-align: center;
  }
  .aboutUs-bottom {
  }
  .aboutUs-bottom p {
    font-size: 12px;
    color: #cccccc;
    font-weight:bold;
    text-align: center;
    margin-top: 60%;
  }
</style>
