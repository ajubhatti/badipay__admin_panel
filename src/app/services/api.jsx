import axios from "axios"

import store from "store"
// import { setToken, logout, resetReduxState } from 'store/actions'

import Cookies from "app/helpers/cookies"
import { LOGOUT } from "app/constants/urls"

const API_URL = `${process.env.REACT_APP_BASE_URL}`

const axiosAdmin = axios.create({
  baseURL: API_URL,
})

const notAllowedRequests = [LOGOUT]

const requestMiddleware = (req) => {
  if (!notAllowedRequests.includes(req.url)) {
    const token = Cookies.get("token")
    if (!!token)
      req.headers.authorization = token.startsWith("Bearer ")
        ? token
        : "Bearer " + token
  }
  return req
}

const responseMiddleware = (response) => {
  if (response?.data?.data?.token) {
    Cookies.set("token", response.data.data.token)
    // store.dispatch(setToken(response.data.data.token))
  }
  return response
}

const responseErr = (error) => {
  if (error?.response?.status === 401) {
    // store.dispatch(resetReduxState())
    Cookies.clear()
    // store.dispatch(logout())
  } else {
    return Promise.reject(error)
  }
}

axiosAdmin.interceptors.request.use(requestMiddleware)

axiosAdmin.interceptors.response.use(responseMiddleware, responseErr)

export { axiosAdmin }
