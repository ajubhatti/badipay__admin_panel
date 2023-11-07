import { cashBackService } from "app/services/cashback.service"
import {
  FETCH_CASHBACKS,
  FETCH_CASHBACK_BY_ID,
  SET_PAGE_CASHBACK,
  SET_LOADING,
  SET_SEARCH_CASHBACK,
  SET_SIZE_PER_PAGE_CASHBACK,
  SET_SORT_FIELD_CASHBACK,
  SET_SORT_ORDER_CASHBACK,
} from "./actionTypes"

export const getCashBackList = (data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await cashBackService.getAllCashBacks(data).then((res) => {
      if (res?.data) {
        dispatch(fetchCashBackList(res?.data))
        cb(res?.data)
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getCashBackReport = (data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await cashBackService.getAllCashBacksReport(data).then((res) => {
      if (res?.data) {
        cb(res?.data)
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getCashBackById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await cashBackService.getCashBackById(data).then((res) => {
      if (res?.data) {
        dispatch(fetchCashBackById(res?.data))
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const updateCashBacks = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    return await cashBackService.updateCashBack(id, data).then((res) => {
      return res
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createCashBack = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await cashBackService.addCashBack(data).then((res) => {
      dispatch(getCashBackList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
})

export const fetchCashBackList = (data) => ({
  type: FETCH_CASHBACKS,
  payload: data,
})

export const fetchCashBackById = (data) => ({
  type: FETCH_CASHBACK_BY_ID,
  payload: data,
})

// ================== new =====================
export const setPageCashBack = (data) => ({
  type: SET_PAGE_CASHBACK,
  payload: data,
})

export const setSizePerPageCashBack = (data) => ({
  type: SET_SIZE_PER_PAGE_CASHBACK,
  payload: data,
})

export const setSearchCashBack = (data) => ({
  type: SET_SEARCH_CASHBACK,
  payload: data,
})

export const setSortFieldOfCashBack = (data) => ({
  type: SET_SORT_FIELD_CASHBACK,
  payload: data,
})

export const setSortOrderOfCashBack = (data) => ({
  type: SET_SORT_ORDER_CASHBACK,
  payload: data,
})
