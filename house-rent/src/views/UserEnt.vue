<template>
	<div class="user-ent">
		<div class="title">PY租赁系统</div>
		<div class="user-ent__container">
			<router-view />
		</div>
	</div>
</template>  

<script>
	export default {};
</script>

<style lang="scss" scoped>
.user-ent {
	.title {
		position: absolute;
		top: 2rem;
		left: 2rem;
		padding: 1rem;
		background: skyblue;
		font-weight: bold;
		color: #fff;
	}
	&__container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>