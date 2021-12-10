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
import { getItemCount, getItemByOrgaId } from '@/api/api.js'
export default {
  data () {
    return {
      numberData: [
        {
          number: {
            number: [3],
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
            number: [20],
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
            number: [3],
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
            number: [2],
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '未完成项目数'
        }
      ],
      option: {
        title: {
          text: '组织项目饼状图',
          subtext: '百分比显示',
          left: 'center',
          textStyle: {
            color: 'white'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: [],
          textStyle: {
            color: 'white'
          }
        },
        series: [
          {
            name: '项目数',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: "white"
                }
              }
            }
          },

        ]
      }
    }
  },
  components: {
  },

  mounted () {
    this.getItemCount()
  },
  methods: {
    async getItemCount () {
      let myChart = echarts.init(
        document.getElementById("myChart")
      );
      await getItemCount().then(res => {
        let tatol = 0;
        res.data.forEach(element => {
          tatol += element.count
          this.option.legend.data.push(element.name)
          this.option.series[0].data.push({
            name: element.name,
            value: element.count,
            id: element.id
          })
        });
        this.numberData[1].number = {
          number: [tatol],
          textAlign: 'left',
          content: '{nt}',
          style: {
            fontSize: 24
          }
        }
        myChart.on('click', (param) => { //添加点击事件
          getItemByOrgaId({ orgaId: param.data.id }).then(res => {
            this.$emit('ok', res.data)
          })
        });
        // 绘制图表
        myChart.setOption(this.option);
      })
    }
  }

}
</script>

<style lang="less" scoped>
#centerLeft1 {
  padding: 16px;
  height: 651px;
  width: 100%;
  border-radius: 10px;
  .bg-color-black {
    height: 651px - 30px;
    width: 100%;
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
