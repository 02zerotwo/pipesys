<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="6">
        <el-card class="box-card"
                 style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button"
                         type="text">Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4"
               :key="o"
               class="text item">
            {{ 'List item ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card"
                 style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button"
                         type="text">Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4"
               :key="o"
               class="text item">
            {{ 'List item ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card"
                 style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button"
                         type="text">Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4"
               :key="o"
               class="text item">
            {{ 'List item ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card"
                 style="width: 250px">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button"
                         type="text">Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4"
               :key="o"
               class="text item">
            {{ 'List item ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      size: 63
    }
  },

  computed: {},

  methods: {}
}
</script>
<style lang='less'>
.dashboard .el-row {
  margin-bottom: 20px;
}
</style>
