<template>

  <!-- 新增传感器 -->
  <el-drawer v-model="visible"
             :title="新增设备模型"
             @close="close">
    <el-form :model="modelList"
             :rules="rules"
             label-width="120px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="设备模型名称:"
                        prop="deviceName">
            <el-input v-model="modelList.deviceName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="设备模型型号:" >
            <el-select v-model="value" @change="selected">
              <el-option v-for="item in deviceTypes"
                         :key="item.value"
                         :label="item.label"
                         :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item label="协议选择:">
            <el-radio-group v-model="modelList.protocol" >
              <el-radio  label="MQTT"></el-radio>
              <el-radio  label="COAP"></el-radio>
              <el-radio  label="NB-IoT"></el-radio>
              <el-radio  label="LWM2M"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="上报间隔(秒):"
                        prop="upInterval">
            <el-input v-model="modelList.upInterval"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="数据点:">
            <el-table :data="dataNewList"
                      size="mini"
                      :row-style="{height:'20px'}"
                      :cell-style="{padding:'0px'}" 
                      fit="false"
                      >
              <el-table-column  label="名称"
                                align="center"
                                header-align="center" width='100px' prop="dataPointName">
                <template #default="scope">
                  <span style="margin-left: 10px">{{ scope.row.dataPointName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="备注"
                              align="center"
                              header-align="center" width='100px' prop="dataPointExtra">
                <template #default="scope">
                  <span style="margin-left: 10px">{{ scope.row.dataPointExtra }}</span>
                </template>
              </el-table-column>
              <el-table-column label="阈值A"
                               align="center"
                               header-align="center" width='100px' prop="lowThreshold">
                <template #default="scope">
                  <span>{{scope.row.lowThreshold }}</span>
                </template>
              </el-table-column>
              <el-table-column label="阈值B"
                              align="center"
                              header-align="center" width='100px' prop="highThreshold">
                <template #default="scope">
                  <span>{{scope.row.highThreshold }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="设备编号:"
                        prop="deviceNumber">
            <el-input v-model="modelList.deviceNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span class="drawe-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary"
                  @click="handleOk">确认</el-button>
    </span>
  </el-drawer>

</template>
<script>
import { editSensorModel } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data() {
    return {
      visible: false,
      modelList: {
          id: '',
          deviceName: '',
          deviceType: '',
          deviceNumber: '',
          upInterval: '',
          protocol: '',
          dataPointName: '',
          dataPointExtra: '',
          lowThreshold: '',
          highThreshold: ''
      },
      dataNewList: [],
      dataList: [
        {value:'温度传感器',dataPointName: '温度',dataPointExtra:'腐蚀',lowThreshold:10,highThreshold:50},
        {value:'压力传感器',dataPointName: '压力',dataPointExtra:'泄露',lowThreshold: 5,highThreshold:20},
        {value:'位移传感器',dataPointName: '位移',dataPointExtra:'位移',lowThreshold:10,highThreshold:40}
        ],
      deviceTypes: [
        { label: '全部', value: 0 },
        { label: '温度传感器', value: 1 },
        { label: '压力传感器', value: 2 },
        { label: '位移传感器', value: 3 },
      ],
      value: '',
      // 表单验证
      rules: {
        deviceName: [
          {
            required: true,
            message: '设备名不能为空',
            trigger: 'blur',
          },
        ],
        upInterval: [
          {
            required: true,
            message: '上报间隔不能为空',
            trigger: 'blur',
          },
        ],
        deviceNumber: [
          {
            required: true,
            message: '设备编号不能为空',
            trigger: 'blur',
          },
        ]
      },
    }
  },
  methods: {
    searchSensor(keywords) {
      console.log(keywords)
      return this.dataList.filter(item =>{
        if(item.value === keywords){
          return item
        }
      })
    },
    edit(row) {
      this.modelList = row
      this.visible = true
      this.$nextTick(() => {
        this.value = row.deviceType
        this.searchSensor(row.deviceType)
      })
      
    },
    selected(val) {
      this.modelList.deviceType = val
    },
    handleOk() {
      this.modelList.dataPointName = this.dataNewList[0].dataPointName
      this.modelList.dataPointExtra = this.dataNewList[0].dataPointExtra
      this.modelList.lowThreshold = this.dataNewList[0].lowThreshold
      this.modelList.highThreshold = this.dataNewList[0].highThreshold
      const params = this.modelList
      editSensorModel(params).then((res => {
        ElMessage({
          message: '修改成功',
          type: 'success'
        })
        this.$emit('ok')
        this.close()
      }))
    },
    close() {
      this.visible = false
    },
  },
  watch: {
    // 根据下拉框所选值显示table里的内容
    value: function(val) {
      if(val == '全部'){
        this.dataNewList = this.dataList
      }else{
        this.dataNewList = this.searchSensor(val)
      }
    }
  }
}
</script>
<style scoped>
.drawe-footer {
  width: 100%;

  position: absolute;

  bottom: 0;  

  left: 0;

  border-top: 1px solid #e8e8e8;

  padding: 10px 16px;

  text-align: right;

  background-color: white;
}
</style>
