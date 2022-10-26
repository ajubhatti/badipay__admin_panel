import { walletServices } from 'app/services/wallet.service'
import { toast } from 'react-toastify'
import { SET_WALLET_LIST, WALLET_LOADING } from './actionType'

export const fetchWalletList = (data) => async (dispatch) => {
    try {
        dispatch(setWalletLoading(true))
        const res = await walletServices.getAll(data)

        if (res.data) {
            dispatch(setWalletRequestList(res?.data?.wallets))
        }
        dispatch(setWalletLoading(false))
    } catch (err) {
        toast.error(err?.response?.data?.message || err?.message)
        return err
    }
}

export const setWalletLoading = (data) => ({
    type: WALLET_LOADING,
    payload: data,
})

export const setWalletRequestList = (data) => ({
    type: SET_WALLET_LIST,
    payload: data,
})
