<template>
  <div id="index"
       ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else
           class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8"
                             :color="['#568aea', '#000000']" />
            <div class="title">
              <span class="title-text">报警平台</span>
              <dv-decoration-6 class="dv-dec-6"
                               :reverse="true"
                               :color="['#50e3c2', '#67a1e5']" />
            </div>
            <dv-decoration-8 class="dv-dec-8"
                             :reverse="true"
                             :color="['#568aea', '#000000']" />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-before"></span>
              <span class="text">项目数据分析</span>
            </div>

          </div>
          <div class="d-flex aside-width">
            <div class="react-right ">

            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centerLeft1 @ok="queryItemByOrg" />
              </dv-border-box-12>
            </div>

            <!-- 中间 -->
            <div>
              <center ref="center" />
            </div>

            <div>
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import drawMixin from "@/utils/drawMixin";
import { formatTime } from '@/utils/index.js'
import centerLeft1 from './centerLeft1'
import centerRight1 from './centerRight1'
import center from './center'
export default {
  components: {
    centerLeft1,
    centerRight1,
    center

  },

  data () {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    }
  },
  mounted () {
    let width = document.documentElement.clientWidth
    console.log(width);
    this.timeFn()
    this.cancelLoading()
  },
  beforeUnmount () {
    clearInterval(this.timing)
  },

  computed: {},

  methods: {
    timeFn () {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading () {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    queryItemByOrg (data) {
      this.$refs.center.lodaItem(data)

    }
  }
}
</script>
<style lang='less' >
@import "../../styles/less/bigCreen1.less";
</style>
