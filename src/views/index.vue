<template>
  <div class="homeWarp">
    <el-container class="main_container">
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside>
          <Aside></Aside>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './common/header.vue'
import Aside from './common/Aside.vue'
export default {
  components: {
    Header,
    Aside
  },

  data () {
    return {}
  },

  computed: {},

  methods: {}
}
</script>
<style lang='less'>
.homeWarp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main_container {
  height: 100%;
}
.el-header {
  height: 50px;
  border-bottom: 1px solid var(--el-border-color-base);
}

.el-aside {
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  height: 100%;
  width: 180px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}
</style>
