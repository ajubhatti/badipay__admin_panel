import { FETCH_CONTACTUS, SET_LOADING, SET_PAGE, SET_SEARCH, SET_SIZE_PER_PAGE, SET_SORT_FIELD, SET_SORT_ORDER } from "./actionTypes"

const initialState = {
  loading: false,
  contactUsListData: [],
  page: 1,
  sizePerPage: 25,
  totalSize: 0,
  search: "",
  sortField: "createdAt",
  sortOrder: "DESC",
}

const contactUsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      }

    case FETCH_CONTACTUS:
      return {
        ...state,
        contactUsListData: payload?.data,
        loading: false,
        totalSize: payload?.total || 0,
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

export default contactUsReducer
