<template>
  <div class="header">
    用户管理
  </div>
<<<<<<< HEAD
=======
  <div class="user-select">
    <user-select />
  </div>
>>>>>>> e73cb036d74be76f006c9827f7dab222a100ce8b
  <div class="addU">
    <add-user />
  </div>
  <div class="userinfo">
    <user-info />
  </div>

</template>

<script scope>
import AddUser from './AddUser.vue'
import UserInfo from './UserInfo.vue'
export default {
  components: {
    AddUser,
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
.addU {
  float: left;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
