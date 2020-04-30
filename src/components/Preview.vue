<template>
  <div class="preview">
    <div>
      <div style="margin-left:20px; margin-top:20px; margin-bottom: 15px; text-align: left">
        <el-button size="small"
                   @click="$router.back(-1)">
          返回
        </el-button>
        <el-button type="primary"
                   size="small"
                   @click.stop="previousPage">
          上一页
        </el-button>
        <el-button type="primary"
                   size="small"
                   @click.stop="nextPage">
          下一页
        </el-button>
        <span style="margin-left: 20px">当前第{{pdfPage}}页 / 共{{pageCount}}页</span>

      </div>
      <div>
        <pdf :src="src"
             :page="pdfPage"
             @num-pages="pageCount = $event"
             @page-loaded="pdfPage = $event"
             @loaded="loadPdfHandler"
             style="display: inline-block; width: 100%"></pdf>
      </div>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  data() {
    return {
      src: '',
      pdfPage: 0,
      pageCount: 0
    }
  },

  created() {
    this.src = pdf.createLoadingTask(this.$route.params.pdfUrl)
  },

  methods: {
    previousPage() {
      this.pdfPage = this.pdfPage > 1 ? this.pdfPage - 1 : this.pageCount
    },

    nextPage() {
      this.pdfPage = this.pdfPage < this.pageCount ? this.pdfPage + 1 : 1
    },

    loadPdfHandler() {
      this.pdfPage = 1
    }
  }
}
</script>

<style>
.preview {
  right: 20px;
  bottom: 0;
  margin-top: 20px;
  overflow: hidden;
  background-color: white;
}
</style>
