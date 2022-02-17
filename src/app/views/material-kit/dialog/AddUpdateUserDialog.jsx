import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { accountService } from 'app/services/account.service'

const AddUpdateUserDialog = (props) => {
    const [open, setOpen] = useState(false)

    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

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
