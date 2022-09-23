import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { companyService } from 'app/services/company.service'
import { FormControlLabel, Switch } from '@mui/material'
import CustomDropDown from 'app/components/ReactDropDown/ReactDropDown'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getApiList } from '../apis/store/action'
import { Card, Form } from 'react-bootstrap'
import { Box } from '@mui/system'
import styled from '@emotion/styled'
import { getServices } from '../services-listing/store/action'
import ReactSelect from 'app/components/ReactDropDown/ReactSelect'
import { fetchCompanyById, getCompaniesById } from './store/action'

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
    const { singleCompany } = useSelector((state) => state.company)

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
        console.log('singleCompany', singleCompany)
        if (id) {
            setCompanyData({
                companyName: singleCompany?.companyName,
                mobileAppCode: singleCompany?.mobileAppCode,
                companyDetail: singleCompany?.companyDetail,
                image: singleCompany?.image,
                isActive: singleCompany?.isActive,
                isVisible: singleCompany?.isVisible,
                providerType: singleCompany?.providerType,
                minAmount: singleCompany?.minAmount,
                maxAmount: singleCompany?.maxAmount,
                referenceApis: singleCompany?.referenceApis,
            })
            setSelectedValue(singleCompany?.providerType)
            setApiArray(singleCompany?.referenceApis)
        }
    }, [id, singleCompany])

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

    const handleClose = () => {
        navigate('/api-setting/company')
    }

    const clearData = () => {
        setCompanyData({
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
    }

    useEffect(() => {
        if (id) {
            dispatch(getCompaniesById(id))
        }
        return () => {
            clearData()
            dispatch(fetchCompanyById({}))
        }
    }, [dispatch, id])

    const handleSubmit = async () => {
        companyData.referenceApis = apiArray

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
        <div className="container">
            <div className="">
                <Form>
                    <Form.Group
                        controlId="formGridOperatorName"
                        className="m-2"
                    >
                        <Form.Label>Operator Name</Form.Label>
                        <Form.Control
                            value={companyData?.companyName}
                            type="text"
                            placeholder="Enter Operator Name"
                            onChange={(e) => {
                                setCompanyData({
                                    ...companyData,
                                    companyName: e.target.value,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridMobileCode" className="m-2">
                        <Form.Label>Mobile App Code</Form.Label>
                        <Form.Control
                            value={companyData?.mobileAppCode}
                            text="text"
                            placeholder="Enter Mobile App Code"
                            onChange={(e) => {
                                setCompanyData({
                                    ...companyData,
                                    mobileAppCode: e.target.value,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group
                        controlId="formGridOperatorDetail"
                        className="m-2"
                    >
                        <Form.Label>Operator Detail</Form.Label>
                        <Form.Control
                            value={companyData?.companyDetail}
                            as="textarea"
                            placeholder="Enter Company Detail"
                            onChange={(e) => {
                                setCompanyData({
                                    ...companyData,
                                    companyDetail: e.target.value,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group
                        controlId="formGridOperatorIsActive"
                        className="m-2"
                    >
                        <Form.Label>Is Active</Form.Label>

                        <Form.Check
                            type="switch"
                            checked={companyData?.isActive}
                            onChange={(e) => {
                                setCompanyData({
                                    ...companyData,
                                    isActive: e.target.checked,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group
                        controlId="formGridOperatorIsVisible"
                        className="m-2"
                    >
                        <Form.Label>Is Visible</Form.Label>

                        <Form.Check
                            type="switch"
                            checked={companyData?.isVisible}
                            onChange={(e) => {
                                setCompanyData({
                                    ...companyData,
                                    isVisible: e.target.checked,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group
                        controlId="formGridProviderType"
                        className="m-2"
                    >
                        <Form.Label>Provider Type</Form.Label>
                        <ReactSelect
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
                    </Form.Group>

                    <Form.Group controlId="formGridMinAmount" className="m-2">
                        <Form.Label>Min Amount</Form.Label>

                        <Form.Control
                            value={companyData?.minAmount}
                            text="text"
                            placeholder="Enter Mobile App Code"
                            onChange={(e) => {
                                setCompanyData({
                                    ...companyData,
                                    minAmount: e.target.value,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridMaxAmount" className="m-2">
                        <Form.Label>Max Amount</Form.Label>
                        <Form.Control
                            value={companyData?.maxAmount}
                            text="text"
                            placeholder="Enter Mobile App Code"
                            onChange={(e) => {
                                setCompanyData({
                                    ...companyData,
                                    maxAmount: e.target.value,
                                })
                            }}
                        />
                    </Form.Group>

                    {apiArray.map((x, index) => (
                        <Form.Group
                            controlId={`formGridApiName${index}`}
                            className="m-2"
                            key={x._id}
                        >
                            <Form.Label>{x.apiName}</Form.Label>
                            <Form.Control
                                value={x?.apiCode}
                                text="text"
                                placeholder={`Enter ${x.apiName} Code`}
                                onChange={(e) => {
                                    x.apiCode = e.target.value
                                }}
                            />
                        </Form.Group>
                    ))}
                    <div className="m-2">
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
                </Form>
            </div>
        </div>
    )
}

export default AddUpdateCompany
