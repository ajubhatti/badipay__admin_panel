import React, { useEffect, useMemo, useState } from "react"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import { discountServices } from "app/services/discount.service"
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import CustomTable from "app/components/Tables/CustomTable"
import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../../api-settings/services-listing/store/action"
import { getApiList } from "app/views/api-settings/apis/store/action"
import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import {
  editDiscount,
  getDiscountList,
  setPageDiscount,
  setSizePerPageDiscount,
  setSortFieldOfDiscount,
  setSortOrderOfDiscount,
} from "./store/action"
import DiscountModalNew from "./DiscountModalNew"
import ReactLoaderSpinner from "app/components/LoadingSpinner/ReactLoaderSpinner"
import { sizePerPageList } from "../../../constants/table"

const DiscountOnRecharge = () => {
  const dispatch = useDispatch()
  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const { discountList, page, sizePerPage, totalSize } = useSelector(
    (state) => state.discount
  )

  const [isShowLoader, setIsShowLoader] = useState(false)
  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)
  const [discountInfo, setdDiscountInfo] = useState([])
  const [discounts, setdDiscounts] = useState([])
  const [apis, setApis] = useState([])
  const [services, setServices] = useState([])
  const [searchData, setSearchData] = useState({
    page: 1,
    limits: 25,
    sortBy: "created",
    orderBy: "DESC",
    skip: 0,
    search: "",
    api: "",
    services: "",
    status: "",
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
    setSearchData((prev) => ({
      ...prev,
      page: page,
      limits: sizePerPage,
    }))
  }, [sizePerPage, page])

  const columns = [
    {
      dataField: "discountData._id",
      text: "No",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div className="align-middle">
          {sizePerPage * (page - 1) + rowIndex + 1}
        </div>
      ),
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
    setServices(service)
  }, [serviceList])

  const handleAddDiscount = async () => {
    setIsShowLoader(true)
    await discountServices.AddDiscountbyScan().then((res) => {
      dispatch(getDiscountList(searchData))
      setIsShowLoader(false)
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
    setIsShowConfirmModal(true)
    setdDiscountInfo(info)
  }

  const handleDelete = async () => {
    await discountServices.resetDiscountById(discountInfo._id).then((res) => {
      if (res.status === 200) {
        setIsShowConfirmModal(false)
        dispatch(getDiscountList(searchData))
      }
    })
  }

  const onCloseDeleteDiscountConfirmModal = () => {
    setIsShowConfirmModal(false)
  }

  const handleSaveDiscountModal = async (data) => {
    setIsShowLoader(true)

    dispatch(
      editDiscount(data._id, data, (cbData) => {
        dispatch(getDiscountList(searchData))
        setIsShowLoader(false)
      })
    )
    setIsShowDiscountModal(false)
  }

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(setSortFieldOfDiscount(sortField))
        dispatch(setSortOrderOfDiscount(sortOrder.toUpperCase()))
        break
      case "pagination":
        dispatch(setPageDiscount(page))
        dispatch(setSizePerPageDiscount(sizePerPage))
        break
      default:
        break
    }
  }

  return (
    <div>
      {isShowLoader ? (
        <div className="center-loader">
          <ReactLoaderSpinner />
        </div>
      ) : (
        <div className="container-fluid w-100 mt-3">
          <div className="row">
            <div className="col-lg-12 justify-content-between d-flex">
              <h6 className="main-heading">Discount List</h6>
              <button
                className={`ms-2 btn btn-secondary btn-sm`}
                type="button"
                onClick={handleAddDiscount}
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 d-flex">
                      <div className="col-md-6 d-flex">
                        <div className="me-2">
                          <ReactSelect
                            isClearable
                            className="mb-2"
                            placeHolder={"Select Api"}
                            title={"Api"}
                            handleChange={(e) => {
                              setSearchData({
                                ...searchData,
                                apis: e,
                              })
                            }}
                            options={apis}
                            selectedValue={searchData?.apis}
                          />
                        </div>
                        <div className="me-2">
                          <ReactSelect
                            className="mb-2"
                            isClearable
                            placeHolder={"Select Service"}
                            title={"Service"}
                            handleChange={(e) => {
                              setSearchData({
                                ...searchData,
                                provider: e,
                              })
                            }}
                            options={services}
                            selectedValue={searchData?.provider}
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="m-0" />
                    <div className="col-md-12">
                      {
                        <CustomTable
                          pageOptions={pageOptions}
                          showAddButton={false}
                          keyField="_id"
                          data={discounts}
                          columns={columns}
                          showSearch={false}
                          withPagination={true}
                          onTableChange={onTableChange}
                          loading={isShowLoader}
                          withCard={false}
                        ></CustomTable>
                      }
                    </div>
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
            />
          )}

          {isShowConfirmModal && (
            <ConfirmModal
              title="Are you sure ?"
              description="Are you sure you want to delete ?"
              handleDelete={handleDelete}
              isShowConfirmModal={isShowConfirmModal}
              onCloseConfirmModal={onCloseDeleteDiscountConfirmModal}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default DiscountOnRecharge
