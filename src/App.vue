<template>
<div class="container">
  <column-list :list="list"/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList from './components/ColumnList.vue'
import { testData } from '../src/testData'
import 'bootstrap/dist/css/bootstrap.min.css'

export default defineComponent({
  name: 'App',
  components: {
    ColumnList
  },
  setup() {
    return {
      list :testData
    }
  }
})
</script>

<style>

</style>
