import { fetchWrapper } from "app/helpers/fetch-wrapper"
const contactUsUrl = `${process.env.REACT_APP_BASE_URL}/contactUs`

const getAllContactUs = () => {
  return fetchWrapper.get(contactUsUrl)
}
const getContactUsById = (id) => {
  return fetchWrapper.get(`${contactUsUrl}/${id}`)
}

const addContactUs = (data) => {
  return fetchWrapper.post(contactUsUrl, data)
}

const updateContactUs = (id, data) => {
  return fetchWrapper.put(`${contactUsUrl}/${id}`, data)
}

const deleteContactUs = (id) => {
  return fetchWrapper.delete(`${contactUsUrl}/${id}`)
}

export const contactUsService = {
  getAllContactUs,
  getContactUsById,
  addContactUs,
  updateContactUs,
  deleteContactUs,
}
