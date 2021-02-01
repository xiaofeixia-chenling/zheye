<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input type="file" ref="fileInput" @change="handleFileUploaded" class="file-input d-none">
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean;
import axios from 'axios'
export default defineComponent({
  props: {
    action:{
      type: String,
      required: true
    },
    uploaded: {
      type: Object
    },
    beforeUpload:{
      type: Function as PropType<CheckFunction>
    }
  },
  inheritAttrs: false, //此属性作用：让此子组件不要集成默认的atrrbuite，
  //作用是就算在父组件引用这个组件时添加的class也作用到此子组件中，不是父组件中
  //使用： 分两步： 1，添加inheritAttrs: false；2，在子组件的跟加上v-bind="$attrs"
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const uploadedData = ref(props.uploaded)
    watch(() => props.uploaded, (newValue) => {
      if (newValue) {
        fileStatus.value = 'success'
        uploadedData.value = newValue
      }
    })
    const  triggerUpload= () => {
      fileInput.value && fileInput.value.click()
    }
    const  handleFileUploaded= (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if(currentTarget.files){
        const files = Array.from(currentTarget.files)
        if(props.beforeUpload){
          const result = props.beforeUpload(files[0])
          if(!result){
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios.post(props.action, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }).then(resp => {
          fileStatus.value = 'success';
          uploadedData.value = resp.data
          context.emit('file-uploaded', resp.data)
        }).catch((error) => {
          fileStatus.value = 'error';
          context.emit('file-uploaded-error', { error })
        }).finally(() => {
          fileInput.value && (fileInput.value.value = '')
        })
      }
    }
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileUploaded,
      uploadedData
    }
  }
})
</script>
