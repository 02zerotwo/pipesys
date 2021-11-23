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
                        v-model="selectForm.sensorModelName"
                        placeholder="请输入想要查找的模型"></el-input>
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
            </el-icon>新增模型
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 传感器模型信息 -->
      <el-table :data="sensorModelList"
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

        <el-table-column label="设备名称"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.deviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备类型"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.deviceType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备编号"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.type.deviceNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="协议"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.protocol }}</span>
          </template>
        </el-table-column>
        <el-table-column label="upInterval"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.upInterval }}</span>
          </template>
        </el-table-column>
        <el-table-column label="dataPointName"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.dataPointName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="dataPointExtra"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.dataPointExtra }}</span>
          </template>
        </el-table-column>
        <el-table-column label="lowThreshold"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.lowThreshold }}</span>
          </template>
        </el-table-column>
        <el-table-column label="highThreshold"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.highThreshold }}</span>
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
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      loading: false,
      selectForm: {
        sensorModelName: '',
      },
      sensorModelList: [
        {
          id: '',
          deviceName: '',
          deviceType: '',
          deviceNumber: '',
          createTime: '',
          upInterval: '',
          dataPointName: '',
          dataPointExtra: '',
          lowThreshold: '',
          highThreshold: ''
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
  },

  methods: {
    query() {
      this.loading = true
    },
    reset() {
      // 重置搜索关键词
      this.selectForm.orgName = ''
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
  }
}
</script>
<style >
</style>
