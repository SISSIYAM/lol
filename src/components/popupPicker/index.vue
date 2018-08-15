<template>
  <div v-transfer-dom="isTransferDom">
    <popup
      v-model="showValue"
      class="vux-popup-picker"
      :id="`vux-popup-picker-${uuid}`"
      @on-hide="onPopupHide"
      @on-show="onPopupShow"
      :popup-style="popupStyle">
      <div class="vux-popup-picker-container">
        <popup-header
          :left-text="cancelText || $t('cancel_text')"
          :right-text="confirmText || $t('confirm_text')"
          @on-click-left="onHide(false)"
          @on-click-right="onHide(true)"
          :title="popupTitle"></popup-header>
        <picker
          :data="data"
          v-model="tempValue"
          @on-change="onPickerChange"
          :columns="columns"
          :fixed-columns="fixedColumns"
          :container="'#vux-popup-picker-'+uuid"
          :column-width="columnWidth"></picker>
      </div>
    </popup>
  </div>
</template>

<script>
import { Popup, Picker } from 'vux';

export default {
  name: 'index',
  components: {
    Popup,
    Picker,
  },
};
</script>

<style scoped>

</style>
