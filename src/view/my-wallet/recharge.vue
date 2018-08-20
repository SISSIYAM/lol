<template>
  <div id="wapper">
		<div class="title">
			<img class="leftIcon" src="../../../static/images/icon_back.png" v-on:click="backPrePage"/>
      <p class="titleName">{{titleName}}</p>
    </div>
    <div class='recharge_row'>
      <div class="number" @click.prevent="value = 100; type1 = 'primary';type2= 'normal' ;type3 = 'normal' ;type4 = 'normal' ;">
        <el-button v-bind:type="type1">100元</el-button>
      </div>
      <div class="number" @click.prevent="value = 50; type1 = 'normal' ;type2= 'primary' ;type3 = 'normal' ;type4 = 'normal' ">
        <el-button v-bind:type="type2">50元</el-button>
      </div>
    </div>
    <div class='recharge_row'>
      <div class="number" @click.prevent="value = 20; type1 = 'normal' ;type2 = 'normal' ;type3 = 'primary' ;type4 = 'normal'">
        <el-button v-bind:type="type3">20元</el-button>
      </div>
      <div class="number" @click.prevent="value = 5; type1 = 'normal' ;type2 = 'normal' ;type3 = 'normal' ;type4 = 'primary'">
        <el-button v-bind:type="type4">5元</el-button>
      </div>
    </div>
    <p class="txt2">支付方式</p>
    <div class="line"></div>
		<div class="payDiv" @click="selectWXPay">
			<img class="smallIcon" src="../../../static/images/wechat.png">
			<p class="txt5">微信付款</p>
			<input class="rightArrow_weChat" type="radio" id="wechat" name="payStyle" checked=true><br>
		</div>
  
    <div class="line"></div>
  
		<div class="payDiv"  @click="selectAliPay">
			<img class="smallIcon" src="../../../static/images/alipay.png">
			<p class="txt5">支付宝付</p>
			<input class="rightArrow_aliPay" type="radio" id="alipay" name="payStyle"><br>
		</div>
	
    <div class="submit">
			<div class="explainDiv">
				<p class="explain_tex">点击充值即表示同意</p>
				<a class="explain_button" href="javascript:" @click="window.open('http;//www.baidu.com')">充值协议</a>
			</div>
      <el-button type="primary" @click.prevent="crofirmNumber">充值</el-button>
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
			type1: "normal",
			type2: "normal",
			type3: "normal",
			type4: "normal",
			value: 0,
			titleName: "充值",
			aliSelect: false,
			wxSelect: true,
			payStyle: "支付宝"
		}
	},
	
	methods: {

		// 返回
		backPrePage: function () {
			this.$router.go(-1);
		},
		
		selectAliPay () {
			document.getElementById("alipay").checked= true;
			this.aliSelect = true;
			this.wxSelect = false;
			console.log("nowButtonStatus:wx:"+this.wxSelect+":ali:"+this.aliSelect)
		},
		
		selectWXPay () {
			document.getElementById("wechat").checked= true;
			this.wxSelect = true;
			this.aliSelect = false;
			console.log("nowButtonStatus:wx:"+this.wxSelect+":ali:"+this.aliSelect)
		},
		
		crofirmNumber: function () {
			if(this.value === 0){
				this.showPlugin("提示","充值金额不能为0");
				return;
			} else {
				if (document.getElementById("alipay").checked) {
					this.payStyle = "支付宝"
				}
				if (document.getElementById("wechat").checked) {
					this.payStyle = "微信"
				}
				// this.showComfir("提示信息", "确定使用" + this.payStyle + "充值" + this.value + "吗?")
				this.showPayPlugin("提示信息","确定使用" + this.payStyle + "充值" + this.value + "吗?")
			}
		},
		
		//alipay支付
		alipaySign () {
			console.log("开始阿里支付");
			var money = this.value * 100;
			aliPay("用户充值","用户充值","1h",money,"alipayutbike").then(function (response) {
				console.log("阿里支付结果 :"+response);
				if (response.data.code == 200) {
					 ShareBikeApi.alipay();
					} else {

					}

				}).catch(function (error) {
				 this.showPlugin("支付宝验证失败", _this);
			});
		},
		
		//微信支付
		wxpaySign () {
			console.log("开始微信支付");
			var money = this.value * 100;
			wxPay("用户充值",money,"APP").then(function (response) {
				console.log("微信支付结果 : " + response);
				if(response.data.code == 200) {
          ShareBikeApi.wxpay(response.data.data);
 				}
			})
		},
		
		// 提示框
		showPlugin (title , content) {
			this.$vux.alert.show({
				title: title,
				content: content,
				onShow () {
					console.log('显示的时候触发的事件');
				},
				onHide () {
					console.log('点击确定按钮后触发');
				}
			});
		},
		
		// 提示框
		showPayPlugin (title , content) {
			var _this = this;
			this.$vux.alert.show({
				title: title,
				content: content,
				onShow () {
				},
				onHide () {
					if(_this.wxSelect) {
						_this.wxpaySign();
					} else {
						_this.alipaySign();	
					}
				}
			});
		},
		
	}
}
</script>

<style scoped lang="scss">

  * {
    overflow: hidden;
  }
	/*********标题栏  *********/
	.title {
		padding-top: 5px;
		height: 44px;
		line-height: 44px;
		width: 100%;
		background-color: white;
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

  .recharge_row {
    display: flex;
		background-color: white;
  }

  .line {
    background-color: white;
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
	
	.explainDiv{
		margin: 5px;
		display: flex;
		flex-direction: row;
		position: relative;
		margin-left: 30%;
	}
	.explain_tex{
		font-size: 10px;
		color: #D3D3D3;
	}
	.explain_button{
		font-size: 10px;
		color: #66B1FF;
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
    color: #D3D3D3;
  }

  .txt6 {
    margin-top: 30%;
    font-size: 13px;
    color: #333333;
  }
</style>
