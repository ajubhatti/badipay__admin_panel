import {
    FETCH_COMPANIES,
    FETCH_COMPANIES_ERROR,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANY_BY_ID,
    SET_LOADING,
} from './actionTypes'
// import { toast } from 'react-toastify'
import { axiosAdmin } from 'app/services/api'
import { GET_COMPANY_BY_ID } from 'app/constants/urls'
import { companyService } from 'app/services/company.service'

export const getCompaniesById = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        // const res = await axiosAdmin.get(GET_COMPANY_BY_ID)

        return await companyService.getCompanyById(data).then((res) => {
            dispatch(fetchCompanyById(res?.data))
            dispatch(setLoading(false))
        })
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const getCompanies = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const res = await axiosAdmin.get(GET_COMPANY_BY_ID)
        if (res.data?.data?.data) {
            dispatch(fetchCompanySuccess(res.data.data.data))
            dispatch(setLoading(false))
        }
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const editCompany = (id, data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await companyService.updateCompany(id, data).then((res) => {
            dispatch(getCompanies())
        })
    } catch (err) {
        dispatch(setLoading(false))
    }
}

export const createCompany = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await companyService.addCompany(data).then((res) => {
            dispatch(getCompanies())
        })
    } catch (err) {
        dispatch(setLoading(false))
    }
}

export const fetchCompany = (data) => ({
    type: FETCH_COMPANIES,
    payload: data,
})

export const fetchCompanyById = (data) => ({
    type: FETCH_COMPANY_BY_ID,
    payload: data,
})

export const fetchCompanySuccess = (data) => ({
    type: FETCH_COMPANIES_SUCCESS,
    payload: data,
})

export const fetchCompanyError = (data) => ({
    type: FETCH_COMPANIES_ERROR,
    payload: data,
})

export const setLoading = (data) => ({
    type: SET_LOADING,
    payload: data,
})
