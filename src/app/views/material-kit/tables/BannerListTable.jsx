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
import { bannerService } from '../../../services/banner.service'
import Moment from 'react-moment'
import moment from 'moment'

// const  = styled(Table)(({ theme }) => ({
//     whiteSpace: 'pre',
//     '& thead': {
//         '& tr': {
//             '& th': {
//                 paddingLeft: 0,
//                 paddingRight: 0,
//             },
//         },
//     },
//     '& tbody': {
//         '& tr': {
//             '& td': {
//                 paddingLeft: 0,
//                 textTransform: 'capitalize',
//             },
//         },
//     },
// }))

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

const BannerListTable = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [bannerList, setBannerList] = useState([])
    const [bannerModelOpen, setBannerModelOpen] = useState(false)
    const [userModelTitle, setUserModelTitle] = useState('New Banner')
    const [bannerImageUrl, setBannerImageUrl] = useState(null)
    const [bannerImage, setBannerImage] = useState(null)
    const [bannerName, setBannerName] = useState('')
    const [bannerDesc, setBannerDesc] = useState('')

    const [bannerData, setBannerData] = useState({})

    const onChangePicture = (e) => {
        setBannerImage(e.target.files[0])
        setBannerImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        getAllbanners([])
    }, [])

    const getAllbanners = async () => {
        await bannerService.getAllBanner().then((res) => {
            console.log('res.data :>> ', res.data)
            setBannerList(res?.data)
        })
    }

    const ShowImage = (data) => {
        console.log('data :>> ', data)
        let imgData = new Buffer.from(data).toString('base64')
        return (
            <img
                src={`data:image/*;base64,${imgData}`}
                width={150}
                height={100}
                alt=""
            />
        )
    }

    const handleClose = () => {
        setBannerModelOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Update the formData object

        var formData = new FormData()
        if (bannerImage) {
            formData.append('images', bannerImage)
        }
        formData.append('description', bannerDesc)
        formData.append('fileName', bannerName)

        for (let [key, value] of formData) {
            console.log(`${key}: ${value}`)
        }

        // also using it's default for...of specified by Symbol.iterator
        console.log(...formData)

        // Don't work in IE (use last pair if same key is used more)
        console.log(Object.fromEntries(formData))

        if (bannerData && bannerData?._id) {
            if (bannerImage) {
                await bannerService
                    .updateBannerWithImage(bannerData?._id, formData)
                    .then((res) => {
                        console.log('res of update ---', res)
                        getAllbanners()
                        handleClose()
                    })
            } else {
                let payload = {}
                if (bannerName) {
                    payload.fileName = bannerName
                }
                if (bannerDesc) {
                    payload.description = bannerDesc
                }
                await bannerService
                    .updateBanner(bannerData?._id, payload)
                    .then((res) => {
                        console.log('res of update ---', res)
                        getAllbanners()
                        handleClose()
                    })
            }
        } else {
            await bannerService.uploadBanner(formData).then((res) => {
                console.log('res of add ---', res)
                getAllbanners()
                handleClose()
            })
        }

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
        await bannerService.updateBanner(id, data).then((res) => {
            console.log(res)
            getAllbanners()
        })
    }

    const deleteBanner = async (data) => {
        await bannerService.deleteBanner(data._id).then((res) => {
            console.log(res)
            getAllbanners()
        })
    }

    const editBanner = (data) => {
        console.log('data---', data)
        setBannerData(data)
        setBannerImageUrl(data.img)
        setBannerModelOpen(true)
        setBannerName(data.fileName)
        setBannerDesc(data.description)
    }

    const StyledButton = styled(Button)(({ theme }) => ({
        margin: theme.spacing(1),
    }))

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
                            <TableCell>Banner</TableCell>
                            <TableCell>Banner Name</TableCell>
                            <TableCell>Banner Detail</TableCell>
                            <TableCell>Created at</TableCell>
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
                            .map((banner, index) => (
                                <TableRow key={index}>
                                    {console.log({ banner })}
                                    <TableCell align="left">
                                        {ShowImage(banner?.path)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {banner?.fileName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {banner?.description}
                                    </TableCell>
                                    <TableCell align="left">
                                        {moment(banner?.created).format(
                                            'MMMM Do YYYY, h:mm:ss'
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {banner?.isActive
                                            ? 'Active'
                                            : 'Inactive'}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => changeStatus(banner)}
                                        >
                                            <Icon
                                                color={`${
                                                    !banner?.isActive
                                                        ? 'primary'
                                                        : 'error'
                                                }`}
                                            >
                                                {banner?.isActive
                                                    ? 'close'
                                                    : 'check'}
                                            </Icon>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => editBanner(banner)}
                                        >
                                            <Icon>edit</Icon>
                                        </IconButton>

                                        <IconButton
                                            onClick={() => deleteBanner(banner)}
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
                    open={bannerModelOpen}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {userModelTitle}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="banner_name"
                            label="Banner Name"
                            type="text"
                            fullWidth
                            defaultValue={bannerData?.fileName}
                            onChange={(e) => setBannerName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="banner_desc"
                            label="Banner Description"
                            type="text"
                            fullWidth
                            defaultValue={bannerData?.fileName}
                            onChange={(e) => setBannerDesc(e.target.value)}
                        />

                        <div className="register_profile_image">
                            <input type="file" onChange={onChangePicture} />
                        </div>
                        <div className="previewProfilePic align-center">
                            {bannerData && bannerData?.img ? (
                                <img
                                    src={`data:image/*;base64,${new Buffer.from(
                                        bannerData?.img?.data
                                    ).toString('base64')}`}
                                    height={'50%'}
                                    width={'100%'}
                                    alt=""
                                />
                            ) : (
                                <img
                                    height={'50%'}
                                    width={'100%'}
                                    className="playerProfilePic_home_tile"
                                    src={bannerImageUrl && bannerImageUrl}
                                    alt=""
                                ></img>
                            )}
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

export default BannerListTable
