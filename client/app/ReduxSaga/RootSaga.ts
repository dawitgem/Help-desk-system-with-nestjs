import { all } from "redux-saga/effects";
import { userSaga } from "./userSaga";

export function* RootSaga() {
  yield all([userSaga()]);
}
