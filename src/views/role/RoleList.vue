<template>
  <div>
    <el-container>
      <el-header>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="formInline.user"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },

  computed: {},

  methods: {}
}
</script>
<style lang='less'>
</style>
