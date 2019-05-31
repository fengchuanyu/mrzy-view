import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/muser/list',
    method: 'get',
    params: query
  })
}

export function fetchUpdate(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/muser/update',
    method: 'post',
    data
  })
}

