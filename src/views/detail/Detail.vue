<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      currentIndex: 0,
      // getThemeTopY: null
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.id;

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);

      const data = res.result;
      //1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list;
    });

    //4.给getThemeTopY赋值
    // this.getThemeTopY = debounce(() => {

      
    // },200 )
  },
  mounted() {},
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // console.log("imgaeLoad");
      this.$refs.scroll.refresh();
      // this.getThemeTopY();
    },
    titleClick(index) {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      //1.获取y值
      const positionY = -(position.y);
      //2.positionY和主题中的对比
      //[0,7938,9120,9452]
      //positionY 在 0 和 7938 之间， index = 0
      //positionY 在 7938 和 9120 之间， index = 1
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {

        // }
        // if (
        //   (this.currentIndex !== i &&
        //     (i < length - 1 &&
        //       positionY >= this.themeTopYs[i] &&
        //       positionY < this.themeTopYs[i + 1])) ||
        //   (i === length - 1 && positionY >= this.themeTopYs[i])
        // ) {
        //   this.currentIndex = i;
        //   console.log(i);
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }

        if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex;
        }


      
      
      
      
      
      
      }

      //3.是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;

    },
    addToCart() {
      //1.获取购物车需要展示的信息
      console.log('------');
      const product = {};
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.goods.iid;

      //2.将商品加到购物车里
      // this.$store.cartList.push(product);
      // this.$store.commit('addCart', product);

      this.addCart(product).then(res => {
        // console.log(res)

      this.$toast.show(res,2000);
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // });


    }
  },
  updated() {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>