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
import axios from "axios";
import { nanoid, customAlphabet } from "nanoid";
import dotenv from "dotenv";
dotenv.config();
interface SignInAction {
  type: typeof signinSucess;
  payload: { email: string; password: string };
}
interface SignUpAction {
  type: typeof signupSucess;
  payload: { fullname: string; email: string };
}
const dev = true;
const SigninApi = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(
    `${dev ? process.env.DEV_API_URL : process.env.PRD_API_URL}/auth/login`,
    {
      Email: credentials.email,
      Password: credentials.password,
    }
  );
  return response.data;
};

const SignupApi = async (credentials: { fullname: string; email: string }) => {
  const nanoid = customAlphabet("0123456789", 18);
  const response = await axios.post(
    ` ${dev ? process.env.DEV_API_URL : process.env.PRD_API_URL}/auth/signup`,
    {
      Id: nanoid(),
      FullName: credentials.fullname,
      Password: "",
      UserName: credentials.fullname,
      Email: credentials.email,
      Image: null,
      About: null,
      UserType: "Customer",
      WorkingPhone: null,
      MobilePhone: null,
      CreatedDate: new Date(),
    }
  );
  return response.data;
};

const SigninWithGoogleApi = async () => {};

function* handleSignin(action: SignInAction): Generator<any, void, any> {
  try {
    const user = yield call(SigninApi, action.payload);
  } catch (e) {
    yield put(signInFaliure("something went wrong. please try again  "));
  }
}
function* handleSigUp(action: SignUpAction): Generator<any, void, any> {
  try {
    const user = yield call(SignupApi, action.payload);
    console.log(user);
    yield put(createUser(user));
  } catch (e) {
    yield put(signUpFaliure("something went wrong . Please try again !!!"));
  }
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
