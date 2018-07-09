import request from '@/utils/request';

export function loginByUserAccount(mobile, password) {
  const data = {
    mobile,
    password,
  };

  return request({
    url: '/userLogin/login',
    method: 'post',
    data,
  });
}

export function loginByMobileVerifCode(mobile, verif) {
  const data = {
    mobile,
    verif,
  };

  return request({
    url: '/userLogin/loginVerif',
    method: 'post',
    data,
  });
}

export function getMobileVerifCode(mobile) {
  return request({
    url: '/userLogin/getVerif',
    method: 'post',
    params: { mobile },
  });
}

export function getUserInfo(userID) {
  return request({
    url: '/userLogin/getInfo',
    method: 'get',
    params: { userID },
  });
}

export function afterUserSignupfillInfo(name, password) {
  const data = {
    name,
    password,
  };
  return request({
    url: '/userLogin/finishInfo',
    method: 'post',
    data,
  });
}

export function retrieveVerifCode(mobile, password, verif) {
  const data = {
    mobile,
    password,
    verif,
  };
  return request({
    url: '/userLogin/findPassword',
    method: 'post',
    data,
  });
}

export function logout() {
  return request({
    url: '/userLogin/logout',
    method: 'post',
  });
}
