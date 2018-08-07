import request from '../utils/request';

export function updateUserName(name) {
  return request.post('/userLogin/updateName', name);
}

export function uploadingImg(file) {
  return request.post('/userLogin/uploadimg', file);
}
