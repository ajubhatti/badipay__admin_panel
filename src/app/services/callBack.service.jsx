import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${process.env.REACT_APP_BASE_URL}/callBack`

const getAllcallBack = () => {
  return fetchWrapper.get(url)
}

const getcallBackById = (id) => {
  return fetchWrapper.get(`${url}/${id}`)
}

const addcallBack = (data) => {
  return fetchWrapper.post(url, data)
}

const updatecallBackById = (id, data) => {
  return fetchWrapper.put(`${url}/${id}`, data)
}

const deletecallBack = (id) => {
  return fetchWrapper.delete(`${url}/${id}`)
}

export const callBackService = {
  getAllcallBack,
  getcallBackById,
  addcallBack,
  updatecallBackById,
  deletecallBack,
}
