import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RegisterService from "../shared/services/registerService";

const initialState = {
    registerdata: {
        
    }
};

export const getRegisterData = createAsyncThunk(
    'Register/getRegisterData',
    async ( data ) => {
        const res = await RegisterService.registerUser(data);
        return res.data;
    }
)

export const getOTPValidationValidation = createAsyncThunk(
    'Register/getOTPRegisterData',
    async ( data ) => {
        const res = await RegisterService.OTPValidation(data);
        return res.data;
    }
)


const RegisterSlice = createSlice({
    name: "Register",
    initialState,
    reducers: {
        clearStore() {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        return builder;
        // [getRegisterData.pending]: (state, action) => {
        //     state.registerdata = {
        //         isloading: true,
        //         data: null,
        //         iserror: false
        //     }
        // },
        // [getRegisterData.fulfilled]: (state, action) => {
        //     state.registerdata = {
        //         isloading: false,
        //         data: action.payload,
        //         iserror: false
        //     }
        // },
        // [getRegisterData.error]: (state, action) => {
        //     state.registerdata = {
        //         isloading: false,
        //         data: null,
        //         iserror: true
        //     }
        // }
    }
})

const { reducer } = RegisterSlice;
export default reducer;