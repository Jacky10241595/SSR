<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active:currentTab===index}"
            v-for="(item,index) in [`登录`,`注册`]"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>
        <!-- 登录功能组件 -->
        <LoginForm v-if="currentTab==0"/>
        <!-- 注册功能组件 -->
        <RegisterForm v-if="currentTab==1"/>
      </div>
    </el-row>
  </div>
</template>

<script>
// 导入登录组件
import LoginForm from '@/components/user/loginForm'
// 导入注册组件
import RegisterForm from '@/components/user/registerForm'
export default {
  data() {
    return {
      // 记录当前高亮的索引
      currentTab:0
    }
  },
  // 注册组件
  components:{
    LoginForm,// 登录组件
    RegisterForm // 注册组件
  },
  methods:{
    // 点击tab栏触发
    handleChangeTab(index){
      this.currentTab=index;
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  .main{
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position:relative;
    .form-wrapper{
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
      overflow: hidden;
      .tabs{
        span{
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top:2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;
          &.active{
            color:#ffa500;
            border-top-color: #ffa500;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>