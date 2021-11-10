<template>
  <div>
    <el-drawer v-model="visible"
               title="用户权限配置"
               :direction="rtl"
               :before-close="handleClose">
      <el-tree :props="props"
               :load="loadNode"
               lazy
               show-checkbox />
      <span class="drawe-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary"
                   @click="handleOk">提交</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import { } from '@/api/api.js'
import { ElMessage } from 'element-plus'

export default {
  components: {},

  data () {
    return {
      visible: false,
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf',
      },

    }
  },

  computed: {},

  methods: {
    edit (record) {
      this.visible = true
      this.$nextTick(() => { // 待dom生成以后再来获取dom对象
        // 用来编辑给输入框赋予初始值
        this.$refs.ruleForm.resetFields() // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果


      })
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region' }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const data = [
          {
            name: 'leaf',
            leaf: true,
          },
          {
            name: 'zone',
          },
        ]

        resolve(data)
      }, 500)
    },
    handleOk () {

    },
    handleClose () {
      this.visible = false

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
