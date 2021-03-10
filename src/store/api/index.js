import axios from 'axios';

export const headers = () => {
  const token = sessionStorage.getItem('token');

  let Authorization = null;

  if (token) {
    Authorization = `Bearer ${token}`;
  }

  const others = {};

  return Authorization ? {Authorization, ...others} : others;
};

export const get = (url, params) =>
  axios.get(url, {
    headers: headers(),
    params,
    data: {},
  })

export const post = (url, payload, params) =>
  axios.post(url, payload, {
    headers: headers(),
    params: params,
  })

export const put = (url, payload) =>
  axios.put(url, payload, {headers: headers()})

export const patch = (url, payload) =>
  axios.patch(url, payload, {headers: headers()})

export const del = (url, payload) =>
  axios.delete(url, {headers: headers(), data: payload})

export const fakeApi = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms ?? 2000)
  });
};
