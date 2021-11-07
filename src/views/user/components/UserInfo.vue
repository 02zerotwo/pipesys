<template>
  <el-table :data="userInfo"
                size="small"
                :highlight-current-row="true"
                :stripe="true"
                border>
        <el-table-column label="序号"
                         type="index"
                         width="60"
                         align="center" />

        <el-table-column label="用户名"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户角色"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span v-for="(item) in scope.row.roles"
                  v-bind:key="item"> {{item.name+' '}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注信息"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span v-for="(item) in scope.row.roles"
                  v-bind:key="item"> {{item.ext+' '}}</span>
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
      <add-user ref="editUser"
             @ok="modalFormOk"></add-user>
</template>

<script>
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination'
import AddUser from './AddUser'
import { getUserById, deleteUser, getAllUsers } from '@/api/api.js'
export default {
  components: {
    Pagination,
    AddUser
  },
  props: {
    userId: String
  },
  data () {
    return {
      userInfo: [{
        username: '',
        roles: [],
        phone: ''
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
  // 页面加载时就加载用户信息
  mounted () {
    this.getUserList()
  },
  methods: {
    // 根据用户id查询用户
    queryById () {
      const params = {
        id: this.userId
      }
      getUserById(params).then(res => {
        console.log(res.data)
        if (res.status === 200) {
          console.log(this.userInfo)
          this.userInfo = []
          this.userInfo[0] = res.data
          // console.log(this.userInfo)
        }
      })
    },
    // 获取用户列表数据
    getUserList () {
      const params = {
        key: '',
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getAllUsers(params).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.userInfo = res.data.list
          this.paginations.total = res.data.total
        }
      })
    },
    handleEdit (row) {
      this.$refs.editUser.edit(row)
      this.$refs.editUser.title = '用户编辑页面'
    },
    // 删除的逻辑
    handleDel (row) {
      const params = {
        id: row.id
      }
      deleteUser(params).then(res => {
        ElMessage({
          message: '用户删除成功!',
          type: 'success'
        })
        this.getUserList()
      })
    },
    modalFormOk () { // 添加完用户的回调函数
      this.getUserList()
      this.$refs.editUser.close()
    },
    pageFunc (data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.getUserList()// 请求数据的函数
    }
  }
}

</script>
