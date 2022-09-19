import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { accountService } from 'app/services/account.service'
import moment from 'moment'
import { companyService } from 'app/services/company.service'
import { FormControlLabel, Switch } from '@mui/material'
import CustomDropDown from 'app/components/DropDown/CustomDropDown'

const AddUpdateServiceDialog = (props) => {
    const [open, setOpen] = useState(false)

    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    const [companyData, setCompanyData] = useState({
        companyName: '',
        mobileAppCode: '',
        companyDetail: '',
        image: '',
        isActive: true,
        isVisible: true,
        providerType: '',
        minAmount: '',
        maxAmount: '',
    })

    useEffect(() => {
        console.log('props--', props)
        setOpen(props.open)

        setUserName(props.userData.userName)
        setEmail(props.userData.email)
        setPhone(props.userData.phoneNumber)
    }, [props, props.open])

    function handleClickOpen() {
        props.setOpen(true)
    }

    function handleClose() {
        props.setOpen(false)
    }

    const handleSubmit = async () => {
        console.log({ companyData })
        // let obj = props.userData
        // obj.userName = userName
        // obj.phoneNumber = phone
        // obj.email = email
        // let id = props.userData.id

        // await companyService.updateCompany(id, obj).then((res) => {
        //     console.log('update res --', res)
        //     handleClose()
        //     props.getAllCompany()
        // })
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
                        id="user_name"
                        label="Operator name"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.userName}
                        onChange={(e) =>
                            setCompanyData({
                                ...companyData,
                                companyName: e.target.value,
                            })
                        }
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone no."
                        type="text"
                        fullWidth
                        defaultValue={props.userData.phoneNumber}
                        onChange={(e) =>
                            setCompanyData({
                                ...companyData,
                                mobileAppCode: e.target.value,
                            })
                        }
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        defaultValue={props.userData.email}
                        onChange={(e) =>
                            setCompanyData({
                                ...companyData,
                                companyDetail: e.target.value,
                            })
                        }
                    />

                    <div>
                        <FormControlLabel
                            value="Is Active"
                            control={
                                <Switch
                                    checked={props.userData.isActive}
                                    onChange={(e) => {
                                        console.log(e.target.checked)
                                        setCompanyData({
                                            ...companyData,
                                            isActive: e.target.checked,
                                        })
                                    }}
                                    value="checkedA"
                                    inputProps={{
                                        'aria-label': 'secondary checkbox',
                                    }}
                                />
                            }
                            label="Is Active"
                            labelPlacement="start"
                        />
                    </div>

                    <div>
                        <FormControlLabel
                            value="Is Visible"
                            control={
                                <Switch
                                    checked={props.userData.isVisible}
                                    onChange={(e) => {
                                        console.log(e.target.checked)
                                        setCompanyData({
                                            ...companyData,
                                            isVisible: e.target.checked,
                                        })
                                    }}
                                    value="checkedA"
                                    inputProps={{
                                        'aria-label': 'secondary checkbox',
                                    }}
                                />
                            }
                            label="Is Visible"
                            labelPlacement="start"
                        />
                    </div>

                    <CustomDropDown
                        handleChange={(e) => {
                            console.log('chek value ---', e)
                            setCompanyData({
                                ...companyData,
                                isVisible: e,
                            })
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="district"
                        label="Min Amount"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.district}
                        onChange={(e) =>
                            setCompanyData({
                                ...companyData,
                                minAmount: e.target.value,
                            })
                        }
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        label="Max Amount"
                        type="text"
                        fullWidth
                        defaultValue={props.userData.city}
                        onChange={(e) =>
                            setCompanyData({
                                ...companyData,
                                maxAmount: e.target.value,
                            })
                        }
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

export default AddUpdateServiceDialog
