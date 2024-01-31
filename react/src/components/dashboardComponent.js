import React from "react";
import { Box, Grid } from "@mui/material";
import HeaderComponent from "../shared/components/material_navbar/headerCommon";

const DashboardComponent = () => {
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <HeaderComponent isAdd={false} showAdd={false} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default DashboardComponent;