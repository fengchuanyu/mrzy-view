<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :offset="6">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="医生姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="医生头衔">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="所属科室">
            <el-select v-model="form.office" placeholder="请选择科室">
              <el-option label="妇科" value="妇科" />
              <el-option label="内科" value="内科" />
              <el-option label="康复科" value="康复科" />
            </el-select>
          </el-form-item>
          <el-form-item label="挂号费用">
            <el-input v-model="form.price" />
          </el-form-item>
          <el-form-item label="医生简介">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 图片上传 start -->
      <el-col :span="6">
        <div class="components-container">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/mrzymz/util/upimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">点击上传头像</div>
          </el-upload>
        </div>
      </el-col>
      <!-- 图片上传 end -->
    </el-row>
  </div>
</template>
<script>
import { fetchAdd, fetchUpdate, fetchGet } from '@/api/doctor'
import { tempFile } from '@/api/utils'
export default {
  data() {
    return {
      form: {
        name: '',
        office: [],
        price: '',
        desc: '',
        title: '',
        avatar: ''
      },
      imageUrl: '',
      isUpdate: false,
      updateId: '',
      tempId: ''
    }
  },
  created() {
    const routeParams = this.$route.params
    if (routeParams.hasOwnProperty('id')) {
      this.isUpdate = true
      this.updateId = routeParams.id
      this.getDoctor()
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      this.form.avatar = res.fileId
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getTempFile() {
      tempFile({ id: this.tempId })
        .then((res) => {
          this.imageUrl = res.data[0].tempFileURL
        })
        .catch((res) => {
          this.$message.error('获取图片失败！')
        })
    },
    getDoctor() {
      fetchGet({ id: this.updateId })
        .then((res) => {
          this.form = {
            ...res.data[0]
          }
          this.tempId = res.data[0].avatar
          this.getTempFile()
        })
        .catch((res) => {

        })
    },
    onSubmit() {
      if (this.isUpdate) {
        this.doUpdate()
      } else {
        this.doSubmit()
      }
    },
    doSubmit() {
      fetchAdd(this.form)
        .then(res => {
          this.secussReturn()
        })
        .catch(res => {
          this.$message.error('提交信息失败！')
        })
    },
    doUpdate() {
      const updateForm = {
        ...this.form,
        id: this.updateId
      }
      console.log(this.form)
      fetchUpdate(updateForm)
        .then(res => {
          this.secussReturn()
        })
        .catch(res => {
          this.$message.error('修改信息失败！')
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
.app-container {
  margin-top: 60px;
}
.avatar-uploader {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  min-height: 178px;
  display: block;
}
.el-upload__tip {
  width: 178px;
  text-align: center;
}
</style>
