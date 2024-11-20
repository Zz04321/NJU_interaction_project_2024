import axios from 'axios'
import global from './global.vue';

const API_BASE_URL = global.url;
const token = localStorage.getItem('uid');

// 登录 API
export function login(email, upass) {
  const url = `${API_BASE_URL}/user/login`;
  return axios.post(url, { email, upass });
}

// 注册 API
export function register(email, upass, role) {
  return axios.post(`${API_BASE_URL}/user/add`, { email, upass, role});
}

// 获取用户信息 API
export function getUserInfo() {
  const url = `${API_BASE_URL}/user/info`;
  return axios.post(url, {},{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('uid')}`
    }
  });
}


/// 更新用户信息 API
export function resetUserInfo(token, userInfo) {
  const url = `${API_BASE_URL}/user/resetInfo`;
  return axios.post(url, userInfo, {
    'Authorization': `Bearer ${getToken()}`
  });
}

// 上传头像 API
export function uploadImage(file, token) {
  const url = `${API_BASE_URL}/image/upload`;
  let bodyFormData = new FormData();
  bodyFormData.append('file', file);

  return axios.post(url, bodyFormData, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 退出登录逻辑（前端实现）
export function logout(router) {
  localStorage.removeItem('email');
  localStorage.removeItem('uid');
  router.replace('/Login');
}

export function notify(vm, message, type = 'success') {
  vm.$notify({
    message: message,
    type: type,
    offset: 100
  });
}
