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
import { bannerService } from '../../../services/banner.service';
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
    const [bannerList, setBannerList] = useState([])
    const [userModelOpen, setUserModelOpen] = useState(false)
    const [userModelTitle, setUserModelTitle] = useState('New Banner')
    const [bannerImageUrl, setBannerImageUrl] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerName, setBannerName] = useState('')
    const [bannerDesc, setBannerDesc] = useState('')

    const onChangePicture = e => {
        setBannerImage(e.target.files[0])
        setBannerImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        getAllbanners([]);
    }, [])

    const getAllbanners = async () => {
        await bannerService.getAllBanner().then(res => {
            setBannerList(res);
        })
    }

    const ShowImage = (data) => {
        let imgData = new Buffer.from(data.data).toString('base64');
        return <img src={`data:image/*;base64,${imgData}`} width={150} height={100} />
    }

    const handleClose = () => {
        setUserModelOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update the formData object 

        var formData = new FormData();
        formData.append("images", bannerImage);
        formData.append("description", bannerDesc);
        formData.append("fileName", bannerName);

        for (let [key, value] of formData) {
            console.log(`${key}: ${value}`)
        }

        // also using it's default for...of specified by Symbol.iterator    
        console.log(...formData)

        // Don't work in IE (use last pair if same key is used more)
        console.log(Object.fromEntries(formData))

        await bannerService.uploadBanner(formData).then(res => {
            console.log("res of add ---", res)
            // getAllbanners();
        })
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
                        {bannerList
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
                    count={bannerList.length}
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
                            id="banner_name"
                            label="Banner Name"
                            type="text"
                            fullWidth
                            // defaultValue={props.userData.userName}
                            onChange={(e) => setBannerName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="banner_desc"
                            label="Banner Description"
                            type="text"
                            fullWidth
                            // defaultValue={props.userData.userName}
                            onChange={(e) => setBannerDesc(e.target.value)}
                        />

                        <div className="register_profile_image">
                            <input type="file" onChange={onChangePicture} />
                        </div>
                        <div className="previewProfilePic align-center" >
                            <img height={'50%'} width={'100%'} className="playerProfilePic_home_tile" src={bannerImageUrl && bannerImageUrl}></img>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button onClick={(e) => handleSubmit(e)} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </Card>


    )
}

export default BannerListTable
