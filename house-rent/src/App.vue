<template>
	<div id="app">
		<router-view />
		<RightSide />
	</div>
</template>

<script>
import RightSide from "@/components/wholeSit/RightSide";
	export default {
		components: {
			RightSide
		}
	};
</script>

<style lang="scss">
	@import "./assets/css/iconfont.css";
	* {
		margin: 0;
		padding: 0;
	}

	html {
		font-size: 62.5%;
		height: 100%;
	}
	body {
		font-size: 1.6rem;
		font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue,
			Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
			Segoe UI Symbol !important;
		min-height: 100%;
		padding: 0 !important;
		overflow: auto !important;
	}
	#app {
		height: 100%;
	}
	ul,
	li,
	ol {
		list-style-type: none;
	}
	a {
		text-decoration: none;
	}

	input:-webkit-autofill {
		box-shadow: 0 0 0px 1000px white inset;
		-webkit-text-fill-color: #333;
	}

	.loadding-animation {
		font-size: 50px;
	}
</style>
