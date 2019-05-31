<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="office" label="科室" width="180" />
      <el-table-column prop="doctorName" label="医生" width="180" />
      <el-table-column prop="patientName" label="患者" />
      <el-table-column prop="creatDate" label="创建时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="goDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { fetchList, fetchDel } from '@/api/case'
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
    goDetail(index, obj) {
      this.$router.push({ name: 'casedetail', params: { id: obj._id }})
    },
    handleDelete(index, obj) {
      const thisId = {
        id: obj._id
      }
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
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
    }
  }
}
</script>
<style scoped>
</style>
