<template>
<div class="container">
  <Global-header :user="currtUser"></Global-header>
  <Loader v-if="isLoading"></Loader>
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
import { defineComponent, computed,watch } from 'vue'
import { useStore } from 'vuex'
import Loader from './components/Loader.vue'
import createMessage from './components/createMessage'
import GlobalHeader from './components/GlobalHeader.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProps } from '../src/store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup() {
    const store = useStore()
    const currtUser = computed(()=>store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    return {
      currtUser,
      isLoading,
      error
    }
  }
})
</script>

<style>

</style>
