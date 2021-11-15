<template>
  <el-card class="box-card">
    <template #header>
      <div>
        <el-row>
          <el-button type="primary"
                     size="small"
                     @click="handleAdd()">
            <el-icon>
              <i-plus />
            </el-icon>新增菜单
          </el-button>
        </el-row>
      </div>
    </template>
    <el-table :data="dataList"
              row-key="id"
              border
              default-expand-all>
      <el-table-column prop="ext"
                       label="菜单名称" />
      <el-table-column prop="name"
                       label="权限名称" />
      <el-table-column prop="icon"
                       label="图标">
        <template #default="scope">
          <el-icon :class="scope.row.icon">
          </el-icon>
          <span style="margin-left: 10px">{{ scope.row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="path"
                       label="路径" />
      <el-table-column label="操作"
                       align="center"
                       header-align="center">
        <template #default="scope">
          <el-button type="primary"
                     size="mini"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm confirm-button-text="确定"
                         cancel-button-text="取消"
                         icon-color="red"
                         @confirm="handleDel(scope.row)"
                         title="确定删除这条数据吗?">
            <template #reference>
              <el-button size="mini">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <PermModel ref="permModel"
               @ok="modalFormOk"></PermModel>
  </el-card>

</template>

<script scope>
import { getAllPerm, deletePerm } from '@/api/api.js'
import PermModel from './components/PermModel.vue'
import { ElMessage } from 'element-plus'
export default {
  components: {
    PermModel,

  },
  data () {
    return {
      dataList: [{
        id: '',
        name: '',
        ext: '',
        icon: '',
        perms: [],
      }
      ],
    }
  },
  computed: {

  },
  // 页面加载时就加载用户信息
  created () {
    this.loadData()
  },

  methods: {
    // 获取用户列表数据
    loadData () {
      getAllPerm().then(res => {
        if (res.status === 200) {
          this.dataList = res.data
        }
      })
    },
    handleAdd () {
      this.$refs.permModel.add();
      this.$refs.permModel.title = "新增菜单页面"
    },
    handleEdit (row) {
      this.$refs.permModel.edit(row);
      this.$refs.permModel.title = "编辑菜单页面"
    },
    // 删除的逻辑
    handleDel (row) {

      let params = {
        id: row.id
      }
      deletePerm(params).then(res => {
        if (res.status === 200) {
          this.loadData()
          ElMessage({
            message: '菜单删除成功!',
            type: 'success'
          })
        }

      })
    },
    modalFormOk () { // 添加完用户的回调函数
      this.loadData()

    }

  }
}
</script>
<style lang='less'>
</style>
