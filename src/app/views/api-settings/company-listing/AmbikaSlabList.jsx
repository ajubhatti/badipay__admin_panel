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
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { Box, styled } from "@mui/system"
import { useNavigate } from "react-router-dom"
import { ambikaService } from "app/services/ambika.service copy"

const CardHeader = styled("div")(() => ({
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}))

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

const AmbikaSlabList = () => {
  const navigate = useNavigate()
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [companies, setCompanies] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    getAllCompany([])
  }, [])

  const getAllCompany = async () => {
    await ambikaService.getAll().then((res) => {
      setCompanies(res?.data?.data || [])
    })
  }

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Slab List</Title>
        <Fab
          size="small"
          color="secondary"
          aria-label="Add"
          className="button"
          onClick={() => {
            navigate("/api-setting/company/add")
          }}
        >
          <Icon>add</Icon>
        </Fab>
      </CardHeader>
      <Box width="100%" overflow="auto" sx={{ pt: "20px", mb: 3, ml: 3 }}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>SPKey</TableCell>
              <TableCell>created time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell align="left">
                    {subscriber.serviceProvider}
                  </TableCell>
                  <TableCell align="left">
                    {subscriber.serviceProviderType}
                  </TableCell>
                  <TableCell align="left">{subscriber.SPKey}</TableCell>
                  <TableCell align="left">{subscriber.created}</TableCell>

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
          count={companies.length}
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
    </Card>
  )
}

export default AmbikaSlabList
