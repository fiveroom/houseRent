<template>
	<section class="login-from">
		<div class="login-from__left"></div>
		<div class="login-from__right">
			<div class="form">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="密码登录" name="first">
						<MyInput
							lable="userName"
							v-model="userName"
							:required="true"
							placeholder="账号"
							@inputStatus="(status)=>{userNameStatus = status}"
							:upStatus="loginStatus"
						/>
						<MyInput
							@inputStatus="(status)=>{pwdStatus = status}"
							:upStatus="loginStatus"
							lable="pwd"
							v-model="pwd"
							placeholder="密码"
							:required="true"
							type="password"
						/>
						<SlidVal class="form__slid" @slidStatus="(status)=>{slidStatus = status}" />
					</el-tab-pane>
					<el-tab-pane label="手机验证码登录" name="second">
						<MyInput
							lable="userPhone"
							v-model="userPhone"
							:regStr="userPhoneRex"
							:required="true"
							placeholder="手机号"
							@inputStatus="(status)=>{userPhoneStatus = status}"
							:upStatus="loginStatus"
						/>
						<div class="code">
							<input class="code__input" type="text" />
							<div @click="getCodeJudge" class="code__get">
								<span>{{timeOut?`重新获取${timeOut}`:'获取验证码'}}</span>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>

				<div ref="formBut" class="form__but" @mousedown="addWrap" @mouseup="delWrap">
					<span>登录</span>
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
	import SlidVal from "./SlidVal";
	export default {
		name: "login",
		data() {
			let userPhoneRex = {
				reg: /^1[3456789]\d{9}/,
				hint: "手机号码格式不正确"
			};
			let wrapStyle = {},
				wrapDown = false;
			return {
				userName: null,
				userNameStatus: false,
				userPhone: null,
				userPhoneStatus: false,
				pwd: null,
				pwdStatus: false,
				userPhoneRex,
				wrapStyle, // 按钮动态样式
				wrapDown, // 登录按钮按下
				slidStatus: false,
				loginStatus: true,
				activeName: "first",
				timeOut: 0
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
				this.loginStatus =
					this.userNameStatus && this.pwdStatus && this.slidStatus;
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
				if (this.loginStatus) {
					this.loginTo();
				}
			},
			// 去除登录按钮样式
			delWrap() {
				this.wrapDown = false;
				this.wrapStyle = {};
			},
			loginTo() {
				console.log("登录");
			},
			handleClick() {},
			getCodeJudge() {
				this.loginStatus = this.userPhoneStatus;
				if (!this.timeOut) {
					this.getCode()
					this.timeOut = 60;
					let timer = setInterval(() => {
						this.timeOut--;
						if(this.timeOut === 0) {
							clearInterval(timer)
						}
					}, 1000);
				}
			},
			getCode(){
				console.log('获取验证码');
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
		background-color: #2878ff;
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
		&:hover {
			background-color: #246ce5;
		}
		&:active {
			box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2),
				-2px 0px 6px rgba(0, 0, 0, 0.2);
		}
	}
	&__slid {
		margin: 2rem 0 3rem;
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
		animation: addWrap 0.3s forwards;
	}
	&--two {
		animation: addWrap 0.2s forwards;
	}
}
.code {
	display: flex;
	margin: 2rem 0 3rem;
	height: 4rem;
	&__input {
		width: 13rem;
		box-sizing: border-box;
		text-align: center;
		font-size: 2rem;
		&:focus {
			outline: none;
		}
	}
	&__get {
		cursor: pointer;
		background-color: skyblue;
		border-radius: 0.4rem;
		margin-left: 1.8rem;
		display: flex;
		align-items: center;
		color: #fff;
		padding: 0 1rem;
		box-shadow:  0 6px 20px 5px rgba(40, 120, 255, 0.1),
		0 16px 24px 2px rgba(0, 0, 0, 0.05);
		&:hover {
			background-color: red;
		}
		&:active {
			box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2),
				-2px 0px 6px rgba(0, 0, 0, 0.2);
		}
	}
}
@keyframes addWrap {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}
</style>
