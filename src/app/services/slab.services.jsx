import { fetchWrapper } from "app/helpers/fetch-wrapper"
const slabUrl = `${process.env.REACT_APP_BASE_URL}/spslabs`

const getAllSlab = (data) => {
  return fetchWrapper.post(`${slabUrl}/getAll`, data)
}

const getSlabById = (id) => {
  return fetchWrapper.get(`${slabUrl}/${id}`)
}

const addSlab = (data) => {
  return fetchWrapper.post(slabUrl, data)
}

const updateSlab = (id, data) => {
  return fetchWrapper.put(`${slabUrl}/${id}`, data)
}

const deleteSlab = (id) => {
  return fetchWrapper.delete(`${slabUrl}/${id}`)
}

export const slabService = {
  getAllSlab,
  getSlabById,
  addSlab,
  updateSlab,
  deleteSlab,
}
