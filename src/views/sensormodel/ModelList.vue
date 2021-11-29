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
                        v-model="selectForm.modelName"
                        placeholder="请输入模型名关键字"></el-input>
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
            </el-icon>新增设备模型
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 传感器模型信息 -->
      <el-table :data="modelList"
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
            <span style="margin-left: 10px">{{ scope.row.deviceNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="传感器模型名称"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.deviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="传感器模型类型"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.deviceType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间"
                         align="center"
                         header-align="center">
          <template #default="scope">
            <span>{{scope.row.createTime }}</span>
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
                <el-button type="danger" size="mini">删除</el-button>
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
      <add-sensor-model ref="addSensor" @ok='handleFormOK'  />
      <edit-sensor-model ref="editSensor" @ok='handleFormOK' />
    </div>
  </el-card>

</template>

<script scope>
import { getAllSensorModel, deleteSensorModel } from '@/api/api.js'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination'
import AddSensorModel from './components/AddSensorModel.vue'
import EditSensorModel from './components/EditSensorModel.vue'
export default {
  components: {
    Pagination,
    AddSensorModel,
    EditSensorModel
  },
  data() {
    return {
      loading: false,
      selectForm: {
        modelName: '',
      },
      modelList: [
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
          highThreshold: '',
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
    this.getSensors()
  },

  methods: {
    getSensors() {
      this.loading = true
      const params = {
        pageNo: 1,
        pageSize: 10,
        key: ''
      }
      getAllSensorModel(params).then((res => {
        this.modelList = res.data.list
        this.paginations.total = res.data.total
        this.loading = false
      }))
    },
    query() {
      this.loading = true
      const params = {
        pageNo: 1,
        pageSize: 10,
        key: this.selectForm.modelName
      }
      getAllSensorModel(params).then((res => {
        this.modelList = res.data.list
        this.paginations.total = res.data.total
        this.loading = false
      }))
    },
    reset() {
      // 重置搜索关键词
      this.selectForm.modelName = ''
      this.getSensors()
    },
    handleAdd() {
      this.$refs.addSensor.add()
      this.$refs.addSensor.title = '新增设备模型'
    },
    handleModify(row) {
      this.$refs.editSensor.edit(row)
      this.$refs.editSensor.title = '编辑设备模型'
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      deleteSensorModel(params).then((res => {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
        this.getSensors()
      }))
    },
    handleFormOK() {
      this.getSensors()
    },
    pageFunc(data) {
      this.paginations.pageSize = data.pageSize
      this.paginations.pageNo = data.pageNum
    },
  },
}
</script>
<style >
</style>
