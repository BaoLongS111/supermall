<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType, //设置为3会实时监听 0 1 不监听
      pullUpLoad: this.pullUpLoad
    });

    //2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", postion => {
        this.$emit("scroll", postion);
      });
    }

    //3.监听上拉加载更多事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        //监听到滚动到底部
        console.log("滚动到底部了！")
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped>
</style>