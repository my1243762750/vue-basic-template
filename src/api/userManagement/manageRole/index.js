import request from '@/utils/request'

export function manageRoleList(params, isShowLoading) {
  return request({
    url: '/vue-admin-template/userManagement/manageRole/list',
    method: 'get',
    isShowLoading,
    params
  })
}

export function manageRoleDetail(params, isShowLoading) {
  return request({
    url: '/vue-admin-template/userManagement/manageRole/detail',
    method: 'get',
    isShowLoading,
    params
  })
}
