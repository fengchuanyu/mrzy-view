import request from '@/utils/request'

export function fetchLogOut(query = {}) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/admin/logOut',
    method: 'post',
    params: query
  })
}

export function fetchLogin(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/admin/login',
    method: 'post',
    data
  })
}

export function fetchGetInfo(data) {
  return request({
    url: process.env.VUE_APP_BASE_API2 + '/admin/getinfo',
    method: 'post',
    data
  })
}
