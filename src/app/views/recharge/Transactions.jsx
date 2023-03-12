import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    getTransactionsList,
    setPageTransactions,
    setSizePerPageTransactions,
    setSortFieldOfTransactions,
    setSortOrderOfTransactions,
} from "./store/action"
import {
    AiOutlineEdit,
    AiFillDelete,
    AiFillEye,
    AiOutlinePlus,
} from "react-icons/ai"
import { getStateList } from "../utilities/store/action"
import { getCompanies } from "../api-settings/company-listing/store/action"
import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import { Button } from "react-bootstrap"
import TransactionViewModal from "./TransactionViewModal"

const Transactions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        loading,
        page,
        sizePerPage,
        totalSize,
        search,
        sortField,
        sortOrder,
        transactionData,
        transactionList,
    } = useSelector((state) => state.recharge)

    const { stateList } = useSelector((state) => state.utilities)
    const { companyList } = useSelector((state) => state.company)
    const [transactionListData, setTransactionListData] = useState([])

    const [searchString, setSearchString] = useState("")
    const [dateRangeValue, setDateRangeValue] = useState({
        start: null,
        end: null,
    })

    const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
    const [discountInfo, setdDiscountInfo] = useState([])
    const [isDiscountEdit, setIsDiscountEdit] = useState(false)

    const [payloadData, setPayloadData] = useState({
        page: 1,
        limits: 20,
        sortBy: "created",
        orderBy: "desc",
        skip: 0,
        search: "",
        startDate: "", //"10-15-2022",
        endDate: "",
    })

    const pageOptions = useMemo(
        () => ({
            page,
            sizePerPage,
            totalSize,
            custom: true,
            sizePerPageList,
        }),
        [sizePerPage, totalSize, page]
    )

    useEffect(() => {
        setPayloadData((previousData) => ({
            ...previousData,
            page: page,
            limits: sizePerPage,
            sortBy: "created",
            orderBy: "desc",
            skip: 0,
            search: "",
        }))
    }, [sizePerPage, page])

    const handleFilterData = () => {
        setPayloadData((prev) => ({
            ...prev,
            search: searchString,
            startDate: dateRangeValue.start
                ? moment(dateRangeValue.start).format("MM-DD-YYYY")
                : "",
            endDate: dateRangeValue.end
                ? moment(dateRangeValue.end).format("MM-DD-YYYY")
                : "",
        }))
    }

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

    const GetTime = (cell, row) =>
        moment(row?.created).format("DD-MM-YYYY HH:mm:ss")

    // const columns = [
    //   {
    //     dataField: "userdetail.email",
    //     text: "User",
    //   },
    //   {
    //     dataField: "amount",
    //     text: "Amount",
    //   },
    //   {
    //     dataField: "status",
    //     text: "Status",
    //   },
    //   {
    //     dataField: "type",
    //     text: "Type",
    //   },
    //   {
    //     dataField: "transactionId",
    //     text: "Transaction Id",
    //   },
    //   {
    //     dataField: "created",
    //     text: "Created At",
    //     formatter: GetTime,
    //   },
    //   {
    //     text: "Action",
    //     dataField: "",
    //     formatter: GetActionFormat,
    //     classes: "p-1",
    //   },
    // ]

    const columns = useMemo(
        () => [
            {
                text: "No.",
                dataField: "no",
                headerStyle: (colum, colIndex) => ({
                    width: "10%",
                    textAlign: "center",
                }),

                // headerStyle: { width: "50px" },
                style: { height: "30px" },
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle">
                        {sizePerPage * (page - 1) + rowIndex + 1}
                    </div>
                ),
                sort: true,
            },
            {
                text: "Date",
                dataField: "created",
                sort: true,
                headerStyle: { width: "50px" },
                style: { height: "30px" },
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle">
                        {row?.created
                            ? moment(row?.created).format("DD/MM/YYYY hh:mm:ss")
                            : "-"}
                    </div>
                ),
            },
            {
                text: "User Name",
                dataField: "userDetail.userName",
                sort: true,
                headerStyle: { width: "50px" },
                style: { height: "30px" },
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.userDetail?.userName
                            ? row?.userDetail?.userName
                            : "-"}
                    </div>
                ),
            },
            {
                text: "Phone Number",
                dataField: "phoneNumber",
                sort: true,
                headerStyle: { width: "50px" },
                style: { height: "30px" },
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.userDetail?.phoneNumber
                            ? row?.userDetail?.phoneNumber
                            : "-"}
                    </div>
                ),
            },
            {
                text: "Transaction Id",
                dataField: "transactionId",
                sort: false,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div>{row?.transactionId ? row?.transactionId : "-"}</div>
                ),
            },
            {
                text: "Operator Id",
                dataField: "operatorId",
                sort: true,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.rechargeData?.OPRID
                            ? row?.rechargeData?.OPRID
                            : row?.rechargeData?.opid
                                ? row?.rechargeData?.opid
                                : "-"}
                    </div>
                ),
            },
            {
                text: "Operator Name",
                dataField: "operatorName",
                sort: true,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.rechargeData?.rechargeOperator?.companyName
                            ? row?.rechargeData?.rechargeOperator?.companyName
                            : "-"}
                    </div>
                ),
            },
            {
                text: "Api Name",
                dataField: "apiName",
                sort: true,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.rechargeData?.rechargeApi?.apiName
                            ? row?.rechargeData?.rechargeApi?.apiName
                            : "-"}
                    </div>
                ),
            },

            {
                text: "Customer No",
                dataField: "customerNo",
                sort: true,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.customerNo ? row?.customerNo : "-"}
                    </div>
                ),
            },

            {
                text: "Balance",
                dataField: "userBalance",
                sort: true,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.userBalance ? row?.userBalance : "-"}
                    </div>
                ),
            },
            {
                text: "Request Amount",
                dataField: "requestAmount",
                sort: true,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.requestAmount ? row?.requestAmount : "-"}
                    </div>
                ),
            },
            {
                text: "CashBack Amount",
                dataField: "cashBackAmount",
                sort: true,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.cashBackAmount ? row?.cashBackAmount : "-"}
                    </div>
                ),
            },
            {
                text: "Recharge Amount",
                dataField: "rechargeAmount",
                sort: true,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.rechargeAmount ? row?.rechargeAmount : "-"}
                    </div>
                ),
            },
            {
                text: "FinalBalance",
                dataField: "userFinalBalance",
                sort: true,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle ">
                        {row?.userFinalBalance ? row?.userFinalBalance : "-"}
                    </div>
                ),
            },
            {
                text: "remark",
                dataField: "remark",
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle">
                        <span>{!!row?.remark ? row?.remark : "-"}</span>
                    </div>
                ),
            },

            {
                text: "status",
                dataField: "status",
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div
                        className={`align-middle text-${
                            row?.status === "success"
                                ? "success"
                                : row?.status === "pending"
                                ? "warning"
                                : "danger"
                        }`}
                    >
                        <span
                            className={`text-capitalize text-white p-1 rounded bg-${
                                row?.status === "success"
                                    ? "success"
                                    : row?.status === "pending"
                                    ? "warning"
                                    : "danger"
                            }`}
                        >
                            {row?.status}
                        </span>
                    </div>
                ),
            },
            {
                text: "Action",
                dataField: "edit",
                sort: false,
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="d-flex">
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm ts-buttom m-1"
                            size="sm"
                            onClick={() => handleEdit(row)}
                        >
                            <AiOutlineEdit style={{ color: "green" }} />
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm ml-2 ts-buttom m-1"
                            size="sm"
                            onClick={() => handleDelete(cell, row)}
                        >
                            <AiFillDelete />
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
                            size="sm"
                            onClick={() => handleView(cell, row)}
                        >
                            <AiFillEye />
                        </button>
                    </div>
                ),
            },
        ],
        [page, sizePerPage]
    )

    const handleDelete = (cell, row) => {
        console.log("object delete:>> ", { cell, row })
    }

    const handleView = (cell, row) => {
        console.log("object view:>> ", { cell, row })
    }

    const handleDiscountClose = () => {
        setdDiscountInfo([])
        setIsDiscountEdit(false)
        setIsShowDiscountModal(false)
    }

    const handleEdit = (info) => {
        let tmpInfo = []
        tmpInfo._id = info?._id
        tmpInfo.discountData = info?.discountData
        setdDiscountInfo(info)
        setIsDiscountEdit(true)
        setIsShowDiscountModal(true)
    }

    // const handleEdit = (cell, row) => {
    //     console.log("edit ---", row)
    //     handleDiscountClose(true)
    //     setModalData(row)
    //     // navigate("/api-setting/api/add/" + row._id)
    // }

    useEffect(() => {
        // dispatch(getTransactionsList())
        dispatch(getStateList())
        dispatch(getCompanies())
    }, [dispatch])

    useEffect(() => {
        getTransactionList()
    }, [payloadData])

    const getTransactionList = () => {
        dispatch(getTransactionsList(payloadData))
    }

    useEffect(() => {
        if (transactionData) {
            setTransactionListData(transactionData?.transactions)
        }
    }, [transactionData, stateList, companyList])

    const viewDetail = () => {
        navigate("/api-setting/api/add")
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // console.log(e, row, rowIndex)
        },
    }

    const onTableChange = (
        type,
        { page, sizePerPage, sortField, sortOrder }
    ) => {
        switch (type) {
            case "sort":
                dispatch(setSortFieldOfTransactions(sortField))
                dispatch(setSortOrderOfTransactions(sortOrder.toUpperCase()))
                break
            case "pagination":
                dispatch(setPageTransactions(page))
                dispatch(setSizePerPageTransactions(sizePerPage))
                break
            default:
                break
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="main-heading">Transactions List</h2>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="card rounded-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <CustomTable
                                    showAddButton={false}
                                    pageOptions={pageOptions}
                                    keyField="transaction_id"
                                    data={transactionList}
                                    columns={columns}
                                    showSearch={false}
                                    onTableChange={onTableChange}
                                    withPagination={true}
                                    loading={loading}
                                    withCard={false}
                                ></CustomTable>

                                {isShowDiscountModal && (
                                    <TransactionViewModal
                                        discountInfo={discountInfo}
                                        isDiscountEdit={isDiscountEdit}
                                        isShowDiscountModal={
                                            isShowDiscountModal
                                        }
                                        onCloseDiscountModal={
                                            handleDiscountClose
                                        }
                                        fetchTransactionList={
                                            getTransactionList
                                        }
                                        // onSaveDiscountModal={handleSaveDiscountModal}
                                        // selectedServiceIndex={selectedServiceIndex}
                                        // discountModalSave={discountModalSave}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transactions
