import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboarddata: {
        tokenData: [],
        menuItems: {}
    }
};

const menuItems = [{
    heading: "Snapkart Menu Items",
    items: [{
        name: "Home",
        path: "home",
        icon: "",
        accessCode: "SNPK01"
    }]
}]

const DashboardSlice = createSlice({
    name: "Dashboard",
    initialState,
    reducers: {
        TokenDetails(state, action) {
            state.dashboarddata.tokenData = action.payload;
        },
        getItems(state, action) {
            state.dashboarddata.menuItems = menuItems;
        },
        clearStore() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        return builder;
    }
})

const { reducer } = DashboardSlice;
export const { TokenDetails, clearStore, getItems } = DashboardSlice.actions;
export default reducer;