<template>
  <el-card class="box-card">
    <template #header>
      <div>
        <el-row>
          <el-form ref="selectForm"
                   :inline="true"
                   :model="selectForm"
                   class="demo-form-inline">

            <el-form-item label="搜索："
                          prop="userName">
              <el-input size="medium"
                        style="width:220px"
                        v-model="selectForm.userId"
                        placeholder="请输入用户id"></el-input>
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
            </el-icon>新增用户
          </el-button>
        </el-row>
      </div>
    </template>
    <div>
      <!-- 用户信息 -->
      <user-info ref="showUser" :userId="selectForm.userId"/>
    </div>
    <add-user ref="addUser"
             @ok="modalFormOk"></add-user>
  </el-card>

</template>

<script scope>

import AddUser from './components/AddUser'
import UserInfo from './components/UserInfo'

export default {
  components: {
    AddUser,
    UserInfo
  },
  data () {
    return {
      selectForm: {
        userId: ''
      }
    }
  },
  methods: {
    query () {
      this.$refs.showUser.queryById()
    },
    reset () {
      // 重置搜索关键词
      this.selectForm.userId = ''
      this.$refs.showUser.getUserList()
    },
    handleAdd () {
      this.$refs.addUser.add()
      this.$refs.addUser.title = '用户新增页面'
    },
    modalFormOk () { // 添加完用户的回调函数
      this.$refs.showUser.getUserList()
      this.$refs.addUser.close()
    }

  }
}
</script>
<style >
</style>
