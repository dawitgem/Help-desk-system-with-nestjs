import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actionChannel } from "redux-saga/effects";
import { TicketType } from "../reducers";

export interface Ticket {
  Id: String;
  IssueType: string;
  Priority: string;
  Subject: string;
  Email?: string;
  Content: string;
  UserId?: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
  Status: string;
}
export interface Attachement {
  Id: string;
  FileName: string;
  FilePath: string;
  Size: number;
  Mimi_Type: string;
  TicketId: string;
  Createdat: string;
  CreatedBy?: string;
}

interface TicketSate {
  Tickets: Ticket[];
  Attachement: Attachement[];
  Loading: boolean;
  hasMore: boolean;
  error: string | null;
}

const initialState: TicketSate = {
  Tickets: [],
  Attachement: [],
  hasMore: true,
  Loading: false,
  error: null,
};
interface ticketStart {
  IssueType: string | null;
  Subject: string | null;
  Description: string | null;
  Priority: string | null;
  Email?: string | null;
  UserId?: string;
}
let count = 0;
const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addTicketStart: (
      state,
      action: PayloadAction<{
        IssueType: string | null;
        Subject: string | null;
        Description: string | null;
        Priority: string | null;
        Email?: string | null;
        UserId?: string;
      }>
    ) => {
      state.Loading = true;
      state.error = null;
    },
    addTicketSuccess: (state, action: PayloadAction<Ticket>) => {
      state.Tickets = [action.payload, ...state.Tickets];
      state.Loading = false;
      state.error = null;
    },
    addTicketFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },

    fetchTicketStart: (
      state,
      action: PayloadAction<{ userId: string; offset: number; limit: number }>
    ) => {
      state.Loading = true;
      state.error = null;
      state.hasMore = false;
    },
    fetchTicketSuccess: (
      state,
      action: PayloadAction<{ Ticket: Ticket[]; count: number }>
    ) => {
      state.Tickets = [...state.Tickets, ...action.payload.Ticket];
      state.Loading = false;
      state.error = null;
      state.hasMore = action.payload.count - state.Tickets.length !== 0;
    },
    fetchTicketFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
      state.hasMore = false;
    },
    updateTicketStart: (state, action: PayloadAction<Ticket>) => {
      state.Loading = true;
      state.error = null;
    },
    updateTicketSuccess: (state, action: PayloadAction<Ticket>) => {
      const newTickets = state.Tickets.map((ticket) => {
        if (ticket.Id === action.payload.Id) ticket = action.payload;
        return ticket;
      });
      state.Tickets = newTickets;
      state.Loading = false;
      state.error = null;
    },
    updateTicketFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },
    deleteTicketStart: (state, action: PayloadAction<string>) => {
      state.Loading = true;
      state.error = null;
    },
    deleteTicketSuccess: (state, action: PayloadAction<Ticket>) => {
      state.Tickets = state.Tickets.filter(
        (ticket) => ticket.Id !== action.payload.Id
      );
      state.Loading = false;
      state.error = null;
    },
    deleteTicketFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },
    fetchAttachmentStart: (state) => {
      state.Loading = true;
      state.error = null;
    },
    fetchAttachmentSuccess: (state, action: PayloadAction<Attachement[]>) => {
      state.Attachement = action.payload;
      state.Loading = false;
      state.error = null;
    },
    fetchAttachmentFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },
    addAttachementStart: (
      state,
      action: PayloadAction<{ ticket: ticketStart; file: File[] | null }>
    ) => {
      state.Loading = true;
      state.error = null;
    },
    addAttachementSuccess: (state, action: PayloadAction<Attachement[]>) => {
      state.Attachement = [...action.payload, ...state.Attachement];
      state.Loading = true;
      state.error = null;
    },
    addAttachementFaliure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateAttachmentStart: (
      state,
      action: PayloadAction<{
        ticket: Ticket;
        file: File[];
        Id: string;
        Remove: Attachement[] | undefined;
      }>
    ) => {
      state.Loading = true;
      state.error = null;
    },
    updateAttachmentSucess: (state, action: PayloadAction<any>) => {
      state.Attachement = action.payload;
      state.error = null;
      state.Loading = false;
    },
    updateAttachmentFaliure: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.error = action.payload;
      state.Loading = false;
    },
    deleteAttachmentStart: (state, action: PayloadAction<any>) => {
      count++;
      state.Loading = true;
      state.error = null;
    },
    deleteAttachmentSuccess: (state, action: PayloadAction<any>) => {
      state.Attachement = state.Attachement.filter(
        (attach) => !action.payload.includes(attach)
      );
      state.error = null;
      state.Loading = false;
    },
    deleteAttachmentFaliure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.Loading = false;
    },
    cancelProcess: () => {},
  },
});
export const {
  fetchTicketFaliure,
  fetchTicketStart,
  fetchTicketSuccess,
  updateTicketFaliure,
  updateTicketStart,
  updateTicketSuccess,
  addTicketFaliure,
  addTicketStart,
  addTicketSuccess,
  addAttachementFaliure,
  addAttachementStart,
  addAttachementSuccess,
  fetchAttachmentFaliure,
  fetchAttachmentStart,
  fetchAttachmentSuccess,
  updateAttachmentFaliure,
  updateAttachmentStart,
  updateAttachmentSucess,
  deleteTicketFaliure,
  deleteTicketStart,
  deleteTicketSuccess,
  deleteAttachmentFaliure,
  deleteAttachmentStart,
  deleteAttachmentSuccess,
  cancelProcess,
} = TicketSlice.actions;
export const selectTicket = (state: TicketType) => state.Ticket;
export default TicketSlice.reducer;
