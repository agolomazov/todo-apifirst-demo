import axios from 'axios';

const BASE_API = 'http://127.0.0.1:3010'

export class BaseAPI {
  constructor(baseApi = BASE_API) {
    this.baseApi = baseApi;
  }

  async get(endpoint, config) {
    return await axios.get(`${this.baseApi}/${endpoint}`, config);
  }

  async post(endpoint, data, config) {
    return await axios.post(`${this.baseApi}/${endpoint}`, data, config);
  }

  async remove(endpoint, config) {
    return await axios.delete(`${this.baseApi}/${endpoint}`, config);
  }

  async update(endpoint, data, config) {
    return await axios.put(`${this.baseApi}/${endpoint}`, data, config);
  }
}