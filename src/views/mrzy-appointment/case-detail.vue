<template>
  <div class="app-container case-detail">
    <el-row :gutter="20">
      <el-col :span="18" :offset="2">
        <el-container>
          <el-header>
            <el-card shadow="always">患者姓名：{{ caseInfo.patientName }}</el-card>
          </el-header>
          <el-container>
            <el-aside class="info-aside" width="220px">
              <ul class="info-list">
                <li>就诊科室：{{ caseInfo.office }}</li>
                <li>就诊医生：{{ caseInfo.doctorName }}</li>
                <li>就诊时间：{{ caseInfo.creatDate }}</li>
              </ul>
            </el-aside>
            <el-main class="main-content">
              <!-- 诊断结果 -->
              <div class="diagnosis">
                <el-card shadow="never" class="box-card">
                  <div slot="header" class="clearfix">
                    <span>诊断结果</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button> -->
                  </div>
                  <div>{{ caseInfo.resultInfo }}</div>
                </el-card>
              </div>
              <!-- 图片区域 -->
              <div class="img-bar">
                <el-card shadow="never" class="box-card">
                  <el-collapse accordion>
                    <el-collapse-item title="图片文件(点击显示)" name="1">
                      <el-card v-for="item in caseImgList" :key="item.fileID" :body-style="{ padding: '0px' }">
                        <img
                          :src="item.tempFileURL"
                          class="image"
                        >
                      </el-card>
                    </el-collapse-item>
                  </el-collapse>
                  <div />
                </el-card>
              </div>
              <!-- 留言信息 -->
              <div class="message-content">
                <el-card shadow="never" class="box-card">
                  <el-collapse>
                    <el-collapse-item title="线上看诊信息(点击查看)" name="1">
                      <el-timeline>
                        <el-timeline-item v-for="item in caseInfo.messageList" :key="item.creatTime" timestamp="2018/4/12" placement="top">
                          <el-card>
                            <h4>{{ item.message }}</h4>
                            <p>{{ item.userType==0 ? caseInfo.patientName:caseInfo.doctorName }} 发布于 {{ item.creatDate }}</p>
                          </el-card>
                        </el-timeline-item>
                      </el-timeline>
                    </el-collapse-item>
                  </el-collapse>
                </el-card>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { fetchGet } from '@/api/case'
import { tempFile } from '@/api/utils'
export default {
  data() {
    return {
      diagnosis: '暂无信息！',
      caseInfo: {},
      caseImgList: []
    }
  },
  mounted() {
    const routeParams = this.$route.params
    if (routeParams.hasOwnProperty('id')) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
      this.getCase(routeParams.id)
    } else {
      const id = '57896b495cefe106086d1d380cc6d113'
      this.getCase(id)
    }
  },
  methods: {
    getCase(id) {
      const thisId = {
        id
      }
      fetchGet(thisId)
        .then(res => {
          console.log(res)
          this.caseInfo = {
            ...res.data[0]
          }
          this.tempFileUrl()
        })
        .catch(res => {
          console.log(res)
        })
    },
    tempFileUrl() {
      const imgList = this.caseInfo.imgList
      const imgArr = []
      for (const item of imgList) {
        imgArr.push(item.fileID)
      }
      console.log(imgArr)
      tempFile({ id: imgArr })
        .then((res) => {
          console.log(res)
          this.caseImgList = Array.from(res.data)
        })
        .catch((res) => {
          this.$message.error('获取图片失败！')
        })
    }
  }
}
</script>
<style scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
}
.info-list li {
  height: 40px;
}
.case-detail .el-header {
  padding: 0;
  margin: 20px 0;
  text-align: center;
}
.main-content {
  padding: 0 0 0 20px;
}
.time {
  font-size: 13px;
  color: #999;
}
.image {
  width: 100%;
  display: block;
}
.img-bar {
  margin-top: 20px;
}
.img-title {
  font-size: 20px;
}
.message-content {
  margin-top: 20px;
}
</style>
