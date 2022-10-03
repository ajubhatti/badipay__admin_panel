import { rechargesService } from 'app/services/recharge.service'
import {
    FETCH_RECHARGES,
    FETCH_RECHARGES_BY_ID,
    SET_RECHARGE_LOADING,
} from './actionTypes'

export const getRechargeById = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await rechargesService.getRechargeById(data).then((res) => {
            dispatch(fetchRechargeById(res?.data))
            dispatch(setLoading(false))
        })
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const getRechargeList = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await rechargesService.getAllRecharge(data).then((res) => {
            if (res?.data) {
                dispatch(fetchRechargeList(res?.data))
                dispatch(setLoading(false))
            }
        })
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const updateApis = (id, data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await rechargesService.updateApi(id, data).then((res) => {
            dispatch(getRechargeList())
        })
    } catch (err) {
        dispatch(setLoading(false))
    }
}

export const createApi = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await rechargesService.addApi(data).then((res) => {
            dispatch(getRechargeList())
        })
    } catch (err) {
        dispatch(setLoading(false))
    }
}

export const fetchRechargeList = (data) => ({
    type: FETCH_RECHARGES,
    payload: data,
})

export const fetchRechargeById = (data) => ({
    type: FETCH_RECHARGES_BY_ID,
    payload: data,
})

export const setLoading = (data) => ({
    type: SET_RECHARGE_LOADING,
    payload: data,
})
