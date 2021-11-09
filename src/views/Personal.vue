<template>

  <!-- 个人信息 -->
  <el-dialog v-model="visible"
             :title="title"
             @close="close" :center="true">
    <el-card class="box-card">
      <el-form ref="ruleForm"
               :model="ruleForm"
               :rules="rules"
               label-width="120px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="用户id:"
                          prop="id" >
              <el-input v-model="ruleForm.id" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="角色名:">
              <el-select v-model="roles"
                         multiple
                         placeholder="请选择角色名" >
                <el-option v-for="item in r_options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
          <el-form-item label="用户名:"
                          prop="username" >
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="手机号:"
                          prop="phone">
              <el-input v-model="ruleForm.phone"
                        placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 占位空白符 后续可以直接 在里面添加元素 -->
        <el-row>
          <el-col :span="11">
          <el-form-item label="权限级别:">
              <el-select v-model="perms"
                         multiple
                         placeholder="请选择权限:" >
                <el-option v-for="item in p_options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="部门信息:">
              <el-select v-model="depts"
                         multiple
                         placeholder="请选择权限:" >
                <el-option v-for="item in p_options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
export default {
  components: {},

  data () {
    return {
      visible: false,
      title: '',
      ruleForm: { // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '1',
        username: '',
        password: '',
        phone: '',
        roles: [],
        perms: [],
        depts: []
      },
      roles: [],
      perms: [],
      depts: [],
      r_options: [
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
      p_options: [
        {
          value: 1,
          label: '系统'
        },
        {
          value: 2,
          label: '资源'
        },
        {
          value: 3,
          label: '报警'
        }
      ],
      d_options: [
        {
          value: 1,
          label: '研发'
        },
        {
          value: 2,
          label: '销售'
        },
        {
          value: 3,
          label: '后勤'
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
  methods: {
    showInfo () {
      this.visible = true
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 发送请求修改个人信息
          this.visible = false
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
