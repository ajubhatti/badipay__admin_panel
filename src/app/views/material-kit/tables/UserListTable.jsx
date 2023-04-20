import React, { useEffect, useState } from "react"
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  Button,
  Fab,
  TablePagination,
} from "@mui/material"
import { Box, styled } from "@mui/system"
import { accountService } from "../../../services/account.service"
import AddUpdateUserDialog from "../../user/AddUpdateUserDialog"

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": {
      "& th": {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
  "& tbody": {
    "& tr": {
      "& td": {
        paddingLeft: 0,
        textTransform: "capitalize",
      },
    },
  },
}))

const UserListTable = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)
  const [usersList, setUsersList] = useState([])
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    getAllusers([])
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getAllusers = async () => {
    await accountService.getAll().then((res) => {
      setUsersList(res)
    })
  }

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }))

  const editUser = (data) => {
    setUserData(data)
    setOpen(true)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const changeStatus = (data) => {
    data.isActive = !data.isActive
    delete data.email
    delete data.role
    handleUpdate(data.id, data)
  }

  const handleUpdate = (id, data) => {
    accountService.update(id, data)
  }

  return (
    <>
      <Box width="100%" overflow="auto">
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Primary
        </StyledButton>
        {/* <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                >
                    Open form dialog
                </Button> */}
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>user Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((userData, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{userData.userName}</TableCell>
                  <TableCell align="left">{userData.phoneNumber}</TableCell>
                  <TableCell align="left">{userData.email}</TableCell>
                  <TableCell align="left">
                    {userData.isVerified ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    {userData.isActive ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Icon
                        color="error"
                        onClick={() => changeStatus(userData)}
                      >
                        {userData.isActive ? "close" : "check"}
                      </Icon>
                    </IconButton>
                    <IconButton>
                      <Icon onClick={() => editUser(userData)}>edit_icon</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>

        <TablePagination
          sx={{ px: 2 }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={usersList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <AddUpdateUserDialog setOpen={setOpen} open={open} userData={userData} />
    </>
  )
}

export default UserListTable
