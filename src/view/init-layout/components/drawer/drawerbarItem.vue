<template>
  <div class="menu-container">
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <router-link :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <svg-icon icon-class="item.children[0].meta.icon"></svg-icon>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'drawerBarItem',
  props: {
    routes: {
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>
