import { FETCH_APIS, SET_APIS_LOADING } from './actionTypes'

const initialState = {
    loading: false,
    apisList: [],
}

const apisReducer = (state = initialState, action) => {
    const { type, payload } = action
    console.log('type,payload :>> ', type, payload)

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

        default:
            return state
    }
}

export default apisReducer
