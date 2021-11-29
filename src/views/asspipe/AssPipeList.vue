<template>
  <el-card class="box-card">
    <template #header>
      <div>
        <el-row>
          <el-form ref="selectForm"
                   :inline="true"
                   :model="selectForm"
                   class="demo-form-inline">
            <el-form-item>
              <el-input size="medium"
                        style="width:220px"
                        v-model="selectForm.key"
                        placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium"
                         type="primary"
                         @click="getpipeList">查询</el-button>
              <el-button size="medium"
                         @click="reset">重置</el-button>
            </el-form-item>

          </el-form>

        </el-row>
        <el-row>
          <el-button type="primary"
                     size="small"
                     @click="handleAdd">
            <el-icon>
              <i-plus />
            </el-icon>新增管道
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 用户信息 -->
      <el-table :data="dataList"
                size="small"
                :highlight-current-row="true"
                :stripe="true"
                v-loading="loading"
                :height="420"
                border>
        <el-table-column label="管道序号"
                         type="index"
                         width="75"
                         align="center" />
        <el-table-column label="管道名"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.productName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="管道编码"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="管道模型"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.pipeModel == null ? '' : scope.row.pipeModel.pipeName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="机构名"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.organize == null ? '' : scope.row.organize.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="项目名称"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.item == null ? '' : scope.row.item.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="传感器名称"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.sensor == null ? '' : scope.row.sensor.sensorName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="生产时间"
                         align="center"
                         :width="160"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.manuDate}}</span>
          </template>
        </el-table-column>

        <el-table-column label="出厂时间"
                         align="center"
                         :width="160"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.productDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         align="center"
                         :width="160"
                         fixed="right"
                         header-align="center">
          <template #default="scope">
            <el-button type="primary"
                       size="mini"
                       @click="handleEdit(scope.row)">修改</el-button>
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
    <Addpipe ref="Addpipe"
             @ok="modalFormOk"></Addpipe>
  </el-card>

</template>

<script >
import { getPipes } from '@/api/api.js'
import Addpipe from './components/Addpipe.vue'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Addpipe,
    Pagination

  },
  data () {
    return {
      selectForm: {
        key: ''
      },
      dataList: [{ // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        productName: "",
        productCode: "",
        manuDate: "",
        productDate: '',
        pipeModel: { pipeName: '' },
        item: { name: '' },
        sensor: { sensorName: '' },
        organize: {
          name: ''
        }
      }],
      // 分页
      paginations: {
        // 默认显示第几页
        pageNo: 1,
        // 默认每页显示的条数（可修改）
        pageSize: 10
      },
      loading: false,

    }
  },
  /*computed: {

  },*/
  // 页面加载时就加载用户信息
  created () {
    this.getpipeList()
  },

  methods:
  {
    getpipeList () {
      this.loading = true
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        key: this.selectForm.key
      }
      getPipes(params).then(res => {
        this.dataList = res.data.list
        this.paginations.total = res.data.total
        this.loading = false
      })
    },
    handleAdd () {
      this.$refs.Addpipe.add();
      this.$refs.Addpipe.title = '管道新增页面'
    },
    handleEdit (row) {
      this.$refs.Addpipe.add(row)
    },
    handleDel (row) {
      const params = {
        id: row.id
      }
      delepipe(params).then(res => {
        ElMessage({
          message: '管道删除成功!',
          type: 'success'
        })
        this.getpipeList()
      })
    },
    modalFormOk () { // 添加完用户的回调函数
      this.getpipeList()
    },
    pageFunc (data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.getpipeList()// 请求数据的函数
    },
    reset () {
      // 重置搜索关键词
      this.selectForm.key = ''
      this.getpipeList()
    }
  }
}
</script>
<style >
</style>
