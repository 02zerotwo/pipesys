<template>

  <!-- 新增机构 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close">
      <el-form ref="ruleForm"
               :model="ruleForm"
               :rules="rules"
               label-width="120px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="机构名:"
                          prop="name">
              <el-input v-model="ruleForm.name"
                        placeholder="请输入机构名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型:">
              <el-select v-model="type.id"
                         placeholder="请选择行业类型">
                <el-option v-for="item in options"
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
            <el-form-item label="机构代码:"
                          prop="orgaNumber">
              <el-input v-model="ruleForm.orgaNumber"
                        placeholder="请输入机构代码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="地址:"
                          prop="location">
              <el-input v-model="ruleForm.location"
                        placeholder="请输入公司地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="备注信息:">
              <el-input v-model="ruleForm.ext"></el-input>
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
import { addOrg, getAllType } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data() {
    return {
      visible: false,
      disabled: false,
      title: '',
      ruleForm: {
        // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        name: '',
        parentId: '',
        type: {
          id: '',
        },
        location: '',
        orgaNumber: '',
        ext: '',
      },
      type: { id: '' },
      options: [],
      // 表单验证
      rules: {
        name: [
          {
            required: true,
            message: '组织名不能为空',
            trigger: 'blur',
          },
        ],
        location: [
          {
            required: true,
            message: '公司地址不能为空',
            trigger: 'blur',
          },
        ],
        orgaNumber: [
          {
            required: true,
            message: '机构代码不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {},

  methods: {
    async add() {
      this.visible = true
      await getAllType().then((res) => {
        this.options = res.data
      })

      this.$nextTick(() => {
        // 待dom生成以后再来获取dom对象
        // 用来编辑给输入框赋予初始值
        this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      })
    },
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          params.type = this.type
          addOrg(params).then((res) => {
            ElMessage({
              message: '机构添加成功!',
              type: 'success',
            })
            this.$emit('ok')
            this.close()
          })
        } else {
          return false
        }
      })
    },
    close() {
      this.visible = false
    },
  },
}
</script>
<style lang='less'>
</style>
