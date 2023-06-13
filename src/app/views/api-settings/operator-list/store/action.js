import {
  FETCH_OPERATOR,
  FETCH_OPERATOR_ERROR,
  FETCH_OPERATOR_SUCCESS,
  FETCH_OPERATOR_BY_ID,
  SET_LOADING,
} from "./actionTypes"
import { toast } from "react-toastify"
import { axiosAdmin } from "app/services/api"
import { GET_OPERATOR_BY_ID } from "app/constants/urls"
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
    await operatorService.getAllOperator(data).then((res) => {
      console.log({ res })
      dispatch(fetchOperatorSuccess(res.data.data))
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
