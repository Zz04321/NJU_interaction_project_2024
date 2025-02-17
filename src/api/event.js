import axios from 'axios';
import global from './global.vue';

// 定义 API 基础 URL
const API_BASE_URL = global.url;

// 提交报名表单 API
export function submitFormData(contact, eventId) {
  const url = `${API_BASE_URL}/event/${eventId}/register`;
  return axios.post(url, {contact},{
    headers: {
      'Authorization': `${global.getToken()}`,
      'Content-Type': 'application/json',
    }
  });
}

// 参加人气摄影师评选活动 API
export function joinCompetition(contact, description, photo) {
  const url = `${API_BASE_URL}/event/3/register`;
  return axios.post(url, { contact, description, photo }, {
    headers: {
      'Authorization': `${global.getToken()}`
    }
  });
}

// 获取所有摄影师信息 API
export function getAllPhotographers() {
  const url = `${API_BASE_URL}/event/3/getAll`;
  return axios.post(url);
}

// 用户投票 API
export function voteForPhotographer(email) {
  const url = `${API_BASE_URL}/event/3/vote/${email}`;
  return axios.post(url, {}, {
    headers: {
      'Authorization': `${global.getToken()}`
    }
  });
}

// 检查用户是否已投票 API
export function hasVoted(email) {
  const url = `${API_BASE_URL}/event/3/hasVoted/${email}`;
  return axios.post(url, {},{
    headers: {
      'Authorization': `${global.getToken()}`
    }
  });
}

export function hasRegister(eventId) {
  const url = `${API_BASE_URL}/event/${eventId}/hasRegistered`;
  return axios.post(url, {},{
    headers: {
      'Authorization': `${global.getToken()}`
    }
  });
}
