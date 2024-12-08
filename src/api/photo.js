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

export function fetchPhotos(page, limit) {
  const url = `${API_BASE_URL}/photo/fetchPhotos`;
  return axios.post(url, {}, {
    params: {
      page: page,
      limit: limit
    },
  });
}

export function fetchPhotosByEmail(email, page, limit) {
  const url = `${API_BASE_URL}/photo/fetchPhotosByEmail`;
  return axios.post(url, {}, {
    params: {
      email: email,
      page: page,
      limit: limit
    },
  });
}

export function fetchPhotosByTheme(theme, page, limit) {
  const url = `${API_BASE_URL}/photo/fetchPhotosByTheme`;
  return axios.post(url, {}, {
    params: {
      theme: theme,
      page: page,
      limit: limit
    },
  });
}
