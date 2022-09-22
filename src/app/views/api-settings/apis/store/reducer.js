import { FETCH_APIS, FETCH_API_BY_ID, SET_APIS_LOADING } from './actionTypes'

const initialState = {
    loading: false,
    apisList: [],
    singleApi: {},
}

const apisReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case FETCH_APIS:
            return {
                ...state,
                apisList: payload,
            }

        case SET_APIS_LOADING:
            return {
                ...state,
                loading: payload,
            }

        case FETCH_API_BY_ID:
            return {
                ...state,
                singleApi: payload,
            }

        default:
            return state
    }
}

export default apisReducer
