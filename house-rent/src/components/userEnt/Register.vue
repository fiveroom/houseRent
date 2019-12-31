<template>
	<section class="register-from">
		<div class="register-from__left"></div>
		<div class="register-from__right">
			<div class="form" ref="regisFrom">
				<h2 class="form__title">注册</h2>
				<MyInput
					lable="userPhone"
					v-model="userPhone"
					:regStr="userPhoneRex"
					:required="true"
					placeholder="手机号"
					@blurJudge="judgePhoneHave"
					@inputStatus="(status)=>{userPhoneStatus = status}"
					:upStatus="allowGetCode && registerStatus"
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
					<Mybutton
						@clickTo="getResCode"
						class="code__get"
						:telePhone="userPhone"
						:disabled="!userPhoneStatus || exsitPhone"
						:authCode="true"
						:autoJudge="autoJudge"
					/>
				</div>
				<MyInput
					lable="userName"
					v-model="userName"
					:regStr="userNameRex"
					:required="true"
					placeholder="账号昵称"
					@blurJudge="judgeUserName"
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
					<router-link to="/user/login" replace>去登录</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import * as userApi from "@/api/user";
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
				reg: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]).*$/,
				hint: "最少6位，至少包括1位大写字母、1位数字"
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
				timeOut: 0,
				allowGetCode: true,
				exsitPhone: true, // 手机号是否存在
				autoJudge: false, // 验证码手机号自动检测
				exsitUserName: false
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
				// registUserCode
			},
			// 获取验证码
			async getResCode(status) {
				this.allowGetCode = !this.allowGetCode;
				if (this.userPhoneStatus && !this.exsitPhone) {
					this.$myLoadding.open(this.$refs.regisFrom);
					userApi
						.registUserCode({
							telephone: this.userPhone,
							noLoading: true
						})
						.then(res => {
							let obj = { message: res.msg, duration: 1500 };
							if (res.status) {
								this.$notify.success({ ...obj });
							} else {
								this.$notify.warning({ ...obj });
							}
							this.$myLoadding.hide();
						});
				}
			},
			// 注册
			registerUser() {
				let obj = {
					user: JSON.stringify({
						User_tel: this.userPhone,
						User_name: this.userName,
						User_pwd: this.pwd
					}),
					signUpNum: this.code,
					noLoading: true
				};
				this.$myLoadding.open(this.$refs.regisFrom);
				userApi.registUser(obj).then(res => {
					let obj = { message: res.msg, duration: 1500, title: "注册" };
					if (res.status) {
						this.$notify.success({ ...obj });
						this.$router.replace("/user/login");
					} else {
						this.$notify.warning({ ...obj });
					}
					this.$myLoadding.hide();
				});
			},
			registerWeb() {
				this.getCodeStatus = false;
				this.registerStatus =
					this.userPhoneStatus &&
					this.userNameStatus &&
					this.pwdStatus &&
					this.affirmPwdStatus &&
					this.codeStatus &&
					!this.exsitPhone &&
					!this.exsitUserName;
				if (this.registerStatus) {
					this.registerUser();
				}
			},
			// 判断用户手机号是否已经注册
			judgePhoneHave() {
				this.autoJudge = !this.autoJudge;
				if (this.userPhoneStatus) {
					let obj = { telephone: this.userPhone, noLoading: true };
					userApi.queryTel(obj).then(res => {
						if (res.status) {
							this.$notify.error({
								message: res.msg,
								duration: 1500,
								title: "注册"
							});
							this.exsitPhone = true;
						} else {
							this.exsitPhone = false;
						}
					});
				}
			},
			// 判断用户名称是否存在
			judgeUserName() {
				if (this.userNameStatus) {
					userApi
						.queryUName({
							userName: this.userName,
							noLoading: true
						})
						.then(res => {
							if (res.status) {
								this.$notify.error({
									message: res.msg,
									duration: 1500,
									title: "注册"
								});
								this.exsitUserName = true;
							} else {
								this.exsitUserName = false;
							}
						});
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
		position: relative;
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
		&--bot {
			margin-bottom: 2rem;
		}
	}
	.code {
		display: flex;
		justify-content: space-between;
		align-items: center;
		&__input {
			width: 17.4rem;
			text-align: center;
			input {
				font-size: 2rem;
			}
		}
		&__get {
			color: #fff;
			width: 124px;
			margin-bottom: 9px;
		}
	}
</style>
