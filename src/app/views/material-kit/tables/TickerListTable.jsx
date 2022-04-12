import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Card,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/system'
import { bankAccountService } from '../../../services/bank.service'
import { tickerService } from 'app/services/ticker.service'
import moment from 'moment'

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

const StyledTable = styled(Table)(() => ({
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

const TickerListTable = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [tickerList, setTickerList] = useState([])
    const [userModelTitle, setUserModelTitle] = useState('New Banner')
    const [bannerModelOpen, setBannerModelOpen] = useState(false)
    const [bannerData, setBannerData] = useState({})

    const [bannerDesc, setBannerDesc] = useState('')

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        getAllTicker([])
    }, [])

    const getAllTicker = async () => {
        tickerService.getAllTicker().then((res) => {
            console.log('res--', res)
            setTickerList(res)
        })
        // await bankAccountService.getAllBank().then((res) => {
        //     console.log('res ---', res)
        //
        // })
    }

    const handleClose = () => {
        setBannerModelOpen(false)
    }

    const handleSubmit = async () => {
        console.log(bannerDesc)
        let payload = {
            description: bannerDesc,
        }
        //  let obj = props.userData
        //  obj.userName = userName
        //  obj.phoneNumber = phone
        //  obj.email = email
        //  let id = props.userData.id
        if (bannerData && bannerData?._id) {
            console.log('banner data ---', bannerData)
            await tickerService
                .updateTicker(bannerData?._id, payload)
                .then((res) => {
                    console.log('update res --', res)
                    handleClose()
                    getAllTicker()
                })
        } else {
            await tickerService.addTicker(payload).then((res) => {
                console.log('update res --', res)
                handleClose()
                getAllTicker()
            })
        }
    }

    const changeStatus = (data) => {
        console.log(data)
        // delete data.email
        // delete data.role
        let payload = {
            isActive: !data.isActive,
        }
        handleUpdate(data._id, payload)
    }

    const handleUpdate = async (id, data) => {
        console.log('payload ==', data)
        await tickerService.updateTicker(id, data).then((res) => {
            console.log(res)
            getAllTicker()
        })
    }

    const editBanner = (data) => {
        console.log('data---', data)
        setBannerData(data)

        setBannerModelOpen(true)

        setBannerDesc(data.description)
    }

    const deleteBanner = async (data) => {
        await tickerService.deleteTicker(data._id).then((res) => {
            console.log(res)
            getAllTicker()
        })
    }

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>Banner List</Title>
                <Fab
                    size="small"
                    color="secondary"
                    aria-label="Add"
                    className="button"
                    onClick={() => {
                        setBannerData({})
                        setBannerModelOpen(true)
                    }}
                >
                    <Icon>add</Icon>
                </Fab>
            </CardHeader>
            <Box overflow="auto" sx={{ pt: '20px', mb: 3, ml: 3 }}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>created time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickerList
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((ticker, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {ticker.description}
                                    </TableCell>
                                    <TableCell align="left">
                                        {moment(ticker.created).format(
                                            'MMMM Do YYYY, h:mm:ss'
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {ticker.isActive
                                            ? 'Active'
                                            : 'Inactive'}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => changeStatus(ticker)}
                                        >
                                            <Icon
                                                color={`${
                                                    !ticker.isActive
                                                        ? 'primary'
                                                        : 'error'
                                                }`}
                                            >
                                                {ticker.isActive
                                                    ? 'close'
                                                    : 'check'}
                                            </Icon>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => editBanner(ticker)}
                                        >
                                            <Icon>edit</Icon>
                                        </IconButton>

                                        <IconButton
                                            onClick={() => deleteBanner(ticker)}
                                        >
                                            <Icon color="">delete</Icon>
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
                    count={tickerList.length}
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

            <div>
                <Dialog
                    open={bannerModelOpen}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {userModelTitle}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="banner_desc"
                            label="Banner Description"
                            type="text"
                            fullWidth
                            defaultValue={bannerData?.description}
                            onChange={(e) => setBannerDesc(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={(e) => handleSubmit(e)}
                            color="primary"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Card>
    )
}

export default TickerListTable
