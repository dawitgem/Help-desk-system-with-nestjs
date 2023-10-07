import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../reducers";
import { error } from "console";

interface user {
  Id: string;
  FullName: string | null;
  Email: string;
  userName: string;
  Image: string | null;
  userType: string;
  workPhone: string | null;
  mobilePhone: string | null;
}
interface userState {
  user: user | null;
  isAuth: boolean;
  error: string | null;
}
const initialState: userState = {
  user: null,
  isAuth: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    getProfileStart: (state) => {
      state.isAuth = false;
    },
    getProfile: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    getProfileFaliure: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.error = action.payload;
    },
    updateUserSuccess: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
      state.error = null;
    },
    updateUserFaliure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    signupSucess: (state) => {
      state.isAuth = true;
      state.error = null;
    },
    signUpFaliure: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.error = action.payload;
    },
    signinWithGoogleStart: (state) => {
      state.error = null;
    },

    signInWithGoogleSucess: (state) => {
      state.isAuth = true;
      state.error = null;
    },
    signInWithGoogleFaliuer: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.error = action.payload;
    },
    signinSucess: (state) => {
      state.error = null;
      state.isAuth = true;
    },
    signInFaliure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isAuth = false;
    },

    LogoutSucess: (state) => {
      state.user = null;
      state.isAuth = false;
      state.error = null;
    },
    LogoutFaliure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  signupSucess,
  signinSucess,
  createUser,
  updateUserSuccess,
  updateUserFaliure,
  signInFaliure,
  signInWithGoogleFaliuer,
  signInWithGoogleSucess,
  signUpFaliure,
  signinWithGoogleStart,
  getProfile,
  getProfileStart,
  getProfileFaliure,
} = userSlice.actions;
export const selectUser = (state: User) => {
  return state.User;
};
export default userSlice.reducer;
