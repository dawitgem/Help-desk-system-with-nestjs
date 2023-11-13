import { all } from "redux-saga/effects";
import { userSaga } from "./userSaga";
import { agentSaga } from "./agentSaga";
import { TicketSaga } from "./ticketSaga";
import { searchSaga } from "./searchSaga";
import { AgentTicketSaga } from "./agentTicketSaga";
export function* RootSaga() {
  yield all([
    userSaga(),
    agentSaga(),
    TicketSaga(),
    searchSaga(),
    AgentTicketSaga(),
  ]);
}
