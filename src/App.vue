<template>
<div class="container">
  <column-list :list="list"/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
const testData: ColumnProps[] =[
  {
    id: 1,
    title: "总金额瑟吉欧1",
    avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
    descriptions: "sdfs"
  },
  {
    id: 2,
    title: "欧时力",
    avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
    descriptions: "家设计师的"
  }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList
  },
  setup(){
    return{
      list : testData
    }
  }
})
</script>

<style>

</style>
