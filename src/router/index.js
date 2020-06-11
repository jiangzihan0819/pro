import Vue from "vue";
import VueRouter from "vue-router";

// 解决跳重复跳转到同一个地址的警告问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch((error) => error);
};

Vue.use(VueRouter);

// 引入组件
import Login from "../pages/Login.vue";
import Layout from "../pages/Layout/Layout.vue";
import { API_CHECKTOKEN } from '@/api/apis';

// 路由配置
const routes = [
    // 登录
    {
        path: "/",
        name: 'Login',
        component: Login,
    },
    // 默认首页 -- 报表
    {
        path: "/",
        component: Layout,
        redirect: "/home",
        children: [{
            meta: { title: "后台首页" },
            path: "home",
            component: () =>
                import ("@/pages/Home.vue"),
        }, ],
    },
    // 订单管理
    {
        path: "/order",
        component: Layout,
        meta: { title: "订单管理" },
        redirect: "/order/order-list",
        children: [{
                path: "order-list",
                meta: { title: "订单列表" },
                component: () =>
                    import ("@/pages/Order/OrderList.vue"),
            },
            {
                meta: {
                    title: "订单详情"
                },
                path: "order-details",
                name: "order-details",
                visible: false,
                component: () =>
                    import ("@/pages/Order/OrderDetail.vue"),
            },
        ],
    },
    // 商品管理
    {
        path: "/goods",
        component: Layout,
        meta: { title: "商品管理" },
        redirect: "/goods/goods-list",
        children: [{
                path: "goods-list",
                meta: { title: "商品列表" },
                component: () =>
                    import ("@/pages/Goods/GoodsList.vue"),
            },
            {
                path: "goods-add",
                meta: { title: "商品添加" },
                component: () =>
                    import ("@/pages/Goods/GoodsAdd.vue"),
            },
            {
                path: "goods-cate",
                meta: { title: "商品分类" },
                component: () =>
                    import ("@/pages/Goods/GoodsCate.vue"),
            },
        ],
    },
    // 店铺管理
    {
        path: "/shop",
        component: Layout,
        children: [{
            path: "",
            meta: { title: "店铺管理" },
            component: () =>
                import ("@/pages/Shop.vue"),
        }, ],
    },
    // 账号管理
    {
        path: "/account",
        component: Layout,
        meta: { title: "账号管理" },
        redirect: "/account/account-list",
        children: [{
                path: "account-list",
                meta: { title: "账号列表" },
                component: () =>
                    import ("@/pages/Account/AccountList.vue"),
            },
            {
                path: "account-add",
                meta: { title: "账号添加" },
                component: () =>
                    import ("@/pages/Account/AccountAdd.vue"),
            },
            {
                path: "pass-modify",
                meta: { title: "修改密码" },
                component: () =>
                    import ("@/pages/Account/PassModify.vue"),
            },
            {
                path: "personal",
                meta: { title: "个人中心" },
                component: () =>
                    import ("@/pages/Account/Personal.vue"),
            },
        ],
    },
    // 销售统计
    {
        path: "/total",
        component: Layout,
        meta: { title: "销售统计" },
        redirect: "/total/goods-total",
        children: [{
                path: "goods-total",
                meta: { title: "商品统计" },
                component: () =>
                    import ("@/pages/Total/GoodsTotal.vue"),
            },
            {
                path: "order-total",
                meta: { title: "订单统计" },
                component: () =>
                    import ("@/pages/Total/OrderTotal.vue"),
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
    from
    // console.log(to, from);

    if (to.path != '/') {
        API_CHECKTOKEN(localStorage.token).then(res => {
            if (res.data.code == 0) {
                next()
            } else {
                next('/')
            }
        })
    } else next()
})



export default router;