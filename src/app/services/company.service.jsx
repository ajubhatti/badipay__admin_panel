import { fetchWrapper } from 'app/helpers/fetch-wrapper'
const Url = `${process.env.REACT_APP_BASE_URL}/company`

export const companyService = {
    getAllCompanies,
    getCompanyById,
    addCompany,
    updateCompany,
    deleteCompany,
}

function getAllCompanies() {
    return fetchWrapper.get(Url)
}
function getCompanyById(id) {
    return fetchWrapper.get(`${Url}/${id}`)
}

function addCompany(data) {
    return fetchWrapper.post(Url, data)
}

function updateCompany(id, data) {
    return fetchWrapper.put(`${Url}/${id}`, data)
}

function deleteCompany(id) {
    return fetchWrapper.delete(`${Url}/${id}`)
}
