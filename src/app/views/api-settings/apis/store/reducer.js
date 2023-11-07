import {
  FETCH_APIS,
  FETCH_API_BY_ID,
  SET_APIS_LOADING,
  FETCH_API_RESPONSES,
} from "./actionTypes"

const initialState = {
  loading: false,
  apisList: [],
  singleApi: {},
  apiResponseList: [],
}

const apisReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_APIS:
      return {
        ...state,
        apisList: payload,
      }

    case SET_APIS_LOADING:
      return {
        ...state,
        loading: payload,
      }

    case FETCH_API_BY_ID:
      return {
        ...state,
        singleApi: payload,
      }

    case FETCH_API_RESPONSES:
      return {
        ...state,
        apiResponseList: payload,
      }

    default:
      return state
  }
}

export default apisReducer
