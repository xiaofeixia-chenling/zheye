import { createStore, Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
axios.defaults.baseURL = 'http://api.vikingship.xyz/api'
axios.defaults.headers['Access-Control-Allow-Origin'] = "*"
import { arrToObj, objToArr } from './helper'
export interface ResponseType<P = {}> {
  code: number
  msg: string
  data: P
}
export interface UserProps {
  isLogin: boolean
  name?: string
  nickName?: string
  _id?: string
  column?: string
  email?: string
  avatar?: ImageProps
  description?: string
}
export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string | UserProps
  isHTML?: boolean
}
interface ListProps<P> {
  [id: string]: P
}
export interface GlobalErrorProps {
  status: boolean
  message?: string
}
export interface GlobalDataProps {
  token: string
  error: GlobalErrorProps
  loading: boolean
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number }
  posts: { data: ListProps<PostProps>; loadedColumns: string[] }
  user: UserProps
}
const asyncAndCommit = async(url: string, mutationName: string,
  commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}

/**
 * 测试用户
 * 111@test.com
 * 111111
 * 请用这个号登陆方能发布文章
 */
const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    error: { status: false },
    loading: false,
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: { isLogin: false }
  },
  mutations: {
    login(state, rawData){
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout(state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.remove('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchCurrentUser(state, rawData){
      state.user = {isLogin : true, ...rawData.data }
    },
    fetchColumns(state, rawData){
      const { data } = state.columns
      const { list, count, currentPage } = rawData.data
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: currentPage * 1
      }
    },
    fetchColumn(state, rawData){
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts(state, { data: rawData, extraData: columnId }){
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
      state.posts.loadedColumns.push(columnId)
    },
    fetchPost(state, rawData){
      state.posts.data[rawData.data._id] = rawData.data
    },
    updatePost(state, {data}){
      state.posts.data[data._id] = data
    },
    deletePost(state, {data}){
      delete state.posts.data[data._id]
    },
    createPost(state, newPost){
      state.posts.data[newPost._id] = newPost
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
  },
  actions:{
    login({ commit }, payload){
      return asyncAndCommit(`/user/login`, 'login', commit, { method: 'post', data: payload})
    },
    fetchCurrentUser({ commit }){
      return asyncAndCommit(`/user/current`, 'fetchCurrentUser', commit)
    },
    loginAndFetch({ dispatch }, loginData){
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    fetchColumns({ state, commit }, params = {}){
      const { currentPage = 1, pageSize = 3 } = params
      if (state.columns.currentPage < currentPage) {
        return asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
      }
    },
    fetchColumn({ state, commit }, cid){
      if (!state.columns.data[cid]) {
        return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    fetchPosts({ state, commit }, cid){
      if (!state.posts.loadedColumns.includes(cid)) {
        return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
      }
    },
    fetchPost({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    },
    updatePost({ commit }, {id, payload}){
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {method: 'patch', data: payload})
    },
    deletePost({ commit }, id){
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, {method: 'delete'})
    },
    createPost({ commit }, payload){
      return asyncAndCommit(`/posts`, 'createPost', commit, {method: 'post', data: payload})
    },
  },
  getters:{
    getColumns: (state) => {
      return objToArr(state.columns.data)
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    },
    getPostsByCid:(state) =>(cid: string)=>{
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  }
})
export default store