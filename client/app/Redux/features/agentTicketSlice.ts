import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { actionChannel } from "redux-saga/effects";
import { AgentTicketType, TicketType } from "../reducers";
import { user } from "./userSlice";

export interface Ticket {
  Id: string;
  UserId?: string;
  Type: string;
  ReportedVia: string;
  Email: string;
  Priority: string;
  Subject: string;
  Content: string;
  Status: string;
  Note?: string;
  DepartmentId?: string;
  FirstResponseDue: Date;
  ResolutionDue: Date;
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
  AgentTickets: Ticket[];
  Attachement: Attachement[];
  Contact: user[];
  Loading: boolean;
  hasMore: boolean;
  error: string | null;
}

const initialState: TicketSate = {
  AgentTickets: [],
  Attachement: [],
  Contact: [],
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
const AgentTicketSlice = createSlice({
  name: "AgentTicket",
  initialState,
  reducers: {
    AgentfetchTicketStart: (state) => {
      state.Loading = true;
      state.error = null;
      state.hasMore = false;
    },
    AgentfetchTicketSuccess: (state, action: PayloadAction<any[]>) => {
      state.AgentTickets = action.payload.map((ticket: any) => {
        const { Ticket, Contact } = ticket;
        return Ticket;
      });

      state.Contact = action.payload.map((ticket: any) => {
        const { Ticket, Contact } = ticket;
        return Contact;
      });
      state.Loading = false;
      state.error = null;
    },
    AgentfetchTicketFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
      state.hasMore = false;
    },
  },
});
export const {
  AgentfetchTicketStart,
  AgentfetchTicketFaliure,
  AgentfetchTicketSuccess,
} = AgentTicketSlice.actions;
export const selectAgentTicket = (state: AgentTicketType) => {
  return state.AgentTicket;
};
export default AgentTicketSlice.reducer;
