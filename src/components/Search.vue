<template>
  <div class='search_page'>
    <h3 class='page_title'>检索</h3>
    <div align="left"
         style="margin-left: 20px">
      <div>
        文献名:
        <el-input placeholder="请输入查询的文献标题"
                  v-model="searchedInfo.name"
                  prefix-icon="el-icon-search"
                  clearable
                  class="search_input_style">
        </el-input>
        <el-collapse>
          <el-collapse-item title="高级检索"
                            style="margin-left: 20px">
            <el-row style="margin-left: 20px">
              <el-col :span="1">
                <div class="search_font">上传日期:</div>
              </el-col>
              <el-col :span="8">
                <el-date-picker type="date"
                                value-format="yyyy-MM-dd"
                                v-model="searchedInfo.uploading_date"
                                placeholder="选择查询的文献上传日期"
                                class="search_input_style">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row style="margin-left: 20px">
              <el-col :span="1">
                <div class="search_font">作者:</div>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="请输入查询的文献作者"
                          v-model="searchedInfo.author"
                          prefix-icon="el-icon-search"
                          clearable
                          class="search_input_style">
                </el-input>
              </el-col>
            </el-row>
            <el-row style="margin-left: 20px">
              <el-col :span="1">
                <div class="search_font">原载出处:</div>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="请输入查询的文献原载出处"
                          v-model="searchedInfo.original"
                          prefix-icon="el-icon-search"
                          clearable
                          class="search_input_style">
                </el-input>
              </el-col>
            </el-row>
            <el-row style="margin-left: 20px">
              <el-col :span="1">
                <div class="search_font">审核人:</div>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="请输入查询的文献审核人"
                          v-model="searchedInfo.checker"
                          prefix-icon="el-icon-search"
                          clearable
                          class="search_input_style">
                </el-input>
              </el-col>
            </el-row>
            <el-row style="margin-left: 20px">
              <el-col :span="1">
                <div class="search_font">审核结果:</div>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="请输入查询的文献审核结果"
                          v-model="searchedInfo.pass"
                          prefix-icon="el-icon-search"
                          clearable
                          class="search_input_style">
                </el-input>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <br>
        <el-button type="primary"
                   @click="search()"
                   icon="el-icon-search">检索信息</el-button>
        <el-button @click="download()"
                   icon="el-icon-download">下载检索结果</el-button>
      </div>
      <el-table align="center"
                class="search_table"
                @row-click="preview"
                :data="tableDatas.slice((currentPage-1)*20,currentPage*20)"
                :row-class-name="tableRowClassName">
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
        <el-table-column prop="checker"
                         label="审核人"
                         width="200px">
        </el-table-column>
        <el-table-column prop="pass"
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
                       :total="totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search_table',
  data() {
    return {
      tableDatas: [],
      currentPage: 1,
      totalNum: 0,
      searchedInfo: {
        name: '',
        uploading_date: '',
        author: '',
        original: '',
        corpus: '',
        checker: '',
        pass: '',
        comments: ''
      }
    }
  },

  methods: {

    async search() {
      this.tableDatas = []
      try {
        const response = await fetch('localhost:5000/dbop/search', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.searchedInfo)
        })
        const data = await response.json()
        this.tableDatas = data.values
        this.totalNum = this.tableDatas.length()
        this.currentPage = 1
      } catch (error) {
        console.log(error)
      }

      // test code
      // this.totalNum = 100000
      // for (var i = 0; i < this.totalNum; i++) {
      //   this.tableDatas.push({
      //     name: 'name' + i,
      //     uploading_date: 'uploading_date' + i,
      //     author: 'author' + i,
      //     original: 'original' + i,
      //     corpus: 'corpus' + i,
      //     checker: 'checker' + i,
      //     pass: i % 3 + 1 + '',
      //     comments: 'comments' + i
      //   })
      // }
      // this.currentPage = 1
    },

    download() {
      if (this.tableDatas.length === 0) {
        alert('无检索结果')
      }
    },

    preview(row) {
      // var idx = this.currentPage * 20 + row
      // var pdfUrl = this.tableDatas[idx].pdfUrl
      var pdfUrl = 'https://mail.qq.com/cgi-bin/download?mailid=ZL1123-QLN~QsHDRGDBOAFf3cGjSa4&filename=171860627+%C2%ED%E7%F1%BE%FE.pdf&sid=Dv2fNLcB6s5ncksV'
      this.$router.push({
        name: 'Preview',
        params: {
          pdfUrl: pdfUrl
        }
      }
      )
    },

    handleCurrentChange(val) {
      this.currentPage = val
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.pass === '3') {
        return 'warning-row'
      } else if (row.pass === '1') {
        return 'success-row'
      }
      return ''
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
