<template>
    <div class="container">
        <!-- 轮播图组件el-carousel -->
        <!-- arrow:左右切换的箭头总是显示 -->
        <el-carousel 
        :interval="5000" 
        arrow="always">
        <!-- el-carousel-item:表示轮播图的每一页 -->
            <el-carousel-item 
            v-for="(item, index) in banners" 
            :key="index">
            <!-- 轮播图的背景图---background-size:控制图片大小,自适应宽高 -->
                <div class="banner-image" 
                :style="`
             background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
             background-size:contain contain;
             `">
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 轮播图数据
            banners: []
        }
    },
    mounted(){
      // 请求轮播图的数据,this.$axios是一种通用写法,nuxt帮我们封装好了
      // Vue.prototype.$axios=axios
      this.$axios({
        url:"/scenics/banners"
      }).then(res=>{
        // 获取轮播图的数组
        const {data}=res.data;
        // const data=res.data.data;第二种写法
        // 赋值给banners
        this.banners=data;
      })
    }
}
</script>

<style scoped lang="less">
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;
//  如果在scoped中要修改第三方的组件，组件的class不会加上scoped的字符串，需要在前面加个/deep/
    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>