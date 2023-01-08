import {
    FETCH_ALL_SLAB,
    FETCH_SLAB_BY_ID,
    SET_PAGE_SLAB,
    SET_SEARCH_SLAB,
    SET_SIZE_PER_PAGE_SLAB,
    SET_SLAB_LOADING,
    SET_SORT_FIELD_SLAB,
    SET_SORT_ORDER_SLAB,
} from "./actionTypes"

const initialState = {
    slabLoading: false,
    slabDetail: {},
    slabsListData: {},
    slabsList: [],
    page: 1,
    sizePerPage: 25,
    totalSize: 0,
    search: "",
    sortField: "created",
    sortOrder: "DESC",
}

const SPSlabReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_SLAB_LOADING:
            return {
                ...state,
                slabLoading: payload,
            }
        case FETCH_ALL_SLAB:
            return {
                ...state,
                slabsListData: payload,
                slabsList: payload.data || [],
                slabLoading: false,
            }
        case FETCH_SLAB_BY_ID:
            return {
                ...state,
                slabDetail: payload,
                slabLoading: false,
            }

        case SET_SIZE_PER_PAGE_SLAB:
            return {
                ...state,
                sizePerPage: payload,
            }

        case SET_PAGE_SLAB:
            return {
                ...state,
                page: payload,
            }

        case SET_SEARCH_SLAB:
            return {
                ...state,
                search: payload,
            }

        case SET_SORT_FIELD_SLAB:
            return {
                ...state,
                sortField: payload,
            }

        case SET_SORT_ORDER_SLAB:
            return {
                ...state,
                sortOrder: payload,
            }

        default:
            return state
    }
}

export default SPSlabReducer
