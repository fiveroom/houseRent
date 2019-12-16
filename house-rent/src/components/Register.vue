<template>
	<section class="register-from">
		<div class="register-from__left"></div>
		<div class="register-from__right">
			<div class="form">
				<h2 class="form__title">注册</h2>
				<MyInput
					lable="userPhone"
					v-model="userPhone"
					:regStr="userPhoneRex"
					:required="true"
					placeholder="手机号"
					@inputStatus="(status)=>{userPhoneStatus = status}"
					:upStatus="registerStatus"
				/>
				<div class="code">
					<MyInput
						lable="code"
						v-model="code"
						:required="true"
						class="code__input"
						placeholder="验证码"
						@inputStatus="status=>codeStatus = status"
						:upStatus="getCodeStatus || registerStatus"
					/>
					<div @click="getDynCode" class="code__get">
						<span>{{timeOut?`重新获取${timeOut}`:'获取验证码'}}</span>
					</div>
				</div>
				<MyInput
					lable="userName"
					v-model="userName"
					:regStr="userNameRex"
					:required="true"
					placeholder="账号昵称"
					@inputStatus="(status)=>{userNameStatus = status}"
					:upStatus="getCodeStatus || registerStatus"
				/>
				<MyInput
					@inputStatus="(status)=>{pwdStatus = status}"
					:upStatus="getCodeStatus || registerStatus"
					lable="pwd"
					v-model="pwd"
					placeholder="密码"
					:required="true"
					:regStr="pwdRex"
					type="password"
				/>
				<MyInput
					@inputStatus="(status)=>{affirmPwdStatus = status}"
					:regStr="{reg: new RegExp(`^${pwd}$`),hint: '两次输入不一致'}"
					:upStatus="getCodeStatus || registerStatus"
					lable="affirmPwd"
					v-model="affirmPwd"
					placeholder="确认密码"
					:required="true"
					type="password"
					class="form--bot"
				/>
				<Mybutton title="立即使用" @clickTo="registerWeb" />
				<div class="form__bottom">
					<span>已有账号</span>
					<router-link to="/user/login">去登录</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "register",
		data() {
			let userPhoneRex = {
				reg: /^1[3456789]\d{9}/,
				hint: "手机号码格式不正确"
			};
			let userNameRex = {
				reg: /^([a-zA-Z0-9_-]|[\u4E00-\u9FA5]){4,16}$/,
				hint: "4位以上，特殊字符可包含-_"
			};
			let pwdRex = {
				reg: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*? ]).*$/,
				hint: "最少6位，至少包括1个大写字母、1个特殊字符、1个数字"
			};
			return {
				userPhone: null,
				userPhoneStatus: false,
				userPhoneRex,
				userName: null,
				userNameStatus: false,
				userNameRex,
				pwd: null,
				pwdStatus: false,
				pwdRex,
				code: null,
				codeStatus: false,
				getCodeStatus: true,
				affirmPwd: null,
				affirmPwdStatus: false,
				slidStatus: false,
				registerStatus: true,
				timeOut: 0
			};
		},
		methods: {
			getDynCode() {
				this.registerStatus = this.userPhoneStatus;
				if (!this.timeOut && this.userPhoneStatus) {
					this.getCode();
					this.timeOut = 60;
					let timer = setInterval(() => {
						this.timeOut--;
						if (this.timeOut === 0) {
							clearInterval(timer);
						}
					}, 1000);
				}
			},
			getCode() {
				console.log("获取验证码");
			},
			registerUser(){
				console.log('注册');
			},
			registerWeb() {
				this.getCodeStatus = false;
				this.registerStatus =
					this.userPhoneStatus &&
					this.userNameStatus &&
					this.pwdStatus &&
					this.affirmPwdStatus &&
					this.codeStatus;
				if (this.registerStatus) {
					this.registerUser();
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
.register-from {
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
		display: flex;
		align-items: center;
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
		margin: 0 0;
		text-align: center;
	}
	&__slid {
		margin: 3rem 0;
	}
	&__bottom {
		padding-top: 3rem;
		font-size: 1.2rem;
		text-align: center;
		span {
			color: #9fa2a8;
			margin-right: 1rem;
		}
		a {
			color: #396afe;
		}
	}
	&--bot{
		margin-bottom: 2rem;
	}
}
.code {
	display: flex;
	justify-content: space-between;
	&__input {
		width: 17.4rem;
		text-align: center;
		input {
			font-size: 2rem;
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
		height: 4rem;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
			0 1px 4px rgba(0, 0, 0, 0.117647);
		&:hover {
			background-color: red;
		}
		&:active {
			box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2),
				-2px 0px 6px rgba(0, 0, 0, 0.2);
		}
		margin-top: 1.1rem;
	}
}
</style>
