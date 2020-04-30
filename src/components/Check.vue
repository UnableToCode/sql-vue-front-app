<template>
  <div class='check_page'>
    <h3 class='page_title'>审核</h3>
    <div align="left"
         style="margin-left: 20px">
      <div>
        <el-button type="primary"
                   @click="commitCheck()"
                   icon="el-icon-upload2">提交审核</el-button>
      </div>
    </div>
    <el-table align="center"
              class="check_table"
              :data="tableDatas.slice((currentPage-1)*20,currentPage*20)"
              @selection-change="handleSelectionChange">

      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="name"
                       label="文献标题"
                       width="300px">
      </el-table-column>
      <el-table-column prop="uploading_date"
                       label="上传日期"
                       width="200px">
      </el-table-column>
      <el-table-column prop="author"
                       label="作者"
                       width="200px">
      </el-table-column>
      <el-table-column prop="original"
                       label="原载出处"
                       width="200px">
      </el-table-column>
      <el-table-column prop="pass"
                       label="审核结果"
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
      <el-table-column prop="comments"
                       label="备注"
                       width="250px">
        <template slot-scope="scope">
          <el-input v-model="scope.row.comments"
                    placeholder="请输入审核备注"
                    clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="detail"
                       label="详情"
                       width="100px">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
  name: 'check_table',
  data() {
    return {
      tableDatas: [],
      multipleSelection: [],
      currentPage: 1,
      totalNum: 0
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
      this.totalNum = 100000
      for (var i = 0; i < this.totalNum; i++) {
        this.tableDatas.push({
          id: 'id' + i,
          name: 'name' + i,
          uploading_date: 'uploading_date' + i,
          author: 'author' + i,
          original: 'original' + i,
          corpus: 'corpus' + i,
          pass: '',
          comments: ''
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
.check_page {
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

.check_table {
  margin-top: 10px;
}
</style>
