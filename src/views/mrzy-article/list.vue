<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="普通文章" name="default">
        <el-table v-loading="loading" :data="tableData" style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column prop="title" label="文章标题" width="180" />
          <el-table-column prop="typeText" label="文章类型" width="180" />
          <el-table-column prop="creatTime" label="创建时间" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="固有内容" name="normal">
        <el-table v-loading="loading" :data="otherArticle" style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column prop="title" label="文章标题" width="180" />
          <el-table-column prop="typeText" label="文章类型" width="180" />
          <el-table-column prop="creatTime" label="创建时间" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { fetchList, fetchDel, fetchOther } from '@/api/articles'
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      activeName: 'default',
      otherArticle: []
    }
  },
  mounted() {
    this.getList()
    this.getOtherArticles()
  },
  methods: {
    // 获取其他类型文章
    getOtherArticles() {
      fetchOther().then((res) => {
        this.otherArticle = res.data
      }).catch((res) => {

      })
    },
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event)
    },
    addDoctor() {
      this.$router.push('./add')
    },
    handleEdit(index, obj) {
      this.$router.push({ name: 'articleadd', params: { id: obj._id }})
    },
    handleDelete(index, obj) {
      const thisId = {
        id: obj._id
      }
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.doDel(thisId)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    doDel(thisId) {
      fetchDel(thisId)
        .then(res => {
          this.getList()
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        })
        .catch(res => {
          this.$message.error('删除失败！')
        })
    },
    getList() {
      fetchList()
        .then(res => {
          this.tableData = res.data
          this.loading = false
        })
        .catch(res => {
          this.$message.error('加载信息失败！')
        })
      // console.log();
      // let dataList = fetchList();
      // this.tableData = dataList;
    }
  }
}
</script>
<style scoped>
</style>
