import { fetchWrapper } from "app/helpers/fetch-wrapper"
const Url = `${process.env.REACT_APP_BASE_URL}/ambikaSlab`

const getAll = () => {
  return fetchWrapper.get(Url)
}
const getById = (id) => {
  return fetchWrapper.get(`${Url}/${id}`)
}

const add = (data) => {
  return fetchWrapper.post(Url, data)
}

const update = (id, data) => {
  return fetchWrapper.put(`${Url}/${id}`, data)
}

const _delete = (id) => {
  return fetchWrapper.delete(`${Url}/${id}`)
}

export const ambikaService = {
  getAll,
  getById,
  add,
  update,
  _delete,
}
