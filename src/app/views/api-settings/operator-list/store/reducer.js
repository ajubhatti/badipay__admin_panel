import {
  FETCH_OPERATOR,
  FETCH_OPERATOR_ERROR,
  FETCH_OPERATOR_SUCCESS,
  FETCH_OPERATOR_BY_ID,
  SET_LOADING,
} from "./actionTypes"

const initialState = {
  loading: false,
  operatorList: [],
  singleOperator: {},
}

const operatorReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_OPERATOR:
      return {
        ...state,
        loading: true,
      }

    case FETCH_OPERATOR_SUCCESS:
      return {
        ...state,
        operatorList: payload,
        loading: false,
      }
    case FETCH_OPERATOR_ERROR:
      return {
        ...state,
        loading: false,
      }

    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      }

    case FETCH_OPERATOR_BY_ID:
      return {
        ...state,
        singleOperator: payload,
      }

    default:
      return state
  }
}

export default operatorReducer
