import { walletServices } from "app/services/wallet.service"
import { toast } from "react-toastify"

import {
  SET_WALLET_LIST,
  FETCH_WALLETS,
  FETCH_WALLET_BY_ID,
  SET_PAGE_WALLET,
  WALLET_LOADING,
  SET_SEARCH_WALLET,
  SET_SIZE_PER_PAGE_WALLET,
  SET_SORT_FIELD_WALLET,
  SET_SORT_ORDER_WALLET,
} from "./actionType"

export const fetchWalletListing = (data) => async (dispatch) => {
  try {
    dispatch(setWalletLoading(true))
    const res = await walletServices.getAll(data)

    if (res.data) {
      dispatch(setWalletRequestList(res?.data?.wallets))
    }
    dispatch(setWalletLoading(false))
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    return err
  }
}

export const setWalletLoading = (data) => ({
  type: WALLET_LOADING,
  payload: data,
})

export const setWalletRequestList = (data) => ({
  type: SET_WALLET_LIST,
  payload: data,
})
// ===============================================================================================

export const getWalletList = (data, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await walletServices.getWallet(data).then((res) => {
      if (res?.data) {
        dispatch(fetchWalletList(res?.data))
        cb(res?.data)
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getWalletReport = (data, cb) => async (dispatch) => {
  try {
    await walletServices.getAllWalletReport(data).then((res) => {
      if (res?.data) {
        cb(res?.data)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getAllWalletReport = (data, cb) => async (dispatch) => {
  try {
    await walletServices.getWallet(data).then((res) => {
      if (res?.data) {
        cb(res?.data)
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getWalletById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await walletServices.getById(data).then((res) => {
      if (res?.data) {
        dispatch(fetchWalletkById(res?.data))
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const updateWallets = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    return await walletServices.update(id, data).then((res) => {
      return res
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createWallet = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await walletServices.create(data).then((res) => {
      dispatch(getWalletList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const setLoading = (data) => ({
  type: WALLET_LOADING,
  payload: data,
})

export const fetchWalletList = (data) => ({
  type: FETCH_WALLETS,
  payload: data,
})

export const fetchWalletkById = (data) => ({
  type: FETCH_WALLET_BY_ID,
  payload: data,
})

// ================== new =====================
export const setPageWallet = (data) => ({
  type: SET_PAGE_WALLET,
  payload: data,
})

export const setSizePerPageWallet = (data) => ({
  type: SET_SIZE_PER_PAGE_WALLET,
  payload: data,
})

export const setSearchWallet = (data) => ({
  type: SET_SEARCH_WALLET,
  payload: data,
})

export const setSortFieldOfWallet = (data) => ({
  type: SET_SORT_FIELD_WALLET,
  payload: data,
})

export const setSortOrderOfWallet = (data) => ({
  type: SET_SORT_ORDER_WALLET,
  payload: data,
})
