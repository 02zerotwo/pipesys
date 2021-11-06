<template>

  <!-- 新增用户 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close">
    <el-card class="box-card">
      <el-form ref="ruleForm"
               :model="ruleForm"
               :rules="rules"
               label-width="120px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="用户名:"
                          prop="username">
              <el-input v-model="ruleForm.username"
                        placeholder="请输入用户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="角色名:">
              <el-select v-model="roles"
                         multiple
                         placeholder="请选择角色名">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="11">
            <el-form-item label="密 码:"
                          prop="password">
              <el-input v-model="ruleForm.password"
                        type="password"
                        placeholder="请输入用户密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col> -->
          <el-col :span="11">
            <el-form-item label="手机号:"
                          prop="phone">
              <el-input v-model="ruleForm.phone"
                        placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 占位空白符 后续可以直接 在里面添加元素 -->
        <el-row>&nbsp; </el-row>
        <el-row>&nbsp; </el-row>
        <el-row>&nbsp; </el-row>
        <el-row>&nbsp; </el-row>
      </el-form>

    </el-card>
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
import { addUser, eidtUser } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data () {
    return {
      visible: false,
      disabled: false,
      title: '',
      ruleForm: { // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        username: '',
        roles: [],
        password: '',
        phone: ''
      },
      roles: [],
      options: [
        {
          value: 1,
          label: '超级管理员'
        },
        {
          value: 2,
          label: '普通管理员'
        },
        {
          value: 3,
          label: '安装工人'
        }

      ],
      // 表单验证
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        // password: [
        //   {
        //     required: true,
        //     message: '密码不能为空',
        //     trigger: 'blur'
        //   },
        //   { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/, message: '密码须包含数字、字母两种元素，且密码位数为6-16位' }
        // ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: '请输入正确的手机号码'
          }
        ]
      }
    }
  },

  computed: {},

  methods: {
    add () {
      this.edit({})
    },
    edit (record) {
      this.visible = true
      this.$nextTick(() => { // 待dom生成以后再来获取dom对象
        // 用来编辑给输入框赋予初始值
        this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        this.ruleForm = Object.assign({}, record)
        if (record) {
          this.ruleForm.roles.forEach((value, index) => {
            this.roles.push(value.id)
          })
        }
      })
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = this.ruleForm
          debugger
          if (!params.id) { // 判断是否执行添加方法
            addUser(params).then(res => {
              ElMessage({
                message: '用户添加成功!',
                type: 'success'
              })
              this.$emit('ok')
            })
          } else { // 否则就是修改方法
            eidtUser(params).then(res => {
              ElMessage({
                message: '用户修改成功!',
                type: 'success'
              })
              this.$emit('ok')
            })
          }
        } else {
          return false
        }
      })
    },
    close () {
      this.visible = false
      this.roles = []
    }
  }
}
</script>
<style lang='less'>
</style>
