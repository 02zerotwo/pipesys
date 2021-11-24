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
                :height="420"
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
            <el-link type="primary">{{scope.row.pipeIntroduce }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="管道图片"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <el-image style="height: 100px"
                      fit="contain"
                      :src="scope.row.pipePic">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="管道手册"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <el-link type="primary">{{scope.row.pipeManual }}</el-link>
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
// import { getAllPipeModel } from '@/api/api.js'
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
      pipeModelList: [
        {
          "id": null,
          "pipeName": "管道名01",
          "pipeNumber": "998管道",
          "pipeType": "多波纹",
          "pipeIntroduce": "",
          "pipePic": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          "pipeManual": "管道手册后台名1",
          "createTime": null
        },
        {
          "id": null,
          "pipeName": "管道名2",
          "pipeNumber": "9992管道",
          "pipeType": "单波纹",
          "pipeIntroduce": "管道说明书后台名2",
          "pipePic": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          "pipeManual": "管道手册后台名2",
          "createTime": null
        }
      ],//当前页要展示的数据
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
  },

  methods: {
    // 获取管道模型列表数据
    getpipeModelList () {
      // const params = {
      //   key: '',
      //   pageNo: this.paginations.pageNo,
      //   pageSize: this.paginations.pageSize
      // }
      // getAllPipeModel(params).then(res => {
      //   if (res.status === 200) {
      //     this.pipeModelList = res.data.list
      //     this.paginations.total = res.data.total
      //   }
      // })
    },
    handleAdd () {
      this.$refs.addPipeModel.add()
      this.$refs.addPipeModel.title = '新增管道模型'
    },
    handleEdit (row) {
      this.$refs.addPipeModel.edit(row)
      this.$refs.addPipeModel.title = '编辑管道模型'
    },
  }
}
</script>
<style >
</style>
