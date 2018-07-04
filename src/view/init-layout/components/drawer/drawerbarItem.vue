<template>
  <div class="menu-container">
    <template v-for="item in routes">
      <router-link :to="item.path" :key="item.name">
        <el-menu-item :index="item.path">
          <svg-icon icon-class="item.meta.icon"></svg-icon>
          <span slot="title">{{item.meta.title}}}</span>
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
