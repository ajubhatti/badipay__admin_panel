import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { accountService } from 'app/services/account.service'
import { walletServices } from '../../../services/wallet.service'

const AddRemoveBalance = (props) => {
    const [open, setOpen] = useState(false)

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [balance, setBalance] = useState(0)
    const [amount, setAmount] = useState(0)
    const [confirmAmount, setConfirmAmount] = useState(0)
    const [remarks, setRemarks] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setOpen(props.open)

        setUserName(props.userData.userName)
        setEmail(props.userData.email)
        setPhone(props.userData.phoneNumber)
    }, [props.open])

    function handleClickOpen() {
        props.setOpen(true)
    }

    function handleClose() {
        props.setOpen(false)
    }

    const handleSubmit = async () => {
        let payload = {
            userId: props.userData.id,
            type: props.type,
            amount: amount,
            remarks: remarks,
            password: password,
        }
        await walletServices.updateBalance(payload).then((res) => {
            handleClose()
            props.getAllusers()
        })
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Name"
                        label="Name"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone no."
                        type="text"
                        fullWidth
                        defaultValue={props.userData.phoneNumber}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="currentAmount"
                        label="current amount"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="addAmount"
                        label="add amount"
                        type="text"
                        fullWidth
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="confirmAmount"
                        label="confirm amount"
                        type="text"
                        fullWidth
                        onChange={(e) => setConfirmAmount(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Remarks"
                        label="remarks"
                        type="text"
                        fullWidth
                        onChange={(e) => setRemarks(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="password"
                        type="text"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddRemoveBalance
