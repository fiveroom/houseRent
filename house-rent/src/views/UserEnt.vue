<template>
	<div class="user-ent">
		<router-link to="/" class="logo">
			<img :src="logoImg" alt />
		</router-link>
		<transition :name="transitionName">
			<router-view class='user-ent__container' />
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			const logoImg = require("@/assets/logo.png");
			return {
				logoImg,
				transitionName: null
			};
		},
		watch: {
			$route(to, from) {
				this.transitionName = to.meta.index == 1 ? "left" : "right";
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
		img {
			width: 100%;
			height: 100%;
		}
	}
	&__container {
		position: fixed;
		top: 50%;
		right: 50%;
		transform: translate(50%, -50%);
	}
}
// left在离开的时候，类名已经变成right所以离开完成状态因为right-leave-to
.right-leave-to,
.left-enter {
	top: 100%;
	right: 100%;
	transform: translate(0, 0);
}
.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
	transition: all 0.5s;
}

.right-enter,
.left-leave-to {
	top: 100%;
	right: 0;
	transform: translate(100%, 0);
}
</style>