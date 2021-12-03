<template>
  <el-card class="box-card">
    <template #header>
      <div>
        <el-row>
          <el-form ref="select"
                   :inline="true"
                   class="demo-form-inline">
            <el-form-item prop="userName">
              <el-input size="medium"
                        style="width:220px"
                        v-model="selectForm.sensorName"
                        placeholder="请输入想要查询的传感器"></el-input>
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
            </el-icon>新增传感器
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 传感器模型信息 -->
      <el-table :data="sensorList"
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
        <el-table-column label="传感器编码"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.sensorCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="传感器名称"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.sensorName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="传感器模型"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.sensorModel.deviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属项目"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.item.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="协议"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.sensorModel.protocol }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属厂家"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{ scope.row.item.organize.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <el-button type="primary"
                       size="mini"
                       @click="handleModify(scope.row)">修改</el-button>
            <el-popconfirm confirm-button-text="确定"
                           cancel-button-text="取消"
                           icon-color="red"
                           @confirm="handleDelete(scope.row)"
                           title="确定删除这条数据吗?">
              <template #reference>
                <el-button type="danger"
                           size="mini">删除</el-button>
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
      <add-sensor ref="addSensor" @ok="handleFormOK"/>
    </div>
  </el-card>

</template>

<script scope>
import { getSensors, deleteSensor } from '@/api/api.js'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination'
import AddSensor from './AddSensor.vue'
export default {
  components: {
    Pagination,
    AddSensor
  },
  data() {
    return {
      loading: false,
      selectForm: {
        sensorName: '',
      },
      sensorList: [],
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
  // 页面加载时就加载传感器信息
  created() {
    this.getAllSensors()
  },

  methods: {
    getAllSensors() {
      this.loading = true
      const params = {
        key: '',
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getSensors(params).then((res) => {
        console.log(res)
        this.sensorList = res.data.list
        this.paginations.total = res.data.total
        this.loading = false
      })
    },
    query() {
      this.loading = true
      const params = {
        key: this.selectForm.sensorName,
        pageNo: this.paginations.pageNo,
        pageSize: this.paginations.pageSize
      }
      getSensors(params).then((res) => {
        this.sensorList = res.data.list
        this.paginations.total = res.data.total
        this.loading = false
      })
    },
    reset() {
      // 重置搜索关键词
      this.selectForm.sensorName = ''
      this.getAllSensors()
    },
    handleAdd() {
      this.$refs.addSensor.add()
      this.$refs.addSensor.title = '新增传感器'
    },
    handleModify(row) {
      this.$refs.addSensor.edit(row)
      this.$refs.addSensor.title = '编辑传感器'
    },
    handleDelete(row) {
      console.log(row)
      const params = {
        id: row.id,
      }
      deleteSensor(params).then((res) => {
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        this.getAllSensors()
      })
    },
    handleFormOK() {
      this.getAllSensors()
    },
    pageFunc(data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
      this.getAllSensors()
    },
  },
}
</script>
<style >
</style>
