import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import AgentReducer from "./features/agentSlice";
import TicketReducer from "./features/ticketSlice";
export interface User {
  User: ReturnType<typeof UserReducer>;
}
export interface Agent {
  Agent: ReturnType<typeof AgentReducer>;
}
export interface TicketType {
  Ticket: ReturnType<typeof TicketReducer>;
}
export const rootReducer = combineReducers({
  User: UserReducer,
  Agent: AgentReducer,
  Ticket: TicketReducer,
});
