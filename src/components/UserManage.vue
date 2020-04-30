<template>
  <div class='search_page'>
    <h3 class='page_title'>用户管理</h3>
    <el-menu :default-active="activeIndex"
             mode="horizontal"
             @select="handleSelect">
      <el-menu-item index="1">未审核用户</el-menu-item>
      <el-menu-item index="2">已通过用户</el-menu-item>
    </el-menu>
    <div align="left"
         v-if="activeIndex === '1'"
         style="margin-left: 50px; margin-top:20px;">
      <div>
        <el-button type="primary"
                   @click="commitCheck()"
                   icon="el-icon-upload2">提交审核</el-button>
      </div>
    </div>
    <el-table align="center"
              class="search_table"
              :data="tableDatas.slice((currentPage-1)*20,currentPage*20)"
              @selection-change="handleSelectionChange">

      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="username"
                       label="用户名"
                       width="300px">
      </el-table-column>
      <el-table-column prop="level"
                       label="用户等级"
                       width="200px">
      </el-table-column>
      <el-table-column v-if="activeIndex === '1'"
                       prop="appliedLevel"
                       label="申请等级"
                       width="200px">
      </el-table-column>
      <el-table-column v-if="activeIndex === '1'"
                       prop="pass"
                       label="通过申请"
                       width="150px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.pass"
                     placeholder="请选择">
            <el-option label="通过"
                       value="1">通过</el-option>
            <el-option label="未通过"
                       value="3">未通过</el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div align="center"
         style="margin-top:5px; margin-bottom: 5px;">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="20"
                     layout="total, prev, pager, next, jumper"
                     :total="totalNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search_table',
  data() {
    return {
      tableDatas: [],
      multipleSelection: [],
      currentPage: 1,
      totalNum: 0,
      activeIndex: '1'
    }
  },

  created() {
    this.getDatas()
  },

  methods: {

    async getDatas() {
      this.tableDatas = []
      //   try {
      //     const response = await fetch('localhost:5000/dbop/search', {
      //       method: 'POST',
      //       headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify(this.searchedInfo)
      //     })
      //     const data = await response.json()
      //     this.tableDatas = data.values
      //     this.totalNum = data.totalNum
      //     this.totalNum = this.tableDatas.length
      //     this.currentPage = 1
      //   } catch (error) {
      //     console.log(error)
      //   }

      // test code
      this.totalNum = 100
      for (var i = 0; i < this.totalNum; i++) {
        this.tableDatas.push({
          userId: 'id' + i,
          username: 'username' + i,
          level: i % 6,
          appliedLevel: i % 6 + 1,
          pass: ''
        })
      }
      this.currentPage = 1
    },

    commitCheck() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要提交审核结果的条目')
      } else {
        this.multipleSelection.forEach(row => {
          if (row.pass === '') {
            this.$message.warning('请为所有要提交的条目选择审核状态')
          }
        })
      }
    },

    preview(row) {
      // var idx = this.currentPage * 20 + row
      // var pdfUrl = this.tableDatas[idx].pdfUrl
      var pdfUrl = ''
      this.$router.push({
        name: 'Preview',
        params: {
          pdfUrl: pdfUrl
        }
      }
      )
    },

    handleSelect(key, keyPath) {
      this.activeIndex = key
      console.log(key)
      this.getDatas()
    },

    handleDetail(index, row) {
      this.preview(index)
    },

    handleCurrentChange(val) {
      this.currentPage = val
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}

</script>

<style>
.search_page {
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

.search_input_style {
  background-color: white;
  width: 400px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #888888;
}

.search_table {
  margin-top: 10px;
}
.search_font {
  margin-bottom: 10px;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
}
</style>
