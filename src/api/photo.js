import axios from 'axios'
import global from './global.vue';

const API_BASE_URL = global.url;

// 上传照片api
export function uploadImage(file) {
  const url = `${API_BASE_URL}/image/upload`;
  let bodyFormData = new FormData();
  bodyFormData.append('file', file);

  return axios.post(url, bodyFormData, {
    headers: {
      'Authorization': `${global.getToken()}`,
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function getAll(page, limit) {
  const url = `${API_BASE_URL}/photo/getAll`;
  return axios.post(url, {}, {
    params: {
      page: page,
      limit: limit
    },
  });
}

export function getAllByEmail(email, page, limit) {
  const url = `${API_BASE_URL}/photo/getAllByEmail`;
  return axios.post(url, {}, {
    params: {
      email: email,
      page: page,
      limit: limit
    },
  });
}

export function getAllByTheme(theme, page, limit) {
  const url = `${API_BASE_URL}/photo/getAllByTheme`;
  return axios.post(url, {}, {
    params: {
      theme: theme,
      page: page,
      limit: limit
    },
  });
}
