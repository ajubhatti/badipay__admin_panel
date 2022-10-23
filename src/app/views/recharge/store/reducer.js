import {
    FETCH_RECHARGES,
    FETCH_TRANSACTIONS,
    SET_RECHARGE_LOADING,
} from './actionTypes'

const initialState = {
    loading: false,
    rechargesData: [],
    transactionData: [],
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
        case FETCH_TRANSACTIONS:
            return {
                ...state,
                transactionData: payload,
            }
        default:
            return state
    }
}

export default rechargeReducer
