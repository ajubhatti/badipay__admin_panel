import { accountService } from "app/services/recharge.service"
import { toast } from "react-toastify"
import {
  FETCH_RECHARGES,
  FETCH_RECHARGES_BY_ID,
  FETCH_USERS,
  FETCH_USERS_BY_ID,
  SET_PAGE_USERS,
  SET_LOADING,
  SET_SEARCH_USERS,
  SET_SIZE_PER_PAGE_USERS,
  SET_SORT_FIELD_USERS,
  SET_SORT_ORDER_USERS,
} from "./actionTypes"

export const getUserById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await accountService.getUserById(data).then((res) => {
      dispatch(fetchUserById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getAllUsersList = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await accountService.getAllUsers(data).then((res) => {
      if (res?.data) {
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getUserList = (data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await accountService.getUsers(data).then((res) => {
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

export const getRechargeListForPrint = (data, cb) => async (dispatch) => {
  try {
    await accountService.getRecharges(data).then((res) => {
      if (res?.data) {
        cb(res?.data)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const updateUser = (id, data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await accountService.updateUserById(id, data).then((res) => {
      // dispatch(getRechargeList())
      if (res?.data) {
        cb(res.data)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createUser = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await accountService.addRecharge(data).then((res) => {
      dispatch(getUserList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
})

export const fetchRechargeList = (data) => ({
  type: FETCH_RECHARGES,
  payload: data,
})

export const fetchUserById = (data) => ({
  type: FETCH_RECHARGES_BY_ID,
  payload: data,
})

export const fetchTransactionList = (data) => ({
  type: FETCH_USERS,
  payload: data,
})

export const fetchTransactionById = (data) => ({
  type: FETCH_USERS_BY_ID,
  payload: data,
})

// ================== new =====================
export const setPageTransactions = (data) => ({
  type: SET_PAGE_USERS,
  payload: data,
})

export const setSizePerPageTransactions = (data) => ({
  type: SET_SIZE_PER_PAGE_USERS,
  payload: data,
})

export const setSearchTransactions = (data) => ({
  type: SET_SEARCH_USERS,
  payload: data,
})

export const setSortFieldOfTransactions = (data) => ({
  type: SET_SORT_FIELD_USERS,
  payload: data,
})

export const setSortOrderOfTransactions = (data) => ({
  type: SET_SORT_ORDER_USERS,
  payload: data,
})
