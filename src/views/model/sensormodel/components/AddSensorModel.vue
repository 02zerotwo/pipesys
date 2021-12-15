<template>

  <!-- 新增传感器 -->
  <el-dialog v-model="visible"
             :title="新增设备模型"
             @close="close">
    <el-form :model="modelList"
             ref="dataAddForm"
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
          <el-form-item label="设备编号:"
                        prop="deviceNumber">
            <el-input v-model="modelList.deviceNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="设备模型类型:">
            <el-select v-model="value"
                       @change="selected">
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
            <el-radio-group v-model="modelList.protocol"
                            @change="checked">
              <el-radio label="MQTT"></el-radio>
              <el-radio label="COAP"></el-radio>
              <el-radio label="NB-IoT"></el-radio>
              <el-radio label="LWM2M"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="上报间隔(秒):">
            <el-input-number v-model="modelList.upInterval"
                             :min="1"
                             :max="100"
                             @change="handleChange" />
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
                      fit="false">
              <el-table-column label="名称"
                               align="center"
                               header-align="center"
                               width='100px'
                               prop="dataPointName">
                <template #default="scope">
                  <span style="margin-left: 10px">{{ scope.row.dataPointName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="备注"
                               align="center"
                               header-align="center"
                               width='100px'
                               prop="dataPointExtra">
                <template #default="scope">
                  <span style="margin-left: 10px">{{ scope.row.dataPointExtra }}</span>
                </template>
              </el-table-column>
              <el-table-column label="阈值A"
                               align="center"
                               header-align="center"
                               width='100px'
                               prop="lowThreshold">
                <template #default="scope">
                  <el-input v-model="scope.row.lowThreshold"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="阈值B"
                               align="center"
                               header-align="center"
                               width='100px'
                               prop="highThreshold">
                <template #default="scope">
                  <el-input v-model="scope.row.highThreshold"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary"
                 @click="handleOk">确认</el-button>
    </template>
  </el-dialog>

</template>
<script>
import { addSensorModel, editSensorModel } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data() {
    return {
      visible: false,
      modelList: {
        upInterval: 1,
      },
      dataNewList: [],
      dataList: [
        {
          value: '温度',
          dataPointName: '温度',
          dataPointExtra: '腐蚀',
          lowThreshold: '',
          highThreshold: '',
        },
        {
          value: '压力',
          dataPointName: '压力',
          dataPointExtra: '泄露',
          lowThreshold: '',
          highThreshold: '',
        },
        {
          value: '位移',
          dataPointName: '位移',
          dataPointExtra: '位移',
          lowThreshold: '',
          highThreshold: '',
        },
      ],
      deviceTypes: [
        { label: '温度', value: 0 },
        { label: '压力', value: 1 },
        { label: '位移', value: 2 },
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
        deviceNumber: [
          {
            required: true,
            message: '设备编号不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    searchSensor(keywords) {
      console.log(keywords)
      return this.dataList.filter((item) => {
        if (item.value === keywords) {
          return item
        }
      })
    },
    add() {
      this.edit({})
    },
    edit(record) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataAddForm.resetFields()
        this.modelList = Object.assign({}, record)
        this.value = record.deviceType
        this.searchSensor(record.deviceType)
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
      console.log(params)
      if (!params.id) {
        addSensorModel(params).then((res) => {
          console.log(res)
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
          this.$emit('ok')
          this.close()
        })
      } else {
        editSensorModel(params).then((res) => {
          console.log(res)
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          this.$emit('ok')
          this.close()
        })
      }
    },
    close() {
      this.visible = false
    },
  },
  watch: {
    // 根据下拉框所选值显示table里的内容
    value: function (val) {
      this.dataNewList = this.searchSensor(val)
    },
  },
}
</script>
<style scoped>
</style>
