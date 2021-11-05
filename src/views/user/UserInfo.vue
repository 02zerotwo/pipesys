<template>
  <el-form ref="selectForm" :inline="true" :model="selectForm" class="demo-form-inline"  >
    <el-form-item label="搜索用户信息：" prop="userId">
      <el-input v-model="selectForm.userId" placeholder="请输入用户id"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
  <div class="addU">
    <el-button type="primary" @click="handleAdd()"
        >+新增用户</el-button
      >
  </div>
  <!-- 用户信息 -->
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
      <el-table-column label="操作" align="center" header-align="center">
        <template #default="scope">
          <el-button type="primary"  size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
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
      <!-- 新增用户 -->
  <el-dialog v-model="dialogFormVisible1" title="添加用户信息" >
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户名称"></el-input>
      </el-form-item>
      <el-form-item label="角色名" :label-width="formLabelWidth">
        <el-select v-model="form.roleName" placeholder="请选择用户角色">
          <el-option label="超级管理员" value="superAdmin"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
        <el-button type="primary" @click="dialogAddConfirm()"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog v-model="dialogFormVisible2" title="更改用户信息">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户名称"></el-input>
      </el-form-item>
      <el-form-item label="角色名" :label-width="formLabelWidth">
        <el-select v-model="form.roleName" placeholder="请选择用户角色">
          <el-option label="超级管理员" value="superAdmin"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="dialogEditConfirm()"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { getAllUsers, select } from '../../api/user'
export default {
  components: {
  },
  data () {
    return {
      form: { // 弹出框信息
        name: '',
        roleName: ''
      },
      dialogFormVisible1: false, // 控制新增弹出框的显示与否
      dialogFormVisible2: false, // 控制编辑弹出框的显示与否
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
      // 重置搜索关键词
    },
    // 获取用户列表数据
    getUserList (currentPage, PageSize) {
      getAllUsers(currentPage, PageSize).then(res => {
        console.log(res)
        this.userList = res.data
      })
    },
    handleAdd () {
      this.dialogFormVisible1 = true
    },
    dialogAddConfirm () {
      // 请求新增用户
    },
    dialogEditConfirm () {
      // 请求更新用户
    },
    handleEdit (row) {
      this.$confirm('是否更新此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.dialogFormVisible2 = true
      })
    },
    // 删除的逻辑
    handleDel (row) {
      this.$confirm('是否删除此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
      })
    }
  }
}
</script>
<style >
  .addU {
    float: left;
    margin-left: 10px;
    margin-bottom: 10px;
  }
</style>
