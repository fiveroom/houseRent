<template>
	<div>
		<header class="header">
			<i class="el-icon-edit-outline"></i>
			<span>修改密码</span>
		</header>
		<section class="form">
			<MyInput
				@inputStatus="(status)=>{pwdStatus = status}"
				:upStatus="allowEdit"
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
				:upStatus="allowEdit"
				lable="affirmPwd"
				v-model="affirmPwd"
				placeholder="确认密码"
				:required="true"
				type="password"
			/>
			<div class="code form--bot">
				<MyInput
					lable="code"
					v-model="code"
					:required="true"
					class="code__input"
					placeholder="验证码"
					@inputStatus="status=>codeStatus = status"
					:upStatus="allowEdit"
				/>
				<Mybutton
					@clickTo="getResCode"
					class="code__get"
					:disabled="!pwdStatus || !affirmPwdStatus"
					:authCode="true"
				/>
			</div>
			<Mybutton
				:disabled="!affirmPwdStatus || !pwdStatus || !codeStatus"
				title="保存"
				@clickTo="editPwd"
			/>
		</section>
	</div>
</template>

<script>
	import { editAuthCode, upPwdUser } from "@/api/user";
	import { mapGetters } from "vuex";
	export default {
		data() {
			let pwdRex = {
				reg: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]).*$/,
				hint: "最少6位，至少包括1位大写字母、1位数字"
			};
			return {
				pwdRex,
				affirmPwd: null,
				affirmPwdStatus: false,
				pwd: null,
				pwdStatus: false,
				code: null,
				codeStatus: false,
				getCodeStatus: true,
				allowEdit: true
			};
		},
		computed: {
			...mapGetters(["tel"])
		},
		methods: {
			editPwd() {
				console.log("编辑");
				this.allowEdit = !this.allowEdit;
				if (this.affirmPwdStatus && this.pwdStatus && this.codeStatus) {
					let obj = {
						telephone: this.tel,
						code: this.code,
						noLoading: true,
						password: this.pwd
					};
					upPwdUser(obj).then(res => {
						console.log(res);
						if (res.status) {
							this.$router.push("/");
						} else {
							this.$notify({
								title: "密码修改",
								duration: 1500,
								message: res.msg,
								showClose: false
							});
						}
					});
				}
			},
			getResCode() {
				if (this.affirmPwdStatus && this.pwdStatus) {
					console.log("发送验证码");

					let obj = { telephone: this.tel, noLoading: true };
					editAuthCode(obj).then(res => {
						let hint = {
							title: "密码修改",
							duration: 1500,
							message: res.msg,
							showClose: false
						};
						if (res.status) {
							this.$notify.success(hint);
						} else {
							this.$notify.error(hint);
						}
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
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
	.form {
		width: 350px;
		margin: 70px auto 0;
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