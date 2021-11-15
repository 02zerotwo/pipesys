<template>

  <!-- 个人信息 -->
  <el-drawer v-model="visible"
             :title="title"
             @close="close">
    <div class="demo-drawer__content">
      <el-form ref="userForm"
               :model="userForm"
               :rules="rules"
               label-width="120px" :key="userForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="用户编号:"
                          prop="id">
              <el-input v-model="userForm.id"
                        disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="17">
            <el-form-item label="用户名:"
                          prop="username">
              <el-input v-model="userForm.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="17">
            <el-form-item label="手机号:"
                          prop="phone">
              <el-input v-model="userForm.phone"
                        placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="角色名:">
              <el-select v-model="roles"
                         multiple
                         placeholder="请选择角色名"
                         disabled>
                <el-option v-for="item in r_options"
                           :key="item.id"
                           :label="item.ext"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="机构:">
            <el-select v-model="o"
                       placeholder="请选择机构">
              <el-option v-for="item in org"
                         :key="item.name"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-row>
        <!-- 占位空白符 后续可以直接 在里面添加元素 -->
        <el-row>&nbsp; </el-row>
        <el-row>&nbsp; </el-row>
        <el-row>&nbsp; </el-row>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button type="primary"
                   @click="handleOk">确认</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>

  </el-drawer>

</template>
<script>
import { getAllRole, getAllOrga,modifyInfo } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data() {
    return {
      timer: '',
      visible: false,
      title: '',
      userForm: {
        id: '',
        username: '',
        phone: '',
        o: '',
        roles: [],
      },
      roles: [],
      o: '',
      org: [],
      r_options: [],
      // 表单验证
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
          {
            pattern:
              /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: '请输入正确的手机号码',
          },
        ],
      },
    }
  },
  methods: {
    async showInfo(record) {
      console.log(record)
      this.visible = true
      this.timer = new Date().getTime();
      await getAllRole({ roleName: '', pageNo: 1, pageSize: 100 }).then(
        (res) => {
          this.r_options = res.data.list
        }
      )
      await getAllOrga({ orgName: '', pageNo: 1, pageSize: 100 }).then(
        (res) => {
          this.org = res.data.list
        }
      )
      this.$nextTick(() => {
        // 待dom生成以后再来获取dom对象
        this.$refs.userForm.resetFields()
        this.userForm = Object.assign({}, record)
        if (record) {
          this.userForm.roles.forEach((value, index) => {
            this.roles.push(value.id)
          })
        }
        if (record.o) {
          this.o = record.o.id
        }
      })
    },
    handleOk() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 发送请求修改个人信息
          const params = this.userForm
          params.roleIdArrays = this.roles
          params.orgaId = this.o
          modifyInfo(params).then(res => {
            ElMessage({
              message: '个人信息修改成功!请重新登录',
              type: 'success',
              duration: 1600
            })
              this.$router.push({path: '/login'})
          })
        } else {
          return false
        }
      })
    },
    close() {
      this.visible = false
      this.roles = []
    },
  }
}
</script>
<style scoped>
.el-button {
  float: right;
  margin-right: 20px;
}
</style>
