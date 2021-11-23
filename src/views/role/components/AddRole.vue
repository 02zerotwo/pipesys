<template>

  <!-- 新增用户 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close">

    <el-form ref="ruleForm"
             :model="ruleForm"
             :rules="rules"
             label-width="120px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="角色编码:"
                        prop="name">
            <el-input v-model="ruleForm.name"
                      placeholder="请输入角色编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="角色名:"
                        prop="ext">
            <el-input v-model="ruleForm.ext"
                      placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 占位空白符 后续可以直接 在里面添加元素 -->
      <el-row>&nbsp; </el-row>
      <el-row>&nbsp; </el-row>
      <el-row>&nbsp; </el-row>
      <el-row>&nbsp; </el-row>
      <el-row>&nbsp; </el-row>
      <el-row>&nbsp; </el-row>
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
import { addRole } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data () {
    return {
      visible: false,
      title: '',
      ruleForm: { // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        name: '',
        ext: '',
      },
      // 表单验证
      rules: {
        name: [
          {
            required: true,
            message: '用户编码不能为空',
            trigger: 'blur'
          }
        ],
        ext: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {},

  methods: {
    add () {
      this.edit()
    },
    edit () {
      this.visible = true
      this.$nextTick(() => { // 待dom生成以后再来获取dom对象
        // 用来编辑给输入框赋予初始值
        this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      })
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          addRole(params).then(res => {
            ElMessage({
              message: '角色添加成功!',
              type: 'success'
            })
            this.$emit('ok')
            this.close()
          })
        } else {
          return false
        }
      })
    },
    close () {
      this.visible = false
    }
  }
}
</script>
<style lang='less'>
</style>
