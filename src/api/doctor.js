import request from '@/utils/request'

export function fetchList(query = {}) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/doctor/list',
    method: 'post',
    params: query
  })
}

export function fetchAdd(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/doctor/add',
    method: 'post',
    data
  })
}

export function fetchDel(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/doctor/del',
    method: 'post',
    data
  })
}

export function fetchUpdate(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/doctor/update',
    method: 'post',
    data
  })
}

export function fetchGet(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/doctor/get',
    method: 'post',
    data
  })
}

