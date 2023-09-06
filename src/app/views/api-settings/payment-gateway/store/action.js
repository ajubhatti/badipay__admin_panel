import {
  FETCH_PAYMENT_GATEWAY,
  FETCH_PAYMENT_GATEWAY_BY_ID,
  SET_PAYMENT_GATEWAY_LOADING,
} from "./actionTypes"
import { toast } from "react-toastify"
import { paymentGatewayService } from "app/services/paymentGateway.service"

export const getPaymentGatewayById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await paymentGatewayService.getPaymentGatewayById(data).then((res) => {
      dispatch(fetchPaymentGatewayById(res?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const getPaymentGatewayList = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await paymentGatewayService.getAllPaymentGateways().then((res) => {
      dispatch(fetchPaymentGatewayList(res?.data?.data))
      dispatch(setLoading(false))
    })
  } catch (err) {
    toast.error(err?.response?.data?.message || err?.message)
    dispatch(setLoading(false))
  }
}

export const updatePaymentGateways = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await paymentGatewayService.updatePaymentGateway(id, data).then((res) => {
      dispatch(getPaymentGatewayList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const deletePaymentGateways = (id, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await paymentGatewayService.deletePaymentGateway(id).then((res) => {
      dispatch(getPaymentGatewayList())
      cb()
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const createPaymentGateway = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await paymentGatewayService.addPaymentGateway(data).then((res) => {
      dispatch(getPaymentGatewayList())
    })
  } catch (err) {
    dispatch(setLoading(false))
  }
}

export const fetchPaymentGatewayList = (data) => ({
  type: FETCH_PAYMENT_GATEWAY,
  payload: data,
})

export const fetchPaymentGatewayById = (data) => ({
  type: FETCH_PAYMENT_GATEWAY_BY_ID,
  payload: data,
})

export const setLoading = (data) => ({
  type: SET_PAYMENT_GATEWAY_LOADING,
  payload: data,
})
