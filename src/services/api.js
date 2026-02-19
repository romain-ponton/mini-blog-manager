import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  create: (data) => api.post("/posts/add", data),
  delete: (id) => api.delete(`/posts/${id}`),
  get: (url, params) => api.get(url, { params }),
  put: (id, data) => api.put(`/posts/${id}`, data),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const postsAPI = {
  getAll: (params) => api.get("/posts", { params }),
  getById: (id) => api.get(`/posts/${id}`),
  getComments: (id) => api.get(`/posts/${id}/comments`),
  create: (data) => api.post("/posts/add", data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  remove: (id) => api.delete(`/posts/${id}`),
};

export default api;
