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
                        v-model="selectForm.orgName"
                        placeholder="请输入组织名"></el-input>
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
            </el-icon>新增组织
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 组织信息 -->
      <el-table :data="orgList"
                size="small"
                :highlight-current-row="true"
                :stripe="true"
                :height="420"
                border
                v-loading="loading">
        <el-table-column label="序号"
                         type="index"
                         width="60"
                         align="center" />

        <el-table-column label="组织机构"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="机构代码"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.orgaNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行业类型"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.type.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="位置"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注信息"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.ext }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <el-button type="primary"
                       size="mini"
                       @click="handleAddE(scope.row)">新增员工</el-button>
            <el-button type="primary"
                       size="mini"
                       @click="handleView(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页  -->
      <div class="block">
        <Pagination :pageSize="paginations.pageSize"
                    :pageTotal="paginations.total"
                    @pageFunc="pageFunc"></Pagination>

      </div>
      <add-org ref="addOrg" @ok="modalFormOk" />
      <view-org-user ref="view" />
      <add-employee ref="addE" />
    </div>
  </el-card>

</template>

<script scope>
import { getAllOrgs } from '@/api/api.js'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination'
import AddOrg from './components/AddOrg.vue'
import ViewOrgUser from './components/ViewOrgUser.vue'
import AddEmployee from './components/AddEmployee.vue'
export default {
  components: {
    Pagination,
    AddOrg,
    ViewOrgUser,
    AddEmployee
  },
  data() {
    return {
      loading: false,
      selectForm: {
        orgName: '',
      },
      orgList: [
        {
          id: '',
          name: '',
          parentId: '',
          type: [],
          location: '',
          orgaNumber: '',
          ext: '',
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
  // 页面加载时就加载组织信息
  created() {
    this.getOrgList()
  },

  methods: {
    query() {
      this.loading = true
      const params = {
        orgName: this.selectForm.orgName,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize,
      }
      getAllOrgs(params).then((res) => {
        if (res.status === 200) {
          ElMessage({
            message: '查询成功!',
            type: 'success',
          })
          this.orgList = res.data.list
          this.paginations.total = res.data.total
          this.loading = false
        }
      })
    },
    reset() {
      // 重置搜索关键词
      this.selectForm.orgName = ''
      this.getOrgList()
    },
    // 获取组织列表数据
    getOrgList() {
      this.loading = true
      const params = {
        orgName: '',
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize,
      }
      getAllOrgs(params).then((res) => {
        if (res.status === 200) {
          this.orgList = res.data.list
          this.paginations.total = res.data.total
          this.loading = false
        }
      })
      
    },
    handleAdd() {
      this.$refs.addOrg.add()
      this.$refs.addOrg.title = '组织新增页面'
    },
    handleAddE(row) {
      this.$refs.addE.add(row)
      this.$refs.addOrg.title = '新增员工'
    },
    handleView(row) {
      this.$refs.view.show(row)
      this.$refs.view.title = '员工信息列表'
    },
    modalFormOk() {
      // 添加完机构的回调函数
      this.getOrgList()
    },
    pageFunc(data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.getOrgList() // 请求数据的函数
    },
  },
}
</script>
<style >
</style>
