<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item, index) in titles" 
                     class="title-item"
                     :class="{active:index === currentIndex}"
                     @click="itemClick(index)">
                     {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'


    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data() {
            return {
                titles: ['商品','参数','评论','推荐'],
                currentIndex: 0
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index;
                this.$emit('titleClick', index);
            },
            backClick() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .title {
        display: flex;
        font-size: 13px;
    }
    .title-item {
        flex: 1;
    }
    .active {
        color: var(--color-high-text)
    }

    .back img{
        /* 如何让一个div里的图片垂直水平居中:这两个可有可无 */
        /* display: table-cell;
        text-align: center; */
        vertical-align: middle;
    }

</style>