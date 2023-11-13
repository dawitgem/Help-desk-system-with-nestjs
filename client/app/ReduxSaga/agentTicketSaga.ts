import { takeLatest, put } from "redux-saga/effects";
import {
  AgentfetchTicketFaliure,
  AgentfetchTicketStart,
  AgentfetchTicketSuccess,
  Attachement,
  Ticket,
} from "../Redux/features/agentTicketSlice";
import dotenv from "dotenv";
import axios from "axios";
import { customAlphabet, nanoid } from "nanoid";

dotenv.config();

const api =
  process.env.NEXT_PUBLIC_REACT_ENV === "PRODUCTION"
    ? "https://kns-support-api.onrender.com"
    : "http://localhost:8000";
const Nanoid = customAlphabet("0123456789", 18);

let TicketId = Nanoid();
const fetchTickets = async () => {
  const response = await axios.get(`${api}/ticket`);
  return response.data;
};

function* handleAgentFetchTicket(): Generator<any, void, any> {
  try {
    const response = yield fetchTickets();

    yield put(AgentfetchTicketSuccess(response));
  } catch (e: any) {
    yield put(AgentfetchTicketFaliure(e));
  }
}

export function* AgentTicketSaga() {
  yield takeLatest(AgentfetchTicketStart.type, handleAgentFetchTicket);
}
