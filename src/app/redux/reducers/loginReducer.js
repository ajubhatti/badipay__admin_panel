import { LOGIN_LOADING, LOGIN, IS_AUTH } from "../actions/loginActions"

const initialState = {
    loading: false,
    user: null,
    isAuth: false,
}

const loginReducer = function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case LOGIN_LOADING:
            return {
                ...state,
                loading: payload,
            }
        case LOGIN:
            return {
                ...state,
                user: payload,
            }
        case IS_AUTH:
            return {
                ...state,
                isAuth: payload,
            }
        default:
            return state
    }
}

export default loginReducer
