import request from '@/utils/request'

export function tempFile(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/util/tempfile',
    method: 'post',
    data
  })
}
