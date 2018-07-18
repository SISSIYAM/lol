<template>
  <div id="wrap">
    <div class="head flex-h flex-hsb flex-vc">
      <div class="head_left_delete" @click="cancelClick"></div>
      <div class="head_center">预定时间</div>
      <div class="head_right_sure" @click="sureClick">确定</div>

    </div>
    <div class="line"></div>
    <div class="select">
      <picker class="picker" :data='timeArray' :columns=2 v-model='currentValue' @on-change='change'></picker>
    </div>
  </div>
</template>

<script>
import { Picker } from 'vux';

export default {
  name: 'bookingTime',
  components: {
    Picker,
  },
  data() {
    return {
      timeArray: [],
      currentValue: [],
      selectHour: '',
      selectMinute: '',
    };
  },
  mounted() {
    // this.setTimeArray();
    this.addValue();
  },
  methods: {
    setTimeArray() {
      this.timeArray = [];
      console.log('iiiii');
      const date = new Date();
      let currentHour = date.getHours(); // 数字类型
      let currentMinutes = date.getMinutes(); // 数字类型
      const count = Math.floor(currentMinutes / 15) + 1; // 数字类型,最大为4，正常范围为：0-3；
      if (count === 4) {
        currentMinutes = 0;
        currentHour += 1;
      } else {
        currentMinutes = count * 15;
      }
      if (currentHour === 24) {
        currentHour = 0;
      }
      // 设置一级关联小时的内容
      const firstObj = {
        name: String(currentHour),
        value: String(currentHour),
        parent: '0',
      };
      const secondObj = {
        name: String(currentHour + 1),
        value: String(currentHour + 1),
        parent: '0',
      };
      const thirdObj = {
        name: String(currentHour + 2),
        value: String(currentHour + 2),
        parent: '0',
      };
      this.timeArray.push(firstObj);
      this.timeArray.push(secondObj);
      this.timeArray.push(thirdObj);
      // 第一个关联数组
      const firstCount = (60 - currentMinutes) / 15;
      for (let i = 0; i < firstCount; i += 1) {
        const obj = {
          name: String(currentMinutes + (i * 15)),
          value: String(currentMinutes + (i * 15)),
          parent: String(currentHour),
        };
        this.timeArray.push(obj);
      }
      // 第二个关联数组

      for (let j = 0; j < 4; j += 1) {
        const obj = {
          name: String(j * 15),
          value: String(j * 15),
          parent: String(currentHour + 1),
        };
        this.timeArray.push(obj);
      }
      // 第三个关联数组

      for (let k = 0; k <= currentMinutes / 15; k += 1) {
        const obj = {
          name: String(k * 15),
          value: String(k * 15),
          parent: String(currentHour + 2),
        };
        this.timeArray.push(obj);
      }
      this.selectHour = currentHour;
      this.selectMinute = currentMinutes;
    },
    // 选择器发生改变时获得选择的时间
    change(v) {
      this.selectHour = v[0];
      this.selectMinute = v[1];
    },
    addValue() {
      const arr = document.getElementsByClassName('scroller-indicator');
      console.log(arr.length);

      console.log(arr);
    },
    // 点击取消按钮
    cancelClick() {
      console.log('点击取消按钮');
      this.$emit('cancelClick');
    },
    // 点击确定按钮
    sureClick() {
      console.log('点击确定按钮');
      // 将时间转换为时间戳
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const endDate = new Date(year, month, day, this.selectHour, this.selectMinute);
      this.$emit('sureClick', endDate);
    },
  },
};
</script>

<style lang="scss">
  @import '../css/flex.css';
  #wrap{
    width: 100vw;
    height: 278px;
    background: white;
    .head {
      width: 100%;
      height: 40px;
      background: white;
    }
    .head_left_delete {
      width: 20px;
      height: 20px;
      background: red;
    }
    .head_center {
      width: 100px;
      text-align: center;
    }
    .line{
      width: calc(100vw - 20px);
      height: 1px;
      background: #E2E2E2;
      margin: 0 auto;
    }
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
  }


</style>
