import React from "react";
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DesktopDatePicker } from '@mui/lab';

const DatePickerComponent = ({ placeholder, handleChange, value }) => {

  return (
    <div>
      <Box
        component="div"
        noValidate
        autoComplete="off"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
           inputFormat="dd/MM/yyyy" label={placeholder} onChange={handleChange} value={value || null}
            renderInput={(params) => <TextField {...params} sx={{
              '& .MuiOutlinedInput-input' :{
                padding: '5px 10px 5px 10px !important'
              },
              '& legend': { display: 'none' },
              '& fieldset': { top: 0 },
            }} />}
          />
        </LocalizationProvider>
      </Box>
    </div>

  )
}

export default DatePickerComponent;