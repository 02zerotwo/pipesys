<template>
  <div>
    用户管理
  </div>
</template>

<script>
import { getAction } from '@/api/manage'
export default {
  components: {},

  data () {
    return {}
  },

  computed: {},
  created () {
    getAction('/sys/perm').then(res => {
      console.log(res)
    })
  },
  methods: {}
}
</script>
<style lang='less'>
</style>
