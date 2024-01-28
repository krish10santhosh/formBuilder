import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from "@mui/material";
import HeaderComponent from "../shared/components/material_navbar/headerCommon";
import AlertDialogSlide from "../shared/components/transitiondialog";
import { CreateDynamicForm, CreateFormContent, FormTabvalue } from "../shared/constants/constants";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tokenData = useSelector((state) => state.dashboardreducer.dashboarddata.tokenData);
    const [open, setOpen] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {

    }, [dispatch, tokenData?.id]);

    useEffect(() => {

    }, []);

    const onClose = () => {
        setOpenDrawer(false)
    };

    const handleClickForms = (data) => {
        setOpenDrawer(false)
        if (data === "Dynamic Forms") {
            navigate("/forms/createDynamicForms")
        }
    };

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <HeaderComponent showAdd={true} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
                        {
                            openDrawer ?
                                <>
                                    <AlertDialogSlide
                                        handleClose={onClose}
                                        open={open}
                                        data={FormTabvalue}
                                        title={CreateDynamicForm}
                                        content={CreateFormContent}
                                        handleClickForms={handleClickForms} />
                                </> : null
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default FormComponent;