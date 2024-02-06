import {
  takeLatest,
  put,
  call,
  takeLeading,
  takeEvery,
} from "redux-saga/effects";
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
  payload: Attachement[] | undefined;
}
interface updateAction {
  type: typeof updateAttachmentStart;
  payload: {
    ticket: Ticket;
    file: any;
    Id: string;
    Remove: Attachement[];
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

const HtmlParser = (html: any) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const imgElements = doc.querySelectorAll("img");
  const imageInputs: any = [];
  imgElements.forEach((img) => {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    imageInputs.push(src);
  });
  return { imgElements, doc, imageInputs };
};

const serializer = (doc: any) => {
  const serializer = new XMLSerializer();
  const p = doc.getElementsByTagName("body");
  const htmlstring = serializer.serializeToString(p[0]);
  const htmlString1 = htmlstring.replace(
    '<body xmlns="http://www.w3.org/1999/xhtml">',
    ""
  );
  const htmlString2 = htmlString1.replace("</body>", "");
  return htmlString2;
};

const dataURLtoBlob = (dataURI: any) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

export const uploadEditorImageToFirebase = async (base64Data: any) => {
  return new Promise((resolve, reject) => {
    const profileRef = ref(
      storage,
      `EditorImage/${new Date().getMilliseconds()}`
    );
    const file = dataURLtoBlob(base64Data);
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

export const handleHtmlContent = async (Description: string) => {
  const { doc, imageInputs, imgElements } = HtmlParser(Description);
  const url = await imageInputs.map(async (byte: any) => {
    if (byte.includes("https://firebasestorage.googleapis.com/")) return byte;
    try {
      const response = await uploadEditorImageToFirebase(byte);
      return response;
    } catch (e) {
      throw new Error("something wrong please try again");
    }
  });
  const urls = await Promise.all(url);
  imgElements.forEach(async (img: HTMLImageElement, i: number) => {
    img.setAttribute("src", urls[i]);
  });
  const html = serializer(doc);

  return html;
};

const addTicket = async (
  Ticket: {
    IssueType: string | null;
    Subject: string | null;
    Description: string | null;
    Priority: string | null;
    Email?: string | null;
    UserId?: string;
  },
  html: string
) => {
  const { IssueType, Subject, Priority, Email, UserId } = Ticket;

  let date = new Date();
  let resolutionDate = new Date();
  const day = 24 * 60 * 60 * 1000;

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
    Content: html,
    FirstResponseDue: date,
    ResolutionDue: resolutionDate,
    CreatedAt: new Date(),
    Status: "Open",
  });
  if (response.data) return response.data;
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
  const { IssueType, Subject, Description, Priority, Email, UserId } = Ticket;
  try {
    if (Description) {
      const html = await handleHtmlContent(Description);
      if (html) {
        const response = await addTicket(Ticket, html);
        if (response) return await response;
      }
    }
  } catch (e) {
    throw new Error("something went wrong...please try again");
  }
};
const uploadFile = async (file: File) => {
  return new Promise((resolve, reject) => {
    const profileRef = ref(storage, `attachment/${file.name}`);
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
            reject(Error.message);
            break;
          case "storage/canceled":
            reject(Error.message);

            break;
          case "storage/unknown":
            reject(Error.message);
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
  try {
    const promise = file.map(async (file, i) => await uploadFile(file));
    const url = await Promise.all(promise);
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
  } catch (e: any) {
    return e;
  }
};

const updateTicket = async (ticket: Ticket, html: string) => {
  console.log(ticket);
  let date = new Date();
  let resolutionDate = new Date();
  const day = 60 * 60 * 1000 * 24;
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
    Content: html,
    Status: ticket.Status,
    FirstResponseDue: date,
    ResolutionDue: resolutionDate,
    CreatedAt: ticket.CreatedAt,
    UpdatedAt: new Date(),
  });
  return response.data;
};
const updateTicketApi = async (ticket: Ticket) => {
  try {
    if (ticket.Content) {
      const html = await handleHtmlContent(ticket.Content);
      if (html) {
        const response = await updateTicket(ticket, html);
        if (response) return await response;
      }
    }
  } catch (e) {
    throw new Error("something went wrong...please try again");
  }
};

const updateAttachmentApi = async (file: any, Id: String) => {
  try {
    const promise = file.map(async (file: any, i: number) => {
      try {
        const response = await uploadFile(file);
        return response;
      } catch (e) {
        throw new Error("Network error. please try again..");
      }
    });
    const url = await Promise.all(promise);
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
  } catch (e: any) {
    return e;
  }
};

const deleteTicketApi = async (Ticket: { Id: string }) => {
  const response = await axios.delete(`${api}/ticket/${Ticket}`);
  if (response.data) return response.data;
};
const deleteAttachmentApi = async (Remove: Attachement[] | undefined) => {
  if (Remove) {
    const response = Remove.map(async (file: any) => {
      const response = await axios.delete(
        `${api}/ticket/attachment/${file.Id}`
      );
      return await response.data;
    });
    return await Promise.all(response);
  }
};
function* handleFetchTicket(
  action: FetchTicketAction
): Generator<any, void, any> {
  try {
    const { Ticket, count } = yield call(fetchTickets, action.payload);
    console.log(Ticket);
    yield put(fetchTicketSuccess({ Ticket: Ticket, count: count }));
  } catch (e: any) {
    yield put(fetchTicketFaliure(e.response.data.message));
  }
}

function* handleAddTicket(action: AddTicketAction): Generator<any, void, any> {
  try {
    const Ticket = yield call(addTicketApi, action.payload);
    console.log(Ticket);
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
    const tickets = yield call(updateTicketApi, action.payload.ticket);
    const removed = yield call(deleteAttachmentApi, action.payload.Remove);
    const response = yield call(
      updateAttachmentApi,
      action.payload.file,
      action.payload.ticket.Id
    );
    if (tickets) yield put(updateTicketSuccess(tickets));
    if (removed) yield put(deleteAttachmentSuccess(removed));
    if (response) yield put(updateAttachmentSucess(response));
  } catch (e: any) {
    console.log(e);
    yield put(updateAttachmentFaliure(e));
  }
}
function* handleDeleteTicket(
  action: DeleteTicketAction
): Generator<any, void, any> {
  try {
    const ticket = yield call(deleteTicketApi, action.payload);
    yield put(deleteTicketSuccess(ticket));
  } catch (e: any) {
    yield put(deleteTicketFaliure(e));
  }
}
function* handleDeleteAttachment(
  action: DeleteAttachAction
): Generator<any, void, any> {
  try {
    const attach = yield call(deleteAttachmentApi, action.payload);
    yield put(deleteAttachmentSuccess(attach));
  } catch (e: any) {
    yield put(deleteAttachmentFaliure(e));
  }
}
export function* TicketSaga() {
  yield takeLatest(fetchTicketStart.type, handleFetchTicket);
  yield takeLatest(addTicketStart.type, handleAddTicket);
  yield takeEvery(addAttachementStart.type, handleAddAttachement);
  yield takeEvery(updateAttachmentStart.type, handleUpdateAttachment);
  yield takeLatest(fetchAttachmentStart.type, handleFetchAttachments);
  yield takeLatest(deleteTicketStart.type, handleDeleteTicket);
  yield takeEvery(deleteAttachmentStart.type, handleDeleteAttachment);
}
