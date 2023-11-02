import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../reducers";
import { error } from "console";

interface user {
  Id: string;
  FullName?: string | null;
  Email: string;
  UserName?: string | null;
  Image?: string | null;
  UserType: string;
  WorkingPhone?: string | null;
  MobilePhone?: string | null;
  Verified: boolean | null;
}
interface userState {
  user: user | null;
  Loading: boolean;
  isAuth: boolean;
  error: string | null;
}
const initialState: userState = {
  user: null,
  isAuth: false,
  Loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<user>) => {
      state.Loading = false;
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    getProfileStart: (state) => {
      // state.Loading = true;
      state.isAuth = false;
    },
    getProfile: (state, action: PayloadAction<user>) => {
      state.Loading = false;
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    getProfileFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    updatePasswordRequest: (
      state,
      action: PayloadAction<{
        Id: string;
        currentPassword: string;
        newPassword: string;
      }>
    ) => {
      state.Loading = true;
    },

    updatePasswordSuccess: (state, action: PayloadAction<user>) => {
      state.Loading = false;
      state.user = action.payload;
      state.error = null;
    },

    updatePasswordFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },
    updateUserFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },
    updateUserSuccess: (
      state,
      action: PayloadAction<{
        Id: string;
        FullName: any;
        Image: any;
        WorkingPhone: any;
        MobilePhone: any;
      }>
    ) => {
      state.Loading = true;
      state.error = null;
    },
    signupStart: (
      state,
      action: PayloadAction<{
        fullname: string;
        email: string;
        password: string;
      }>
    ) => {
      state.Loading = true;
      state.error = null;
    },
    signupSucess: (state) => {
      state.Loading = false;
      state.isAuth = true;
      state.error = null;
    },
    signUpFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    signinWithGoogleStart: (state) => {
      state.Loading = true;
      state.error = null;
    },

    signInWithGoogleSucess: (state) => {
      state.Loading = false;

      state.isAuth = true;
      state.error = null;
    },
    signInWithGoogleFaliuer: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    signinStart: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.Loading = true;
      state.error = null;
    },
    signinSucess: (state) => {
      state.Loading = false;

      state.error = null;
      state.isAuth = true;
    },
    signInFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;

      state.error = action.payload;
      state.isAuth = false;
    },

    LogoutSucess: (state) => {
      state.Loading = false;
      state.user = null;
      state.isAuth = false;
      state.error = null;
    },
    LogoutFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;

      state.error = action.payload;
    },
  },
});

export const {
  signupSucess,
  signupStart,
  signinStart,
  signinSucess,
  createUser,
  updateUserSuccess,
  updateUserFaliure,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFaliure,
  signInFaliure,
  signInWithGoogleFaliuer,
  signInWithGoogleSucess,
  signUpFaliure,
  signinWithGoogleStart,
  getProfile,
  getProfileStart,
  getProfileFaliure,
  LogoutFaliure,
  LogoutSucess,
} = userSlice.actions;
export const selectUser = (state: User) => {
  return state.User;
};
export default userSlice.reducer;
