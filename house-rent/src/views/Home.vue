<template>
	<section class="slide-all">
		<header-nav />
		<!-- 上方轮播图 -->
		<section class="container">
			<div
				class="container-bgci"
				:style="{'background-image': `url(${hotHouses[showIndex].House_coverPic})`}"
			></div>
			<div class="slide">
				<div
					v-for="(item, index) in hotHouses"
					:key="index"
					:class="['slide-cir', showIndex==index?'slide-cir--show':'']"
					@click="$router.push(`/hdetail?House_id=${item.House_id}`)"
				>
					<el-image :src="item.House_coverPic" style="width: 100%; height: 100%" :lazy="true">
						<div
							slot="error"
							style="position: absolute;left: 0;display:flex;top: 0;font-size: 40px;background-color: #f5f7fa;color: #909399;width:100%;height:100%"
						>
							<i style="margin:auto;" class="el-icon-picture-outline"></i>
						</div>
					</el-image>
				</div>
				<ul class="slide__nav">
					<li
						v-for="(item, index) in hotHouses"
						:style="showIndex == index?choiceitem:''"
						:key="item.House_id"
						@click="changIndexTop(index)"
					></li>
				</ul>
				<i class="slide-left" @click="lastHouse"></i>
				<i class="slide-right" @click="nextHouse"></i>
			</div>
		</section>
		<section class="search">
			<div class="search-box">
				<SearchHouse />
			</div>
		</section>
		<!-- 服务 -->
		<section class="other">
			<section class="section server">
				<header class="section__head">
					<h2>全面租住服务</h2>
					<p>/简化入场繁琐生活/</p>
				</header>
				<div class="contain-server">
					<ul class="server__tab">
						<li @click="choiceServer=0">
							<span>01</span>
							<p :class="choiceServer == 0?'server__tab--active':''">相寓保洁</p>
						</li>
						<li @click="choiceServer=1">
							<span>02</span>
							<p :class="choiceServer == 1?'server__tab--active':''">相寓搬家</p>
						</li>
						<li @click="choiceServer=2">
							<span>03</span>
							<p :class="choiceServer == 2?'server__tab--active':''">相寓维修</p>
						</li>
					</ul>
					<i class="sliding-block" :style="reServerSlid"></i>
				</div>
				<div class="server__body">
					<div class="server__body-logo">
						X&nbsp;I&nbsp;A&nbsp;N&nbsp;G&nbsp;Y&nbsp;U
						<span></span>
					</div>
					<div class="server__body-left">
						<ul class="view">
							<li
								:class="['view-text', choiceServer == index?'view-text--show':'']"
								v-for="(item, index) in serverDes"
								:key="index"
							>
								<p class="h1">{{item.title}}</p>
								<p class="h2-des">{{item.titleDes}}</p>
								<p class="text-des">{{item.info}}</p>
							</li>
						</ul>
					</div>
					<div class="server__body-right">
						<ul class="view" :style="{transform: `translateX(${-choiceServer*870}px)`}">
							<li class="view-img" v-for="(item, index) in serverImg" :key="index">
								<img :src="item" alt />
							</li>
						</ul>
					</div>
					<div class="server__body-button">
						<div class="icon-option icon-right">
							<span @click="changeIndex(0, 'choiceServer', 3)" class="myiconfont icon-xiangyou"></span>
						</div>
						<div class="icon-line">
							<div :style="{transform: `translateX(${(choiceServer-2)*40}px)`}" class="icon-line-anim"></div>
						</div>
						<div class="icon-option">
							<span @click="changeIndex(1, 'choiceServer', 3)" class="myiconfont icon-xiangyou"></span>
						</div>
					</div>
				</div>
			</section>
		</section>
		<!-- 优势 -->
		<section class="promb">
			<div class="section prom">
				<header class="section__head">
					<h2>相寓承诺</h2>
					<p>/给你不一样的体验/</p>
				</header>
				<div class="prom-body">
					<div class="prom-body__item" v-for="(item, index) in promInfo" :key="index">
						<div class="prom-all prom-top" :style="{backgroundImage: `url(${item.img})`}">{{item.title}}</div>
						<div class="prom-all prom-bot">
							<div class="prom-bot--inner" v-html="item.des"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- 房源推荐 -->
		<section>
			<div class="section recom">
				<header class="section__head">
					<h2>相寓推荐</h2>
					<p>/给你不一样的享受/</p>
				</header>
				<div class="recom-body">
					<div class="recom-body__l">
						<ul class="recom-body__c" :style="{transform: `translateX(${-857*houseRecomChoice}px)`}">
							<li v-for="item in hotHouses.slice(0,2)" :key="item.House_id">
								<img :src="item.House_coverPic" alt @click="toHouseDetial(item.House_id)" />
							</li>
						</ul>
						<div class="recom-body__ch recom-body__ch--l" @click="changeIndex(0, 'houseRecomChoice', 2)">
							<i class="el-icon-arrow-left"></i>
						</div>
						<div class="recom-body__ch recom-body__ch--r" @click="changeIndex(1, 'houseRecomChoice', 2)">
							<i class="el-icon-arrow-right"></i>
						</div>
					</div>
					<div class="recom-body__r">
						<div v-for="(item, index) in houseRecomCpMini" :key="index">
							<div
								:class="['recom-body__rimg', houseRecomChoice == 0? 'recom-body__rimg--show':'']"
								:style="{backgroundImage: `url(${item[0]})`}"
							></div>
							<div
								:class="['recom-body__rimg', houseRecomChoice == 1? 'recom-body__rimg--show':'']"
								:style="{backgroundImage: `url(${item[1]})`}"
							></div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<Footer />
		<RightSide />
	</section>
</template>

<script>
	// @ is an alias to /src
	import SlideshowH from "@/components/SlideshowH";
	import SearchHouse from "@/components/SearchHouse";
	import { queryHotH } from "@/api/house";
	import { clearInterval } from "timers";
	export default {
		name: "home",
		data() {
			// 服务数据
			let serverImg = [
				require("@/assets/img/server01.png"),
				require("@/assets/img/server02.png"),
				require("@/assets/img/server03.png")
			];
			let serverDes = [
				{
					title: "相寓保洁",
					titleDes: "下一刻，明亮如新",
					info:
						"相寓旗下专业保洁品牌，成立八年至今，形成专属清洁服务标准——人员严选、工具放心、流程规范。为用户提供日常保洁、玻璃清洁等多样保洁产品，持续为市场提供高品质保洁服务。"
				},
				{
					title: "相寓搬家",
					titleDes: "每一次搬家都珍贵",
					info:
						"自2014年上线起，始终坚持：每一项服务标准清晰明确，每个物件精心打包安放。成立4年来，打磨和研发多项产品满足用户个性化搬家需求，目前已覆盖北京、上海、天津等9个城市。"
				},
				{
					title: "相寓家修",
					titleDes: "用心守护 美好如初",
					info:
						"相寓旗下O2O生活服务产品，旨在为客户提供“专业便捷、安全透明”的全能维修。月交付15万+，拥有超过1400人的相寓巧匠，覆盖装修后市场、家电售后全生态，率先实现标准化和数据化管理，让客户无后顾之忧。"
				}
			];

			// 优势数据
			let promInfo = [
				{
					img: require("@/assets/img/prom01.png"),
					title: "百分比真实房源",
					des: "真实房源信息<br />不收中介费退换有保障"
				},
				{
					img: require("@/assets/img/prom02.png"),
					title: "支持分期付款",
					des: "多种选择<br />押一付一，押一付二·····"
				},
				{
					img: require("@/assets/img/prom03.png"),
					title: "优质保洁",
					des: "保洁服务覆盖面广<br >帮你清除死角"
				},
				{
					img: require("@/assets/img/prom04.png"),
					title: "售后服务优质上门",
					des: "维修专人联系跟进<br >添加微信小程序随时查看进度"
				}
			];

			// 房源推荐数据
			let houseRecom = [
				require("@/assets/img/house1.jpg"),
				require("@/assets/img/house2.jpg")
			];
			let minHouseRcom = [
				[
					require("@/assets/img/house1-1.jpg"),
					require("@/assets/img/house2-1.jpg")
				],
				[
					require("@/assets/img/house1-2.jpg"),
					require("@/assets/img/house2-2.jpg")
				],
				[
					require("@/assets/img/house1-3.jpg"),
					require("@/assets/img/house2-3.jpg")
				]
			];
			let choiceitem = {
				"background-color": " rgb(255, 255, 255)",
				"border-color": "rgb(146, 154, 159)"
			};
			let hotHouses = [
				{
					House_id: null,
					House_collectAmount: null,
					House_coverPic: null,
					House_picList: []
				}
			];
			let houseRecomCpMini = [[], [], []];
			return {
				arrHotHouseCover: [],
				arrHouseMiniPic: [],
				choiceServer: 0,
				serverImg,
				serverDes,
				promInfo,
				houseRecom,
				minHouseRcom,
				houseRecomChoice: 0,
				choiceitem,
				imgList: [
					{
						House_coverPic: require("@/assets/img/house1.jpg"),
						House_id: 12
					},
					{
						House_coverPic: require("@/assets/img/house2.jpg"),
						House_id: 11
					},
					{
						House_coverPic: require("@/assets/img/house1.jpg"),
						House_id: 60
					},
					{
						House_coverPic: require("@/assets/img/house2.jpg"),
						House_id: 59
					},
					{
						House_coverPic: require("@/assets/img/house1.jpg"),
						House_id: 13
					}
				],
				showIndex: 0, // 上方轮播索引
				hotHouses,
				timerS: null, // 自动播放
				houseRecomCp: [
					{
						House_coverPic: null,
						House_id: null
					}
				],
				houseRecomCpMini
			};
		},
		components: {
			SlideshowH,
			SearchHouse
		},
		computed: {
			reServerSlid() {
				let transformStyle = null;
				switch (this.choiceServer) {
					case 0:
						transformStyle = "translateX(147px)";
						break;
					case 1:
						transformStyle = "translateX(536px)";
						break;
					case 2:
						transformStyle = "translateX(927px)";
						break;
					default:
						transformStyle = "translateX(147px)";
						break;
				}
				return {
					transform: transformStyle
				};
			},
			getHotHouseB() {}
		},
		methods: {
			changeIndex(type, attr, num) {
				type ? this[attr]++ : this[attr]--;
				if (type == 0 && this[attr] == -1) {
					this[attr] = num - 1;
				}
				this[attr] = this[attr] % num;
			},
			getHotHouse() {
				queryHotH().then(res => {
					// console.log(res);
					if (res.status) {
						this.hotHouses = res.data;
						for (let i = 0; i < 3; i++) {
							(this.houseRecomCpMini[i] = []),
								this.houseRecomCpMini[i].push(
									this.hotHouses[i].House_picList[0]
								);
							this.houseRecomCpMini[i].push(
								this.hotHouses[i].House_picList[1]
							);
						}
					}
					this.autoLunBo();
				});
			},
			lastHouse() {
				window.clearInterval(this.timerS);
				this.showIndex =
					Math.abs(--this.showIndex + 1) % this.hotHouses.length == 0
						? 4
						: this.showIndex;
			},
			nextHouse() {
				window.clearInterval(this.timerS);
				this.showIndex =
					Math.abs(++this.showIndex) % this.hotHouses.length == 0
						? 0
						: this.showIndex;
			},
			autoLunBo() {
				this.timerS = setInterval(() => {
					if(this.imgList.length == 1){
						this.showIndex++;
						if (this.showIndex == this.imgList.length - 1) {
							window.clearInterval(this.timerS);
						}
					} else {
						window.clearInterval(this.timerS);
					}
				}, 2000);
			},
			changIndexTop(index) {
				this.showIndex = index;
				window.clearInterval(this.timerS);
			},
			toHouseDetial(house_id){
				this.$router.push(`/hdetail?House_id=${house_id}`)
			}
		},
		mounted() {
			// this.$myLoadding.open();
			// console.log(this.$myLoadding);
		},
		created() {
			this.getHotHouse();
		}
	};
</script>

<style lang="scss" scoped>
	// 上方轮播

	.no-image {
		position: absolute;
		left: 0;
		top: 0;
		font-size: 40px;
		background-color: #f5f7fa;
		color: #909399;
	}
	@mixin cut {
		display: flex;
		position: absolute;
		width: 41px;
		height: 69px;
		cursor: pointer;
		top: 50%;
		transform: translateY(-50%);
		background: url(../assets/img/icon-slides.png) no-repeat;
	}
	.container {
		position: relative;
		background-size: contain;
		background-repeat: no-repeat;
		&-bgci {
			position: absolute;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
			filter: blur(5px);
			z-index: -1;
		}
	}
	.slide {
		cursor: pointer;
		width: 116.8rem;
		margin: 0 auto;
		height: 400px;
		position: relative;
		&:hover > &-left {
			background-position: 0;
		}
		&:hover > &-right {
			background-position: -41px;
		}
		&-cir {
			width: 100%;
			height: 100%;
			// background-size: 100% 100%;
			// background-repeat: no-repeat;
			position: absolute;
			transition: all 0.4s;
			top: 0;
			left: 0;
			opacity: 0;
			&--show {
				opacity: 1;
			}
		}
		&-left {
			@include cut;
			left: 0;
			background-position: -84px;
			border-top-right-radius: 0.3rem;
			border-bottom-right-radius: 0.3rem;
		}
		&-right {
			@include cut;
			right: 0;
			background-position: -124px;
			border-top-left-radius: 0.3rem;
			border-bottom-left-radius: 0.3rem;
		}
		&__nav {
			position: absolute;
			display: flex;
			bottom: 1rem;
			right: 0.8rem;
			transform: translate(-50%, -50%);
			li {
				cursor: pointer;
				width: 0.6rem;
				height: 0.6rem;
				border-radius: 50%;
				background-color: #999999;
				border: 0.2rem solid #abb2b3;
				margin: 0.5rem;
				transition: all 0.2s;
				&:hover {
					background-color: #ffffff;
					border-color: #929a9f;
				}
			}
		}
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
	.other,
	.prom,
	.recom {
		width: 116.8rem;
		margin: 0 auto;
	}
	.contain-server {
		position: relative;
	}
	.section {
		&::before {
			display: table;
			content: "";
		}
		&__head {
			text-align: center;
			margin: 60px auto 32px;
			width: fit-content;
			h2 {
				font-size: 30px;
				color: rgba(0, 0, 0, 0.85);
			}
			p {
				color: rgba(0, 0, 0, 0.4);
				text-align: center;
				margin: 6px;
			}
		}
	}
	.server {
		&__tab {
			position: relative;
			display: flex;
			justify-content: space-evenly;
			text-align: center;
			li {
				cursor: pointer;
				flex-grow: 1;
				span {
					opacity: 0.06;
					font-size: 48px;
					color: #000;
					line-height: 48px;
					font-weight: 600;
				}
				p:last-of-type {
					width: 100%;
					font-size: 24px;
					color: rgba(0, 0, 0, 0.85);
					margin-top: -14px;
				}
			}
			& &--active {
				font-weight: bolder;
			}
		}
		&__body {
			margin-top: 32px;
			height: 580px;
			display: flex;
			position: relative;
			justify-content: flex-end;
			&-left {
				background-color: #fff;
				position: absolute;
				width: 302px;
				height: 205px;
				padding: 40px 32px;
				box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				z-index: 2;
				overflow: hidden;
			}
			&-right {
				flex-shrink: 0;
				overflow: hidden;
				font-size: 0;
				width: 870px;
			}
			&-button {
				position: absolute;
				height: 30px;
				bottom: 0;
				left: 0;
				display: flex;
				align-items: center;
			}
			&-logo {
				transform: rotate(90deg);
				transform-origin: 0 0;
				font-size: 100px;
				position: absolute;
				left: 100px;
				width: 580px;
				flex-shrink: 0;
				z-index: 100;
				text-align: justify;
				line-height: 100px;
				text-align: justify;
				overflow: hidden;
				height: 100px;
				color: #f7f7f7;
				z-index: -222;
				&::after {
					display: inline-block;
					width: 100%;
					height: 0;
					content: "";
				}
			}
		}
	}
	.promb {
		background-color: #fbfbfb;
	}
	.prom {
		&-body {
			height: 340px;
			display: flex;
			justify-content: space-between;
			& > div {
				position: relative;
				height: 100%;
				width: 280px;
				&:hover > .prom-bot {
					transform: rotateY(0deg);
				}
				&:hover > .prom-top {
					transform: rotateY(-180deg);
				}
			}
		}

		&-all {
			cursor: pointer;
			transition: all 1s;
			width: 100%;
			position: absolute;
			height: 100%;
			left: 0;
			top: 0;
			transform-style: preserve-3d;
			backface-visibility: hidden;
			font-size: 18px;
			font-weight: 600;
			text-align: center;
			vertical-align: middle;
			color: #000000;
		}
		&-bot {
			transform: rotateY(180deg);
			color: #fff;
			background-color: #3dbcc6;
			&--inner {
				display: inline-block;
				vertical-align: middle;
			}
			&::after {
				height: 100%;
				content: "";
				display: inline-block;
				width: 0;
				vertical-align: middle;
			}
		}
		&-top {
			padding-top: 268px;
			background-color: #fff;
			box-sizing: border-box;
			transform: rotateY(0);
			background-repeat: no-repeat;
			background-position: 50% 20%;
		}
	}
	.icon {
		&-right {
			transform: rotate(180deg);
		}
		&-option {
			width: 32px;
			height: 32px;
			line-height: 32px;
			span {
				cursor: pointer;
				font-size: 32px;
			}
		}
		&-line {
			height: 4px;
			width: 120px;
			background-color: #f7f7f7;
			margin: 0 10px;
			border-radius: 4px;
			overflow: hidden;
			&-anim {
				transition: all 0.3s;
				border-radius: 4px;
				height: 100%;
				background-color: #000000;
			}
		}
	}
	.h1 {
		font-size: 30px;
		color: rgba(0, 0, 0, 0.85);
		font-weight: 600;
		line-height: 30px;
	}
	.h2-des {
		font-size: 20px;
		color: #000;
		color: rgba(0, 0, 0, 0.4);
		font-weight: 400;
		line-height: 36px;
	}
	.text-des {
		font-size: 15px;
		color: rgba(0, 0, 0, 0.4);
		line-height: 24px;
		margin: 19px 0 0;
		text-align: justify;
	}
	.view {
		position: relative;
		transition: all 0.5s;
		width: max-content;
		height: 100%;
		&-img {
			display: inline-block;
			width: 870px;
			height: 100%;
			background: no-repeat;
			transition: all 1s;
			&:hover {
				transform: scale(1.2);
			}
			transform: scale(1);
		}
		&-text {
			position: absolute;
			top: 0;
			left: 0;
			transition: all 0.3s;
			width: 302px;
			height: 100%;
			opacity: 0;
		}
		&-text--show {
			opacity: 1;
		}
	}
	.sliding-block {
		position: absolute;
		z-index: -1;
		display: block;
		width: 94px;
		height: 4px;
		background-color: skyblue;
		transition: all 0.3s;
		transform: translateX(147px);
		bottom: 1px;
	}
	.recom-body {
		height: 640px;
		display: flex;
		&__r {
			display: flex;
			flex-grow: 1;
			margin-left: 5px;
			flex-direction: column;
			justify-content: space-between;
			& > div {
				width: 100%;
				height: 210px;
				position: relative;
			}
		}
		&__rimg {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background-repeat: no-repeat;
			background-size: cover;
			opacity: 0;
			transition: opacity 0.5s;
			&--show {
				opacity: 1;
			}
		}
		&__l {
			overflow: hidden;
			width: 857px;
			flex-shrink: 0;
			position: relative;
		}
		&__c {
			width: max-content;
			font-size: 0;
			height: 100%;
			transition: all 0.3s;
			li {
				width: 857px;
				height: 100%;
				display: inline-block;
				cursor: pointer;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		&__ch {
			transition: background-color 0.3s;
			position: absolute;
			top: 50%;
			cursor: pointer;
			font-size: 40px;
			transform: translateY(-50%);
			color: #fff;
			background-color: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			&--l {
				left: 0;
				margin-left: 10px;
			}
			&--r {
				right: 0;
				margin-right: 10px;
			}
			&:hover {
				background-color: rgba(0, 0, 0, 0.4);
			}
		}
	}
</style>
