import request from '@/utils/request';

export function updateUsername(name) {
  const data = {
    name,
  };
  return request({
    url: '/userLogin/updateName',
    method: 'post',
    data,
  });
}

export function updateUserImg() {
  const data = {};
  return request({
    url: '',
    method: '',
    data,
  });
}

