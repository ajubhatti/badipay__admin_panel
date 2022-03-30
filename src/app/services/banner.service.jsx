import { fetchWrapper } from 'app/helpers/fetch-wrapper'

const bannerUrl = `http://192.168.129.240:4000/banner`

export const bannerService = {
    getAllBanner,
    getBannerById,
    addBanner,
    updateBanner,
    uploadBanner
}

function getAllBanner() {
    return fetchWrapper.get(bannerUrl)
}
function getBannerById(id) {
    return fetchWrapper.get(`${bannerUrl}/${id}`)
}

function addBanner(data) {
    return fetchWrapper.post(bannerUrl, data)
}

function updateBanner(id, data) {
    return fetchWrapper.put(`${bannerUrl}/${id}`, data)
}

function uploadBanner(data) {
    return fetchWrapper.postImage(`${bannerUrl}/uploadBanner`, data)
}
