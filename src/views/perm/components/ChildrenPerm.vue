<template>
  <div>
    <el-form ref="ruleForm"
             :model="ruleForm"
             :rules="rules"
             label-width="100px">
      <el-row>
        <el-form-item label="菜单名称:"
                      prop="ext">
          <el-input v-model="ruleForm.ext"
                    placeholder="请输入菜单名称"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="上级菜单:">
          <TreeSelect ref="TreeSelect"
                      :props="props"
                      :options="treeList"
                      :value="valueId"
                      :clearable="isClearable"
                      :accordion="isAccordion"
                      @getValue="getValue"></TreeSelect>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="权限名称:"
                      prop="name">
          <el-input v-model="ruleForm.name"
                    placeholder="请输入权限名称"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="菜单路径:"
                      prop="path">
          <el-input v-model="ruleForm.path"
                    placeholder="请输入菜单路径"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="菜单图标:"
                      prop="icon">
          <el-input v-model="ruleForm.icon"
                    placeholder="请选择菜单图标"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getAllPerm, addPerm, eidtPerm } from '@/api/api.js'
import TreeSelect from '@/components/TreeSelect'
import { ElMessage } from 'element-plus'

export default {
  components: {
    TreeSelect
  },

  data () {
    return {
      ruleForm: { // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        ext: '',
        name: '',
        path: '',
        phone: '',
        icon: '',
        parentId: ''
      },
      props: {
        value: 'id',
        label: 'ext',
        children: 'children'
      },
      pid: '',
      isClearable: true,      // 可清空（可选）
      isAccordion: true,      // 可收起（可选）
      valueId: '',
      treeList: [],
      addoreditFlag: {},
      // 表单验证
      rules: {
        ext: [
          {
            required: true,
            message: '菜单名称不能为空',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],

        path: [
          { required: true, message: '菜单路径不能为空', trigger: 'blur' }
        ]
      }
    }

  },

  computed: {},

  methods: {
    getValue (value) {
      this.valueId = value
    },
    add () {
      this.edit({})
    },
    async edit (record) {
      await getAllPerm().then(res => {
        this.treeList = res.data.list
      })
      this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.ruleForm = Object.assign({}, record)
      if (record) {
        if (record.parentId === 0) {
          // 一级菜单不显示
        } else {
          this.treeList.filter(element => {
            if (element.id === record.parentId) {
              this.$refs.TreeSelect.valueTitle = element.ext

              return true
            }

          });
        }
        this.pid = record.parentId
      }

      this.addoreditFlag = record
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          if (Object.keys(this.addoreditFlag).length == 0) {
            params.parentId = this.valueId
            addPerm(params).then(res => {
              ElMessage({
                message: '菜单添加成功!',
                type: 'success'
              })
              this.$emit('ok')
            })
          } else {
            console.log(this.valueId);
            debugger
            if (this.valueId == '' || this.valueId == null) {
              if (this.pid == '') {
                params.parentId = 0
              } else {
                params.parentId = this.pid
              }

            } else {

              params.parentId = this.valueId


            }
            eidtPerm(params).then(res => {
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
    handleClose () {
      this.$refs.TreeSelect.clearHandle()

    }
  }
}
</script>
<style lang='less'>
</style>
