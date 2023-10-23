import { call, put, takeLatest } from "redux-saga/effects";
import {
  signUpFaliure,
  signupSucess,
  signInWithGoogleFaliuer,
  signInFaliure,
  signInWithGoogleSucess,
  signinSucess,
  createUser,
  getProfile,
  LogoutFaliure,
  updateUserSuccess,
  updateUserFaliure,
  updatePasswordSuccess,
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
import {
  AgentLogoutSucess,
  AgentgetProfile,
  AgentgetProfileStart,
  AgentsignInWithGoogleFaliuer,
  AgentsigninSucess,
  AgentsigninWithGoogleStart,
  AgentsignupSucess,
  AgentupdatePasswordRequest,
  updateAgentSuccess,
} from "../Redux/features/agentSlice";

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
  const response = await axios.get(`${api}/auth/profile`, {
    headers: {
      "Content-Type": "application/json",
    },

    withCredentials: true,
  });
  return response.data;
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
      UserType: "Agent",
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
    `${api}/auth/googleAuth/agent`,
    {
      Id: Nanoid(),
      FullName: User.FullName,
      Password: "",
      UserName: User.FullName,
      Email: User.Email,
      Image: User.Image,
      About: null,
      UserType: "Agent",
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

function* handleAgentSignin(action: SignInAction): Generator<any, void, any> {
  try {
    const AccessToken = yield call(SigninApi, action.payload);
    const user = yield getProfileApi();
    yield put(AgentgetProfile(user));
  } catch (e: any) {
    yield put(signInFaliure("something went wrong." + e.response.data.message));
  }
}
function* handleAgentSignUp(action: SignUpAction): Generator<any, void, any> {
  try {
    const response = yield call(SignupApi, action.payload);
    const user = yield getProfileApi();
    yield put(createUser(user));
  } catch (e) {
    yield put(signUpFaliure("something went wrong . Please try again !!!"));
  }
}

function* handleAgentSigninWithGoogle(
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
    yield put(AgentgetProfile(user));
  } catch (e: any) {
    yield put(
      AgentsignInWithGoogleFaliuer(
        "something went wrong." + e.response.data.message
      )
    );
  }
}

function* handleAgentProfile(action: SignInAction): Generator<any, void, any> {
  try {
    const user = yield getProfileApi();
    yield put(AgentgetProfile(user));
  } catch (e) {}
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

export function* agentSaga() {
  yield takeLatest(AgentsigninSucess.type, handleAgentSignin);
  yield takeLatest(AgentsignupSucess.type, handleAgentSignUp);
  yield takeLatest(
    AgentsigninWithGoogleStart.type,
    handleAgentSigninWithGoogle
  );
  yield takeLatest(AgentgetProfileStart.type, handleAgentProfile);
  yield takeLatest(AgentLogoutSucess.type, handleSignOut);
}
