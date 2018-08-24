<template>
  <div class="nodataTips">
    <img :src="img">
    <p class="title"> {{title}}</p>
    <p class="desc" v-if="desc">{{desc}}</p>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      default: 'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/77bf605c74a24318b7ecd1c9f4b6a155.png',
    },
    title: {
      default: '暂无数据',
    },
    desc: {},
  },
};
</script>

<style lang="less" scoped>
.nodataTips {
  margin-top: 26.666667vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    display: block;
    // width: 5.333333rem;
    // width: 53.333333vw;
    max-width: 100%;
  }
  .title {
    margin: 20px 0 10px;
    color: #666;
    font-size: 14px;
  }
  .desc {
    color: #999;
    font-size: 12px;
  }
}
</style>
