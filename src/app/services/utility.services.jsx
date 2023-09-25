import { fetchWrapper } from "app/helpers/fetch-wrapper"
const stateUrl = `${process.env.REACT_APP_BASE_URL}/state`
const utilityUrl = `${process.env.REACT_APP_BASE_URL}/utility`

const getAllState = () => {
  return fetchWrapper.get(stateUrl)
}
const getStateById = (id) => {
  return fetchWrapper.get(`${stateUrl}/${id}`)
}

const addState = (data) => {
  return fetchWrapper.post(stateUrl, data)
}

const updateState = (id, data) => {
  return fetchWrapper.put(`${stateUrl}/${id}`, data)
}

const deleteState = (id) => {
  return fetchWrapper.delete(`${stateUrl}/${id}`)
}

const getAllUtility = () => {
  return fetchWrapper.post(`${utilityUrl}/getAll`)
}
const getUtilityById = (id) => {
  return fetchWrapper.get(`${utilityUrl}/${id}`)
}

const addUtility = (data) => {
  return fetchWrapper.post(utilityUrl, data)
}

const updateUtility = (id, data) => {
  return fetchWrapper.put(`${utilityUrl}/${id}`, data)
}

const deleteUtility = (id) => {
  return fetchWrapper.delete(`${utilityUrl}/${id}`)
}

export const utilityService = {
  getAllState,
  getStateById,
  addState,
  updateState,
  deleteState,
  getAllUtility,
  getUtilityById,
  addUtility,
  updateUtility,
  deleteUtility,
}
