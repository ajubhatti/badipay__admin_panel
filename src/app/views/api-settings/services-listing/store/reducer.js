import { FETCH_SERVICES, FETCH_SERVICE_BY_ID, SET_LOADING } from './actionTypes'

const initialState = {
    loading: false,
    serviceList: [],
    singleService: {},
}

const servicesListReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case FETCH_SERVICES:
            return {
                ...state,
                serviceList: payload,
            }

        case SET_LOADING:
            return {
                ...state,
                loading: payload,
            }

        case FETCH_SERVICE_BY_ID:
            return {
                ...state,
                singleService: payload,
            }

        default:
            return state
    }
}

export default servicesListReducer
