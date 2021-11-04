<template>
  <el-form ref="selectForm" :inline="true" :model="selectForm" class="demo-form-inline" >
    <el-form-item label="搜索：" prop="user">
      <el-input v-model="selectForm.user" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='js'>
export default {
  data () {
    return {
      selectForm: {
        user: ''
      }
    }
  },
  methods: {
    reset () {
      this.$refs.selectForm.resetFields()
    }
  }
}
</script>
