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
			<div>
				<span>手机号码</span>
				<span>{{telDeal}}</span>
			</div>
			<p>若当前手机号码无法接受验证码，请拨打****人工服务</p>
			<div >
				<MyInput
					placeholder="请输入短信验证码"
					lable="code"
					v-model="code"
					:required="true"
					@inputStatus="(status)=>{codeStatus = status}"
					:upStatus="nextOneStatus"
				/>
                <Mybutton class="next-but" title="获取验证码" :disabled="true"/>
			</div>
		</section>
	</div>
</template>

<script>
	import MySteps from "@/components/MySteps";
	import { mapGetters } from "vuex";
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
                codeStatus: false,
                nextOneStatus: true
			};
		},
		components: {
			MySteps
		},
		computed: {
			...mapGetters(["telDeal", "tel"])
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
.step {
	margin-top: 5rem;
	&-body {
		margin: 5rem auto 0;
		width: 40rem;
	}
}
.next-but{
    margin-top: 2rem;
}
</style>