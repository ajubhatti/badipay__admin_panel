import { SET_LOADING } from './actionTypes'

const initialState = {
    loading: false,
    searchSearviceData: {},
}

const operatorSwitchReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
            }

        default:
            return state
    }
}

export default operatorSwitchReducer
