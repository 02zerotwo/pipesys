<template>
  <div class="header">
  </div>
  <div class="userinfo">
    <user-info />
  </div>

</template>

<script scope>
import UserInfo from './UserInfo.vue'
export default {
  components: {
    UserInfo
  },
  data () {
    return {}
  },

  methods: {
    confirmEvent () {
      alert('删除!')
    },
    cancelEvent () {
      console.log('cancel!')
    }
  }
}
</script>
<style lang='less'>
.el-input {
  width: 400px;
}
</style>
