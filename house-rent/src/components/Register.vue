<template>
	<section class="login-from">
		<div class="login-from__left"></div>
		<div class="login-from__right">
			<div class="form">
				<h2 class="form__title">注册</h2>
				<MyInput
					lable="userName"
					v-model="userName"
					:regStr="userNameRex"
					:required="true"
					placeholder="账号手机号"
					@inputStatus="(status)=>{userNameStatus = status}"
					:upStatus='loginStatus'
				/>
				<MyInput @inputStatus="(status)=>{pwdStatus = status}" :upStatus='loginStatus' lable="pwd" v-model="pwd" placeholder="密码" :required="true" type="password" />
				<div ref="formBut" class="form__but" @mousedown="addWrap" @mouseup="delWrap">
					<span>注册</span>
					<div class="wrap-box">
						<div v-if="wrapDown" :style="wrapStyle" :class="['wrap',wrapDown?'wrap--one':'']"></div>
						<div v-if="wrapDown" :style="wrapStyle" :class="['wrap',wrapDown?'wrap--two':'']"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import MyInput from "./MyInput";
	import SlidVal from './SlidVal';
	export default {
		name: "register",
		data() {
			let userNameRex = {
				reg: /^1[3456789]\d{9}/,
				hint: "手机号码格式不正确"
			};
			let wrapStyle = {},
				wrapDown = false;
			return {
				userName: null,
				userNameStatus: false,
				pwd: null,
				pwdStatus: false,
				userNameRex, 
				wrapStyle,  // 按钮动态样式
				wrapDown,  // 登录按钮按下
				slidStatus: false,
				loginStatus: true
			};
		},
		components: {
			MyInput,
			SlidVal
		},
		methods: {
			// 登录按钮按下
			addWrap(e) {
				this.wrapDown = true;
				this.loginStatus = this.userNameStatus && this.pwdStatus && this.slidStatus;
				let percent =
					(
						e.offsetX /
						parseInt(getComputedStyle(this.$refs.formBut).width)
					).toFixed(2) *
						100 +
					"%";
				this.wrapStyle = {
					left: percent,
					transform: `translateX(-${percent})`
				};
				if(this.loginStatus){
					this.loginTo()
				}
			},
			// 去除登录按钮样式
			delWrap() {
				this.wrapDown = false;
				this.wrapStyle = {};
			},
			loginTo(){
				console.log('登录');
			}
		}
	};
</script>

<style lang="scss" scoped>
.login-from {
	width: 100rem;
	height: 56rem;
	display: flex;
	border-radius: 0.8rem;
	overflow: hidden;
	box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1),
		0 16px 24px 2px rgba(0, 0, 0, 0.05);
	&__left {
		flex-shrink: 0;
		width: 44rem;
		background-color: skyblue;
	}
	&__right {
		flex-grow: 1;
		box-sizing: border-box;
	}
}
.form {
	width: 33rem;
	margin: 0 auto;
	&__title {
		font-size: 3.6rem;
		font-weight: bolder;
		color: #2878ff;
		margin: 81px 0 60px 0;
		text-align: center;
	}
	&__but {
		background-color: #246ce5;
		color: #fff;
		font-weight: bolder;
		border-radius: 0.4rem;
		height: 4rem;
		text-align: center;
		line-height: 4rem;
		position: relative;
		cursor: pointer;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
			0 1px 4px rgba(0, 0, 0, 0.117647);
		&:active {
			box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2),
				-2px 0px 6px rgba(0, 0, 0, 0.2);
		}
	}
	&__slid{
		margin: 3rem 0;
	}
}
.wrap-box {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}
.wrap {
	position: absolute;
	height: 100%;
	top: 0;
	width: 0;
	background-color: rgba(255, 255, 255, 0.1);
	&--one {
		animation: addWrap .3s forwards;
	}
	&--two {
		animation: addWrap .2s forwards;
	}
}
@keyframes addWrap {
	0%{
		width: 0
	}
	100%{
		width: 100%
	}
}
</style>
