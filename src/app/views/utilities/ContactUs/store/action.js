import { contactUsService } from "app/services/contactUs.service"
import { toast } from "react-toastify"
import {
  FETCH_CONTACTUS,
  SET_LOADING,
  SET_PAGE,
  SET_SEARCH,
  SET_SIZE_PER_PAGE,
  SET_SORT_FIELD,
  SET_SORT_ORDER,
} from "./actionTypes"

export const getContactUsList = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await contactUsService.getContactWithPagination(data).then((res) => {
      if (res?.data) {
        dispatch(fetchContactList(res?.data))
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const updateContactUs = (id, data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await contactUsService.updateContactUs(id, data).then((res) => {
      cb(res?.data)
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createContatUs = (data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await contactUsService.addContactUs(data).then((res) => {
      cb(res?.data)
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const removeContactUs = (id, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await contactUsService.deleteContactUs(id).then((res) => {
      cb(res?.data)
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
})

export const fetchContactList = (data) => ({
  type: FETCH_CONTACTUS,
  payload: data,
})

// ================== new =====================
export const setPageContactUs = (data) => ({
  type: SET_PAGE,
  payload: data,
})

export const setSizePerPageContactUs = (data) => ({
  type: SET_SIZE_PER_PAGE,
  payload: data,
})

export const setSearchContactUs = (data) => ({
  type: SET_SEARCH,
  payload: data,
})

export const setSortFieldOfContactUs = (data) => ({
  type: SET_SORT_FIELD,
  payload: data,
})

export const setSortOrderOfContactUs = (data) => ({
  type: SET_SORT_ORDER,
  payload: data,
})
