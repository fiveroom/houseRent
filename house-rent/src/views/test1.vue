<template>
	<!-- 商品详情页 -->
	<section>
		<section class="detail-info-all">
			<section>
				<div class="show-img">
					<!-- 未处理鼠标滚动 -->
					<div
						class="view-img"
						@mouseover="changeBoxDisplay"
						@mousemove="magnifyingGlass"
						@mouseout="hiddenBox"
					>
						<img v-if="showImgInTypeStatus" :src="showImg.showBigImg" alt />
						<img v-else :src="choiceProTypeImgBig" alt />
						<div class="big-img"></div>
						<i
							v-show="showImgIndex != 0"
							class="el-icon-arrow-left to-left"
							@click="toLeft"
							@mouseover.stop
						></i>
						<i
							v-show="showImgIndex != showImg.showImgLen - 1"
							class="el-icon-arrow-right to-right"
							@click="toRight"
							@mouseover.stop
						></i>
					</div>
					<div class="show-big">
						<img class="big-img-show" :src="showImg.showBigImg" alt />
					</div>
					<!-- 下方小图片 -->
					<div class="choice-img">
						<ul v-if="showImgInTypeStatus" class="choice-img-ul" @click="choiceImg">
							<li
								:class="{'click-img': index == showImgIndex}"
								v-for="(item, index) in showImg.showSmallImg"
								:key="index"
							>
								<img :src="item.gimg_src" :data-imgIndex="index" alt />
							</li>
						</ul>
						<ul v-else class="choice-img-ul">
							<li class="click-img">
								<img :src="choiceProTypeImg" alt />
							</li>
						</ul>
					</div>
				</div>
				<!-- 右边 -->
			</section>
		</section>
	</section>
</template>

<script>
	export default {
		data: function() {
			return {
				navInfo: [],
				proAllInfo: {},
				proInfoBase: {}, // '基本信息'
				showImgIndex: 0,
				lastSmallImgClick: undefined,
				interNum: "",
				glassStatus: false, // 放大镜状态
				goodsNum: 1,
				showImgInTypeStatus: true, // 展示图状态
				choiceProTypeImg: "", // 选中的类别图片
				choiceProTypeImgBig: "", // 选中的类别图片
				choiceProTypeId: "", // 选中图片类别ID
				typeIndex: undefined, // 图片索引
				choiceTypeStates: false,
				detailImg: [], // 商品详细图片介绍
				proDetailInfoP: "",
				topInfoState: "",
				proFirstImg: "",
				showgoods: []
			};
		},
		components: {},
		methods: {
			getAbsDistance(element) {
				var eL = element.offsetLeft;
				var eT = element.offsetTop;
				var eFather = element.offsetParent;
				while (eFather != document.body) {
					eL += eFather.offsetLeft + eFather.clientLeft;
					eT += eFather.offsetTop + eFather.clientTop;
					eFather = eFather.offsetParent;
				}
				return [eL, eT];
			},

			toRight() {
				if (this.showImgIndex + 1 != this.proAllInfo.proShowImg.length) {
					this.showImgIndex++;
				}
			},
			toLeft() {
				if (this.showImgIndex != 0) {
					this.showImgIndex--;
				}
			},
			choiceImg(event) {
				let choiceImgUl = document.querySelector(".choice-img-ul").children;
				if ([].includes.call(choiceImgUl, event.target.parentNode)) {
					(this.lastSmallImgClick &&
						this.lastSmallImgClick.classList.remove("click-img")) ||
						choiceImgUl[0].classList.remove("click-img");
					this.showImgIndex = event.target.dataset.imgindex;
					event.target.parentNode.classList.add("click-img");
					this.lastSmallImgClick = event.target.parentNode;
				}
			},
			magnifyingGlass(event) {
				let viewImg = document.querySelector(".view-img");
				let bigImgShow = document.querySelector(".big-img-show");
				let bigImg = document.querySelector(".big-img");
				let viewH = viewImg.clientHeight;
				let viewW = viewImg.clientWidth;
				let [xDocu, yDocu] = this.getAbsDistance(viewImg);
				if (this.glassStatus) {
					var needX = event.clientX - xDocu - 110 + window.pageXOffset;
					var needY = event.clientY - yDocu - 100 + window.pageYOffset;
					if (needX > viewW - 220) {
						needX = viewW - 220;
					} else if (needX < 0) {
						needX = 0;
					}
					if (needY > viewH - 220) {
						needY = viewH - 220;
					} else if (needY < 0) {
						needY = 0;
					}
					bigImg.style.left = needX + "px";
					bigImg.style.top = needY + "px";
					bigImgShow.style.left = -needX * 2 + "px";
					bigImgShow.style.top = -needY * 2 + "px";
				}
			},
			changeBoxDisplay() {
				document.querySelector(".big-img").style.display = "block";
				document.querySelector(".show-big").style.display = "block";
				this.glassStatus = true;
			},
			hiddenBox() {
				document.querySelector(".big-img").style.display = "";
				document.querySelector(".show-big").style.display = "";
				this.glassStatus = false;
			},
			runMove(obj, needTop) {
				let minValue =
					(needTop < 0 && needTop + 4 + "") || needTop - 4 + "";
				let num = setInterval(() => {
					let newTopValue = parseInt(getComputedStyle(obj).top);
					obj.style.top =
						(needTop - newTopValue) * 0.5 + newTopValue + "px";
					if (
						(parseInt(obj.style.top) < minValue && needTop < 0) ||
						(parseInt(obj.style.top) > minValue && needTop >= 0)
					) {
						obj.style.top = needTop;
						clearInterval(num);
					}
				}, 50);
				return num;
			},
			getHot: function() {
				this.axios
					.get("/product/hotGoods", {})
					.then(res => {
						this.showgoods = res.data;
						//   console.log(this.showgoods);
						//   console.log(this.showgoods.g_onsale);
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		computed: {
			showImg() {
				if (this.proAllInfo.proShowImg) {
					return {
						showBigImg: this.proAllInfo.proShowImg[this.showImgIndex]
							.gimg_big_src,
						showSmallImg: this.proAllInfo.proShowImg,
						showImgLen: this.proAllInfo.proShowImg.length
					};
				}
				return {};
			}
		},
		created() {
			let { g_id } = this.$route.query;
			this.axios
				.get("/product/detail", {
					params: {
						g_id
					}
				})
				.then(res => {
					this.$store.commit("changeTopNav", {
						name: res.data.proInfoBase[0].g_title,
						path: this.$route.path,
						state: true
					});
					// console.log(res.data);
					this.proAllInfo = res.data;
					this.proInfoBase = res.data.proInfoBase[0];
					this.detailImg = res.data.detailImg;
					this.proDetailInfoP = JSON.parse(
						res.data.proInfoBase[0].g_otherInfo
					);
					this.proFirstImg = res.data.proShowImg[0].gimg_src;
					// console.log(this.detailImg);
				})
				.catch(err => console.log(err));
			this.getHot();
		},
		mounted() {},
		updated() {
			// 展示图切换
			let speed = -5;
			let distanceSmallImg = 80 * 2 - this.showImgIndex * 80;
			if (this.showImgIndex > 1) {
				if (this.showImgIndex > this.proAllInfo.proShowImg.length - 3) {
					distanceSmallImg =
						document.querySelector(".choice-img").clientWidth -
						(this.proAllInfo.proShowImg.length + 1) * 80;
				}
				clearInterval(this.interNum);
				let choiceImgUl = document.querySelector(".choice-img-ul");
				distanceSmallImg > parseInt(getComputedStyle(choiceImgUl).left) &&
					(speed = -speed);
				this.interNum = setInterval(() => {
					let oldL = parseInt(getComputedStyle(choiceImgUl).left);
					let newL = oldL + speed;
					choiceImgUl.style.left = newL + "px";
					if (
						(newL < distanceSmallImg && speed < 0) ||
						(newL > distanceSmallImg && speed > 0)
					) {
						choiceImgUl.style.left = distanceSmallImg + "px";
						clearInterval(this.interNum);
					}
				}, 10);
			}
			// 顶部显示
			let topInfo = document.querySelector(".top-show");
			document.onscroll = () => {
				if (
					window.pageYOffset > 850 &&
					parseInt(getComputedStyle(topInfo).top) < 0
				) {
					clearInterval(this.botNum);
					clearInterval(this.topNum);
					this.botNum = this.runMove(topInfo, 0);
				}
				if (
					window.pageYOffset < 850 &&
					parseInt(getComputedStyle(topInfo).top) == 0
				) {
					clearInterval(this.botNum);
					clearInterval(this.topNum);
					this.topNum = this.runMove(topInfo, -74);
				}
			};
		}
	};
</script>

<style lang="scss" scoped>
.detail-info-all {
	width: 1110px;
	margin: 0 auto 80px;
	& > section {
		display: flex;
		justify-content: space-between;
	}
}

.show-img {
	width: 440px;
	height: 530px;
	position: relative;
	& > .view-img {
		height: 440px;
		background-color: #f9f9f9;
		position: relative;
	}
	& > .choice-img {
		margin-top: 10px;
		height: 80px;
		display: flex;
		align-content: center;
		overflow: hidden;
	}
	& > .show-big {
		z-index: 30;
		position: absolute;
		width: 530px;
		height: 530px;
		top: 0;
		left: 450px;
		overflow: hidden;
		display: none;
		background: #f9f9f9;
		z-index: 100;
		& > .big-img-show {
			// 4倍
			width: 880px;
			height: 880px;
			position: absolute;
		}
	}
}
.view-img {
	display: flex;
	&:hover {
		& > i {
			display: block;
		}
	}
	& > i {
		z-index: 100;
		display: none;
		height: 40px;
		font-size: 40px;
		cursor: pointer;
		color: rgba($color: #000000, $alpha: 0.5);
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		&:first-of-type {
			left: 0;
		}
		&:last-of-type {
			right: 0;
		}
	}
	img {
		margin: auto;
		width: auto;
		height: auto;
	}
	& > .big-img {
		cursor: move;
		position: absolute;
		width: 220px;
		height: 220px;
		background: url(../assets/img/s-mask.png) no-repeat;
		display: none;
	}
	// & > .show-big {
	// 	position: absolute;
	// 	width: 530px;
	// 	height: 530px;
	// 	top: 0;
	// 	left: 450px;
	// 	overflow: hidden;
	// 	display: none;
	// 	& > .big-img-show {
	// 		// 4倍
	// 		width: 880px;
	// 		height: 880px;
	// 		position: absolute;
	// 	}
	// }
}
.choice-img-ul {
	font-size: 0;
	white-space: nowrap;
	position: relative;
	width: auto;
	& > li {
		display: inline-block;
		width: 76px;
		height: 76px;
		margin-right: 10px;
		border: 2px solid transparent;
		// box-sizing: border-box;
		cursor: pointer;
		& > img {
			width: 100%;
			height: 100%;
		}
		&:hover {
			border-color: #d33a31;
		}
	}
	& > li.click-img {
		border-color: #d33a31;
	}
}
