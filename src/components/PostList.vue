<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <!-- <h4><router-link :to="`/posts/${post._id}`">{{post.title}}</router-link></h4> -->
        <h4 class="pot" @click="goPage(post._id)">{{post._id}}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img :src="post.image.fitUrl" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PostProps, ImageProps } from '../store'
import { generateFitUrl } from '../helper'
import  router  from '../router'

export default defineComponent({
  name: 'PostList',
  components: {
    
  },
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup(props) {
    const posts = computed(() => {
      return props.list.map(post => {
        generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        return post
      })
    })
    const goPage = (id: string) => {
      // console.log(id)
      router.push({name: 'post', params:{id: id}})
    }
    return {
      posts,
      goPage
    }
  },
})
</script>
<style scoped>
.pot{
  cursor: pointer;
}
.pot:hover{
  color: blue;
  text-decoration: underline;
}
</style>