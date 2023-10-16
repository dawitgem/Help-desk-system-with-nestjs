import { all } from "redux-saga/effects";
import { userSaga } from "./userSaga";
import { agentSaga } from "./agentSaga";

export function* RootSaga() {
  yield all([userSaga(), agentSaga()]);
}
