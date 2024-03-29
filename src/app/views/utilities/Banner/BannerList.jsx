import React, { useEffect, useMemo, useState } from "react"
import moment from "moment"
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import CustomTable from "app/components/Tables/CustomTable"
import CustomLoader from "app/components/CustomLoader/CustomLoader"
import BannerModal from "./BannerModal"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import { Button, Form, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getBannerList, removeBanner, updateBanner } from "../store/action"

const BannerList = () => {
  const dispatch = useDispatch()
  const [bannerList, setBannerList] = useState([])
  const [statusLoading, setStatusLoading] = useState(false)

  const [isShowLoader, setIsShowLoader] = useState(false)

  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [isShowBannerModal, setIsShowBannerModal] = useState(false)

  const [bannerInfo, setBannerInfo] = useState({})

  const [type, setType] = useState("Add")

  const { bannerListData } = useSelector((state) => state.utilities)

  useEffect(() => {
    dispatch(getBannerList())
  }, [dispatch])

  useEffect(() => {
    setBannerList(bannerListData)
  }, [bannerListData])

  const changeStatus = (data) => {
    let payload = {
      isActive: !data.isActive,
    }
    dispatch(updateBanner(data._id, payload))
  }

  const handleAddBanner = () => {
    setBannerInfo({})
    setIsShowBannerModal(true)
    setType("Add")
  }

  const handleEditBanner = (data) => {
    setBannerInfo(data)
    setType("Update")
    setIsShowBannerModal(true)
  }

  const handleRemoveBanner = (data) => {
    setBannerInfo(data)
    setIsShowConfirmModal(true)
  }

  const onCloseConfirmModal = () => {
    setIsShowConfirmModal(false)
  }

  const handleDelete = async () => {
    dispatch(
      removeBanner(bannerInfo._id, (res) => {
        if (res.status === 200) {
          dispatch(getBannerList())
        }
        setIsShowConfirmModal(false)
      })
    )
  }

  const ShowImage = (data) => {
    return <Image src={data} width={150} height={100} alt="" fluid />
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
    dispatch(updateBanner(data?._id, { isActive: isChecked }))
  }

  const columns = useMemo(
    () => [
      {
        text: "No",
        dataField: "no",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">{rowIndex + 1}</div>
        ),
      },
      {
        text: "Image",
        dataField: "banner",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{ShowImage(row.path)}</div>
        ),
      },
      {
        text: "description",
        dataField: "description",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.description || "-"}</div>
        ),
      },
      {
        text: "Created At",
        dataField: "created",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.created
              ? moment(row?.created).format("DD/MM/YYYY, HH:mm:ss")
              : "-"}
          </div>
        ),
      },
      {
        text: "Is Active",
        dataField: "isActive",
        formatter: GetIsActiveSwitch,
      },
      {
        text: "Action",
        dataField: "edit",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-sm"
              title="Edit"
              size="sm"
              onClick={() => handleEditBanner(row)}
            >
              <AiOutlineEdit />
            </button>
            <button
              type="button"
              className="btn text-danger btn-sm"
              title="Delete"
              size="sm"
              onClick={() => handleRemoveBanner(row)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [statusLoading]
  )

  return (
    <div className="container-fluid w-100 mt-3">
      {isShowLoader && <CustomLoader />}

      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">Banner List</h6>
          <button
            className={`ms-2 btn btn-secondary btn-sm`}
            type="button"
            onClick={handleAddBanner}
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
                <div className="col-md-12">
                  <CustomTable
                    showAddButton={false}
                    keyField="_id"
                    data={bannerList}
                    columns={columns}
                    showSearch={false}
                    withPagination={false}
                    loading={isShowLoader}
                    withCard={false}
                  ></CustomTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isShowBannerModal && (
        <BannerModal
          show={isShowBannerModal}
          onHide={() => setIsShowBannerModal(false)}
          data={bannerInfo}
          type={type}
        />
      )}

      {isShowConfirmModal && (
        <ConfirmModal
          title="Are you sure ?"
          description="Are you sure you want to delete ?"
          handleDelete={handleDelete}
          isShowConfirmModal={isShowConfirmModal}
          onCloseConfirmModal={onCloseConfirmModal}
        />
      )}
    </div>
  )
}

export default BannerList
