import React from "react"
import TextField from "@mui/material/TextField"
import DateRangePicker from "@mui/lab/DateRangePicker"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import Box from "@mui/material/Box"

const DateRangePick = (props) => {
  const [value, setValue] = React.useState([null, null])

  const changeValue = (newVal) => {
    props.setDateValue(newVal)
    setValue(newVal)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        className="form-control"
        startText="Check-in"
        endText="Check-out"
        value={value}
        onChange={(newValue) => {
          changeValue(newValue)
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  )
}

export default DateRangePick
