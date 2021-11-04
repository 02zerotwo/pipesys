<template>
  <el-form ref="selectForm" :inline="true" :model="selectForm" class="demo-form-inline"  >
    <el-form-item label="搜索：" prop="userId">
      <el-input v-model="selectForm.userId" placeholder="请输入用户id"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
   <el-table :data="userinfo" style="width: 100%" border>
     <el-table-column label="用户id" align="center" header-align="center" >
       <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
       </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" header-align="center">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户角色" align="center" header-align="center">
        <template #default="scope">
          <span >{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" header-align="center">
        <template #default="scope">
          <span >{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注信息" align="center" header-align="center">
        <template #default="scope">
          <span >{{ scope.row.roleExt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center" >
          <edit-user/>
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="red"
            title="你确定要删除吗?"
            @confirm="confirmEvent"
            @cancel="cancelEvent"
          >
          <template #reference>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
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
</template>
<script>
import EditUser from './EditUser.vue'
import { getAllUsers, deleteU, select } from '../../api/user'
export default {
  components: {
    EditUser
  },
  data () {
    return {
      selectForm: {
        userId: ''
      },
      userinfo: [{
        id: '',
        username: '',
        phone: '',
        roleName: '',
        roleExt: ''
      }
      ],
      userList: [
      ],
      // 分页
      paginations: {
        // 默认显示第几页
        currentPage: 1,
        // 个数选择器（可修改）
        pageSizes: [1, 2, 3, 4],
        // 默认每页显示的条数（可修改）
        PageSize: 4
      }
    }
  },
  // 页面加载时就加载用户信息
  mounted () {
    this.getUserList(this.paginations.currentPage, this.paginations.PageSize)
  },

  methods: {
    query () {
      select(this.selectForm.userId).then(res => {
        // console.log(res)
        const data = res.data
        // console.log(data)
        const u = this.userinfo[0]
        // console.log(u)
        u.id = data.id
        u.username = data.username
        console.log(u.username)
        u.phone = data.phone
        u.roleName = data.roles[0].name
        u.roleExt = data.roles[0].ext
        // console.log(u.id)
      })
    },
    reset () {
      this.$refs.selectForm.resetFields()
    },
    getUserList (currentPage, PageSize) {
      getAllUsers(currentPage, PageSize).then(res => {
        console.log(res)
        this.userList = res.data
      })
    },
    confirmEvent () {
      deleteU()
    },
    cancelEvent () {
      console.log('cancel!')
    }
  }
}
</script>
