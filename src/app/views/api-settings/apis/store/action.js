import {
  FETCH_APIS,
  FETCH_API_BY_ID,
  SET_APIS_LOADING,
  FETCH_API_RESPONSES,
  FETCH_API_CONFIG,
} from "./actionTypes"
import { toast } from "react-toastify"
import { axiosAdmin } from "app/services/api"
import { GET_APIS, GET_API_CONFIG, GET_API_RESPONSE } from "app/constants/urls"
import { apisService } from "app/services/apis.service"
import { apiConfigService } from "app/services/apiConfig.service"

export const getApiById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await apisService.getApiById(data).then((res) => {
      dispatch(fetchApiById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getApiList = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const res = await axiosAdmin.get(GET_APIS)
    if (res.data?.data) {
      dispatch(fetchApiList(res?.data?.data))
      dispatch(setLoading(false))
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const updateApis = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await apisService.updateApi(id, data).then((res) => {
      dispatch(getApiList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const deleteApis = (id, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await apisService.deleteApi(id).then((res) => {
      dispatch(getApiList())
      cb()
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createApi = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await apisService.addApi(data).then((res) => {
      dispatch(getApiList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getApiResponseList = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const res = await axiosAdmin.get(GET_API_RESPONSE)
    if (res.data?.data) {
      dispatch(fetchApiResponses(res?.data?.data))
      dispatch(setLoading(false))
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getApiConfigList = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const res = await axiosAdmin.get(GET_API_CONFIG)
    if (res.data?.data) {
      dispatch(fetchApiConfigList(res?.data?.data))
      dispatch(setLoading(false))
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const createApiConfig = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await apiConfigService.addApiConfig(data).then((res) => {
      dispatch(getApiConfigList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const updateApiConfig = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await apiConfigService.updateApiConfig(id, data).then((res) => {
      dispatch(getApiConfigList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const fetchApiConfigList = (data) => ({
  type: FETCH_API_CONFIG,
  payload: data,
})

export const fetchApiList = (data) => ({
  type: FETCH_APIS,
  payload: data,
})

export const fetchApiById = (data) => ({
  type: FETCH_API_BY_ID,
  payload: data,
})

export const setLoading = (data) => ({
  type: SET_APIS_LOADING,
  payload: data,
})

export const fetchApiResponses = (data) => ({
  type: FETCH_API_RESPONSES,
  payload: data,
})
