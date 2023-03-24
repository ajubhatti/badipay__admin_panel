import {
    FETCH_CASHBACKS,
    FETCH_CASHBACK_BY_ID,
    SET_PAGE_CASHBACK,
    SET_LOADING,
    SET_SEARCH_CASHBACK,
    SET_SIZE_PER_PAGE_CASHBACK,
    SET_SORT_FIELD_CASHBACK,
    SET_SORT_ORDER_CASHBACK,
} from "./actionTypes"

const initialState = {
    loading: false,
    cashBackData: [],
    cashBackList: [],
    cashBackDetail: {},

    page: 1,
    sizePerPage: 25,
    totalSize: 0,
    search: "",
    sortField: "created",
    sortOrder: "DESC",
}

const reportsReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
            }

        case FETCH_CASHBACKS:
            return {
                ...state,
                cashBackData: payload,
                cashBackList: payload.data,
                loading: false,
                totalSize: payload?.total || 0,
                walletListData: payload.data,
            }

        case FETCH_CASHBACK_BY_ID:
            return {
                ...state,
                cashBackDetail: payload,
                loading: false,
            }

        //  ===================== new ============================

        case SET_SIZE_PER_PAGE_CASHBACK:
            return {
                ...state,
                sizePerPage: payload,
            }

        case SET_PAGE_CASHBACK:
            return {
                ...state,
                page: payload,
            }

        case SET_SEARCH_CASHBACK:
            return {
                ...state,
                search: payload,
            }

        case SET_SORT_FIELD_CASHBACK:
            return {
                ...state,
                sortField: payload,
            }

        case SET_SORT_ORDER_CASHBACK:
            return {
                ...state,
                sortOrder: payload,
            }

        default:
            return state
    }
}

export default reportsReducer
