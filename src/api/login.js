import request from '@/utils/request';

export function loginByUserAccount(mobile, password) {
  const data = {
    mobile,
    password,
  };

  return request('/userLogin/login', data);
}

export function loginByMobileVerifCode(mobile, verif) {
  const data = {
    mobile,
    verif,
  };

  return request('/userLogin/loginVerif', data);
}

export function getMobileVerifCode(mobile) {
  return request('/userLogin/getVerif', { mobile });
}

export function getUserInfo(userID) {
  return request('/userLogin/getInfo', { userID });
}

export function afterUserSignupfillInfo(name, password) {
  const data = {
    name,
    password,
  };
  return request('/userLogin/finishInfo', data);
}

export function retrieveVerifCode(mobile, password, verif) {
  const data = {
    mobile,
    password,
    verif,
  };
  return request('/userLogin/findPassword',data);
}

export function logout() {
  return request('/userLogin/logout');
}
