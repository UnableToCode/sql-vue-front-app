<template>
  <el-row class="sidebar">
    <el-col :span="24">
      <el-menu :default-active="$router.path"
               router
               background-color="#F7F7F7"
               text-color="#707070"
               active-text-color="#009688">
        <el-menu-item index="/">
          <i class="el-icon-info"></i>
          <span slot="title">用户信息</span>
        </el-menu-item>
        <el-menu-item index="/search">
          <i class="el-icon-search"></i>
          <span slot="title">检索</span>
        </el-menu-item>
        <el-menu-item index="/upload"
                      v-if="uploadRight">
          <i class="el-icon-upload"></i>
          <span slot="title">上传</span>
        </el-menu-item>
        <el-menu-item index="/check"
                      v-if="checkRight">
          <i class="el-icon-view"></i>
          <span slot="title">审核</span>
        </el-menu-item>
        <el-menu-item index="/userManage"
                      v-if="managerRight">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      uploadRight: false,
      checkRight: false,
      managerRight: false
    }
  },

  mounted() {
    this.setRight()
  },

  methods: {
    setRight() {
      var userType = sessionStorage.getItem('userLevel')
      if (userType > 1) this.uploadRight = true
      if (userType > 2) this.checkRight = true
      if (userType > 4) this.managerRight = true
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
.sidebar {
  margin-top: 40px;
  margin-left: 30px;
}
</style>
