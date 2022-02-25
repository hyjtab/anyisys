<template>
  <div class="div-form">
    <h1 style="margin-bottom: 10px">安疫系统登录界面</h1>
    <el-form ref="ruleFormRef" :model="form" :rules="rules" class="form">
      <el-form-item prop="username" class="username_form">
        <el-input
          v-model="form.username"
          placeholder="Please input your account number"
          :prefix-icon="Avatar"
          clearable
        />
      </el-form-item>
      <el-form-item prop="password" class="password_form">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="Please input your password"
          show-password
          :prefix-icon="Lock"
          clearable
        />
      </el-form-item>
      <el-button class="button_form" type="primary" @click="clickHandler"
        >登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { login } from '@/api/login'
import { ref, reactive } from 'vue'
import { Avatar, Lock } from '@element-plus/icons-vue'
const form = ref({
  username: 'admin',
  password: '123456'
})
const rules = reactive({
  username: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ]
})
const ruleFormRef = ref(null)
const clickHandler = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      login(form.value).then((response) => {
        console.log(response)
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style>
body {
  background-color: rgba(155, 231, 236, 0.938);
}
.div-form {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  width: 500px;
}
.form {
  width: 100%;
}
.button_form {
  width: 100%;
}
.username_form {
  width: 100%;
  margin-bottom: 20px;
}
.password_form {
  width: 100%;
  margin-bottom: 20px;
}
</style>
