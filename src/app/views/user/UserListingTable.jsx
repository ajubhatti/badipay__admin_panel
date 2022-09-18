import React, { useEffect, useState } from 'react'
import { Paragraph } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    MenuItem,
    Select,
    Button,
    Fab,
    TablePagination,
} from '@mui/material'

import { accountService } from '../../services/account.service'
import AddUpdateUserDialog from './AddUpdateUserDialog'
import { CSVLink, CSVDownload } from 'react-csv'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import DateRangePick from '../material-kit/dates/DateRangePick'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import AddRemoveBalance from '../material-kit/dialog/AddRemoveBalance'

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const UserTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        height: 15,
        width: 50,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const UserListingTable = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [usersList, setUsersList] = useState([])
    const [userModelOpen, setUserModelOpen] = useState(false)
    const [userData, setUserData] = useState({})
    const [downloadType, setDownloadType] = useState('csv')
    const [userType, setUserType] = useState('user')
    const [selectedDates, setSelectedDates] = useState([])
    const [searchText, setSearchText] = useState('')
    const [addRemoveModelOpen, setAddRemoveModelOpen] = useState(false)
    const [modelTitle, setModelTitle] = useState('Add balance')
    const [userModelTitle, setUserModelTitle] = useState('New User')
    const [addRemoveModelType, setAddRemoveModelType] = useState('add')

    useEffect(() => {
        getAllusers()
    }, [userType, selectedDates, searchText])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const getAllusers = async () => {
        let startDate = moment(selectedDates[0]).format('YYYY-MM-DD')
        let endDate = moment(selectedDates[1]).format('YYYY-MM-DD')

        let payload = {
            role: userType,
        }
        if (searchText != '') {
            payload.searchParams = searchText
        }
        if (selectedDates.length > 0) {
            payload.startDate = startDate
            payload.endDate = endDate
        }

        await accountService.getAll(payload).then((res) => {
            console.log('res ---', res)
            setUsersList(res?.data)
        })
    }

    const StyledButton = styled(Button)(({ theme }) => ({
        margin: theme.spacing(1),
    }))

    const editUser = (data) => {
        setUserData(data)
        setUserModelOpen(true)
        setUserModelTitle('Update user')
    }

    const viewUser = (data) => {
        setUserData(data)
        setUserModelOpen(true)
        setUserModelTitle('User information')
    }

    const addBalance = (data) => {
        setUserData(data)
        setModelTitle('Add balance')
        setAddRemoveModelOpen(true)
        setAddRemoveModelType('add')
    }

    const removeBalance = (data) => {
        setUserData(data)
        setModelTitle('Remove balance')
        setAddRemoveModelOpen(true)
        setAddRemoveModelType('remove')
    }

    const handleClickOpen = () => {
        setUserModelOpen(true)
    }

    const handleClose = () => {
        setUserModelOpen(false)
    }

    const changeStatus = (data) => {
        console.log(data)
        data.isActive = !data.isActive
        delete data.email
        delete data.role
        handleUpdate(data.id, data)
    }

    const handleUpdate = async (id, data) => {
        console.log('payload ==', data)
        await accountService.update(id, data).then((res) => {
            console.log('update res --', res)
            getAllusers()
        })
    }

    const exportPDF = () => {
        const unit = 'pt'
        const size = 'A4' // Use A1, A2, A3 or A4
        const orientation = 'portrait' // portrait or landscape

        const marginLeft = 40
        const doc = new jsPDF(orientation, unit, size)

        doc.setFontSize(15)

        const title = 'User Report'
        const headers = [
            [
                'user Name',
                'phone',
                'email',
                'location',
                'balance',
                'status',
                'created at',
            ],
        ]

        const data = usersList.map((elt) => [
            elt.userName,
            elt.phoneNumber,
            elt.email,
            elt.location,
            elt.balance,
            elt.isActive,
            elt.createdAt,
        ])

        let content = {
            startY: 50,
            head: headers,
            body: data,
            theme: 'grid',
        }

        doc.text(title, marginLeft, 40)
        doc.autoTable(content)
        doc.save('report.pdf')
    }

    const handleChange = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>Users List</Title>
                <Select
                    size="small"
                    defaultValue={downloadType}
                    onChange={(e) => setDownloadType(e.target.value)}
                >
                    <MenuItem value="csv">csv</MenuItem>
                    <MenuItem value="pdf">pdf</MenuItem>
                </Select>

                {downloadType == 'csv' ? (
                    <CSVLink filename={'user data.csv'} data={usersList}>
                        <Fab
                            size="small"
                            color="secondary"
                            aria-label="Add"
                            className="button"
                        >
                            <Icon>get_app</Icon>
                        </Fab>
                    </CSVLink>
                ) : (
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        className="button"
                        onClick={() => {
                            exportPDF()
                        }}
                    >
                        <Icon>get_app</Icon>
                    </Fab>
                )}

                <TextField
                    type="text"
                    name="serchtext"
                    id="standard-basic"
                    onChange={(e) => handleChange(e)}
                    value={searchText || ''}
                    label="search text"
                />

                <DateRangePick
                    setDateValue={(data) => setSelectedDates(data)}
                />
                <Select
                    size="small"
                    defaultValue={userType}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <MenuItem value="user">user</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                </Select>

                <Select size="small" defaultValue="all">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Last Month</MenuItem>
                </Select>

                <Fab
                    size="small"
                    color="secondary"
                    aria-label="Add"
                    className="button"
                    onClick={() => {
                        setUserModelOpen(true)
                        setUserData({})
                    }}
                >
                    <Icon>add</Icon>
                </Fab>
            </CardHeader>
            <Box overflow="auto" sx={{ pt: '20px', mb: 3, ml: 3 }}>
                <UserTable id="my-table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 0 }}>SrNo</TableCell>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                user Name
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                phone no.
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                email
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                location
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                balance
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                register date
                            </TableCell>

                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                status
                            </TableCell>

                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                add balance
                            </TableCell>

                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                revert balance
                            </TableCell>

                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                view profile
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersList.length > 0
                            ? usersList
                                  .slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                  )
                                  .map((userData, index) => (
                                      <TableRow key={index} hover>
                                          <TableCell>{index + 1}</TableCell>
                                          <TableCell
                                              colSpan={4}
                                              align="left"
                                              sx={{
                                                  px: 0,
                                                  textTransform: 'capitalize',
                                              }}
                                          >
                                              <Box
                                                  display="flex"
                                                  alignItems="center"
                                              >
                                                  <Avatar
                                                      src={userData.imgUrl}
                                                  />
                                                  <Paragraph
                                                      sx={{ m: 0, ml: 4 }}
                                                  >
                                                      {userData.userName}
                                                  </Paragraph>
                                              </Box>
                                          </TableCell>
                                          <TableCell
                                              align="left"
                                              colSpan={2}
                                              sx={{
                                                  px: 0,
                                                  // textTransform: 'capitalize',
                                              }}
                                          >
                                              {userData.phoneNumber}
                                          </TableCell>
                                          <TableCell
                                              align="left"
                                              colSpan={2}
                                              sx={{
                                                  px: 0,
                                                  // textTransform: 'capitalize',
                                              }}
                                          >
                                              {userData.email}
                                          </TableCell>

                                          <TableCell
                                              align="left"
                                              colSpan={2}
                                              sx={{
                                                  px: 0,
                                                  // textTransform: 'capitalize',
                                              }}
                                          >
                                              {userData.location}
                                          </TableCell>

                                          <TableCell
                                              align="left"
                                              colSpan={2}
                                              sx={{
                                                  px: 0,
                                                  // textTransform: 'capitalize',
                                              }}
                                          >
                                              {userData.balance}
                                          </TableCell>

                                          <TableCell
                                              align="left"
                                              colSpan={2}
                                              sx={{
                                                  px: 0,
                                                  // textTransform: 'capitalize',
                                              }}
                                          >
                                              {moment(userData.created).format(
                                                  'YYYY-MM-DD'
                                              )}
                                          </TableCell>

                                          <TableCell
                                              sx={{ px: 0 }}
                                              align="left"
                                              colSpan={2}
                                          >
                                              {userData.isActive ? (
                                                  <Small bgcolor={bgPrimary}>
                                                      Active
                                                  </Small>
                                              ) : (
                                                  <Small bgcolor={bgError}>
                                                      Inactive
                                                  </Small>
                                              )}
                                          </TableCell>

                                          <TableCell sx={{ px: 0 }} colSpan={2}>
                                              <IconButton
                                                  onClick={() =>
                                                      addBalance(userData)
                                                  }
                                              >
                                                  <Icon>add_circle</Icon>
                                              </IconButton>
                                          </TableCell>

                                          <TableCell sx={{ px: 0 }} colSpan={2}>
                                              <IconButton
                                                  onClick={() =>
                                                      removeBalance(userData)
                                                  }
                                              >
                                                  <Icon>remove_circle</Icon>
                                              </IconButton>
                                          </TableCell>

                                          <TableCell sx={{ px: 0 }} colSpan={2}>
                                              <IconButton
                                                  onClick={() =>
                                                      viewUser(userData)
                                                  }
                                              >
                                                  <Icon>person</Icon>
                                              </IconButton>
                                          </TableCell>

                                          <TableCell sx={{ px: 0 }} colSpan={2}>
                                              <IconButton
                                                  onClick={() =>
                                                      changeStatus(userData)
                                                  }
                                              >
                                                  <Icon
                                                      color={`${
                                                          userData.isActive
                                                              ? 'error'
                                                              : 'primary'
                                                      }`}
                                                  >
                                                      {userData.isActive
                                                          ? 'close'
                                                          : 'check'}
                                                  </Icon>
                                              </IconButton>
                                              <IconButton
                                                  onClick={() =>
                                                      editUser(userData)
                                                  }
                                              >
                                                  <Icon>edit_icon</Icon>
                                              </IconButton>
                                          </TableCell>
                                      </TableRow>
                                  ))
                            : null}
                    </TableBody>
                </UserTable>

                <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={usersList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
            <AddUpdateUserDialog
                setOpen={setUserModelOpen}
                open={userModelOpen}
                userData={userData}
                title={userModelTitle}
                getAllusers={() => {
                    getAllusers()
                }}
            />

            <AddRemoveBalance
                setOpen={setAddRemoveModelOpen}
                open={addRemoveModelOpen}
                userData={userData}
                title={modelTitle}
                type={addRemoveModelType}
                getAllusers={() => {
                    getAllusers()
                }}
            />
        </Card>
    )
}

export default UserListingTable
