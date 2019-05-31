<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleAdd">
        <svg-icon icon-class="peoples" />添加科室
      </el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="科室" width="180" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加医生弹框 -->
    <el-dialog title="添加科室" :visible.sync="addOfficeDialog">
      <el-form :model="form" class="form-content">
        <el-form-item label="科室名称" label-width="120px">
          <el-input v-model="form.name" placeholder="请输入科室名称" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOfficeDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, fetchDel, fetchAdd, fetchUpdate } from '@/api/office'
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      addOfficeDialog: false,
      form: {
        name: ''
      },
      submitType: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSubmit() {
      const thisType = parseInt(this.submitType)
      if (thisType === 0) {
        this.addOffice()
      } else {
        this.updateOffice()
      }
    },
    updateOffice() {
      fetchUpdate(this.form)
        .then(res => {
          this.addOfficeDialog = false
          this.getList()
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
        })
        .catch(res => {
          this.$message.error('修改失败！')
        })
    },
    addOffice() {
      fetchAdd(this.form)
        .then(res => {
          this.secussReturn()
          this.addOfficeDialog = false
          this.getList()
        })
        .catch(res => {
          this.$message.error('提交信息失败！')
        })
    },
    handleEdit(index, obj) {
      console.log(obj)
      this.addOfficeDialog = true
      this.form.name = obj.name
      this.form.id = obj._id
      this.submitType = 1
    },
    handleAdd() {
      this.form.name = ''
      this.addOfficeDialog = true
      this.submitType = 0
    },
    handleDelete(index, obj) {
      const thisId = {
        id: obj._id
      }
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
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
    },
    secussReturn() {
      this.$message({
        message: '提交成功！',
        type: 'success'
      })
      setTimeout(() => {
        this.$router.push('./list')
      }, 1000)
    }
  }
}
</script>
<style scoped>
.form-content{
  width: 400px;
}
</style>
