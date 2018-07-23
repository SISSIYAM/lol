<template>
  <div id="wapper">
		<div class="title">
			<img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
      <p class="titleName">{{titleName}}</p>
    </div>
    <div class='row'>
      <div class="number" @click.prevent="value = 100">
        <el-button type="normal">100元</el-button>
      </div>
      <div class="number" @click.prevent="value = 50">
        <el-button type="normal">50元</el-button>
      </div>
    </div>
    <div class='row'>
      <div class="number" @click.prevent="value = 20">
        <el-button type="normal">20元</el-button>
      </div>
      <div class="number" @click.prevent="value = 5">
        <el-button type="normal">5元</el-button>
      </div>
    </div>
    <p class="txt2">支付方式</p>
    <div class="line"></div>
    <div class="payDiv">
      <img class="smallIcon" src="../../../static/images/alipay.png">
      <p class="txt5">支付宝付</p>
      <input class="rightArrow_aliPay" type="radio" id="alipay" name="payStyle" checked="aliSelect" @click="selectAliPay"><br>
    </div>
    <div class="line"></div>
    <div class="payDiv">
      <img class="smallIcon" src="../../../static/images/wechat.png">
      <p class="txt5">微信付款</p>
      <input class="rightArrow_weChat" type="radio" id="wechat" name="payStyle" checked="wxSelect" @click="selectWXPay"><br>
    </div>

    <div class="submit" @click.prevent="crofirmNumber">
      <p class="txt6" style="margin-bottom: 20px;">点击充值即表示同意《充值协议》</p>
      <el-button type="primary">充值</el-button>
    </div>
  </div>
</template>

<script>
	
import ShareBikeApi from '../../utils/sharebikeCordovaApi'
import {aliPay , wxPay} from '../../api/payAndTrade'

export default {
	name: "",
	data() {
		return {
			value: 5,
			titleName: "充值",
			aliSelect: 'true',
			wxSelect: 'false',
			payStyle: "支付宝"
		}
	},
	methods: {
		
		selectAliPay () {
			this.aliSelect = true;
			this.wxSelect = false;
			console.log("nowButtonStatus:"+this.aliSelect+this.wxSelect)
		},
		
		selectWXPay () {
			this.wxSelect = true;
			this.aliSelect = false;
			console.log("nowButtonStatus:"+this.aliSelect+this.wxSelect)
		},
		
		crofirmNumber: function () {
			if(!this.value) {
				this.$vux.confirm.show({
					title:"提示",
					content:"请选择金额",
					theme:"ios"
				})
				} else {
				if (document.getElementById("alipay").checked) {
					this.payStyle = "支付宝"
				}
				if (document.getElementById("wechat").checked) {
					this.payStyle = "微信"
				}
				this.showComfir("提示信息", "确定使用" + this.payStyle + "充值" + this.value + "吗?")
			}
		},
	
		showComfir: function (title, content) {
			let _this = this;
			//  弹出框
			this.$vux.confirm.show({
				title: title,
				content: content,
				theme: "ios",
				confirmText: "确认充值",
				// 组件除show外的属性
				onCancel() {
					console.log("已经取消") // 当前 vm
				},
				onConfirm() {
					if(_this.payStyle == "支付宝") {
						_this.alipaySign();
					} else if(_this.payStyle == "微信") {
						_this.wxpaySign();
					}
				}
			})
		},
		
		//alipay支付
		alipaySign:function () {
			  aliPay({
				body:"用户充值",
				subject:"用户充值",
				timeoutExpress:"1h",
				totalAmount:this.value,
				productCode:"alipayutbike"
				})
				.then(function (response) {
					console.log(response);
					if (response.data.code == 200) {
						alipay();
					} else {

					}

				}).catch(function (error) {
				// _this.VUETOOLS.totalShow("支付宝验证失败", "", _this);
			});
		},
		
		//微信支付
		wxpaySign:function () {
			console.log("开始微信支付");
			var money = this.value * 100;
			wxPay({
				body:"用户充值",
				total_fee:money,
				trade_type:"APP"
			}).then(function (response) {
				console.log("微信支付结果 : " + response);
				if(response.data.code == 200) {
					wxpay(response.data.data);
				}
			})
		}
		
	}
}
</script>

<style scoped lang="scss">

  * {
    overflow: hidden;
  }
	/*********标题栏  *********/
	  .title {
	    padding-top: 20px;
	    height: 44px;
	    line-height: 44px;
	    width: 100%;
	    background-color: #f1f1f161;
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	    position: relative;
	  }
	
	  .titleName {
	    line-height: 64px;
	    position: absolute;
	    text-align: center;
	    left: 0;
	    right: 0;
	    margin: 0px;
	    font-size: 18px;
	    color: black;
	    vertical-align: middle;
	    /* font-family: PingFangBold; */
	  }
	
	  .leftIcon {
	    line-height: 44px;
	    position: absolute;
	    left: 20px;
	    width: 24px;
	    height: 24px;
	    z-index: 9;
	  }
	
	  /*********标题栏 the end *********/
  #wapper {
		/**
		 * font-family: "Ping SC Regular";
		 */
    font-weight: 600;
    width: 100%;
    height: 100%;
    #titleCom {
      height: 8%;
    }
    .input_text {
      width: 90%;
      font-weight: bold;
      color: black;
      font-size: 1.1em;
      margin: 0.8em auto;
    }
    .number {
      width: 90%;
      margin: 1ex;
      button {
        width: 100%;
        height: 3.5em;
      }
    }
    .submit {
      width: 90%;
      margin: 2ex;
      position: absolute;
      bottom: 10px;
      button {
        width: 100%;
        height: 3.5em;
      }
    }
  }

  .row {
    display: flex;
  }

  .line {
    background-color: #dfdfdf;
    height: 1px;
    width: 100%;
    opacity: 0.4;
    margin-left: 20px;
  }

  .rightArrow_aliPay {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
  }

  .rightArrow_weChat {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
  }

  .payDiv {
    margin: 10px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }

  .smallIcon {
    margin-left: 10px;
    width: 22px;
    height: 22px;
  }

  .txt5 {
    margin-left: 10px;
    font-size: 16px;
    color: #333333;
  }

  .txt2 {
    margin: 2px 15px;
    font-size: 13px;
    color: #333333;
  }

  .txt6 {
    margin-top: 30%;
    font-size: 13px;
    color: #333333;
  }
</style>
