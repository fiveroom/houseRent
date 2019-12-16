<template>
	<div class="user-ent">
		<router-link to="/" class="logo">
			<img :src="logoImg" alt="">
		</router-link>
		<div class="user-ent__container">
			<router-view />
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			const logoImg = require('@/assets/logo.png');
			return {
				logoImg
			}
		}
	};
</script>

<style lang="scss" scoped>
	.user-ent {
		.logo {
			position: absolute;
			top: 2rem;
			left: 2rem;
			width: 13.6rem;
			height: 7.3rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		&__container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>