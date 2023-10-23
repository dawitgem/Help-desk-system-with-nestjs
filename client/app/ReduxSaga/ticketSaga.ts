import { takeLatest, put, call } from "redux-saga/effects";
import {
  Attachement,
  Ticket,
  addAttachementFaliure,
  addAttachementStart,
  addAttachementSuccess,
  addTicketFaliure,
  addTicketStart,
  addTicketSuccess,
  deleteAttachmentFaliure,
  deleteAttachmentStart,
  deleteAttachmentSuccess,
  deleteTicketFaliure,
  deleteTicketStart,
  deleteTicketSuccess,
  fetchAttachmentFaliure,
  fetchAttachmentStart,
  fetchAttachmentSuccess,
  fetchTicketFaliure,
  fetchTicketStart,
  fetchTicketSuccess,
  updateAttachmentFaliure,
  updateAttachmentStart,
  updateAttachmentSucess,
  updateTicketSuccess,
} from "../Redux/features/ticketSlice";
import dotenv from "dotenv";
import axios from "axios";
import { customAlphabet, nanoid } from "nanoid";
import { storage } from "@/firebase/firebaseconfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateAgentFaliure } from "../Redux/features/agentSlice";

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
    userId: string;
    offset: number;
    limit: number;
  };
}
interface DeleteTicketAction {
  type: typeof deleteTicketStart;
  payload: {
    Id: string;
  };
}
interface DeleteAttachAction {
  type: typeof deleteAttachmentStart;
  payload: {
    Id: string;
  };
}
interface updateAction {
  type: typeof updateAttachmentStart;
  payload: {
    ticket: Ticket;
    file: any;
    Id: string;
  };
}
const api =
  process.env.NEXT_PUBLIC_REACT_ENV === "PRODUCTION"
    ? "https://kns-support-api.onrender.com"
    : "http://localhost:8000";
const Nanoid = customAlphabet("0123456789", 18);

let TicketId = Nanoid();
const fetchTickets = async (User: {
  userId: string;
  offset: number;
  limit: number;
}) => {
  const response = await axios.get(
    `${api}/ticket/user/${User.userId}?offset=${User.offset}&limit=${User.limit}`
  );
  return response.data;
};
const fetchAttachments = async () => {
  const response = await axios.get(`${api}/ticket/attachment`);
  const attachment = await response.data;
  return attachment;
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
  if (response.data) return response.data;
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
  console.log(url);
  const response = file.map(async (file, i) => {
    const response = await axios.post(`${api}/ticket/attachment/new`, {
      Id: Nanoid(),
      FileName: file.name,
      FilePath: url[i],
      TicketId: TicketId,
      Size: file.size,
      Mimi_Type: file.type,
      Createdat: new Date(),
    });
    if (response.data) return response.data;
  });
  return await Promise.all(response);
};
const updateTicketApi = async (ticket: Ticket) => {
  let date = new Date();
  let resolutionDate = new Date();
  const day = 3600 * 24;
  if (ticket.Priority === "Low") {
    date = new Date(Date.now() + 14 * day);
    resolutionDate = new Date(Date.now() + 30 * day);
  }
  if (ticket.Priority === "Medium") {
    date = new Date(Date.now() + 7 * day);
  }
  resolutionDate = new Date(Date.now() + 20 * day);

  if (ticket.Priority === "High") {
    date = new Date(Date.now() + 3 * day);
    resolutionDate = new Date(Date.now() + 15 * day);
  }
  if (ticket.Priority === "Urgent") {
    date = new Date(Date.now() + 1 * day);
    resolutionDate = new Date(Date.now() + 7 * day);
  }
  const response = await axios.put(`${api}/ticket/${ticket.Id}`, {
    Id: ticket.Id,
    UserId: ticket.UserId,
    Type: ticket.IssueType,
    ReportedVia: "Web",
    Email: ticket.Email,
    Priority: ticket.Priority,
    Subject: ticket.Subject,
    Content: ticket.Content,
    FirstResponseDue: date,
    ResolutionDue: resolutionDate,
    CreatedAt: ticket.CreatedAt,
    UpdatedAt: new Date(),
  });
};
const updateAttachmentApi = async (file: any, Id: String) => {
  console.log(Id);
  const promise = file.map(
    async (file: any, i: number) => await uploadFile(file)
  );
  const url = await Promise.all(promise);
  console.log(url);
  const response = file.map(async (file: any, i: number) => {
    const response = await axios.post(`${api}/ticket/attachment/new`, {
      Id: Nanoid(),
      FileName: file.name,
      FilePath: url[i],
      TicketId: Id,
      Size: file.size,
      Mimi_Type: file.type,
      Createdat: new Date(),
    });
    if (response.data) return response.data;
  });
  return await Promise.all(response);
};

const deleteTicketApi = async (Ticket: { Id: string }) => {
  const response = await axios.delete(`${api}/ticket/${Ticket}`);
  if (response.data) return response.data;
};
const deleteAttachmentApi = async (Ticket: { Id: string }) => {
  const response = await axios.delete(`${api}/ticket/attachment/${Ticket}`);
  if (response.data) return response.data;
};
function* handleFetchTicket(
  action: FetchTicketAction
): Generator<any, void, any> {
  try {
    const { Ticket, count } = yield call(fetchTickets, action.payload);
    yield put(fetchTicketSuccess({ Ticket: Ticket, count: count }));
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
    yield put(addTicketFaliure(e.response.data.message));
  }
}
function* handleAddAttachement(
  action: AddAttachementAction
): Generator<any, void, any> {
  try {
    const tickets = yield addTicketApi(action.payload.ticket);
    const response = yield call(addAttachementApi, action.payload.file);
    yield put(addAttachementSuccess(response));
    yield put(addTicketSuccess(tickets));
  } catch (e: any) {
    yield put(addAttachementFaliure(e.response.data.message));
  }
}
function* handleFetchAttachments(): Generator<any, void, any> {
  try {
    const Attachement = yield fetchAttachments();
    yield put(fetchAttachmentSuccess(Attachement));
  } catch (e: any) {
    yield put(fetchAttachmentFaliure(e.response.data.message));
  }
}
function* handleUpdateAttachment(
  action: updateAction
): Generator<any, void, any> {
  try {
    const tickets = yield updateTicketApi(action.payload.ticket);
    const attachment = action.payload.file.filter(
      (file: any) => "name" in file
    );
    const attach = action.payload.file.filter(
      (file: any) => "FileName" in file
    );
    const response = yield updateAttachmentApi(
      attachment,
      action.payload.ticket.Id
    );
    const file = [...attach, ...response];
    console.log(file);
    yield put(updateTicketSuccess(tickets));
    yield put(updateAttachmentSucess(file));
  } catch (e: any) {
    yield put(updateAgentFaliure(e.response.data.message));
  }
}
function* handleDeleteTicket(
  action: DeleteAttachAction
): Generator<any, void, any> {
  try {
    const ticket = yield call(deleteTicketApi, action.payload);
    yield put(deleteTicketSuccess(ticket));
  } catch (e: any) {
    yield put(deleteTicketFaliure(e.response.data.message));
  }
}
function* handleDeleteAttachment(
  action: DeleteAttachAction
): Generator<any, void, any> {
  try {
    const attach = yield call(deleteAttachmentApi, action.payload);
    console.log(attach);
    yield put(deleteAttachmentSuccess(attach));
  } catch (e: any) {
    yield put(deleteAttachmentFaliure(e.response.data.message));
  }
}
export function* TicketSaga() {
  yield takeLatest(fetchTicketStart.type, handleFetchTicket);
  yield takeLatest(addTicketStart.type, handleAddTicket);
  yield takeLatest(addAttachementStart.type, handleAddAttachement);
  yield takeLatest(updateAttachmentStart.type, handleUpdateAttachment);
  yield takeLatest(fetchAttachmentStart.type, handleFetchAttachments);
  yield takeLatest(deleteTicketStart.type, handleDeleteTicket);
  yield takeLatest(deleteAttachmentStart.type, handleDeleteAttachment);
}
