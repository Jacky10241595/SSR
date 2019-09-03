<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-input placeholder="密码" v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>
    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username:'',// 登录用户名/手机
        password:'',// 登录密码
        checkPassword:'',// 确认密码
        nickname:'',// 昵称
        captcha:''// 手机验证码
      },
      // 表单规则
      rules: {}
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {},
    // 注册
    handleRegSubmit() {}
  }
};
</script>
<style lang="less" scoped>
.form {
  padding: 25px;
}
.form-item{
    margin-bottom:20px;
}
.form-text{
    font-size: 12px;
    color:#409eff;
    text-align: right;
    line-height: 1;
}
.submit{
    width: 100%;
    margin-top:10px;
}
</style>