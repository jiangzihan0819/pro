<template>
  <div class="right-header">
    <el-row>
      <el-col :span="12">
        <!-- 左侧面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in breadlist" :key="item">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="12" class="right-box">
        <!-- 右侧 -->
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎你, {{username}}
            <!-- 小三角，下拉框 -->
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal"><a class="nota" href="#/account/personal">个人中心</a></el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 头像 -->
            <el-avatar :src="imgUrl"></el-avatar>
        <!-- <img class="avatar" width="50" height="50" src="imgUrl" alt /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {API_CHECKTOKEN,API_GETPERSON} from '@/api/apis'
export default {
  data() {
    return {
      // 面包屑数组
      breadlist: ["首页"],
      username:'请登录',
      imgUrl:''
    };
  },
  methods: {
    handleCommand() {},
    //根据hash值变化，切换面包屑
    changeBreadlist(hash) {
      let arr = [];
      //根据hash值，改变面包屑数组
      switch (hash) {
        case "/home":
          arr = ["首页"];
          break;
        case "/order/order-list":
          arr = ["订单管理"];
          break;
        case "/shop":
          arr = ["店铺管理"];
          break;
        // 账号管理
        case "/account/account-add":
          arr = ["账号管理", "添加账号"];
          break;
        case "/account/pass-modify":
          arr = ["账号管理", "修改密码"];
          break;
        case "/account/account-list":
          arr = ["账号管理", "账号列表"];
          break;
        // 销售统计
        case "/total/goods-total":
          arr = ["销售统计", "商品统计"];
          break;
        case "/total/order-total":
          arr = ["销售统计", "订单统计"];
          break;
        // 商品管理
        case "/goods/goods-list":
          arr = ["商品管理", "商品列表"];
          break;
        case "/goods/goods-add":
          arr = ["商品管理", "商品添加"];
          break;
        case "/goods/goods-cate":
          arr = ["商品管理", "商品分类"];
          break;
      }

      this.breadlist = arr;
    }
  },
  // 检测某个数据(hash)的变化
  watch: {
    //监听路由对象的变化
    $route: {
      handler: val => {
        // 在这里this指向不正确，所以需要提前把this挂载到window上
        // 在这里取出this,调用对应的切换面包屑函数
        window._indexthis.changeBreadlist(val.path);
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    let hash = this.$route.path;

    //根据hash值改变左侧树菜单默认选中
    this.defaultActive = hash;
    //改变面包屑数组
    this.changeBreadlist(hash);

    //保存这个this
    window._indexthis = this;

    // 发送请求验证token是否过期
    API_CHECKTOKEN(localStorage.token).then((res)=>{
      if(res.data.code==0){
        this.username=localStorage.acc
      }else{
        this.username=<a href="/">请登录</a>
      }
    });

    // 重新请求个人中心页面 刷新
      API_GETPERSON(localStorage.id).then(res => {
      console.log(res);
      this.imgUrl = res.data.accountInfo.imgUrl;
    });
  }
};
</script>

<style lang="less" scoped>
.right-header {
  flex: 0 0 60px;
  line-height: 60px;
  background-color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
  .el-row {
    height: 60px;
    .el-col {
      height: 60px;
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
        margin-left: 10px;
      }
    }
    .right-box {
      justify-content: flex-end;
    }
  }
}
.nota{
  text-decoration:none;
  color: #000;
}
</style>