import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { companyService } from 'app/services/company.service'
import { FormControlLabel, Switch } from '@mui/material'
import CustomDropDown from 'app/components/ReactDropDown/ReactDropDown'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getApiList } from '../apis/store/action'
import { Card } from 'react-bootstrap'
import { Box } from '@mui/system'
import styled from '@emotion/styled'
import { getServices } from '../services-listing/store/action'
import CustomReactSelect from 'app/components/ReactDropDown/ReactSelect'

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

const AddUpdateCompany = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { apisList } = useSelector((state) => state.apis)
    const { serviceList } = useSelector((state) => state.servicesList)
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
        referenceApis: [],
    })

    const [apiArray, setApiArray] = useState([])
    const [servicesData, setServicesData] = useState([])
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
        dispatch(getApiList())
        dispatch(getServices())
    }, [dispatch])

    useEffect(() => {
        setApiArray(apisList)
    }, [apisList])

    useEffect(() => {
        if (serviceList && serviceList.length > 0) {
            let newService = serviceList.map((service) => ({
                value: service._id,
                label: service.serviceName,
            }))
            setSelectedValue(newService[0].id)
            setServicesData(newService)
        }
    }, [serviceList])

    function handleClose() {
        navigate('/api-setting/company')
    }

    useEffect(() => {
        if (id) {
            // get company from id
        }
    }, [id])

    const handleSubmit = async () => {
        companyData.referenceApis = apiArray
        companyData.providerType = '61ebf005b15b7b52ddc35dff'

        if (id) {
            await companyService.updateCompany(id, companyData).then((res) => {
                handleClose()
            })
        } else {
            await companyService.addCompany(companyData).then((res) => {
                handleClose()
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

                    {/* <CustomDropDown
                        title={'Provider Type'}
                        handleChange={(e) => {
                            setSelectedValue(e)
                            setCompanyData({
                                ...companyData,
                                providerType: e,
                            })
                        }}
                        selectedValue={selectedValue}
                        options={servicesData}
                    /> */}
                    <CustomReactSelect
                        title={'Provider Type'}
                        handleChange={(e) => {
                            setSelectedValue(e)
                            setCompanyData({
                                ...companyData,
                                providerType: e,
                            })
                        }}
                        selectedValue={selectedValue}
                        options={servicesData}
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

                    {apiArray.map((x) => (
                        <TextField
                            key={x._id}
                            autoFocus
                            margin="dense"
                            id="city"
                            label={x.apiName}
                            type="text"
                            fullWidth
                            value={x?.apiCode}
                            defaultValue={x?.apiCode}
                            onChange={(e) => {
                                x.apiCode = e.target.value
                            }}
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

export default AddUpdateCompany
