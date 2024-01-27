import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HomeService from "../shared/services/homeService";

const initialState = {
    picturesdata: {
        
    }
};

export const getHomePicturesData = createAsyncThunk(
    'Register/getHomePicturesData',
    async ( data ) => {
        const res = await HomeService.getAllImagesData(data);
        return res.data;
    }
)


const HomeSlice = createSlice({
    name: "Home",
    initialState,
    reducers: {
        clearStore() {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        return builder;
        // [getHomePicturesData.pending]: (state, action) => {
        //     state.picturesdata = {
        //         isloading: true,
        //         data: null,
        //         iserror: false
        //     }
        // },
        // [getHomePicturesData.fulfilled]: (state, action) => {
        //     state.picturesdata = {
        //         isloading: false,
        //         data: action.payload,
        //         iserror: false
        //     }
        // },
        // [getHomePicturesData.error]: (state, action) => {
        //     state.picturesdata = {
        //         isloading: false,
        //         data: null,
        //         iserror: true
        //     }
        // }
    }
})

const { reducer } = HomeSlice;
export default reducer;