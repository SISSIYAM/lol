import request from '@/utils/request';

export function loginByUserInfo(username, password) {
  const data = {
    username,
    password,
  };

  return request({
    url: '/userLogin/login',
    method: 'post',
    data,
  });
}

export function loginByMobileAuthCode(username, authCode) {
  const data = {
    username,
    authCode,
  };

  return request({
    url: '/userLogin/getVerif',
    method: 'post',
    data,
  });
}

export function getUserInfo(userID) {
  const data = {
    userID,
  };

  return request({
    url: '',
    method: 'get',
    data,
  });
}

export function logout() {
  return request({
    url: '',
    method: 'post',
  });
}
