import request from '@/utils/request'

export const queryUserList = ({ page = 1, pageSize = 10 }) => {
  return request({
    method: 'get',
    url: '/users?_limit=' + pageSize + '&_page=' + page
  })
}

export const removeUser = id => {
  return request({
    method: 'delete',
    url: '/users/' + id
  })
}

export const createUser = user => {
  return request({
    data: user,
    method: 'post',
    url: '/users'
  })
}

export const updateUser = (id, user) => {
  return request({
    data: user,
    method: 'put',
    url: `/users/${id}`
  })
}
