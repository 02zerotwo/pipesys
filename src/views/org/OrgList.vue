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
              <!-- <i-plus /> -->
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
                border>
        <el-table-column label="序号"
                         type="index"
                         width="60"
                         align="center" />

        <el-table-column label="组织名"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属公司"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.parentName }}</span>
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

</template>

<script scope>
import { getAllOrgs} from '@/api/api.js'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination,
  },
  data () {
    return {
      selectForm: {
        key: ''
      },
      orgList: [{
        id: '',
        name: '',
        parentName: '',
        location: '',
        ext: '',
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
  // 页面加载时就加载组织信息
  created () {
    this.getOrgList()
  },

  methods: {
    query () {
      const params = {
        key: this.selectForm.key,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getAllOrgs(params).then(res => {
        if (res.status === 200) {
          this.orgList = res.data.list
          this.paginations.total = res.data.total

        }
      })
    },
    reset () {
      // 重置搜索关键词
      this.selectForm.key = ''
      this.getOrgList()
    },
    // 获取组织列表数据
    getOrgList () {
      const params = {
        orgName: '',
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getAllOrgs(params).then(res => {
        if (res.status === 200) {
          this.orgList = res.data.list
          this.paginations.total = res.data.total

        }
      })
    },
    handleAdd () {
      this.$refs.addUser.add()
      this.$refs.addUser.title = '用户新增页面'
    },
    handleEdit (row) {
      this.$refs.EditUser.edit(row)
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
        this.getOrgList()
      })
    },
    modalFormOk () { // 添加完用户的回调函数
      this.getOrgList()

    },
    pageFunc (data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.getOrgList()// 请求数据的函数
    }

  }
}
</script>
<style >
</style>
