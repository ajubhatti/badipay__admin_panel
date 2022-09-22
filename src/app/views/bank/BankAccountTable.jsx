import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    MenuItem,
    Select,
    Fab,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/system'

import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { CSVLink } from 'react-csv'
import { bankAccountService } from 'app/services/bank.service'

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

const BankAccountTable = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [banksAccounts, setBanksAccounts] = useState([])
    const [downloadType, setDownloadType] = useState('csv')

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        getAllbankAccounts([])
    }, [])

    const getAllbankAccounts = async () => {
        await bankAccountService.getAllBankAccount().then((res) => {
            setBanksAccounts(res?.data)
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

        const data = banksAccounts.map((elt) => [
            elt.accountName,
            elt.accountNo,
            elt['bankdetail'][0]['bankName'],
            elt.bankBranch,
            elt.balance,
            elt.ifscCode,
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

    return (
        <Box width="100%" overflow="auto">
            <Select
                size="small"
                defaultValue={downloadType}
                onChange={(e) => {
                    setDownloadType(e.target.value)
                }}
            >
                <MenuItem value="csv">csv</MenuItem>
                <MenuItem value="pdf">pdf</MenuItem>
            </Select>

            {downloadType == 'csv' ? (
                <CSVLink filename={'accounts list.csv'} data={banksAccounts}>
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
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Acc No.</TableCell>
                        <TableCell>Bank Name</TableCell>
                        <TableCell>Bank Branch</TableCell>
                        <TableCell>ifscCode</TableCell>
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
                                    {subscriber?.accountName}
                                </TableCell>
                                <TableCell align="left">
                                    {subscriber?.accountNo}
                                </TableCell>
                                <TableCell align="left">
                                    {/* {subscriber?.bankdetail[0]?.bankName} */}
                                </TableCell>
                                <TableCell align="left">
                                    {subscriber?.bankBranch}
                                </TableCell>
                                <TableCell>{subscriber?.ifscCode}</TableCell>
                                <TableCell>
                                    {subscriber?.isActive ? 'open' : 'close'}
                                </TableCell>
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
    )
}

export default BankAccountTable
