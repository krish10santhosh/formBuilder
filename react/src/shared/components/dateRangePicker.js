import React from "react";
import { Popover } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import { addDays, subMonths, subDays, subYears } from "date-fns";

const DateRangeComponent = ({ handleOnChange, handleClose, dialoanchorEl }) => {
    const open = Boolean(dialoanchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [state, setState] = React.useState([
        {
            startDate: subMonths(new Date(), 1),
            endDate: addDays(new Date(), 0),
            key: "selection"
        }
    ]);

    const handleChange = (ranges) => {
        const { selection } = ranges;
        handleOnChange(selection);
        setState([selection]);
    };

    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={dialoanchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <DateRangePicker
                    onChange={handleChange}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                />
            </Popover>
        </div>

    )
}

export default DateRangeComponent;