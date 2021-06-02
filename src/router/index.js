import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },{
    path: '/showProduct',
    name:'ShowProduct',
    component: () => import('../views/ShowProduct')
  },
  {
    path: '/product',
    component: () => import('../views/Product')
  },
  {
    path: '/shopCart',
    component: () => import('../views/ShopCart')
  },
  {
    path: '/accountInfo',
    component: () => import('../views/AccountInfo'),
    children:[
      {
        path: '',
        redirect:'myOrder'
      },
      {
        path:'myOrder',
        component:() => import('../views/account/MyOrder')
      },
      {
        path: 'afterSales',
        component:() => import('../views/account/AfterSales')
      },
      {
        path:'myOffer',
        component:() => import('../views/account/MyOffer')
      },
      {
        path: 'userInfo',
        component:() => import('../views/account/UserInfo')
      },
      {
        path:'shopAddress',
        component:() => import("../views/account/ShopAddress")
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    component: () => import('../views/Register')
  },
  {
    path: '/paymentPage',
    name:'PaymentPage',
    component: () => import('../views/PaymentPage')
  },
  {
    path:'/payOk',
    name:'PayOk',
    component: () => import('../views/PayOk')
  },
  {
    path:'/unopened',
    component: () => import('../views/Unopened')
  },
  {
    path:'/test',
    component: () => import('../views/Test')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
