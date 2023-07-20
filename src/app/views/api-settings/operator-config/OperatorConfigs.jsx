import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import CustomTable from "app/components/Tables/CustomTable"
import React, { useEffect, useMemo, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../services-listing/store/action"
import {
  addByScan,
  editOperatorConfig,
  fetchAllSPSlabs,
  getOperatorConfigList,
  setPageSlab,
  setSizePerPageSlab,
  setSortFieldOfSlab,
  setSortOrderOfSlab,
} from "./store/action"
import { sizePerPageList } from "../../../constants/table"
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import { getApiList } from "../apis/store/action"
import AddUpdateOperatorConfigModal from "./AddUpdateOperatorConfigModal"
import { getAllOperators } from "../operator-list/store/action"

const OperatorConfigs = () => {
  const dispatch = useDispatch()

  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const { operatorList } = useSelector((state) => state.operators)
  const { loading, page, sizePerPage, totalSize, operatorConfigList } =
    useSelector((state) => state.operatorConfig)

  const [apisDDData, setApisDDData] = useState([])
  const [serviceDDData, setServiceDDData] = useState([])
  const [operatorDDData, setOperatorDDData] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [companysData, setCompanysData] = useState([])
  const [type, setType] = useState("Add")
  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 25,
    sortBy: "created",
    orderBy: "DESC",
    skip: 0,
    search: "",
    startDate: "", //"10-15-2022",
    endDate: "",
  })

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(setSortFieldOfSlab(sortField))
        dispatch(setSortOrderOfSlab(sortOrder.toUpperCase()))
        break
      case "pagination":
        dispatch(setPageSlab(page))
        dispatch(setSizePerPageSlab(sizePerPage))
        break
      default:
        break
    }
  }
  useEffect(() => {
    setPayloadData((prev) => ({
      ...prev,
      page: page,
      limits: sizePerPage,
    }))
  }, [sizePerPage, page])

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
    dispatch(getServices())
    dispatch(getApiList())
    return () => {
      dispatch(fetchAllSPSlabs([]))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getOperatorConfigList(payloadData))
  }, [payloadData, dispatch])

  useEffect(() => {
    if (apisList && apisList.length > 0) {
      let newApi = apisList.map((api) => ({
        value: api._id,
        label: api.apiName,
      }))
      setApisDDData(newApi)
    }
  }, [apisList])

  useEffect(() => {
    if (serviceList && serviceList.length > 0) {
      let newService = serviceList.map((service) => ({
        value: service._id,
        label: service.serviceName,
      }))
      setServiceDDData(newService)
    }
  }, [serviceList])

  useEffect(() => {
    const fetchOperator = () => {
      dispatch(getAllOperators({ serviceId: payloadData.service }))
    }
    fetchOperator()
  }, [dispatch, payloadData.service])

  useEffect(() => {
    if (operatorList && operatorList.length) {
      let filterOperator = operatorList.map((x) => ({
        value: x._id,
        label: x.operatorName,
      }))
      setOperatorDDData(filterOperator)
    }
  }, [operatorList])

  const addSlab = () => {
    dispatch(
      addByScan(() => {
        fetchRefreshData()
      })
    )
  }

  const handleEdit = (row) => {
    setModalShow(true)
    setType("Update")
    setCompanysData(row)
  }

  const fetchRefreshData = () => {
    dispatch(getOperatorConfigList(payloadData))
  }

  const GetIsActiveSwitch = (cell, row) => (
    <Form.Check
      type="switch"
      id="isVerifiedSwitch"
      className="cursor-pointer"
      checked={row?.isActive}
      onChange={(e) => {
        changeVerifiactionStatus(row, e.target.checked)
      }}
    />
  )

  const changeVerifiactionStatus = async (data, isChecked) => {
    dispatch(
      editOperatorConfig(data?._id, { isActive: isChecked }, (cbData) => {
        fetchRefreshData()
      })
    )
  }

  const columns = useMemo(
    () => [
      {
        text: "No",
        dataField: "no",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {sizePerPage && page
              ? sizePerPage * (page - 1) + rowIndex + 1
              : rowIndex + 1}
          </div>
        ),
      },
      {
        text: "Company Data",
        dataField: "operatorData",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.operatorData?.operatorName
              ? row?.operatorData?.operatorName
              : "-"}
          </div>
        ),
      },
      {
        text: "Service Type",
        dataField: "serviceData",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.serviceData?.serviceName
              ? row?.serviceData?.serviceName
              : "-"}
          </div>
        ),
      },
      {
        text: "Api ",
        dataField: "apiData",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.apiData?.apiName ? row?.apiData?.apiName : "-"}
          </div>
        ),
      },
      {
        text: "apiCode",
        dataField: "apiCode",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.apiCode ? row?.apiCode : "-"}
          </div>
        ),
      },
      {
        text: "priority",
        dataField: "priority",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.priority ? row?.priority : "-"}
          </div>
        ),
      },
      {
        text: "Is Active",
        dataField: "isActive",
        formatter: GetIsActiveSwitch,
      },
      {
        dataField: "",
        text: "Action",
        classes: "p-1",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-sm"
              title="Edit"
              size="sm"
              onClick={() => handleEdit(row)}
            >
              <AiOutlineEdit style={{ color: "green" }} />
            </button>
          </div>
        ),
      },
    ],
    [page, sizePerPage]
  )

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">Operator configuration</h6>
          <Button
            className={`ms-2 btn btn-secondary btn-sm`}
            variant="secondary"
            onClick={() => addSlab()}
          >
            <AiOutlinePlus />
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-12 d-flex">
                  <div className="list-of-operator m-2">
                    <ReactSelect
                      isClearable={true}
                      title={"Apis"}
                      placeHolder={"select api"}
                      handleChange={(e) => {
                        setPayloadData({
                          ...payloadData,
                          apis: e,
                        })
                      }}
                      options={apisDDData}
                      selectedValue={payloadData?.apis}
                    />
                  </div>

                  <div className="list-of-operator m-2">
                    <ReactSelect
                      isClearable={true}
                      placeHolder={"select services"}
                      title={"services"}
                      handleChange={(e) => {
                        setPayloadData({
                          ...payloadData,
                          service: e,
                        })
                      }}
                      options={serviceDDData}
                      selectedValue={payloadData?.provider}
                    />
                  </div>

                  <div className="list-of-operator m-2">
                    <ReactSelect
                      isClearable={true}
                      title={"Operator"}
                      placeHolder={"select operator"}
                      handleChange={(e) => {
                        setPayloadData({
                          ...payloadData,
                          operator: e,
                        })
                      }}
                      options={operatorDDData}
                      selectedValue={payloadData?.operator}
                    />
                  </div>
                </div>
                <hr className="m-0" />
                <div className="col-md-12">
                  <CustomTable
                    showAddButton={false}
                    pageOptions={pageOptions}
                    keyField="_id"
                    data={operatorConfigList}
                    columns={columns}
                    showSearch={false}
                    onTableChange={onTableChange}
                    withPagination={true}
                    loading={loading}
                    withCard={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalShow && (
        <AddUpdateOperatorConfigModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={companysData}
          type={type}
          fetchRefreshData={fetchRefreshData}
        />
      )}
    </div>
  )
}

export default OperatorConfigs
