import { call, put, takeLatest } from "redux-saga/effects";
import {
  signUpFaliure,
  signupSucess,
  signInWithGoogleFaliuer,
  signInFaliure,
  signInWithGoogleSucess,
  signinSucess,
  createUser,
  signinWithGoogleStart,
  getProfile,
  getProfileStart,
  LogoutSucess,
  LogoutFaliure,
} from "../Redux/features/userSlice";
import axios from "axios";
import { nanoid, customAlphabet } from "nanoid";
import { auth } from "@/firebase/firebaseconfig";
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
} from "firebase/auth";
import dotenv from "dotenv";
import { removeAccessToken } from "../AuthService";

const provider = new GoogleAuthProvider();
dotenv.config();
interface SignInAction {
  type: typeof signinSucess;
  payload: { email: string; password: string };
}
interface SignUpAction {
  type: typeof signupSucess;
  payload: {
    fullname: string;
    email: string;
    image?: string;
    MobilePhone?: string;
  };
}
interface SignInWithGoogleAction {
  type: typeof signInWithGoogleSucess;
  payload: {
    fullname: string;
    email: string;
    image?: string;
    MobilePhone?: string;
  };
}
const dev = true;
const Nanoid = customAlphabet("0123456789", 18);
const SigninApi = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(
    `https://kns-support-api.onrender.com/auth/login`,
    {
      Email: credentials.email,
      Password: credentials.password,
    }
  );
  return response.data;
};

const getProfileApi = async () => {
  const response = await axios.get(
    `https://kns-support-api.onrender.com/auth/profile`,
    {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    }
  );
  return response.data;
};

const SignupApi = async (credentials: {
  fullname: string;
  email: string;
  image?: string;
  MobilePhone?: string;
}) => {
  const response = await axios.post(
    `https://kns-support-api.onrender.com/auth/signup`,
    {
      Id: Nanoid(),
      FullName: credentials.fullname,
      Password: "",
      UserName: credentials.fullname,
      Email: credentials.email,
      Image: credentials.image,
      About: null,
      UserType: "Customer",
      WorkingPhone: null,
      MobilePhone: credentials.MobilePhone,
      CreatedDate: new Date(),
    }
  );
  return response.data;
};

const GoogleAuthWithFirebase = async () => {
  const result = await signInWithPopup(auth, provider);
  const credentials = GoogleAuthProvider.credentialFromResult(result);
  const token = credentials?.accessToken;
  const { displayName, phoneNumber, photoURL, email } = result.user;
  return { displayName, phoneNumber, photoURL, email };
};
const SigninWithGoogleApi = async (User: {
  FullName: string;
  Email: string;
  Image: string;
  MobilePhone: string;
}) => {
  const user = await axios.post(
    " https://kns-support-api.onrender.com/auth/googleAuth",
    {
      Id: Nanoid(),
      FullName: User.FullName,
      Password: "",
      UserName: User.FullName,
      Email: User.Email,
      Image: User.Image,
      About: null,
      UserType: "Customer",
      WorkingPhone: null,
      MobilePhone: User.MobilePhone,
      CreatedDate: new Date(),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    }
  );
  console.log(user);
  return user.data;
};

function* handleSignin(action: SignInAction): Generator<any, void, any> {
  try {
    const AccessToken = yield call(SigninApi, action.payload);
    const user = yield getProfileApi();
    yield put(getProfile(user));
  } catch (e) {
    yield put(signInFaliure("something went wrong. please try again  "));
  }
}
function* handleSigUp(action: SignUpAction): Generator<any, void, any> {
  try {
    const user = yield call(SignupApi, action.payload);
    yield put(createUser(user));
  } catch (e) {
    yield put(signUpFaliure("something went wrong . Please try again !!!"));
  }
}

function* handleSigninWithGoogle(
  action: SignInWithGoogleAction
): Generator<any, void, any> {
  try {
    const {
      displayName: FullName,
      phoneNumber: MobilePhone,
      photoURL: Image,
      email: Email,
    } = yield GoogleAuthWithFirebase();
    const User = { FullName, Email, Image, MobilePhone };
    const AccessToken = yield SigninWithGoogleApi(User);

    const user = yield getProfileApi();
    yield put(getProfile(user));
  } catch (e: any) {
    yield put(signInWithGoogleFaliuer("something went wrong." + e.message));
  }
}

function* handleProfile(action: SignInAction): Generator<any, void, any> {
  try {
    const user = yield getProfileApi();
    yield put(getProfile(user));
  } catch (e) {
    console.log(e);
  }
}
function* handleSignOut() {
  try {
    const response = axios.get(
      " https://kns-support-api.onrender.com/auth/signout",
      {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      }
    );
    console.log(response);
  } catch (e) {
    yield put(LogoutFaliure("something went wrong..."));
  }
}
export function* userSaga() {
  yield takeLatest(signinSucess.type, handleSignin);
  yield takeLatest(signupSucess.type, handleSigUp);
  yield takeLatest(signinWithGoogleStart.type, handleSigninWithGoogle);
  yield takeLatest(getProfileStart.type, handleProfile);
  yield takeLatest(LogoutSucess.type, handleSignOut);
}
