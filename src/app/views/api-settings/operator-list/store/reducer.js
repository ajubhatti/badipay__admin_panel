import {
  FETCH_OPERATOR,
  FETCH_OPERATOR_ERROR,
  FETCH_OPERATOR_SUCCESS,
  FETCH_OPERATOR_BY_ID,
  SET_LOADING,
  SET_SIZE_PER_PAGE_OPERATOR,
  SET_PAGE_OPERATOR,
  SET_SEARCH_OPERATOR,
  SET_SORT_FIELD_OPERATOR,
  SET_SORT_ORDER_OPERATOR,
} from "./actionTypes"

const initialState = {
  loading: false,
  operatorList: [],
  singleOperator: {},
  page: 1,
  sizePerPage: 25,
  totalSize: 0,
  search: "",
  sortField: "created",
  sortOrder: "DESC",
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
        operatorList: payload?.data,
        loading: false,
        totalSize: payload?.total || 0,
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

    //  ===================== new ============================

    case SET_SIZE_PER_PAGE_OPERATOR:
      return {
        ...state,
        sizePerPage: payload,
      }

    case SET_PAGE_OPERATOR:
      return {
        ...state,
        page: payload,
      }

    case SET_SEARCH_OPERATOR:
      return {
        ...state,
        search: payload,
      }

    case SET_SORT_FIELD_OPERATOR:
      return {
        ...state,
        sortField: payload,
      }

    case SET_SORT_ORDER_OPERATOR:
      return {
        ...state,
        sortOrder: payload,
      }

    default:
      return state
  }
}

export default operatorReducer
