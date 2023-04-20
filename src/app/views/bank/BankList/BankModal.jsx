import { useEffect } from "react"
import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { bankService } from "app/services/bank.service"

const defaultBankInfo = {
  bankName: "",
  bankDetail: "",
}

const BankModal = (props) => {
  const [bankInfo, setBankInfo] = useState(defaultBankInfo)
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    setBankInfo(props.bankInfo)
  }, [props.bankInfo])

  const handleClose = () => {
    props.onCloseBankModal()
  }

  const handleSaveAndClose = () => {
    setSaveLoading(true)
    if (props.isBankEdit) {
      bankService
        .updateBank(props.bankInfo._id, {
          bankDetail: bankInfo.bankDetail,
          bankName: bankInfo.bankName,
        })
        .then((res) => {
          if (res.status === 200) {
            props.onCloseBankModal(true)
          }
        })
    } else {
      bankService
        .addBank({
          bankDetail: bankInfo.bankDetail,
          bankName: bankInfo.bankName,
        })
        .then((res) => {
          if (res.status === 200) {
            props.onCloseBankModal(true)
          }
        })
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBankInfo((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Modal
      show={props.isShowBankModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.isBankEdit ? "Edit" : "Add"} Bank</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="bankName">
            Bank Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="bankName"
              onChange={handleChange}
              value={bankInfo?.bankName}
              className="form-control"
            />
          </div>
        </div>
        <div className="mt-3 form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="bankDetail">
            Bank Detail
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="bankDetail"
              onChange={handleChange}
              value={bankInfo?.bankDetail}
              className="form-control"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={saveLoading ? true : false}
          onClick={handleSaveAndClose}
        >
          {saveLoading ? "Loading…" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BankModal
