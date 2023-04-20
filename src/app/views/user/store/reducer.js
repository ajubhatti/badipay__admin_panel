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

const initialState = {
  loading: false,
  userList: [],
  userDetail: {},

  page: 1,
  sizePerPage: 25,
  totalSize: 0,
  search: "",
  sortField: "created",
  sortOrder: "DESC",
}

const accountReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      }

    case FETCH_USERS:
      return {
        ...state,
        userList: payload.data,
        loading: false,
        totalSize: payload?.total || 0,
      }

    case FETCH_USERS_BY_ID:
      return {
        ...state,
        userDetail: payload,
        loading: false,
      }

    //  ===================== new ============================

    case SET_SIZE_PER_PAGE_USERS:
      return {
        ...state,
        sizePerPage: payload,
      }

    case SET_PAGE_USERS:
      return {
        ...state,
        page: payload,
      }

    case SET_SEARCH_USERS:
      return {
        ...state,
        search: payload,
      }

    case SET_SORT_FIELD_USERS:
      return {
        ...state,
        sortField: payload,
      }

    case SET_SORT_ORDER_USERS:
      return {
        ...state,
        sortOrder: payload,
      }

    default:
      return state
  }
}

export default accountReducer
