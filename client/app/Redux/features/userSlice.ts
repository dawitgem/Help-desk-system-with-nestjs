import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../reducers";
import { error } from "console";

interface user {
  Id: string;
  FullName: string | null;
  Email: string;
  userName: string;
  Profile?: string;
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
    updateUserSuccess: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
      state.error = null;
    },
    updateUserFaliure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    signupSucess: (
      state,
      action: PayloadAction<{ fullname: string; email: string }>
    ) => {
      state.isAuth = true;
      state.error = null;
    },
    signUpFaliure: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.error = action.payload;
    },

    signInWithGoogleSucess: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    signInWithGoogleFaliuer: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.error = action.payload;
    },
    signinSucess: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.error = null;
      state.isAuth = true;
    },
    signInFaliure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isAuth = false;
    },

    LogoutSucess: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
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
} = userSlice.actions;
export const selectUser = (state: User) => {
  return state.User;
};
export default userSlice.reducer;
