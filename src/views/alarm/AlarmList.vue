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
              <el-select v-model="selectForm.key"
                         placeholder="请选择报警状态">
                <el-option label="已处理"
                           value="1"></el-option>
                <el-option label="未处理"
                           value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="selectForm.date"
                              type="datetimerange"
                              range-separator="To"
                              value-format="YYYY-MM-DD HH:mm:ss"
                              start-placeholder="起始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
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
      </div>
    </template>
    <div>
      <!-- 报警信息 -->
      <el-table :data="dataList"
                v-loading="loading"
                size="small"
                :highlight-current-row="true"
                :stripe="true"
                :height="420"
                border>
        <el-table-column label="序号"
                         type="index"
                         width="60"
                         align="center" />
        <el-table-column label="报警传感器"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{scope.row.sensor==null?'':scope.row.sensor.sensorName}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="报警管道"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px"> {{scope.row.sensorCode}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="数据点名称"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{scope.row.sensor==null?'':scope.row.sensor.sensorModel.dataPointName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="当前值"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.currentValue}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报警内容"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.alarmMsg}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否处理"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <el-tag :type="scope.row.isHandled ? 'success' : 'danger'"
                    disable-transitions>{{ scope.row.isHandled?'已处理':'未处理'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="报警时间"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.alarmTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="120"
                         header-align="center">
          <template #default="scope">
            <el-button type="primary"
                       size="mini"
                       @click="handleEdit(scope.row)">更改状态</el-button>
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
import { getAlarm, editAlarm } from '@/api/api.js'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      selectForm: {
        key: '',
        date: []
      },
      dataList: [
      ],
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
  computed: {

  },
  // 页面加载时就加载用户信息
  created () {
    this.loadData()
  },


  methods: {

    reset () {
      // 重置搜索关键词
      this.selectForm.key = ''
      this.selectForm.date = []
      this.loadData()
    },
    // 获取用户列表数据
    loadData () {
      this.loading = true
      let date = this.selectForm.date

      const params = {
        from: date.length == 0 ? '' : date[0],
        end: date.length == 0 ? '' : date[1],
        key: this.selectForm.key,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }

      getAlarm(params).then(res => {
        if (res.status === 200) {
          this.dataList = res.data.list
          this.paginations.total = res.data.total
          this.loading = false
        }
      })
    },
    handleEdit (row) {
      let params = row
      params.isHandled = !row.isHandled
      editAlarm(params).then(res => {
        if (res.status === 200) {
          this.$message.success('更改状态成功!')
          this.loadData()
        }
      })
    },
    modalFormOk () { // 添加完用户的回调函数
      this.loadData()

    },
    pageFunc (data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.loadData()// 请求数据的函数
    }

  }
}
</script>
<style >
</style>
