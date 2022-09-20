import {
    FETCH_COMPANIES,
    FETCH_COMPANIES_ERROR,
    FETCH_COMPANIES_SUCCESS,
    SET_COMPANY_LOADING,
} from './actionTypes'

const initialState = {
    loading: false,
    companyList: [],
}

const companyReducer = (state = initialState, action) => {
    const { type, payload } = action
    console.log('type,payload :>> ', type, payload)

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

        case SET_COMPANY_LOADING:
            return {
                ...state,
                loading: payload,
            }

        default:
            return state
    }
}

export default companyReducer
