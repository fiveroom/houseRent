<template>
	<div>
		<header class="header">
			<div>
				<i class="myiconfont icon-shoucang"></i>
				<span>我的收藏</span>
			</div>
			<span class="edit-collect">管理收藏</span>
		</header>
	</div>
</template>

<script>
	import { queryOwnCollect } from "@/api/user";
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				arrCollect: [] // 我的收藏
			};
		},
		computed: {
			...mapGetters(["userId"])
		},
		methods: {
			getOwnCollect() {
				queryOwnCollect({ user_id: this.userId, noLoading: true }).then(
					res => {}
				);
			}
        },
        mounted () {
            this.getOwnCollect();
        },
	};
</script>

<style lang="scss" scoped>
.header {
	padding-bottom: 3rem;
	font-size: 1.8rem;
	line-height: 2.1rem;
	border-bottom: 1px solid #f1f1f1;
	color: #333;
	display: flex;
	justify-content: space-between;
	span {
		margin-left: 15px;
	}
}
.edit-collect {
    color: #3dbcc6;
	font-size: 14px;
	cursor: pointer;
}
</style>