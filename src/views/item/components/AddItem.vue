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
          <el-form-item label="项目名称:"
                        prop="name">
            <el-input v-model="ruleForm.name"
                      placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="项目编码:"
                        prop="number">
            <el-input v-model="ruleForm.number"
                      placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="手机号:"
                        prop="phone">
            <el-input v-model="ruleForm.phone"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="项目地址:">
            <el-input v-model="ruleForm.addr"
                      placeholder="请输入项目地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
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
        </el-col>
      </el-row>
      <!-- 占位空白符 后续可以直接 在里面添加元素 -->
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
import { addItem, eidtItem, getAllOrga } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {},

  data () {
    return {
      visible: false,
      disabled: false,
      title: '',
      org: [],
      o: '',
      ruleForm: {
        // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        name: '',
        number: '',
        phone: '',
        addr: ''
      },
      // 表单验证
      rules: {
        name: [
          {
            required: true,
            message: '项目名不能为空',
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
        number: [
          { required: true, message: '项目编码不能为空', trigger: 'blur' },
        ]
      },
    }
  },

  computed: {},

  methods: {
    add () {
      this.edit({})
    },
    async edit (record) {
      this.visible = true
      await getAllOrga({ orgName: '', pageNo: 1, pageSize: 100 }).then(
        (res) => {
          this.org = res.data.list
        }
      )
      this.$nextTick(() => {
        // 待dom生成以后再来获取dom对象
        // 用来编辑给输入框赋予初始值
        this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        this.ruleForm = Object.assign({}, record)
        if (record.organize) {
          this.o = record.organize.id
        }

      })
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.ruleForm //把表单的数据赋值给params
          let organize = {
            id: this.o
          }
          params.organize = organize
          if (!params.id) {  //判断是否执行添加方法 已经分离
            addItem(params).then((res) => {
              ElMessage({
                message: '项目添加成功!',
                type: 'success',
              })
              this.$emit('ok')
              this.close()
            })
          } else { // 否则就是修改方法
            eidtItem(params).then(res => {
              ElMessage({
                message: '项目修改成功!',
                type: 'success'
              })
              this.$emit('ok')
              this.close()
            })
          }
        } else {
          return false
        }
      })
    },
    close () {
      this.visible = false
      this.o = ''
    },
  },
}
</script>
<style lang='less' >
.el-input {
  width: 226.4px;
}
</style>
