import {
  FETCH_BANNER,
  FETCH_TICKER,
  FETCH_TICKER_BY_ID,
  FETCH__BANNER_BY_ID,
  SET_LOADING,
  FETCH_STATE,
} from "./actionTypes"

const initialState = {
  loading: false,
  tickerListData: [],
  tickerInfoData: {},
  bannerListData: [],
  bannerInfoData: {},

  stateList: [],
}

const utilityReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      }
    case FETCH_STATE:
      return {
        ...state,
        stateList: payload,
      }

    case FETCH_TICKER:
      return {
        ...state,
        tickerListData: payload,
      }

    case FETCH_TICKER_BY_ID:
      return {
        ...state,
        tickerInfoData: payload,
      }

    case FETCH_BANNER:
      return {
        ...state,
        bannerListData: payload,
      }

    case FETCH__BANNER_BY_ID:
      return {
        ...state,
        bannerInfoData: payload,
      }

    default:
      return state
  }
}

export default utilityReducer
