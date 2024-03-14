import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${BASE_URL}/rechargeOrBill`

const getAllRecharge = () => {
  return fetchWrapper.get(url)
}

const getRecharges = (data) => {
  return fetchWrapper.post(`${url}/getRecharges`, data)
}

const getRechargeById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addRecharge = (data) => {
  return fetchWrapper.post(url, data)
}

const updateRechargeById = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteRecharge = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}

const getRechargeReport = (data) => {
  return fetchWrapper.post(`${url}/getRechargeReports`, data)
}

export const rechargesService = {
  getAllRecharge,
  getRecharges,
  getRechargeById,
  addRecharge,
  updateRechargeById,
  deleteRecharge,
  getRechargeReport,
}
