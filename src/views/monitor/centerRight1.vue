<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-line"
                class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">报警信息监测</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board"
                         :config="config"
                         ref="scrollBoard" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      config: {
        header: ['传感器名称', '报警信息'],
        data: [

        ],
        rowNum: 7, //表格行数
        headerHeight: 50,
        headerBGC: '#0f1325', //表头
        oddRowBGC: '#0f1325', //奇数行
        evenRowBGC: '#171c33', //偶数行
        index: true,
        columnWidth: [70, 200, 200],
        align: ['center'],
        waitTime: 3000
      }
    }
  },
  components: {},
  mounted () {
    this.initWebSocket();
  },
  unmounted () {
    this.websock.close() //离开路由之后断开websocket连接
  },
  methods: {
    initWebSocket () { //初始化weosocket
      const wsuri = "ws://114.217.20.82:8006/alarm/alarms";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;

    },
    websocketonopen () { //连接建立之后执行send方法发送数据

      this.websocketsend();

    },
    websocketonerror () {//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage (e) { //数据接收
      let data = JSON.parse(e.data);
      let msg = data.alarm.alarmMsg
      let msgflag = msg.indexOf('正常')
      if (msgflag > 0) {
        msg = "<span  class='colorGrass'>" + data.alarm.alarmMsg + "</span>"
      } else {
        msg = "<span  class='colorRed'>" + data.alarm.alarmMsg + "</span>"
      }
      this.config.data.push([data.sensorName, msg])
      this.$refs['scrollBoard'].updateRows(this.config.data)
    },
    websocketsend (Data) {//数据发送
      this.websock.send(Data);
    },
    websocketclose (e) {  //关闭
      console.log('断开连接', e);
    },
  }
}
</script>

<style lang="less" scoped>
#centerRight1 {
  padding: 16px;
  padding-top: 20px;
  height: 410px;

  border-radius: 5px;
  .bg-color-black {
    height: 410px - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 400px;
      height: 580px;
    }
  }
}
</style>
