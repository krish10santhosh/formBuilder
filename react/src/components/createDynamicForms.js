import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from "@mui/material";
import HeaderComponent from "../shared/components/material_navbar/headerCommon";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { formItems } from "../shared/constants/constants";

const CreateDynamicForms = () => {
    const dispatch = useDispatch();
    const tokenData = useSelector((state) => state.dashboardreducer.dashboarddata.tokenData);

    useEffect(() => {

    }, [dispatch, tokenData?.id]);

    useEffect(() => {

    }, []);

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <HeaderComponent showAdd={false} />
                        <Grid container xs={12}>
                            <Grid item xs={9} sx={{ margin: "0 20px 0 0" }}>
                                <Card>
                                    <CardContent>

                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained">Save Form</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={2}>
                                <Card sx={{ minWidth: 285, textAlign: 'left' }}>
                                    <CardContent sx={{ padding: 0 }}>
                                        {
                                            formItems?.map((data) => (
                                                <>
                                                    <Typography variant="subtitle1" sx={{ borderBottom: "1px solid #c5c5c5", padding: '5px 20px' }}>{data.value}</Typography>
                                                </>
                                            ))
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default CreateDynamicForms;