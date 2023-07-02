import { accountService } from "app/services/account.service"
import { toast } from "react-toastify"
import {
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
    await accountService.getById(data).then((res) => {
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
    await accountService.getAll(data).then((res) => {
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
    await accountService.getAll(data).then((res) => {
      if (res?.data) {
        dispatch(fetchUserList(res?.data))
        dispatch(setLoading(false))
        cb(res?.data)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getUserListForPrint = (data, cb) => async (dispatch) => {
  try {
    await accountService.getAll(data).then((res) => {
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
    await accountService.createUser(data).then((res) => {
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

export const fetchUserList = (data) => ({
  type: FETCH_USERS,
  payload: data,
})

export const fetchUserById = (data) => ({
  type: FETCH_USERS_BY_ID,
  payload: data,
})

// ================== new =====================
export const setPageUsers = (data) => ({
  type: SET_PAGE_USERS,
  payload: data,
})

export const setSizePerPageUsers = (data) => ({
  type: SET_SIZE_PER_PAGE_USERS,
  payload: data,
})

export const setSearchUsers = (data) => ({
  type: SET_SEARCH_USERS,
  payload: data,
})

export const setSortFieldOfUsers = (data) => ({
  type: SET_SORT_FIELD_USERS,
  payload: data,
})

export const setSortOrderOfUsers = (data) => ({
  type: SET_SORT_ORDER_USERS,
  payload: data,
})
