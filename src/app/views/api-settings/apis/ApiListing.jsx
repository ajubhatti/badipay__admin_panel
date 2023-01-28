import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getApiList } from "./store/action"
import ReactBootstrapTable from "app/components/ReactBootStrapTable/ReactBootstrapTable"
import { Button, Form } from "react-bootstrap"
import {
    AiOutlineEdit,
    AiFillDelete,
    AiFillEye,
    AiOutlinePlus,
} from "react-icons/ai"

const ApiListing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { apisList, loading } = useSelector((state) => state.apis)
    const [apiListData, setApiListData] = useState([])

    const GetActionFormat = (cell, row) => (
        <div>
            <button
                type="button"
                className="btn btn-outline-primary btn-sm ts-buttom m-1"
                size="sm"
                onClick={() => handleEdit(cell, row)}
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
    )

    const columns = [
        {
            dataField: "apiName",
            text: "Api Name",
        },
        {
            dataField: "apiDetail",
            text: "Api Detail",
        },
        {
            dataField: "isActive",
            text: "Is Active",
        },
        {
            dataField: "apiImage",
            text: "Icon",
        },
        {
            dataField: "created",
            text: "Created At",
        },
        {
            text: "Action",
            dataField: "",
            formatter: GetActionFormat,
            classes: "p-1",
        },
    ]

    const handleDelete = (cell, row) => {
        console.log("object delete:>> ", { cell, row })
    }

    const handleView = (cell, row) => {
        console.log("object view:>> ", { cell, row })
    }

    const handleEdit = (cell, row) => {
        navigate("/api-setting/api/add/" + row._id)
    }

    useEffect(() => {
        dispatch(getApiList())
    }, [dispatch])

    useEffect(() => {
        setApiListData(apisList)
    }, [apisList])

    const addNewApi = () => {
        navigate("/api-setting/api/add")
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // console.log(e, row, rowIndex)
        },
    }

    console.log("loading", loading)

    return (
        <div className="container w-100">
            <div className="mb-3 justify-content-between d-flex">
                <div className="">
                    <Form.Label>Api List</Form.Label>
                </div>
                <div>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={() => addNewApi()}
                    >
                        <AiOutlinePlus />
                    </Button>
                </div>
            </div>
            <ReactBootstrapTable
                loading={loading}
                tableData={apiListData}
                columns={columns}
                rowEvents={rowEvents}
            />
        </div>
    )
}

export default ApiListing
