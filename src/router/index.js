import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const login = ()=>import('../views/login.vue')
const home = ()=>import('../views/home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:home
  },
  {
    path:'/login',
    component:login
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
