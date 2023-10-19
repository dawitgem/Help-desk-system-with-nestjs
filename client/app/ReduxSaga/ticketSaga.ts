import { takeLatest, put, call } from "redux-saga/effects";
import {
  addAttachementFaliure,
  addAttachementStart,
  addAttachementSuccess,
  addTicketFaliure,
  addTicketStart,
  addTicketSuccess,
  fetchAttachmentFaliure,
  fetchAttachmentStart,
  fetchAttachmentSuccess,
  fetchTicketFaliure,
  fetchTicketStart,
  fetchTicketSuccess,
} from "../Redux/features/ticketSlice";
import dotenv from "dotenv";
import axios from "axios";
import { customAlphabet, nanoid } from "nanoid";
import { storage } from "@/firebase/firebaseconfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

dotenv.config();

interface AddTicketAction {
  type: typeof addTicketStart;
  payload: {
    IssueType: string | null;
    Subject: string | null;
    Description: string | null;
    Priority: string | null;
    Email: string | null;
    UserId?: string;
  };
}

interface AddAttachementAction {
  type: typeof addAttachementStart;
  payload: {
    ticket: {
      IssueType: string | null;
      Subject: string | null;
      Description: string | null;
      Priority: string | null;
      Email?: string | null;
      UserId?: string;
    };
    file: File[];
  };
}
interface FetchTicketAction {
  type: typeof fetchTicketStart;
  payload: {
    Id: string;
  };
}
const api =
  process.env.NEXT_PUBLIC_REACT_ENV === "PRODUCTION"
    ? "https://kns-support-api.onrender.com"
    : "http://localhost:8000";
const Nanoid = customAlphabet("0123456789", 18);

let TicketId = Nanoid();
const fetchTickets = async (User: { Id: string }) => {
  const { Id } = User;
  console.log(User);
  const response = await axios.get(`${api}/ticket/user/${User}`);
  const Tickets = await response.data;
  return Tickets;
};
const fetchAttachments = async () => {
  const response = await axios.get(`${api}/ticket/attachment`);
  const Tickets = await response.data;
  return Tickets;
};
const addTicketApi = async (Ticket: {
  IssueType: string | null;
  Subject: string | null;
  Description: string | null;
  Priority: string | null;
  Email?: string | null;
  UserId?: string;
}) => {
  TicketId = Nanoid();
  console.log(Ticket);
  const { IssueType, Subject, Description, Priority, Email, UserId } = Ticket;
  let date = new Date();
  let resolutionDate = new Date();
  const day = 3600 * 24;

  if (Priority === "Low") {
    date = new Date(Date.now() + 14 * day);
    resolutionDate = new Date(Date.now() + 30 * day);
  }
  if (Priority === "Medium") {
    date = new Date(Date.now() + 7 * day);
  }
  resolutionDate = new Date(Date.now() + 20 * day);

  if (Priority === "High") {
    date = new Date(Date.now() + 3 * day);
    resolutionDate = new Date(Date.now() + 15 * day);
  }
  if (Priority === "Urgent") {
    date = new Date(Date.now() + 1 * day);
    resolutionDate = new Date(Date.now() + 7 * day);
  }
  const response = await axios.post(`${api}/ticket/new`, {
    Id: TicketId,
    UserId,
    Type: IssueType,
    ReportedVia: "Web",
    Email,
    Priority,
    Subject,
    Content: Description,
    FirstResponseDue: date,
    ResolutionDue: resolutionDate,
    CreatedAt: new Date(),
  });
  return response.data;
};
const uploadFile = async (file: File) => {
  return new Promise((resolve, reject) => {
    const profileRef = ref(storage, `attachement/${file.name}`);
    const uploadTask = uploadBytesResumable(profileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 5
          ) * 5;
      },
      (Error) => {
        switch (Error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            console.log(Error.message);
            break;
        }
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (e: any) {
          reject(e);
        }
      }
    );
  });
};

const addAttachementApi = async (file: File[]) => {
  const promise = file.map(async (file, i) => await uploadFile(file));
  const url = await Promise.all(promise);
  const response = file.map(async (file, i) => {
    console.log(url[i]);
    const response = await axios.post(`${api}/ticket/attachment/new`, {
      Id: Nanoid(),
      FileName: file.name,
      FilePath: url[i],
      TicketId: TicketId,
      Size: file.size,
      Mimi_Type: file.type,
      Createdat: new Date(),
    });
    return response.data;
  });
  console.log(await Promise.all(response));
  return await Promise.all(response);
};

function* handleFetchTicket(
  action: FetchTicketAction
): Generator<any, void, any> {
  try {
    const Tickets = yield call(fetchTickets, action.payload);
    yield put(fetchTicketSuccess(Tickets));
    console.log(Tickets);
  } catch (e: any) {
    console.log(e);
    yield put(fetchTicketFaliure(e.response.data.message));
  }
}

function* handleAddTicket(action: AddTicketAction): Generator<any, void, any> {
  try {
    const Ticket = yield call(addTicketApi, action.payload);
    yield put(addTicketSuccess(Ticket));
  } catch (e: any) {
    console.log(e);
    yield put(addTicketFaliure(e.response.data.message));
  }
}
function* handleAddAttachement(
  action: AddAttachementAction
): Generator<any, void, any> {
  try {
    const tickets = yield addTicketApi(action.payload.ticket);
    const response = yield call(addAttachementApi, action.payload.file);
    console.log(response);
    yield put(addAttachementSuccess(response));
    yield put(addTicketSuccess(tickets));
  } catch (e: any) {
    console.log(e);
    yield put(addAttachementFaliure(e.response.data.message));
  }
}
function* handleFetchAttachments(): Generator<any, void, any> {
  try {
    const Attachement = yield fetchAttachments();
    console.log(Attachement);
    yield put(fetchAttachmentSuccess(Attachement));
  } catch (e: any) {
    yield put(fetchAttachmentFaliure(e.response.data.message));
  }
}
export function* TicketSaga() {
  yield takeLatest(fetchTicketStart.type, handleFetchTicket);
  yield takeLatest(addTicketStart.type, handleAddTicket);
  yield takeLatest(addAttachementStart.type, handleAddAttachement);
  yield takeLatest(fetchAttachmentStart.type, handleFetchAttachments);
}
