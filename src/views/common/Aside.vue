<template>
  <div>
    <el-menu default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item-group title="">
          <el-menu-item index="1-1">权限管理</el-menu-item>
          <el-menu-item index="1-2">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon>
          <icon-menu />
        </el-icon>
        <span>项目管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon>
          <document />
        </el-icon>
        <span>模型管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <setting />
        </el-icon>
        <span>报警管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {}
  },

  computed: {},

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }

  }
}
</script>
<style lang='less'>
</style>
