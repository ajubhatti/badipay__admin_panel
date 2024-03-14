import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${BASE_URL}/service`

const getAllService = () => {
  return fetchWrapper.get(url)
}
const getServiceById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addService = (data) => {
  return fetchWrapper.post(url, data)
}

const updateService = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteService = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}

export const servicesService = {
  getAllService,
  getServiceById,
  addService,
  updateService,
  deleteService,
}
