<template>
	<div>

	</div>
</template>

<script>
	import { payOrder } from "@/api/user";
	export default {
		data() {
			return {
				payHtml: null
			};
		},
		methods: {
			toPayOrder() {
				let obj = {
					order_id: this.$route.query.order_id,
					payAmount: this.$route.query.payAmount,
					noLoading: true
				};
				this.$myLoadding.open(this.$refs.payPage);
				payOrder(obj).then(res => {
					console.log(res, "sssssssssssss");
					if (res.status) {
						this.payHtml = res.data;
					}
					this.$myLoadding.hide();
				});
			}
		},
		mounted() {
			this.toPayOrder();
		}
	};
</script>

<style lang="scss" scoped>
	.pay-page {
		height: 100%;
		width: 100%;
		& > form {
			height: 100%;
			width: 100%;
		}
	}
</style>