import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getServices } from './store/action'
import ReactBootstrapTable from 'app/components/ReactBootStrapTable/ReactBootstrapTable'
import {
    AiOutlineEdit,
    AiFillDelete,
    AiFillEye,
    AiOutlinePlus,
} from 'react-icons/ai'
import { Button, Form } from 'react-bootstrap'

const ServiceList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { serviceList } = useSelector((state) => state.servicesList)
    const [serviceData, setServicesData] = useState([])

    const GetActionFormat = (cell, row) => (
        <div>
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
            <button
                type="button"
                className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
                size="sm"
                onClick={() => handleModelView(cell, row)}
            >
                <AiFillEye />
            </button>
        </div>
    )

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
            dataField: 'isActive',
            text: 'Is Active',
        },
        {
            dataField: 'iconImage',
            text: 'Icon',
        },
        {
            dataField: 'created',
            text: 'Created At',
        },
        {
            text: 'Action',
            dataField: '',
            formatter: GetActionFormat,
            classes: 'p-1',
        },
    ]

    const handleModelDelete = (cell, row) => {
        console.log('object delete:>> ', { cell, row })
    }

    const handleModelView = (cell, row) => {
        console.log('object view:>> ', { cell, row })
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
            <div className="mb-3 justify-content-between d-flex">
                <div className="">
                    <Form.Label>Service List</Form.Label>
                </div>
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
            <ReactBootstrapTable
                tableData={serviceData}
                columns={columns}
                rowEvents={rowEvents}
            />
        </div>
    )
}

export default ServiceList
