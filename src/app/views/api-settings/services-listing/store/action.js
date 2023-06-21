import { FETCH_SERVICES, FETCH_SERVICE_BY_ID, SET_LOADING } from "./actionTypes"
import { toast } from "react-toastify"
import { servicesService } from "app/services/services.service"

export const getServicesById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await servicesService.getServiceById(data).then((res) => {
      dispatch(fetchServiceById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getServices = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await servicesService.getAllService().then((res) => {
      dispatch(fetchServices(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const editService = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await servicesService.updateService(id, data).then((res) => {
      dispatch(getServices())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createService = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await servicesService.addService(data).then((res) => {
      dispatch(getServices())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const deleteService = (data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await servicesService.deleteService(data).then((res) => {
      dispatch(getServices())
      cb()
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const fetchServices = (data) => ({
  type: FETCH_SERVICES,
  payload: data,
})

export const fetchServiceById = (data) => ({
  type: FETCH_SERVICE_BY_ID,
  payload: data,
})

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
})
