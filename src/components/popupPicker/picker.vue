<template>
  <div>
    <popup-picker :show="show" :data="list" @on-change='change' @on-hide="hideClick"></popup-picker>
  </div>
</template>

<script>
import { PopupPicker } from 'vux';


export default {
  name: 'mypicker',
  components: {
    PopupPicker,
  },
  props: [
    'list',
    'show',
  ],
  data() {
    return {
    };
  },
  methods: {
    change(value) {
      this.$emit('sureClick', value);
    },
    hideClick(type) {
      if (type === false) {
        this.$emit('cancelClick');
      }
    },
  },
};
</script>
<style lang="scss">
  .picker .scroller-item{
    height: 50px;
    line-height: 50px;
    font-size: 20px;
  }
  .picker .scroller-indicator{
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    background: #e2e2e2;
    opacity: 0.2;
  }
</style>
