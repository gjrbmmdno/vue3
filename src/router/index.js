import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../views/home/Home');
const Categroy = () => import('../views/category/Category');
const Detail = () => import('../views/detail/Detail');
const Profile = () => import('../views/profile/Profile');
const ShopCart = () => import('../views/shopcart/ShopCart');
const Register = () => import ('../views/profile/Register');
const Login = ()=> import('../views/profile/Login');
const Address = () => import('../views/profile/Address');
const AddressEdit = () => import('../views/profile/AddressEdit');
const CreateOrder = () => import('../views/order/CreateOrder');
const Order = () => import('../views/order/Order');
const OrderDetail = () => import('../views/order/OrderDetail');

import store from '../store';

import {Toast , Notify} from 'vant';

const routes = [
  {
    path: '',
    redirect:"Home",
    name: 'DefaultHome',
    meta: {
      title:'图书兄弟首页'
    }
  },

  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '图书兄弟首页'
    }
  },

  {
    path: '/category',
    name: 'Category',
    component: Categroy,
    meta: {
      title: '图书兄弟-商品分类'
    }
  },

  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: '图书兄弟-商品详情'
    }
  },

  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    meta: {
      title: '图书兄弟-购物车',
      isAuthRequired:true,

    }
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '图书兄弟-个人中心',
      isAuthRequired:true,

    }
  },

  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: {
      title:'图书兄弟-地址管理',
      isAuthRequired:true
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta: {
      title:'图书兄弟-编辑地址',
      isAuthRequired:true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      title:'图书兄弟-生成订单',
      isAuthRequired:true 
    }
  },
  {
    path: '/createorder',
    name: 'CreateOrder',
    component: CreateOrder,
    meta: {
      title:'图书兄弟-订单预览',
      isAuthRequired:true
    }
  },
  {
    path: '/orderdetail',
    name: 'OrderDetail',
    component: OrderDetail,
    meta: {
      title:'图书兄弟-订单详情',
      isAuthRequired:true
    }
  },

  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '图书兄弟-用户注册'
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '图书兄弟-用户登录'
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//导航守卫
router.beforeEach((to,from,next)=>{
  //如果没有登录，在这里到login
  //前置导航首位,要去哪个路由

  //需要授权，
  if(to.meta.isAuthRequired && store.state.user.isLogin === false){
    Notify('你还没有登录，请先登录');
    return next('./login');
  }else{
    next();
  }
  document.title = to.meta.title
})

export default router
