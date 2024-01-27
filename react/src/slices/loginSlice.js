import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginService from "../shared/services/loginService";

const initialState = {
    logindata: {
        
    },
    logoutdata: {

    }
};

export const getLoginData = createAsyncThunk(
    'Login/login',
    async ( data ) => {
        const res = await LoginService.login(data);
        return res.data;
    }
)

export const logout = createAsyncThunk(
    'Login/logout',
    async ( data ) => {
        const res = await LoginService.logout(data);
        return res.data;
    }
)


const LoginSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
        clearStore() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        return builder;
        // [getLoginData.pending]: (state, action) => {
        //     state.logindata = {
        //         isloading: true,
        //         data: null,
        //         iserror: false
        //     }
        // },
        // [getLoginData.fulfilled]: (state, action) => {
        //     state.logindata = {
        //         isloading: false,
        //         data: action.payload,
        //         iserror: false
        //     }
        // },
        // [getLoginData.error]: (state, action) => {
        //     state.logindata = {
        //         isloading: false,
        //         data: null,
        //         iserror: true
        //     }
        // },
        // [logout.fulfilled]: (state, action) => {
        //     state.logoutdata = {
        //         isloading: false,
        //         data: null,
        //         iserror: true
        //     }
        // }
    }
})

const { reducer } = LoginSlice;
export const { TokenDetails, clearStore } = LoginSlice.actions;
export default reducer;