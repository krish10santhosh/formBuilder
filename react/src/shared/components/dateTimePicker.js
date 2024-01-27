import { Box, TextField } from "@mui/material";
import React from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { setHours, setMinutes } from "date-fns";

const DateTimeComponent = ({ placeholder, handleChange, value }) => {
    return (
        <div>
            <Box
                component="div"
                noValidate
                autoComplete="off"
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label={placeholder}
                        value={value}
                        onChange={handleChange}
                        autoOk
                        renderInput={(params) => <TextField {...params} sx={{
                            '& fieldset': { top: 0 },
                        }} />}
                    />
                </LocalizationProvider>
            </Box>
        </div >
    )
}

export default DateTimeComponent;