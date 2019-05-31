import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/appointment/list',
    method: 'get',
    params: query
  })
}

export function fetchAdd(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/appointment/add',
    method: 'post',
    data
  })
}

export function fetchDel(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/appointment/del',
    method: 'post',
    data
  })
}

export function fetchUpdate(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/appointment/update',
    method: 'post',
    data
  })
}

export function fetchGet(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/appointment/get',
    method: 'post',
    data
  })
}

