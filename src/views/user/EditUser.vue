<template>

  <!-- Form -->
  <el-button type="primary" size="mini" @click="dialogFormVisible = true"
    >编辑用户</el-button
  >

  <el-dialog v-model="dialogFormVisible" title="更改用户信息">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户名称"></el-input>
      </el-form-item>
      <el-form-item label="角色名" :label-width="formLabelWidth">
        <el-select v-model="form.roleName" placeholder="请选择用户角色">
          <el-option label="超级管理员" value="superAdmin"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script scope>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup () {
    const state = reactive({
      dialogFormVisible: false,
      form: {
        name: '',
        roleName: ''
      },
      formLabelWidth: '120px'
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
