import { Box, IconButton } from "@mui/material";
import React from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInputComponent = ({ placeholder, handleChange, value }) => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Box
        component="div"
        noValidate
        autoComplete="off"
      >
        <FormControl id="outlined-basic" variant="outlined" style={{ width: "100%"}}>
        <InputLabel htmlFor="outlined-adornment-password">{placeholder}</InputLabel>
        <OutlinedInput
          variant="outlined"
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={placeholder}
          />
        </FormControl>
      </Box>
    </div>

  )
}

export default PasswordInputComponent;