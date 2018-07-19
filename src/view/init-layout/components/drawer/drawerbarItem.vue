<template>
  <div v-if="!item.hidden" class="menu-container">
      <router-link :to="resolvePath(item.path)" :key="item.name">
        <el-menu-item :index="item.path">
          <svg-icon icon-class="item.meta.icon"></svg-icon>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>
  </div>
</template>

<script>
import path from 'path';

export default {
  name: 'drawerBarItem',
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths);
    },
  },
};
</script>

<style scoped>

</style>
