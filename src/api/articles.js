import request from '@/utils/request'

export function fetchList(query = {}) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/article/list',
    method: 'post',
    params: query
  })
}

export function fetchAdd(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/article/add',
    method: 'post',
    data
  })
}

export function fetchDel(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/article/del',
    method: 'post',
    data
  })
}

export function fetchUpdate(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/article/update',
    method: 'post',
    data
  })
}

export function fetchGet(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/article/get',
    method: 'post',
    data
  })
}

