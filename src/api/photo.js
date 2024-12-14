import axios from 'axios'
import global from './global.vue';
const API_BASE_URL = global.url;

// 上传照片api
export function uploadPhoto(photoUrl, description, theme, title) {
  const url = `${API_BASE_URL}/photo/add`;

  return axios.post(url, {
    url: photoUrl,
    description: description,
    theme: theme,
  }, {
    headers:{
      'Authorization': `${global.getToken()}`
    }
  })
}

export function fetchPhotos(page, limit, key) {
  const url = `${API_BASE_URL}/photo/fetchPhotos`;
  return axios.post(url, {}, {
    params: {
      page: page,
      limit: limit,
      key: key,
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

export function favoritePhoto(photoUrl) {
  const url = `${API_BASE_URL}/photo/favor`;
  return axios.post(url, {}, {
    params: {
      url: photoUrl
    },
    headers:{
      'Authorization': `${global.getToken()}`
    }
  });
}

export function hasFavoritedPhoto(photoUrl) {
  const url = `${API_BASE_URL}/photo/hasFavor`;
  return axios.post(url, {}, {
    params: {
      url: photoUrl
    },
    headers:{
      'Authorization': `${global.getToken()}`
    }
  });
}

export function cancelFavoritePhoto(photoUrl) {
  const url = `${API_BASE_URL}/photo/cancelFavor`;
  return axios.post(url, {}, {
    params: {
      url: photoUrl
    },
    headers:{
      'Authorization': `${global.getToken()}`
    }
  });
}
