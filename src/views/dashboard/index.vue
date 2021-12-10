<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="6">
        <el-card class="box-card"
                 style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button"
                         type="text">Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4"
               :key="o"
               class="text item">
            {{ 'List item ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card"
                 style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button"
                         type="text">Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4"
               :key="o"
               class="text item">
            {{ 'List item ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card"
                 style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button"
                         type="text">Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4"
               :key="o"
               class="text item">
            {{ 'List item ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card"
                 style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button"
                         type="text">Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4"
               :key="o"
               class="text item">
            {{ 'List item ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div id="myChart"
               :style="{width: '100%', height: '300px'}"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  components: {
  },

  data () {
    return {
      size: 63

    }
  },

  mounted () {
    //this.$root => app
    document.getElementById("myChart").removeAttribute('_echarts_instance_');
    let myChart = echarts.init(
      document.getElementById("myChart")
    );
    // 绘制图表
    myChart.setOption({
      title: { text: "总用户量" },
      tooltip: {},
      xAxis: {
        data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
      },
      yAxis: {},
      series: [
        {
          name: "用户量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  },
  computed: {},

  methods: {}
}
</script>
<style lang='less'>
.dashboard .el-row {
  margin-bottom: 20px;
}
</style>
