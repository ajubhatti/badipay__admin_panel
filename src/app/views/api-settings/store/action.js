import {
    FETCH_COMPANIES,
    FETCH_COMPANIES_ERROR,
    FETCH_COMPANIES_SUCCESS,
    SET_COMPANY_LOADING,
} from './actionTypes'
// import { toast } from 'react-toastify'
import { axiosAdmin } from 'app/services/api'
import { GET_COMPANY_BY_ID } from 'app/constants/urls'

export const getCompanyById = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const res = await axiosAdmin.get(GET_COMPANY_BY_ID)

        // if (res.data?.data?.orderDetails) {
        //     // dispatch(setOrder(res.data.data.orderDetails))
        //     dispatch(setLoading(false))
        // }
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const getCompanies = (data) => async (dispatch) => {
    try {
        console.log('data :>> ', data)
        dispatch(setLoading(true))
        const res = await axiosAdmin.get(GET_COMPANY_BY_ID)
        console.log('res :>> ', res)
        if (res.data?.data?.data) {
            dispatch(fetchCompanySuccess(res.data.data.data))
            dispatch(setLoading(false))
        }
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const fetchCompany = (data) => {
    return {
        type: FETCH_COMPANIES,
        payload: data,
    }
}

export const fetchCompanySuccess = (data) => {
    return {
        type: FETCH_COMPANIES_SUCCESS,
        payload: data,
    }
}

export const fetchCompanyError = (data) => {
    return {
        type: FETCH_COMPANIES_ERROR,
        payload: data,
    }
}

export const setLoading = (data) => {
    return {
        type: SET_COMPANY_LOADING,
        payload: data,
    }
}
