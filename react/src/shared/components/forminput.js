import { Box, TextField } from "@mui/material";
import React from "react";

const InputComponent = ({ disabled, handleChange, value }) => {
  return (
    <div>
      <Box
        component="div"
        noValidate
        autoComplete="off"
      >
        <TextField variant="outlined" style={{ width: "100%" }} onChange={handleChange} value={value} sx={{
          '& .MuiOutlinedInput-input' :{
            padding: '5px 10px 5px 10px !important'
          },
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 },
        }} disabled={disabled} />
      </Box>
    </div>

  )
}

export default InputComponent;