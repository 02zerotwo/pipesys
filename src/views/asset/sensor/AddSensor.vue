<template>

  <!-- 新增传感器 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close">
    <el-form ref="sensorForm"
             :model="ruleForm"
             :rules="rules"
             label-width="120px">
      <el-row style="text-align: center">
        <el-col :span="11">
          <el-form-item label="传感器编码:"
                        prop="sensorCode">
            <el-input v-model="ruleForm.sensorCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="传感器名称:"
                        prop="sensorName">
            <el-input v-model="ruleForm.sensorName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="传感器模型:">
          <el-select v-model="model"
                     placeholder="请选择模型">
            <el-option v-for="item in m_options"
                       :key="item.id"
                       :label="item.deviceName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="所属项目:">
            <el-select v-model="item"
                      placeholder="请选择所属项目"
                      @change="sel">
            <el-option v-for="item in i_options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="所属厂家:">
          <el-input v-model="orga.name" disabled ></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary"
                   @click="handleOk">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import {
  getAllSensorModel,
  getAllItem,
  addSensor,
  editSensor,
} from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data() {
    return {
      visible: false,
      title: '',
      ruleForm: {
        sensorCode: '',
        sensorName: '',
        models: {},
        items: {},
        orga: {},
      },
      model: {},
      item: {},
      orga: {},
      m_options: [],
      i_options: [],
      // 表单验证
      rules: {
        sensorCode: [
          {
            required: true,
            message: '传感器编号不能为空',
            trigger: 'blur',
          },
        ],
        sensorName: [
          {
            required: true,
            message: '传感器名称不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {},

  methods: {
    sel(val) {
      this.searchSensor(val)
    },
    searchSensor(keywords) {
      return this.i_options.filter((item) => {
        if (item.id === keywords) {
          this.orga = item.organize
          console.log(this.orga)
          return
        }
      })
    },
    add() {
      this.model = ''
      this.item = ''
      this.orga = ''
      this.edit({})
    },
    edit(row) {
      console.log(row)
      this.visible = true
      getAllSensorModel({ pageNo: 1, pageSize: 100, key: '' }).then((res) => {
        let l = res.data.list
        for (var i = 0; i < l.length; i++) {
          this.m_options.push(l[i])
        }
      })
      getAllItem({ pageNo: 1, pageSize: 100, key: '' }).then((res) => {
        let l = res.data.list
        for (var i = 0; i < l.length; i++) {
          this.i_options.push(l[i])
        }
      })
      this.$nextTick(() => {
        this.$refs.sensorForm.resetFields()
        this.ruleForm = Object.assign({}, row)
        this.model = row.sensorModel.id
        this.item = row.item.id
        this.orga = row.item.organize
      })
    },
    handleOk() {
      console.log(this.item)
      console.log(this.model)
      console.log(this.orga)
      const params = this.ruleForm
      params.sensorModelId = this.model
      params.itemId = this.item
      params.orgaId = this.orga.id
      console.log(params)
      if (!params.id) {
        addSensor(params).then((res) => {
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
          this.$emit('ok')
          this.close()
        })
      } else {
        editSensor(this.ruleForm).then((res) => {
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
      this.$refs.sensorForm.resetFields()

    },
  },
}
</script>
<style lang='less'>
</style>
