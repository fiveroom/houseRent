<template>
	<div>
		<header class="header">
			<i class="el-icon-s-opportunity"></i>
			<span>我的聊天</span>
		</header>
		<section>
			<!-- <div v-if="orderList.length === 0" class="order--no">
				<p class="order--no__title">您还没有账单，快去找房吧！～</p>
				<router-link class="order--no__next" to="/h">去找房</router-link>
			</div> -->
		</section>
	</div>
</template>

<script>
	export default {};
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
</style>