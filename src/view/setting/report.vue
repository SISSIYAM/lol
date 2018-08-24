<template>
  <div class="report-container">
    <title-com :title-mid="title"></title-com>
    <div class="report-main">
      <textarea class="report-textarea" :placeholder="content"> </textarea>
    </div>

    <div class="report-button">
      <x-button type="primary">提交</x-button>
    </div>
  </div>
</template>

<script>
import { titleCom } from '../login/components';

export default {
  name: 'report',
  components: {
    titleCom,
  },
  data() {
    return {
      title: '意见反馈',
      content: '我要吐槽或者建议',
    };
  },
};
</script>

<style scoped>
.report-button {
  margin: 20px 10px 0;
}
.report-textarea {
  box-sizing:border-box;
  padding:10px;
  display: block;
  width: 100%;
  height: 200px;
  background-color: #dfdfdf;
  border: 0;
  resize: none;
  line-height: 1.6;
}

.report-main {
  margin: 10px;
}
</style>
