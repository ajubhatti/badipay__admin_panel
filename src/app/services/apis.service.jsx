import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${BASE_URL}/apis`

const getAllApis = () => {
  return fetchWrapper.get(url)
}
const getApiById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addApi = (data) => {
  return fetchWrapper.post(url, data)
}

const updateApi = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteApi = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}

export const apisService = {
  getAllApis,
  getApiById,
  addApi,
  updateApi,
  deleteApi,
}
