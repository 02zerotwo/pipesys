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
                         @click="getpipeModelList">查询</el-button>
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
            </el-icon>新增管道模型
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 管道模型信息 -->
      <el-table :data="pipeModelList"
                size="small"
                :highlight-current-row="true"
                v-loading="loading"
                :stripe="true"
                :height="height"
                border>
        <el-table-column label="序号"
                         type="index"
                         width="60"
                         align="center" />

        <el-table-column label="型号编码"
                         width="170"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.pipeNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="管道名称"
                         width="180"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.pipeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="管道类型"
                         align="center"
                         width="120"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.pipeType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="管道说明书"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <el-link type="primary"
                     @click="downloadIntroduce(scope.row,scope.row.fileName[0],1)">{{scope.row.fileName[0] }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="管道图片"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <el-image style="height: 100px"
                      fit="contain"
                      :src="'/tp/'+scope.row.fileRelativePath[1]">
            </el-image>

          </template>
        </el-table-column>
        <el-table-column label="管道手册"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <el-link type="primary"
                     @click="downloadIntroduce(scope.row,scope.row.fileName[2],3)">{{scope.row.fileName[2] }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="创建时间"
                         align="center"
                         width="210"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         v-loading="loading"
                         align="center"
                         width="160"
                         fixed="right"
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
    <AddPipeModel ref="addPipeModel"
                  @ok="modalFormOk"></AddPipeModel>
  </el-card>

</template>

<script scope>
import { getAllPipeModel, deletePipeModel } from '@/api/api.js'
import { downloadFile } from '@/api/manage.js'
import AddPipeModel from './components/AddPipeModel.vue'
import Pagination from '@/components/Pagination'
export default {
  components: {
    AddPipeModel,
    Pagination,
  },
  data () {
    return {
      selectForm: { key: '' },
      height: '',
      pipeModelList: [],//当前页要展示的数据
      formData: {},//表单数据
      loading: false,
      // 分页
      paginations: {
        // 默认显示第几页
        pageNo: 1,
        // 默认每页显示的条数（可修改）
        pageSize: 10
      }
    }
  },
  // VUE对象初始化完成后自动执行
  created () {
    this.getpipeModelList()
    //动态计算高度
    let height = document.documentElement.clientHeight
    this.height = height - 300
  },

  methods: {
    // 获取管道模型列表数据
    getpipeModelList () {
      this.loading = true
      const params = {
        key: this.selectForm.key,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getAllPipeModel(params).then(res => {
        if (res.status === 200) {
          this.pipeModelList = res.data.list
          this.paginations.total = res.data.total
          this.loading = false
        }
      })
    },
    downloadIntroduce (row, fname, num) {
      downloadFile('/model/download', fname, { id: row.id, num: num })
    },
    handleAdd () {
      this.$refs.addPipeModel.add()
      this.$refs.addPipeModel.title = '新增管道模型'
    },
    handleEdit (row) {
      this.$refs.addPipeModel.edit(row)
      this.$refs.addPipeModel.title = '编辑管道模型'
    },
    modalFormOk () {
      this.getpipeModelList()
    },
    handleDel (row) {
      deletePipeModel({ id: row.id }).then(res => {
        if (res.status === 200) {
          this.$message.success('删除管道模型成功!')
          this.getpipeModelList()
        }
      })
    },
    reset () {
      // 重置搜索关键词
      this.selectForm.key = ''
      this.getpipeModelList()
    }
  }
}
</script>
<style >
</style>
