<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          type="text"
          v-model="emailVal"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'

export default defineComponent({
  name: 'Login',
  components:{
    ValidateForm,
    ValidateInput
  },
  setup(){
    const inputRef = ref<any>()
    const emailVal = ref('123@test.com')
    const passwordVal = ref(123)

    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const onFormSubmit = (result: boolean)=> {
      if (result) {
        console.log('调用登录接口')
      }
    }
    return {
      emailRules,
      onFormSubmit,
      emailVal,
      passwordVal
    }
  }
})
</script>