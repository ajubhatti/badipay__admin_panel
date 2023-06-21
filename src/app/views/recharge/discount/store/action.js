import {
  FETCH_ALL,
  FETCH_BY_ID,
  SET_PAGE,
  SET_SEARCH,
  SET_SIZE_PER_PAGE,
  SET_LOADING,
  SET_SORT_FIELD,
  SET_SORT_ORDER,
} from "./actionTypes"

import { toast } from "react-toastify"
import { discountServices } from "app/services/discount.service"

export const getDiscountById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await discountServices.getDiscountByIdNew(data).then((res) => {
      dispatch(fetchDiscountById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getDiscountList = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await discountServices.getAllDiscountNew(payload).then((res) => {
      dispatch(fetchAllDiscount(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const editDiscount = (id, data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await discountServices.updateDiscountNew(id, data).then((res) => {
      if (res.status === 200) {
        cb(res)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createDiscount = (payload, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await discountServices.addDiscountNew(payload).then((res) => {
      if (res?.status === 200) {
        cb(res?.data)
      } else {
        toast.error(res?.message)
      }
    })
  } catch (err) {
    toast.error(err)
    dispatch(setLoading(false))
  }
}

export const deleteDiscontById = (id, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await discountServices.deleteDiscountNew(id).then((res) => {
      cb(res)
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
})

export const fetchAllDiscount = (data) => ({
  type: FETCH_ALL,
  payload: data,
})

export const fetchDiscountById = (data) => ({
  type: FETCH_BY_ID,
  payload: data,
})

export const setPageDiscount = (data) => ({
  type: SET_PAGE,
  payload: data,
})

export const setSizePerPageDiscount = (data) => ({
  type: SET_SIZE_PER_PAGE,
  payload: data,
})

export const setSearchDiscount = (data) => ({
  type: SET_SEARCH,
  payload: data,
})

export const setSortFieldOfDiscount = (data) => ({
  type: SET_SORT_FIELD,
  payload: data,
})

export const setSortOrderOfDiscount = (data) => ({
  type: SET_SORT_ORDER,
  payload: data,
})
