<template>
	<div>
		<header class="header">
			<i class="el-icon-edit-outline"></i>
			<span>修改手机号</span>
		</header>
		<div class="step">
			<MySteps :active="active" :stepInfo="stepInfo" />
		</div>
		<section class="step-body">
			<div class="hint-info">
				<span>手机号码:</span>
				<span>{{telDeal}}</span>
			</div>
			<p class="hint-help">若当前手机号码无法接受验证码，请拨打****人工服务</p>
			<div class="get-authcode">
				<MyInput
					placeholder="请输入短信验证码"
					lable="code"
					v-model="code"
					:required="true"
					@inputStatus="(status)=>{codeStatus = status}"
					:upStatus="nextOneStatus"
				/>
				<div class="get-authcode__but">
					<Mybutton :authCode="true" @clickTo="getAuthCode" />
				</div>
			</div>
			<Mybutton class="next-but" @clickTo="nextStep" title="下一步" :disabled="!codeStatus" />
		</section>
	</div>
</template>

<script>
	import MySteps from "@/components/MySteps";
	import { mapGetters } from "vuex";
	import { editAuthCode, updateUserInfo } from "@/api/user";
	export default {
		data() {
			let active = 0;
			let stepInfo = [
				{
					title: "01",
					description: "验证身份"
				},
				{
					title: "02",
					description: "更换手机号"
				},
				{
					title: "03",
					description: "完成"
				}
			];
			return {
				active,
				stepInfo,
				code: null,
				codeStatus: false,  // 
				nextOneStatus: true,
				serverCode: null,
				hintMsg: {duration: 1500, title: "验证码"}
			};
		},
		components: {
			MySteps,
		},
		computed: {
			...mapGetters(["telDeal", "tel"])
		},
		methods: {
			nextStep() {
				if(this.code === this.serverCode && this.codeStatus){
					this.nextOneStatus = this.codeStatus;
					this.active++
				}
			},
			getAuthCode() {
				editAuthCode({ telephone: this.tel, noLoading: true }).then(res => {
					if(res.status){
						this.serverCode = res.data;
					} else {
						this.$notify.error({...this.hintMsg, message: res.msg})
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
$hoverColor: #00bfc8;
$fontLightColor: #3dbcc6;
$bacHoerClr: #3dbcc6;
$NoHover: #999999;
$checkFontColor: #636b74;
$noCheckFontColor: #dadce0;
.header {
	padding-bottom: 3rem;
	font-size: 1.8rem;
	line-height: 2.1rem;
	border-bottom: 1px solid #f1f1f1;
	color: #333;
	span {
		margin-left: 15px;
	}
}
.step {
	margin-top: 5rem;
	&-body {
		margin: 5rem auto 0;
		width: 40rem;
	}
}
.next-but {
	margin-top: 2rem;
}
.hint-info {
	color: #666;
	font-size: 1.5rem;
	span:first-of-type {
		margin-right: 10px;
	}
	margin-bottom: 2rem;
}
.hint-help {
	color: $noCheckFontColor;
	font-size: 1.4rem;
	margin-bottom: 2rem;
}
.get-authcode {
	display: flex;
	justify-content: space-between;
	&__but {
		width: 150px;
		margin-top: 1rem;
	}
}
</style>