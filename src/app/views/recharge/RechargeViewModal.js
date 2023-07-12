import { useEffect } from "react"
import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { statusOfApi } from "app/constants/constant"
import { updateRecharge } from "./store/action"
import { useDispatch } from "react-redux"

const RechargeViewModal = (props) => {
  console.log({ props })
  const dispatch = useDispatch()

  const [discountInfo, setDiscountInfo] = useState({
    requestAmount: 0,
    remark: "",
    status: "success",
    id: "",
  })
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    console.log(props.discountInfo)
    setDiscountInfo({
      requestAmount: props?.discountInfo?.transactionData?.requestAmount,
      remark: props?.discountInfo?.transactionData?.remark,
      status: props?.discountInfo?.status,
      id: props?.discountInfo?._id,
    })
  }, [props.discountInfo])

  const handleClose = () => {
    props.onCloseDiscountModal()
  }

  const handleSaveAndClose = () => {
    setSaveLoading(true)
    if (props.isDiscountEdit) {
      let payload = {
        status: discountInfo?.status,
        rechargeId: discountInfo?.id,
      }

      dispatch(
        updateRecharge(discountInfo?.id, payload, (result) => {
          props.onCloseDiscountModal(true)
          props.fetchTransactionList()
        })
      )
    }
    setSaveLoading(false)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setDiscountInfo((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Modal
      show={props.isShowDiscountModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.isDiscountEdit ? "Edit" : "Add"} Recharge
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="requestAmount">
            Request Amount
          </label>
          <div className="col-sm-10">
            <input
              disabled
              type="text"
              name="requestAmount"
              onChange={handleChange}
              value={discountInfo?.requestAmount}
              className="form-control"
            />
          </div>
        </div>
        <div className="mt-3 form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="remark">
            remark
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="remark"
              onChange={handleChange}
              value={discountInfo?.remark}
              className="form-control"
            />
          </div>
        </div>
        {/* <div className="mt-3 form-group row">
                    <label
                        className="col-sm-2 col-form-label"
                        htmlFor="accountDetail"
                    >
                        Account Detail
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            name="accountDetail"
                            onChange={handleChange}
                            value={discountInfo?.accountDetail}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="mt-3 form-group row">
                    <label
                        className="col-sm-2 col-form-label"
                        htmlFor="ifscCode"
                    >
                        IFSC Code
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            name="ifscCode"
                            onChange={handleChange}
                            value={discountInfo?.ifscCode}
                            className="form-control"
                        />
                    </div>
                </div> */}
        <div className="mt-3 form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="status">
            Status
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              name="status"
              onChange={handleChange}
              id="status"
              required={true}
              value={discountInfo?.status}
            >
              {statusOfApi.map((stts) => {
                return (
                  <option key={stts._id} value={stts._id}>
                    {stts.name}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          // disabled={
          //     saveLoading ||
          //     !discountInfo?.ifscCode ||
          //     !discountInfo?.bankId ||
          //     !discountInfo?.accountName ||
          //     !discountInfo?.accountNo
          // }
          onClick={handleSaveAndClose}
        >
          {saveLoading ? "Loading…" : "Save changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RechargeViewModal
