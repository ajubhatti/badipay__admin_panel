import Cookies from "app/helpers/cookies"
import { axiosAdmin } from "app/services/api"
import { toast } from "react-toastify"

export const LOGIN_LOADING = "LOGIN_LOADING"
export const LOGIN = "LOGIN"
export const IS_AUTH = "IS_AUTH"

export const handleLogin = (data, cb) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_LOADING, payload: true })
        const payload = {
            mobileNo: data.ph_number,
            password: data.password,
        }
        const res = await axiosAdmin.post("/auth/adminLogin", payload)
        if (!!res) {
            dispatch({ type: LOGIN, payload: res.data.data })
            dispatch({ type: IS_AUTH, payload: true })
            Cookies.set("token", res.data.data.token)
            cb(res.data.data)
        }
        dispatch({ type: LOGIN_LOADING, payload: false })
    } catch (err) {
        dispatch({ type: LOGIN_LOADING, payload: false })
        toast.error(err?.response?.data?.message)
    }
}
