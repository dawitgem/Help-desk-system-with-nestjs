import { call, put, takeLatest } from "redux-saga/effects";
import {
  signUpFaliure,
  signupSucess,
  signInWithGoogleFaliuer,
  signInFaliure,
  signInWithGoogleSucess,
  signinSucess,
  createUser,
} from "../Redux/features/userSlice";

interface SignInAction {
  type: typeof signinSucess;
  payload: { email: string; password: string };
}

const SigninApi = async (credentials: { email: string; password: string }) => {
  console.log(credentials);
  return {
    Id: "",
    FullName: null,
    Email: null,
    userName: "",
    Profile: "",
    userType: "",
    workPhone: "",
    mobilePhone: "",
  };
};

const SignupApi = async (credentials: {
  fullname: string;
  email: string;
}) => {};

const SigninWithGoogleApi = async () => {};

function* handleSignin(action: SignInAction): Generator<any, void, any> {
  try {
    const user = yield call(SigninApi, action.payload);
    console.log(user);
  } catch (e) {}
}
function* handleSigUp(action: typeof signupSucess): Generator<any, void, any> {
  try {
  } catch (e) {}
}

function* handleSigninWithGoogle(
  action: ReturnType<typeof signInWithGoogleSucess>
) {
  try {
  } catch (e) {}
}

export function* userSaga() {
  yield takeLatest(signinSucess.type, handleSignin);
  yield takeLatest(signupSucess.type, handleSigUp);
  yield takeLatest(signInWithGoogleSucess.type, handleSigninWithGoogle);
}
