import { fetchWrapper } from 'app/helpers/fetch-wrapper'
const tickerUrl = `${process.env.REACT_APP_BASE_URL}/ticker`

export const tickerService = {
    getAllTicker,
    getTickerById,
    addTicker,
    updateTicker,
    deleteTicker,
}

function getAllTicker() {
    return fetchWrapper.get(tickerUrl)
}
function getTickerById(id) {
    return fetchWrapper.get(`${tickerUrl}/${id}`)
}

function addTicker(data) {
    return fetchWrapper.post(tickerUrl, data)
}

function updateTicker(id, data) {
    return fetchWrapper.put(`${tickerUrl}/${id}`, data)
}

function deleteTicker(id) {
    return fetchWrapper.delete(`${tickerUrl}/${id}`)
}
