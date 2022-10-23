import { rechargesService } from 'app/services/recharge.service'
import { transactionsService } from 'app/services/transactions.service'
import {
    FETCH_RECHARGES,
    FETCH_RECHARGES_BY_ID,
    FETCH_TRANSACTIONS,
    FETCH_TRANSACTIONS_BY_ID,
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

export const getTransactionsList = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await transactionsService.getAllTransactions(data).then((res) => {
            if (res?.data) {
                dispatch(fetchTransactionList(res?.data))
                dispatch(setLoading(false))
            }
        })
    } catch (err) {
        dispatch(setLoading(false))
    }
}

export const getTransactionsById = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await transactionsService.getTransactionById(data).then((res) => {
            if (res?.data) {
                dispatch(fetchTransactionById(res?.data))
                dispatch(setLoading(false))
            }
        })
    } catch (err) {
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

export const fetchTransactionList = (data) => ({
    type: FETCH_TRANSACTIONS,
    payload: data,
})

export const fetchTransactionById = (data) => ({
    type: FETCH_TRANSACTIONS_BY_ID,
    payload: data,
})

export const setLoading = (data) => ({
    type: SET_RECHARGE_LOADING,
    payload: data,
})
