import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import AgentReducer from "./features/agentSlice";
export interface User {
  User: ReturnType<typeof UserReducer>;
}
export interface Agent {
  Agent: ReturnType<typeof AgentReducer>;
}
export const rootReducer = combineReducers({
  User: UserReducer,
  Agent: AgentReducer,
});
