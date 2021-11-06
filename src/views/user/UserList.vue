<template>
  <el-card class="box-card">
    <template #header>
      <div>
        <el-row>
          <el-form ref="selectForm"
                   :inline="true"
                   :model="selectForm"
                   class="demo-form-inline">

            <el-form-item label="用户名："
                          prop="userName">
              <el-input size="medium"
                        style="width:220px"
                        v-model="selectForm.userName"
                        placeholder="请输入用户名"></el-input>
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
            </el-icon>新增用户
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 用户信息 -->
      <el-table :data="userList"
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
                  v-bind:key="item"> {{item.ext+' '}}</span>
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
            <span>{{ scope.row.roleExt }}</span>
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
      <!-- 分页 -->
      <!-- <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginations.currentPage"
          :page-sizes="paginations.pageSizes"
          :page-size="paginations.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </div> -->

    </div>
    <addUser ref="addUser"
             @ok="modalFormOk"></addUser>
  </el-card>

</template>

<script scope>
import { getAllUsers, deleteUser } from '@/api/api.js'
import { ElMessage } from 'element-plus'
import addUser from './components/addUser.vue'
export default {
  components: {
    addUser
  },
  data () {
    return {
      selectForm: {
        userName: ''
      },
      userList: [{
        id: '',
        username: '',
        phone: '',
        roleName: '',
        roleExt: ''
      }
      ],
      // 分页
      paginations: {
        // 默认显示第几页
        pageNo: 1,
        // 默认每页显示的条数（可修改）
        pageSize: 12
      }
    }
  },
  // 页面加载时就加载用户信息
  mounted () {
    this.getUserList()
  },

  methods: {
    query () {
      const params = {
        key: this.selectForm.userName,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getAllUsers(params).then(res => {
        if (res.status === 200) {
          this.userList = res.data.list
        }
      })
    },
    reset () {
      // 重置搜索关键词
      this.selectForm.userName = ''
      this.getUserList()
    },
    // 获取用户列表数据
    getUserList () {
      const params = {
        key: '',
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getAllUsers(params).then(res => {
        if (res.status === 200) {
          this.userList = res.data.list
        }
      })
    },
    handleAdd () {
      this.$refs.addUser.add()
      this.$refs.addUser.title = '用户新增页面'
    },
    handleEdit (row) {
      this.$refs.addUser.edit(row)
      this.$refs.addUser.title = '用户编辑页面'
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
      this.$refs.addUser.close()
    }
  }
}
</script>
<style >
</style>
