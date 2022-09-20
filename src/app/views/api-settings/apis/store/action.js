import { FETCH_APIS, SET_APIS_LOADING } from './actionTypes'
// import { toast } from 'react-toastify'
import { axiosAdmin } from 'app/services/api'
import { GET_APIS } from 'app/constants/urls'

export const getApiById = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const res = await axiosAdmin.get(GET_APIS)

        // if (res.data?.data?.orderDetails) {
        //     // dispatch(setOrder(res.data.data.orderDetails))
        //     dispatch(setLoading(false))
        // }
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const getApiList = (data) => async (dispatch) => {
    try {
        console.log('data :>> ', data)
        dispatch(setLoading(true))
        const res = await axiosAdmin.get(GET_APIS)
        console.log('res :>> ', res)
        if (res.data?.data?.data) {
            dispatch(setApisList(res?.data?.data?.data))
            dispatch(setLoading(false))
        }
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const setApisList = (data) => ({
    type: FETCH_APIS,
    payload: data,
})

export const setLoading = (data) => ({
    type: SET_APIS_LOADING,
    payload: data,
})
