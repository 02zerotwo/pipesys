<template>

  <!-- 个人信息 -->
  <el-drawer v-model="visible"
             :title="title"
             @close="close">
    <div class="demo-drawer__content">
      <el-form ref="userForm"
               :model="userForm"
               :rules="rules"
               label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="用户id:"
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
              <el-select >
                <el-option v-for="(item,index) in userForm.roles" v-model="item.ext" :key="index">
                  {{item.ext}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="17">
            <el-form-item label="组织名:">
              <el-input 
                        placeholder="请输入组织号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row>
          <el-col :span="17">
            <el-form-item label="权限级别:">
              <el-input v-model="perms"></el-input>
              <el-select v-model="perms"
                         multiple>
                <el-option v-for="item in perms"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item label="部门信息:">
              <el-select v-model="depts"
                         multiple
                         placeholder="请选择部门:">
                <el-option v-for="item in d_options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
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
export default {
  components: {},
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
          id: '',
          username: '',
          phone: '',
          o: {name: ''},
          roles: [{ name: '', perms: [] }],
        }
      },
    },
  },
  data() {
    return {
      visible: false,
      title: '',
      userForm: {
        id: '',
        username: '',
        phone: '',
        o: {name: ''},
        roles: [{ name: '', perms: [] }],
      },
      d_options: [
        {
          value: 1,
          label: '研发',
        },
        {
          value: 2,
          label: '销售',
        },
        {
          value: 3,
          label: '后勤',
        },
      ],
      // 表单验证
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          },
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
    showInfo() {
      this.visible = true
    },
    handleOk() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 发送请求修改个人信息
          this.visible = false
        } else {
          return false
        }
      })
    },
    close() {
      this.visible = false
      this.roles = []
    },
  },
  watch: {
    userInfo: function (newData, oldData) {
      console.log(newData) //newData就是userInfo
      this.userForm = newData
      //	methods的函数在这里调用可以获取到userForm的值
      // this.handleOk()
    },
  },
}
</script>
<style scoped>
.el-button {
  float: right;
  margin-right: 20px;
}
</style>
