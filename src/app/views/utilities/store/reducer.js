import { FETCH_STATE, SET_LOADING } from './actionTypes'

const initialState = {
    loading: false,
    stateList: [],
}

const utilityReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
            }
        case FETCH_STATE:
            return {
                ...state,
                stateList: payload,
            }

        default:
            return state
    }
}

export default utilityReducer
