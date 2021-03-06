import { fetchWrapper } from 'app/helpers/fetch-wrapper'
const bankAccountUrl = `${process.env.REACT_APP_BASE_URL}/bankAccount`
const bankUrl = `${process.env.REACT_APP_BASE_URL}/bank`

export const bankAccountService = {
    getAllBankAccount,
    getBankAccountById,
    addBankAccount,
    updateBankAccount,

    getAllBank,
    getBankById,
    addBank,
    updateBank,
}

function getAllBankAccount() {
    return fetchWrapper.get(bankAccountUrl)
}

function getBankAccountById(id) {
    return fetchWrapper.get(`${bankAccountUrl}/${id}`)
}

function addBankAccount(data) {
    return fetchWrapper.post(bankAccountUrl, data)
}

function updateBankAccount(id, data) {
    return fetchWrapper.put(`${bankAccountUrl}/${id}`, data)
}

function getAllBank() {
    return fetchWrapper.get(bankUrl)
}
function getBankById(id) {
    return fetchWrapper.get(`${bankUrl}/${id}`)
}

function addBank(data) {
    return fetchWrapper.post(bankUrl, data)
}

function updateBank(id, data) {
    return fetchWrapper.put(`${bankUrl}/${id}`, data)
}
