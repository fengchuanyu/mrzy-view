<template>
  <div class="components-container">
    <aside>
      提示：如果出现无法显示编辑器情况请尝试刷新页面，本系统推荐文章中图片使用网络图片可加快编辑速度，操作方法：1、在网上（比如百度）找到想要的图片。2、鼠标右键复制图片地址。3、编辑器中找到图片按钮或者“插入”-“图片”将复制的图片地址粘贴到地址文本框中即可。
    </aside>
    <!-- 标题 -->
    <div style="margin-bottom: 40px;">
      <MDinput v-model="title" :maxlength="100" name="name" required>标题</MDinput>
    </div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="文章类型">
        <el-select v-model="type" placeholder="请选择文章类型">
          <el-option label="医疗" value="yiliao" />
          <el-option label="养生" value="yangsheng" />
          <el-option label="保健" value="baojian" />
          <el-option label="医院信息" value="yyxx" />
          <el-option label="病历交流" value="bljl" />
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <el-button style="margin-top:40px" type="primary" @click="submitBtn">确认发布</el-button>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import { fetchAdd, fetchUpdate, fetchGet } from '@/api/articles'
export default {
  name: 'TinymceDemo',
  components: { Tinymce, MDinput },
  data() {
    return {
      title: '',
      content: '',
      type: '',
      isUpdate: false,
      updateId: ''
    }
  },
  mounted() {
    const routeParams = this.$route.params
    if (routeParams.hasOwnProperty('id')) {
      this.isUpdate = true
      this.updateId = routeParams.id
      this.getArticle()
    }
  },
  methods: {
    // 获取文章
    getArticle() {
      fetchGet({ id: this.updateId })
        .then((res) => {
          this.title = res.data[0].title
          this.content = res.data[0].content
          this.type = res.data[0].type
        })
        .catch((res) => {
          console.log(res)
        })
    },
    // 按钮事件
    submitBtn() {
      if (this.isUpdate) {
        this.updateArticle()
      } else {
        this.submitArticle()
      }
    },
    // 修改文章
    updateArticle() {
      const loading = this.$loading()
      let typeText = ''
      switch (this.type) {
        case 'yiliao': typeText = '医疗'; break
        case 'yangsheng':typeText = '养生'; break
        case 'baojian':typeText = '保健'; break
        case 'yyxx':typeText = '医院信息'; break
        case 'bljl':typeText = '病历交流'; break
        default:typeText = '无'
      }
      const thisParam = {
        id: this.updateId,
        title: this.title,
        content: this.content,
        type: this.type,
        typeText
      }
      fetchUpdate(thisParam)
        .then(() => {
          loading.close()
          this.$router.push('./articlelist')
        })
        .catch(() => {

        })
    },
    // 提交文章
    submitArticle() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let typeText = ''
      switch (this.type) {
        case 'yiliao': typeText = '医疗'; break
        case 'yangsheng':typeText = '养生'; break
        case 'baojian':typeText = '保健'; break
        case 'yyxx':typeText = '医院信息'; break
        case 'bljl':typeText = '病历交流'; break
        default:typeText = '无'
      }
      const paramObj = {
        typeText,
        title: this.title,
        type: this.type,
        content: this.content
      }
      console.log(paramObj)
      fetchAdd(paramObj).then((res) => {
        loading.close()
        this.$router.push('./articlelist')
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

