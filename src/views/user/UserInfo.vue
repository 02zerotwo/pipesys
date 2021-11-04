<template>
   <el-table :data="tableData" style="width: 100%" border >
      <el-table-column label="用户名" align="center" header-align="center">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户角色" align="center" header-align="center">
        <template #default="scope">
          <span >{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注信息" align="center" header-align="center">
        <template #default="scope">
          <span >{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
          <el-button size="mini" @click="handleEdit"
            >编辑角色</el-button
          >
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="red"
            title="你确定要删除吗?"
            @confirm="confirmEvent"
            @cancel="cancelEvent"
          >
          <template #reference>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      tableData: [
        {
          name: 'Tom',
          roleName: '管理员'
        },
        {
          name: 'Tom',
          roleName: '管理员'
        },
        {
          name: 'Tom',
          roleName: '管理员'
        }

      ]
    }
  },

  computed: {},

  methods: {
    confirmEvent () {
      alert('删除!')
    },
    cancelEvent () {
      console.log('cancel!')
    }
  }
}
</script>
