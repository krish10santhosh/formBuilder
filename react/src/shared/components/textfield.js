import { TextField, Typography } from "@mui/material";
import React from "react";

const TextFieldComponent = ({ placeholder, handleChange, value }) => {
  return (
    <div>
      <Typography>TextFieldComponent</Typography>
      <TextField inputProps={{ 'data-testid': 'test' }} data-testid="textField" variant="outlined" style={{ width: "100%" }} onChange={handleChange} value={value} sx={{
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 },
        }} />
    </div>

  )
}

export default TextFieldComponent;