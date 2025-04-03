import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
  error: null,
  isAuthenticated: false,
  itemExpirtAgreement: false,
  userDetail: {
    role: null,
  },
  token: null,
  registration: {},
  redirectToCart: false,
};

const UserReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    loginUserStart(state) {
      state.isAuthenticated = false;
      state.loading = true;
      state.message = "Logging In";
      state.error = null;
    },
    loginUserInProgress(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.message = action.payload.message;
      state.error = action.payload.error;
      state.userDetail = action.payload.result.user;
      state.token = action.payload.result.tokens.access.token;
    },
    loginUserSuccess(state) {
      state.isAuthenticated = true;
      state.loading = false;
      state.message = "Logged In Successfully";
      state.error = null;
    },
    loginUserFailed(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.message = "Login Failed";
      state.error = "Invalid Credentials";
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.message = "Logged Out Successfully";
      state.error = null;
      state.token = null;
      state.userDetail = { role: null };
      state.data = {
        loading: false,
        message: null,
        error: null,
        data: {
          isAuthenticated: false,
          firstName: null,
          lastName: null,
          email: null,
          token: null,
        },
      };
    },
    setRedirectToCart(state) {
      state.redirectToCart = true;
    },
    registerUserAsVendor(state, action) {
      state.registration = action.payload;
    },
  },
});

export const {
  setRedirectToCart,
  loginUserInProgress,
  loginUserStart,
  loginUserSuccess,
  loginUserFailed,
  logoutUser,
  registerUserAsVendor,
} = UserReducer.actions;

export default UserReducer.reducer;
