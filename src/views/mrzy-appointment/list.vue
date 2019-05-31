<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column type="index" fixed />
      <el-table-column prop="office" label="所挂科室" />
      <el-table-column prop="doctor.name" label="预约医生" />
      <el-table-column prop="patientName" label="患者姓名" />
      <el-table-column label="预约时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time }} {{ scope.row.witch }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="patientTel" label="患者电话" />
      <el-table-column prop="patientMessage" label="患者备注" width="180" />
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.createCase" size="mini" type="primary" plain disabled>已有病例</el-button>
          <el-button v-else size="mini" type="warning" disabled @click="creatCase(scope.$index, scope.row)">未建病例</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { fetchList, fetchDel, fetchUpdate } from '@/api/appointment'
import { fetchAdd } from '@/api/case'
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
    creatCase(index, obj) {
      this.loading = true
      const caseInfo = {
        office: obj.office,
        patientName: obj.patientName,
        patientTel: obj.patientTel,
        userId: obj._openid,
        appointmentId: obj._id,
        doctor: obj.doctor._id,
        doctorName: obj.doctor.name
      }
      const updateInfo = {
        id: obj._id,
        createCase: true
      }
      console.log(obj._id)
      // 修改当前挂号信息中是否创建病例为真
      fetchUpdate(updateInfo)
        .then((res) => {
        // 成功后创建新病例
          this.doAddCase(caseInfo)
        })
        .catch((res) => {

        })
    },
    // 执行添加病例操作
    doAddCase(info) {
      console.log(info)
      fetchAdd(info)
        .then(res => {
          this.loading = false
          this.$router.push('./case')
        })
        .catch(res => {})
    },
    handleDelete(index, obj) {
      const thisId = {
        id: obj._id
      }
      this.$confirm('此操作将永久删除挂号信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
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

