import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../shared/services/profileService";

const initialState = {
    profiledata: {},
    profileserverdata: {},
    profileImageData: {},
    getUserPinsData: {}
};

export const getUserProfileDetails = createAsyncThunk(
    'Home/getUserProfileDetails',
    async (id) => {
        const res = await ProfileService.getProfileData(id);
        return res.data.data;
    }
)

export const setProfileServerData = createAsyncThunk(
    'Home/setProfileServerData',
    async ({ id, values }, { dispatch, rejectWithValue }) => {
        try {
            const res = await ProfileService.setProfileServerData(id, values);
            dispatch(getUserProfileDetails(id));
            return res.data;
        }
        catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data);
        }
    }
)

export const getUserPinsDataInfo = createAsyncThunk(
    'Home/getUserPinsDataInfo',
    async (id, { rejectWithValue }) => {
        try {
            const res = await ProfileService.getUserPinsDataInfo(id);
            return res.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const createProfileImage = createAsyncThunk(
    'Profile/createProfileImage',
    async (data, { dispatch }) => {
        const res = await ProfileService.createProfileImage(data);
        dispatch(getUserProfileDetails(data.id));
        return res.data;
    }
)

export const createCoverImage = createAsyncThunk(
    'Profile/createCoverImage',
    async (data, { dispatch }) => {
        const res = await ProfileService.createCoverImage(data);
        return res.data;
    }
)

const ActiveSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearStore() {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        return builder;
        // [getUserProfileDetails.pending]: (state, action) => {
        //     state.profiledata = {
        //         isloading: true,
        //         data: null,
        //         iserror: false
        //     }
        // },
        // [getUserProfileDetails.fulfilled]: (state, action) => {
        //     state.profiledata = {
        //         isloading: false,
        //         data: action.payload,
        //         iserror: false
        //     }
        // },
        // [getUserProfileDetails.rejected]: (state, action) => {
        //     state.profiledata = {
        //         isloading: false,
        //         data: null,
        //         iserror: true
        //     }
        // },
        // [setProfileServerData.pending]: (state, action) => {
        //     state.profileImageData = {
        //         isloading: true,
        //         data: null,
        //         iserror: false
        //     }
        // },
        // [setProfileServerData.fulfilled]: (state, action) => {
        //     state.profileImageData = {
        //         isloading: false,
        //         data: action.payload,
        //         iserror: false
        //     }
        // },
        // [setProfileServerData.rejected]: (state, action) => {
        //     state.profileImageData = {
        //         isloading: false,
        //         data: null,
        //         iserror: true
        //     }
        // },
        // [setProfileServerData.pending]: (state, action) => {
        //     state.setprofileserverdata = {
        //         isloading: true,
        //         data: null,
        //         iserror: false
        //     }
        // },
        // [setProfileServerData.fulfilled]: (state, action) => {
        //     state.setprofileserverdata = {
        //         isloading: false,
        //         data: action.payload,
        //         iserror: false
        //     }
        // },
        // [setProfileServerData.rejected]: (state, action) => {
        //     state.setprofileserverdata = {
        //         isloading: false,
        //         data: null,
        //         iserror: true
        //     }
        // },
        // [getUserPinsDataInfo.pending]: (state, action) => {
        //     state.getUserPinsData = {
        //         isloading: true,
        //         data: null,
        //         iserror: false
        //     }
        // },
        // [getUserPinsDataInfo.fulfilled]: (state, action) => {
        //     state.getUserPinsData = {
        //         isloading: false,
        //         data: action.payload,
        //         iserror: false
        //     }
        // },
        // [getUserPinsDataInfo.rejected]: (state, action) => {
        //     state.getUserPinsData = {
        //         isloading: false,
        //         data: null,
        //         iserror: true
        //     }
        // },
    }
})

const { reducer } = ActiveSlice;
export const profilefeeddata = (state) => state.profilereducer.profilefeeddata;
export default reducer;