import { fetchWrapper } from 'app/helpers/fetch-wrapper'
const stateUrl = `${process.env.REACT_APP_BASE_URL}/state`

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

export const utilityService = {
    getAllState,
    getStateById,
    addState,
    updateState,
    deleteState,
}
