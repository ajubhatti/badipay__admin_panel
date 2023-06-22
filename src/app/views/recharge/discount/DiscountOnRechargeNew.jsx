import CustomLoader from "app/components/CustomLoader/CustomLoader"
import React, { useEffect, useState } from "react"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"

import { discountServices } from "app/services/discount.service"
import {
  AiFillDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai"
import CustomTable from "app/components/Tables/CustomTable"
import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../../api-settings/services-listing/store/action"
import { getApiList } from "app/views/api-settings/apis/store/action"
import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import { editDiscount, getDiscountList } from "./store/action"
import DiscountModalNew from "./DiscountModalNew"

const DiscountOnRechargeNew = () => {
  const dispatch = useDispatch()
  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const { discountList } = useSelector((state) => state.discount)

  const [isShowLoader, setIsShowLoader] = useState(false)
  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
  const [
    isShowDeleteDiscountConfirmModal,
    setIsShowDeleteDiscountConfirmModal,
  ] = useState(false)
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)

  const [selectedProviderIndex, setSelectedProviderIndex] = useState("")
  const [selectedServiceIndex, setSelectedServiceIndex] = useState("")
  const [discountModalSave, setDiscountModalSave] = useState(false)

  const [discountInfo, setdDiscountInfo] = useState([])
  const [discounts, setdDiscounts] = useState([])

  const [apis, setApis] = useState([])
  const [services, setServices] = useState([])
  const [isShowDiscountData, setIsShowDiscountData] = useState(true)
  const [loading, setLoading] = useState(false)

  const [searchData, setSearchData] = useState({})

  const columns = [
    {
      dataField: "discountData._id",
      text: "Sr No.",
      headerStyle: () => {
        return { width: "5%" }
      },
      formatter: (cellContent, row, index) => {
        return <span>{index + 1}</span>
      },
    },
    {
      dataField: "operatorData.operatorName",
      text: "Operator Name",
    },
    {
      dataField: "serviceData.serviceName",
      text: "service Name",
    },
    {
      dataField: "apiData.apiName",
      text: "Api Name",
    },
    {
      dataField: "adminDiscount",
      text: "Admin Discount",
    },
    {
      dataField: "adminDiscountType",
      text: "Discount Type",
    },
    {
      dataField: "userDiscount",
      text: "User Discount",
    },
    {
      dataField: "userDiscountLimit",
      text: "Discount Limit",
    },
    {
      dataField: "userDiscountType",
      text: "Discount Type",
    },
    {
      dataField: "referalDiscount",
      text: "Referal Discount",
    },
    {
      dataField: "referalDiscountLimit",
      text: "Discount Limit",
    },
    {
      dataField: "referalDiscountType",
      text: "Discount Type",
    },
    {
      text: "Action",
      formatter: (cell, row) => (
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
          <button
            type="button"
            className="btn text-danger btn-sm"
            title="Delete"
            size="sm"
            onClick={() => handleDiscountDelete(row)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    dispatch(getDiscountList(searchData))
  }, [searchData, dispatch])

  useEffect(() => {
    setdDiscounts(discountList)
  }, [discountList])

  useEffect(() => {
    dispatch(getApiList())
    dispatch(getServices())
  }, [dispatch])

  useEffect(() => {
    let api = []
    api = apisList
      .filter((api) => {
        return api.isActive
      })
      .map(function (api) {
        return { value: api._id, label: api.apiName }
      })
    api.unshift({ value: 0, label: "Select Api" })
    setApis(api)
  }, [apisList])

  useEffect(() => {
    let service = []
    service = serviceList
      .filter((service) => {
        return service.isActive
      })
      .map(function (service) {
        return { value: service._id, label: service.serviceName }
      })
    service.unshift({ value: 0, label: "Select Service" })
    setServices(service)
  }, [serviceList])

  const getAllDiscounts = async (params) => {
    setIsShowLoader(true)
    await discountServices.getAllDiscount(params).then((res) => {
      setdDiscounts(res.data?.data)
      setIsShowDiscountData(true)
      setIsShowLoader(false)
    })
  }

  const handleAddDiscount = async () => {
    await discountServices.AddDiscountbyScan().then((res) => {
      console.log({ res })
    })
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

  const handleDiscountDelete = (info) => {
    setIsShowDeleteDiscountConfirmModal(true)
    setdDiscountInfo(info)
  }

  const handleDelete = async () => {
    await discountServices.deleteDiscount(discountInfo._id).then((res) => {
      if (res.status == "200") {
        setIsShowDeleteDiscountConfirmModal(false)
        getAllDiscounts({
          apiId: selectedProviderIndex,
          serviceId: selectedServiceIndex,
        })
      }
    })
  }

  const onCloseDeleteDiscountConfirmModal = () => {
    setIsShowDeleteDiscountConfirmModal(false)
  }

  const handleSaveDiscountModal = async (data) => {
    console.log({ data })
    setIsShowLoader(true)
    setDiscountModalSave(true)

    dispatch(
      editDiscount(data._id, data, (cbData) => {
        dispatch(getDiscountList(searchData))
      })
    )
    setIsShowDiscountModal(false)
  }

  return (
    <div>
      {isShowLoader && <CustomLoader />}

      <div className="container-fluid w-100 mt-3">
        <div className="row">
          <div className="col-lg-12 justify-content-between d-flex">
            <h2 className="main-heading">Discount List</h2>
            <button
              className={`ms-2 btn btn-secondary`}
              type="button"
              onClick={handleAddDiscount}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header">
              <h6> Search Filters</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 d-flex">
                  <div className="col-md-6 d-flex">
                    <div className="me-2">
                      <ReactSelect
                        isClearable
                        placeHolder={"Select Services"}
                        title={"Services"}
                        handleChange={(e) => {
                          setSearchData({
                            ...searchData,
                            apis: e,
                          })
                        }}
                        options={apis}
                        value={searchData.apis}
                      />
                    </div>
                    <div className="me-2">
                      <ReactSelect
                        isClearable
                        placeHolder={"Select Operator"}
                        title={"Operator"}
                        handleChange={(e) => {
                          setSearchData({
                            ...searchData,
                            provider: e,
                          })
                        }}
                        value={searchData.provider}
                        options={services}
                      />
                    </div>
                    {/* <button
                      className={`btn btn-primary`}
                      onClick={handleFilter}
                    >
                      <AiOutlineSearch />
                    </button> */}
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {isShowDiscountData && (
                    <CustomTable
                      showAddButton={false}
                      keyField="_id"
                      data={discounts}
                      columns={columns}
                      showSearch={false}
                      withPagination={false}
                      loading={loading}
                      withCard={false}
                    ></CustomTable>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isShowDiscountModal && (
          <DiscountModalNew
            discountInfo={discountInfo}
            isDiscountEdit={isDiscountEdit}
            isShowDiscountModal={isShowDiscountModal}
            onCloseDiscountModal={handleDiscountClose}
            onSaveDiscountModal={handleSaveDiscountModal}
            selectedServiceIndex={selectedServiceIndex}
            discountModalSave={discountModalSave}
          />
        )}

        {isShowDeleteDiscountConfirmModal && (
          <ConfirmModal
            title="Are you sure ?"
            description="Are you sure you want to delete ?"
            handleDelete={handleDelete}
            isShowConfirmModal={isShowDeleteDiscountConfirmModal}
            onCloseConfirmModal={onCloseDeleteDiscountConfirmModal}
          />
        )}
      </div>
    </div>
  )
}

export default DiscountOnRechargeNew
