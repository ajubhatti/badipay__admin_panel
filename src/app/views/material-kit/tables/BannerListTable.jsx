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
    CardHeader,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/system';
import { bannerService } from 'app/services/banner.service';
import { Title } from '@mui/icons-material';


const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))


const BannerListTable = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [banksAccounts, setBanksAccounts] = useState([])
    const [userModelOpen, setUserModelOpen] = useState(false)
    const [userModelTitle, setUserModelTitle] = useState('New Banner')

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        getAllbanks([]);
    }, [])

    const getAllbanks = async () => {
        await bannerService.getAllBanner().then(res => {
            console.log("res ---", res)
            setBanksAccounts(res);
        })

    }

    const ShowImage = (data) => {
        let imgData = new Buffer.from(data.data).toString('base64');
        return <img src={`data:image/*;base64,${imgData}`} width={150} height={100} />
    }

    const handleClose = () => {
        setUserModelOpen(false)
    }

    const handleSubmit = async () => {
        console.log("submit ---")
        // let obj = props.userData
        // obj.userName = userName
        // obj.phoneNumber = phone
        // obj.email = email
        // let id = props.userData.id
        // await accountService.update(id, obj).then((res) => {
        //     console.log('update res --', res)
        //     handleClose()
        // })
    }

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <Fab
                size="small"
                color="secondary"
                aria-label="Add"
                className="button"
                onClick={() => {
                    setUserModelOpen(true)
                }}
            >
                <Icon>add</Icon>
            </Fab>
            <Box width="100%" overflow="auto" sx={{ pt: '20px', mb: 3, ml: 3 }}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Banner</TableCell>
                            <TableCell>Banner Name</TableCell>
                            <TableCell>Banner Detail</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banksAccounts
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {ShowImage(subscriber.img)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {subscriber.bankName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {subscriber.bankDetail}
                                    </TableCell>
                                    <TableCell align="left">
                                        {subscriber.created}
                                    </TableCell>

                                    <TableCell>{subscriber.isActive ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <Icon color="error">close</Icon>
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
                    count={banksAccounts.length}
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
                    open={userModelOpen}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{userModelTitle}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="user_name"
                            label="User name"
                            type="text"
                            fullWidth
                        // defaultValue={props.userData.userName}
                        // onChange={(e) => setUserName(e.target.value)}
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
                        <Button onClick={() => handleSubmit()} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </Card>


    )
}

export default BannerListTable
