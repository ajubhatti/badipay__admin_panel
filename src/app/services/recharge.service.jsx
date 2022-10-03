import { fetchWrapper } from 'app/helpers/fetch-wrapper'
const url = `${process.env.REACT_APP_BASE_URL}/rechargeOrBill`

const getAllRecharge = () => {
    return fetchWrapper.get(url)
}
const getRechargeById = (id) => {
    return fetchWrapper.get(`${url}/${id}`)
}

const addRecharge = (data) => {
    return fetchWrapper.post(url, data)
}

const updateRecharge = (id, data) => {
    return fetchWrapper.put(`${url}/${id}`, data)
}

const deleteRecharge = (id) => {
    return fetchWrapper.delete(`${url}/${id}`)
}

export const rechargesService = {
    getAllRecharge,
    getRechargeById,
    addRecharge,
    updateRecharge,
    deleteRecharge,
}
