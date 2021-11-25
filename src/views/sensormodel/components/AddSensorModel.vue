<template>

  <!-- 新增传感器 -->
  <el-dialog v-model="visible"
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
        <el-col>
          <el-form-item label="设备模型型号:">
            <el-select v-model="modelList.deviceType">
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
        <el-col>
          <el-form-item label="协议选择:">
            <el-checkbox-group v-model="protocols" @change="selected">
              <el-checkbox label="MQTT"></el-checkbox>
              <el-checkbox label="COAP"></el-checkbox>
              <el-checkbox label="NB-IoT"></el-checkbox>
              <el-checkbox label="LWM2M"></el-checkbox>
            </el-checkbox-group>
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
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary"
                  @click="handleOk">确认</el-button>
    </template>
  </el-dialog>

</template>
<script>
export default {
  components: {},

  data() {
    return {
      visible: false,
      modelList: [
        {
          id: '',
          deviceName: '',
          deviceType: '',
          deviceNumber: '',
          createTime: '',
          upInterval: '',
          protocol: [],
          dataPointName: '',
          dataPointExtra: '',
          lowThreshold: '',
          highThreshold: '',
        },
      ],
      deviceTypes: [
        { label: '温度传感器', value: 1 },
        { label: '压力传感器', value: 2 },
        { label: '位移传感器', value: 3 },
      ],
      protocols: [],
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
      },
    }
  },
  methods: {
    add() {
      this.visible = true
    },
    selected(val) {
      console.log(val)
      this.modelList.protocol = val
      console.log(this.modelList.protocol)
    },
    handleOk() {
      console.log(this.modelList)
    },
    close() {
      this.visible = false
    },
  },
}
</script>
<style scoped>
</style>
