<template>
  <div id="center">
    <dv-border-box-8 class="top">
      <dv-scroll-board class="dv-scr-board"
                       :config="config"
                       @click="itemRow"
                       ref="scrollBoard" />
    </dv-border-box-8>

    <div class="down">
      <div class="ranking ">

        <span class="fs-xl text mx-2 mb-1 pl-3">{{itemName}}管道实时监测</span>
        <dv-scroll-board :config="config1"
                         ref="pipe"
                         style="width:100%;height:380px"
                         @click="clickPipe" />
      </div>
      <div class="percent">

        <div class="bg-color-black item"
             v-for="item in titleItem"
             :key="item.title">
          <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
          <div>
            <span style="color:#0EDDAD;font-size:20px;margin-top:24px">{{item.name}}</span>
          </div>
        </div>
        <div class="bg-color-black item">
          <p class="ml-3 colorBlue fw-b fs-xl">{{ currentNbumer.title }}</p>
          <div>
            <dv-digital-flop class="dv-dig-flop ml-1 mt-2 pl-3"
                             :config="currentNbumer.number" />
          </div>
        </div>
        <div class="water">
          <dv-water-level-pond class="dv-wa-le-po"
                               :config="water" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      itemName: '',
      titleItem: [
        {
          title: '管道名称',
          name: ''
        },
        {
          title: '设备名称',
          name: ''
        },
        {
          title: '传感器名称',
          name: ''
        },


      ],
      currentNbumer: {
        title: '当前值',
        number: {

        }
      },
      config: {
        header: ['项目编号', '项目名称', '项目地址'],
        data: [
        ],
        rowNum: 3, //表格行数
        headerHeight: 50,
        headerBGC: '#0f1325', //表头
        oddRowBGC: '#0f1325', //奇数行
        evenRowBGC: '#171c33', //偶数行
        columnWidth: [200, 200, 200],
        align: ['center']
      },
      config1: {
        header: ['管道编号', '管道名称', '报警信息'],
        data: [
        ],
        rowNum: 4, //表格行数
        headerHeight: 50,
        headerBGC: '#0f1325', //表头
        oddRowBGC: '#0f1325', //奇数行
        evenRowBGC: '#171c33', //偶数行
        columnWidth: [110, 120, 220],
        align: ['center']
      },
      water: {

      },
      pipeList: {},
      pipeId: '',
      itemId: ''
    }
  },
  components: {

  },
  watch: {
    pipeList: {//深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        if (this.pipeId) {
          if (Object.keys(val).length != 0) {

            let id = this.pipeId
            let number1 = parseInt(val[id][val[id].sensorId].alarm.currentValue)
            this.currentNbumer.number =
            {
              number: [number1],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 26
              }
            }
            this.water = {
              data: [number1],
              shape: 'roundRect',
              formatter: '{value}',
              waveNum: 3
            }
          }

        }
      },
      deep: true //true 深度监听
    }
  },
  mounted () {
    this.initWebSocket();
  },
  unmounted () {
    this.websock.close() //离开路由之后断开websocket连接
  },
  methods: {
    lodaItem (data) {
      this.reset()
      this.config.data = []
      data.forEach(element => {
        this.config.data.push([element.id, element.name, element.addr])
      });

      this.$refs['scrollBoard'].updateRows(this.config.data)
    },
    itemRow: function (row) {
      if (row.row) {
        this.reset()
        this.itemName = row.row[1]
        this.itemId = row.row[0]
        this.initWebSocket()
      }
    },
    //重置页面数据
    reset () {
      this.websock.close()
      this.config1.data = []
      this.$refs['pipe'].updateRows(this.config1.data)
      this.itemName = ''
      this.pipeId = ''
      this.titleItem[0].name = ''
      this.currentNbumer.number = {}
      this.water = {}
      this.titleItem[1].name = ''
      this.titleItem[2].name = ''
    },
    clickPipe (row) {

      if (row.row) {
        let data = this.pipeList
        let id = row.row[0]
        this.pipeId = id
        this.titleItem[0].name = data[id].productName
        this.titleItem[1].name = data[id][data[id].sensorId].sensorModel.deviceName
        this.titleItem[2].name = data[id][data[id].sensorId].sensorName
        let number1 = parseInt(data[id][data[id].sensorId].alarm.currentValue)
        this.currentNbumer.number =
        {
          number: [number1],
          toFixed: 1,
          textAlign: 'center',
          content: '{nt}',
          style: {
            fontSize: 26
          }
        }
        this.water = {
          data: [number1],
          shape: 'roundRect',
          formatter: '{value}',
          waveNum: 3
        }

      }
    },
    initWebSocket () { //初始化weosocket
      const wsuri = "ws://localhost:8006/alarm/item";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;

    },
    websocketonerror () {//连接建立失败重连
      this.initWebSocket();
    },
    websocketonopen () {
      this.websocketsend()

    },
    websocketonmessage (e) { //数据接收
      let data = JSON.parse(e.data);
      this.config1.data = [];
      this.pipeList = data
      let keyList = Object.keys(data)
      for (let index = 0; index < keyList.length; index++) {
        this.config1.data.push([
          data[keyList[index]].id,
          data[keyList[index]].productName,
          data[keyList[index]][data[keyList[index]].sensorId].alarm.alarmMsg
        ])
      }

      this.$refs['pipe'].updateRows(this.config1.data)
    },
    websocketsend () {//数据发送
      this.websock.send(this.itemId);
    },
    websocketclose (e) {  //关闭
    },
  }
}
</script>

<style lang="less" scoped>
#center {
  display: flex;
  flex-direction: column;
  .top {
    width: 100%;
    padding: 16px;
    padding-top: 20px;
    height: 230px;
    border-radius: 5px;
    .header {
      display: flex;
      flex-direction: row;
      font-size: 15px;
    }
  }
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 32%;
      height: 70px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
      height: 420px;
    }
    .ranking {
      padding: 10px;
      width: 59%;
      .dv-scr-rank-board {
        height: 225px;
      }
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 45%;
        height: 120px;
        margin-left: 10px;
        margin-top: 10px;
        height: 120px;
        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
        margin-top: 10px;
        .dv-wa-le-po {
          height: 120px;
        }
      }
    }
  }
}
</style>
