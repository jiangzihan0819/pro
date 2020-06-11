<template>
  <div class="login">
    <el-form class="login-form" label-width="50px" size="small">
      <h3>某团外卖系统登录</h3>
      <!-- 账号 -->
      <el-input v-model="acc" size="small" prefix-icon="iconfont icon-icon_account"></el-input>
      <!-- 密码 -->
      <el-input
        class="login-pwd"
        v-model="pwd"
        size="small"
        prefix-icon="iconfont icon-mimaffffffpx"
        suffix-icon="iconfont icon-yanjing_bi1"
      ></el-input>
      <!-- 登录按钮 -->
      <el-button class="login-btn" @click="clickLogin" size="small " type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      error_text:false,
      isreq:true
    };
  },
  methods: {
    clickLogin() {
      // 防抖节流
      if(this.isreq==false) return

      // 发送一次登陆请求
      this.isreq=false

      //发送请求 
      axios
        .post("http://127.0.0.1:5000/users/checkLogin", {
          account: this.acc,
          password: this.pwd
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "登陆成功，即将跳转首页",
              type: "success",
            });
            localStorage.token=res.data.token//保存token到浏览器
            localStorage.acc=this.acc//保存用户名到浏览器
            console.log(localStorage.id);
            
            localStorage.id=res.data.id//保存id到浏览器,后面上传头像会用到
            localStorage.role=res.data.role//保存权限到本地
            // 计时器两秒后跳转首页
            setTimeout(()=>{
              this.$router.push('/home')
            },100);
          }else{
            this.$message.error('账号或密码错误');            
          }
        });
        // 5秒后才可以进行再次点击
        setTimeout(()=>{
          this.isreq=true
        },5000)
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  h3 {
    color: #fff;
    text-align: center;
  }
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 420px;
    .login-pwd {
      margin-top: 8px;
    }
    .el-button {
      width: 100%;
      margin-top: 8px;
    }
  }
}
</style> 

