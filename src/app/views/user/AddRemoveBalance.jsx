import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { walletServices } from "../../services/wallet.service"

const AddRemoveBalance = (props) => {
  const [open, setOpen] = useState(false)

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState(0)
  const [confirmAmount, setConfirmAmount] = useState(0)
  const [remarks, setRemarks] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setOpen(props.open)

    setUserName(props.userData.userName)
    setEmail(props.userData.email)
    setPhone(props.userData.phoneNumber)
  }, [props])

  function handleClose() {
    props.setOpen(false)
  }

  const handleSubmit = async (type) => {
    let payload = {
      userId: props.userData.id,
      type: type,
      amount: amount,
      remarks: remarks,
      password: password,
    }

    await walletServices.updateBalance(payload).then((res) => {
      handleClose()
      props.getAllusers()
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Name"
            type="text"
            fullWidth
            disabled
            defaultValue={props.userData.userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone no."
            type="text"
            fullWidth
            disabled
            defaultValue={props.userData.phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="currentAmount"
            label="current amount"
            type="text"
            fullWidth
            disabled
            defaultValue={props?.userData?.walletBalance}
            onChange={(e) => setBalance(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="addAmount"
            label="amount"
            type="text"
            fullWidth
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="confirmAmount"
            label="confirm amount"
            type="text"
            fullWidth
            onChange={(e) => setConfirmAmount(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Remarks"
            label="remarks"
            type="text"
            fullWidth
            onChange={(e) => setRemarks(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="text"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSubmit("add")}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleSubmit("remove")}
          >
            Remove
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddRemoveBalance
