<template>
	<div>
		<header class="header">
			<div>
				<i class="myiconfont icon-shoucang"></i>
				<span>合同详情</span>
			</div>
		</header>
		<section></section>
	</div>
</template>

<script>
	import { queryContractInfoById } from "@/api/user";
	export default {
		data() {
			return {};
		},
		methods: {
			getData() {
				let obj = { con_id: this.$route.query.con_id, noLoading: true};
				queryContractInfoById(obj).then(res => {
					console.log(res);
				});
			}
		},
		created() {
			this.getData();
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
</style>