import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import store from './store'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import ColumnList from './components/ColumnList.vue'
import Create from './views/CreatePost.vue'
import PostDetail from './views/PostDetail.vue'
import Signup from './views/Signup.vue'

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
    // {
    //   path: '/column',
    //   name: 'columnList',
    //   component: ColumnList
    // },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta:{requiredLogin: true}
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostDetail
    },
    {
      path: '/signup',
      name: 'post',
      component: Signup
    }
  ]
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if(!user.isLogin){
    if(token){
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        redirectAlreadyLogin? next('/') : next()
      }).catch(e => {
        store.commit('logout')
        next('/login')
      })
    }else {
      requiredLogin ? next('/login') : next()
    }
  }else{
    requiredLogin ? next('/login') : next()
  }
})

export default router
