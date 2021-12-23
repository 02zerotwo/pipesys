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
          <el-select v-model="modelId"
                     placeholder="请选择模型"
                     @change="md">
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
          <el-select v-model="itemId"
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
        <el-form-item label="所属机构:">
          <el-input v-model="orga.name"
                    disabled></el-input>
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

  data () {
    return {
      visible: false,
      title: '',
      ruleForm: {
        sensorCode: '',
        sensorName: '',
        sensorModel: {},
        item: '',
      },
      protocal: '',
      orga: '',
      modelId: '',
      itemId: '',
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
    md (val) {
      return this.m_options.filter((item) => {
        if (item.id === val) {
          this.ruleForm.sensorModel = item
          this.protocal = item.protocol
          return
        }
      })
    },
    sel (val) {
      return this.i_options.filter((item) => {
        if (item.id === val) {
          this.orga = item.organize
          this.ruleForm.item = item
          return
        }
      })
    },
    add () {
      this.edit({})
    },
    edit (row) {
      console.log(row)
      this.visible = true
      getAllSensorModel({ pageNo: 1, pageSize: 100, key: '' }).then((res) => {
        this.m_options = res.data.list
      })
      getAllItem({ pageNo: 1, pageSize: 100, key: '' }).then((res) => {
        this.i_options = res.data.list
      })

      this.$nextTick(() => {
        this.$refs.sensorForm.resetFields()
        this.ruleForm = Object.assign({}, row)
        if (Object.keys(row).length != 0) {
          this.modelId = row.sensorModel.id
          this.protocal = row.sensorModel.protocol
        }
        if (row.item) {
          this.itemId = row.item.id
          this.orga = row.item.organize
        }
      })
    },
    handleOk () {
      let params = this.ruleForm
      params.protocal = this.protocal
      params.organize = this.orga
      if (!params.id) {
        if (params.sensorName && params.sensorCode) {
          addSensor(params).then((res) => {
            ElMessage({
              message: '添加成功',
              type: 'success',
            })
            this.$emit('ok')
            this.close()
          })
        } else {
          ElMessage({
            message: '添加失败，含有非法参数',
            type: 'error',
          })
        }
      } else {
        editSensor(params).then(() => {
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          this.$emit('ok')
          this.close()
        })
      }
    },
    close () {
      this.visible = false
      this.$refs.sensorForm.resetFields()
      this.itemId = ''
      this.orga = ''
    },
  },
}
</script>
<style lang='less'>
</style>
