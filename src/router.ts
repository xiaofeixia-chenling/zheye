import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import ColumnList from './components/ColumnList.vue'
import Create from './views/CreatePost.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/index',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{redirectAlreadyLogin: true}
    },
    {
      path: '/column',
      name: 'columnList',
      component: ColumnList
    },
    {
      path: '/column/:id',
      name: 'columnDetail',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta:{requiredLogin: true}
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.meta.requiredLogin && !store.state.user.isLogin){
    next({name: 'login'})
  }else if(to.meta.redirectAlreadyLogin && store.state.user.isLogin){
    next('/')
  }else{
    next()
  }
})

export default router
