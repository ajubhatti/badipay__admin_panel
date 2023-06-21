import {
  FETCH_ALL_OPERATOR_CONFIG,
  FETCH_BY_ID,
  SET_PAGE,
  SET_SEARCH,
  SET_SIZE_PER_PAGE,
  SET_LOADING,
  SET_SORT_FIELD,
  SET_SORT_ORDER,
} from "./actionTypes"
import { toast } from "react-toastify"
import { operatorConfigService } from "app/services/operatorConfig.services"

export const getSPSlabById = (data) => async (dispatch) => {
  try {
    dispatch(setSlabLoading(true))
    await operatorConfigService.getOperatorConfigById(data).then((res) => {
      dispatch(fetchSPSlabById(res?.data))
      dispatch(setSlabLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setSlabLoading(false))
  }
}

export const getOperatorConfigList = (payload) => async (dispatch) => {
  try {
    dispatch(setSlabLoading(true))
    await operatorConfigService
      .getOperatorConfigWithPagination(payload)
      .then((res) => {
        dispatch(fetchAllSPSlabs(res?.data))
        dispatch(setSlabLoading(false))
      })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setSlabLoading(false))
  }
}

export const editOperatorConfig = (id, data, cb) => async (dispatch) => {
  try {
    dispatch(setSlabLoading(true))
    await operatorConfigService.updateOperatorConfig(id, data).then((res) => {
      if (res.status === 200) {
        cb(res)
      }
    })
  } catch (err) {
    dispatch(setSlabLoading(false))
  }
}

export const addByScan = (cb) => async (dispatch) => {
  try {
    dispatch(setSlabLoading(true))
    await operatorConfigService.scanAndAdd().then((res) => {
      if (res.status === 200) {
        cb(res)
      }
    })
  } catch (err) {
    dispatch(setSlabLoading(false))
  }
}

export const createSlab = (payload, cb) => async (dispatch) => {
  try {
    dispatch(setSlabLoading(true))
    await operatorConfigService.addOperatorConfig(payload).then((res) => {
      if (res?.status === 200) {
        cb(res?.data)
      } else {
        toast.error(res?.message)
      }
    })
  } catch (err) {
    toast.error(err)
    dispatch(setSlabLoading(false))
  }
}

export const deleteSlabById = (id, cb) => async (dispatch) => {
  try {
    dispatch(setSlabLoading(true))
    await operatorConfigService.deleteOperatorConfig(id).then((res) => {
      cb(res)
    })
  } catch (err) {
    dispatch(setSlabLoading(false))
  }
}

export const setSlabLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
})

export const fetchAllSPSlabs = (data) => ({
  type: FETCH_ALL_OPERATOR_CONFIG,
  payload: data,
})

export const fetchSPSlabById = (data) => ({
  type: FETCH_BY_ID,
  payload: data,
})

export const setPageSlab = (data) => ({
  type: SET_PAGE,
  payload: data,
})

export const setSizePerPageSlab = (data) => ({
  type: SET_SIZE_PER_PAGE,
  payload: data,
})

export const setSearchSlab = (data) => ({
  type: SET_SEARCH,
  payload: data,
})

export const setSortFieldOfSlab = (data) => ({
  type: SET_SORT_FIELD,
  payload: data,
})

export const setSortOrderOfSlab = (data) => ({
  type: SET_SORT_ORDER,
  payload: data,
})
