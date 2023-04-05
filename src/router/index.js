import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from "js-cookie"
import AdminLayout from "@/views/layout/AdminLayout";
import StudentLayout from "@/views/layout/StudentLayout";
import SellerLayout from "@/views/layout/SellerLayout";
Vue.use(VueRouter)

const routes = [
    //登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/Login.vue')
  },
    //注册
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/user/Register.vue')
  },
  //学生主页
  {
    path: '/studentLayout',
    name: 'studentLayout',
    component: StudentLayout,
    redirect: '/studentMain',
    children: [
      {
        path: '/studentMain',
        name: 'studentMain',
        component: () => import('../views/home/StudentMain.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/student/Order.vue')
      },
      {
        path: '/collect',
        name: 'collect',
        component: () => import('../views/student/Collect.vue')
      },
      {
        path: '/myOrder',
        name: 'myOrder',
        component: () => import('../views/student/MyOrder.vue')
      },
      {
        path: '/myCollection',
        name: 'myCollection',
        component: () => import('../views/student/MyCollection.vue')
      },{
        path: '/previousStudentOrder',
        name: 'previousStudentOrder',
        component: () => import('../views/student/PreviousOrder.vue')
      },
    ]
  },
    //商家主页
  {
    path: '/sellerLayout',
    name: 'sellerLayout',
    component: SellerLayout,
    redirect: '/sellerMain',
    children: [
      {
        path: '/sellerMain',
        name: 'sellerMain',
        component: () => import('../views/home/SellerMain.vue')
      },
        //菜单
      {
        path: '/menu',
        name: 'menu',
        component: () => import('../views/seller/Menu.vue')
      },  
      {
        path: '/takeOrderUnfinished',
        name: 'takeOrderUnfinished',
        component: () => import('../views/seller/TakeOrderUnfinished.vue')
      },
      {
        path: '/takeOrderFinished',
        name: 'takeOrderFinished',
        component: () => import('../views/seller/TakeOrderFinished.vue')
      },
      {
        path: '/sendOrderUnfinished',
        name: 'sendOrderUnfinished',
        component: () => import('../views/seller/SendOrderUnfinished.vue')
      },
      {
        path: '/sendOrderFinished',
        name: 'sendOrderFinished',
        component: () => import('../views/seller/SendOrderFinished.vue')
      },
        //配送员
      {
        path: '/sender',
        name: 'sender',
        component: () => import('../views/seller/Sender.vue')
      },
      {
        path: '/previousSellerFood',
        name: 'previousSellerFood',
        component: () => import('../views/seller/PreviousFood.vue')
      },
      {
        path: '/previousSellerOrder',
        name: 'previousSellerOrder',
        component: () => import('../views/seller/PreviousOrder.vue')
      },
      {
        path: '/previousSellerSender',
        name: 'previousSellerSender',
        component: () => import('../views/seller/PreviousSender.vue')
      },
    ]
  },
   //管理员主页
  {
    path: '/',
    name: 'adminLayout',
    component: AdminLayout,
    redirect: '/adminHome',
    children: [ //子路由
      {
        path: '/adminHome',
        name: 'adminHome',
        component: () => import('../views/home/AdminHome.vue')
      },
      //学生列表
      {
        path: '/studentBaseInfo',
        name: 'studentBaseInfo',
        component: () => import('../views/admin/userManage/StudentBaseInfo.vue')
      },
      //学生订单
      {
        path: '/studentOrder',
        name: 'studentOrder',
        component: () => import('../views/admin/userManage/StudentOrder.vue')
      },
      //学生收藏
      {
        path: '/studentCollect',
        name: 'studentCollect',
        component: () => import('../views/admin/userManage/StudentCollect.vue')
      },
       //商家列表
       {
        path: '/sellerBaseInfo',
        name: 'sellerBaseInfo',
        component: () => import('../views/admin/userManage/SellerBaseInfo.vue')
      },
      //商家菜单
      {
        path: '/sellerMenu',
        name: 'sellerMenu',
        component: () => import('../views/admin/userManage/SellerMenu.vue')
      },
      //商家配送员
      {
        path: '/sellerSender',
        name: 'sellerSender',
        component: () => import('../views/admin/userManage/SellerSender.vue')
      },
      //订单管理
      {
        path: '/orderBaseInfo',
        name: 'orderBaseInfo',
        component: () => import('../views/admin/orderManage/OrderBaseInfo.vue')
      },
      //未完成的订单信息
      {
        path: '/orderUnfinishedInfo',
        name: 'orderUnfinishedInfo',
        component: () => import('../views/admin/orderManage/OrderUnfinishedInfo.vue')
      },
       //收藏管理
       {
        path: '/collectionBaseInfo',
        name: 'collectionBaseInfo',
        component: () => import('../views/admin/collectionManage/CollectionBaseInfo.vue')
      },
      //最近收藏
      {
        path: '/recentCollectionInfo',
        name: 'recentCollectionInfo',
        component: () => import('../views/admin/collectionManage/RecentCollectionInfo.vue')
      },
      //菜品管理
      {
        path: '/menuBaseInfo',
        name: 'menuBaseInfo',
        component: () => import('../views/admin/menuManage/MenuBaseInfo.vue')
      },
      //已推荐菜品
      {
        path: '/menuHaveRecommend',
        name: 'menuHaveRecommend',
        component: () => import('../views/admin/menuManage/MenuHaveRecommend.vue')
      },
      //配送员管理
      {
        path: '/senderBaseInfo',
        name: 'senderBaseInfo',
        component: () => import('../views/admin/senderManage/SenderBaseInfo.vue')
      },
      //在职配送员信息
      {
        path: '/senderAtWorkInfo',
        name: 'senderAtWorkInfo',
        component: () => import('../views/admin/senderManage/SenderAtWorkInfo.vue')
      },
      //往期学生
      {
        path: '/pastStudent',
        name: 'pastStudent',
        component: () => import('../views/admin/previous/PreviousStudent.vue')
      },
      //往期商家
      {
        path: '/pastSeller',
        name: 'pastSeller',
        component: () => import('../views/admin/previous/PreviousSeller.vue')
      },
      //往期订单
      {
        path: '/pastOrder',
        name: 'pastOrder',
        component: () => import('../views/admin/previous/PreviousOrder.vue')
      },
      //往期菜品
      {
        path: '/pastDishes',
        name: 'pastDishes',
        component: () => import('../views/admin/previous/PreviousFood.vue')
      },
      //往期配送员
      {
        path: '/pastSender',
        name: 'pastSender',
        component: () => import('../views/admin/previous/PreviousSender.vue')
      },
    ]
  },
  {
    path: '*',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
 router.beforeEach((to, from, next) => {
   const user = Cookies.get("user")
   if(!user && to.path !== '/login' && to.path !== '/register') return next("/login") //强制跳转到登录页面
   //符合条件放行
   next()
 })

export default router
