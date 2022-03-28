import { fetchWrapper } from 'app/helpers/fetch-wrapper'

const bankUrl = `http://192.168.129.240:4000/banner`

export const bannerService = {
    getAllBanner,
    getBannerById,
    addBanner,
    updateBanner,
}

function getAllBanner() {
    return fetchWrapper.get(bankUrl)
}
function getBannerById(id) {
    return fetchWrapper.get(`${bankUrl}/${id}`)
}

function addBanner(data) {
    return fetchWrapper.post(bankUrl, data)
}

function updateBanner(id, data) {
    return fetchWrapper.put(`${bankUrl}/${id}`, data)
}
