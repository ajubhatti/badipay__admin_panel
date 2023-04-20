import ReactBootstrapTable from "app/components/ReactBootStrapTable/ReactBootstrapTable"
import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import {
  AiOutlineEdit,
  AiFillDelete,
  AiFillEye,
  AiOutlinePlus,
} from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getApiList } from "../apis/store/action"
import { getCompanies } from "./store/action"

const OperatorListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { companyList } = useSelector((state) => state.company)
  const [companies, setCompanies] = useState([])

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

  const handleDelete = (cell, row) => {}

  const handleView = (cell, row) => {}

  const handleEdit = (cell, row) => {
    navigate("/api-setting/company/add/" + row._id)
  }

  const GetIsActiveSwitch = (cell, row) => (
    <div>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={row?.isActive}
        onChange={(e) => {
          // setServiceData({
          //     ...serviceData,
          //     isActive: e.target.checked,
          // })
        }}
      />
    </div>
  )

  const GetIsVisibleSwitch = (cell, row) => (
    <div>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={row?.isVisible}
        onChange={(e) => {
          // setServiceData({
          //     ...serviceData,
          //     isActive: e.target.checked,
          // })
        }}
      />
    </div>
  )

  const columns = [
    {
      dataField: "companyName",
      text: "Company Name",
    },
    {
      dataField: "companyDetail",
      text: "Company Detail",
    },
    {
      dataField: "isActive",
      text: "Is Active",
      formatter: GetIsActiveSwitch,
    },
    {
      dataField: "isVisible",
      text: "Is Visible",
      formatter: GetIsVisibleSwitch,
    },
    {
      dataField: "minAmount",
      text: "Min Amount",
    },
    {
      dataField: "maxAmount",
      text: "Max Amount",
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

  useEffect(() => {
    dispatch(getCompanies())
    dispatch(getApiList())
  }, [dispatch])

  useEffect(() => {
    setCompanies(companyList)
  }, [companyList])

  const rowEvents = {
    onClick: (e, row, rowIndex) => {},
  }

  const addNewOperator = () => {
    navigate("/api-setting/company/add")
  }

  return (
    <div className="container w-100">
      <div className="mb-3 justify-content-between d-flex">
        <div className="">
          <Form.Label>Company List</Form.Label>
        </div>
        <div>
          <Button
            variant="primary"
            type="button"
            onClick={() => addNewOperator()}
          >
            <AiOutlinePlus />
          </Button>
        </div>
      </div>
      <ReactBootstrapTable
        tableData={companies}
        columns={columns}
        rowEvents={rowEvents}
      />
    </div>
  )
}
export default OperatorListing
