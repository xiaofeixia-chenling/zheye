import { createStore } from 'vuex'
import { testData } from './testData'
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
    }
  },
  actions:{},
  getters:{
    biggerColumnsLengs(state){
      // return state.posts.data.filter(c => c._id > 2).length
    },
    getColumns: (state) => {
      //return objToArr(state.columns.data)
      return testData
    },
  }
})
export default store