import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${BASE_URL}/apiConfig`

const getAllApiConfig = () => {
  return fetchWrapper.get(url)
}
const getApiConfigById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addApiConfig = (data) => {
  return fetchWrapper.post(`${url}/addByScan`, data)
}

const updateApiConfig = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteApiConfig = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}

export const apiConfigService = {
  getAllApiConfig,
  getApiConfigById,
  addApiConfig,
  updateApiConfig,
  deleteApiConfig,
}
