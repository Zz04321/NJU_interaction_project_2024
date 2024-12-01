import axios from 'axios';
import global from './global.vue';

// 定义 API 基础 URL
const API_BASE_URL = global.url;

// 提供服务 API
export function register(contact, description, photo) {
  const url = `${API_BASE_URL}/service/register`;
  return axios.post(url, {contact,description,photo},{
    headers: {
      'Authorization': `${global.getToken()}`,
      'Content-Type': 'application/json',
    }
  });
}

// 获取所有摄影师信息 API
export function getAll() {
  const url = `${API_BASE_URL}/service/getAll`;
  return axios.post(url);
}

export function getAllCollects() {
  const url = `${API_BASE_URL}/service/getCollection`;
  return axios.get(url, {'Authorization': `${global.getToken()}`, 'Content-Type': 'application/json'});
}

export function collect(email) {
  const url = `${API_BASE_URL}/service/collect/${email}`;
  return axios.post(url, {}, {'Authorization': `${global.getToken()}`, 'Content-Type': 'application/json'});
}

export function cancelCollect(email) {
  const url = `${API_BASE_URL}/service/cancelCollect/${email}`;
  return axios.post(url, {}, {'Authorization': `${global.getToken()}`, 'Content-Type': 'application/json'});
}
