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
  status?: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
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
  hasMore: false,
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
      console.log(action.payload);
      state.Loading = true;
      state.error = null;
    },
    addTicketSuccess: (state, action: PayloadAction<Ticket>) => {
      state.Tickets = [...state.Tickets, action.payload];
      state.Loading = false;
      state.error = null;
    },
    addTicketFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },

    fetchTicketStart: (state, action: PayloadAction<string>) => {
      state.Loading = true;
      state.error = null;
    },
    fetchTicketSuccess: (state, action: PayloadAction<Ticket[]>) => {
      state.Tickets = action.payload;
      state.Loading = false;
      state.error = null;
    },
    fetchTicketFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },
    updateTicketStart: (state) => {
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
      state.Attachement = [...state.Attachement, ...action.payload];
      state.Loading = true;
      state.error = null;
    },
    addAttachementFaliure: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.error = action.payload;
    },
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
} = TicketSlice.actions;
export const selectTicket = (state: TicketType) => state.Ticket;
export default TicketSlice.reducer;
