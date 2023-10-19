import { all } from "redux-saga/effects";
import { userSaga } from "./userSaga";
import { agentSaga } from "./agentSaga";
import { TicketSaga } from "./ticketSaga";

export function* RootSaga() {
  yield all([userSaga(), agentSaga(), TicketSaga()]);
}
