<template>
  <div class="Text_Desc">
    <div class="General">
      <span>{{GenText}}</span>
    </div>
    <div class="detali">
      <p>
        <span>{{dataText1}}</span>
      </p>
      <p>
        <span>{{dataText2}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    GenText: String,
    dataText1: String,
    dataText2: String,
  },
};
</script>

<style scoped lang="scss">
  *{
    overflow: hidden!important;
  }
  .Text_Desc{
    margin: 1.4ex auto;
    width: 90%;
    .General{
      font-weight: bolder;
      margin: 15px auto;
      font-size: 24px;
      color: #333333;
      span{
        width: auto;
        float: left;
      }
    }
    .detali{
      display: block;
      span{
        color: #666666;
        width: auto;
        font-size: 12px;
        float: left;
        font-weight: lighter;
        margin: 0.01em auto;
      }
    }
  }
</style>
