import {
  FETCH_OPERATOR,
  FETCH_OPERATOR_ERROR,
  FETCH_OPERATOR_SUCCESS,
  FETCH_OPERATOR_BY_ID,
  SET_LOADING,
  SET_PAGE_OPERATOR,
  SET_SIZE_PER_PAGE_OPERATOR,
  SET_SEARCH_OPERATOR,
  SET_SORT_FIELD_OPERATOR,
  SET_SORT_ORDER_OPERATOR,
} from "./actionTypes"
import { toast } from "react-toastify"
import { operatorService } from "app/services/operator.service"

export const getOperatorById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))

    return await operatorService.getOperatorById(data).then((res) => {
      dispatch(fetchOpertorById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getAllOperators = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await operatorService.getAllOperatorWithPagination(data).then((res) => {
      dispatch(fetchOperatorSuccess(res.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const editOperator = (id, data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await operatorService.updateOperator(id, data).then((res) => {
      cb()
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createOperator = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await operatorService.addOperator(data).then((res) => {
      dispatch(getAllOperators())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const deleteOperator = (id, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await operatorService.deleteOperator(id).then((res) => {
      dispatch(getAllOperators())
      cb()
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const fetchOperator = (data) => ({
  type: FETCH_OPERATOR,
  payload: data,
})

export const fetchOpertorById = (data) => ({
  type: FETCH_OPERATOR_BY_ID,
  payload: data,
})

export const fetchOperatorSuccess = (data) => ({
  type: FETCH_OPERATOR_SUCCESS,
  payload: data,
})

export const fetchOperatorError = (data) => ({
  type: FETCH_OPERATOR_ERROR,
  payload: data,
})

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
})

// ================== new =====================
export const setPageOperator = (data) => ({
  type: SET_PAGE_OPERATOR,
  payload: data,
})

export const setSizePerPageOperator = (data) => ({
  type: SET_SIZE_PER_PAGE_OPERATOR,
  payload: data,
})

export const setSearchOperator = (data) => ({
  type: SET_SEARCH_OPERATOR,
  payload: data,
})

export const setSortFieldOfOperator = (data) => ({
  type: SET_SORT_FIELD_OPERATOR,
  payload: data,
})

export const setSortOrderOfOperator = (data) => ({
  type: SET_SORT_ORDER_OPERATOR,
  payload: data,
})
