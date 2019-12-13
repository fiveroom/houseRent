<template>
	<div class="slide">
		<header-nav />
		<SlideshowH />
	</div>
</template>

<script>
	// @ is an alias to /src
	import SlideshowH from '@/components/SlideshowH';

	export default {
		name: "home",
		components: {
			SlideshowH
		}
	};
</script>

<style lang="scss" scoped>
.slide{
	position: relative;
}
</style>
