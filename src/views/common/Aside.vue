<template>
  <div>
    <el-menu :default-active="this.$router.path"
             active-text-color="#5094FF"
             background-color="#304156"
             text-color="#bfcbd9"
             class="el-menu-vertical-demo"
             :router="true"
             @open="handleOpen"
             @close="handleClose">
      <el-menu-item index="/dashboard">
        <el-icon>
          <i-wind-power />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <NavigationItem v-for="(menu,i) in permissionList"
                      :key="i"
                      :item="menu" />
    </el-menu>
  </div>
</template>

<script>
import NavigationItem from './NavigationItem.vue'
export default {
  components: {
    NavigationItem
  },

  data () {
    return {
      menu: [],
      permissionList: []

    }
  },

  computed: {},
  created () {
    //取权限菜单
    this.$store.dispatch('GetPermissionList').then((permissionList) => {
      console.log(permissionList)
      this.permissionList = permissionList

    })
  },
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
<style lang='less' scoped>
</style>
