<template>
<div class="row">
  <div v-for="column in list" :key="column.id" class="col-4 mb-4">
    <div class="card h-100 shadow-sm">
      <div class="card-body text-center">
        <img :src="column.avatar" class="rounded-circle border border-light my-3" :alt="column.title">
        <h5 class="card-title">{{column.title}}</h5>
        <p class="card-text text-left">{{column.description}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface ColumnProps{
  id: number
  title: string
  avatar: string
  descriptions: string
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  }
  // setup(props){

  // },
})
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
