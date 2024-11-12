import axios from 'axios';
import global from './global.vue';

// 定义 API 基础 URL
const API_BASE_URL = global.url;

// 提交报名表单 API
export function submitFormData(formData) {
    const url = `${API_BASE_URL}/event/register`;
    return axios.post(url, formData);
}

// 摄影师参与评选 API
export function joinCompetitionAPI(userId) {
  const url = `${API_BASE_URL}/event/joinCompetition`;
  return axios.post(url, { userId });
}

// 用户投票 API
export function voteAPI(photographerId) {
  const url = `${API_BASE_URL}/event/vote`;
  return axios.post(url, { photographerId });
}
