import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormHelperText from "@mui/material/FormHelperText"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { accountService } from "app/services/account.service"
import { useFormik } from "formik"
import * as yup from "yup"
import { MenuItem, Select } from "@mui/material"

const initialValues = {
    userName: "",
    phoneNumber: "",
    email: "",
    stateId: "",
    city: "",
    pincode: "",
    walletBalance: "",
    password: "",
    referralId: "",
}
const validationSchema = yup.object({
    userName: yup.string().trim().required("Please enter the user name"),
    phoneNumber: yup.number().required("Please enter the phone number"),
    email: yup
        .string()
        .trim()
        .required("Please enter the email")
        .email("email is not proper"),
    stateId: yup.string().trim().required("Please enter the state"),
    city: yup.string().trim().required("Please enter the city"),
    pincode: yup.string().trim().required("Please enter the pin code"),
    password: yup.string().trim().required("Please enter the password"),
})

const AddUpdateUserDialog = (props) => {
    const [state, setState] = useState(null)

    const onSubmit = async (values) => {
        console.log({ values })

        if (!!props?.open?.data) {
            let id = props?.open?.data?._id

            await accountService.update(id, values).then((res) => {
                handleClose()
                props.getAllusers()
            })
        } else {
            delete values.walletBalance
            await accountService.create(values).then((res) => {
                handleClose()
                props.getAllusers()
            })
        }
    }

    useEffect(() => {
        const fetchState = async () => {
            const res = await accountService.fetchState()
            setState(res?.data)
        }
        fetchState()
    }, [])

    const {
        values,
        errors,
        handleBlur,
        handleChange,
        touched,
        handleSubmit,
        resetForm,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    function handleClose() {
        props.setOpen({
            is_open: false,
            is_form_view_profile: false,
            data: null,
        })
    }

    useEffect(() => {
        if (!!props?.open?.data) {
            const { data } = props.open
            resetForm({
                values: {
                    userName: data?.userName,
                    phoneNumber: data?.phoneNumber,
                    email: data?.email,
                    stateId: data?.state,
                    city: data?.city,
                    pincode: data?.pincode,
                    walletBalance: data?.walletBalance,
                    password: data?.passwordHash,
                },
            })
        } else {
            resetForm({
                values: {
                    userName: "",
                    phoneNumber: "",
                    email: "",
                    stateId: "",
                    city: "",
                    pincode: "",
                    walletBalance: "",
                    password: "",
                },
            })
        }
    }, [props.open, props?.userData, resetForm])

    return (
        <div>
            <Dialog
                open={props?.open?.is_open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">
                        {props.title}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="referralId"
                            name="referralId"
                            label="Referral"
                            type="text"
                            disabled={!!props?.open?.is_form_view_profile}
                            error={errors?.referralId && touched?.referralId}
                            fullWidth
                            defaultValue={values?.referralId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            margin="dense"
                            id="userName"
                            name="userName"
                            label="User name"
                            type="text"
                            disabled={!!props?.open?.is_form_view_profile}
                            error={errors?.userName && touched?.userName}
                            fullWidth
                            defaultValue={values?.userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors?.userName && touched?.userName && (
                            <FormHelperText error>
                                {errors?.userName}
                            </FormHelperText>
                        )}
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Phone no."
                            name="phoneNumber"
                            type="number"
                            disabled={!!props?.open?.is_form_view_profile}
                            error={errors?.phoneNumber && touched?.phoneNumber}
                            fullWidth
                            defaultValue={values?.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors?.phoneNumber && touched?.phoneNumber && (
                            <FormHelperText error>
                                {errors?.phoneNumber}
                            </FormHelperText>
                        )}

                        <TextField
                            margin="dense"
                            id="name"
                            label="Email Address"
                            name="email"
                            type="email"
                            disabled={!!props?.open?.is_form_view_profile}
                            error={errors?.email && touched?.email}
                            fullWidth
                            defaultValue={values?.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors?.email && touched?.email && (
                            <FormHelperText error>
                                {errors?.email}
                            </FormHelperText>
                        )}
                        <Select
                            className="mt-2 mb-2"
                            margin="dense"
                            id="stateId"
                            label="stateId"
                            fullWidth
                            name="stateId"
                            value={values?.stateId}
                            disabled={!!props?.open?.is_form_view_profile}
                            error={errors?.stateId && touched?.stateId}
                            onChange={handleChange}
                        >
                            {state?.map((item, i) => (
                                <MenuItem key={i} value={item?._id}>
                                    {item?.stateName}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors?.stateId && touched?.stateId && (
                            <FormHelperText error>
                                {errors?.stateId}
                            </FormHelperText>
                        )}

                        <TextField
                            margin="dense"
                            id="city"
                            label="city"
                            name="city"
                            disabled={!!props?.open?.is_form_view_profile}
                            error={errors?.city && touched?.city}
                            type="text"
                            fullWidth
                            defaultValue={values?.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors?.city && touched?.city && (
                            <FormHelperText error>
                                {errors?.city}
                            </FormHelperText>
                        )}

                        <TextField
                            margin="dense"
                            id="pincode"
                            name="pincode"
                            label="pin code"
                            disabled={!!props?.open?.is_form_view_profile}
                            error={errors?.pincode && touched?.pincode}
                            type="text"
                            fullWidth
                            defaultValue={values?.pincode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors?.pincode && touched?.pincode && (
                            <FormHelperText error>
                                {errors?.pincode}
                            </FormHelperText>
                        )}

                        {props?.open?.data?._id && (
                            <TextField
                                margin="dense"
                                id="walletBalance"
                                name="walletBalance"
                                label="Wallet Balance"
                                type="text"
                                // disabled={!!props?.open?.is_form_view_profile}
                                error={
                                    errors?.walletBalance &&
                                    touched?.walletBalance
                                }
                                fullWidth
                                disabled
                                defaultValue={values?.walletBalance}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        )}
                        {errors?.walletBalance && touched?.walletBalance && (
                            <FormHelperText error>
                                {errors?.walletBalance}
                            </FormHelperText>
                        )}

                        <TextField
                            margin="dense"
                            id="password"
                            label="password"
                            disabled={!!props?.open?.is_form_view_profile}
                            error={errors?.password && touched?.password}
                            name="password"
                            type="text"
                            fullWidth
                            defaultValue={values?.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors?.password && touched?.password && (
                            <FormHelperText error>
                                {errors?.password}
                            </FormHelperText>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        {!!!props?.open?.is_form_view_profile && (
                            <Button
                                variant="outlined"
                                type="submit"
                                // onClick={() => handleSubmit()}
                                color="primary"
                            >
                                {!!props?.open?.data ? "Edit" : "Save"}
                            </Button>
                        )}
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default AddUpdateUserDialog
