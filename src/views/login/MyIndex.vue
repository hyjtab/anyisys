<template>
  <div class="box">
    <div class="div-form">
      <h1 style="margin-bottom: 40px">安疫系统登录界面</h1>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" class="form">
        <el-form-item prop="username" class="username_form">
          <el-input
            v-model="form.username"
            placeholder="Please input your account number"
            :prefix-icon="Avatar"
            clearable
            style="margin-bottom: 20px"
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
            style="margin-bottom: 20px"
          />
        </el-form-item>
        <el-button class="button_form" type="primary" @click="clickHandler"
          >登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'
import { Avatar, Lock } from '@element-plus/icons-vue'
const store = useStore()
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
      store.dispatch('app/login', form.value)
    } else {
      ElMessage.error('登录失败')
      return false
    }
  })
}
</script>

<style scoped>
.box {
  background-color: rgba(179, 245, 239, 0.822);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
}
.div-form {
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  width: 600px;
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
