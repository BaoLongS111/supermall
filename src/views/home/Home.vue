<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<home-swiper :banners="banners"/>
		<home-recommend-view :recommends="recommends"/>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
	import HomeSwiper from "./childComps/HomeSwiper";
	import HomeRecommendView from "./childComps/HomeRecommendView";
	
	import {getHmoeMultidata} from "network/home";

  export default {
    name: "Home",
		components:{
      HomeRecommendView,
      NavBar,
			HomeSwiper
		},
		data(){
      return{
        banners:[],
				recommends:[]
			}
		},
		created() {
      //1.请求多个数据
			getHmoeMultidata().then(res =>{
        // console.log(res);
        // this.result = res;
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
	.home-nav{
		background-color: var(--color-tint);
		color:#fff;
	}
</style>