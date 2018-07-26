<template>
  <div id="wapper">
    <title-com :title-mid="titleMid" id="titleCom"></title-com>
    <div class="input_text">
      <el-input v-model="value" placeholder="请输入新的昵称" clearable>
        <template slot="prepend">
          <div style="width: 35px;">
            <span style="color: black;">昵称</span>
          </div>
        </template>
      </el-input>
    </div>
    <div class="ButtomUse" @click.prevent="comfirmName">
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import titleCom from '../login/components/titleCom';

export default {
  name: 'changeName',
  components: {
    titleCom,
  },
  data() {
    return {
      value: '',
      titleMid: '修改昵称',
    };
  },
  mounted() {
    if (this.$route.params.oldName) {
      this.value = this.$route.params.oldName;
    }
  },
  methods: {
    comfirmName() {
      this.showComfir('提示信息', `确定将昵称改为${this.value}吗`);
    },
    showComfir(title, content) {
      //  弹出框
      this.$vux.confirm.show({
        title,
        content,
        theme: 'ios',
        confirmText: '确认修改',
        // 组件除show外的属性
        onCancel() {
          console.log('已经取消'); // 当前 vm
        },
        onComfirm() {

        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  *{
    overflow: hidden;
  }
  #wapper{
    font-family: "Ping SC Regular";
    font-weight: 600;
    width: 100%;
    height: 100%;
    #titleCom{
      height: 8%;
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
  }
</style>
