<template>
  <el-container>
    <el-aside>
      <el-card class="box-card">
        <el-tree ref="tree"
                 :props="props"
                 node-key="id"
                 :load="loadNode"
                 lazy
                 @node-click="currenClick"
                 :highlight-current="true"
                 :default-expanded-keys="defaultExpandedkeys"
                 @check-change="handleCheckChange" />
      </el-card>
    </el-aside>
    <el-main>
      <el-card class="box-card"
               style="background-color:#F2F6FC">

        <el-row>
          <el-col :span="8"
                  v-for="(item,index) in dataList"
                  :key="index"
                  style="margin-top: 40px;">
            <el-card class="box-card"
                     style="width: 280px;height:200px">
              <el-row>
                <el-col :span="12">
                  <el-image style="width: 100px; height: 100px;"
                            :src="'http://localhost:8003/'+item.pipeModel.fileRelativePath[1]"></el-image>
                  <el-divider direction="vertical"
                              style="width:0"></el-divider>

                </el-col>

                <el-col :span="12">
                  <el-row> <label>管道名称:<span>{{item.pipeModel.pipeNumber}}</span> </label></el-row>
                  <el-row> <label>管道类型:<span>{{item.pipeModel.pipeType}}</span></label></el-row>

                  <el-row>
                    <label>状态:</label>
                    <el-link :type="item.isHandled?'success':'danger'"
                             :underline='false'>{{item.isHandled?'正常':'异常'}}</el-link>
                  </el-row>
                  <el-row>
                    <label>传感器名称:<span>{{item.sensor.sensorName}}</span></label>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col style="text-align: left;">
                  <label>传感器类型:<span>{{item.sensor.sensorModel.deviceType}}</span></label>
                </el-col>
              </el-row>
              <el-row>
                <el-col style="text-align: left;">
                  <label>当前值:<span>100</span></label>
                </el-col>
              </el-row>
            </el-card>

          </el-col>

        </el-row>

      </el-card>
    </el-main>
  </el-container>

</template>

<script>
import { getAllOrgs, getItemByOrgaId, getPipeModelByItemId } from '@/api/api.js'

export default {
  components: {},

  data () {
    return {
      selectForm: {
        key: ''
      },
      props: {
        label: 'name',
        isLeaf: 'leaf'
      },
      defaultExpandedkeys: [],
      url: '@/assets/img/k-no.jpg',
      websock: null,
      dataList: []
    }
  },

  computed: {},
  created () {
    // this.initWebSocket();

  },
  unmounted () {
    // this.websock.close() //离开路由之后断开websocket连接
  },
  methods: {

    handleNodeClick (data) {
      console.log(data)
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        this.getAllOrgList(node, resolve)
      }
      if (node.level > 1) {
        return resolve([]);
      }
      if (node.level === 1) { // 二级节点
        this.getChildrenNode(node, resolve)
      }
    },
    //获取懒加载不同数据层
    async getAllOrgList (node, resolve) {
      let params = {
        orgName: '',
        pageNo: 1,
        pageSize: 1000,
      }
      await getAllOrgs(params).then((res) => {
        if (res.status === 200) {
          resolve(res.data.list)
        }
      })
    },
    async getChildrenNode (node, resolve) {
      let params = {
        orgaId: node.data.id
      }
      await getItemByOrgaId(params).then(res => {
        if (res.status === 200) {
          res.data.forEach(element => {
            element.leaf = true
          });
          resolve(res.data)
        }
      })
    },
    initWebSocket () { //初始化weosocket
      const wsuri = "ws://8.142.74.249:8006/alarm";
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
      this.dataList.push(data)
      debugger

    },
    websocketsend (Data) {//数据发送
      this.websock.send(Data);
    },
    websocketclose (e) {  //关闭
      console.log('断开连接', e);
    },
    getPipeModel (itemId) {
      let params = {
        itemId: itemId
      }
      getPipeModelByItemId(params).then(res => {
        debugger
        this.dataList = res.data
      })
    },
    currenClick (data, node) {
      if (node.level === 2) {
        this.getPipeModel(data.id)

      }

    }
  }
}
</script>
<style lang='less' >
label {
  color: #000000;
  max-width: 124px;
  word-break: break-all;
}
</style>
