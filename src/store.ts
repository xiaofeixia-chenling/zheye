import { createStore, Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
axios.defaults.baseURL = 'http://api.vikingship.xyz/api'
axios.defaults.headers['Access-Control-Allow-Origin'] = "*"
import { arrToObj, objToArr } from './helper'
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
    login(state){
      state.user = { ...state.user, isLogin: true, name: 'viking'}
    },
    createPost(state, newPost){
      state.posts.data[newPost._id] = newPost
    },
    fetchColumns(state, rawData){
      const { data } = state.columns
      const { list, count, currentPage } = rawData.data
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: currentPage * 1
      }
    }
  },
  actions:{
    fetchColumns({ state, commit }, params = {}){
      const { currentPage = 1, pageSize = 5 } = params
      if (state.columns.currentPage < currentPage) {
        return asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
      }
    }
  },
  getters:{
    biggerColumnsLengs(state){
      // return state.posts.data.filter(c => c._id > 2).length
    },
    getColumns: (state) => {
      return objToArr(state.columns.data)
    },
  }
})
export default store