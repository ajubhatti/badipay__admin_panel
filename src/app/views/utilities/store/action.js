import { utilityService } from 'app/services/utility.services'
import { FETCH_STATE, FETCH_STATE_BY_ID, SET_LOADING } from './actionTypes'

export const getStateById = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await utilityService.getStateById(data).then((res) => {
            dispatch(fetchStateById(res?.data))
            dispatch(setLoading(false))
        })
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const getStateList = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await utilityService.getAllState(data).then((res) => {
            if (res?.data) {
                dispatch(fetchStateList(res?.data))
                dispatch(setLoading(false))
            }
        })
    } catch (err) {
        // toast.error(err.response?.data?.message || err.message)
        dispatch(setLoading(false))
    }
}

export const updateStates = (id, data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await utilityService.updateState(id, data).then((res) => {
            dispatch(getStateList())
        })
    } catch (err) {
        dispatch(setLoading(false))
    }
}

export const createState = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await utilityService.addState(data).then((res) => {
            dispatch(getStateList())
        })
    } catch (err) {
        dispatch(setLoading(false))
    }
}

export const fetchStateList = (data) => ({
    type: FETCH_STATE,
    payload: data,
})

export const fetchStateById = (data) => ({
    type: FETCH_STATE_BY_ID,
    payload: data,
})

export const setLoading = (data) => ({
    type: SET_LOADING,
    payload: data,
})
