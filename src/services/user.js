import request from '@/utils/request';

export const queryUserList = ({ page = 1, pageSize = 10, ...rest } = {}) => {
  return request({
    method: 'get',
    url: `/users`,
    params: {
      _limit: pageSize,
      _page: page,
      ...rest
    }
  });
};

export const removeUser = id => {
  return request({
    method: 'delete',
    url: `/users/${id}`
  });
};

export const createUser = user => {
  return request({
    data: user,
    method: 'post',
    url: '/users'
  });
};

export const updateUser = (id, user) => {
  return request({
    data: user,
    method: 'put',
    url: `/users/${id}`
  });
};
