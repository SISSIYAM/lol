<template>
  <div v-transfer-dom="isTransferDom">
    <popup
      v-model="showValue"
      class="vux-popup-picker"
      @on-hide="onPopupHide"
      @on-show="onPopupShow"
      :popup-style="popupStyle">
      <div class="vux-popup-picker-container">
        <popup-header
          class="vux-popup-picker-header"
          left-text="取消"
          right-text="确定"
          @on-click-left="onHide(false)"
          @on-click-right="onHide(true)"
          :title="popupTitle"></popup-header>
        <picker
          :data="data"
          v-model="tempValue"
          @on-change="onPickerChange"
          :columns="columns"
          :fixed-columns="fixedColumns"
          :column-width="columnWidth"></picker>
      </div>
    </popup>
  </div>
</template>

<script>
import { Popup, Picker, TransferDom, PopupHeader } from 'vux';

export default {
  name: 'index',
  directives: {
    TransferDom,
  },
  components: {
    Popup,
    Picker,
    PopupHeader,
    TransferDom,
  },
  props: {
    fixedColumns: {
      type: Number,
      default: 0,
    },
    popupTitle: String,
  },
  data() {
    return {
      showValue: false,
    };
  },
  methods: {

  },
};
</script>

<style scoped>
  .vux-popup-picker-header {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    background-color: #fbf9fe;
  }
</style>
