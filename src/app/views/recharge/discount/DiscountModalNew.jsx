import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"

const DiscountModalNew = (props) => {
  console.log({ props })
  const [discountInfo, setDiscountInfo] = useState({})

  useEffect(() => {
    setDiscountInfo(props.discountInfo)
  }, [props?.discountInfo])

  useEffect(() => {
    setDiscountInfo(props.discountInfo)
  }, [props.discountInfo])

  const handleClose = () => {
    props.onCloseDiscountModal()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setDiscountInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveDiscountModal = () => {
    props.onSaveDiscountModal(discountInfo)
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
          {props.isDiscountEdit ? "Edit" : "Add"} Discount
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="operatorId">
            Operator
          </label>
          <div className="col-sm-10">
            {discountInfo?.operatorData?.operatorName}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="operatorId">
            API
          </label>
          <div className="col-sm-10">{discountInfo?.apiData?.apiName}</div>
        </div>
        <div className="mt-3 form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="adminDiscount">
            Admin Discount
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="adminDiscount"
              onChange={handleChange}
              value={discountInfo?.adminDiscount}
              className="form-control"
            />
          </div>
        </div>
        <div className="mt-3 form-group row">
          <label
            className="col-sm-2 col-form-label"
            htmlFor="adminDiscountType"
          >
            Admin Discount Type
          </label>
          <div className="col-sm-10">
            <select
              name="adminDiscountType"
              onChange={handleChange}
              className="form-control"
              id="adminDiscountType"
              value={discountInfo?.adminDiscountType}
              defaultValue={discountInfo?.adminDiscountType}
            >
              <option value="" disabled>
                Select Admin Discount
              </option>
              <option value="number">Number</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>

        <div className="mt-3 form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="userDiscount">
            User Discount
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="userDiscount"
              onChange={handleChange}
              value={discountInfo?.userDiscount}
              className="form-control"
            />
          </div>
        </div>
        <div className="mt-3 form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="userDiscountType">
            User Discount Type
          </label>
          <div className="col-sm-10">
            <select
              name="userDiscountType"
              onChange={handleChange}
              className="form-control"
              id="userDiscountType"
              value={discountInfo?.userDiscountType}
              defaultValue={discountInfo?.userDiscountType}
            >
              <option value="" disabled>
                Select User Discount
              </option>
              <option value="number">Number</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>
        <div className="mt-3 form-group row">
          <label
            className="col-sm-2 col-form-label"
            htmlFor="userDiscountLimit"
          >
            Limit
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="userDiscountLimit"
              onChange={handleChange}
              value={discountInfo?.userDiscountLimit}
              className="form-control"
            />
          </div>
        </div>

        <div className="mt-3 form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="referalDiscount">
            Referal Discount
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="referalDiscount"
              onChange={handleChange}
              value={discountInfo?.referalDiscount}
              className="form-control"
            />
          </div>
        </div>
        <div className="mt-3 form-group row">
          <label
            className="col-sm-2 col-form-label"
            htmlFor="referalDiscountType"
          >
            Referal Discount Type
          </label>
          <div className="col-sm-10">
            <select
              name="referalDiscountType"
              onChange={handleChange}
              className="form-control"
              value={discountInfo?.referalDiscountType}
              defaultValue={discountInfo?.referalDiscountType}
            >
              <option value="" disabled>
                Select Referral Discount
              </option>
              <option value="number">Number</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>
        <div className="mt-3 form-group row">
          <label
            className="col-sm-2 col-form-label"
            htmlFor="referalDiscountLimit"
          >
            Referal Limit
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="referalDiscountLimit"
              onChange={handleChange}
              value={discountInfo?.referalDiscountLimit}
              className="form-control"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={handleSaveDiscountModal}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DiscountModalNew
