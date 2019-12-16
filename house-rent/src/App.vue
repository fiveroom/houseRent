<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
}
html {
	font-size: 62.5%;
}
body {
	font-size: 1.6rem;
	font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue,
		Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
		Segoe UI Symbol !important;
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
</style>
