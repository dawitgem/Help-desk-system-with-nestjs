import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import AgentReducer from "./features/agentSlice";
import TicketReducer from "./features/ticketSlice";
import SearchReducer from "./features/searchSlice";
export interface User {
  User: ReturnType<typeof UserReducer>;
}
export interface Agent {
  Agent: ReturnType<typeof AgentReducer>;
}
export interface TicketType {
  Ticket: ReturnType<typeof TicketReducer>;
}
export interface SearchType {
  Search: ReturnType<typeof SearchReducer>;
}
export const rootReducer = combineReducers({
  User: UserReducer,
  Agent: AgentReducer,
  Ticket: TicketReducer,
  Search: SearchReducer,
});
