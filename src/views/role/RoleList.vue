<template>
  <el-card class="box-card">
    <template #header>
      <div>
        <el-row>
          <el-form ref="selectForm"
                   :inline="true"
                   :model="selectForm"
                   class="demo-form-inline">

            <el-form-item prop="userName">
              <el-input size="medium"
                        style="width:220px"
                        v-model="selectForm.key"
                        placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium"
                         type="primary"
                         @click="query">查询</el-button>
              <el-button size="medium"
                         @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-button type="primary"
                     size="small"
                     @click="handleAdd()">
            <el-icon>
              <i-plus />
            </el-icon>新增权限
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 权限信息 -->
      <el-table :data="dataList"
                v-loading="loading"
                size="small"
                :highlight-current-row="true"
                :stripe="true"
                :height="420"
                border>
        <el-table-column label="序号"
                         type="index"
                         width="60"
                         align="center" />

        <el-table-column label="角色编码"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.ext }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <el-button type="primary"
                       size="mini"
                       @click="handleEdit(scope.row)">授权</el-button>
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
      <!-- 分页  -->
      <div class="block">
        <Pagination :pageSize="paginations.pageSize"
                    :pageTotal="paginations.total"
                    @pageFunc="pageFunc"></Pagination>

      </div>
      <AddRole ref="AddRole"
               @ok="modalFormOk"></AddRole>
      <EditRole ref="EditRole"
                @ok="modalFormOk"></EditRole>
    </div>
  </el-card>

</template>

<script scope>
import { getAllRole, deleteRole } from '@/api/api.js'
import { ElMessage } from 'element-plus'
import AddRole from './components/AddRole.vue'
import EditRole from './components/EditRole.vue'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination,
    AddRole,
    EditRole
  },
  data () {
    return {
      selectForm: {
        key: ''
      },
      loading: true,
      dataList: [{
        id: '',
        name: '',
        ext: '',
        perms: [],
      }
      ],

      // 分页
      paginations: {
        // 默认显示第几页
        pageNo: 1,
        // 默认每页显示的条数（可修改）
        pageSize: 10
      }
    }
  },
  computed: {

  },
  // 页面加载时就加载用户信息
  created () {
    this.loadData()
  },

  methods: {
    query () {
      this.loading = true
      const params = {
        roleName: this.selectForm.key,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getAllRole(params).then(res => {
        if (res.status === 200) {
          this.dataList = res.data.list
          this.paginations.total = res.data.total
          this.loading = false

        }
      })
    },
    reset () {
      // 重置搜索关键词
      this.selectForm.key = ''
      this.loadData()
    },
    // 获取用户列表数据
    loadData () {
      this.loading = true
      const params = {
        roleName: '',
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getAllRole(params).then(res => {
        if (res.status === 200) {
          this.dataList = res.data.list
          this.paginations.total = res.data.total
          this.loading = false
        }
      })
    },
    handleAdd () {
      this.$refs.AddRole.add()
      this.$refs.AddRole.title = '权限新增页面'
    },
    handleEdit (row) {
      this.$refs.EditRole.edit(row)
    },
    // 删除的逻辑
    handleDel (row) {
      const params = {
        id: row.id
      }
      deleteRole(params).then(res => {
        ElMessage({
          message: '用户删除成功!',
          type: 'success'
        })
        this.loadData()
      })
    },
    modalFormOk () { // 添加完用户的回调函数
      this.loadData()

    },
    pageFunc (data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.loadData()// 请求数据的函数
    }

  }
}
</script>
<style >
</style>
