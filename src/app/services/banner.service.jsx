import { fetchWrapper } from 'app/helpers/fetch-wrapper'

const bannerUrl = `${process.env.REACT_APP_BASE_URL}/banner`

export const bannerService = {
    getAllBanner,
    getBannerById,
    addBanner,
    updateBanner,
    uploadBanner,
    deleteBanner,
    updateBannerWithImage,
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

function updateBannerWithImage(id, data) {
    return fetchWrapper.putImage(`${bannerUrl}/${id}`, data)
}

function uploadBanner(data) {
    return fetchWrapper.postImage(`${bannerUrl}/uploadBanner`, data)
}

function deleteBanner(id) {
    return fetchWrapper.delete(`${bannerUrl}/${id}`)
}
