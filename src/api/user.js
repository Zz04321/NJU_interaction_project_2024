import axios from 'axios'
import global from '../components/global.vue'

const API_BASE_URL = global.url;

// 登录 API
export function login(email, upass) {
  const url = `${API_BASE_URL}/user/login`;
  return axios.post(url, { email, upass });
}

// 注册 API
export function register(email, upass, isPhotographer) {
  return axios.post(`${API_BASE_URL}/user/add`, { email, upass, isPhotographer});
}
