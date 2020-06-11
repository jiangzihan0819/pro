<template>
  <div class="left-menu">
    <!-- 导航 -->
    <el-menu
      :default-active="$route.path"
      router
      text-color="#fff"
      background-color="#304156"
      unique-opened
    >
      <img style="width:60px;margin:10px 0 0 30%" src="../../assets/imgs/宇宙星球-10.png" alt />
      <!-- 有子级的导航栏 -->
      <div v-for="item in newtreelist" :key="item.index">
        <el-submenu :index="item.index" v-if="item.children">
          <template slot="title">
            <i :class="item.icls"></i>
            <span>{{item.title}}</span>
          </template>
          <!-- 二级儿子 -->
          <el-menu-item
            v-for="child in item.children"
            :key="child.index"
            :index="child.index"
          >{{ child.title}}</el-menu-item>
        </el-submenu>

        <!-- 没有子级的导航栏 -->
        <el-menu-item :index="item.index" v-else>
          <i :class="item.icls"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: "",
      treelist: [
        // 后台首页
        {
          index: "/home",
          icls: "el-icon-s-home",
          title: "后台首页",
          role: ["super", "normal"]
        },
        // 订单管理
        {
          index: "/order/order-list",
          icls: "el-icon-s-order",
          title: "订单管理",
          role: ["super", "normal"]
        },
        // 商品管理
        {
          index: "goods",
          icls: "el-icon-s-goods",
          title: "商品管理",
          role: ["super"],
          children: [
            { index: "/goods/goods-list", title: "商品列表" },
            { index: "/goods/goods-add", title: "商品添加" },
            { index: "/goods/goods-cate", title: "商品分类" }
          ]
        },
        // 店铺管理
        {
          index: "/shop",
          icls: "el-icon-s-shop",
          title: "店铺管理",
          role: ["super", "normal"]
        },
        // 账号管理
        {
          index: "account",
          icls: "el-icon-user-solid",
          title: "账号管理",
          role: ["super"],
          children: [
            { index: "/account/account-list", title: "账号列表" },
            { index: "/account/account-add", title: "账号添加" },
            { index: "/account/pass-modify", title: "修改密码" }
          ]
        },
        // 销售统计
        {
          index: "total",
          icls: "el-icon-pie-chart",
          title: "销售统计",
          role: ["super"],
          children: [
            { index: "/total/goods-total", title: "商品统计" },
            { index: "/total/order-total", title: "订单统计" }
          ]
        }
      ]
    };
  },
  created() {
    this.role = localStorage.role;
  },
  computed: {
    newtreelist() {
      // return this.treelist.filter(i=>i.role.includes(this.role))//终极简化版

      //理清思路版
      var newarr = this.treelist.filter(item => {
        return item.role.includes(this.role);
      });
      return newarr;
    }
  }
};
</script>

<style lang="less" scoped>
.left-menu {
  flex: 0 0 200px;
  background-color: #304156;
  .el-menu {
    border-right: 0px;
    .el-menu-item {
      .iconfont {
        color: #fff;
        margin-right: 10px;
      }
    }
    .el-submenu {
      .el-submenu__title {
        .iconfont {
          color: #fff;
          margin-right: 10px;
        }
      }
      /deep/.el-menu {
        .el-menu-item {
          background-color: #202f3f !important;
        }
      }
    }
  }
}
</style>