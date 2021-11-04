<template>
  <div class="homeWarp">
    <el-container class="main_container">
      <el-aside>
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <Main>
          </Main>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import Header from './common/header.vue'
import Aside from './common/Aside.vue'
import Main from './common/Main.vue'
export default {
  components: {
    Header,
    Aside,
    Main
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
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 21, 41, 0.08);
  z-index: 10;
}

.el-aside {
  background-color: #304156;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  height: 100%;
  width: 200px;
}

.el-main {
  background-color: #fff;
  color: var(--el-text-color-primary);
  text-align: center;
}
</style>
