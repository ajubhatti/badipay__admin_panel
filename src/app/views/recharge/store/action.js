import { rechargesService } from "app/services/recharge.service"
import { rechargeComplaintService } from "app/services/rechargeComplaint.service"
import { transactionsService } from "app/services/transactions.service"
import { toast } from "react-toastify"
import {
  FETCH_RECHARGES,
  FETCH_RECHARGES_BY_ID,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_BY_ID,
  RESET_DATA,
  SET_PAGE_TRANSACTIONS,
  SET_RECHARGE_LOADING,
  SET_SEARCH_TRANSACTIONS,
  SET_SIZE_PER_PAGE_TRANSACTIONS,
  SET_SORT_FIELD_TRANSACTIONS,
  SET_SORT_ORDER_TRANSACTIONS,
} from "./actionTypes"

export const getRechargeById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await rechargesService.getRechargeById(data).then((res) => {
      dispatch(fetchRechargeById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getAllRechargeList = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await rechargesService.getAllRecharge(data).then((res) => {
      if (res?.data) {
        // dispatch(fetchRechargeList(res?.data))
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getRechargeList = (data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await rechargesService.getRecharges(data).then((res) => {
      if (res?.data) {
        dispatch(fetchRechargeList(res?.data))
        dispatch(setLoading(false))
        cb(res?.data)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const rechargeComplaints = (data, cb) => async (dispatch) => {
  try {
    await rechargeComplaintService
      .createRechargeComplaints(data)
      .then((res) => {
        if (res?.data) {
          cb(res)
        }
      })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getRechargeListForPrint = (data, cb) => async (dispatch) => {
  try {
    await rechargesService.getRecharges(data).then((res) => {
      if (res?.data) {
        cb(res?.data)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const updateRecharge = (id, data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await rechargesService.updateRechargeById(id, data).then((res) => {
      // dispatch(getRechargeList())
      if (res?.data) {
        cb(res.data)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const updateComplaints = (data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await rechargeComplaintService.updateComplaintsStatus(data).then((res) => {
      // dispatch(getRechargeList())
      if (res?.data) {
        cb(res.data)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createRecharge = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await rechargesService.addRecharge(data).then((res) => {
      dispatch(getRechargeList())
    })
  } catch (err) {
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

export const updateTransactions = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    return await transactionsService.updateTransaction(id, data).then((res) => {
      return res
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createTransactions = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await transactionsService.addTransaction(data).then((res) => {
      dispatch(getTransactionsList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const setLoading = (data) => ({
  type: SET_RECHARGE_LOADING,
  payload: data,
})

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

// ================== new =====================
export const setPageTransactions = (data) => ({
  type: SET_PAGE_TRANSACTIONS,
  payload: data,
})

export const setSizePerPageTransactions = (data) => ({
  type: SET_SIZE_PER_PAGE_TRANSACTIONS,
  payload: data,
})

export const setSearchTransactions = (data) => ({
  type: SET_SEARCH_TRANSACTIONS,
  payload: data,
})

export const setSortFieldOfTransactions = (data) => ({
  type: SET_SORT_FIELD_TRANSACTIONS,
  payload: data,
})

export const setSortOrderOfTransactions = (data) => ({
  type: SET_SORT_ORDER_TRANSACTIONS,
  payload: data,
})

export const setResetData = () => ({
  type: RESET_DATA,
})
