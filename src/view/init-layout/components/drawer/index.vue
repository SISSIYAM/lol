<template>
  <el-menu
    mode="vertical"
    :show-timeout="200"
    :default-active="$route.path"
    :collapse="isCollapse"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
  >
    <!--<drawer-bar-item :routes="permission_routers"></drawer-bar-item>-->
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import drawerBarItem from './drawerbarItem';

export default {
  name: '',
  components: { drawerBarItem },
  computed: {
    ...mapGetters(['drawerBar']),
  },
  methods: {
    isCollapse() {
      return !this.drawerBar.opened;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
