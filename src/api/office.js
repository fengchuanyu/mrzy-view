import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/office/list',
    method: 'get',
    params: query
  })
}

export function fetchAdd(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/office/add',
    method: 'post',
    data
  })
}

export function fetchDel(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/office/del',
    method: 'post',
    data
  })
}

export function fetchUpdate(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/office/update',
    method: 'post',
    data
  })
}

