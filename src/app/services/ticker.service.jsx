import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const tickerUrl = `${BASE_URL}/ticker`

const getAllTicker = () => {
  return fetchWrapper.get(tickerUrl)
}
const getTickerById = (id) => {
  return fetchWrapper.get(`${tickerUrl}/${id}`)
}

const addTicker = (data) => {
  return fetchWrapper.post(tickerUrl, data)
}

const updateTicker = (id, data) => {
  return fetchWrapper.put(`${tickerUrl}/${id}`, data)
}

const deleteTicker = (id) => {
  return fetchWrapper.delete(`${tickerUrl}/${id}`)
}

export const tickerService = {
  getAllTicker,
  getTickerById,
  addTicker,
  updateTicker,
  deleteTicker,
}
