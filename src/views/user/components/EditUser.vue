<template>
  <div>
    <el-drawer v-model="visible"
               title="编辑用户信息"
               :direction="rtl"
               :before-close="handleClose">
      <el-form ref="ruleForm"
               :model="ruleForm"
               :rules="rules"
               label-width="100px">
        <el-row>
          <el-form-item label="用户名:"
                        prop="username">
            <el-input v-model="ruleForm.username"
                      placeholder="请输入用户名称"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="角色名:">
            <el-select v-model="roles"
                       multiple
                       placeholder="请选择角色名">
              <el-option v-for="item in options"
                         :key="item.id"
                         :label="item.ext"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="头像:">
            <el-image style="width: 100px; height: 100px"
                      :src="require('@/assets/img/k-no.jpg')"
                      :fit="fill"></el-image>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="手机号:"
                        prop="phone">
            <el-input v-model="ruleForm.phone"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-row>
        <!-- 占位空白符 后续可以直接 在里面添加元素 -->
        <el-row>
          <el-form-item label="部门:">
            <el-select v-model="o"
                       placeholder="请选择部门">
              <el-option v-for="item in org"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-row>
      </el-form>
      <span class="drawe-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary"
                   @click="handleOk">提交</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import { eidtUser, getAllRole, getAllOrga } from '@/api/api.js'
import { ElMessage } from 'element-plus'

export default {
  components: {},

  data () {
    return {
      visible: false,
      ruleForm: { // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        username: '',
        roles: [],
        password: '',
        phone: '',

      },
      url: '',
      roles: [],
      o: '',
      org: [
        {
          id: 1,
          name: '南京煤业有限公司'
        },
        {
          id: 2,
          name: '南京煤业有限公司1'
        },
        {
          id: 3,
          name: '南京煤业有限公司2'
        }

      ],
      options: [
        {
          id: 1,
          ext: '超级管理员'
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
    async edit (record) {
      this.visible = true
      await getAllRole({ roleName: '', pageNo: 1, pageSize: 100 }).then(res => {
        this.options = res.data.list
      })
      await getAllOrga({ orgName: '', pageNo: 1, pageSize: 100 }).then(res => {
        this.org = res.data.list
      })
      this.$nextTick(() => { // 待dom生成以后再来获取dom对象
        // 用来编辑给输入框赋予初始值
        this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        this.ruleForm = Object.assign({}, record)
        if (record) {
          this.ruleForm.roles.forEach((value, index) => {
            this.roles.push(value.id)
          })
        }
        if (record.o) {
          this.o = record.o.id
        }

      })
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          params.roleIdArrays = this.roles
          eidtUser(params).then(res => {
            ElMessage({
              message: '用户修改成功!',
              type: 'success'
            })
            this.$emit('ok')
            this.handleClose()
          })

        } else {
          return false
        }
      })
    },
    handleClose () {
      this.visible = false
      this.roles = []
      this.o = ''
    }
  }
}
</script>
<style lang='less'>
.el-input {
  width: 226.4px;
}
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
