<template>
  <div class="container">
    <!-- 轮播图组件el-carousel -->
    <!-- arrow:左右切换的箭头总是显示 -->
    <el-carousel :interval="5000" arrow="always">
      <!-- el-carousel-item:表示轮播图的每一页 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <!-- 轮播图的背景图---background-size:控制图片大小,自适应宽高 -->
        <div
          class="banner-image"
          :style="`
             background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
             background-size:contain contain;
             `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏(切换栏) -->
        <el-row type="flex" class="search-tab">
          <!-- 动态的class,当前的索引与循环的索引相等时就加上active -->
          <span
            v-for="(item,index) in options"
            :key="index"
            @click="handleClick(index)"
            :class="{active:current===index}"
          >
            <i>{{item.title}}</i>
          </span>
        </el-row>
        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="options[current].placeholder" v-model="searchValue" @keyup.enter="handeleSearch"/>
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [],
      // 定义搜索tab切换的数据
      options: [
        {
          title: "攻略",
          placeholder: "请输入城市",
          pageUrl:'/post?city='
        },
        {
          title: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl:'/hotel?city='
        },
        {
          title: "机票",
          placeholder: "",
          pageUrl:'/air'
        }
      ],
      current: 0,// 当前索引
      searchValue:"",// 搜索框的值
    };
  },
  methods: {
    handleSearch(){
      const item = this.options[this.current]
      this.$router.push(item.pageUrl+this.searchValue)
    },
    //点击搜索的tab栏触发
    handleClick(index) {
      // 点击索引是2时,表示点击了机票
      if (index === 2) {
        this.$router.push("/air");
      }
      // 把当前点击的索引赋值给current
      this.current = index;
    }
  },
  mounted() {
    // 请求轮播图的数据,this.$axios是一种通用写法,nuxt帮我们封装好了
    // Vue.prototype.$axios=axios
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // 获取轮播图的数组
      const { data } = res.data;
      // const data=res.data.data;第二种写法
      // 赋值给banners
      this.banners = data;
    });
  }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
  //  如果在scoped中要修改第三方的组件，组件的class不会加上scoped的字符串，需要在前面加个/deep/
  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;
    .search-bar {
      width: 552px;
      margin: 0 auto;
    }
    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;
        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }
    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;
      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }
      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>