<template>
  <div class="wapper">
    <title-com :title-mid="titleMid" id="titleCom"></title-com>
    <div class="input_text">
      <el-input v-model="value" placeholder="请输入新的昵称" class="cover" clearable>
        <template slot="prepend">
          <div class="title1">
            <span>昵称</span>
          </div>
        </template>
      </el-input>
    </div>
    <div class="ButtomUse" @click.prevent="comfirmName">
      <el-button type="primary">保存</el-button>
    </div>
    <!--<div v-transfer-dom>-->
    <!--<confirm v-model="show">-->
    <!--:title="确定更改昵称"-->
    <!--@on-cancel="onCancel"-->
    <!--@on-confirm="onConfirm"-->
    <!--</confirm>-->
    <!--</div>-->
  </div>
</template>

<script>
import titleCom from '../login/components/titleCom';


export default {
  name: 'changePassword',
  components: {
    titleCom,
  },
  data() {
    return {
      value: '',
      titleMid: '重置密码',
    };
  },
  methods: {
    comfirmName() {
      const self = this;
      const name = self.value;
      const Name = {
        name,
      };
      self.$store.dispatch('UpdateUserName', Name).then((response) => {
        if (response.code === 200) {
          self.$vux.toast.show({
            text: '更改成功！',
          });
        } else {
          self.$vux.toast.show({
            text: '更改失败，请稍后再试！',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  *{
    overflow: hidden;
  }
  .wapper{
    font-weight: 600;
    width: 100%;
    height: 100%;
    #titleCom{
      height:44px;
    }
    .input_text{
      width: 90%;
      font-weight: bold;
      color: black;
      font-size: 1.1em;
      margin: 0.8em auto;
    }
    .ButtomUse{
      width: 100%;
      margin-top: 3ex;
      button{
        width: 90%;
        height: 3.5em;
        margin-left: 16px;
      }
    }
    title1 {
      width:15px;
    }
  }
</style>
