import { Box, TextField } from "@mui/material";
import React from "react";

const InputComponent = ({ placeholder, handleChange, value, disabled }) => {
  
  return (
    <div>
      <Box
        component="div"
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label={placeholder} variant="outlined" style={{ width: "100%"}} onChange={handleChange} value={value} disabled={disabled} />
      </Box>
    </div>

  )
}

export default InputComponent;