import { Typography } from "@mui/material";
import React from "react";

const SmartText = ({ text, length = 150 }) => {
    const [showLess, setShowLess] = React.useState(true);
    if (text.length < length) {
        return <Typography>{text}</Typography>;
    }

    return (
        <div>
            <Typography>{showLess ? `${text.slice(0, length)} ...` : text}
            <span
                style={{ color: "#3f51b5", cursor: "pointer", fontWeight: '600' }}
                onClick={() => setShowLess(!showLess)}
            >
                &nbsp;See {showLess ? "more" : "less"}
            </span>
            </Typography>
            
        </div>
    );
};

export default SmartText;
