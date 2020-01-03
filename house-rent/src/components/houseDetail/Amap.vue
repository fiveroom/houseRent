<template>
  <div class="map-container">
	   
      <div class="search-box">
        <input
          v-model="searchKey"
          type="search"
          id="search">
        
        <button @click="searchByHand">搜索</button>
        <button class="ok" @click="closeTip">确定</button>
        
        
        <div class="tip-box" id="searchTip"></div>
      </div>
      <el-amap class="amap-box"
        :amap-manager="amapManager"
        :vid="'amap-vue'"
        :zoom="zoom"
        :plugin="plugin"
        :center="center"
        :events="events"
      >
        <!-- 标记 -->
        <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
      <!-- 地图打点-->
<!--          
     <el-amap-circle v-for="circle in circles" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" 
	 :events="circle.events"></el-amap-circle> -->
      <!-- </el-amap> -->
      </el-amap>
      
    </div>
</template>
<script src="//webapi.amap.com/ui/1.0/ui/overlay/SimpleMarker.js"></script>
<script>
	import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
	let amapManager = new AMapManager();
	export default {
		data() {
			let self = this;

			return {
				geographic: {
					adress: "",
					lag: null,
					lat: null
				},
				// 表单内容
				Form: {
					province: null,
					city: null,
					district: null,
					lng: null,
					lat: null,
					street: null,
					township: null
				},
				locationAddress: null,
				// 圆形图
			

				locationLng: "",
				locationLar: "",
				address: null,
				searchKey: "",
				amapManager,
				markers: [],
				searchOption: {
					city: "全国",
					citylimit: true
				},
				center: [104.055706, 30.586143],
				zoom: 17,
				lng: 0,
				lat: 0,
				loaded: false,
				events: {
					init() {
						lazyAMapApiLoaderInstance.load().then(() => {
							self.initSearch();
						});
					},
					// 点击获取地址的数据
					click(e) {
						// console.log(e)
						self.markers = [];
						let { lng, lat } = e.lnglat;
						self.lng = lng;
						self.lat = lat;
						self.center = [lng, lat];
						self.markers.push([lng, lat]);
						// 这里通过高德 SDK 完成。
						let geocoder = new AMap.Geocoder({
							radius: 1000,
							extensions: "all"
						});
						geocoder.getAddress([lng, lat], function(status, result) {
							if (status === "complete" && result.info === "OK") {
								if (result && result.regeocode) {
									console.log(result.regeocode);
									self.locationAddress =
										result.regeocode.formattedAddress;

									self.Form.province =
										result.regeocode.addressComponent.province;
									self.Form.city =
										result.regeocode.addressComponent.city;
									self.Form.district =
										result.regeocode.addressComponent.district;
									self.Form.township =
										result.regeocode.addressComponent.township;
									self.Form.street =
										result.regeocode.addressComponent.street;
									self.Form.lng =
										result.regeocode.roads[0].location.lng;
									self.Form.lat =
										result.regeocode.roads[0].location.lat;

									// self.locationLng =
									self.address =
										result.regeocode.formattedAddress;
									self.searchKey =
										result.regeocode.formattedAddress;
									self.$nextTick();
								}
							}
						});
					}
				},
				// 一些工具插件
				plugin: [
					{
						// 定位
						pName: "Geolocation",
						//  pName: 'ToolBar',
						events: {
							init(o) {
								// o是高德地图定位插件实例
								o.getCurrentPosition((status, result) => {
									if (result && result.position) {
										// 设置经度
										self.lng = result.position.lng;
										// 设置维度
										self.lat = result.position.lat;
										// 设置坐标
										self.center = [self.lng, self.lat];
										self.markers.push([self.lng, self.lat]);
										// load
										self.loaded = true;
										// 页面渲染好后
										self.$nextTick();
									}
								});
							}
						}
					},
					{
						// 工具栏
						pName: "ToolBar",
						events: {
							init(instance) {
								// console.log(instance);
							}
						}
					},
					{
						// 鹰眼
						pName: "OverView",
						events: {
							init(instance) {
								// console.log(instance);
							}
						}
					},
					{
						// 地图类型
						pName: "MapType",
						defaultType: 0,
						events: {
							init(instance) {
								// console.log(instance);
							}
						}
					},
					{
						// 搜索
						pName: "PlaceSearch",
						events: {
							init(instance) {
								// console.log(instance)
							}
						}
					}
				]
			};
		},
		methods: {
			// 上传地理位置到vux
			uploadLocation() {
				this.$confirm("确定选择此点位", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						// this.$message({
						// 	type: "success",
						// 	message: "删除成功!"
						// });
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消"
						});
					});
			},
			// 返回上一个页面
			returnLastpage() {
				this.$confirm("确定返回上一页面", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						// this.$message({
						// 	type: "success",
						// 	message: "删除成功!"
						// });
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消"
						});
					});
			},
			initSearch() {
				let vm = this;
				let map = this.amapManager.getMap();
				AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
					var poiPicker = new PoiPicker({
						input: "search",
						placeSearchOptions: {
							map: map,
							pageSize: 10
						},
						suggestContainer: "searchTip",
						searchResultsContainer: "searchTip"
					});
					vm.poiPicker = poiPicker;
					// 监听poi选中信息
					poiPicker.on("poiPicked", function(poiResult) {
						// console.log(poiResult)
						let source = poiResult.source;
						let poi = poiResult.item;
						if (source !== "search") {
							poiPicker.searchByKeyword(poi.name);
						} else {
							poiPicker.clearSearchResults();
							vm.markers = [];
							let lng = poi.location.lng;
							let lat = poi.location.lat;
							let address = poi.cityname + poi.adname + poi.name;
							vm.center = [lng, lat];
							vm.markers.push([lng, lat]);
							vm.lng = lng;
							vm.lat = lat;
							vm.address = address;
							vm.searchKey = address;
						}
					});
				});
			},
			searchByHand() {
				if (this.searchKey !== "") {
					this.poiPicker.searchByKeyword(this.searchKey);
					//
				}
			},

			closeTip() {
				//将输入框的 值保存到vuex中，
				console.log(this.searchKey);
				// this.$store.commit("SET_ADDRESS", this.searchKey);
				// this.$emit("closeTip");
				//
			}
		}
	};
</script>

<style lang="css" scoped>
	.locationForm .btn {
		margin: 15px 28px;
		width: 80%;
	}
	.locationForm {
		width: 300px;
		background-color: red;
		position: fixed;
		right: -308px;
		top: -1px;
		border-radius: 5.5px;
	}
	.locationForm .loc {
		text-align: left;
		text-indent: 60px;
		padding: 5px 0px;
		font-size: 14px;
		background-color: #e4e7ed;
		width: 80%;
		margin: 16px 28px;
		border-radius: 2.5px;
	}
	.locationForm .loc span {
		font-size: 15px;
		margin-left: 15px;
	}
	.locationForm .title {
		padding: 10px 0px;
		font-size: 16px;
		font-weight: bold;
		background-color: #e4e7ed;
		width: 80%;
		margin: 28px;
		border-radius: 2.5px;
	}
	.map-container {
		/* display: inline-block; */
		height: 100%;
		position: relative;
		/* left: 38%;
		top: 40%; */
		/* transform: translate3d(-50%, -50%, 0); */
		border: 1px solid #999;
		/* border: 1px solid transparent; */
	}
	.search-box {
		position: absolute;
		z-index: 5;
		width: 70%;
		left: 13%;
		top: 10px;
		height: 30px;
	}
	.search-box input {
		float: left;
		width: 70%;
		height: 100%;
		border: 1px solid #30ccc1;
		padding: 0 8px;
		outline: none;
	}
	.search-box button {
		float: left;
		margin-right: 10px;
		width: 10%;
		height: 100%;
		background: #30ccc1;
		border: 1px solid #30ccc1;
		color: #fff;
		outline: none;
	}
	.search-box .ok {
		float: left;
		width: 10%;
		height: 100%;
		background: #e25822;
		border: 1px solid #e25822;
		color: #fff;
		outline: none;
	}
	.tip-box {
		width: 100%;
		max-height: 260px;
		position: absolute;
		top: 30px;
		overflow-y: auto;
		background-color: #fff;
	}
</style>
