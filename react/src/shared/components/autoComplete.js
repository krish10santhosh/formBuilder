import { Box } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from "react";

const AutoCompleteComponent = ({ handleChange, placeholder, options }) => {

    return (
        <div>
            <Box
                component="div"
                noValidate
                autoComplete="off"
                sx={{ margin: "0 10px 0 0" }}
            >
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={options}
                    getOptionLabel={(option) => option?.key}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            placeholder={placeholder}
                        />
                    )}
                    onChange={handleChange}
                    sx={{
                        width: { sm: "100%", xl: 320 },
                        "& + .MuiAutocomplete-popper .MuiAutocomplete-option":
                        {
                            backgroundColor: "#363636",
                        },
                        "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                        {
                            backgroundColor: "#4396e6",
                        },
                        "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true'] .Mui-focused":
                        {
                            backgroundColor: "#3878b4",
                        },
                    }}
                />
            </Box>
        </div>

    )
}

export default AutoCompleteComponent;