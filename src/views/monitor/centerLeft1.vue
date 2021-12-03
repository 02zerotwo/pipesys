<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar"
                class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">项目数据统计</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <div id="myChart"
             :style="{width: '100%', height: '480px'}"></div>
      </div>
      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div class="item-box mt-2"
             v-for="(item, index) in numberData"
             :key="index">
          <div class="d-flex">
            <span class="coin">
              <el-icon>
                <i-files />
              </el-icon>
            </span>
            <dv-digital-flop class="dv-digital-flop"
                             :config="item.number" />
          </div>
          <p class="text"
             style="text-align: center;">
            {{ item.text }}

          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      numberData: [
        {
          number: {
            number: [15],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '已完成项目数'
        },
        {
          number: {
            number: [1144],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '项目总数'
        },
        {
          number: {
            number: [361],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '异常项目数'
        },
        {
          number: {
            number: [157],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '未完成项目数'
        }
      ]
    }
  },
  components: {
  },
  mounted () {
    this.changeTiming()
    this.initEcharts()
  },
  methods: {
    changeTiming () {
      setInterval(() => {
        this.changeNumber()
      }, 3000)
    },
    changeNumber () {
      this.numberData.forEach((item, index) => {
        item.number.number[0] += ++index
        item.number = { ...item.number }
      })
    },
    initEcharts () {
      let myChart = echarts.init(
        document.getElementById("myChart")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: '组织项目饼状图',

          subtext: '百分比显示',
          left: 'center',
          textStyle: {
            color: 'white'
          }
        },

        legend: {
          bottom: 10,
          left: 'center',
          data: ['组织1', '组织2', '组织4', '组织3', '组织5'],
          textStyle: {
            color: 'white'
          }
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              { value: 1548, name: '组织5' },
              { value: 735, name: '组织3' },
              { value: 510, name: '组织4' },
              { value: 434, name: '组织2' },
              { value: 335, name: '组织1' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },

        ]
      });
    }
  }

}
</script>

<style lang="less" scoped>
#centerLeft1 {
  padding: 16px;
  height: 651px;
  width: 410px;
  border-radius: 10px;
  .bg-color-black {
    height: 651px - 30px;
    width: 470px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    .item-box {
      & > div {
        padding-right: 5px;
      }
      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }
      // 金币
      .coin {
        position: relative;
        top: 6px;
        font-size: 20px;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>
