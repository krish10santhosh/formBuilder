import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import HeaderComponent from "../shared/components/material_navbar/headerCommon";

const DashboardComponent = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(30);
    const tokenData = useSelector((state) => state.dashboardreducer.dashboarddata.tokenData);
    const feedData = useSelector((state) => state.homereducer.picturesdata);
    const profileData = useSelector((state) => state.profilereducer.profiledata);
    const [feedDataValue, setfeedDataValue] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // const data = {
        //     page: page,
        //     count: count
        // }
        // dispatch(getHomePicturesData(data));
        // if (profileData?.data?.data == null) {
        //     dispatch(getUserProfileDetails(tokenData?.id));
        // }
    }, [dispatch, tokenData?.id]);

    useEffect(() => {
        if (feedData?.data ? feedData?.data?.data?.length : null) {
            if (feedData.data.page === 1) {
                // setfeedDataValue(feedData?.data?.data);
            }
            else {
                // setfeedDataValue(feedDataValue => [...feedDataValue, ...feedData.data.data]);
            }
            setTotal((prev) => prev + feedData.data.data.length);
        }
    }, [feedData]);

    const fetchMoreData = () => {
        if (total < feedData?.data?.total) {
            let indexValue = page;
            indexValue++;
            // dispatch(getHomePicturesData({ page: indexValue, count: count }));
            setPage(indexValue);
        }
    };

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <HeaderComponent isAdd={false} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default DashboardComponent;