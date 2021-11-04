<template>
  <div class="header">
    用户管理
  </div>
  <div class="user-select">
    <user-select />
  </div>
  <div class="addU">
    <add-user />
  </div>
  <div class="userinfo">
    <user-info />
  </div>

</template>

<script >
import AddUser from './AddUser.vue'
import UserInfo from './UserInfo.vue'
import UserSelect from './UserSelect.vue'
export default {
  components: {
    AddUser,
    UserInfo,
    UserSelect
  },
  data () {
    return {
    }
  },

  computed: {},

  methods: {
  }
}
</script>
<style lang='less'>
.user-select {
  width: auto;
  height: 60px;
  background-color: rgb(167, 212, 212);
  text-align: center;
  line-height: 60px;
  border-radius: 5px;
}
.el-input {
  width: 400px;
}
.addU {
  float: left;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
