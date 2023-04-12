import {
  SET_WALLET_LIST,
  WALLET_LOADING,
  FETCH_WALLETS,
  FETCH_WALLET_BY_ID,
  SET_PAGE_WALLET,
  SET_LOADING,
  SET_SEARCH_WALLET,
  SET_SIZE_PER_PAGE_WALLET,
  SET_SORT_FIELD_WALLET,
  SET_SORT_ORDER_WALLET,
} from "./actionType"

const initialState = {
  loading: false,
  walletList: [],

  walletData: [],
  walletLists: [],
  walletDetail: {},

  page: 1,
  sizePerPage: 25,
  totalSize: 0,
  search: "",
  sortField: "created",
  sortOrder: "DESC",
}

const walletReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case WALLET_LOADING:
      return {
        ...state,
        loading: payload,
      }

    case SET_WALLET_LIST:
      return {
        ...state,
        walletList: payload,
      }

    // =================================================
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      }

    case FETCH_WALLETS:
      return {
        ...state,
        walletData: payload,
        walletLists: payload.data,
        loading: false,
        totalSize: payload?.total || 0,
        walletListData: payload.data,
      }

    case FETCH_WALLET_BY_ID:
      return {
        ...state,
        walletDetail: payload,
        loading: false,
      }

    //  ===================== new ============================

    case SET_SIZE_PER_PAGE_WALLET:
      return {
        ...state,
        sizePerPage: payload,
      }

    case SET_PAGE_WALLET:
      return {
        ...state,
        page: payload,
      }

    case SET_SEARCH_WALLET:
      return {
        ...state,
        search: payload,
      }

    case SET_SORT_FIELD_WALLET:
      return {
        ...state,
        sortField: payload,
      }

    case SET_SORT_ORDER_WALLET:
      return {
        ...state,
        sortOrder: payload,
      }

    default:
      return state
  }
}

export default walletReducer
