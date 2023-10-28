import { takeLatest, put, call } from "redux-saga/effects";
import {
  clearSearch,
  clearSearchStart,
  searchStart,
  searchSuccess,
} from "../Redux/features/searchSlice";
import axios from "axios";
import dotenv from "dotenv";
interface SearchAllAction {
  type: typeof searchStart;
  payload: {
    type: string;
    query: string;
  };
}
dotenv.config();
const api =
  process.env.NEXT_PUBLIC_REACT_ENV === "PRODUCTION"
    ? "https://kns-support-api.onrender.com"
    : "http://localhost:8000";

const searchApi = async (search: {
  type: string;
  query: string;
}): Promise<any> => {
  console.log(search);
  const response = await axios.get(
    `${api}/search?type=${search.type}&query=${search.query}`
  );
  console.log(response);
  return response.data;
};

function* handleSearchAll(action: SearchAllAction): Generator<any, void, any> {
  try {
    console.log(action.payload);
    const response = yield call(searchApi, action.payload);
    console.log(response);
    yield put(searchSuccess(response));
  } catch (e) {
    console.log(e);
  }
}
function* handleClearSearch(): Generator<any, void, any> {}
export function* searchSaga() {
  yield takeLatest(searchStart.type, handleSearchAll);
  yield takeLatest(clearSearchStart.type, handleClearSearch);
}
