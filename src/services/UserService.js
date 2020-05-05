import request from '@/utils/request';

const queryUserList = ({ page = 1, pageSize = 10, ...rest } = {}) => {
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

const removeUser = id => {
  return request({
    method: 'delete',
    url: `/users/${id}`
  });
};

const createUser = user => {
  return request({
    data: user,
    method: 'post',
    url: '/users'
  });
};

const updateUser = (id, user) => {
  return request({
    data: user,
    method: 'put',
    url: `/users/${id}`
  });
};

const getUser = id => {
  return request({
    method: 'get',
    url: `/users/${id}`
  });
};

export default {
  queryUserList,
  createUser,
  updateUser,
  removeUser,
  getUser
};
