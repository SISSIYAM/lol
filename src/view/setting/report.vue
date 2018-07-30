<template>
  <div class="report-container">
    <div class="report-header">
      <title-com :title-mes="title" class="titleCom"></title-com>
    </div>
    <div class="report-main">
      <textarea class="report-textarea" :placeholder="content"> </textarea>
    </div>

    <div class="report-button">
      <button class="submit">提交</button>
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
.submit {
  width: 98%;
  height: 38px;
  color: #fff;
  background-color: #409EFF;
  border: 1px solid #409EFF;
  border-radius: 3px;
}
.report-textarea {
  display: block;
  width:93%;
  height:200px;
  background-color: #dfdfdf;
  border:0;
  resize:none;
  line-height: 3;
}

.report-main {
  margin-top:10px;
  margin-left: 15px;
}
.report-button {
  margin-top: 25px;
  margin-left: 6px;
}
.titleCom {
  font-size:14px;
  text-align: center;
  font-weight:bold;
}
</style>
