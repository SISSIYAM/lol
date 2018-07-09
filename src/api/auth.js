import request from '@/utils/request';
/**
 * 验证用户登录状态是否任然有效
 */

export function hasAuth(token) {
  return request({
    url: '/userLogin/isAccessToken',
    method: '',
    params: { token },
  });
}
