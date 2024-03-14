import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${BASE_URL}/serviceCategory`

const getAllServiceCategory = () => {
  return fetchWrapper.post(`${url}/getAll`)
}
const getServiceCategoryById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addServiceCategory = (data) => {
  return fetchWrapper.post(url, data)
}

const updateServiceCategory = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteServiceCategory = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}

export const serviceCategoryService = {
  getAllServiceCategory,
  getServiceCategoryById,
  addServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
}
