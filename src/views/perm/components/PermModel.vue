<template>
  <div class="perm_model">
    <el-drawer v-model="visible"
               :title="title"
               :direction="rtl"
               :before-close="handleClose">
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
          <el-form-item label="菜单图标:">
            <e-icon-picker v-model="ruleForm.icon"
                           :options="options" />
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
import { ElMessage } from 'element-plus'
import { getAllPerm, addPerm, eidtPerm } from '@/api/api.js'
import TreeSelect from '@/components/TreeSelect'
import { EIconPicker } from 'e-icon-picker';
export default {
  components: {
    TreeSelect,
    EIconPicker
  },

  data () {
    return {
      visible: false,
      title: '',
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
      options: {
        FontAwesome: true,
        eIcon: true,
        zIndex: 3100
      },
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
      this.visible = true
      await getAllPerm().then(res => {
        this.treeList = res.data
      })
      this.$nextTick(() => {

        // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        // this.$refs.ruleForm.resetFields()
        this.ruleForm = Object.assign({}, record)

        if (Object.keys(record).length != 0) {
          if (record.parentId === 0) {
            // 一级菜单不显示

          } else {
            this.digui(record.parentId, true, this.treeList)
          }
          this.valueId = record.parentId
        }
      })
      this.addoreditFlag = record
    },
    digui (parentId, flag, children) {
      if (flag) {
        children.filter(element => {
          if (element.id === parentId) {
            this.$refs.TreeSelect.valueTitle = element.ext
            return true
          } else {
            this.digui(parentId, false, element.children)
          }
        });
      }
    },
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          if (this.valueId == null || this.valueId == '') {
            params.parentId = 0
          } else {
            params.parentId = this.valueId
          }
          if (Object.keys(this.addoreditFlag).length == 0) {
            addPerm(params).then(res => {
              ElMessage({
                message: '菜单添加成功!',
                type: 'success'
              })
              this.handleClose()
              this.$emit('ok')
            })
          } else {

            eidtPerm(params).then(res => {
              ElMessage({
                message: '用户修改成功!',
                type: 'success'
              })
              this.handleClose()
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
      this.visible = false


    }
  }
}
</script>
<style lang='less' >
.perm_model .el-input {
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
