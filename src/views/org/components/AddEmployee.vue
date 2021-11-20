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
            <el-button type="primary" @click="popAdd">批量新增
            </el-button>
            <el-dialog v-model="multiAddVisible" title="提示" width="30%">
                  <h1>你确定要新增该数据吗？</h1>
                  <template v-slot:footer>
                    <el-button type="primary" @click="multiAdd">确 定</el-button>
                    <el-button @click="multiAddVisible = false">取 消</el-button>
                  </template>
            </el-dialog>
          </el-row>
        </div>
      </template>
      <div>
        <!-- 用户信息 -->
        <el-table :data="userList"
                  v-loading="loading"
                  size="small"
                  :highlight-current-row="true"
                  :stripe="true"
                  :height="420"
                  @selection-change="handleSelectionChange"
                  border>
          <el-table-column type="selection"
                          width="50"
                          align="center" />
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
          <el-table-column label="手机号"
                          align="center"
                          header-align="center">
            <template #default="scope">
              <span>{{scope.row.phone }}</span>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </el-card>
  </el-dialog>
</template>

<script scope>
import { getOtherUsers, getAllUsers, addOtherUser } from '@/api/api.js'
import { ElMessage } from 'element-plus'
export default {
  components: {
  },
  data () {
    return {
      visible: false,
      title: '',
      multiAddVisible: false,    // 批量新增对话框
      multipleSelection: '',
      orgaId: '', // 根据机构id显示此机构之外的用户
      selectForm: {
        key: ''
      },
      userList: [ {
        username: '',
        phone: '',
        }
      ],
      loading: false,
    }
  },
  computed: {

  },

  methods: {
    query () {
      this.loading = true
      const params = {
        key: this.selectForm.key,
        pageNo: 1,
        pageSize: 100
      }
      getAllUsers(params).then((res => {
        if (res.status === 200) {
          this.userList = res.data.list
          this.loading = false
        }
      }))

    },
    reset () {
      // 重置搜索关键词
      this.selectForm.key = ''
      this.getUserList()
    },
    // 获取其他用户列表数据
    getUserList () {
      this.loading = true
      const params = {
        orgaId: this.orgaId,
      }
      getOtherUsers(params).then(res => {
        this.userList = res.data
        this.loading = false
      })
    },
    add (row) {
      this.visible = true
      this.orgaId = row.id
      this.getUserList()
      console.log(this.orgaId)
    },
    popAdd () {
      this.multiAddVisible = true
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    multiAdd () {
      this.multiAddVisible = false
      const checkArr = this.multipleSelection  // multipleSelection存储了勾选到的数据
      const arrays = []
      checkArr.forEach(function (item) {
        console.log(item.id)
        arrays.push(item.id)  // 添加所有需要删除数据的id到一个数组
      })
      console.log(arrays)
      const params = {
        orgaId: this.orgaId,
        idArrays: arrays
      }
      addOtherUser(params).then((res => {
        ElMessage({
          message: '新增成功!',
          type: 'success',
        })
        this.visible = false
      }))
    },
    modalFormOk () { // 添加完用户的回调函数
      this.getUserList()

    },
    pageFunc (data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.getUserList()// 请求数据的函数
    }

  }
}
</script>
<style >
</style>
