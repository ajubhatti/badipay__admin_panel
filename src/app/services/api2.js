import axios from "axios"

import urls from "constants/urls"
import Cookies, { cookiesKeys } from "./cookies"
import store from "store"
import { logout } from "store/auth/actions"

// TODO: check this before deploy
const API_URL_ACCOUNT = `${process.env.REACT_APP_API_ACCOUNT_URL}/api/v1`

// const API_URL_BOARD = `http://192.168.1.153:8081/api/v1`;

const AllowedRoutes = [urls.EDIT_BOARD_DETAILS, urls.PREVIEW_BOARD_DATA]

class Axios {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
    })

    this.axios.interceptors.request.use(this._requestMiddleware)

    this.axios.interceptors.response.use(
      this._responseMiddleware,
      this._responseErr
    )
  }

  _requestMiddleware = (req) => {
    const token = Cookies.get(cookiesKeys.TOKEN)
    if (!!token)
      req.headers.authorization = token.startsWith("Bearer ")
        ? token
        : "Bearer " + token
    return req
  }

  _responseMiddleware = (response) => {
    if (response?.data?.data?.token) {
      Cookies.set(cookiesKeys.TOKEN, response.data.data.token)
    }
    return response
  }

  _responseErr = (error) => {
    if (
      AllowedRoutes.some((route) =>
        RegExp(`${route}`, "gi").test(error.request.responseURL)
      ) &&
      error?.response?.status === 401
    )
      return Promise.reject(error)
    else if (error?.response?.status === 401) {
      Cookies.clear()
      store.dispatch(logout())
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
}

const axiosAccount = new Axios(API_URL_ACCOUNT).axios

export { axiosAccount }
