import { useEffect } from "react"
import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { statusOfApi } from "app/constants/constant"
import { transactionsService } from "app/services/transactions.service"

// const defaultDiscountInfo = {
//     accountName: "",
//     accountNo: "",
//     accountDetail: "",
//     bankId: "",
//     ifscCode: "",
// }

const CashBackViewModal = (props) => {
  const [discountInfo, setDiscountInfo] = useState({})
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    setDiscountInfo(props.discountInfo)
  }, [props.discountInfo])

  const handleClose = () => {
    props.onCloseDiscountModal()
  }

  const handleSaveAndClose = async () => {
    setSaveLoading(true)
    if (props.isDiscountEdit) {
      await transactionsService
        .updateTransaction(props?.discountInfo?._id, discountInfo)
        .then((res) => {
          props.onCloseDiscountModal(true)
          props.fetchCashBackList()
        })

      // updateTransactions(props.discountInfo._id, discountInfo).then(
      //     (res) => {
      //         // if (res.status === "200") {
      //         props.onCloseDiscountModal(true)
      //         // }
      //     }
      // )
    } else {
      // bankServices.bankAccountService
      //     .addBankAccount(discountInfo)
      //     .then((res) => {
      //         if (res.status === "200") {
      //             props.onCloseDiscountModal(true)
      //         }
      //     })
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
          {props.isDiscountEdit ? "Edit" : "Add"} Transaction
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="rechargeAmount">
            Recharge Amount
          </label>
          <div className="col-sm-10">
            <input
              disabled
              type="text"
              name="rechargeAmount"
              onChange={handleChange}
              value={discountInfo?.rechargeAmount}
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

export default CashBackViewModal
