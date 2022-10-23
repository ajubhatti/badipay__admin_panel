import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRechargeList, getTransactionsList } from './store/action'
import { AiFillEye } from 'react-icons/ai'
import { getStateList } from '../utilities/store/action'
import { getCompanies } from '../api-settings/company-listing/store/action'
import ReactBootstrapTable from 'app/components/ReactBootStrapTable/ReactBootstrapTable'
import moment from 'moment'

const Transactions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { transactionData } = useSelector((state) => state.recharge)
    const { stateList } = useSelector((state) => state.utilities)
    const { companyList } = useSelector((state) => state.company)
    const [transactionListData, setTransactionListData] = useState([])

    const GetActionFormat = (cell, row) => (
        <div>
            <button
                type="button"
                className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
                size="sm"
                onClick={() => handleView(cell, row)}
            >
                <AiFillEye />
            </button>
        </div>
    )

    console.log('transactionData', transactionData)
    const GetTime = (cell, row) =>
        moment(row?.created).format('DD-MM-YYYY HH:mm:ss')

    const columns = [
        {
            dataField: 'userdetail.email',
            text: 'user',
        },
        {
            dataField: 'amount',
            text: 'amount',
        },
        {
            dataField: 'status',
            text: 'status',
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

    const handleDelete = (cell, row) => {
        console.log('object delete:>> ', { cell, row })
    }

    const handleView = (cell, row) => {
        console.log('object view:>> ', { cell, row })
    }

    const handleEdit = (cell, row) => {
        navigate('/api-setting/api/add/' + row._id)
    }

    useEffect(() => {
        dispatch(getTransactionsList())
        dispatch(getStateList())
        dispatch(getCompanies())
    }, [dispatch])

    useEffect(() => {
        // if (stateList.length > 0 && transactionData.length > 0) {
        //     transactionData.map((x) => {
        //         let rslt = stateList.find((st) => st?._id === x?.state)
        //         return (x.stateName = rslt?.stateName || '')
        //     })
        // }
        // if (companyList.length > 0 && transactionData.length > 0) {
        //     transactionData.map((r) => {
        //         let rslt = companyList.find((c) => c?._id === r?.operator)
        //         return (r.operatorName = rslt?.companyName || '')
        //     })
        // }
        console.log('transactions :>> ', transactionData)
        if (transactionData) {
            setTransactionListData(transactionData?.transactions)
        }
    }, [transactionData, stateList, companyList])

    const viewDetail = () => {
        navigate('/api-setting/api/add')
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // console.log(e, row, rowIndex)
        },
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="main-heading">Transactions List</h2>
                </div>
            </div>
            {transactionListData && (
                <ReactBootstrapTable
                    tableData={transactionListData}
                    columns={columns}
                    rowEvents={rowEvents}
                />
            )}
        </div>
    )
}

export default Transactions
