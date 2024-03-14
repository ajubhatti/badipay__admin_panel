import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${BASE_URL}/cashback`

const getAllCashBacks = (data) => {
  return fetchWrapper.post(`${url}/getAll`, data)
}

const getAllCashBacksReport = (data) => {
  return fetchWrapper.post(`${url}/getForReport`, data)
}

const getCashBackById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addCashBack = (data) => {
  return fetchWrapper.post(url, data)
}

const updateCashBack = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteCashBack = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}

const adminloyalty = () => {
  return fetchWrapper.get(`${BASE_URL}/adminloyalty`)
}

const getCashBackReports = (data) => {
  return fetchWrapper.post(`${url}/getReports`, data)
}

export const cashBackService = {
  getAllCashBacks,
  getCashBackById,
  addCashBack,
  updateCashBack,
  deleteCashBack,
  adminloyalty,
  getCashBackReports,
  getAllCashBacksReport,
}
