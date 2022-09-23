import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import {
    createService,
    fetchServiceById,
    getServicesById,
    updateService,
} from '../services-listing/store/action'

const AddUpdateService = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const { singleService } = useSelector((state) => state.servicesList)
    const [serviceData, setServiceData] = useState({
        serviceName: '',
        serviceDetail: '',
        isActive: true,
    })

    useEffect(() => {
        if (id) {
            setServiceData({
                serviceName: singleService.serviceName,
                serviceDetail: singleService.serviceDetail,
                isActive: singleService.isActive,
            })
        }
    }, [id, singleService])

    useEffect(() => {
        if (id) {
            dispatch(getServicesById(id))
        }
        return () => {
            clearData()
            dispatch(fetchServiceById({}))
        }
    }, [dispatch, id])

    const handleClose = () => {
        navigate('/api-setting/service')
    }

    const clearData = () => {
        setServiceData({
            serviceName: '',
            serviceDetail: '',
            isActive: true,
        })
    }

    const handleSubmit = async () => {
        if (id) {
            dispatch(updateService(id, serviceData))
            clearData()
            handleClose()
        } else {
            dispatch(createService(serviceData))
            clearData()
            handleClose()
        }
    }

    return (
        <div className="container">
            <div className="">
                <Form>
                    <Form.Group controlId="formGridServiceName">
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control
                            value={serviceData?.serviceName}
                            type="text"
                            placeholder="Enter Service Name"
                            onChange={(e) => {
                                setServiceData({
                                    ...serviceData,
                                    serviceName: e.target.value,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridServiceDetail">
                        <Form.Label>Service Detail</Form.Label>
                        <Form.Control
                            value={serviceData?.serviceDetail}
                            as="textarea"
                            placeholder="Enter Service Detail"
                            onChange={(e) => {
                                setServiceData({
                                    ...serviceData,
                                    serviceDetail: e.target.value,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridServiceIsActive">
                        <Form.Label>Is Active</Form.Label>

                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={serviceData?.isActive}
                            onChange={(e) => {
                                setServiceData({
                                    ...serviceData,
                                    isActive: e.target.checked,
                                })
                            }}
                        />
                    </Form.Group>

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
                </Form>
            </div>
        </div>
    )
}

export default AddUpdateService
