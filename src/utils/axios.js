import axios from "axios";

export function apiUrl(path) {
  return `http://localhost:3001/${path}`;
}

export async function axiosCall(method, url, options = {}) {
  const { data } = await axios({
    method,
    url,
    ...options,
  })

  return data;
}  