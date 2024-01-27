import React from "react";
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TimePicker } from '@mui/lab';

const TimePickerComponent = ({ placeholder, handleChange, value }) => {

  return (
    <div>
      <Box
        component="div"
        noValidate
        autoComplete="off"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label={placeholder}
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </div>

  )
}

export default TimePickerComponent; 