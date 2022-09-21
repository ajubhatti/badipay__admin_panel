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
import { Fab, FormControlLabel, Icon, Switch } from '@mui/material'
import CustomDropDown from 'app/components/DropDown/CustomDropDown'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getApiList } from '../apis/store/action'
import { Card } from 'react-bootstrap'
import { Box } from '@mui/system'
import styled from '@emotion/styled'

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const AddUpdateApis = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { apisList } = useSelector((state) => state.apis)
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
        dispatch(getApiList())
    }, [dispatch])

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
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>New Operator</Title>
            </CardHeader>
            <Box width="100%" overflow="auto" sx={{ pt: '20px', mb: 3, ml: 3 }}>
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
                    {apisList.map((x) => (
                        <TextField
                            autoFocus
                            margin="dense"
                            id="city"
                            label={x.apiName}
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
                    ))}

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
                </div>
            </Box>
        </Card>
    )
}

export default AddUpdateApis
