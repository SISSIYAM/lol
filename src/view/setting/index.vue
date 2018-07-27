<template>
  <div class="setting-container">
    <div class="setting-header">
      <title-com :title-mes="title" class="titleCom"></title-com>
      <text-desc :GenText="getText" :detaText1="detaText1" :detaText2="detaText2"></text-desc>
    </div>
    <div class="setting-main">
      <group>
        <cell></cell>
        <cell></cell>
        <cell></cell>
        <cell></cell>
      </group>
      <group>
        <cell></cell>
        <cell></cell>
      </group>
      <div class="setting-button">
        <el-button></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, Group } from 'vux';
import { titleCom, textDesc } from '../login/components';

export default {
  name: 'setting',
  components: {
    titleCom,
    textDesc,
    Cell,
    Group,
  },
};
</script>

<style scoped>

</style>
