import { fetchWrapper } from "app/helpers/fetch-wrapper"
const tickerUrl = `${process.env.REACT_APP_BASE_URL}/ticker`

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
