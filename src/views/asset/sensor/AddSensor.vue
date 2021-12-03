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
          <el-select v-model="models"
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
          <el-select v-model="items"
                     placeholder="请选择所属项目">
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
          <el-select v-model="orgas"
                     placeholder="请选择所属厂家">
            <el-option v-for="item in o_options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
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
  getAllOrgs,
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
      },
      models: [],
      items: [],
      orgas: [],
      m_options: [],
      i_options: [],
      o_options: [],
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
    add() {
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
      getAllOrgs({ pageNo: 1, pageSize: 100, orgName: '' }).then((res) => {
        let l = res.data.list
        for (var i = 0; i < l.length; i++) {
          this.o_options.push(l[i])
        }
      })
      this.$nextTick(() => {
        this.$refs.sensorForm.resetFields()
        this.ruleForm = Object.assign({}, row)
        this.models = row.sensorModel.id
        this.items = row.item.id
        this.orgas = row.item.organize.id
      })
    },
    handleOk() {
      const params = this.ruleForm
      params.sensorModelId = this.models
      params.itemId = this.items
      params.orgaId = this.orgas
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
    },
  },
}
</script>
<style lang='less'>
</style>
