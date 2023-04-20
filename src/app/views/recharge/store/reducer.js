import {
  FETCH_RECHARGES,
  FETCH_RECHARGES_BY_ID,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_BY_ID,
  SET_PAGE_TRANSACTIONS,
  SET_RECHARGE_LOADING,
  SET_SEARCH_TRANSACTIONS,
  SET_SIZE_PER_PAGE_TRANSACTIONS,
  SET_SORT_FIELD_TRANSACTIONS,
  SET_SORT_ORDER_TRANSACTIONS,
} from "./actionTypes"

const initialState = {
  loading: false,
  transactionData: [],
  transactionList: [],
  transactionDetail: {},

  rechargesData: [],
  rechargeList: [],
  rechargesDetail: {},

  page: 1,
  sizePerPage: 25,
  totalSize: 0,
  search: "",
  sortField: "created",
  sortOrder: "DESC",
}

const rechargeReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_RECHARGE_LOADING:
      return {
        ...state,
        loading: payload,
      }
    case FETCH_RECHARGES:
      return {
        ...state,
        rechargesData: payload,
        rechargeList: payload.data,
        loading: false,
        totalSize: payload?.total || 0,
      }
    case FETCH_RECHARGES_BY_ID:
      return {
        ...state,
        rechargesDetail: payload,
        loading: false,
      }
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        transactionData: payload,
        transactionList: payload.data,
        loading: false,
        totalSize: payload?.total || 0,
      }

    case FETCH_TRANSACTIONS_BY_ID:
      return {
        ...state,
        transactionDetail: payload,
        loading: false,
      }

    //  ===================== new ============================

    case SET_SIZE_PER_PAGE_TRANSACTIONS:
      return {
        ...state,
        sizePerPage: payload,
      }

    case SET_PAGE_TRANSACTIONS:
      return {
        ...state,
        page: payload,
      }

    case SET_SEARCH_TRANSACTIONS:
      return {
        ...state,
        search: payload,
      }

    case SET_SORT_FIELD_TRANSACTIONS:
      return {
        ...state,
        sortField: payload,
      }

    case SET_SORT_ORDER_TRANSACTIONS:
      return {
        ...state,
        sortOrder: payload,
      }

    default:
      return state
  }
}

export default rechargeReducer
