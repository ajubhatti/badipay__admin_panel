import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${process.env.REACT_APP_BASE_URL}/cashback`

const getAllCashBacks = (data) => {
    return fetchWrapper.post(`${url}/getAll`, data)
}
const getCashBackById = (id) => {
    return fetchWrapper.get(`${url}/${id}`)
}

const addCashBack = (data) => {
    return fetchWrapper.post(url, data)
}

const updateCashBack = (id, data) => {
    return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteCashBack = (id) => {
    return fetchWrapper.delete(`${url}/${id}`)
}

export const cashBackService = {
    getAllCashBacks,
    getCashBackById,
    addCashBack,
    updateCashBack,
    deleteCashBack,
}
