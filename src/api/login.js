import request from '@/utils/request';

export function loginByUserAccount(mobile, password) {

  const data = {
    mobile,
    password,
  };
  console.log(data);
  return request.post('/userLogin/login', data);
}

export function loginByMobileVerifCode(mobile, verif) {
  const data = {
    mobile,
    verif,
  };

  return request.post('/userLogin/loginVerif', data);
}

export function getMobileVerifCode(mobile) {
  return request.post('/userLogin/getVerif', mobile);
}

export function getUserInfo(userID) {
  return request.post('/userLogin/getInfo', userID);
}

export function afterUserSignupfillInfo(name, password) {
  const data = {
    name,
    password,
  };
  return request.post('/userLogin/finishInfo', data);
}

export function retrieveVerifCode(mobile, password, verify) {
  const data = {
    mobile,
    password,
    verify,
  };
  return request.post('/userLogin/findPassword', data);
}

export function logout() {
  return request.post('/userLogin/logout');
}
