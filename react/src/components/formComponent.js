import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHomePicturesData } from "../slices/homeSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { getUserProfileDetails } from "../slices/profileSlice";

const FormComponent = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(30);
    const tokenData = useSelector((state) => state.dashboardreducer.dashboarddata.tokenData);
    const feedData = useSelector((state) => state.homereducer.picturesdata);
    const profileData = useSelector((state) => state.profilereducer.profiledata);
    const [feedDataValue, setfeedDataValue] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

    }, [dispatch, tokenData?.id]);

    useEffect(() => {

    }, [feedData]);

    const fetchMoreData = () => {

    };

    return (
        <>
            {
                feedData?.isloading === true ||
                    profileData?.isloading === true
                    ? (<CircularProgress className="centered" />) : null
            }
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InfiniteScroll
                            dataLength={feedDataValue?.length}
                            next={fetchMoreData}
                            hasMore={true}
                            loader={feedDataValue && feedDataValue.isloading === true ? (<CircularProgress className="centered" />) : null}
                        >
                        </InfiniteScroll>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default FormComponent;