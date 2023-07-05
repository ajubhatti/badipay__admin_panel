import {
  FETCH_ALL,
  FETCH_BY_ID,
  SET_PAGE,
  SET_SEARCH,
  SET_SIZE_PER_PAGE,
  SET_LOADING,
  SET_SORT_FIELD,
  SET_SORT_ORDER,
} from "./actionTypes"

const initialState = {
  discountLoading: false,
  discountDetail: {},
  discountList: [],
  page: 1,
  sizePerPage: 25,
  totalSize: 0,
  search: "",
  sortField: "created",
  sortOrder: "DESC",
}

const discountReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        discountLoading: payload,
      }
    case FETCH_ALL:
      return {
        ...state,
        discountList: payload.data || [],
        discountLoading: false,
        totalSize: payload?.total || 0,
      }
    case FETCH_BY_ID:
      return {
        ...state,
        discountDetail: payload,
        discountLoading: false,
      }

    case SET_SIZE_PER_PAGE:
      return {
        ...state,
        sizePerPage: payload,
      }

    case SET_PAGE:
      return {
        ...state,
        page: payload,
      }

    case SET_SEARCH:
      return {
        ...state,
        search: payload,
      }

    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: payload,
      }

    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: payload,
      }

    default:
      return state
  }
}

export default discountReducer
