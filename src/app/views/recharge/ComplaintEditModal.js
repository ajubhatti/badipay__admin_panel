import { useEffect } from "react"
import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { statusOfApi, statusOfComplaints } from "app/constants/constant"
import { updateComplaints, updateRecharge } from "./store/action"
import { useDispatch } from "react-redux"

const ComplaintEditModal = (props) => {
  const dispatch = useDispatch()

  const [discountInfo, setDiscountInfo] = useState({
    requestAmount: 0,
    status: "success",
    id: "",
  })
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    setDiscountInfo({
      requestAmount: props?.discountInfo?.transactionData?.requestAmount,
      status: props?.discountInfo?.status,
      id: props?.discountInfo?._id,
    })
  }, [props.discountInfo])

  const handleClose = () => {
    props.onCloseDiscountModal()
  }

  const handleSaveAndClose = () => {
    setSaveLoading(true)

    let payload = {
      status: discountInfo?.status,
      id: discountInfo?.id,
    }

    console.log({ payload })

    dispatch(
      updateComplaints(payload, (result) => {
        props.onCloseDiscountModal(true)
        props.fetchTransactionList()
      })
    )

    setSaveLoading(false)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setDiscountInfo((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Modal
      show={props.isShowComplainModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Complaints</Modal.Title>
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
              {statusOfComplaints.map((stts) => {
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
        <Button variant="primary" onClick={handleSaveAndClose}>
          {saveLoading ? "Loading…" : "Save changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ComplaintEditModal
