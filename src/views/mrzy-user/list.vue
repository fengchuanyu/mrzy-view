<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column label="微信头像" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" alt="" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="微信昵称" width="180" />
      <el-table-column prop="registerDate" label="注册时间" width="180" />
      <el-table-column prop="userType" label="用户当前类别">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.userType==1 ? 'primary' : 'success'"
            disable-transitions
          >{{ scope.row.userType==1?"本院医生":"普通用户" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.userType==1" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row,0)">标记为用户</el-button>
          <el-button v-else size="mini" type="success" @click="handleEdit(scope.$index, scope.row,1)">标记为医生</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 标记医生弹框 -->
    <el-dialog title="标记医生" width="40%" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="医生列表" label-width="120px">
          <el-select v-model="selectDoctor" placeholder="请选择对应的医生">
            <el-option v-for="item in doctorList" :key="item._id" :label="item.name" :value="item._id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, fetchUpdate } from '@/api/muser'
const { fetchList: doctorList } = require('@/api/doctor')
export default {
  data() {
    return {
      selectDoctor: '',
      doctorList: [],
      dialogFormVisible: false,
      loading: true,
      tableData: [],
      editInfo: {
        id: '',
        type: ''
      }
    }
  },
  mounted() {
    this.getList()
    this.getDoctor()
  },
  methods: {
    // 标记按钮处理
    handleEdit(index, obj, type) {
      // let thisId = {
      //   id: obj._id,
      //   userType:type
      // };
      this.editInfo.id = obj._id
      this.editInfo.type = type
      this.dialogFormVisible = true
      // this.doChange(thisId);
    },
    // 获取医生列表
    getDoctor() {
      doctorList().then(res => {
        this.doctorList = res.data
      })
        .catch(res => {
        })
    },
    // 执行标记操作
    doChange() {
      const thisInfo = {
        ...this.editInfo
      }
      console.log(this.editInfo.type, this.selectDoctor)
      const thisType = parseInt(this.editInfo.type)
      if (thisType === 1) {
        thisInfo.doctor = this.selectDoctor
      }
      fetchUpdate(thisInfo)
        .then(res => {
          this.dialogFormVisible = false
          this.getList()
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
        })
        .catch(res => {
          this.$message.error('操作失败！')
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
