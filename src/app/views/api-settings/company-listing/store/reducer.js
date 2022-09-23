import {
    FETCH_COMPANIES,
    FETCH_COMPANIES_ERROR,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANY_BY_ID,
    SET_LOADING,
} from './actionTypes'

const initialState = {
    loading: false,
    companyList: [],
    singleCompany: {},
}

const companyReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case FETCH_COMPANIES:
            return {
                ...state,
                loading: true,
            }

        case FETCH_COMPANIES_SUCCESS:
            return {
                ...state,
                companyList: payload,
                loading: false,
            }
        case FETCH_COMPANIES_ERROR:
            return {
                ...state,
                loading: false,
            }

        case SET_LOADING:
            return {
                ...state,
                loading: payload,
            }

        case FETCH_COMPANY_BY_ID:
            return {
                ...state,
                singleCompany: payload,
            }

        default:
            return state
    }
}

export default companyReducer
