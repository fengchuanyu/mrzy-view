import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/case/list',
    method: 'get',
    params: query
  })
}

export function fetchDel(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/case/del',
    method: 'post',
    data
  })
}

export function fetchAdd(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/case/add',
    method: 'post',
    data
  })
}

export function fetchGet(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/case/get',
    method: 'post',
    data
  })
}

