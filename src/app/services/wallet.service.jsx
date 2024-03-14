import { BASE_URL } from "app/constants/urls"
import { BehaviorSubject } from "rxjs"
import { fetchWrapper } from "../helpers/fetch-wrapper"

const userSubject = new BehaviorSubject(null)

const baseUrl = `${BASE_URL}/walletTransaction`

export const walletServices = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
  updateBalance,
  updateWalletStatus,
  getWallet,
  getAllWalletReport,
}

function getAll(payload) {
  return fetchWrapper.post(`${baseUrl}/getAll`, payload)
}

function getAllWalletReport(payload) {
  return fetchWrapper.post(`${baseUrl}/getwalletReports`, payload)
}

function getWallet(payload) {
  return fetchWrapper.post(`${baseUrl}/getWallet`, payload)
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`)
}

function create(params) {
  return fetchWrapper.post(baseUrl, params)
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((wallet) => {
    // update stored user if the logged in user updated their own record
    // if (user.id === userSubject?.value?.id) {
    //     // publish updated user to subscribers
    //     user = { ...userSubject.value, ...user }
    //     userSubject.next(user)
    // }
    return wallet
  })
}

function updateWalletStatus(params) {
  return fetchWrapper
    .post(`${baseUrl}/updateWalletStatus`, params)
    .then((response) => {
      return response
    })
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`).then((x) => {
    return x
  })
}

function updateBalance(params) {
  return fetchWrapper.post(`${baseUrl}/updateBalance`, params)
}
