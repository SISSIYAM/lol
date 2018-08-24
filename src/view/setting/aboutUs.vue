<template>
  <div class="aboutUs-container">
    <title-com :title-mid="title"></title-com>
    <div class="aboutUs-header">
      <div class="icon">
        <svg-icon icon-class="Youte" class="youte"></svg-icon>
        <p>v{{currentVersion}}</p>
      </div>
    </div>
    <div class="aboutUs-main">
      <group>
        <cell title="联系电话"></cell>
        <cell title="电子邮箱"></cell>
        <cell title="政府及公共事务"></cell>
        <cell title="官方网站"></cell>
        <cell title="广告合作"></cell>
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

<style lang="less" scoped>
.aboutUs {
  width: 50px !important;
  height: 50px !important;
  display: block;
  margin: auto;
}

.aboutUs-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 170px;
  background: #fff;
  font-size: 14px;
  color: #666;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
  .icon {
    .youte {
      width: 80px;
      height: 80px;
    }
    p {
      line-height: 2;
    }
  }
}
.aboutUs-bottom {
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #cccccc;
  font-weight: bold;
}
</style>
