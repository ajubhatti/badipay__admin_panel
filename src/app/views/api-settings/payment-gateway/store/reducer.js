import {
  FETCH_PAYMENT_GATEWAY,
  FETCH_PAYMENT_GATEWAY_BY_ID,
  SET_PAYMENT_GATEWAY_LOADING,
} from "./actionTypes"

const initialState = {
  loading: false,
  paymentGateWayList: [],
  singlePaymentGateway: {},
}

const paymentGateWayReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_PAYMENT_GATEWAY:
      return {
        ...state,
        paymentGateWayList: payload,
      }

    case SET_PAYMENT_GATEWAY_LOADING:
      return {
        ...state,
        loading: payload,
      }

    case FETCH_PAYMENT_GATEWAY_BY_ID:
      return {
        ...state,
        singlePaymentGateway: payload,
      }

    default:
      return state
  }
}

export default paymentGateWayReducer
