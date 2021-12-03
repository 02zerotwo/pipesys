<template>
  <!-- 新增管道 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close">
    <el-form ref="ruleForm"
             :model="ruleForm"
             :rules="rules"
             label-width="120px">

      <el-row>
        <el-col :span="11">
          <el-form-item label="管道名:"
                        prop="productName">
            <el-input v-model="ruleForm.productName"
                      placeholder="请输入管道名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="管道编号"
                        prop="productCode">
            <el-input v-model="ruleForm.productCode"
                      placeholder="请输入编号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="管道模型:">
            <el-select v-model="pipeModel"
                       placeholder="请选择管道模型">
              <el-option v-for="item in pipeModelList"
                         :key="item.id"
                         :label="item.pipeName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="机构名:">
            <el-select v-model="organize"
                       placeholder="请选择机构">
              <el-option v-for="item in org"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="所属项目:">
            <el-select v-model="item"
                       placeholder="请选择项目">
              <el-option v-for="item in itemList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="传感器名称:">
            <el-select v-model="sensor"
                       placeholder="请选择传感器">
              <el-option v-for="item in sensorList"
                         :key="item.id"
                         :label="item.sensorName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="生产日期："
                        prop="productDate">
            <el-date-picker v-model="ruleForm.productDate"
                            type="datetime"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="选择生产日期">
            </el-date-picker>
          </el-form-item>

        </el-col>
        <el-col :span="11">
          <el-form-item label="出厂日期:"
                        prop="productDate">
            <el-date-picker v-model="ruleForm.manuDate"
                            type="datetime"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="选择出厂日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
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
import { addPipe, editPipe, getAllOrgs, getAllPipeModel, getAllItem, getNoUsSensor } from '@/api/api.js'
export default {
  components: {
  },

  data () {
    return {
      visible: false,
      disabled: false,
      title: '',
      ruleForm: { // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        productName: '',
        manuDate: '',
        productDate: '',
        productCode: ''

      },
      org: [],
      pipeModelList: [],
      itemList: [],
      sensorList: [],
      pipeModel: '',
      item: '',
      sensor: '',
      organize: '',
      rules: {
        productName: [
          {
            required: true,
            message: '管道名不能为空',
            trigger: 'blur'
          }
        ],
        productCode: [
          {
            required: true,
            message: '编号不能为空',
            trigger: 'blur'
          }
        ]
      }

    }
  },

  computed: {},

  methods: {
    add (row) {
      this.edit({})
    },
    async edit (record) {
      this.visible = true
      await getAllOrgs({ orgName: '', pageNo: 1, pageSize: 100 }).then(
        (res) => {
          this.org = res.data.list
        }
      )
      await getAllPipeModel({ key: '', pageNo: 1, pageSize: 1000 }).then(res => {
        this.pipeModelList = res.data.list
      })
      await getAllItem({ key: '', pageNo: 1, pageSize: 1000 }).then(res => {
        this.itemList = res.data.list
      })
      await getNoUsSensor({ key: '', pageNo: 1, pageSize: 1000 }).then(res => {
        this.sensorList = res.data.list
      })

      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        this.ruleForm = Object.assign({}, record)
        if (record.item) {
          this.item = record.item.id
        }
        if (record.organize) {
          this.organize = record.organize.id
        }
        if (record.pipeModel) {
          this.pipeModel = record.pipeModel.id
        }
        if (record.sensor) {
          this.sensor = record.sensor.id
        }
      })
    },
    handleOk () {
      let params = this.ruleForm
      params.pipeModel = {
        id: this.pipeModel
      }
      params.item = {
        id: this.item
      }
      params.organize = {
        id: this.organize
      }
      params.sensor = {
        id: this.sensor
      }
      if (params.id === undefined || params.id === null) {
        addPipe(params).then(res => {
          if (res.status === 200) {
            this.$message.success('添加管道管理成功!')
            this.$emit('ok')
            this.close()
          }

        })
      } else {

        editPipe(params).then(res => {

          if (res.status === 200) {
            this.$message.success('修改管道管理成功!')
            this.$emit('ok')
            this.close()
          }
          if (res.status === 400) {
            this.$message.error(res.msg);
          }
        })
      }

    },
    close () {
      this.visible = false
      this.pipeModel = ''
      this.organize = ''
      this.item = ''
      this.sensor = ''
    }
  }
}
</script>
<style lang='less'>
</style>
