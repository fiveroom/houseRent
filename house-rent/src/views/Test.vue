<template>
	<div>
		<header-nav />
		<div class="container">
			<div class="container-left">
				<swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
					<swiper-slide v-for="(item, index) in arrImg" :key="index">
						<img :src="item" alt />
					</swiper-slide>
					<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
					<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
				</swiper>
				<swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
					<swiper-slide v-for="(item, index) in arrImgm" :key="index">
						<img :src="item" alt />
					</swiper-slide>
				</swiper>
			</div>
			<div class="container-right"></div>
		</div>
	</div>
</template>

<script>
	import * as houseApi from "@/api/house";
	import "swiper/dist/css/swiper.css";
	import { swiper, swiperSlide } from "vue-awesome-swiper";

	export default {
		data() {
			let arrImg = [
				require("@/assets/img/01.jpg"),
				require("@/assets/img/02.jpg"),
				require("@/assets/img/03.jpg"),
				require("@/assets/img/04.jpg")
			];
			let arrImgm = [
				require("@/assets/img/s01.jpg"),
				require("@/assets/img/s02.jpg"),
				require("@/assets/img/s03.jpg"),
				require("@/assets/img/s04.jpg")
			];
			let swiperOptionTop = {
				spaceBetween: 10,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				},
				on: {
					slideChangeTransitionEnd() {
						if (this.isEnd) {
							this.navigation.$nextEl.css("display", "none");
						} else {
							this.navigation.$nextEl.css("display", "block");
						}
						if (this.isBeginning) {
							this.navigation.$prevEl.css("display", "none");
						} else {
							this.navigation.$prevEl.css("display", "block");
						}
					}
				}
			};
			let swiperOptionThumbs = {
				spaceBetween: 10,
				centeredSlides: true,
				slidesPerView: "auto",
				touchRatio: 0.2,
				slideToClickedSlide: true
			};
			return {
				arrImg,
				arrImgm,
				swiperOptionTop,
				swiperOptionThumbs
			};
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
			},
			callback(item) {
				console.log(item, "dsaf");
			}
		},
		created() {
			this.getHouseDetail();
			console.log("更新");
		},
		mounted() {
			this.$nextTick(() => {
				const swiperTop = this.$refs.swiperTop.swiper;
				const swiperThumbs = this.$refs.swiperThumbs.swiper;
				swiperTop.controller.control = swiperThumbs;
				swiperThumbs.controller.control = swiperTop;
			});
		},
		components: {
			swiper,
			swiperSlide
		}
	};
</script>

<style lang="scss" scoped>
.container {
	width: 116.8rem;
	margin: 0 auto;
}

.swiper-container {
	background-color: #fff;
}
.gallery-top {
	height: 573px !important;
	width: 100%;
}
.gallery-thumbs {
	height: 90px !important;
	box-sizing: border-box;
	padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
	width: 90px;
	height: 100%;
	opacity: 0.4;
}
.swiper-slide{
    img{
        width: 100%;
        height: 100%;
    }
}
.gallery-thumbs .swiper-slide-active {
	opacity: 1;
}
.container {
	margin-top: 2rem;
	&-left {
		width: 76.4rem;
	}
}
</style>