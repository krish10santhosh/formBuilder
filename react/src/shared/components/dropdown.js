import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const DropdownComponent = ({options, value, handleChange}) => {
console.log(options)
  return (
    <div>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={handleChange}
        placeholder="Age"
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
      >
        <MenuItem value="">
          <em>select</em>
        </MenuItem>
        {options?.length > 0 &&
          options?.map((data) => (
            <MenuItem value={data?.value}>{data?.key}</MenuItem>
          ))
        }
      </Select>
    </div>
  )
}

export default DropdownComponent;