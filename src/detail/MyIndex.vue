<template>
  <el-container class="app-wrapper">
    <el-header class="header-container">
      <div class="header">
        {{ hospital_name }}第{{ vaccine_id }}批次疫苗温度状况
      </div>
    </el-header>
    <el-container class="container">
      <el-aside class="sidebar"
        ><div class="intro">
          <p>医院：{{ hospital_name }}</p>
          <br />
          <br />
          <p>疫苗型号：{{ vaccine_id }}</p>
          <br />
          <br />
          <p>警戒温度：{{ temprature }}</p>
          <br />
          <br />
          <p>上次报警：{{ alert_time }}</p>
        </div>
      </el-aside>
      <el-main class="chart"><div id="customerChart"></div></el-main>
    </el-container>
  </el-container>
</template>

<script>
import moment from 'moment'
import * as echarts from 'echarts'
import { chart } from '../api/chart'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      hospital_name: null,
      vaccine_id: null,
      temprature: null,
      alert_time: null,
      res: null,
      data_get: '-2.8,-3.2,-2.7,-3,-2.8'
    }
  },
  computed: {
    data: function () {
      const d = this.data_get.split(',')
      for (let i = 0; i < 5; i++) {
        d[i] = Number(d[i])
      }
      return d
    },
    range: function () {
      const d = this.data_get.split(',')
      for (let i = 0; i < 5; i++) {
        d[i] = Number(d[i])
      }
      return d.sort()
    },
    date: function () {
      moment.locale()
      const t = []
      for (let i = 4; i >= 0; i--) {
        t.push(moment().subtract(i, 'minutes').format('LT'))
      }
      return t
    }
  },
  created() {
    chart(Number(this.$route.params.id))
      .then((res) => {
        this.res = res.data
        this.hospital_name = this.res.hospital_name
        this.vaccine_id = this.res.vaccine_name
        this.temprature = this.res.alert_temp
        if (this.res.alert_time === null) {
          this.alert_time = '暂无警报'
        } else {
          this.alert_time = this.res.alert_time
        }
      })
      .catch((err) => {
        ElMessage.error(err.message)
      })
  },
  mounted() {
    const myChart = echarts.init(document.getElementById('customerChart'))
    // 绘制图表
    myChart.setOption({
      backgroundColor: '#ffffff', // 背景色
      visualMap: {
        range: [-100, this.range[0]],
        precision: 0.1,
        show: false,
        type: 'continuous',
        inRange: {
          // 定义 在选中范围中 的视觉元素
          color: ['rgb(90, 180, 253)'],
          colorLightness: [0, 0.6]
        },
        outOfRange: {
          // 定义 在选中范围外 的视觉元素。
          color: ['red']
        },
        min: this.range[0],
        max: this.range[4]
      },
      title: {
        text: '疫苗温度',
        textStyle: {
          fontSize: 20
        },
        left: 'center',
        itemGap: 30
      },
      xAxis: {
        name: '时间',
        nameLocation: 'center',
        nameTextStyle: {
          fontSize: 20
        },
        nameGap: 25,
        data: this.date
      },
      yAxis: {
        name: '温度/℃',
        nameTextStyle: {
          fontSize: 20
        },
        nameGap: 25,
        type: 'value',
        min: function (value) {
          return value.min - 0.1
        },
        max: function (value) {
          return value.max + 0.1
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [
        {
          showSymbol: false,
          name: this.vaccine_id,
          type: 'line',
          data: this.data,
          smooth: true
        }
      ]
    })
    window.onresize = function () {
      // 自适应大小
      myChart.resize()
    }
  }
}
</script>

<style>
.header {
  width: 100%;
  height: 50px;
  margin: auto;
  margin-top: 0px;
  padding-top: 5px;
  text-align: center;
  font-size: 2em;
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
  background: #ffffff;
}
.sidebar {
  position: relative;
  width: 10%;
  background-color: rgba(179, 245, 239, 0.822);
}
.chart {
  position: relative;
}
.intro {
  top: 10%;
  left: 10%;
  width: 80%;
  position: absolute;
}
#customerChart {
  margin: auto;
  height: 60%;
  width: 80%;
  top: 20%;
  left: 10%;
  position: absolute;
}
</style>
