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
            <el-button type="danger"
                       v-if="multipleSelectionFlag"
                       @click="popDelete">批量删除
            </el-button>
            <el-dialog v-model="multiDeleteVisible"
                       title="提示"
                       width="30%">
              <h1>该数据删除后不可恢复，你确定要删除吗？</h1>
              <template v-slot:footer>
                <el-button type="primary"
                           @click="multiDelete">确 定</el-button>
                <el-button @click="multiDeleteVisible = false">取 消</el-button>
              </template>
            </el-dialog>
          </el-row>
        </div>
      </template>
      <div>
        <!-- 机构信息 -->
        <el-table :data="employees"
                  size="small"
                  :highlight-current-row="true"
                  :stripe="true"
                  :height="420"
                  v-model="loading"
                  @selection-change="handleSelectionChange"
                  border>
          <el-table-column type="selection"
                           width="50"
                           align="center" />
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
import { getOrgUser, getUserByOrgId } from '@/api/api.js'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination'
import { axios } from '@/utils/request'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      visible: false,
      title: '',
      loading: false,
      multipleSelectionFlag: false, // 是否显示批量删除按钮
      multiDeleteVisible: false, // 批量删除对话框
      multipleSelection: '',
      selectForm: {
        key: '',
      },
      employees: [
        {
          id: '',
          username: '',
          phone: '',
        },
      ],
      // 分页
      paginations: {
        // 默认显示第几页
        pageNo: 1,
        // 默认每页显示的条数（可修改）
        pageSize: 10,
      },
    }
  },
  computed: {},
  methods: {
    show(row) {
      this.loading = true
      this.visible = true
      this.orgaId = row.id
      this.getUsers()
    },
    getUsers() {
      const params = {
        orgaId: this.orgaId,
        username: '',
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getUserByOrgId(params).then((res) => {
        this.employees = res.data.list
        this.paginations.total = res.data.total
        this.loading = false
      })
    },
    query() {
      this.loading = true
      const params = {
        orgaId: this.orgaId,
        username: this.selectForm.key,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getOrgUser(params).then((res) => {
        if (res.status === 200) {
          ElMessage({
            message: '查询成功!',
            type: 'success',
          })
          this.employees = res.data.list
          this.paginations.total = res.data.length
          this.loading = false
        }
      })
    },
    reset() {
      // 重置搜索关键词
      this.selectForm.key = ''
      this.getUsers()
      ElMessage({
        message: '重置成功!',
        type: 'success',
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
      this.multipleSelectionFlag = true
      if (this.multipleSelection.length == 0) {
        // 如不进行判断则勾选完毕后批量删除按钮还是会在
        this.multipleSelectionFlag = false
      }
    },
    popDelete() {
      this.multiDeleteVisible = true
    },
    multiDelete() {
      this.multiDeleteVisible = false
      const checkArr = this.multipleSelection // multipleSelection存储了勾选到的数据
      const ids = []
      checkArr.forEach(function (item) {
        ids.push(item.id) // 添加所有需要删除数据的id到一个数组
      })
      let params = '?idArrays=' + ids[0]
      for (let i = 1; i <= ids.length - 1; i++) {
        params += '&idArrays=' + ids[i]
      }
      // 批量删除
      axios.delete('/sys/user/ids' + params).then((res) => {
        ElMessage({
          message: '成功删除!',
          type: 'success',
        })
        this.visible = false
      })
    },
    pageFunc(data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.getUsers() // 请求数据的函数
    },
    close() {
      this.visible = false
    },
  },
}
</script>
<style >
</style>
