<template>
<el-dialog v-model="visible"
             :title="title"
             @close="close">
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
            </el-icon>新增员工
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 用户信息 -->
      <el-table :data="employees"
                size="small"
                :highlight-current-row="true"
                :stripe="true"
                :height="420"
                border>
        <el-table-column label="序号"
                         type="index"
                         width="60"
                         align="center" />

        <el-table-column label="员工名"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.phone }}</span>
          </template>
        </el-table-column>
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
      <!-- 分页  -->
      <div class="block">
        <Pagination :pageSize="paginations.pageSize"
                    :pageTotal="paginations.total"
                    @pageFunc="pageFunc"></Pagination>

      </div>

    </div>
  </el-card>
</el-dialog>

</template>

<script scope>
import { getAllUsers, deleteUser, getUserByOrgId } from '@/api/api.js'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      visible: false,
      title: '',
      selectForm: {
        key: ''
      },
      employees: [{
        id: '',
        username: '',
        phone: '',
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
  methods: {
    show (row) {
      console.log(row)
      this.visible = true
      const params = {
        orgaId : row.id
      }
      getUserByOrgId(params).then((res => {
        console.log(res.data)
        this.employees = res.data
        this.paginations.total = res.data.length
      }))
    },
    query () {
      const params = {
        key: this.selectForm.key,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getAllUsers(params).then(res => {
        this.employees = res.data.list
      })

    },
    reset () {
      // 重置搜索关键词
      this.selectForm.key = ''
      this.getEmployees()
    },
    pageFunc (data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.getEmployees()// 请求数据的函数
    }
  }
}
</script>
<style >
</style>
