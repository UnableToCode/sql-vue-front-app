<template>
  <div class='upload_page'>
    <h3 class='page_title'>上传文献</h3>
    <div align="left"
         style="margin-left:20px">
      <el-button type="primary"
                 @click="$router.push('/newUpload')"
                 icon="el-icon-upload2">上传新文献</el-button>
    </div>
    <el-menu :default-active="activeIndex"
             mode="horizontal"
             @select="handleSelect">
      <el-menu-item index="1">已通过</el-menu-item>
      <el-menu-item index="2">审核中</el-menu-item>
      <el-menu-item index="3">未通过</el-menu-item>

    </el-menu>
    <el-table align="center"
              class="search_table"
              :data="tableDatas.slice((currentPage-1)*20,currentPage*20)"
              :row-class-name="tableRowClassName">
      <el-table-column prop="title"
                       label="文献标题"
                       width="300px">
      </el-table-column>
      <el-table-column prop="date"
                       label="上传日期"
                       width="200px">
      </el-table-column>
      <el-table-column prop="author"
                       label="作者"
                       width="200px">
      </el-table-column>
      <el-table-column prop="source"
                       label="原载出处"
                       width="200px">
      </el-table-column>
      <el-table-column prop="checker"
                       label="审核人"
                       width="200px">
      </el-table-column>
      <el-table-column prop="checked"
                       label="审核结果"
                       width="200px">
        <template slot-scope="scope">
          <div v-if="scope.row.pass==1">通过</div>
          <div v-if="scope.row.pass==2">未审核</div>
          <div v-if="scope.row.pass==3">未通过</div>
        </template>
      </el-table-column>
      <el-table-column prop="comments"
                       label="备注"
                       width="200px">
      </el-table-column>
    </el-table>
    <div align="center"
         style="margin-top:5px; margin-bottom: 5px;">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="20"
                     layout="total, prev, pager, next, jumper"
                     :total="tableDatas.length">
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: 'upload_table',
  data() {
    return {
      activeIndex: '1',
      currentPage: 1,
      totalNum: 0,
      tableDatas: [],
      searchInfo: {
        userID: '',
        status: ''
      }
    }
  },

  mounted() {
    this.searchInfo.userID = sessionStorage.getItem('userID')
    this.searchInfo.status = '1'
    this.search()
  },

  methods: {
    async search() {
      this.tableDatas = []
      try {
        const response = await fetch('http://localhost:5000/dbop/upload?status=' + this.searchInfo.status, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
<<<<<<< HEAD
          }
=======
          },
          data: JSON.stringify(this.searchInfo)
>>>>>>> 1d87a775261963d802714abfb4e738a940a0830f
        })
        const data = await response.json()
        this.tableDatas = data.values
        this.totalNum = this.tableDatas.length()
        this.currentPage = 1
      } catch (error) {
        console.log(error)
      }

      // this.totalNum = 1000
      // for (var i = 0; i < this.totalNum; i++) {
      //   this.tableDatas.push({
      //     name: '文献名' + i,
      //     uploading_date: 'uploading_date' + i,
      //     author: 'author' + i,
      //     original: 'original' + i,
      //     corpus: 'corpus' + i,
      //     checker: 'checker' + i,
      //     pass: this.searchInfo.status,
      //     comments: 'comments' + i
      //   })
      // }
      // this.currentPage = 1
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.pass === '3') {
        return 'warning-row'
      } else if (row.pass === '1') {
        return 'success-row'
      }
      return ''
    },

    handleSelect(key, keyPath) {
      this.searchInfo.status = key
      this.search()
    },

    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.upload_page {
  right: 20px;
  bottom: 0;
  margin-top: 20px;
  overflow: hidden;
  background-color: white;
}

.page_title {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  text-align: left;
}

.upload_table {
  margin-top: 10px;
}
</style>
