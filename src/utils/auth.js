import { authConfig as cfg } from './constants.js';

function handleResponse(res) {
  if (res.ok) {
    return res;
  }
  return Promise.reject(res.status);
}

export function register({ email, password }) {
  return fetch(`${cfg.BASE_URL}/${cfg.REGISTER}`, {
    method: 'POST',
    headers: cfg.HEADERS,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return handleResponse(res);
  });
}

export function authorize({ email, password }) {
  return fetch(`${cfg.BASE_URL}/${cfg.LOGIN}`, {
    method: 'POST',
    headers: cfg.HEADERS,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return handleResponse(res);
  });
}

export function getUserInfo(token) {
  return fetch(`${cfg.BASE_URL}/${cfg.USER}`, {
    method: 'GET',
    headers: {
      ...cfg.HEADERS,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return handleResponse(res);
  });
}
