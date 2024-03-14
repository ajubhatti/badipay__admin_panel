import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${BASE_URL}/transaction`

const getAllTransactions = (data) => {
  return fetchWrapper.post(`${url}/getAll`, data)
}

const getTransactionById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addTransaction = (data) => {
  return fetchWrapper.post(url, data)
}

const updateTransaction = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteTransaction = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}

export const transactionsService = {
  getAllTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
}
