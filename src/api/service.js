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

export function getAllCollects(email) {
  const url = `${API_BASE_URL}/service/getCollection/${email}`;
  return axios.post(url, {},{headers: {
      'Authorization': `${global.getToken()}`
    }});
}

export function collect(email) {
  const url = `${API_BASE_URL}/service/collect/${email}`;
  return axios.post(url, {}, {
    headers: {
      'Authorization': `${global.getToken()}`,
      'Content-Type': 'application/json',
    }
  });
}

export function favour(email) {
  const url = `${API_BASE_URL}/service/favor/${email}`;
  return axios.post(url, {}, {
    headers: {
      'Authorization': `${global.getToken()}`,
      'Content-Type': 'application/json',
    }
  });
}
export function hasCollect(email) {
  const url = `${API_BASE_URL}/service/hasCollected/${email}`;
  return axios.post(url, {}, { headers: {
      'Authorization': `${global.getToken()}`
    }});
}


export function cancelCollect(email) {
  const url = `${API_BASE_URL}/service/cancelCollect/${email}`;
  return axios.post(url, {}, {headers: {
      'Authorization': `${global.getToken()}`,
      'Content-Type': 'application/json',
    }});
}

// Check if a photo is favoured
export function hasFavoured(email) {
  const url = `${API_BASE_URL}/service/hasFavored/${email}`;
  return axios.post(url, {}, {
    headers: {
      'Authorization': `${global.getToken()}`
    }
  });
}

// Upload photos
export function uploadPhotos(photos) {
  const url = `${API_BASE_URL}/service/upload`;
  return axios.post(url, photos, {
    headers: {
      'Authorization': `${global.getToken()}`,
      'Content-Type': 'application/json',
    }
  });
}

// Get all photos by email
export function getAllPhotos(email) {
  const url = `${API_BASE_URL}/service/getAllPhotos/${email}`;
  return axios.post(url, {}, {
    headers: {
      'Authorization': `${global.getToken()}`
    }
  });
}

// Get all fans
export function getFans(email) {
  const url = `${API_BASE_URL}/service/getFans/${email}`;
  return axios.post(url, {}, {
    headers: {
      'Authorization': `${global.getToken()}`
    }
  });
}

// Check if joined
export function hasJoined() {
  const url = `${API_BASE_URL}/service/hasJoined`;
  return axios.post(url, {}, {
    headers: {
      'Authorization': `${global.getToken()}`
    }
  });
}
export function getFavors(email) {
  const url = `${API_BASE_URL}/service/getFavors/${email}`;
  return axios.post(url, {}, {
    headers: {
      'Authorization': `${global.getToken()}`
    }
  });
}
export function cancelFavor(email) {
  const url = `${API_BASE_URL}/service/cancelFavor/${email}`;
  return axios.post(url, {}, {headers: {
      'Authorization': `${global.getToken()}`,
      'Content-Type': 'application/json',
    }});
}

