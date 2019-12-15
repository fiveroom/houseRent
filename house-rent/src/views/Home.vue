<template>
	<section class="slide">
		<header-nav />
		<SlideshowH />
		<section class="search">
			<div class="search-box">
				<SearchHouse />
			</div>
		</section>
		<section class="other">
			<section class="server">
				<header class="server__head">
					<h2>全面租住服务</h2>
					<span>/简化入场繁琐生活/</span>
				</header>
				<ul class="server__tab">
					<li>PY保洁</li>
					<li>PY搬家</li>
					<li>PY维修</li>
				</ul>
				<div class="server__body">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</section>
		</section>
	</section>
</template>

<script>
	// @ is an alias to /src
	import SlideshowH from "@/components/SlideshowH";
	import SearchHouse from "@/components/SearchHouse";

	export default {
		name: "home",
		data(){
			
			return {

			}
		},
		components: {
			SlideshowH,
			SearchHouse
		}
	};
</script>

<style lang="scss" scoped>
.slide {
	position: relative;
}
.search {
	background-color: #fbfbfb;
	border-bottom: 1px solid #f3f3f3;
	padding: 20px 0;
	&-box {
		width: 116.8rem;
		margin: 0 auto;
	}
}
.other {
	width: 116.8rem;
	margin: 0 auto;
}
</style>
