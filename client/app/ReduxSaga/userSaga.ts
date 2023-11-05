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
  updateUserSuccess,
  updateUserFaliure,
  updatePasswordSuccess,
  updatePasswordRequest,
  signupStart,
  signinStart,
  getProfileFaliure,
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

const provider = new GoogleAuthProvider();
dotenv.config();

const api =
  process.env.NEXT_PUBLIC_REACT_ENV === "PRODUCTION"
    ? "https://kns-support-api.onrender.com"
    : "http://localhost:8000";

interface SignInAction {
  type: typeof signinSucess;
  payload: { email: string; password: string };
}
interface SignUpAction {
  type: typeof signupSucess;
  payload: {
    fullname: string;
    email: string;
    password: string;
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

interface updateUserAction {
  type: typeof updateUserSuccess;
  payload: {
    Id: string;
    FullName: string;
    Image: string;
    WorkingPhone: string | null;
    MobilePhone: string | null;
  };
}
interface updatePasswordACtion {
  type: typeof updatePasswordSuccess;
  payload: {
    Id: string;
    currentPassword: string;
    newPassword: string;
  };
}
const Nanoid = customAlphabet("0123456789", 18);
const SigninApi = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(
    `${api}/auth/login`,
    {
      Email: credentials.email,
      Password: credentials.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    }
  );
  return response.data;
};

const getProfileApi = async () => {
  try {
    const response = await axios.get(`${api}/auth/profile`, {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const refreshAccessToken = async () => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(`${api}/auth/refresh`);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const SignupApi = async (credentials: {
  fullname: string;
  email: string;
  image?: string;
  MobilePhone?: string;
  password: string;
}) => {
  const response = await axios.post(
    `${api}/auth/signup`,
    {
      Id: Nanoid(),
      FullName: credentials.fullname,
      Password: credentials.password,
      UserName: credentials.fullname,
      Email: credentials.email,
      Image: credentials.image,
      About: null,
      UserType: "Customer",
      WorkingPhone: null,
      MobilePhone: credentials.MobilePhone,
      CreatedDate: new Date(),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
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
  const response = await axios.post(
    `${api}/auth/googleAuth`,
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
  return response.data;
};

const updateUserApi = async (Profile: {
  Id: string;
  FullName: string;
  Image: string;
  WorkingPhone: string | null;
  MobilePhone: string | null;
}) => {
  const { FullName, Image, WorkingPhone, MobilePhone } = Profile;
  const response = await axios.put(`${api}/user/update/${Profile.Id}`, {
    FullName,
    UserName: FullName,
    Image,
    WorkingPhone,
    MobilePhone,
  });
  return response.data;
};

const updateUserPasswordApi = async (Passwords: {
  Id: string;
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axios.put(
    `${api}/user/updatePassword/${Passwords.Id}`,
    {
      currentPassword: Passwords.currentPassword,
      newPassword: Passwords.newPassword,
    }
  );
  return response.data;
};

function* handleSignin(action: SignInAction): Generator<any, void, any> {
  try {
    const response = yield call(SigninApi, action.payload);
    console.log(response);

    const user = yield getProfileApi();
    yield put(getProfile(user));
  } catch (e: any) {
    yield put(signInFaliure(e.response.data.message));
  }
}
function* handleSigUp(action: SignUpAction): Generator<any, void, any> {
  try {
    const response = yield call(SignupApi, action.payload);
    yield put(createUser(response));
  } catch (e: any) {
    yield put(
      signUpFaliure("something went wrong ." + e.response.data.message)
    );
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
    yield SigninWithGoogleApi(User);
    const user = yield getProfileApi();
    yield put(getProfile(user));
  } catch (e: any) {
    console.log(e);
    yield put(signInWithGoogleFaliuer(e.message + " please try again ..!!"));
  }
}

function* handleProfile(action: SignInAction): Generator<any, void, any> {
  try {
    let user: any;
    user = yield getProfileApi();
    if (!user) user = yield refreshAccessToken();
    yield put(getProfile(user));
  } catch (e: any) {}
}
function* handleSignOut() {
  try {
    const response = axios.get(`${api}/auth/signout`, {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    });
  } catch (e) {
    yield put(LogoutFaliure("something went wrong..."));
  }
}

function* handleUpdateUser(
  action: updateUserAction
): Generator<any, void, any> {
  try {
    const user = yield call(updateUserApi, action.payload);
    yield put(createUser(user));
  } catch (e: any) {
    yield put(updateUserFaliure(e.message));
  }
}
function* handleUpdateUserPassword(
  action: updatePasswordACtion
): Generator<any, void, any> {
  try {
    const user = yield call(updateUserPasswordApi, action.payload);
    yield put(updatePasswordSuccess(user));
  } catch (e: any) {
    yield put(updateUserFaliure(e.response.data.message));
  }
}
export function* userSaga() {
  yield takeLatest(signinStart.type, handleSignin);
  yield takeLatest(signupStart.type, handleSigUp);
  yield takeLatest(signinWithGoogleStart.type, handleSigninWithGoogle);
  yield takeLatest(getProfileStart.type, handleProfile);
  yield takeLatest(LogoutSucess.type, handleSignOut);
  yield takeLatest(updateUserSuccess.type, handleUpdateUser);
  yield takeLatest(updatePasswordRequest.type, handleUpdateUserPassword);
}
