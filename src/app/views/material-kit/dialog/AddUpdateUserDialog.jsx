import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { accountService } from 'app/services/account.service'
import moment from 'moment'

const AddUpdateUserDialog = (props) => {
    const [open, setOpen] = useState(false)

    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    const [userState, setUserState] = useState()
    const [uerDistrict, setUserDistrict] = useState()
    const [userCity, setUserCity] = useState()
    const [userPincode, setUserPincode] = useState()
    const [userDate, setUserDate] = useState()
    const [userBalance, setUserBalance] = useState()
    const [userPanCard, setUserPanCard] = useState()
    const [userPassword, setUserPassword] = useState()

    useEffect(() => {
        console.log('props--', props)
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
        console.log(userName, email, phone)
        let obj = props.userData
        obj.userName = userName
        obj.phoneNumber = phone
        obj.email = email
        let id = props.userData.id
        await accountService.update(id, obj).then((res) => {
            console.log('update res --', res)
            handleClose()
        })
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="user_name"
                        label="User name"
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
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        defaultValue={props.userData.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="state"
                        label="state"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.state}
                        onChange={(e) => setUserState(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="district"
                        label="District"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.district}
                        onChange={(e) => setUserDistrict(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        label="city"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.city}
                        onChange={(e) => setUserCity(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="pin_code"
                        label="pin code"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.pinCode}
                        onChange={(e) => setUserPincode(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        label="date"
                        type="text"
                        fullWidth
                        defaultValue={moment(props.userData.created).format('YYYY-MM-DD')}
                        onChange={(e) => setUserDate(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="balance"
                        label="balance"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.balace}
                        onChange={(e) => setUserBalance(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="pan_card"
                        label="pan card no"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.pancard}
                        onChange={(e) => setUserPanCard(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="password"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.password}
                        onChange={(e) => setUserPassword(e.target.value)}
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

export default AddUpdateUserDialog
