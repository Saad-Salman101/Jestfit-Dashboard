import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: null,
    error: null,
    data: null

};

const VendorReducer = createSlice({
    name: "Vendor",
    initialState,
    reducers: {
        startFetchingVEndorData(state) {
            state.loading = true;
            state.message = "Logging In";
            state.error = null
        },
        FetchingVendorDataInProgress(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
            state.data = action.payload.result;
        },
        failedToFetchVendorData(state) {
            state.message = "Unable To Fetch Vendor Data"
            state.error = true;
            state.loading = false;
        }
    },
});

export const {
    loginUserInProgress,
    loginUserStart,
    loginUserSuccess,
    loginUserFailed,
    logoutUser
} = VendorReducer.actions


export default VendorReducer.reducer
