<template>
  <div class="top">
    <span class="header_title">文献数据库</span>
    <el-link @click="quit"
             style="color: #F55D54;font-size: 22px;float: right;margin-right: 40px">退出</el-link>
    <div class="username">
      {{username}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      username: ''
    }
  },

  mounted() {
    this.getUsername()
  },

  methods: {
    getUsername() {
      this.username = sessionStorage.getItem('loginInfo')
    },

    quit() {
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.top {
  background-color: #009688;
  height: 80px;
  line-height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.username {
  color: white;
  font-size: 22px;
  float: right;
  margin-right: 40px;
}

.header_title {
  color: white;
  font-size: 36px;
  float: left;
  margin-left: 40px;
}
</style>
