<template>
  <div class="mt-4">
    <el-card shadow="hover" class="animate__animated animate__fadeIn">
      <template #header>
        <div class="card-header">
          <span style="font-weight: bolder; font-size: 30px">{{
            hospitalName
          }}</span>
          <el-button
            class="button"
            :type="handleType"
            size="large"
            @click="toDetail(hosid)"
            >detail</el-button
          >
        </div>
      </template>
      <div class="card-body">
        <div class="discribe">{{ discribe }}</div>
        <div class="status" :id="stStyle">{{ status }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    hospitalName: String,
    discribe: String,
    hosStatus: Number,
    hosid: Number
  },
  name: 'MyHospital',
  computed: {
    handleType() {
      if (this.hosStatus) {
        return 'danger'
      }
      return 'primary'
    },
    status() {
      if (this.hosStatus) {
        return '异常'
      }
      return '正常'
    },
    stStyle() {
      if (this.hosStatus) {
        return 'abnormal'
      }
      return 'normal'
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        path: `/detail/${id}`
      })
    }
  }
}
</script>

<style scoped>
.card-header {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-body {
  position: relative;
  padding-bottom: 20px;
}
.discribe {
  position: absolute;
  left: 40px;
}
.status {
  position: absolute;
  font-size: 30px;
  right: 10px;
  top: -10px;
}
#normal {
  color: rgb(118, 201, 155);
}
#abnormal {
  color: rgb(252, 0, 0);
}
</style>
