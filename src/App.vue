<template>
<div class="container">
  <Global-header :user="user"></Global-header>
  <router-view></router-view>
  <footer class="text-center py-4 text-secondary bg-light mt-6">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">© 2020 者也专栏</li>
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多</li>
      </ul>
    </small>
  </footer>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import ColumnList from './components/ColumnList.vue'
import GlobalHeader from './components/GlobalHeader.vue'
import { testData } from '../src/testData'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProps } from '../src/store'

export const testData2: UserProps = {
  isLogin: false,
  nickName: 'test1的专栏',
  _id: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
  column:'sdfsdfsd',
  email: 'sdfsid@dsfjsdkj',
  avatar: {},
  description: 'sdji',
}
export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader
  },
  setup() {
  //  console.log(testData2)
    return {
      list :testData,
      user: testData2
    }
  }
})
</script>

<style>

</style>
