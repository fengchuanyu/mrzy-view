<template>
  <div class="app-container">

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
  </div>
</template>
<script>
import { fetchList, fetchDel } from '@/api/articles'
export default {
  data() {
    return {
      loading: true,
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
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
