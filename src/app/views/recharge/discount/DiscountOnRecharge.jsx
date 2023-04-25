import CustomLoader from "app/components/CustomLoader/CustomLoader"
import React, { useEffect, useState } from "react"
import DiscountModal from "./DiscountModal"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"

import { discountServices } from "app/services/discount.service"
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai"
import CustomTable from "app/components/Tables/CustomTable"

const DiscountOnRecharge = () => {
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

  const [providers, setProviders] = useState([])
  const [services, setServices] = useState([])
  const [isShowDiscountData, setIsShowDiscountData] = useState(false)
  const [loading, setLoading] = useState(false)

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
      dataField: "companyName",
      text: "Company Name",
    },
    {
      dataField: "discountData.adminDiscount",
      text: "Admin Discount",
    },
    {
      dataField: "discountData.adminDiscountType",
      text: "Discount Type",
    },
    {
      dataField: "discountData.userDiscount",
      text: "User Discount",
    },
    {
      dataField: "discountData.userDiscountLimit",
      text: "Discount Limit",
    },
    {
      dataField: "discountData.userDiscountType",
      text: "Discount Type",
    },
    {
      dataField: "discountData.referalDiscount",
      text: "Referal Discount",
    },
    {
      dataField: "discountData.referalDiscountLimit",
      text: "Discount Limit",
    },
    {
      dataField: "discountData.referalDiscountType",
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

  const getAllProviders = async () => {
    setIsShowLoader(true)
    await discountServices.getAllApisAndServices().then((res) => {
      let provider = []
      provider = res?.apisResponse?.data?.data?.data
        .filter((provider) => {
          return provider.isActive
        })
        .map(function (provider) {
          return { value: provider._id, label: provider.apiName }
        })
      provider.unshift({ value: 0, label: "Select Provider" })
      setProviders(provider)

      let service = []
      service = res?.serviceResponse?.data?.data
        .filter((service) => {
          return service.isActive
        })
        .map(function (service) {
          return { value: service._id, label: service.serviceName }
        })
      service.unshift({ value: 0, label: "Select Service" })
      setServices(service)

      setIsShowLoader(false)
    })
  }

  useEffect(() => {
    getAllProviders()
  }, [])

  const getAllDiscounts = async (params) => {
    setIsShowLoader(true)
    await discountServices.getAllDiscount(params).then((res) => {
      setdDiscounts(res.data?.data)
      setIsShowDiscountData(true)
      setIsShowLoader(false)
    })
  }

  const handleAddDiscount = () => {
    setIsShowDiscountModal(true)
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

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "selectedProviderIndex") {
      setSelectedProviderIndex(value)
    } else {
      setSelectedServiceIndex(value)
    }
  }

  const handleFilter = () => {
    if (selectedProviderIndex !== "" && selectedServiceIndex !== "") {
      getAllDiscounts({
        apiId: selectedProviderIndex,
        serviceId: selectedServiceIndex,
      })
    }
  }

  const handleSaveDiscountModal = async (data) => {
    setIsShowLoader(true)
    setDiscountModalSave(true)
    data.apiId = selectedProviderIndex
    data.serviceId = selectedServiceIndex
    if (isDiscountEdit && data?._id) {
      await discountServices
        .updateDiscount(data._id, data)
        .then((res) => {
          getAllDiscounts(data)
          setIsShowLoader(false)
        })
        .catch((error) => {
          setIsShowLoader(false)
        })
    } else {
      await discountServices.addDiscount(data).then((res) => {
        getAllDiscounts(data)
        setIsShowLoader(false)
      })
    }
    setIsShowDiscountModal(false)
  }

  return (
    <div>
      {isShowLoader && <CustomLoader />}

      <div className="container-fluid w-100 mt-3">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="main-heading">Discount List</h2>
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
                      <select
                        name="selectedProviderIndex"
                        onChange={handleChange}
                        className="form-control"
                        id="selectedProviderIndex"
                      >
                        {providers.map((provider) => {
                          return (
                            <option key={provider.value} value={provider.value}>
                              {provider.label}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="me-2">
                      <select
                        name="selectedServiceIndex"
                        onChange={handleChange}
                        className="form-control"
                        id="selectedServiceIndex"
                      >
                        {services.map((service) => {
                          return (
                            <option key={service.value} value={service.value}>
                              {service.label}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <button
                      className={`btn btn-primary`}
                      onClick={handleFilter}
                    >
                      <AiOutlineSearch />
                    </button>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          {isShowDiscountData && (
            <>
              <div className="d-flex justify-content-end m-3">
                <button
                  className={`ms-2 btn btn-secondary`}
                  type="button"
                  onClick={handleAddDiscount}
                >
                  <AiOutlinePlus />
                </button>
              </div>

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

              {isShowDiscountModal && (
                <DiscountModal
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DiscountOnRecharge
