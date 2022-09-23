import ReactSelect from 'app/components/ReactDropDown/ReactSelect'
import { companyService } from 'app/services/company.service'
import { filter } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanies } from '../company-listing/store/action'
import { getServices } from '../services-listing/store/action'

const OperatorSwitching = () => {
    const dispatch = useDispatch()
    const { serviceList } = useSelector((state) => state.servicesList)
    const { companyList } = useSelector((state) => state.company)
    const [searchData, setCompanyData] = useState({})
    const [serviceMenuData, setServiceMenuData] = useState([])
    const [operatorMenuData, setOperatorMenuData] = useState([])
    const [selectedOperatorData, setSelectedOperatorData] = useState({})
    const [selectedOperatorDataId, setSelectedOperatorDataId] = useState('')

    useEffect(() => {
        if (serviceList && serviceList.length > 0) {
            let newService = serviceList.map((service) => ({
                value: service._id,
                label: service.serviceName,
            }))
            setServiceMenuData(newService)
        }
    }, [serviceList])

    useEffect(() => {
        dispatch(getServices())
        dispatch(getCompanies())
    }, [dispatch])

    useEffect(() => {
        let filteredData = companyList.filter(
            (x) => x.providerType === searchData.providerType
        )
        filteredData = filteredData.map((x) => ({
            value: x._id,
            label: x.companyName,
        }))

        setOperatorMenuData(filteredData)
    }, [companyList, searchData])

    const submitHandler = (e) => {
        let filteredData = companyList.find(
            (x) => x._id === searchData.operator
        )

        setSelectedOperatorDataId(filteredData?._id)
        setSelectedOperatorData(filteredData)
        e.preventDefault()
    }

    const handleOnChange = async (index, data, key, e) => {
        let selectedJson = selectedOperatorData.referenceApis[index]
        if (key === 'isActive') {
            selectedJson[key] = e.target.checked
        } else {
            selectedJson[key] = e.target.value
        }

        delete selectedOperatorData._id

        await companyService
            .updateCompany(selectedOperatorDataId, selectedOperatorData)
            .then((res) => {
                console.log('updateRes', res)
            })
    }

    const arraymove = (arr, fromIndex, toIndex) => {
        var element = arr[fromIndex]
        arr.splice(fromIndex, 1)
        arr.splice(toIndex, 0, element)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="main-heading">API PRIORITY</h2>
                </div>
                <div className="col-lg-12">
                    <div className="card rounded-0 mb-4">
                        <div className="card-header">
                            <h6> SEARCH FILTERS</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <Form
                                        onSubmit={submitHandler}
                                        className="select-operator"
                                    >
                                        <h5>Select Operator</h5>

                                        <div className="list-of-operator">
                                            <Form.Group controlId="formGridServic">
                                                <ReactSelect
                                                    title={'Services'}
                                                    handleChange={(e) => {
                                                        // setSelectedValue(e)
                                                        setCompanyData({
                                                            ...searchData,
                                                            providerType: e,
                                                        })
                                                    }}
                                                    options={serviceMenuData}
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="list-of-operator">
                                            <Form.Group controlId="formGridOperator">
                                                <ReactSelect
                                                    title={'Operator'}
                                                    handleChange={(e) => {
                                                        // setSelectedValue(e)
                                                        setCompanyData({
                                                            ...searchData,
                                                            operator: e,
                                                        })
                                                    }}
                                                    options={operatorMenuData}
                                                />
                                            </Form.Group>
                                        </div>
                                        <Button
                                            className="btn btn-md btn-primary"
                                            type="submit"
                                        >
                                            Search
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="card rounded-0">
                        <div className="card-header">
                            <h6> OPERATOR LIST</h6>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={submitHandler}>
                                        <div>
                                            <table className="table mb-4">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>NAME</th>
                                                        <th>PENDING LIMIT</th>
                                                        <th>TOTAL PENDING</th>
                                                        <th>PRIORITY</th>
                                                        <th>ENABLE/DISABLE</th>
                                                        <th>FAILURE LIMIT</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedOperatorData?.referenceApis?.map(
                                                        (x, index) => (
                                                            <tr key={x._id}>
                                                                <th scope="row">
                                                                    {index + 1}
                                                                </th>
                                                                <td>
                                                                    {x.apiName}
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <div>
                                                                            <input
                                                                                type="number"
                                                                                className="form-input"
                                                                                id="exampleCheck1"
                                                                                // onChange={(
                                                                                //     e
                                                                                // ) => {
                                                                                //     x.pendingLimit =
                                                                                //         e.target.value
                                                                                // }}
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    handleOnChange(
                                                                                        index,
                                                                                        x,
                                                                                        'pendingLimit',
                                                                                        e
                                                                                    )
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        0
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <input
                                                                            type="number"
                                                                            className="form-input"
                                                                            id="exampleCheck1"
                                                                            // onChange={(
                                                                            //     e
                                                                            // ) => {
                                                                            //     x.priority =
                                                                            //         e.target.value
                                                                            // }}
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleOnChange(
                                                                                    index,
                                                                                    x,
                                                                                    'priority',
                                                                                    e
                                                                                )
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input"
                                                                            id="exampleCheck1"
                                                                            // onChange={(
                                                                            //     e
                                                                            // ) => {
                                                                            //     x.isActive =
                                                                            //         e.target.value
                                                                            // }}

                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleOnChange(
                                                                                    index,
                                                                                    x,
                                                                                    'isActive',
                                                                                    e
                                                                                )
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <input
                                                                            type="number"
                                                                            className="form-input"
                                                                            id="exampleCheck1"
                                                                            // onChange={(
                                                                            //     e
                                                                            // ) => {
                                                                            //     x.failureLimit =
                                                                            //         e.target.value
                                                                            // }}
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleOnChange(
                                                                                    index,
                                                                                    x,
                                                                                    'failureLimit',
                                                                                    e
                                                                                )
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OperatorSwitching
