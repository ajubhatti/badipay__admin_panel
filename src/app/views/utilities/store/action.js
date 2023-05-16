import { bannerService } from "app/services/banner.service"
import { tickerService } from "app/services/ticker.service"
import { utilityService } from "app/services/utility.services"
import { uploadService } from "app/services/upload.service"
import { toast } from "react-toastify"
import {
  FETCH_BANNER,
  FETCH_STATE,
  FETCH_STATE_BY_ID,
  FETCH_TICKER,
  FETCH_TICKER_BY_ID,
  FETCH__BANNER_BY_ID,
  SET_LOADING,
} from "./actionTypes"
import {} from "./actionTypes"

export const uploadImage = (data, cb) => async (dispatch) => {
  try {
    await uploadService.uploadFile(data).then((res) => {
      cb(res)
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
  }
}

export const getStateById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await utilityService.getStateById(data).then((res) => {
      dispatch(fetchStateById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getStateList = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await utilityService.getAllState(data).then((res) => {
      if (res?.data) {
        dispatch(fetchStateList(res?.data))
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const updateStates = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await utilityService.updateState(id, data).then((res) => {
      dispatch(getStateList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createState = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await utilityService.addState(data).then((res) => {
      dispatch(getStateList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getTickerById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await tickerService.getTickerById(data).then((res) => {
      dispatch(fetchTickerById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getTickerList = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await tickerService.getAllTicker(data).then((res) => {
      if (res?.data) {
        dispatch(fetchTickerList(res?.data))
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const updateTicker = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await tickerService.updateTicker(id, data).then((res) => {
      dispatch(getTickerList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createTicker = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await tickerService.addTicker(data).then((res) => {
      dispatch(getTickerList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const removeTicker = (id, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await tickerService.deleteTicker(id).then((res) => {
      dispatch(getTickerList())
      cb()
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const getBannerById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await utilityService.getStateById(data).then((res) => {
      dispatch(fetchBannerById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getBannerList = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await bannerService.getAllBanner().then((res) => {
      if (res?.data) {
        dispatch(fetchBannerList(res?.data))
        dispatch(setLoading(false))
      }
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const updateBanner = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await bannerService.updateBanner(id, data).then((res) => {
      dispatch(getBannerList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createBanner = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await bannerService.addBanner(data).then((res) => {
      dispatch(getBannerList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const removeBanner = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await bannerService.deleteBanner(data._id).then((res) => {
      dispatch(getBannerList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const fetchTickerList = (data) => ({
  type: FETCH_TICKER,
  payload: data,
})

export const fetchTickerById = (data) => ({
  type: FETCH_TICKER_BY_ID,
  payload: data,
})

export const fetchBannerList = (data) => ({
  type: FETCH_BANNER,
  payload: data,
})

export const fetchBannerById = (data) => ({
  type: FETCH__BANNER_BY_ID,
  payload: data,
})

export const fetchStateList = (data) => ({
  type: FETCH_STATE,
  payload: data,
})

export const fetchStateById = (data) => ({
  type: FETCH_STATE_BY_ID,
  payload: data,
})

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
})
