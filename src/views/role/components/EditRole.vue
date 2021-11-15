<template>
  <div>
    <el-drawer v-model="visible"
               title="用户权限配置"
               :direction="rtl"
               :before-close="handleClose">
      <el-tree ref="tree"
               :data="data"
               show-checkbox
               node-key="id"
               default-expand-all
               :props="defaultProps" />
      <span class="drawe-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary"
                   @click="handleOk">提交</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import { getAllPerm, editPerm } from '@/api/api.js'
import { ElMessage } from 'element-plus'

export default {
  components: {},

  data () {
    return {
      visible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'ext',
      },
      currentnodekey: [],
      roelId: ''
    }
  },

  computed: {},

  methods: {
    async edit (record) {
      this.visible = true
      await getAllPerm().then(res => {
        this.data = res.data
      })
      this.$nextTick(() => { // 待dom生成以后再来获取dom对象
        // 用来编辑给输入框赋予初始值
        this.$refs.tree.setCheckedNodes(record.perms)
        this.roelId = record.id

      })
    },
    handleOk () {
      let params = {
        roleId: this.roelId,
        permIdArrays: this.$refs.tree.getCheckedKeys()
      }
      editPerm(params).then(res => {
        ElMessage({
          message: '权限分配成功!',
          type: 'success'
        })
        this.$emit('ok')
        this.handleClose()
      })
    },
    handleClose () {
      this.visible = false
      this.roelId = ''
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
