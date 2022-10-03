import { FETCH_RECHARGES, SET_RECHARGE_LOADING } from './actionTypes'

const initialState = {
    loading: false,
    rechargesData: [],
}

const rechargeReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_RECHARGE_LOADING:
            return {
                ...state,
                loading: payload,
            }
        case FETCH_RECHARGES:
            return {
                ...state,
                rechargesData: payload,
            }

        default:
            return state
    }
}

export default rechargeReducer
