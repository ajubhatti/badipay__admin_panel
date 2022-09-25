import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editService, getServices } from './store/action'
import ReactBootstrapTable from 'app/components/ReactBootStrapTable/ReactBootstrapTable'
import { AiOutlineEdit, AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { Button, Form } from 'react-bootstrap'
import moment from 'moment'

const ServiceList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { serviceList } = useSelector((state) => state.servicesList)
    const [serviceData, setServicesData] = useState([])

    const GetActionFormat = (cell, row) => (
        <>
            <button
                type="button"
                className="btn btn-outline-primary btn-sm ts-buttom m-1"
                size="sm"
                onClick={() => handleModelEdit(cell, row)}
            >
                <AiOutlineEdit style={{ color: 'green' }} />
            </button>
            <button
                type="button"
                className="btn btn-outline-danger btn-sm ml-2 ts-buttom m-1"
                size="sm"
                onClick={() => handleModelDelete(cell, row)}
            >
                <AiFillDelete />
            </button>
        </>
    )

    const GetIsActiveSwitch = (cell, row) => (
        <Form.Check
            type="switch"
            id="isServiceActive"
            checked={row?.isActive}
            onChange={(e) => {
                handleUpdate(row, e.target.checked)
            }}
        />
    )

    const GetTime = (cell, row) => moment(row.created).format('DD-MM-YYYY')

    const columns = [
        {
            dataField: 'serviceName',
            text: 'service Name',
        },
        {
            dataField: 'serviceDetail',
            text: 'service Detail',
        },
        {
            dataField: 'title',
            text: 'Title',
        },
        {
            dataField: 'isActive',
            text: 'Is Active',
            formatter: GetIsActiveSwitch,
        },
        {
            dataField: 'iconImage',
            text: 'Icon',
        },
        {
            dataField: 'created',
            text: 'Created At',
            formatter: GetTime,
        },
        {
            text: 'Action',
            dataField: '',
            formatter: GetActionFormat,
            classes: 'p-1',
        },
    ]

    const handleUpdate = (data, isChecked) => {
        let payload = {
            isActive: isChecked,
            serviceDetail: data.serviceDetail,
            serviceName: data.serviceName,
            title: data.title,
        }

        dispatch(editService(data._id, payload))
        dispatch(getServices())
    }

    const handleModelDelete = (cell, row) => {
        console.log('object delete:>> ', { cell, row })
    }

    const handleModelEdit = (cell, row) => {
        navigate('/api-setting/service/add/' + row._id)
    }

    useEffect(() => {
        setServicesData(serviceList)
    }, [serviceList])

    useEffect(() => {
        dispatch(getServices())
    }, [dispatch])

    const addNewService = () => {
        navigate('/api-setting/service/add')
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // console.log(e, row, rowIndex)
        },
    }

    return (
        <div className="container w-100">
            <div className="container">
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-lg-12 justify-content-between d-flex">
                            <h2 className="main-heading">Service List</h2>
                            <div>
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => addNewService()}
                                >
                                    <AiOutlinePlus />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="card rounded-0 mb-4">
                        <div className="card-body">
                            <div className="row">
                                <ReactBootstrapTable
                                    tableData={serviceData}
                                    columns={columns}
                                    rowEvents={rowEvents}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceList
