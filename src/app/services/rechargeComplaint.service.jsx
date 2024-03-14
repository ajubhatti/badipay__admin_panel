import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${BASE_URL}/rechargeComplaint`

const getAllRechargeComplaints = () => {
  return fetchWrapper.get(url)
}

const getRechargeComplaintById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addRechargeComplaint = (data) => {
  return fetchWrapper.post(url, data)
}

const createRechargeComplaints = (data) => {
  return fetchWrapper.post(`${url}/create`, data)
}

const updateRechargeComplaintById = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteRechargeComplaint = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}
const updateComplaintsStatus = (data) => {
  return fetchWrapper.post(`${url}/updateComplaintsStatus`, data)
}

export const rechargeComplaintService = {
  getAllRechargeComplaints,
  getRechargeComplaintById,
  addRechargeComplaint,
  updateRechargeComplaintById,
  deleteRechargeComplaint,
  createRechargeComplaints,
  updateComplaintsStatus,
}
