<template>
  <el-card class="box-card">
    <template #header>
      <div>
        <el-row>
          <el-form ref="dailyForm"
                   :inline="true"
                   :model="dailyForm"
                   class="demo-form-inline">
            <el-form-item>
              <el-input size="medium"
                        style="width:220px"
                        v-model="dailyForm.key"
                        placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium"
                         type="primary"
                         @click="loadData">查询</el-button>
              <el-button size="medium"
                         @click="reset">重置</el-button>
            </el-form-item>

          </el-form>

        </el-row>
        <el-row>
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
                :height="height"
                border>
        <el-table-column label="序号"
                         type="index"
                         width="75"
                         align="center" />
        <el-table-column label="操作者"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <el-table-column label="执行方法"
                         align="center"
                         width="300"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.operType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模块"
                         align="center"
                         width="300"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.moduleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结果"
                         align="center"
                         width="200"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.result==1?'成功':'失败' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="日志时间"
                         align="center"
                         width="400"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{dayformat(scope.row.operTimer)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="执行操作"
                         align="center"
                         :width="160"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.operConent}}</span>
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

<script >

import { getLog } from '@/api/api.js'
import Pagination from '@/components/Pagination'
import { formatTime } from '@/utils/index.js'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      dailyForm: {
        key: ''
      },
      dataList: [{ // 表单的属性要对应数据的字段,目前没有进行驼峰转换处理
        id: '',
        username: "",
        operType: "",
        moduleName: "",
        result: "",
        operTimer: "",
        operConent: ""
      }
      ],
      height: '',
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
  computed: {

  },
  //页面加载时就加载用户信息
  created () {
    this.loadData()
    let height = document.documentElement.clientHeight
    this.height = height - 300
  },

  methods:
  {
    dayformat (data) {
      data = formatTime(data, 'yyyy-MM-dd HH: mm: ss')
      return data
    },
    loadData () {
      this.loading = true
      let params = {
        key: this.dailyForm.key,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getLog(params).then(res => {
        if (res.status === 200) {
          this.dataList = res.data.list
          this.paginations.total = res.data.total
          this.loading = false
        }
      })

    },
    pageFunc (data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.loadData()// 请求数据的函数
    },
    reset () {
      // 重置搜索关键词
      this.dailyForm.key = ''
      this.loadData()
    },
  }
}
</script>
<style >
</style>
