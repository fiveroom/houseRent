<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		created() {
			// AMap.plugin("AMap.Geocoder", function() {
			// 	var geocoder = new AMap.Geocoder({
			// 		city: "成都"
			// 	});
			// 	// 使用geocoder做地理/逆地理编码
			// 	console.log(geocoder);
			// 	geocoder.getAddress(lnglat, function(status, result) {
			// 		if (status === "complete" && result.info === "OK") {
			// 			console.log(result);
			// 		}
			// 	});
			// });
			// var district,
			// 	polygons = [],
			// 	citycode;

			// //行政区划查询
			// var opts = {
			// 	subdistrict: 1, //返回下一级行政区
			// 	showbiz: false //最后一级返回街道信息
			// };
			// district = new AMap.DistrictSearch(opts); //注意：需要使用插件同步下发功能才能这样直接使用
			// district.search("中国", function(status, result) {
			// 	if (status == "complete") {
			// 		getData(result.districtList[0]);
			// 	}
			// 	console.log(result, 'dasdfdasfas');
			// });
			// function getData(data, level) {
			// 	var bounds = data.boundaries;
			// 	if (bounds) {
			// 		for (var i = 0, l = bounds.length; i < l; i++) {
			// 			var polygon = new AMap.Polygon({
			// 				map: map,
			// 				strokeWeight: 1,
			// 				strokeColor: "#0091ea",
			// 				fillColor: "#80d8ff",
			// 				fillOpacity: 0.2,
			// 				path: bounds[i]
			// 			});
			// 			polygons.push(polygon);
			// 			console.log(polygon);
			// 		}
			// 	}

			// 	var subList = data.districtList;
			// 	console.log(subList, "dddd");
			// }
		}
	};
</script>

<style lang="scss">
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
		height: 100%;
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
</style>
