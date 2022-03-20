<template>
  <el-container class="app-wrapper">
    <el-header class="header-container">
      <div class="header">
        <p style="font-family: SimSun">
          <span class="Logo">Anyisys</span>
          安疫疫苗管理系统
        </p>
      </div>
    </el-header>
    <el-main class="container">
      <div class="searchbar">
        <el-input
          size="large"
          v-model="input3"
          placeholder="Please input"
          class="input-with-select"
        >
          <template #append>
            <el-button type="primary" plain @click="filterHandler"
              ><el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>
      </div>
      <div style="width: 60%; margin: auto">
        <my-hospital
          v-for="hospital in hosList"
          :key="hospital.hospital_id"
          :hospitalName="hospital.hospital_name"
          :discribe="hospital.hospital_discribe"
          :hosStatus="hospital.hospital_status"
          :hosid="hospital.hospital_id"
        />
      </div>
    </el-main>
    <el-footer class="footer-container">
      <div class="footer">CopyRightBy啦啦啦</div>
    </el-footer>
  </el-container>
</template>

<script>
import { ElMessage } from 'element-plus'
import { detail } from '../api/detail'
import { Search } from '@element-plus/icons-vue'
import MyHospital from './MyHospital.vue'
export default {
  data() {
    return {
      hospList: null,
      hosList: null,
      input3: ''
    }
  },
  methods: {
    filterHandler() {
      this.hosList = this.hospList.filter((h) => {
        return h.hospital_name.indexOf(this.input3) !== -1
      })
    }
  },
  created() {
    detail()
      .then((res) => {
        this.hospList = res.data
        this.hosList = res.data
      })
      .catch((err) => {
        ElMessage.error(err.message)
        this.hospList = []
        this.hosList = []
      })
  },
  components: {
    Search,
    MyHospital
  },
  watch: {
    input3(val) {
      this.hosList = this.hospList.filter((h) => {
        return h.hospital_name.indexOf(val) !== -1
      })
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  margin: auto;
  margin-top: 0px;
  padding-top: 5px;
  text-align: center;
  font-size: 2em;
}
.footer {
  width: 100%;
  height: 50px;
  color: #dedede;
  margin-top: 10px;
  text-align: center;
  font-size: 10px;
}
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.header-container {
  flex: 0;
  background: rgb(90, 180, 253);
}
.container {
  flex: 1;
  background: #dedede;
}
.footer-container {
  width: 100%;
  flex: 0;
  background: rgb(46, 43, 43);
}
.Logo {
  font-weight: bolder;
  color: #d0f0a7;
  font-family: '微软雅黑';
  float: left;
}
.searchbar {
  margin: auto;
  margin-bottom: 30px;
  width: 60%;
}
</style>
