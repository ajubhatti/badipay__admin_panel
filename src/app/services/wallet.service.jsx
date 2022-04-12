import { BehaviorSubject } from 'rxjs'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { history } from '../helpers/history'

const userSubject = new BehaviorSubject(null)

const baseUrl = `${process.env.REACT_APP_BASE_URL}/walletTransaction`

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
    updateBalance
}

function getAll(payload) {
    console.log('payload --', `${baseUrl}/getAll`, payload)
    return fetchWrapper.post(`${baseUrl}/getAll`, payload)
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`)
}

function create(params) {
    return fetchWrapper.post(baseUrl, params)
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params).then((user) => {
        // update stored user if the logged in user updated their own record
        if (user.id === userSubject.value.id) {
            // publish updated user to subscribers
            user = { ...userSubject.value, ...user }
            userSubject.next(user)
        }
        return user
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
