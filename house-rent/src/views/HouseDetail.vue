<template>
	<div>
		<header-nav />
		<div class="container"></div>
	</div>
</template>

<script>
	import * as houseApi from "@/api/house";
	export default {
		data() {
			return {};
		},
		computed: {},
		beforeRouteEnter(to, from, next) {
			next(vm => {});
		},
		methods: {
			getHouseDetail() {
				console.log(this.$route.query.House_id);
				houseApi.houseDetail(
					{
						house_id: this.$route.query.House_id
					},
					res => {
						console.log(res, "房子详情");
					}
				);
			}
		},
		created() {
			this.getHouseDetail();
			console.log("更新");
		}
	};
</script>

<style lang="scss" scoped>
.container{
    width: 116.8rem;
    margin: 0 auto;
}
</style>