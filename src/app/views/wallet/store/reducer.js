import { SET_WALLET_LIST, WALLET_LOADING } from './actionType'

const initialState = {
    loading: false,
    walletList: [],
}

const walletReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case WALLET_LOADING:
            return {
                ...state,
                loading: payload,
            }
        case SET_WALLET_LIST:
            return {
                ...state,
                walletList: payload,
            }
        default:
            return state
    }
}

export default walletReducer
