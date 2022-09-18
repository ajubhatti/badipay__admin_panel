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
import { useNavigate } from 'react-router-dom'

const AddUpdateCompany = (props) => {
    const navigate = useNavigate()

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

    function handleClose() {
        navigate('/api-setting/company')
    }

    const handleSubmit = async () => {
        console.log({ companyData })
        // let obj = companyData?
        // obj.userName = userName
        // obj.phoneNumber = phone
        // obj.email = email
        let id = companyData?.id || null

        if (id) {
            await companyService.updateCompany(id, companyData).then((res) => {
                console.log('update res --', res)
                handleClose()
                props.getAllCompany()
            })
        } else {
            await companyService.addCompany(companyData).then((res) => {
                console.log('update res --', res)
                handleClose()
                props.getAllCompany()
            })
        }
    }

    return (
        <div>
            <TextField
                autoFocus
                margin="dense"
                id="operator_name"
                label="Operator name"
                type="text"
                fullWidth
                defaultValue={companyData?.companyName}
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
                id="mobileAppCode"
                label="Mobile App Code"
                type="text"
                fullWidth
                defaultValue={companyData?.mobileAppCode}
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
                id="companyDetail"
                label="Company Detail"
                type="text"
                fullWidth
                defaultValue={companyData?.companyDetail}
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
                            checked={companyData?.isActive}
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
                            checked={companyData?.isVisible}
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
                title={'providerType'}
                handleChange={(e) => {
                    console.log('chek value ---', e)
                    setCompanyData({
                        ...companyData,
                        providerType: e,
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
                defaultValue={companyData?.district}
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
                defaultValue={companyData?.city}
                onChange={(e) =>
                    setCompanyData({
                        ...companyData,
                        maxAmount: e.target.value,
                    })
                }
            />

            <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={() => handleSubmit()} color="primary">
                Save
            </Button>
        </div>
    )
}

export default AddUpdateCompany
