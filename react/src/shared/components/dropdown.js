import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const DropdownComponent = () => {
  const [value, setValue] = useState("");
  
  const handleChange = (event) => {
    setValue(event.target.value)
  };

  return (
    <div>
      <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>select</em>
          </MenuItem>
          <MenuItem value={10}>Public</MenuItem>
          <MenuItem value={20}>Friends</MenuItem>
        </Select>
    </div>
  )
}

export default DropdownComponent;