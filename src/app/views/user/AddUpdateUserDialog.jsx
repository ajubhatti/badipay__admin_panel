import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { accountService } from 'app/services/account.service'
import moment from 'moment'
import { useFormik } from 'formik'
import * as yup from "yup"

const initialValues = {
    user_name: "",
    phone_no: "",
    email_address: "",
    state: "",
    district: "",
    city: "",
    pin_code: "",
    date: "",
    balance: "",
    pan_card: "",
    password: ""
}
const validationSchema = yup.object({
    user_name: yup.string().trim().required("Please enter the user name"),
    phone_no: yup.number().required("Please enter the phone number")
        .min(9, "Phone number must be 10 digits").max(11, "Phone number must be 10 digits"),
    email_address: yup.string().trim().required("Please enter the email").email("email is not proper"),
    state: yup.string().trim().required("Please enter the state"),
    district: yup.string().trim().required("Please enter the district"),
    city: yup.string().trim().required("Please enter the city"),
    pin_code: yup.string().trim().required("Please enter the pin code"),
    date: yup.string().trim().required("Please enter the date"),
    balance: yup.string().trim().required("Please enter the balance"),
    pan_card: yup.string().trim().required("Please enter the pan card"),
    password: yup.string().trim().required("Please enter the password")
})



const AddUpdateUserDialog = (props) => {
    const [open, setOpen] = useState(false)

    const onSubmit = async (values) => {
        console.log(values);
        // let obj = props.userData
        // obj.userName = userName
        // obj.phoneNumber = phone
        // obj.email = email
        let id = props.userData.id
        if (!id) {
            await accountService.create(values).then((res) => {
                handleClose()
                props.getAllusers()
            })
        } else {
            await accountService.update(id, values).then((res) => {
                handleClose()
                props.getAllusers()
            })
        }
    }


    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    useEffect(() => {
        setOpen(props.open)

        // setUserName(props.userData.userName)
        // setEmail(props.userData.email)
        // setPhone(props.userData.phoneNumber)
    }, [props.open])

    function handleClose() {
        props.setOpen(false)
    }

    // const handleSubmit = async () => {
    //     let obj = props.userData
    //     obj.userName = userName
    //     obj.phoneNumber = phone
    //     obj.email = email
    //     let id = props.userData.id
    //     if (!id) {
    //         await accountService.create(obj).then((res) => {
    //             handleClose()
    //             props.getAllusers()
    //         })
    //     } else {
    //         await accountService.update(id, obj).then((res) => {
    //             handleClose()
    //             props.getAllusers()
    //         })
    //     }
    // }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="user_name"
                            name="user_name"
                            label="User name"
                            type="text"
                            error={errors?.user_name && touched?.user_name}
                            fullWidth
                            defaultValue={values?.user_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.user_name && touched?.user_name &&
                            <FormHelperText error>{errors?.user_name}</FormHelperText>
                        }
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Phone no."
                            name="phone_no"
                            type="number"
                            error={errors?.phone_no && touched?.phone_no}
                            fullWidth
                            defaultValue={values?.phone_no}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.phone_no && touched?.phone_no &&
                            <FormHelperText error>{errors?.phone_no}</FormHelperText>
                        }

                        <TextField
                            margin="dense"
                            id="name"
                            label="Email Address"
                            name="email_address"
                            type="email"
                            error={errors?.email_address && touched?.email_address}
                            fullWidth
                            defaultValue={values?.email_address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.email_address && touched?.email_address &&
                            <FormHelperText error>{errors?.email_address}</FormHelperText>
                        }

                        <TextField
                            margin="dense"
                            id="state"
                            label="state"
                            name="state"
                            error={errors?.state && touched?.state}
                            type="text"
                            fullWidth
                            defaultValue={values?.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.state && touched?.state &&
                            <FormHelperText error>{errors?.state}</FormHelperText>
                        }

                        <TextField
                            margin="dense"
                            id="district"
                            name="district"
                            label="District"
                            error={errors?.district && touched?.district}
                            type="text"
                            fullWidth
                            defaultValue={values?.district}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.district && touched?.district &&
                            <FormHelperText error>{errors?.district}</FormHelperText>
                        }

                        <TextField
                            margin="dense"
                            id="city"
                            label="city"
                            name="city"
                            error={errors?.city && touched?.city}
                            type="text"
                            fullWidth
                            defaultValue={values?.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.city && touched?.city &&
                            <FormHelperText error>{errors?.city}</FormHelperText>
                        }

                        <TextField
                            margin="dense"
                            id="pin_code"
                            name="pin_code"
                            label="pin code"
                            error={errors?.pin_code && touched?.pin_code}
                            type="text"
                            fullWidth
                            defaultValue={values?.pin_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.pin_code && touched?.pin_code &&
                            <FormHelperText error>{errors?.pin_code}</FormHelperText>
                        }

                        <TextField
                            margin="dense"
                            id="date"
                            name="date"
                            label="date"
                            type="text"
                            error={errors?.date && touched?.date}
                            fullWidth
                            defaultValue={moment(values?.date).format(
                                'YYYY-MM-DD'
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.date && touched?.date &&
                            <FormHelperText error>{errors?.date}</FormHelperText>
                        }

                        <TextField
                            margin="dense"
                            id="balance"
                            name="balance"
                            label="balance"
                            type="text"
                            error={errors?.balance && touched?.balance}
                            fullWidth
                            defaultValue={values?.balance}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.balance && touched?.balance &&
                            <FormHelperText error>{errors?.balance}</FormHelperText>
                        }

                        <TextField
                            margin="dense"
                            id="pan_card"
                            name="pan_card"
                            label="pan card no"
                            error={errors?.pan_card && touched?.pan_card}
                            type="text"
                            fullWidth
                            defaultValue={values?.pan_card}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.pan_card && touched?.pan_card &&
                            <FormHelperText error>{errors?.pan_card}</FormHelperText>
                        }

                        <TextField
                            margin="dense"
                            id="password"
                            label="password"
                            error={errors?.password && touched?.password}
                            name="password"
                            type="text"
                            fullWidth
                            defaultValue={values?.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors?.password && touched?.password &&
                            <FormHelperText error>{errors?.password}</FormHelperText>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            // onClick={() => handleSubmit()}
                            color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    )
}

export default AddUpdateUserDialog
