import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const slabUrl = `${BASE_URL}/operatorConfig`

const getAllOperatorConfig = (data) => {
  return fetchWrapper.post(`${slabUrl}/getAll`, data)
}

const getOperatorConfigWithPagination = (data) => {
  return fetchWrapper.post(`${slabUrl}/getWithPagination`, data)
}

const getOperatorConfigById = (id) => {
  return fetchWrapper.get(`${slabUrl}/${id}`)
}

const addOperatorConfig = (data) => {
  return fetchWrapper.post(slabUrl, data)
}

const updateOperatorConfig = (id, data) => {
  return fetchWrapper.put(`${slabUrl}/${id}`, data)
}

const deleteOperatorConfig = (id) => {
  return fetchWrapper.delete(`${slabUrl}/${id}`)
}

const scanAndAdd = () => {
  return fetchWrapper.post(`${slabUrl}/scanAndAdd`)
}

export const operatorConfigService = {
  getAllOperatorConfig,
  getOperatorConfigById,
  addOperatorConfig,
  updateOperatorConfig,
  deleteOperatorConfig,
  getOperatorConfigWithPagination,
  scanAndAdd,
}
