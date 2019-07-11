<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="养生保健" name="default" />
      <el-tab-pane label="医院信息" name="yyxx" />
      <el-tab-pane label="病历交流" name="bljl" />
      <el-tab-pane label="固有内容" name="normal" />
    </el-tabs>
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
    <!-- 分页器 -->
    <div class="pagination-bar">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageInfo.count"
        :total="pageInfo.total"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>
<script>
import { fetchList, fetchDel, fetchType } from '@/api/articles'
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      activeName: 'default',
      otherArticle: [],
      pageInfo: {
        start: 0,
        count: 6,
        total: 0,
        type: ['yiliao', 'yangsheng', 'baojian']
      }
    }
  },
  mounted() {
    this.handleClick({ name: 'default' })
  },
  methods: {
    // 分页事件
    currentChange(e) {
      this.loading = true
      this.pageInfo.start = (e - 1) * this.pageInfo.count
      this.getByType(this.pageInfo.type)
    },
    // tab切换
    handleClick(tab) {
      // console.log(tab, event)
      let types = []
      switch (tab.name) {
        case 'default':
          types = ['yiliao', 'yangsheng', 'baojian']
          break
        case 'normal':
          types = ['zhinan', 'guanyu']
          break
        case 'yyxx':
          types = ['yyxx']
          break
        case 'bljl':
          types = ['bljl']
          break
      }
      this.pageInfo.type = types
      this.getByType(types)
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
    getByType(type) {
      this.loading = true
      const thisParams = {
        types: type,
        start: this.pageInfo.start,
        count: this.pageInfo.count
      }
      fetchType(thisParams)
        .then(res => {
          this.tableData = res.data.response
          this.pageInfo.total = res.data.total
          this.loading = false
        })
        .catch(res => {
          console.log(res)
        })
    },
    getList() {
      fetchList()
        .then(res => {
          this.tableData = res.data.response
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
.pagination-bar{
  padding:50px 0;
  text-align: center;
}
</style>
