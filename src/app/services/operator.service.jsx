import { fetchWrapper } from "app/helpers/fetch-wrapper"
const Url = `${process.env.REACT_APP_BASE_URL}/operator`

export const operatorService = {
  getAllOperator,
  getOperatorById,
  addOperator,
  updateOperator,
  deleteOperator,
}

function getAllOperator(data) {
  return fetchWrapper.post(`${Url}`, data)
}

function getOperatorById(id) {
  return fetchWrapper.get(`${Url}/${id}`)
}

function addOperator(data) {
  return fetchWrapper.post(`${Url}/create`, data)
}

function updateOperator(id, data) {
  return fetchWrapper.put(`${Url}/${id}`, data)
}

function deleteOperator(id) {
  return fetchWrapper.delete(`${Url}/${id}`)
}
