import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${process.env.REACT_APP_BASE_URL}/paymentGateway`

const getAllPaymentGateways = () => {
  return fetchWrapper.get(url)
}
const getPaymentGatewayById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addPaymentGateway = (data) => {
  return fetchWrapper.post(url, data)
}

const updatePaymentGateway = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deletePaymentGateway = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}

export const paymentGatewayService = {
  getAllPaymentGateways,
  getPaymentGatewayById,
  addPaymentGateway,
  updatePaymentGateway,
  deletePaymentGateway,
}
