import {
    FETCH_ALL_SLAB,
    FETCH_SLAB_BY_ID,
    SET_PAGE_SLAB,
    SET_SEARCH_SLAB,
    SET_SIZE_PER_PAGE_SLAB,
    SET_SLAB_LOADING,
    SET_SORT_FIELD_SLAB,
    SET_SORT_ORDER_SLAB,
} from "./actionTypes"
import { slabService } from "app/services/slab.services"
import { toast } from "react-toastify"

export const getSPSlabById = (data) => async (dispatch) => {
    try {
        dispatch(setSlabLoading(true))
        await slabService.getSlabById(data).then((res) => {
            dispatch(fetchSPSlabById(res?.data))
            dispatch(setSlabLoading(false))
        })
    } catch (err) {
        toast.error(err?.response?.data?.message || err?.message)
        dispatch(setSlabLoading(false))
    }
}

export const getSPSlabs = (payload) => async (dispatch) => {
    try {
        dispatch(setSlabLoading(true))
        await slabService.getAllSlab(payload).then((res) => {
            console.log(res.data)
            dispatch(fetchAllSPSlabs(res?.data))
            dispatch(setSlabLoading(false))
        })
    } catch (err) {
        toast.error(err?.response?.data?.message || err?.message)
        dispatch(setSlabLoading(false))
    }
}

export const editSPSlab = (id, data) => async (dispatch) => {
    try {
        dispatch(setSlabLoading(true))
        await slabService.updateSlab(id, data).then((res) => {
            dispatch(getSPSlabs())
        })
    } catch (err) {
        dispatch(setSlabLoading(false))
    }
}

export const createSlab = (payload, cb) => async (dispatch) => {
    try {
        dispatch(setSlabLoading(true))
        await slabService.addSlab(payload).then((res) => {
            if (res?.status === 200) {
                cb(res?.data)
            } else {
                toast.error(res?.message)
            }
        })
    } catch (err) {
        console.log({ err })
        toast.error(err)
        dispatch(setSlabLoading(false))
    }
}

export const setSlabLoading = (data) => ({
    type: SET_SLAB_LOADING,
    payload: data,
})

export const fetchAllSPSlabs = (data) => ({
    type: FETCH_ALL_SLAB,
    payload: data,
})

export const fetchSPSlabById = (data) => ({
    type: FETCH_SLAB_BY_ID,
    payload: data,
})

export const setPageSlab = (data) => ({
    type: SET_PAGE_SLAB,
    payload: data,
})

export const setSizePerPageSlab = (data) => ({
    type: SET_SIZE_PER_PAGE_SLAB,
    payload: data,
})

export const setSearchSlab = (data) => ({
    type: SET_SEARCH_SLAB,
    payload: data,
})

export const setSortFieldOfSlab = (data) => ({
    type: SET_SORT_FIELD_SLAB,
    payload: data,
})

export const setSortOrderOfSlab = (data) => ({
    type: SET_SORT_ORDER_SLAB,
    payload: data,
})
