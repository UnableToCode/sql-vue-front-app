<template>
  <div class='new_upload_page'>
    <h3 class='page_title'>上传新文献</h3>
    <div align="left"
         style="margin-left:50px">
      <el-upload class="upload"
                 ref="upload"
                 action="loaclhost:5000/dbop/upload"
                 accept=".zip,.rar,.ZIP,.RAR"
                 limit="1"
                 :on-remove="handleRemove"
                 :on-change="handleChange"
                 :on-exceed="handleExceed"
                 :on-success="handleSuccess"
                 :file-list="fileList"
                 :auto-upload="false">
        <el-button slot="trigger"
                   size="small"
                   type="primary"
                   icon="el-icon-document"
                   :disabled="btnUploadEnable">选取文件</el-button>
        <el-button style="margin-left: 10px;"
                   size="small"
                   type="success"
                   icon="el-icon-upload"
                   @click="submitUpload">上传到服务器</el-button>
        <el-button style="margin-left: 10px;"
                   size="small"
                   type="info"
                   @click="$router.push('/upload')">取消</el-button>

        <div slot="tip"
             class="el-upload__tip">只能上传zip/rar文件, 且只能上传一个文件</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnUploadEnable: false,
      fileList: []
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleSuccess(response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    handleChange(file, fileList) {
      if (fileList.length !== 0) {
        this.btnUploadEnable = true
      } else {
        this.btnUploadEnable = false
      }
    }
  }
}
</script>

<style>
.new_upload_page {
  right: 20px;
  bottom: 0;
  margin-top: 20px;
  overflow: hidden;
  background-color: white;
}

.upload {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 500px;
}
</style>
