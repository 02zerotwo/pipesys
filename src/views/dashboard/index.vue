<template>
  <div class="dashboard">
    <el-row>
      <el-carousel :interval="4000"
                   type="card"
                   :style="{width: '100%'}"
                   height="380px">
        <el-carousel-item v-for="item in imgList"
                          :key="item">
          <img :src="item"
               class="imgbg" />
        </el-carousel-item>
      </el-carousel>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-calendar>
            <template #dateCell="{ data }">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }}
                {{ data.isSelected ? '✔️' : '' }}
              </p>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  components: {
  },

  data () {
    return {
      size: 63,
      imgList: [require("../../assets/img/gd1.jpg"), require("../../assets/img/gd2.jpg"), require("../../assets/img/gd3.jpg"), require("../../assets/img/gd4.jpg")]

    }
  },

  computed: {},

  methods: {

  }
}
</script>
<style lang='less'>
.imgbg {
  width: 100%;
  height: 100%;
  margin: 0;
  text-align: center;
}
</style>
